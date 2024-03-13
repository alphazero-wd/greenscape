import React from "react";
import { Path, Svg } from "react-native-svg";

export const Logo = () => {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 44C15.164 44 8 36.708 8 27.714C8 18.79 13.106 8.374 21.074 4.652C21.9898 4.22305 22.9887 4.00047 24 4V44Z"
        fill="#22C55E"
      />
      <Path
        opacity="0.3"
        d="M26.926 4.652C26.0102 4.22305 25.0113 4.00047 24 4V18L32.864 9.136C31.138 7.242 29.144 5.688 26.924 4.652H26.926Z"
        fill="#22C55E"
      />
      <Path
        opacity="0.4"
        d="M24 18V29L37.228 15.772C36.084 13.332 34.612 11.058 32.864 9.13599L24 18Z"
        fill="#22C55E"
      />
      <Path
        opacity="0.6"
        d="M24 39L39.622 23.378C39.1674 20.7471 38.3622 18.189 37.228 15.772L24 29V39Z"
        fill="#22C55E"
      />
      <Path
        opacity="0.7"
        d="M39.622 23.378L24 39V44C32.836 44 40 36.708 40 27.714C40 26.294 39.872 24.838 39.622 23.378Z"
        fill="#22C55E"
      />
    </Svg>
  );
};
