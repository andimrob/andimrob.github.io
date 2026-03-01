import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("renders the name heading", () => {
    render(<Sidebar />);
    expect(
      screen.getByRole("heading", { level: 1, name: /robert blakey/i }),
    ).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Sidebar />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(
      headings.some((h) => /software engineer/i.test(h.textContent ?? "")),
    ).toBe(true);
  });

  it("renders social links", () => {
    render(<Sidebar />);
    const links = screen.getAllByRole("link");
    const socialLabels = ["GitHub", "Bluesky", "LinkedIn"];
    for (const label of socialLabels) {
      expect(
        links.some((link) => link.getAttribute("aria-label") === label),
      ).toBe(true);
    }
  });

  it("renders section nav links", () => {
    render(<Sidebar />);
    const navLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("#"));
    const sections = ["about", "experience", "projects", "writing"];
    for (const section of sections) {
      expect(
        navLinks.some((link) => link.getAttribute("href") === `#${section}`),
      ).toBe(true);
    }
  });

  it("social links open in new tab", () => {
    render(<Sidebar />);
    const links = screen.getAllByRole("link");
    const github = links.find(
      (link) => link.getAttribute("aria-label") === "GitHub",
    );
    expect(github).toBeDefined();
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
  });
});
