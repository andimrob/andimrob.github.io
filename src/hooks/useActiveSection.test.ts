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
