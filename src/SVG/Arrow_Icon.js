import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Arrow_Icon(props) {
  return (
    <Svg
      width={15}
      height={14}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.546 7l6 6m6.5-6h-12.5 12.5zm-12.5 0l6-6-6 6z"
        stroke={props.color ?? "#000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Arrow_Icon;
