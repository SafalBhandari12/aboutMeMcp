import dotenv from "dotenv";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import OpenAI from "openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions";
import readline from "node:readline/promises";
import process from "node:process";

dotenv.config({ quiet: true });

const model = process.env.OPENAI_MODEL;
if (!model) {
  throw new Error("OPENAI_MODEL is not set in .env");
}

const transport = new StdioClientTransport({
  command: "npx",
  args: ["tsx", "src/server.ts"],
});

const client = new Client({
  name: "My Personal MCP Client",
  version: "1.0.0",
});

await client.connect(transport);

const { tools } = await client.listTools();
const { resources } = await client.listResources();

// The LLM can only call functions, so resources are exposed through a read_resource function.
const READ_RESOURCE = "read_resource";

const llmTools: ChatCompletionTool[] = [
  ...tools.map(
    (tool): ChatCompletionTool => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description ?? "",
        parameters: tool.inputSchema,
      },
    }),
  ),
  {
    type: "function",
    function: {
      name: READ_RESOURCE,
      description: `Read a resource. Available resources:\n${resources
        .map((r) => `- ${r.uri}: ${r.description ?? r.name}`)
        .join("\n")}`,
      parameters: {
        type: "object",
        properties: {
          uri: { type: "string", enum: resources.map((r) => r.uri) },
        },
        required: ["uri"],
      },
    },
  },
];

async function runTool(name: string, args: string): Promise<string> {
  const input = args ? JSON.parse(args) : {};

  if (name === READ_RESOURCE) {
    const { contents } = await client.readResource({ uri: input.uri });
    return contents.map((c) => ("text" in c ? c.text : "")).join("\n");
  }

  const result = await client.callTool({ name, arguments: input });
  return result.content
    .map((c) => (c.type === "text" ? c.text : JSON.stringify(c)))
    .join("\n");
}

const openai = new OpenAI();

const messages: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content:
      "You are a helpful assistant. Use the available tools to answer questions about Safal.",
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputClosed = false;
rl.on("close", () => {
  inputClosed = true;
});

console.log('Chat started. Type "exit" to quit.\n');
rl.setPrompt("You: ");
rl.prompt();

for await (const line of rl) {
  const question = line.trim();
  if (question === "exit") break;
  if (!question) {
    if (!inputClosed) rl.prompt();
    continue;
  }

  messages.push({ role: "user", content: question });

  while (true) {
    const response = await openai.chat.completions.create({
      model,
      messages,
      tools: llmTools,
    });

    const message = response.choices[0]?.message;
    if (!message) break;
    messages.push(message);

    if (!message.tool_calls?.length) {
      console.log(`\nAssistant: ${message.content}\n`);
      break;
    }

    for (const toolCall of message.tool_calls) {
      if (toolCall.type !== "function") continue;

      const { name, arguments: args } = toolCall.function;
      console.log(`[calling ${name}]`);

      let output: string;
      try {
        output = await runTool(name, args);
      } catch (error) {
        output = `Error: ${(error as Error).message}`;
      }

      messages.push({ role: "tool", tool_call_id: toolCall.id, content: output });
    }
  }

  if (!inputClosed) rl.prompt();
}

rl.close();
await client.close();
