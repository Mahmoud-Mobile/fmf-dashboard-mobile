import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const CheckIn_Icon = (props) => {
  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle cx="12" cy="8" r="3" fill={props.color ?? "#B4B4B4"} />
      <Path
        d="M6 21V19C6 16.79 7.79 15 10 15H14C16.21 15 18 16.79 18 19V21"
        fill={props.color ?? "#B4B4B4"}
      />
      <Circle
        cx="18"
        cy="6"
        r="2"
        fill="none"
        stroke={props.color ?? "#B4B4B4"}
        strokeWidth="1.5"
      />
      <Path
        d="M18 4V6L19 7"
        stroke={props.color ?? "#B4B4B4"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CheckIn_Icon;
