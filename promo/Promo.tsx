import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { inter, manrope } from "./fonts";
import { colors, machines } from "./theme";

export type PromoProps = {
  format: "landscape" | "story";
};

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const fadeOut = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

function Background({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 900], [1.04, 1.18], { extrapolateRight: "clamp" });
  const shift = interpolate(frame, [0, 900], [0, story ? -40 : -80], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("images/hero-bg.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${zoom}) translateX(${shift}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: story
            ? "linear-gradient(180deg, rgba(1,28,45,0.88) 0%, rgba(0,55,85,0.72) 45%, rgba(1,28,45,0.94) 100%)"
            : "linear-gradient(90deg, rgba(1,28,45,0.94) 0%, rgba(0,55,85,0.78) 48%, rgba(1,28,45,0.62) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(34,184,240,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(34,184,240,0.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </AbsoluteFill>
  );
}

function LogoMark({ size }: { size: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.white,
        border: `4px solid ${colors.brand}`,
        borderRadius: 18,
        padding: size > 220 ? "18px 22px" : "10px 14px",
        boxShadow: "0 0 36px rgba(34,184,240,0.35)",
      }}
    >
      <Img
        src={staticFile("images/logo.png")}
        style={{ width: size, height: "auto", display: "block" }}
      />
    </div>
  );
}

function Intro({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, mass: 0.7 } });
  const opacity = fade(frame, 0, 12) * fadeOut(frame, 72, 90);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
        gap: 28,
      }}
    >
      <div style={{ transform: `scale(${0.72 + enter * 0.28})`, transformOrigin: "center" }}>
        <LogoMark size={story ? 420 : 380} />
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: inter,
          fontSize: story ? 28 : 26,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: colors.brand,
          opacity: fade(frame, 18, 36),
        }}
      >
        С 2012 года · Алматы
      </p>
    </AbsoluteFill>
  );
}

function Title({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 0, 14) * fadeOut(frame, 78, 96);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: story ? "0 64px" : "0 110px",
        opacity,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: inter,
          fontSize: 22,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: colors.brand,
        }}
      >
        ТОО KAZaircompressor
      </p>
      <h1
        style={{
          margin: "18px 0 0",
          fontFamily: manrope,
          fontWeight: 800,
          fontSize: story ? 72 : 78,
          lineHeight: 1.05,
          color: colors.white,
          maxWidth: story ? "100%" : 1100,
        }}
      >
        Компрессоры и компрессорное оборудование
      </h1>
      <p
        style={{
          margin: "28px 0 0",
          fontFamily: inter,
          fontSize: story ? 28 : 30,
          lineHeight: 1.45,
          color: colors.mist,
          maxWidth: story ? "100%" : 820,
        }}
      >
        Продажа, сервис, монтаж и ПНР для промышленности Казахстана.
      </p>
    </AbsoluteFill>
  );
}

function Facts({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cards = [
    { kicker: "2012", title: "Работаем в Казахстане", text: "Стабильные поставки и сервис по всей республике" },
    { kicker: "Под ключ", title: "Станции любой сложности", text: "Монтаж, шеф-монтаж и пусконаладка" },
    { kicker: "Сервис", title: "Гарантия и запчасти", text: "Оригинал и альтернатива из Европы" },
  ];
  const opacity = fade(frame, 0, 10) * fadeOut(frame, 118, 135);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        padding: story ? "0 56px" : "0 100px",
        opacity,
      }}
    >
      <p
        style={{
          margin: "0 0 28px",
          fontFamily: inter,
          fontSize: 20,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: colors.brand,
        }}
      >
        Почему мы
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: story ? "column" : "row",
          gap: 22,
        }}
      >
        {cards.map((card, index) => {
          const local = spring({
            frame: Math.max(0, frame - index * 10),
            fps,
            config: { damping: 14 },
          });
          return (
            <div
              key={card.title}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(34,184,240,0.35)",
                borderRadius: 18,
                padding: story ? "28px 26px" : "32px 28px",
                transform: `translateY(${(1 - local) * 36}px)`,
                opacity: local,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: manrope,
                  fontSize: 22,
                  color: colors.brand,
                  letterSpacing: 1,
                }}
              >
                {card.kicker}
              </p>
              <h3
                style={{
                  margin: "10px 0 0",
                  fontFamily: manrope,
                  fontSize: story ? 36 : 32,
                  color: colors.white,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: "12px 0 0",
                  fontFamily: inter,
                  fontSize: 22,
                  color: colors.mist,
                  lineHeight: 1.4,
                }}
              >
                {card.text}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

function Equipment({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const slide = Math.min(machines.length - 1, Math.floor(frame / 60));
  const local = frame - slide * 60;
  const item = machines[slide];
  const opacity = fade(frame, 0, 8) * fadeOut(frame, 228, 240);
  const imageOpacity = interpolate(local, [0, 8], [0.35, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom = interpolate(local, [0, 60], [1.04, 1.12], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, padding: story ? "120px 48px 80px" : "90px 90px" }}>
      <p
        style={{
          margin: 0,
          fontFamily: inter,
          fontSize: 20,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: colors.brand,
        }}
      >
        Оборудование
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: story ? "column" : "row",
          gap: 36,
          marginTop: 28,
          alignItems: "center",
          height: "78%",
        }}
      >
        <div
          style={{
            flex: story ? "0 0 auto" : 1.15,
            width: "100%",
            height: story ? 720 : "100%",
            borderRadius: 22,
            overflow: "hidden",
            background: colors.white,
            boxShadow: "0 24px 60px rgba(0,20,40,0.35)",
            opacity: imageOpacity,
          }}
        >
          <Img
            src={staticFile(item.file)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: `scale(${zoom})`,
            }}
          />
        </div>
        <div style={{ flex: 1, opacity: imageOpacity }}>
          <h2
            style={{
              margin: 0,
              fontFamily: manrope,
              fontSize: story ? 56 : 58,
              color: colors.white,
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h2>
          <p
            style={{
              margin: "18px 0 0",
              fontFamily: inter,
              fontSize: 26,
              color: colors.mist,
              lineHeight: 1.45,
            }}
          >
            {item.text}
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            {machines.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === slide ? 28 : 10,
                  height: 10,
                  borderRadius: 99,
                  background: index === slide ? colors.brand : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Close({ story }: { story: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15 } });
  const opacity = fade(frame, 0, 12);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: story ? "0 48px" : "0 80px",
        opacity,
      }}
    >
      <div style={{ transform: `translateY(${(1 - enter) * 24}px)` }}>
        <LogoMark size={story ? 280 : 240} />
        <h2
          style={{
            margin: "36px 0 0",
            fontFamily: manrope,
            fontSize: story ? 52 : 56,
            color: colors.white,
          }}
        >
          Подберём решение под задачу и бюджет
        </h2>
        <p
          style={{
            margin: "18px 0 0",
            fontFamily: inter,
            fontSize: 26,
            color: colors.mist,
          }}
        >
          WhatsApp · Алматы, ул. Рыскулова 130 А
        </p>
        <div
          style={{
            marginTop: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.brand,
            color: colors.navy,
            fontFamily: manrope,
            fontSize: story ? 36 : 34,
            fontWeight: 700,
            borderRadius: 14,
            padding: "16px 28px",
          }}
        >
          +7 (701) 713-14-97
        </div>
        <p
          style={{
            margin: "22px 0 0",
            fontFamily: inter,
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          kazair.vercel.app
        </p>
      </div>
    </AbsoluteFill>
  );
}

export const Promo: React.FC<PromoProps> = ({ format }) => {
  const story = format === "story";

  return (
    <AbsoluteFill style={{ background: colors.navyDeep, fontFamily: inter }}>
      <Background story={story} />
      <Sequence durationInFrames={90}>
        <Intro story={story} />
      </Sequence>
      <Sequence from={80} durationInFrames={100}>
        <Title story={story} />
      </Sequence>
      <Sequence from={170} durationInFrames={140}>
        <Facts story={story} />
      </Sequence>
      <Sequence from={300} durationInFrames={240}>
        <Equipment story={story} />
      </Sequence>
      <Sequence from={530} durationInFrames={370}>
        <Close story={story} />
      </Sequence>
    </AbsoluteFill>
  );
};
