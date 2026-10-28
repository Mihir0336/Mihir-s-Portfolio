import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, site } from "@/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
const font = (file: string) => readFile(join(fontDir, file));

export default async function OpengraphImage() {
  const [regular, semibold, mono] = await Promise.all([
    font("geist-sans/Geist-Regular.ttf"),
    font("geist-sans/Geist-SemiBold.ttf"),
    font("geist-mono/GeistMono-Regular.ttf"),
  ]);

  const stack = profile.headline;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b0b0c",
        color: "#ededef",
        fontFamily: "Geist",
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(255,176,32,0.10), rgba(11,11,12,0) 45%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "Geist Mono",
          fontSize: 24,
          color: "#8b8b92",
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ffb020" }} />
        Open to full-time roles · {profile.locationShort}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 20, fontSize: 48, color: "#8b8b92", letterSpacing: "-0.02em" }}>
          {profile.role}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #2e2e33",
          paddingTop: 32,
          fontFamily: "Geist Mono",
          fontSize: 24,
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          {stack.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                border: "1px solid #2e2e33",
                borderRadius: 8,
                padding: "6px 14px",
                color: "#a1a1a8",
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div style={{ color: "#ffb020" }}>{site.url.replace("https://", "")}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
