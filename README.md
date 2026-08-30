# tsundere-console

> あなたのコンソールを、ツンデレに。

`console.log()` は、ちょっと素直すぎました。

`tsundere-console` は、標準の `console` に近い使い方のまま、ツンデレ風のセリフを添えて出力するnpmライブラリです。元の出力と引数はそのまま維持し、日本語・英語、Node.js・Browserの両方に対応しています。グローバルの `console` は上書きしません。

## インストール

```bash
npm install tsundere-console
```

## クイックスタート

```ts
import { tsundere } from "tsundere-console";

tsundere.success("Build complete");
tsundere.warn("Deprecated API");
tsundere.error("Connection failed");
tsundere.status(404);
```

## 出力例

デフォルトではセリフがランダムに選ばれるため、文言は実行ごとに変わることがあります。デフォルト設定（日本語・`normal`）での出力例です。

```text
ふ、ふん。成功するくらい当然でしょ。
Build complete

ちょっと！あとで困っても知らないからね。
Deprecated API

はぁ？またエラー出してるんだけど。
Connection failed

404 Not Found
はぁ？そんなものどこにもないんだけど。
```

## 特徴

- 標準の `console` に近く、元の引数を維持するAPI
- 日本語・英語のツンデレ風メッセージ
- `mild` / `normal` / `extreme` の3段階
- ランダム表示と、テスト向けの固定表示
- HTTPステータスコードに応じた専用リアクション
- ESM / CommonJS / TypeScript対応
- Node.js / Browser対応
- カスタムメッセージ対応
- ランタイム依存ゼロ
- グローバル `console` の変更なし

## 対応メソッド

### console互換メソッド

| メソッド                      | 説明                                                   |
| ----------------------------- | ------------------------------------------------------ |
| `log(...data)`                | ツンデレ風の `console.log()`                           |
| `info(...data)`               | ツンデレ風の `console.info()`                          |
| `warn(...data)`               | ツンデレ風の `console.warn()`                          |
| `error(...data)`              | ツンデレ風の `console.error()`                         |
| `debug(...data)`              | ツンデレ風の `console.debug()`                         |
| `dir(...args)`                | セリフを出力してから `console.dir()` を呼び出す        |
| `table(...args)`              | セリフを出力してから `console.table()` を呼び出す      |
| `group(...data)`              | ラベル付きのconsoleグループを開始する                  |
| `groupCollapsed(...data)`     | 対応環境で折りたたまれたグループを開始する             |
| `groupEnd()`                  | 現在のconsoleグループを終了する                        |
| `time(label?)`                | ネイティブのconsoleタイマーを開始する                  |
| `timeLog(label?, ...data)`    | 実行中のタイマーを出力する                             |
| `timeEnd(label?)`             | タイマーを終了して結果を出力する                       |
| `count(label?)`               | ネイティブのconsoleカウンターを加算する                |
| `countReset(label?)`          | consoleカウンターをリセットする                        |
| `assert(condition?, ...data)` | 条件が偽のときだけリアクションし、元のassertを呼び出す |
| `trace(...data)`              | セリフとネイティブのstack traceを出力する              |
| `clear()`                     | セリフを出力してから `console.clear()` を呼び出す      |

### 独自メソッド

| メソッド                | 出力先               | 説明                                         |
| ----------------------- | -------------------- | -------------------------------------------- |
| `success(...data)`      | `console.log`        | 成功を渋々お祝いする                         |
| `praise(...data)`       | `console.log`        | 素直になりすぎない程度に褒める               |
| `complain(...data)`     | `console.warn`       | 渡された内容に文句を言う                     |
| `panic(...data)`        | `console.error`      | 緊急事態に全力で慌てる                       |
| `status(code, ...data)` | ステータス分類による | HTTPステータスコードに応じてリアクションする |

console互換メソッドは、元の引数を維持して対応する `console` APIへ渡します。timerやcounterなどの状態を持つメソッドも、ネイティブ実装へ処理を委譲します。`assert()` と `status()` の出力順は後述の注意事項を参照してください。

## HTTPステータス

`status()` は、ステータスコードとreason phrase、コードに応じたツンデレリアクション、任意の補足データの順に出力します。

```ts
tsundere.status(200);
tsundere.status(404);
tsundere.status(429);
tsundere.status(500);

tsundere.status(404, "GET /users/123", { requestId: "req-1" });
```

```text
404 Not Found
はぁ？そんなものどこにもないんだけど。
GET /users/123 { requestId: "req-1" }
```

HTTPステータスの分類に応じて、出力先も切り替わります。

| ステータス | カテゴリ      | 出力先          |
| ---------- | ------------- | --------------- |
| 1xx        | Informational | `console.info`  |
| 2xx        | Success       | `console.log`   |
| 3xx        | Redirect      | `console.info`  |
| 4xx        | Client Error  | `console.warn`  |
| 5xx        | Server Error  | `console.error` |

`200`, `201`, `204`, `301`, `302`, `304`, `400`, `401`, `403`, `404`, `408`, `409`, `418`, `429`, `500`, `502`, `503`, `504` には専用リアクションがあります。ページが見つからない、ティーポットだった、リクエストを送りすぎた、サービスが止まっている、といった状況ごとに反応が変わります。

それ以外の100〜599の整数は、1xx〜5xxのカテゴリ共通メッセージへフォールバックします。標準コードには対応するreason phraseを表示し、`599`のような未登録コードは `Unknown Status` とカテゴリに応じたリアクションを出力します。

不正値でも例外は投げません。整数でない値、有限でない数値、100〜599の範囲外は、`console.warn`へ `Invalid Status` と専用のフォールバックメッセージを出力します。

### `fetch` と組み合わせる

```ts
const response = await fetch("/api/users");

tsundere.status(response.status, `${response.status} ${response.url}`);
```

Browserのほか、`fetch`を利用できるNode.js環境でも同じように使えます。

## ツンデレレベル

デフォルトは `normal` です。

```ts
tsundere.setLevel("mild");
tsundere.setLevel("normal");
tsundere.setLevel("extreme");
```

| レベル    | 雰囲気                           |
| --------- | -------------------------------- |
| `mild`    | ちょっと優しめ。軽くツン         |
| `normal`  | 王道のツンデレ。標準火力         |
| `extreme` | 容赦なし。感情も句読点も最大火力 |

## 言語

デフォルトは日本語（`ja`）です。

```ts
tsundere.setLanguage("ja");
tsundere.setLanguage("en");
```

両言語とも、すべての対応メソッド、3段階のlevel、HTTPカテゴリ、専用HTTPステータスコード向けのメッセージを収録しています。

## ランダム表示

デフォルトではランダム表示が有効です。

```ts
tsundere.setRandomness(true); // ランダムに選択
tsundere.setRandomness(false); // 常に配列の先頭を選択
```

`false` にすると同じ条件で常に同じセリフが選ばれるため、自動テスト、スナップショット、ドキュメント、デモの出力を固定したい場合に便利です。

## 設定

すべての設定をまとめて変更できます。

```ts
tsundere.configure({
  level: "extreme",
  language: "en",
  randomness: false,
});
```

現在の設定は `getConfig()` で取得できます。

```ts
console.log(tsundere.getConfig());
// { level: "extreme", language: "en", randomness: false }
```

`configure()` は一部の設定だけを渡すこともできます。各setterと `configure()` は同じインスタンスを返すため、必要に応じてメソッドチェーンが可能です。`getConfig()` は現在の設定のコピーを返します。

exportされる `tsundere` は、呼び出し間で設定を共有するシングルトンです。設定を分離したい場合は、独立したインスタンスを作成できます。

```ts
import { createTsundere } from "tsundere-console";

const buildLogger = createTsundere().setLanguage("en").setLevel("mild");
```

## カスタムメッセージ

`setMessages()` は、言語・メソッド・levelの階層ごとにdeep mergeします。指定した階層の配列は組み込み配列を置き換え、指定していない配列はそのまま残ります。複数回呼び出した場合も、それまでの上書き内容は維持されます。

```ts
tsundere.setMessages({
  ja: {
    error: {
      normal: ["また壊したの？ほんっとしょうがないんだから。"],
    },
  },
});
```

空配列を指定すると、その言語・メソッド・levelに対する追加セリフだけを無効化できます。元の `console` 呼び出しは維持されます。

HTTPメッセージも同じスキーマで変更できます。組み込みのHTTPリアクションはコードやカテゴリから選択されるため、カスタムの `status` 配列は、指定した言語・levelのすべてのHTTPリアクションを置き換えます。

```ts
tsundere.setMessages({
  en: {
    status: {
      normal: ["Custom HTTP response."],
    },
  },
});
```

`status`へ空配列を指定した場合も、ステータス行と補足データは引き続き出力されます。

## Node.jsで使う

Node.js 18以降に対応しています。

ESM:

```js
import { tsundere } from "tsundere-console";

tsundere.log("Server started");
tsundere.status(200, "GET /health");
```

CommonJS:

```js
const { tsundere } = require("tsundere-console");

tsundere.log("Server started");
```

## Browserで使う

Vite、Webpack、Parcel、各種フレームワークのバンドラーなどから、通常のnpm importとして利用できます。ESM buildにはNode.js専用のランタイムimportが含まれていません。

```ts
import { tsundere } from "tsundere-console";

document.querySelector("button")?.addEventListener("click", async () => {
  const response = await fetch("/api/action", { method: "POST" });
  tsundere.status(response.status, response.url);
});
```

group、table、trace、clearなどの表示方法は、ブラウザのネイティブ `console` 実装によって異なる場合があります。

## TypeScript

ESM・CommonJS両方のTypeScript型定義を同梱しています。公開型はnamed exportとして利用できます。

```ts
import {
  tsundere,
  type HttpStatusCategory,
  type TsundereConfig,
  type TsundereLanguage,
  type TsundereLevel,
  type TsundereMethod,
} from "tsundere-console";

const level: TsundereLevel = "normal";
const config: TsundereConfig = tsundere.getConfig();
```

このほか、`CustomTsundereMessages`、`TsundereConfigInput`、`TsundereMessages` もexportしています。

## APIリファレンス

### ログ・診断

| API                                      | 説明                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| `log`, `info`, `warn`, `error`, `debug`  | 対応するconsole出力へツンデレ風セリフを追加            |
| `dir`, `table`                           | オブジェクト・テーブル形式で内容を確認                 |
| `group`, `groupCollapsed`, `groupEnd`    | ネイティブのconsoleグループ                            |
| `time`, `timeLog`, `timeEnd`             | ラベル付きのネイティブタイマー                         |
| `count`, `countReset`                    | ラベル付きのネイティブカウンター                       |
| `assert`, `trace`, `clear`               | assertion、stack trace、console clear                  |
| `success`, `praise`, `complain`, `panic` | 表現豊かな独自ログメソッド                             |
| `status(code, ...data)`                  | HTTPステータス行、リアクション、任意の補足データを出力 |

### 設定・インスタンス

| API                        | 説明                                                  |
| -------------------------- | ----------------------------------------------------- |
| `setLevel(level)`          | `mild` / `normal` / `extreme`を選択                   |
| `setLanguage(language)`    | `ja` / `en`を選択                                     |
| `setRandomness(enabled)`   | ランダム表示・固定表示を切り替える                    |
| `configure(options)`       | 一部またはすべての設定をまとめて変更                  |
| `getConfig()`              | 現在の設定のコピーを返す                              |
| `setMessages(messages)`    | カスタムメッセージ配列をdeep mergeする                |
| `createTsundere(console?)` | 指定した `Console` インスタンスを使う独立loggerを作成 |
| `tsundere`                 | すぐに使える共有シングルトン                          |

このパッケージはnamed exportを使用し、グローバル `console` の変更や置き換えは行いません。

### console動作上の注意

- console互換メソッドは、セリフを先に出力してから元の引数を渡します。
- `status()` はステータス行、リアクション、補足データの順で出力します。
- オブジェクト表示、グループ、タイマー、カウンター、trace、clearのセリフには `console.log` を使い、状態を持つネイティブメソッドから分離しています。
- `assert()` は条件が偽の場合だけリアクションを追加します。
- `clear()` はリアクション後にネイティブのclearを呼ぶため、ターミナルによってはリアクションもすぐに画面から消えます。

## 開発

```bash
npm install
npm run build
npm test
npm run demo
```

- `npm run build`: ESM、CommonJS、型定義、source mapを生成
- `npm test`: Vitestのテストを実行
- `npm run demo`: build後のESM成果物を使ったターミナルデモを実行

### Browser Playground

```bash
npm run demo:browser
```

表示されたローカルURLを開き、DevTools → Consoleを表示してPlaygroundのボタンを操作してください。ページは生成済みの `dist/index.js` をimportし、基本ログ、HTTPステータス、設定切り替え、オブジェクト・テーブル表示、独自APIを確認できます。`4173`以外のポートを使う場合は `BROWSER_DEMO_PORT`を指定できます。

```bash
BROWSER_DEMO_PORT=8080 npm run demo:browser
```

追加の品質チェック:

```bash
npm run lint
npm run format:check
npm pack
```

`npm pack` はpublishを行わず、実際に公開されるtarballを生成します。buildにはtsup、テストにはVitest、静的解析にはESLint、フォーマットにはPrettierを使用しています。

## ライセンス

MIT
