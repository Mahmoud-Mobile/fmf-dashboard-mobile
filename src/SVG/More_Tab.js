import * as React from "react";
import Svg, { Path } from "react-native-svg";

function More_Tab(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.1}
        d="M2.75 11c0-6.794 1.456-8.25 8.25-8.25 6.794 0 8.25 1.456 8.25 8.25 0 6.794-1.456 8.25-8.25 8.25-6.794 0-8.25-1.456-8.25-8.25z"
        fill={props.color}
      />
      <Path
        d="M2.75 11c0-6.794 1.456-8.25 8.25-8.25 6.794 0 8.25 1.456 8.25 8.25 0 6.794-1.456 8.25-8.25 8.25-6.794 0-8.25-1.456-8.25-8.25z"
        stroke={props.color}
        strokeWidth={2}
      />
      <Path
        d="M7.333 11h.01M11 11h.01M14.667 11h.009"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default More_Tab;
