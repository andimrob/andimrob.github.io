function CursiveRob({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 190 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rob"
    >
      <path
        d={[
          // R stem + bowl (one stroke)
          "M 20,90 C 18,62 22,32 26,20",
          "C 44,12 62,18 60,34",
          "C 58,48 40,52 26,46",
          // R leg → o → b (continuous stroke)
          "M 38,50 C 48,62 60,78 76,88",
          "C 82,84 86,78 90,70",
          "C 86,52 98,42 112,44",
          "C 126,46 132,62 126,76",
          "C 120,90 104,92 94,82",
          "C 90,78 94,68 104,60",
          "C 112,54 120,52 126,54",
          "C 132,34 138,18 142,12",
          "C 146,8 144,36 144,90",
          "C 160,82 172,64 168,50",
          "C 164,38 150,38 144,50",
        ].join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CursiveRob;
