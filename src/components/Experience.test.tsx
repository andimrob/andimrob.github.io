/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Experience from "./Experience";

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

describe("Experience", () => {
  it("renders all category headings", () => {
    const { getByText } = render(<Experience />);
    expect(getByText("Frontend")).toBeInTheDocument();
    expect(getByText("Backend")).toBeInTheDocument();
    expect(getByText("Tools & DevOps")).toBeInTheDocument();
    expect(getByText("Practices")).toBeInTheDocument();
  });

  it("renders skill badges for each category", () => {
    const { getByText } = render(<Experience />);
    expect(getByText("React")).toBeInTheDocument();
    expect(getByText("Rails")).toBeInTheDocument();
    expect(getByText("Docker")).toBeInTheDocument();
    expect(getByText("TDD")).toBeInTheDocument();
  });

  it("applies glass-card class to category cards", () => {
    const { getByText } = render(<Experience />);
    const card = getByText("Frontend").closest("[class*='glass-card']");
    expect(card).toBeInTheDocument();
  });

  it("applies stagger delay to skill badges", () => {
    const { getByText } = render(<Experience />);
    const badge = getByText("TypeScript");
    expect(badge.style.animationDelay).toBe("80ms");
  });
});
