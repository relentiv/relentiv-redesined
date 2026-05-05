import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.12)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 10,
            height: 10,
            borderRadius: 3,
            background: "#d86f4f",
            boxShadow: "0 0 16px rgba(216,111,79,0.4)",
          }}
        />
        <span
          style={{
            color: "#f7f7f5",
            fontSize: 38,
            lineHeight: 1,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            transform: "translateY(1px)",
          }}
        >
          R
        </span>
      </div>
    ),
    size,
  );
}
