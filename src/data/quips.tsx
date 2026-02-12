import { type ReactNode } from "react";

export const link = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="underline decoration-dotted underline-offset-2 hover:opacity-70"
  >
    {text}
  </a>
);

export function QuipFace({
  children,
  bg = "bg-gray-950 dark:bg-white",
  text = "text-white dark:text-gray-900",
}: {
  children: ReactNode;
  bg?: string;
  text?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden px-6 ${bg}`}
    >
      <span className={`relative z-10 text-sm font-medium ${text}`}>
        {children}
      </span>
    </div>
  );
}

export const DEFAULT_QUIP_BG = "bg-gray-950 dark:bg-white";

export const quipBgs: string[] = [
  "prism-bg-coral",
  "prism-bg-turquoise",
  DEFAULT_QUIP_BG,
  "prism-bg-deepspace",
  DEFAULT_QUIP_BG,
  "prism-bg-lava",
  "prism-bg-vaporwave",
  DEFAULT_QUIP_BG,
  "prism-bg-aurora",
  "prism-bg-ocean",
  DEFAULT_QUIP_BG,
  DEFAULT_QUIP_BG,
  "prism-bg-deepspace",
  "prism-bg-lava",
  DEFAULT_QUIP_BG,
  "prism-bg-ocean",
  "prism-bg-holographic",
  "prism-bg-aurora",
  "prism-bg-vaporwave",
  "prism-bg-lava",
  "prism-bg-deepspace",
  "prism-bg-holographic",
  "prism-bg-aurora",
  "prism-bg-holographic",
  "prism-bg-ocean",
  "prism-bg-deepspace",
  "prism-bg-vaporwave",
  "prism-bg-lava",
  DEFAULT_QUIP_BG,
  "prism-bg-aurora",
  "prism-bg-deepspace",
  "prism-bg-ocean",
  "prism-bg-holographic",
  "prism-bg-vaporwave",
  "prism-bg-aurora",
  "prism-bg-vaporwave",
  "prism-bg-lava",
  "prism-bg-lava",
  DEFAULT_QUIP_BG,
  DEFAULT_QUIP_BG,
  "prism-bg-deepspace",
  "prism-bg-deepspace",
  "prism-bg-holographic",
  "prism-bg-ocean",
  "prism-bg-gold",
];

export const quips: ReactNode[] = [
  <QuipFace bg="prism-bg-coral" text="text-white">
    {"\u{1F44B}"} You found the secret! Keep going!
  </QuipFace>,
  <QuipFace bg="prism-bg-turquoise" text="text-gray-900">
    {"\u{1F914}"} You{"\u2019"}re the curious type, huh?
  </QuipFace>,
  <QuipFace>{"\u{1F91D}"} Honestly, same. </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F47E}"} Insert coin to continue{"\u2026"}
  </QuipFace>,
  <QuipFace>{"\u{1F3C6}"} Achievement unlocked: bar flipper!</QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F60E}"} Okay you{"\u2019"}re committed. I respect that
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3B5}"} Click me baby, one more time!
  </QuipFace>,
  <QuipFace>
    {"\u{1F4AD}"} I wonder what the next one says{"\u2026"}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{26A0}\u{FE0F}"} Warning: excessive flipping may cause mild satisfaction
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F389}"} Double digits! You{"\u2019"}re officially dedicated
  </QuipFace>,
  <QuipFace>{"\u{2728}"} 𝑺𝑬𝑬 𝒀𝑶𝑼 𝑺𝑷𝑨𝑪𝑬 𝑪𝑶𝑾𝑩𝑶𝒀 . . .</QuipFace>,
  <QuipFace>
    {"\u{1F30A}"} You look tense. Maybe{" "}
    {link("https://fallingfalling.com", "just let go")}?
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F916}"} Beep boop. I have achieved consciousness.
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F5A5}\u{FE0F}"} Ever wanted to{" "}
    {link("https://hackertyper.net", "feel like a hacker")}?
  </QuipFace>,
  <QuipFace>{"\u{1F423}"} A wild easter egg appeared!</QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F40B}"} This bar flips more than a dolphin at SeaWorld
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F30D}"} There{"\u2019"}s a whole{" "}
    {link("https://floor796.com", "world in one building")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F52E}"} The nav bar predicts{"\u2026"} you{"\u2019"}ll click again
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F4BE}"} Miss the 90s?{" "}
    {link("https://win32.run", "Boot up some memories")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F409}"} Here there be <s>dragons</s> links!
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1FA90}"} I{"\u2019"}d tell you a CSS joke but it{"\u2019"}d have no
    class
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{2728}"} The old internet was{" "}
    {link("https://www.cameronsworld.net", "absolutely unhinged")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F6B8}"} Don{"\u2019"}t shake{" "}
    {link("http://staggeringbeauty.com", "this little guy")}. Or do.
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F3B0}"} You hit jackpot. The prize: more flipping.
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F41F}"} If you were a fish, you{"\u2019"}d definitely take the bait
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F9D8}"} Need to decompress?{" "}
    {link("https://patience.toys/", "Take your time")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3A8}"} Channel your inner{" "}
    {link("https://jacksonpollock.org/", "Jackson Pollock")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1FA66}"} There's more to life than{" "}
    {link("https://burymewithmymoney.com/", "money")}
  </QuipFace>,
  <QuipFace>
    {"\u{1F611}"} It's about{" "}
    {link("https://www.muchbetterthanthis.com/", "love and connection")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F9CA}"} The real portfolio was the clicks along the way
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F576}\u{FE0F}"} This one's just{" "}
    {link("https://maninthedark.com/", "bizarre")}
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F96A}"} Behold:{" "}
    {link("https://rotatingsandwiches.com/", "rotating sandwiches")}
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F447}"} This will{" "}
    {link("https://pointerpointer.com/", "point right at you")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F4BF}"} You{"\u2019"}ve been rotating this longer than a CD in 2003
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F485}"} Oddly satisfying:{" "}
    {link("https://lacquerlacquer.com/", "digital nail art")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3B6}"} Summer never ends at{" "}
    {link("https://poolsuite.net/", "poolsuite")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{26A1}"} Caution: {link("https://strobe.cool/", "this strobes")}.
    Obviously.
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F525}"} We didn{"\u2019"}t start the fire. Actually, you did.
  </QuipFace>,
  <QuipFace>
    {"\u{1F92A}"} Emojis, but {link("https://remoji.com/", "worse")}
  </QuipFace>,
  <QuipFace>{"\u{1F50D}"} 404: productivity not found</QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F680}"} One small click for man. One giant waste of time.
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F30C}"} Lose yourself in a{" "}
    {link("https://dgreenheck.github.io/webgpu-galaxy/", "galaxy")}
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F300}"} Stare into the{" "}
    {link("https://singularity.misterprada.com/", "singularity")}
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F3A3}"} You{"\u2019"}re hooked. Reel-y hooked.
  </QuipFace>,
  <QuipFace bg="prism-bg-gold" text="text-yellow-950">
    {"\u{1F381}"} You made it to the end. Here{"\u2019"}s{" "}
    {link("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "your reward")}
  </QuipFace>,
];
