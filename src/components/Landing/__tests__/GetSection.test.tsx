import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test/test-utils";
import GetSection from "../GetSection";

describe("GetSection", () => {
  it("renders h2: 'The part automation never gave you.'", () => {
    render(<GetSection />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "The part automation never gave you.",
    });
    expect(heading).toBeInTheDocument();
  });

  describe("cards", () => {
    const cardTitles = [
      "Simple interfaces, so your team can work with confidence",
      "Work that rewinds when things change",
      "All your rules written down, all action auditable",
      "Human judgement everywhere you need",
    ];

    const cardDescriptions = [
      "The review screen comes from the same rules that run the work. Change the process, the screen changes with it.",
      "Customs rejects an entry on Thursday. Monday’s “done” reopens and goes back into review.",
      "Versioned, inspectable, and yours to reason over, not buried inside a workflow where nobody can find them.",
      "Calls that need a person go to a person, never to a model pretending to be one.",
    ];

    it("renders 4 cards with h3 titles", () => {
      render(<GetSection />);
      for (const title of cardTitles) {
        expect(
          screen.getByRole("heading", { level: 3, name: title })
        ).toBeInTheDocument();
      }
    });

    it("renders a description paragraph for each card", () => {
      render(<GetSection />);
      for (const desc of cardDescriptions) {
        expect(screen.getByText(desc)).toBeInTheDocument();
      }
    });

    it("renders all four cards", () => {
      render(<GetSection />);
      const titles = [
        "Simple interfaces",
        "Work that rewinds",
        "All your rules written down",
        "Human judgement",
      ];
      titles.forEach((t) => {
        expect(screen.getByText(new RegExp(t))).toBeInTheDocument();
      });
    });
  });

});
