import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(145deg, #121212 0%, #0a0a0a 55%, #1c1c1c 100%)",
          borderRadius: 42,
          border: "2px solid rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 16,
            borderRadius: 30,
            border: "2px solid rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 26,
            height: 26,
            borderRadius: 8,
            background: "#d86f4f",
            boxShadow: "0 0 28px rgba(216,111,79,0.38)",
          }}
        />
        <span
          style={{
            color: "#f7f7f5",
            fontSize: 106,
            lineHeight: 1,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            transform: "translateY(3px)",
          }}
        >
          R
        </span>
      </div>
    ),
    size,
  );
}
