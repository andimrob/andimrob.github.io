import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMagneticTilt } from "./useMagneticTilt";

describe("useMagneticTilt", () => {
  let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
  let mouseLeaveHandler: (() => void) | null = null;

  beforeEach(() => {
    mouseMoveHandler = null;
    mouseLeaveHandler = null;

    vi.spyOn(window, "addEventListener").mockImplementation(
      (event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === "mousemove" && typeof handler === "function") {
          mouseMoveHandler = handler as (e: MouseEvent) => void;
        }
      },
    );
    vi.spyOn(document, "addEventListener").mockImplementation(
      (event: string, handler: EventListenerOrEventListenerObject) => {
        if (event === "mouseleave" && typeof handler === "function") {
          mouseLeaveHandler = handler as () => void;
        }
      },
    );
    vi.spyOn(window, "removeEventListener").mockImplementation(() => {});
    vi.spyOn(document, "removeEventListener").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("adds event listeners on mount", () => {
    const ref = { current: document.createElement("div") };
    renderHook(() => useMagneticTilt(ref, false));

    expect(window.addEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function),
    );
  });

  it("removes event listeners on unmount", () => {
    const ref = { current: document.createElement("div") };
    const { unmount } = renderHook(() => useMagneticTilt(ref, false));

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
      "mousemove",
      expect.any(Function),
    );
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "mouseleave",
      expect.any(Function),
    );
  });

  it("applies transform when mouse is within attract range", () => {
    const el = document.createElement("div");
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      right: 200,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    const ref = { current: el };
    renderHook(() => useMagneticTilt(ref, false));

    // Simulate mouse near center of element (center is at 150, 125)
    mouseMoveHandler?.({
      clientX: 160,
      clientY: 130,
    } as MouseEvent);

    expect(el.style.transform).toContain("rotateX");
    expect(el.style.transform).toContain("rotateY");
  });

  it("clears transform when mouse is outside attract range", () => {
    const el = document.createElement("div");
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 100,
      width: 100,
      height: 50,
      right: 200,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON: () => {},
    });

    const ref = { current: el };
    renderHook(() => useMagneticTilt(ref, false));

    // Mouse far away from element
    mouseMoveHandler?.({
      clientX: 1000,
      clientY: 1000,
    } as MouseEvent);

    expect(el.style.transform).toBe("");
  });

  it("clears transform when disabled", () => {
    const el = document.createElement("div");
    el.style.transform = "rotateX(10deg)";

    const ref = { current: el };
    renderHook(() => useMagneticTilt(ref, true));

    mouseMoveHandler?.({
      clientX: 150,
      clientY: 125,
    } as MouseEvent);

    expect(el.style.transform).toBe("");
  });

  it("clears transform on mouse leave", () => {
    const el = document.createElement("div");
    el.style.transform = "rotateX(10deg) rotateY(5deg)";

    const ref = { current: el };
    renderHook(() => useMagneticTilt(ref, false));

    mouseLeaveHandler?.();
    expect(el.style.transform).toBe("");
  });

  it("handles null ref gracefully", () => {
    const ref = { current: null };
    expect(() => {
      renderHook(() => useMagneticTilt(ref, false));
      mouseMoveHandler?.({ clientX: 0, clientY: 0 } as MouseEvent);
    }).not.toThrow();
  });
});
