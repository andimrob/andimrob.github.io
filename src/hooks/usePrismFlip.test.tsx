import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePrismFlip } from "./usePrismFlip";

// Mock confetti and coinCollect to avoid DOM side effects
vi.mock("../confetti", () => ({
  fireConfetti: vi.fn(),
}));
vi.mock("../coinCollect", () => ({
  fireCoinCollect: vi.fn(),
}));

import { fireConfetti } from "../confetti";
import { fireCoinCollect } from "../coinCollect";

describe("usePrismFlip", () => {
  const quips = ["quip-0", "quip-1", "quip-2", "quip-3", "quip-4", "quip-5"];
  const quipBgs = ["bg-0", "bg-1", "bg-2", "bg-3", "bg-4", "bg-5"];

  const makeMouseEvent = (clientX = 100, clientY = 100) =>
    ({
      clientX,
      clientY,
    }) as React.MouseEvent;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("starts unflipped", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));
    expect(result.current.flipped).toBe(false);
  });

  it("toggles flipped state on handleFlip", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));

    act(() => {
      result.current.handleFlip(makeMouseEvent());
    });

    expect(result.current.flipped).toBe(true);
  });

  it("cycles through quips on successive flips", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));

    // First flip (flip count 1 -> quip index 0)
    act(() => {
      result.current.handleFlip(makeMouseEvent());
    });
    expect(result.current.quip).toBe("quip-0");

    // Un-flip (click when flipped)
    act(() => {
      result.current.handleFlip(makeMouseEvent());
    });

    // Second flip (flip count 2 -> quip index 1)
    act(() => {
      result.current.handleFlip(makeMouseEvent());
    });
    expect(result.current.quip).toBe("quip-1");
  });

  it("fires coin collect on normal flips", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));

    act(() => {
      result.current.handleFlip(makeMouseEvent(200, 300));
    });

    expect(fireCoinCollect).toHaveBeenCalledWith(200, 300);
    expect(fireConfetti).not.toHaveBeenCalled();
  });

  it("fires confetti on 5th flip", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));

    // Flip 5 times (flip, unflip, flip, unflip, flip)
    for (let i = 0; i < 9; i++) {
      act(() => {
        result.current.handleFlip(makeMouseEvent());
      });
    }

    // On the 5th forward-flip, confetti should fire
    expect(fireConfetti).toHaveBeenCalled();
  });

  it("wraps quip index when exceeding quips length", () => {
    const shortQuips = ["a", "b"];
    const shortBgs = ["bg-a", "bg-b"];
    const { result } = renderHook(() => usePrismFlip(shortQuips, shortBgs));

    // Flip through more than the number of quips
    for (let i = 0; i < 6; i++) {
      act(() => {
        result.current.handleFlip(makeMouseEvent());
      });
      // Clear auto-rotate timers
      act(() => {
        vi.advanceTimersByTime(3000);
      });
    }

    // Should not throw — index wraps properly
    expect(result.current.quip).toBeDefined();
  });

  it("reports isGradientBg correctly", () => {
    const gradientQuips = ["q"];
    const gradientBgs = ["prism-bg-aurora"];
    const { result } = renderHook(() =>
      usePrismFlip(gradientQuips, gradientBgs),
    );

    // Initial bg is first one — "prism-bg-aurora" starts with "prism-bg-"
    expect(result.current.isGradientBg).toBe(true);
  });

  it("reports isGradientBg as false for non-gradient backgrounds", () => {
    const plainQuips = ["q"];
    const plainBgs = ["bg-gray-950"];
    const { result } = renderHook(() => usePrismFlip(plainQuips, plainBgs));
    expect(result.current.isGradientBg).toBe(false);
  });

  it("provides a prismRef", () => {
    const { result } = renderHook(() => usePrismFlip(quips, quipBgs));
    expect(result.current.prismRef).toBeDefined();
    expect(result.current.prismRef.current).toBeNull();
  });
});
