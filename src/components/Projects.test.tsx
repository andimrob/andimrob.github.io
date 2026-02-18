/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Projects from "./Projects";

beforeEach(() => {
  class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
    takeRecords = vi.fn().mockReturnValue([]);
    root = null;
    rootMargin = "";
    thresholds = [];
    constructor() {}
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Projects", () => {
  it("renders all project titles", () => {
    const { getByText } = render(<Projects />);
    expect(getByText("Personal Portfolio")).toBeInTheDocument();
    expect(getByText("CLI Task Manager")).toBeInTheDocument();
    expect(getByText("Real-Time Chat")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    const { getByText } = render(<Projects />);
    expect(getByText(/The very site you're looking at/)).toBeInTheDocument();
    expect(getByText(/terminal-native task manager/)).toBeInTheDocument();
    expect(getByText(/WebSocket-powered chat app/)).toBeInTheDocument();
  });

  it("renders tech badges", () => {
    const { getAllByText } = render(<Projects />);
    expect(getAllByText("React").length).toBeGreaterThanOrEqual(1);
    expect(getAllByText("Go").length).toBeGreaterThanOrEqual(1);
    expect(getAllByText("WebSocket").length).toBeGreaterThanOrEqual(1);
  });

  it("renders external link with arrow indicator for projects with links", () => {
    const { getByRole } = render(<Projects />);
    const sourceLink = getByRole("link", { name: /Source/ });
    expect(sourceLink).toHaveAttribute(
      "href",
      "https://github.com/andimrob/andimrob.github.io",
    );
  });
});
