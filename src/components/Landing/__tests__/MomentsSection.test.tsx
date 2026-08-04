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

  it("renders column headers", () => {
    render(<MomentsSection />);
    expect(screen.getAllByText(/With automation/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/With Colex/i).length).toBeGreaterThan(0);
  });

  it("renders all 6 comparison rows", () => {
    render(<MomentsSection />);
    const automationTexts = [
      /Company standards are scattered/,
      /Run logs show green or red/,
      /The script follows the same rules/,
    ];
    for (const pattern of automationTexts) {
      expect(screen.getAllByText(pattern).length).toBeGreaterThan(0);
    }
  });

  it("renders row labels on desktop", () => {
    render(<MomentsSection />);
    expect(screen.getByText("Your company's standards, written down")).toBeInTheDocument();
    expect(screen.getByText("An answer for the auditor")).toBeInTheDocument();
  });

  it("renders red and green icons", () => {
    render(<MomentsSection />);
    expect(screen.getAllByText("×").length).toBeGreaterThanOrEqual(6);
    expect(screen.getAllByText("✓").length).toBeGreaterThanOrEqual(6);
  });
});
