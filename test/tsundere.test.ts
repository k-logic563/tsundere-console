import { afterEach, describe, expect, it, vi } from "vitest";

import { createTsundere } from "../src";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("TsundereConsole", () => {
  it("prints a phrase and forwards all log arguments unchanged", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);
    const object = { id: 1 };

    logger.log("user:", object, 42);

    expect(log).toHaveBeenNthCalledWith(
      1,
      "べ、別に起動を見届けてあげてるわけじゃないからね。",
    );
    expect(log).toHaveBeenNthCalledWith(2, "user:", object, 42);
  });

  it("uses console.error for both the phrase and original error", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.error("Connection failed", { retry: false });

    expect(error).toHaveBeenNthCalledWith(
      1,
      "はぁ？またエラー出してるんだけど。",
    );
    expect(error).toHaveBeenNthCalledWith(2, "Connection failed", {
      retry: false,
    });
  });

  it("switches level", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere().configure({
      randomness: false,
      level: "extreme",
    });

    logger.error("broken");

    expect(error).toHaveBeenNthCalledWith(
      1,
      "ちょっとおおお！！何してんのよ！！完全に壊れてるじゃない！！",
    );
  });

  it("switches language", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const logger = createTsundere().configure({
      randomness: false,
      language: "en",
    });

    logger.success("Build complete");

    expect(log).toHaveBeenNthCalledWith(
      1,
      "I-It's not like I wanted your build to succeed or anything!",
    );
    expect(log).toHaveBeenNthCalledWith(2, "Build complete");
  });

  it("is deterministic when randomness is disabled", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.log("one");
    logger.log("two");

    expect(log.mock.calls[0]).toEqual(log.mock.calls[2]);
  });

  it("configures partially and returns a defensive config copy", () => {
    const logger = createTsundere().configure({
      level: "mild",
      language: "en",
      randomness: false,
    });

    const config = logger.getConfig();
    config.level = "extreme";

    expect(logger.getConfig()).toEqual({
      level: "mild",
      language: "en",
      randomness: false,
    });
  });

  it("deep-merges custom messages and replaces the selected array", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere()
      .setRandomness(false)
      .setMessages({
        ja: {
          error: {
            normal: ["カスタムエラーよ。"],
          },
        },
      });

    logger.error("broken");
    logger.setLevel("mild").error("still broken");

    expect(error).toHaveBeenNthCalledWith(1, "カスタムエラーよ。");
    expect(error).toHaveBeenNthCalledWith(3, "ちょっと、エラー出てるわよ。");
  });

  it("forwards dir and table arguments", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const dir = vi.spyOn(console, "dir").mockImplementation(() => undefined);
    const table = vi
      .spyOn(console, "table")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);
    const value = { nested: { id: 1 } };
    const rows = [{ name: "Aya", email: "aya@example.com" }];

    logger.dir(value, { depth: 3, colors: true });
    logger.table(rows, ["name", "email"]);

    expect(dir).toHaveBeenCalledWith(value, { depth: 3, colors: true });
    expect(table).toHaveBeenCalledWith(rows, ["name", "email"]);
  });

  it("only adds an assert phrase when the assertion fails", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const assertion = vi
      .spyOn(console, "assert")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.assert(true, "not printed");
    logger.assert(false, "expected", { status: 500 });

    expect(error).toHaveBeenCalledTimes(1);
    expect(assertion).toHaveBeenNthCalledWith(1, true, "not printed");
    expect(assertion).toHaveBeenNthCalledWith(2, false, "expected", {
      status: 500,
    });
  });

  it("delegates count and countReset without changing their labels", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const count = vi
      .spyOn(console, "count")
      .mockImplementation(() => undefined);
    const countReset = vi
      .spyOn(console, "countReset")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.count("requests");
    logger.countReset("requests");

    expect(count).toHaveBeenCalledWith("requests");
    expect(countReset).toHaveBeenCalledWith("requests");
  });

  it("delegates the complete timer lifecycle", () => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
    const time = vi.spyOn(console, "time").mockImplementation(() => undefined);
    const timeLog = vi
      .spyOn(console, "timeLog")
      .mockImplementation(() => undefined);
    const timeEnd = vi
      .spyOn(console, "timeEnd")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.time("build");
    logger.timeLog("build", "bundled");
    logger.timeEnd("build");

    expect(time).toHaveBeenCalledWith("build");
    expect(timeLog).toHaveBeenCalledWith("build", "bundled");
    expect(timeEnd).toHaveBeenCalledWith("build");
  });
});

describe("TsundereConsole.status", () => {
  it("prints 200 OK and its dedicated success message", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.status(200);

    expect(log).toHaveBeenNthCalledWith(1, "200 OK");
    expect(log).toHaveBeenNthCalledWith(
      2,
      "ふ、ふん。ちゃんと成功したみたいね。別に褒めてないけど。",
    );
  });

  it("uses console.warn for 404 and forwards supplemental data unchanged", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);
    const context = { requestId: "req-1" };

    logger.status(404, "GET /users/123", context);

    expect(warn).toHaveBeenNthCalledWith(1, "404 Not Found");
    expect(warn).toHaveBeenNthCalledWith(
      2,
      "はぁ？そんなものどこにもないんだけど。",
    );
    expect(warn).toHaveBeenNthCalledWith(3, "GET /users/123", context);
  });

  it("uses console.error for a dedicated 500 response", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.status(500);

    expect(error).toHaveBeenNthCalledWith(1, "500 Internal Server Error");
    expect(error).toHaveBeenNthCalledWith(
      2,
      "ちょっと！今度はサーバー側が壊れてるじゃない！",
    );
  });

  it("uses a code-specific message for 418", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.status(418);

    expect(warn).toHaveBeenNthCalledWith(1, "418 I'm a Teapot");
    expect(warn).toHaveBeenNthCalledWith(
      2,
      "……ティーポットなんだけど。文句ある？",
    );
  });

  it("uses the category fallback for an unregistered code", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    logger.status(499);

    expect(warn).toHaveBeenNthCalledWith(1, "499 Unknown Status");
    expect(warn).toHaveBeenNthCalledWith(
      2,
      "ちょっと、リクエストを間違えてるんだけど。",
    );
  });

  it("handles unknown 5xx codes without throwing", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere().setRandomness(false);

    expect(() => logger.status(599)).not.toThrow();
    expect(error).toHaveBeenNthCalledWith(1, "599 Unknown Status");
    expect(error).toHaveBeenNthCalledWith(
      2,
      "ちょっと、サーバー側で失敗してるじゃない。",
    );
  });

  it("applies level, language, and deterministic randomness settings", () => {
    const error = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    const logger = createTsundere().configure({
      level: "extreme",
      language: "en",
      randomness: false,
    });

    logger.status(503);
    logger.status(503);

    expect(error).toHaveBeenNthCalledWith(
      2,
      "I absolutely can't right now! Come back later!!",
    );
    expect(error).toHaveBeenNthCalledWith(
      4,
      "I absolutely can't right now! Come back later!!",
    );
  });

  it.each([[-1], [0], [999], [Number.NaN]])(
    "gracefully handles invalid status value %s",
    (code) => {
      const warn = vi
        .spyOn(console, "warn")
        .mockImplementation(() => undefined);
      const logger = createTsundere().setRandomness(false);

      expect(() => logger.status(code)).not.toThrow();
      expect(warn).toHaveBeenNthCalledWith(1, `${String(code)} Invalid Status`);
      expect(warn).toHaveBeenNthCalledWith(
        2,
        "ちょっと、このステータス何なのよ……。",
      );
    },
  );

  it("allows status messages to be overridden through setMessages", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const logger = createTsundere()
      .setRandomness(false)
      .setMessages({ ja: { status: { normal: ["カスタムHTTPよ。"] } } });

    logger.status(404);

    expect(warn).toHaveBeenNthCalledWith(2, "カスタムHTTPよ。");
  });
});
