import type { TsundereMessages } from "../types";

type LanguageMessages = TsundereMessages["en"];

export const enMessages: LanguageMessages = {
  log: {
    mild: [
      "I-I'll listen, but only this once.",
      "I'll make a note of it for you.",
      "Fine, you can tell me.",
    ],
    normal: [
      "I-It's not like I care about your logs or anything!",
      "Fine, I'll print it for you.",
      "Don't misunderstand—I'm only recording this.",
    ],
    extreme: [
      "D-Don't make me print every little thing!!",
      "Why are you showing me this log?!",
      "I couldn't care less about your output, got it?!",
    ],
  },
  info: {
    mild: [
      "Here's something you should know.",
      "Just a little information for you.",
      "You might find this useful.",
    ],
    normal: [
      "I'm only telling you so you don't get lost.",
      "Pay attention—this might matter.",
      "It's just information, so don't get the wrong idea.",
    ],
    extreme: [
      "Listen carefully! This is important!!",
      "Don't you dare miss this information!",
      "You'd better remember every word of this!!",
    ],
  },
  warn: {
    mild: [
      "You should probably be careful.",
      "Are you sure that's safe?",
      "Something looks a little suspicious.",
    ],
    normal: [
      "Hey! Don't blame me if this goes wrong.",
      "You're making me nervous—check this.",
      "I'm warning you for your own good, okay?",
    ],
    extreme: [
      "Stop right there and check this now!!",
      "I said it's dangerous, you dummy!!",
      "Fix this before everything explodes!!",
    ],
  },
  error: {
    mild: [
      "There's an error, just so you know.",
      "It looks like something went wrong.",
      "You may want to check this error.",
    ],
    normal: [
      "Huh? You caused another error?",
      "You broke it again? Honestly, what would you do without me?",
      "It's an error. N-Not that I'm worried.",
    ],
    extreme: [
      "What did you do?! It's completely broken!!",
      "You messed up spectacularly this time!!",
      "Fix it right now, you absolute dummy!!",
    ],
  },
  debug: {
    mild: [
      "Let's take a closer look.",
      "Here's some debugging information.",
      "This might help find the cause.",
    ],
    normal: [
      "Fine, I'll help you debug it.",
      "You should learn to debug this yourself.",
      "There, I gave you a clue. Be grateful.",
    ],
    extreme: [
      "We're hunting down every last bug!!",
      "No bug can hide from me!!",
      "Show me every detail right now!!",
    ],
  },
  dir: {
    mild: ["I'll show you what's inside."],
    normal: ["Look carefully at the contents."],
    extreme: ["We're inspecting every last property!!"],
  },
  table: {
    mild: ["I put it in a table for you."],
    normal: ["I made it readable, so be grateful."],
    extreme: ["Now you have no excuse to miss anything!!"],
  },
  group: {
    mild: ["I'll group these together."],
    normal: ["I'll organize this mess for you."],
    extreme: ["Everything goes into one group, got it?!"],
  },
  groupCollapsed: {
    mild: ["Open it if you need it."],
    normal: ["I folded it up; open it yourself."],
    extreme: ["This clutter is getting collapsed right now!!"],
  },
  groupEnd: {
    mild: ["That's all for this group."],
    normal: ["This topic is over now."],
    extreme: ["All right, this group is finished!!"],
  },
  time: {
    mild: ["I'll keep track of the time."],
    normal: ["You'd better not be slow."],
    extreme: ["I won't miss a single millisecond!!"],
  },
  timeLog: {
    mild: ["Let's check the elapsed time."],
    normal: ["Here's your progress so far."],
    extreme: ["Check the split time right now!!"],
  },
  timeEnd: {
    mild: ["The timing ends here."],
    normal: ["There, check your final time."],
    extreme: ["Time's up! You weren't slow, were you?!"],
  },
  count: {
    mild: ["I'll count that for you."],
    normal: ["At least keep track of how many times."],
    extreme: ["Again?! I'm counting every single one!!"],
  },
  countReset: {
    mild: ["I'll reset the count."],
    normal: ["Fine, I'll put the counter back to zero."],
    extreme: ["We're counting again from zero!!"],
  },
  assert: {
    mild: ["That condition doesn't seem right."],
    normal: ["Hey, your assumption is wrong."],
    extreme: ["That condition has completely fallen apart!!"],
  },
  trace: {
    mild: ["Let's see where this came from."],
    normal: ["You should leave a proper trail."],
    extreme: ["You can't hide! Show me the entire stack!!"],
  },
  clear: {
    mild: ["I'll tidy this up."],
    normal: ["This is a mess, so I'm clearing it."],
    extreme: ["Enough clutter! I'm wiping it all clean!!"],
  },
  success: {
    mild: [
      "It worked. Good for you.",
      "Congratulations on the success.",
      "That's not a bad result.",
    ],
    normal: [
      "I-It's not like I wanted your build to succeed or anything!",
      "Hmph. Of course it succeeded.",
      "Fine, I'll admit that went well.",
    ],
    extreme: [
      "You did it!! N-Not that I'm happy for you!!",
      "A total success?! Well, obviously!!",
      "Th-That was perfect! I'm almost impressed!!",
    ],
  },
  praise: {
    mild: ["You did well.", "That was pretty good.", "Keep it up."],
    normal: [
      "I suppose I can praise you a little.",
      "See? You can do it when you try.",
      "I'm not impressed, but that wasn't bad.",
    ],
    extreme: [
      "That was amazing!! Fine, you deserve praise!!",
      "Perfect! Just this once, I'll compliment you!!",
      "You really did it! I'm almost proud!!",
    ],
  },
  complain: {
    mild: [
      "There's something bothering me.",
      "Could you be a little more careful?",
      "This could use some improvement.",
    ],
    normal: [
      "Honestly, why does it always end up like this?",
      "Think about how much work you cause me.",
      "You've made another mess for me.",
    ],
    extreme: [
      "That's it! I'm going to complain all I want!!",
      "Why does this keep happening?!",
      "Stop making my life difficult already!!",
    ],
  },
  panic: {
    mild: [
      "Stay calm; something needs attention.",
      "It looks like we have a serious problem.",
      "We should deal with this quickly.",
    ],
    normal: [
      "Hey! This is turning into a disaster!",
      "W-Wait! This is really bad!",
      "What are you doing? Check this now!",
    ],
    extreme: [
      "Aaaah!! This is a complete disaster!!",
      "Emergency!! Do something right now!!",
      "Stop everything and check this immediately!!",
    ],
  },
  status: {
    mild: ["You should check the HTTP status."],
    normal: ["Here, check the HTTP status properly."],
    extreme: ["Check that HTTP status right now!!"],
  },
};
