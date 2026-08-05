import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test/test-utils";
import GetSection from "../GetSection";

// Structural assertions only: copy changes freely, structure is the contract.
describe("GetSection", () => {
  it("renders a non-empty section heading", () => {
    render(<GetSection />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2.textContent?.trim().length).toBeGreaterThan(0);
  });

  it("renders four cards, each with a title and a description", () => {
    render(<GetSection />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s).toHaveLength(4);
    for (const h3 of h3s) {
      expect(h3.textContent?.trim().length).toBeGreaterThan(0);
      const textBlock = h3.parentElement!;
      const description = textBlock.querySelector("p");
      expect(description).not.toBeNull();
      expect(description!.textContent?.trim().length).toBeGreaterThan(0);
    }
  });
});
