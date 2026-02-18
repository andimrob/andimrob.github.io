/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import Sidebar from "./Sidebar";

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );

  // Mock IntersectionObserver for useRevealOnScroll (if used indirectly)
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    })),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Sidebar", () => {
  it("renders the name", () => {
    const { getByText } = render(<Sidebar />);
    // The typewriter shows "Robert Blakey" — the invisible spacer always has the full name
    expect(getByText("Robert Blakey")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    const { getByText } = render(<Sidebar />);
    expect(
      getByText("Software Engineer & Creative Problem Solver"),
    ).toBeInTheDocument();
  });

  it("renders nav links with correct hrefs", () => {
    const { getByRole } = render(<Sidebar />);
    const aboutLink = getByRole("link", { name: "About" });
    const experienceLink = getByRole("link", { name: "Experience" });
    const projectsLink = getByRole("link", { name: "Projects" });

    expect(aboutLink).toHaveAttribute("href", "#about");
    expect(experienceLink).toHaveAttribute("href", "#experience");
    expect(projectsLink).toHaveAttribute("href", "#projects");
  });

  it("renders social links", () => {
    const { getByRole } = render(<Sidebar />);
    expect(getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/andimrob",
    );
    expect(getByRole("link", { name: "Bluesky" })).toHaveAttribute(
      "href",
      "https://bsky.app/profile/robertblakey.com",
    );
    expect(getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/robblakey/",
    );
  });

  it("renders the theme toggle button", () => {
    const { getByRole } = render(<Sidebar />);
    expect(getByRole("button", { name: /switch to/i })).toBeInTheDocument();
  });
});
