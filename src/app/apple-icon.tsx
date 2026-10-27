import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as icon.svg, rendered to PNG for iOS home-screen bookmarks.
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b0c" }}>
      <svg width="180" height="180" viewBox="0 0 64 64">
        <path
          d="M15 45V20l12.5 15L40 20v25"
          fill="none"
          stroke="#ededef"
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="49" cy="42" r="4.5" fill="#ffb020" />
      </svg>
    </div>,
    size,
  );
}
