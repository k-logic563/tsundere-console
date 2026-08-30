import { tsundere } from "../../dist/index.js";

const defaultConfig = {
  level: "normal",
  language: "ja",
  randomness: true,
};

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

const levelOutput = document.querySelector("#current-level");
const languageOutput = document.querySelector("#current-language");
const randomnessOutput = document.querySelector("#current-randomness");
const lastAction = document.querySelector("#last-action");

function updateConfigDisplay() {
  const config = tsundere.getConfig();

  levelOutput.textContent = config.level;
  languageOutput.textContent = config.language;
  randomnessOutput.textContent = String(config.randomness);

  document.querySelectorAll("[data-config-value]").forEach((element) => {
    const key = element.dataset.configValue;
    element.textContent = String(config[key]);
  });

  document.querySelectorAll("[data-level]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.level === config.level),
    );
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === config.language),
    );
  });
  document.querySelectorAll("[data-randomness]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.randomness === String(config.randomness)),
    );
  });
}

function reportAction(message) {
  lastAction.textContent = message;
}

const actions = {
  log() {
    tsundere.log("Hello from the browser!");
  },
  info() {
    tsundere.info("Browser info message");
  },
  success() {
    tsundere.success("Build complete");
  },
  warn() {
    tsundere.warn("Deprecated API");
  },
  error() {
    tsundere.error("Connection failed");
  },
  debug() {
    tsundere.debug("Browser debug details", { mode: "development" });
  },
  "status-context"() {
    tsundere.status(404, "GET /users/123");
  },
  repeat() {
    tsundere.error("Same error");
    tsundere.error("Same error");
    tsundere.error("Same error");
  },
  dir() {
    tsundere.dir(user);
  },
  table() {
    tsundere.table(users);
  },
  praise() {
    tsundere.praise("All tests passed");
  },
  complain() {
    tsundere.complain("npm install took forever");
  },
  panic() {
    tsundere.panic("Production is down");
  },
  assert() {
    tsundere.assert(false, "Intentional browser demo assertion");
  },
  trace() {
    tsundere.trace("Browser trace example");
  },
  count() {
    tsundere.count("browser-demo");
    tsundere.count("browser-demo");
    tsundere.count("browser-demo");
  },
  "count-reset"() {
    tsundere.countReset("browser-demo");
  },
  async timer(button) {
    button.disabled = true;
    try {
      tsundere.time("browser-demo");
      await new Promise((resolve) => setTimeout(resolve, 300));
      tsundere.timeLog("browser-demo");
      await new Promise((resolve) => setTimeout(resolve, 300));
      tsundere.timeEnd("browser-demo");
    } finally {
      button.disabled = false;
    }
  },
  group() {
    tsundere.group("Browser Demo Group");
    tsundere.log("Inside group");
    tsundere.warn("Still inside group");
    tsundere.groupEnd();
  },
  "reset-config"() {
    tsundere.configure(defaultConfig);
    updateConfigDisplay();
    tsundere.success("Configuration reset");
  },
  clear() {
    tsundere.clear();
  },
};

document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (button === null) return;

  const { status, level, language, randomness, action } = button.dataset;

  try {
    if (status !== undefined) {
      tsundere.status(Number(status));
      reportAction(`Called tsundere.status(${status}).`);
      return;
    }

    if (level !== undefined) {
      tsundere.setLevel(level);
      updateConfigDisplay();
      tsundere.error(`${button.textContent.trim()} mode test`);
      reportAction(`Level changed to ${level}.`);
      return;
    }

    if (language !== undefined) {
      tsundere.setLanguage(language);
      updateConfigDisplay();
      tsundere.success(`Language changed to ${language}`);
      reportAction(`Language changed to ${language}.`);
      return;
    }

    if (randomness !== undefined) {
      const enabled = randomness === "true";
      tsundere.setRandomness(enabled);
      updateConfigDisplay();
      tsundere.log(`Randomness changed to ${enabled}`);
      reportAction(`Randomness changed to ${enabled}.`);
      return;
    }

    const handler = actions[action];
    if (handler === undefined) return;
    await handler(button);
    reportAction(`Ran ${button.textContent.trim()}. Check DevTools Console.`);
  } catch (error) {
    console.error("Browser playground action failed:", error);
    reportAction("Action failed. Check DevTools Console for details.");
  }
});

updateConfigDisplay();
console.info(
  "tsundere-console Browser Playground ready. Use the page controls to test the built package.",
);
