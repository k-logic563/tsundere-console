import { defaultMessages } from "./messages";
import {
  getHttpReasonPhrase,
  getHttpStatusCategory,
  getHttpStatusChannel,
  httpStatusMessages,
} from "./http-status";
import type {
  CustomTsundereMessages,
  TsundereConfig,
  TsundereConfigInput,
  TsundereLanguage,
  TsundereLevel,
  TsundereMethod,
} from "./types";
import { pickMessage } from "./utils/random";

const levels: readonly TsundereLevel[] = ["mild", "normal", "extreme"];
const languages: readonly TsundereLanguage[] = ["ja", "en"];

const methods: readonly TsundereMethod[] = [
  "log",
  "info",
  "warn",
  "error",
  "debug",
  "dir",
  "table",
  "group",
  "groupCollapsed",
  "groupEnd",
  "time",
  "timeLog",
  "timeEnd",
  "count",
  "countReset",
  "assert",
  "trace",
  "clear",
  "success",
  "praise",
  "complain",
  "panic",
  "status",
];

const defaultConfig: TsundereConfig = {
  level: "normal",
  language: "ja",
  randomness: true,
};

function includes<T>(values: readonly T[], value: unknown): value is T {
  return values.includes(value as T);
}

export class TsundereConsole {
  private config: TsundereConfig = { ...defaultConfig };
  private readonly messageOverrides = new Map<string, readonly string[]>();

  public constructor(private readonly output: Console = globalThis.console) {}

  public setLevel(level: TsundereLevel): this {
    this.config.level = level;
    return this;
  }

  public setLanguage(language: TsundereLanguage): this {
    this.config.language = language;
    return this;
  }

  public setRandomness(randomness: boolean): this {
    this.config.randomness = randomness;
    return this;
  }

  public configure(config: TsundereConfigInput): this {
    if (config.level !== undefined) this.setLevel(config.level);
    if (config.language !== undefined) this.setLanguage(config.language);
    if (config.randomness !== undefined) this.setRandomness(config.randomness);
    return this;
  }

  public getConfig(): TsundereConfig {
    return { ...this.config };
  }

  /**
   * Deep-merges message arrays. A supplied language/method/level replaces only
   * that exact default array; all unspecified arrays remain available.
   */
  public setMessages(messagesToMerge: CustomTsundereMessages): this {
    for (const language of languages) {
      const languageMessages = messagesToMerge[language];
      if (languageMessages === undefined) continue;

      for (const method of methods) {
        const methodMessages = languageMessages[method];
        if (methodMessages === undefined) continue;

        for (const level of levels) {
          const customMessages = methodMessages[level];
          if (customMessages === undefined) continue;
          this.messageOverrides.set(this.messageKey(language, method, level), [
            ...customMessages,
          ]);
        }
      }
    }

    return this;
  }

  public log(...data: unknown[]): void {
    this.say("log", "log");
    this.output.log(...data);
  }

  public info(...data: unknown[]): void {
    this.say("info", "info");
    this.output.info(...data);
  }

  public warn(...data: unknown[]): void {
    this.say("warn", "warn");
    this.output.warn(...data);
  }

  public error(...data: unknown[]): void {
    this.say("error", "error");
    this.output.error(...data);
  }

  public debug(...data: unknown[]): void {
    this.say("debug", "debug");
    this.output.debug(...data);
  }

  public dir(...args: Parameters<Console["dir"]>): void {
    this.say("dir", "log");
    this.output.dir(...args);
  }

  public table(...args: Parameters<Console["table"]>): void {
    this.say("table", "log");
    this.output.table(...args);
  }

  public group(...data: unknown[]): void {
    this.say("group", "log");
    this.output.group(...data);
  }

  public groupCollapsed(...data: unknown[]): void {
    this.say("groupCollapsed", "log");
    this.output.groupCollapsed(...data);
  }

  public groupEnd(): void {
    this.say("groupEnd", "log");
    this.output.groupEnd();
  }

  public time(...args: Parameters<Console["time"]>): void {
    this.say("time", "log");
    this.output.time(...args);
  }

  public timeLog(...args: Parameters<Console["timeLog"]>): void {
    this.say("timeLog", "log");
    this.output.timeLog(...args);
  }

  public timeEnd(...args: Parameters<Console["timeEnd"]>): void {
    this.say("timeEnd", "log");
    this.output.timeEnd(...args);
  }

  public count(...args: Parameters<Console["count"]>): void {
    this.say("count", "log");
    this.output.count(...args);
  }

  public countReset(...args: Parameters<Console["countReset"]>): void {
    this.say("countReset", "log");
    this.output.countReset(...args);
  }

  public assert(condition?: boolean, ...data: unknown[]): void {
    if (!condition) this.say("assert", "error");
    this.output.assert(condition, ...data);
  }

  public trace(...data: unknown[]): void {
    this.say("trace", "log");
    this.output.trace(...data);
  }

  public clear(): void {
    this.say("clear", "log");
    this.output.clear();
  }

  public success(...data: unknown[]): void {
    this.say("success", "log");
    this.output.log(...data);
  }

  public praise(...data: unknown[]): void {
    this.say("praise", "log");
    this.output.log(...data);
  }

  public complain(...data: unknown[]): void {
    this.say("complain", "warn");
    this.output.warn(...data);
  }

  public panic(...data: unknown[]): void {
    this.say("panic", "error");
    this.output.error(...data);
  }

  public status(code: number, ...data: unknown[]): void {
    const { language, level, randomness } = this.config;
    const category = getHttpStatusCategory(code);
    const channel = getHttpStatusChannel(category);
    const statusMessages = httpStatusMessages[language];
    const customMessages = this.messageOverrides.get(
      this.messageKey(language, "status", level),
    );
    const builtInMessages =
      category === undefined
        ? statusMessages.invalid[level]
        : (statusMessages.codes[code]?.[level] ??
          statusMessages.categories[category][level]);
    const message = pickMessage(customMessages ?? builtInMessages, randomness);

    this.output[channel](`${String(code)} ${getHttpReasonPhrase(code)}`);
    if (message !== undefined) this.output[channel](message);
    if (data.length > 0) this.output[channel](...data);
  }

  private say(
    method: TsundereMethod,
    channel: "log" | "info" | "warn" | "error" | "debug",
  ): void {
    const { language, level, randomness } = this.config;
    const messages =
      this.messageOverrides.get(this.messageKey(language, method, level)) ??
      defaultMessages[language][method][level];
    const message = pickMessage(messages, randomness);

    if (message !== undefined) this.output[channel](message);
  }

  private messageKey(
    language: TsundereLanguage,
    method: TsundereMethod,
    level: TsundereLevel,
  ): string {
    return `${language}:${method}:${level}`;
  }
}

export function createTsundere(
  output: Console = globalThis.console,
): TsundereConsole {
  return new TsundereConsole(output);
}

export const tsundere = createTsundere();

export function isTsundereLevel(value: unknown): value is TsundereLevel {
  return includes(levels, value);
}

export function isTsundereLanguage(value: unknown): value is TsundereLanguage {
  return includes(languages, value);
}
