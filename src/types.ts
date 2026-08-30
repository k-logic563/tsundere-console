export type TsundereLevel = "mild" | "normal" | "extreme";

export type TsundereLanguage = "ja" | "en";

export type TsundereMethod =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "debug"
  | "dir"
  | "table"
  | "group"
  | "groupCollapsed"
  | "groupEnd"
  | "time"
  | "timeLog"
  | "timeEnd"
  | "count"
  | "countReset"
  | "assert"
  | "trace"
  | "clear"
  | "success"
  | "praise"
  | "complain"
  | "panic"
  | "status";

export type HttpStatusCategory =
  "informational" | "success" | "redirect" | "clientError" | "serverError";

export interface TsundereConfig {
  level: TsundereLevel;
  language: TsundereLanguage;
  randomness: boolean;
}

export type TsundereMessages = Record<
  TsundereLanguage,
  Record<TsundereMethod, Record<TsundereLevel, readonly string[]>>
>;

export type CustomTsundereMessages = Partial<{
  [Language in TsundereLanguage]: Partial<{
    [Method in TsundereMethod]: Partial<
      Record<TsundereLevel, readonly string[]>
    >;
  }>;
}>;

export type TsundereConfigInput = Partial<TsundereConfig>;
