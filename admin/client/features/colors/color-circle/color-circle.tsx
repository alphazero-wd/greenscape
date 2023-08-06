import React from "react";

interface ColorCircleProps {
  hexCode: string;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({ hexCode }) => {
  return (
    <div
      className="h-8 w-8 rounded-full border border-black border-opacity-10 p-3"
      style={{ backgroundColor: hexCode }}
    />
  );
};
