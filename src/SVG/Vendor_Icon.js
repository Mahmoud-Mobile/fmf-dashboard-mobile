import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Vendor_Icon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1.25 8H5m0 0V5.75M5 8h3.75m0 0V5.75m0 2.25h3.75m0 0V5.75m0 2.25h3.75M6.5 11H8m1.5 0H11m-1.5 2.25H11m-4.5 0H8M2 17V8H.5V5L2.75.5h12L17 5v3h-1.5v9H2z"
        stroke={props.color ?? "#1E1E1E"}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Vendor_Icon;
