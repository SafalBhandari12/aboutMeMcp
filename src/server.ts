import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import {
  NodeStreamableHTTPServerTransport,
  localhostHostValidation,
  localhostOriginValidation,
} from "@modelcontextprotocol/node";
import { createServer as createHttpServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function createServer(): McpServer {
  const server = new McpServer({
    name: "My Personal MCP Server",
    version: "1.0.0",
  });

  server.registerTool("get_name", { description: "Get my Name" }, async () => {
    return {
      content: [
        {
          type: "text",
          text: "My name is Safal ",
        },
      ],
    };
  });

  server.registerTool("get_age", { description: "Get my Age" }, async () => {
    return {
      content: [
        {
          type: "text",
          text: "My age is 22",
        },
      ],
    };
  });

  server.registerTool(
    "get_potfolio",
    { description: "Get my Portfolio" },
    async () => {
      return {
        content: [
          {
            type: "text",
            text: "My portfolio is https://safalbhandari.com.np",
          },
        ],
      };
    },
  );

  server.registerResource(
    "resume",
    "resume://me",
    {
      title: "My Resume",
      description: "This is my resume",
      mimeType: "text/markdown",
    },
    async (uri) => {
      const resumePath = path.join(process.cwd(), "data", "RESUME.md");

      const resume = await readFile(resumePath, "utf-8");
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/markdown",
            text: resume,
          },
        ],
      };
    },
  );

  return server;
}

const useHttp =
  process.argv.includes("--http") || process.env.MCP_TRANSPORT === "http";

if (useHttp) {
  const port = Number(process.env.PORT ?? 3000);
  const validateHost = localhostHostValidation();
  const validateOrigin = localhostOriginValidation();

  createHttpServer(async (req, res) => {
    if (!validateHost(req, res) || !validateOrigin(req, res)) return;

    if (new URL(req.url ?? "/", "http://localhost").pathname !== "/mcp") {
      res.writeHead(404).end();
      return;
    }

    // Stateless: a fresh server and transport per request, cleaned up when the response closes.
    const server = createServer();
    const transport = new NodeStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    res.on("close", () => {
      void transport.close();
      void server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res);
  }).listen(port, "127.0.0.1", () => {
    console.error(`MCP server listening on http://127.0.0.1:${port}/mcp`);
  });
} else {
  // stdout carries the protocol in stdio mode, so never console.log here.
  const transport = new StdioServerTransport();
  await createServer().connect(transport);
}
