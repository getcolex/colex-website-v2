import { describe, it, expect } from "vitest";
import { render } from "@/test/test-utils";
import PainSection from "../PainSection";
import VerticalsSection from "../VerticalsSection";
import MomentsSection from "../MomentsSection";
import BookDemoSection from "../BookDemoSection";

// Every hash the navbar / in-page links point at must exist on the page.
// Guards against dead anchors (shipped once already).
const anchors: [string, React.ComponentType][] = [
  ["why-colex", PainSection],
  ["use-cases", VerticalsSection],
  ["thesis", MomentsSection],
  ["book-demo", BookDemoSection],
];

describe("section anchor targets", () => {
  for (const [id, Section] of anchors) {
    it(`#${id} exists`, () => {
      const { container } = render(<Section />);
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
  }
});
