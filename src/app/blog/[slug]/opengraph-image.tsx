import { ImageResponse } from "next/og";
import { POSTS } from "../posts";

export const alt = "Colex build log";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  const title = post?.title ?? "Colex build log";
  const date = post
    ? new Date(`${post.date}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F8F7F4",
          padding: "72px 80px",
          // A faint dot grid, the same motif the flowchart uses.
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(26,26,26,0.07) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "#49082D",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#49082D",
            }}
          >
            Colex / Build log
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 52 ? "64px" : "76px",
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #E4E4E7",
            paddingTop: "28px",
          }}
        >
          <div style={{ fontSize: "26px", color: "#6F6860" }}>{date}</div>
          <div
            style={{
              fontSize: "44px",
              color: "#49082D",
              letterSpacing: "-0.01em",
            }}
          >
            colex
          </div>
        </div>
      </div>
    ),
    size
  );
}
