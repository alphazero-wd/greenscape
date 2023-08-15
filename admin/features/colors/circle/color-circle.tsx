import React from "react";

interface ColorCircleProps {
  color: string;
}

export const ColorCircle: React.FC<ColorCircleProps> = ({ color }) => {
  return (
    <div
      className="h-8 w-8 rounded-full border border-black border-opacity-10"
      style={{ backgroundColor: color }}
    />
  );
};
