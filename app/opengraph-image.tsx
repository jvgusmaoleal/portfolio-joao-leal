import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0c0a09",
          border: "16px solid #fbbf24",
        }}
      >
        <div style={{ display: "flex", color: "#fbbf24", fontSize: 32 }}>
          {site.promptPath} $ whoami
        </div>
        <div
          style={{
            display: "flex",
            color: "#fafaf9",
            fontSize: 96,
            fontWeight: 700,
            marginTop: 24,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            color: "#fbbf24",
            fontSize: 48,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            display: "flex",
            color: "#a8a29e",
            fontSize: 28,
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          {`${site.description.split(". ")[0]}.`}
        </div>
      </div>
    ),
    { ...size },
  );
}
