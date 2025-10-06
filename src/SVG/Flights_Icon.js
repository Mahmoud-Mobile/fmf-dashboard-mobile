import React from "react";
import Svg, { Path } from "react-native-svg";

const Flights_Icon = (props) => {
  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
        fill={props.color ?? "#B4B4B4"}
      />
    </Svg>
  );
};

export default Flights_Icon;
