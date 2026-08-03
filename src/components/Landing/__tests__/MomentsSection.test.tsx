import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test/test-utils";
import MomentsSection from "../MomentsSection";

describe("MomentsSection", () => {
  it("renders the heading", () => {
    render(<MomentsSection />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Six months in, you own something.",
      })
    ).toBeInTheDocument();
  });

  it("renders the lede", () => {
    render(<MomentsSection />);
    expect(
      screen.getByText(/Other automation tools leave you with rigid workflows which decay/)
    ).toBeInTheDocument();
  });

  it("has 3 column headers", () => {
    render(<MomentsSection />);
    expect(screen.getByRole("columnheader", { name: "What you have" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "With automation" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "With Colex" })).toBeInTheDocument();
  });

  it("has 6 data rows", () => {
    render(<MomentsSection />);
    const firstCells = [
      "Your company's standards, written down",
      "A record of every past judgement",
      "Standards that get sharper with use",
      "An answer for the auditor",
      "A process anyone can pick up",
      "Books that stay honest after the fact",
    ];
    for (const cell of firstCells) {
      expect(screen.getByText(cell)).toBeInTheDocument();
    }
  });

  it("uses semantic table markup", () => {
    render(<MomentsSection />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("table scrolls on mobile", () => {
    render(<MomentsSection />);
    const scrollContainer = screen.getByTestId("table-scroll");
    expect(scrollContainer).toBeInTheDocument();
    expect(scrollContainer).toHaveStyle({ overflowX: "auto" });
  });
});
