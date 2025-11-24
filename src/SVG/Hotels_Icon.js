import React from "react";
import Svg, { Path } from "react-native-svg";

const Hotels_Icon = (props) => {
  const size = props.size ?? 24;
  const color = props.color ?? "#1E1E1E";

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 22v-6.57M12 11h.01M12 7h.01M14 15.43V22M15 16a5 5 0 00-6 0M16 11h.01M16 7h.01M8 11h.01M8 7h.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Hotels_Icon;
