import { tsundere } from "../dist/index.js";

const section = (title) => {
  console.log(`\n${"=".repeat(30)}`);
  console.log(` ${title}`);
  console.log("=".repeat(30));
};

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

section("Basic Console Methods");
tsundere.log("Starting server...");
tsundere.info("Listening on http://localhost:3000");
tsundere.success("Build complete");
tsundere.warn("Deprecated API");
tsundere.error("Connection failed");
tsundere.debug("Debug details", { port: 3000, mode: "development" });

section("HTTP Status");
const statusCodes = [
  200, 201, 301, 400, 401, 403, 404, 418, 429, 500, 502, 503, 504,
];

for (const code of statusCodes) {
  tsundere.status(code);
  // Keep stdout/stderr output ordered in terminals that buffer them separately.
  await wait(5);
}

tsundere.status(404, "GET /users/123");
await wait(5);
tsundere.status(599);
await wait(5);

section("Object / Table");
const user = {
  name: "Onii-chan",
  level: 99,
  status: "coding",
  project: {
    name: "tsundere-console",
    version: "0.1.0",
  },
};

const users = [
  { name: "Alice", status: "success" },
  { name: "Bob", status: "warning" },
  { name: "Charlie", status: "error" },
];

tsundere.dir(user, { depth: 3, colors: true });
tsundere.table(users, ["name", "status"]);

section("Groups");
tsundere.group("Deployment");
tsundere.log("Preparing assets");
tsundere.groupCollapsed("Details (collapsed in supported consoles)");
tsundere.info("Bundling ESM output");
tsundere.info("Bundling CommonJS output");
tsundere.groupEnd();
tsundere.success("Deployment group complete");
tsundere.groupEnd();

section("Timers");
tsundere.time("demo");
await wait(100);
tsundere.timeLog("demo", "first checkpoint");
await wait(100);
tsundere.timeEnd("demo");

section("Counters");
tsundere.count("request");
tsundere.count("request");
tsundere.count("request");
tsundere.countReset("request");
tsundere.count("request");

section("Assertions / Trace");
tsundere.assert(false, "This assertion should fail");
tsundere.trace("Intentional trace from the demo");

section("Custom Tsundere Methods");
tsundere.praise("Excellent type coverage");
tsundere.complain("The build could be faster");
tsundere.panic("Production is on fire");
// Give stdout/stderr a moment to flush before printing the next heading.
await wait(10);

section("Tsundere Levels");
tsundere.setLevel("mild");
tsundere.error("Mild error example");
tsundere.setLevel("normal");
tsundere.error("Normal error example");
tsundere.setLevel("extreme");
tsundere.error("Extreme error example");
tsundere.setLevel("normal");

section("Languages");
tsundere.setLanguage("ja");
tsundere.success("Japanese message");
tsundere.setLanguage("en");
tsundere.success("English message");
tsundere.setLanguage("ja");

section("Deterministic Messages");
console.log("randomness=false: the added phrase below should repeat.");
tsundere.setRandomness(false);
tsundere.log("Deterministic call 1");
tsundere.log("Deterministic call 2");
tsundere.log("Deterministic call 3");
tsundere.setRandomness(true);

section("Demo Complete");
console.log("Configuration restored:", tsundere.getConfig());
console.log("tsundere.clear() is available but intentionally not called here.");
