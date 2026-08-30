import type {
  HttpStatusCategory,
  TsundereLanguage,
  TsundereLevel,
} from "./types";

type LevelMessages = Record<TsundereLevel, readonly string[]>;

interface LanguageHttpStatusMessages {
  categories: Record<HttpStatusCategory, LevelMessages>;
  codes: Readonly<Partial<Record<number, LevelMessages>>>;
  invalid: LevelMessages;
}

type HttpStatusChannel = "log" | "info" | "warn" | "error";

export const HTTP_REASON_PHRASES: Readonly<Partial<Record<number, string>>> = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Content Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Content",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
};

const jaCategories: Record<HttpStatusCategory, LevelMessages> = {
  informational: {
    mild: ["処理中みたい。少し待ってね。", "途中経過を知らせておくわ。"],
    normal: [
      "まだ途中なんだから、慌てないでよね。",
      "情報だけは教えてあげる。まだ終わりじゃないわよ。",
    ],
    extreme: [
      "まだ処理中よ！勝手に終わったと思わないで！！",
      "途中経過なんだから、ちゃんと待ちなさいっ！！",
    ],
  },
  success: {
    mild: ["ちゃんと成功したみたいね。", "うまく処理できたわ。"],
    normal: [
      "ふ、ふん。ちゃんと成功したみたいね。別に褒めてないけど。",
      "成功よ。当然の結果なんだから。",
    ],
    extreme: [
      "大成功じゃない！べ、別に嬉しくなんかないけどっ！！",
      "完璧に通ったわよ！ちょっとだけ見直したわ！！",
    ],
  },
  redirect: {
    mild: ["別の場所を案内されたみたい。", "移動先を確認してね。"],
    normal: [
      "ここじゃないわよ。ちゃんと移動先を見なさい。",
      "別の場所に行けって。迷わないでよね。",
    ],
    extreme: [
      "場所が変わってるわよ！今すぐ移動しなさい！！",
      "ここじゃないって言ってるでしょ！転送先を見なさいっ！！",
    ],
  },
  clientError: {
    mild: [
      "リクエストに問題があるみたい。",
      "送った内容を確認したほうがいいわ。",
    ],
    normal: [
      "ちょっと、リクエストを間違えてるんだけど。",
      "そっちの送信内容がおかしいわよ。確認しなさい。",
    ],
    extreme: [
      "リクエストがめちゃくちゃじゃない！今すぐ直しなさい！！",
      "そっちのミスよ！ちゃんと確認して送り直してっ！！",
    ],
  },
  serverError: {
    mild: [
      "サーバー側で問題が起きたみたい。",
      "今はサーバーの調子が悪いみたいね。",
    ],
    normal: [
      "ちょっと、サーバー側で失敗してるじゃない。",
      "今度はサーバーの問題よ。私のせいじゃないからね。",
    ],
    extreme: [
      "サーバーが完全に壊れてるじゃない！！今すぐ直して！！",
      "大変！サーバー側が盛大にやらかしてるわよっ！！",
    ],
  },
};

const enCategories: Record<HttpStatusCategory, LevelMessages> = {
  informational: {
    mild: [
      "It's still processing. Give it a moment.",
      "Here's a little progress update.",
    ],
    normal: [
      "It's not finished yet, so don't get impatient.",
      "I'll give you an update, but we're not done yet.",
    ],
    extreme: [
      "It's still processing! Don't act like it's finished!!",
      "This is only an update, so wait properly!!",
    ],
  },
  success: {
    mild: [
      "It looks like the request succeeded.",
      "Everything worked correctly.",
    ],
    normal: [
      "Hmph. It succeeded, just as it should.",
      "It worked. D-Don't expect me to praise you.",
    ],
    extreme: [
      "A complete success! N-Not that I'm thrilled or anything!!",
      "It passed perfectly! I'm almost impressed!!",
    ],
  },
  redirect: {
    mild: [
      "It looks like you need to go somewhere else.",
      "Check the new location.",
    ],
    normal: [
      "This isn't the right place. Follow the redirect.",
      "You've been sent somewhere else, so don't get lost.",
    ],
    extreme: [
      "The location changed! Follow it right now!!",
      "I said it's not here! Check the redirect!!",
    ],
  },
  clientError: {
    mild: [
      "There seems to be a problem with the request.",
      "You should check what you sent.",
    ],
    normal: [
      "Hey, there's something wrong with your request.",
      "Your request is the problem. Check it properly.",
    ],
    extreme: [
      "That request is a mess! Fix it right now!!",
      "This one's on you! Check it and send it again!!",
    ],
  },
  serverError: {
    mild: [
      "Something went wrong on the server.",
      "The server seems to be having trouble.",
    ],
    normal: [
      "Hey, the server failed this time.",
      "It's a server problem. D-Don't blame me for it.",
    ],
    extreme: [
      "The server is completely broken! Fix it now!!",
      "Disaster! The server messed up spectacularly!!",
    ],
  },
};

const jaCodes: LanguageHttpStatusMessages["codes"] = {
  200: {
    mild: ["問題なく成功したわ。", "ちゃんと応答できたみたいね。"],
    normal: [
      "ふ、ふん。ちゃんと成功したみたいね。別に褒めてないけど。",
      "200よ。これくらい成功して当然でしょ。",
    ],
    extreme: [
      "完璧に成功したじゃない！べ、別に喜んでないけどっ！！",
      "200 OK！やればできるじゃないっ！！",
    ],
  },
  201: {
    mild: ["新しく作成できたわ。", "リソースができあがったみたい。"],
    normal: [
      "ちゃんと作れたじゃない。少しはやるわね。",
      "新しいリソースよ。大事に使いなさいよね。",
    ],
    extreme: [
      "作成成功よ！す、すごいじゃない！！",
      "新しいリソースが完成したわよっ！！",
    ],
  },
  204: {
    mild: [
      "成功したけど、返す内容はないわ。",
      "中身はないけど処理は終わったわよ。",
    ],
    normal: [
      "成功よ。何も返ってこないからって心配しないで。",
      "内容は空よ。べ、別に忘れたわけじゃないから。",
    ],
    extreme: [
      "成功してるけど中身は空っぽよ！勘違いしないで！！",
      "返すものはないけど処理は完璧なんだからっ！！",
    ],
  },
  301: {
    mild: ["その場所は恒久的に移動したわ。", "新しいURLを使ってね。"],
    normal: [
      "もうここにはないわよ。新しい場所を覚えなさい。",
      "ずっと移動したんだから、次から間違えないでよね。",
    ],
    extreme: [
      "完全に引っ越したの！今すぐURLを直しなさい！！",
      "もう戻ってこないわよ！新しい場所へ行ってっ！！",
    ],
  },
  302: {
    mild: ["一時的に別の場所で見つかったわ。", "今は案内された先を見てね。"],
    normal: [
      "今だけ別の場所よ。ちゃんと転送先を見なさい。",
      "見つかったけどここじゃないわ。ついてきなさいよね。",
    ],
    extreme: [
      "別の場所で見つかったわ！今すぐ追いかけなさい！！",
      "ここじゃないって！転送先へ急いでっ！！",
    ],
  },
  304: {
    mild: [
      "変更はないから、そのまま使って大丈夫。",
      "前の内容から変わっていないわ。",
    ],
    normal: [
      "変わってないわよ。キャッシュを使いなさい。",
      "更新なし。無駄に取り直さなくていいからね。",
    ],
    extreme: [
      "何も変わってないってば！キャッシュを使いなさい！！",
      "更新なしよ！何度も聞かないでっ！！",
    ],
  },
  400: {
    mild: ["リクエストの形がよくないみたい。", "送信内容を見直してね。"],
    normal: [
      "そのリクエスト、間違ってるわよ。",
      "何を送ったのよ。ちゃんと直しなさい。",
    ],
    extreme: [
      "ひどいリクエスト！全部見直しなさい！！",
      "そんな内容じゃ受け取れないってばっ！！",
    ],
  },
  401: {
    mild: ["認証が必要みたい。", "先に身元を確認させてね。"],
    normal: [
      "誰よアンタ。勝手に入ってこないで。",
      "認証もなしに入れると思ったの？",
    ],
    extreme: [
      "誰なのよ！！認証するまで絶対入れないんだから！！",
      "勝手に入らないで！まず名乗りなさいっ！！",
    ],
  },
  403: {
    mild: [
      "ここへのアクセスは許可されてないわ。",
      "ごめん、ここには入れないの。",
    ],
    normal: [
      "ダメって言ってるでしょ。入れてあげない。",
      "権限がないんだから、諦めなさい。",
    ],
    extreme: [
      "絶対ダメ！！何があっても入れないんだから！！",
      "立入禁止よ！今すぐ引き返しなさいっ！！",
    ],
  },
  404: {
    mild: ["探しているものは見つからないみたい。", "ここには何もないわ。"],
    normal: [
      "はぁ？そんなものどこにもないんだけど。",
      "見つからないわよ。場所を間違えたんじゃない？",
    ],
    extreme: [
      "ないものはないの！！URLをちゃんと確認しなさい！！",
      "どこを探してるのよ！そんなもの存在しないわっ！！",
    ],
  },
  408: {
    mild: ["待ち時間を過ぎちゃったみたい。", "応答が間に合わなかったわ。"],
    normal: [
      "遅すぎ。待ちくたびれたんだけど。",
      "タイムアウトよ。いつまで待たせる気？",
    ],
    extreme: [
      "遅いっ！！もう待てないから切ったわよ！！",
      "時間切れよ！どれだけ待たせるのっ！！",
    ],
  },
  409: {
    mild: ["今の状態とぶつかっているみたい。", "競合を解決してから試してね。"],
    normal: [
      "その操作、今の状態と喧嘩してるわよ。",
      "競合してるんだけど。先に整理しなさい。",
    ],
    extreme: [
      "完全に衝突してるじゃない！先に解決しなさい！！",
      "競合よっ！そのまま押し通せると思わないで！！",
    ],
  },
  418: {
    mild: ["どうやらティーポットみたい。", "コーヒーは淹れられないわよ。"],
    normal: [
      "……ティーポットなんだけど。文句ある？",
      "コーヒー？私はティーポットよ。間違えないで。",
    ],
    extreme: [
      "ティーポットだって言ってるでしょ！！コーヒーは無理っ！！",
      "私はティーポットなの！そこまで言わせないでよっ！！",
    ],
  },
  429: {
    mild: [
      "リクエストが多すぎるみたい。少し待ってね。",
      "ちょっと休んでからもう一度試して。",
    ],
    normal: [
      "ちょ、ちょっと送りすぎ！少しくらい待ちなさいよ！",
      "何回送るのよ。少し落ち着きなさい。",
    ],
    extreme: [
      "送りすぎよおおお！！今すぐ手を止めなさい！！",
      "連打しないでっ！しばらく待ちなさいってば！！",
    ],
  },
  500: {
    mild: [
      "サーバー内部で問題が起きたみたい。",
      "ごめん、サーバー側で失敗したわ。",
    ],
    normal: [
      "ちょっと！今度はサーバー側が壊れてるじゃない！",
      "内部エラーよ。こっちで何かやらかしたみたい。",
    ],
    extreme: [
      "サーバー内部が完全に壊れてるじゃない！！",
      "大惨事よ！サーバーが盛大にエラーを出してるわっ！！",
    ],
  },
  502: {
    mild: [
      "接続先から正しい応答が来なかったみたい。",
      "ゲートウェイの向こうで問題があるわ。",
    ],
    normal: [
      "向こうのサーバー、変な応答を返してるんだけど。",
      "悪いゲートウェイね。接続先を確認しなさい。",
    ],
    extreme: [
      "接続先の応答がめちゃくちゃよ！！",
      "ゲートウェイが壊れてるじゃない！上流を確認してっ！！",
    ],
  },
  503: {
    mild: ["今はサービスを利用できないみたい。", "少し時間を置いて試してね。"],
    normal: [
      "い、今は無理！あとにして！",
      "サービス停止中よ。少しくらい待ちなさい。",
    ],
    extreme: [
      "今は絶対無理なの！！あとで来てってば！！",
      "サービス停止中！復旧するまで待ちなさいっ！！",
    ],
  },
  504: {
    mild: [
      "接続先の応答が間に合わなかったわ。",
      "ゲートウェイで時間切れみたい。",
    ],
    normal: [
      "向こうのサーバー、いつまで待たせるのよ。",
      "ゲートウェイがタイムアウトしたわ。遅すぎ。",
    ],
    extreme: [
      "上流が遅すぎるのよ！もう時間切れっ！！",
      "待たせすぎ！ゲートウェイが諦めちゃったじゃない！！",
    ],
  },
};

const enCodes: LanguageHttpStatusMessages["codes"] = {
  200: {
    mild: [
      "The request succeeded without a problem.",
      "It responded correctly.",
    ],
    normal: [
      "Hmph. It worked properly. D-Don't expect praise.",
      "It's 200 OK. Success should be obvious.",
    ],
    extreme: [
      "A perfect success! N-Not that I'm happy about it!!",
      "200 OK! See, you can do it when you try!!",
    ],
  },
  201: {
    mild: [
      "The new resource was created.",
      "It looks like creation succeeded.",
    ],
    normal: [
      "You actually created it. Not bad.",
      "Here's your new resource. Take good care of it.",
    ],
    extreme: [
      "Creation succeeded! Th-That's actually impressive!!",
      "Your brand-new resource is ready!!",
    ],
  },
  204: {
    mild: [
      "It succeeded, but there's no content to return.",
      "The work is done; there's just no body.",
    ],
    normal: [
      "It succeeded. Don't panic just because the body is empty.",
      "There's no content. I didn't forget it or anything.",
    ],
    extreme: [
      "It succeeded, but the body is empty! Don't misunderstand!!",
      "There's nothing to return, but it worked perfectly!!",
    ],
  },
  301: {
    mild: [
      "That location has moved permanently.",
      "Use the new URL from now on.",
    ],
    normal: [
      "It's not here anymore. Remember the new location.",
      "It moved for good, so don't use the old URL again.",
    ],
    extreme: [
      "It moved permanently! Update that URL right now!!",
      "It's never coming back here! Go to the new location!!",
    ],
  },
  302: {
    mild: [
      "It was found somewhere else for now.",
      "Follow the temporary location.",
    ],
    normal: [
      "It's somewhere else for the moment. Follow the redirect.",
      "I found it, but not here. Try to keep up.",
    ],
    extreme: [
      "It's at another location! Follow it right now!!",
      "Not here! Hurry to the redirect target!!",
    ],
  },
  304: {
    mild: [
      "Nothing changed, so your cached copy is fine.",
      "It's unchanged from before.",
    ],
    normal: [
      "It hasn't changed. Just use the cache.",
      "No update. Don't download it all over again.",
    ],
    extreme: [
      "Nothing changed! Use your cache already!!",
      "Not modified! Stop asking me again and again!!",
    ],
  },
  400: {
    mild: [
      "The request doesn't look quite right.",
      "Please check what you sent.",
    ],
    normal: [
      "That request is wrong, you know.",
      "What did you send me? Fix it properly.",
    ],
    extreme: [
      "What a terrible request! Check every part of it!!",
      "I can't accept that mess! Fix it!!",
    ],
  },
  401: {
    mild: ["Authentication is required.", "Let me verify who you are first."],
    normal: [
      "Who are you? Don't just walk in here uninvited.",
      "You thought you could enter without authenticating?",
    ],
    extreme: [
      "Who are you?! You're not getting in without authentication!!",
      "Don't barge in! Identify yourself first!!",
    ],
  },
  403: {
    mild: [
      "You aren't allowed to access this.",
      "Sorry, you can't come in here.",
    ],
    normal: [
      "I said no. I'm not letting you in.",
      "You don't have permission, so give it up.",
    ],
    extreme: [
      "Absolutely not! I'm never letting you in!!",
      "No entry! Turn around right now!!",
    ],
  },
  404: {
    mild: [
      "I couldn't find what you're looking for.",
      "There doesn't seem to be anything here.",
    ],
    normal: [
      "Huh? There's nothing here. What exactly were you looking for?",
      "It's not found. Did you get the location wrong?",
    ],
    extreme: [
      "It's not here! Check that URL properly!!",
      "Where are you even looking?! That doesn't exist!!",
    ],
  },
  408: {
    mild: ["The request took too long.", "The response didn't arrive in time."],
    normal: [
      "Too slow. I got tired of waiting.",
      "Request timeout. How long were you going to keep me waiting?",
    ],
    extreme: [
      "Too slow! I stopped waiting!!",
      "Time's up! How dare you make me wait that long!!",
    ],
  },
  409: {
    mild: [
      "That conflicts with the current state.",
      "Resolve the conflict and try again.",
    ],
    normal: [
      "That operation is fighting with the current state.",
      "There's a conflict. Sort it out first.",
    ],
    extreme: [
      "It's a complete conflict! Resolve it first!!",
      "Conflict detected! You can't just force it through!!",
    ],
  },
  418: {
    mild: ["Apparently, I'm a teapot.", "I can't brew coffee for you."],
    normal: [
      "...I'm a teapot. Got a problem with that?",
      "Coffee? I'm a teapot, so don't get confused.",
    ],
    extreme: [
      "I said I'm a teapot! I can't make coffee!!",
      "I'm a teapot! Don't make me say it again!!",
    ],
  },
  429: {
    mild: [
      "That's too many requests. Please wait a little.",
      "Take a short break before trying again.",
    ],
    normal: [
      "H-Hey, that's too many requests! Wait a little!",
      "How many times are you going to send that? Calm down.",
    ],
    extreme: [
      "Way too many requests! Stop right now!!",
      "Quit spamming me! I said wait a while!!",
    ],
  },
  500: {
    mild: [
      "Something failed inside the server.",
      "Sorry, the server ran into a problem.",
    ],
    normal: [
      "Hey! The server is the one that's broken this time!",
      "Internal error. Something went wrong on our side.",
    ],
    extreme: [
      "The server is completely broken inside!!",
      "It's a disaster! The server threw a massive error!!",
    ],
  },
  502: {
    mild: [
      "The upstream server sent a bad response.",
      "There's a problem beyond the gateway.",
    ],
    normal: [
      "The upstream server sent me a weird response.",
      "Bad gateway. You should check the upstream service.",
    ],
    extreme: [
      "That upstream response is a complete mess!!",
      "The gateway is broken! Check upstream right now!!",
    ],
  },
  503: {
    mild: [
      "The service isn't available right now.",
      "Please wait a little and try again.",
    ],
    normal: [
      "I-I can't handle this right now! Come back later!",
      "The service is unavailable. Just wait a little.",
    ],
    extreme: [
      "I absolutely can't right now! Come back later!!",
      "Service unavailable! Wait until it's back!!",
    ],
  },
  504: {
    mild: [
      "The upstream response didn't arrive in time.",
      "The gateway timed out.",
    ],
    normal: [
      "How long is that upstream server going to make me wait?",
      "The gateway timed out. Way too slow.",
    ],
    extreme: [
      "Upstream is far too slow! Time's up!!",
      "It took so long that the gateway gave up!!",
    ],
  },
};

export const httpStatusMessages: Record<
  TsundereLanguage,
  LanguageHttpStatusMessages
> = {
  ja: {
    categories: jaCategories,
    codes: jaCodes,
    invalid: {
      mild: [
        "有効なHTTPステータスコードではないみたい。",
        "その値はステータスコードとして扱えないわ。",
      ],
      normal: [
        "ちょっと、このステータス何なのよ……。",
        "それ、HTTPステータスコードじゃないんだけど。",
      ],
      extreme: [
        "何そのステータス！？正しいコードを渡しなさい！！",
        "そんなコード知らないわよ！100から599の整数にしてっ！！",
      ],
    },
  },
  en: {
    categories: enCategories,
    codes: enCodes,
    invalid: {
      mild: [
        "That doesn't seem to be a valid HTTP status code.",
        "I can't treat that value as an HTTP status.",
      ],
      normal: [
        "Hey, what kind of status is that supposed to be?",
        "That's not an HTTP status code, you know.",
      ],
      extreme: [
        "What is that status?! Give me a real code!!",
        "I don't know that code! Use an integer from 100 to 599!!",
      ],
    },
  },
};

export function getHttpStatusCategory(
  code: number,
): HttpStatusCategory | undefined {
  if (!Number.isInteger(code) || code < 100 || code > 599) return undefined;
  if (code < 200) return "informational";
  if (code < 300) return "success";
  if (code < 400) return "redirect";
  if (code < 500) return "clientError";
  return "serverError";
}

export function getHttpStatusChannel(
  category: HttpStatusCategory | undefined,
): HttpStatusChannel {
  switch (category) {
    case "informational":
    case "redirect":
      return "info";
    case "success":
      return "log";
    case "serverError":
      return "error";
    case "clientError":
    default:
      return "warn";
  }
}

export function getHttpReasonPhrase(code: number): string {
  if (getHttpStatusCategory(code) === undefined) return "Invalid Status";
  return HTTP_REASON_PHRASES[code] ?? "Unknown Status";
}
