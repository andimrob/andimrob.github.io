import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useActiveSection } from "./useActiveSection";

describe("useActiveSection", () => {
  let scrollHandler: (() => void) | null = null;

  beforeEach(() => {
    scrollHandler = null;

    vi.spyOn(window, "addEventListener").mockImplementation(
      (event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === "scroll" && typeof handler === "function") {
          scrollHandler = handler as () => void;
        }
      },
    );
    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});

    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("returns the first section ID by default", () => {
    const { result } = renderHook(() =>
      useActiveSection(["about", "experience", "projects"]),
    );
    expect(result.current).toBe("about");
  });

  it("updates active section based on scroll position", () => {
    // Create mock sections
    const aboutEl = document.createElement("div");
    aboutEl.id = "about";
    document.body.appendChild(aboutEl);

    const expEl = document.createElement("div");
    expEl.id = "experience";
    document.body.appendChild(expEl);

    // Mock getBoundingClientRect
    vi.spyOn(aboutEl, "getBoundingClientRect").mockReturnValue({
      top: -100,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
    vi.spyOn(expEl, "getBoundingClientRect").mockReturnValue({
      top: 500,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() =>
      useActiveSection(["about", "experience"]),
    );

    // Fire scroll
    act(() => {
      scrollHandler?.();
    });

    // about top (-100) <= 400 (40% of 1000), experience top (500) > 400
    expect(result.current).toBe("about");
  });

  it("selects the last section when multiple are above threshold", () => {
    const aEl = document.createElement("div");
    aEl.id = "a";
    document.body.appendChild(aEl);

    const bEl = document.createElement("div");
    bEl.id = "b";
    document.body.appendChild(bEl);

    const cEl = document.createElement("div");
    cEl.id = "c";
    document.body.appendChild(cEl);

    // All three sections are above threshold (top <= 400)
    vi.spyOn(aEl, "getBoundingClientRect").mockReturnValue({
      top: -200,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
    vi.spyOn(bEl, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
    vi.spyOn(cEl, "getBoundingClientRect").mockReturnValue({
      top: 300,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() => useActiveSection(["a", "b", "c"]));

    act(() => {
      scrollHandler?.();
    });

    // Last qualifying section wins
    expect(result.current).toBe("c");
  });

  it("does not select a section whose top is above the 40% threshold", () => {
    const topEl = document.createElement("div");
    topEl.id = "top";
    document.body.appendChild(topEl);

    const botEl = document.createElement("div");
    botEl.id = "bot";
    document.body.appendChild(botEl);

    vi.spyOn(topEl, "getBoundingClientRect").mockReturnValue({
      top: 200,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
    // top = 401 — just above threshold of 400 (0.4 * 1000)
    vi.spyOn(botEl, "getBoundingClientRect").mockReturnValue({
      top: 401,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const { result } = renderHook(() => useActiveSection(["top", "bot"]));

    act(() => {
      scrollHandler?.();
    });

    // "top" qualifies (200 <= 400), "bot" does not (401 > 400)
    expect(result.current).toBe("top");
  });

  it("handles missing DOM elements gracefully", () => {
    // No elements in DOM — should still return first ID
    const { result } = renderHook(() =>
      useActiveSection(["missing1", "missing2"]),
    );
    expect(result.current).toBe("missing1");
  });

  it("cleans up scroll listener on unmount", () => {
    const { unmount } = renderHook(() =>
      useActiveSection(["about", "experience"]),
    );

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
