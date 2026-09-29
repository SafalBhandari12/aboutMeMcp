import { McpServer } from "@modelcontextprotocol/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

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
    const resumePath = path.join(process.cwd(), "data", "resume.md");

    const resume = await readFile(resumePath, "utf-8");
    return {
      contents: [
        {
          uri: "slfdkj",
          mimeType: "text/markdown",
          text: "# My Resume\n\nThis is my resume in markdown format.",
        },
      ],
    };
  },
);
