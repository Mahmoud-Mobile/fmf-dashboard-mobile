import React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const OverView_Icon = ({ color = "#000", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Dashboard/Grid representation */}
    <Rect
      x="3"
      y="3"
      width="7"
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <Rect
      x="12"
      y="3"
      width="7"
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <Rect
      x="3"
      y="10"
      width="7"
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <Rect
      x="12"
      y="10"
      width="7"
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />

    {/* Small circles to represent data points */}
    <Circle cx="5" cy="5" r="0.5" fill={color} />
    <Circle cx="14" cy="5" r="0.5" fill={color} />
    <Circle cx="5" cy="12" r="0.5" fill={color} />
    <Circle cx="14" cy="12" r="0.5" fill={color} />
  </Svg>
);

export default OverView_Icon;
