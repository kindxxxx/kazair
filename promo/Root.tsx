import React from "react";
import { Composition } from "remotion";
import { Promo } from "./Promo";
import { DURATION, FPS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ format: "landscape" }}
      />
      <Composition
        id="PromoStory"
        component={Promo}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ format: "story" }}
      />
    </>
  );
};
