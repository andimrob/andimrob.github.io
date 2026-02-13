import type { RefObject } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup, act } from "@testing-library/react";
import { useRevealOnScroll } from "./useRevealOnScroll";

// A wrapper component that attaches the ref to a real DOM element
function TestComponent({ threshold }: { threshold?: number }) {
  const { ref, visible } = useRevealOnScroll(threshold);
  return (
    <div
      ref={ref as RefObject<HTMLDivElement | null>}
      data-testid="target"
      data-visible={String(visible)}
    />
  );
}

interface MockIO {
  _lastOptions: IntersectionObserverInit | undefined;
  _callCount: number;
}

describe("useRevealOnScroll", () => {
  let observeCallback: IntersectionObserverCallback;
  const mockDisconnect = vi.fn();
  const mockObserve = vi.fn();

  function getMockIO(): MockIO {
    return IntersectionObserver as unknown as MockIO;
  }

  beforeEach(() => {
    cleanup();
    mockDisconnect.mockClear();
    mockObserve.mockClear();

    // Use a class so `new IntersectionObserver(...)` works
    class MockIntersectionObserver {
      constructor(
        callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit,
      ) {
        observeCallback = callback;
        MockIntersectionObserver._lastOptions = options;
        MockIntersectionObserver._callCount++;
      }
      observe = mockObserve;
      disconnect = mockDisconnect;
      unobserve = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
      root = null;
      rootMargin = "";
      thresholds = [];

      static _lastOptions: IntersectionObserverInit | undefined;
      static _callCount = 0;
    }

    MockIntersectionObserver._callCount = 0;
    MockIntersectionObserver._lastOptions = undefined;

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("starts with visible = false", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("target").dataset.visible).toBe("false");
  });

  it("creates an IntersectionObserver with the given threshold", () => {
    render(<TestComponent threshold={0.25} />);
    const mock = getMockIO();
    expect(mock._callCount).toBe(1);
    expect(mock._lastOptions).toEqual({ threshold: 0.25 });
  });

  it("uses default threshold of 0.15", () => {
    render(<TestComponent />);
    const mock = getMockIO();
    expect(mock._lastOptions).toEqual({ threshold: 0.15 });
  });

  it("observes the target element", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalledWith(getByTestId("target"));
  });

  it("disconnects observer on unmount", () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("sets visible to true and disconnects when element intersects", () => {
    const { getByTestId } = render(<TestComponent />);

    act(() => {
      observeCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(getByTestId("target").dataset.visible).toBe("true");
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("does not set visible when element is not intersecting", () => {
    const { getByTestId } = render(<TestComponent />);

    observeCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(getByTestId("target").dataset.visible).toBe("false");
  });
});
