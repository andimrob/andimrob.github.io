import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useXRay } from "./useXRay";

// Mock highlight module to avoid DOM/fetch side effects
vi.mock("./highlight", () => ({
  ensureFont: vi.fn(),
  buildSource: vi.fn().mockResolvedValue("<span>mock source</span>"),
}));

describe("useXRay", () => {
  let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  beforeEach(() => {
    keydownHandler = null;

    vi.spyOn(window, "addEventListener").mockImplementation(
      (event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === "keydown" && typeof handler === "function") {
          keydownHandler = handler as (e: KeyboardEvent) => void;
        }
      },
    );
    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with xray inactive and no source", () => {
    const { result } = renderHook(() => useXRay());
    expect(result.current.xrayActive).toBe(false);
    expect(result.current.sourceHTML).toBeNull();
  });

  it("toggles xray on 'x' key press", async () => {
    const { result } = renderHook(() => useXRay());

    await act(async () => {
      keydownHandler?.({
        key: "x",
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        target: document.createElement("div"),
      } as unknown as KeyboardEvent);
    });

    expect(result.current.xrayActive).toBe(true);
  });

  it("ignores 'x' when modifier keys are held", () => {
    const { result } = renderHook(() => useXRay());

    act(() => {
      keydownHandler?.({
        key: "x",
        ctrlKey: true,
        metaKey: false,
        altKey: false,
        target: document.createElement("div"),
      } as unknown as KeyboardEvent);
    });

    expect(result.current.xrayActive).toBe(false);
  });

  it("ignores 'x' when focused on an input element", () => {
    const { result } = renderHook(() => useXRay());

    const input = document.createElement("input");
    act(() => {
      keydownHandler?.({
        key: "x",
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        target: input,
      } as unknown as KeyboardEvent);
    });

    expect(result.current.xrayActive).toBe(false);
  });

  it("ignores 'x' when focused on textarea", () => {
    const { result } = renderHook(() => useXRay());

    const textarea = document.createElement("textarea");
    act(() => {
      keydownHandler?.({
        key: "x",
        ctrlKey: false,
        metaKey: false,
        altKey: false,
        target: textarea,
      } as unknown as KeyboardEvent);
    });

    expect(result.current.xrayActive).toBe(false);
  });

  it("cleans up keydown listener on unmount", () => {
    const { unmount } = renderHook(() => useXRay());
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );
  });
});
