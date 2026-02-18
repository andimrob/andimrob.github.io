/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import SectionHeading from "./SectionHeading";

afterEach(cleanup);

describe("SectionHeading", () => {
  it("renders children text", () => {
    const { getByText } = render(<SectionHeading>Test Title</SectionHeading>);
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("renders as an h2 element", () => {
    const { getByRole } = render(<SectionHeading>Heading</SectionHeading>);
    expect(getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("applies font-heading class", () => {
    const { getByRole } = render(<SectionHeading>Heading</SectionHeading>);
    expect(getByRole("heading", { level: 2 })).toHaveClass("font-heading");
  });
});
