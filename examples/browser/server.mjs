import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
const host = "127.0.0.1";
const requestedPort = Number(process.env.BROWSER_DEMO_PORT ?? 4173);
const port =
  Number.isInteger(requestedPort) &&
  requestedPort > 0 &&
  requestedPort <= 65_535
    ? requestedPort
    : 4173;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);

  if (requestUrl.pathname === "/") {
    response.writeHead(302, { Location: "/examples/browser/" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad Request");
    return;
  }

  if (pathname.endsWith("/")) pathname += "index.html";

  const filePath = resolve(projectRoot, `.${pathname}`);
  const isInsideProject =
    filePath === projectRoot || filePath.startsWith(`${projectRoot}${sep}`);

  if (!isInsideProject) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type":
        contentTypes[extname(filePath)] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(content);
  } catch (error) {
    const status = error?.code === "ENOENT" ? 404 : 500;
    response.writeHead(status, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    response.end(status === 404 ? "Not Found" : "Internal Server Error");
  }
});

server.on("error", (error) => {
  console.error("Unable to start the browser playground:", error.message);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`tsundere-console Browser Playground: http://${host}:${port}/`);
  console.log("Open DevTools → Console, then use the controls on the page.");
  console.log("Press Ctrl+C to stop the server.");
});
