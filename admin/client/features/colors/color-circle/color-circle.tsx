import React from "react";

interface ColorCircleProps {
  hexCode: string;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({ hexCode }) => {
  return (
    <div
      className="h-8 w-8 rounded-full p-3 ring-1 ring-gray-300"
      style={{ backgroundColor: hexCode }}
    />
  );
};
