import { describe, it, expect } from "vitest";
import { esc, highlight, C, JS_RULES, LENS_RADIUS } from "./highlight";

describe("LENS_RADIUS", () => {
  it("is a positive number", () => {
    expect(LENS_RADIUS).toBeGreaterThan(0);
  });
});

describe("esc", () => {
  it("escapes ampersands", () => {
    expect(esc("a & b")).toBe("a &amp; b");
  });

  it("escapes less-than signs", () => {
    expect(esc("<div>")).toBe("&lt;div&gt;");
  });

  it("escapes greater-than signs", () => {
    expect(esc("a > b")).toBe("a &gt; b");
  });

  it("escapes all special characters together", () => {
    expect(esc('<a href="x">&</a>')).toBe('&lt;a href="x"&gt;&amp;&lt;/a&gt;');
  });

  it("returns empty string for empty input", () => {
    expect(esc("")).toBe("");
  });

  it("returns plain text unchanged", () => {
    expect(esc("hello world 123")).toBe("hello world 123");
  });

  it("handles multiple ampersands", () => {
    expect(esc("a && b && c")).toBe("a &amp;&amp; b &amp;&amp; c");
  });
});

describe("highlight", () => {
  it("returns empty string for empty input", () => {
    expect(highlight("", JS_RULES)).toBe("");
  });

  it("highlights JavaScript keywords", () => {
    const result = highlight("const x = 1", JS_RULES);
    expect(result).toContain(`color:${C.mauve}`);
    expect(result).toContain("const");
  });

  it("highlights string literals with double quotes", () => {
    const result = highlight('"hello"', JS_RULES);
    expect(result).toContain(`color:${C.green}`);
    // esc() only escapes &, <, > — double quotes pass through unescaped
    expect(result).toContain('"hello"');
  });

  it("highlights string literals with single quotes", () => {
    const result = highlight("'world'", JS_RULES);
    expect(result).toContain(`color:${C.green}`);
  });

  it("highlights template literals", () => {
    const result = highlight("`template`", JS_RULES);
    expect(result).toContain(`color:${C.green}`);
  });

  it("highlights numeric literals", () => {
    const result = highlight("42", JS_RULES);
    expect(result).toContain(`color:${C.peach}`);
  });

  it("highlights boolean/null/undefined keywords", () => {
    const result = highlight("true false null undefined", JS_RULES);
    expect(result).toContain(`color:${C.peach}`);
    // All four should be highlighted
    expect(result).toContain("true");
    expect(result).toContain("false");
    expect(result).toContain("null");
    expect(result).toContain("undefined");
  });

  it("highlights built-in objects", () => {
    const result = highlight("console document window", JS_RULES);
    expect(result).toContain(`color:${C.blue}`);
  });

  it("highlights dot-access properties", () => {
    const result = highlight("foo.bar", JS_RULES);
    expect(result).toContain(`color:${C.teal}`);
    expect(result).toContain(".bar");
  });

  it("highlights arrow functions", () => {
    const result = highlight("() => {}", JS_RULES);
    expect(result).toContain(`color:${C.mauve}`);
    expect(result).toContain("=&gt;");
  });

  it("highlights punctuation", () => {
    const result = highlight("{};", JS_RULES);
    expect(result).toContain(`color:${C.overlay}`);
  });

  it("escapes HTML in unhighlighted segments", () => {
    // Text between matches should be escaped
    const result = highlight("x < y", JS_RULES);
    expect(result).toContain("&lt;");
  });

  it("escapes HTML even with no matching rules", () => {
    const result = highlight("x < y", []);
    expect(result).toBe("x &lt; y");
  });

  it("highlights strings containing keywords as strings, not keywords", () => {
    const result = highlight('"const"', JS_RULES);
    // The entire "const" should be green (string), not mauve (keyword)
    expect(result).toContain(`color:${C.green}`);
    expect(result).not.toMatch(
      new RegExp(
        `color:${C.mauve.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^"]*const`,
      ),
    );
  });

  it("handles adjacent matches without gaps", () => {
    const result = highlight("{}", JS_RULES);
    // Both { and } should be highlighted
    expect(result).toContain("{");
    expect(result).toContain("}");
  });

  it("preserves unmatched text between highlights", () => {
    const result = highlight("const x = 5", JS_RULES);
    // "const" is a keyword, "5" is a number, " x = " is between them
    expect(result).toContain("const");
    expect(result).toContain("5");
    expect(result).toContain(" x = ");
  });
});

describe("C (color constants)", () => {
  it("has all expected color keys", () => {
    expect(C.bg).toBeDefined();
    expect(C.fg).toBeDefined();
    expect(C.overlay).toBeDefined();
    expect(C.blue).toBeDefined();
    expect(C.green).toBeDefined();
    expect(C.teal).toBeDefined();
    expect(C.mauve).toBeDefined();
    expect(C.peach).toBeDefined();
    expect(C.red).toBeDefined();
    expect(C.yellow).toBeDefined();
  });

  it("has valid hex color values", () => {
    const hexPattern = /^#[0-9a-f]{6}$/i;
    for (const [, value] of Object.entries(C)) {
      expect(value).toMatch(hexPattern);
    }
  });
});

describe("JS_RULES", () => {
  it("is a non-empty array of [RegExp, string] pairs", () => {
    expect(JS_RULES.length).toBeGreaterThan(0);
    for (const rule of JS_RULES) {
      expect(rule[0]).toBeInstanceOf(RegExp);
      expect(typeof rule[1]).toBe("string");
    }
  });
});
