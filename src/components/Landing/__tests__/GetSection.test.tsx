import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test/test-utils";
import GetSection from "../GetSection";

describe("GetSection", () => {
  it("renders h2: 'What that buys you, concretely.'", () => {
    render(<GetSection />);
    const heading = screen.getByRole("heading", {
      level: 2,
      name: "What that buys you, concretely.",
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

    it("each card has an image placeholder with aspect-ratio 1/1.6", () => {
      render(<GetSection />);
      const placeholders = screen.getAllByTestId("card-image-placeholder");
      expect(placeholders).toHaveLength(4);
      for (const ph of placeholders) {
        expect(ph).toHaveStyle({ aspectRatio: "1 / 1.6" });
      }
    });
  });

  describe("moments table", () => {
    it("renders the moments table h2", () => {
      render(<GetSection />);
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Six months in, you own something.",
        })
      ).toBeInTheDocument();
    });

    it("renders the moments table lede", () => {
      render(<GetSection />);
      expect(
        screen.getByText("Automation leaves you with scripts that decay.")
      ).toBeInTheDocument();
    });

    it("has 3 column headers", () => {
      render(<GetSection />);
      expect(
        screen.getByRole("columnheader", { name: "What you have" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "With automation" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "With Colex" })
      ).toBeInTheDocument();
    });

    it("has 6 data rows with correct first cells", () => {
      render(<GetSection />);
      const firstCells = [
        "Your company’s standards, written down",
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

    it("uses semantic <table> markup", () => {
      render(<GetSection />);
      expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("table scrolls on mobile (overflow-x: auto)", () => {
      render(<GetSection />);
      const table = screen.getByRole("table");
      const scrollContainer = table.closest("[data-testid='table-scroll']");
      expect(scrollContainer).toBeInTheDocument();
      expect(scrollContainer).toHaveStyle({ overflowX: "auto" });
    });
  });
});
