import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pantrẽ — Cook like someone you love";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf8f4",
          position: "relative",
        }}
      >
        {/* Green gradient orb */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, #e8f8f0 0%, transparent 70%)",
          }}
        />

        {/* Beta badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#e8f8f0",
            border: "1px solid #b8ecd4",
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#1a9e5f",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#137a48",
            }}
          >
            Beta launching soon
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontStyle: "italic",
            color: "#212529",
            lineHeight: 1.1,
            textAlign: "center",
            margin: 0,
          }}
        >
          Cook like someone
          <br />
          you love
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: "#495057",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          AI-powered cooking that knows your fridge, your taste, and your skill level
        </p>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontStyle: "italic",
              color: "#212529",
            }}
          >
            Pantrẽ
          </span>
          <span style={{ fontSize: 20, color: "#868e96" }}>•</span>
          <span style={{ fontSize: 20, color: "#868e96" }}>pantre.app</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
