import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "./useTypewriter";

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with empty displayed text and cursor visible", () => {
    const { result } = renderHook(() => useTypewriter("Hello"));
    expect(result.current.displayed).toBe("");
    expect(result.current.showCursor).toBe(true);
  });

  it("types out text one character at a time after initial delay", () => {
    const { result } = renderHook(() =>
      useTypewriter("Hi", { delay: 100, speed: 50 }),
    );

    // Before delay — nothing typed
    expect(result.current.displayed).toBe("");

    // After initial delay — first character
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.displayed).toBe("H");
    expect(result.current.showCursor).toBe(true);

    // After one more speed interval — second character
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current.displayed).toBe("Hi");
    expect(result.current.showCursor).toBe(true);
  });

  it("hides cursor after typing finishes and linger period elapses", () => {
    const { result } = renderHook(() =>
      useTypewriter("AB", { delay: 0, speed: 10, cursorLingerMs: 100 }),
    );

    // Type both characters
    act(() => {
      vi.advanceTimersByTime(0); // delay
    });
    act(() => {
      vi.advanceTimersByTime(10); // second char
    });
    expect(result.current.displayed).toBe("AB");
    expect(result.current.showCursor).toBe(true);

    // After linger period, cursor hides
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.showCursor).toBe(false);
  });

  it("handles empty string", () => {
    const { result } = renderHook(() =>
      useTypewriter("", { delay: 0, speed: 10 }),
    );

    act(() => {
      vi.advanceTimersByTime(0);
    });
    // Empty string means nothing to type
    expect(result.current.displayed).toBe("");
  });

  it("cleans up timers on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = renderHook(() =>
      useTypewriter("Test", { delay: 100, speed: 50 }),
    );

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });
});
