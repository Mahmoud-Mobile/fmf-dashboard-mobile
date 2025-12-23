import React from "react";
import Svg, { Path } from "react-native-svg";

const DesignatedCar_Icon = (props) => {
  const size = props.size ?? 24;
  const color = props.color ?? "#1E1E1E";
  const height = (size * 14) / 24;

  return (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.5 4.5h-2.69L15.75.44A1.487 1.487 0 0014.69 0H4.15a1.5 1.5 0 00-1.245.668L.126 4.834A.757.757 0 000 5.25v4.5a1.5 1.5 0 001.5 1.5h1.594a3 3 0 005.812 0h6.188a3 3 0 005.812 0H22.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5zm-18.349-3H14.69l3 3H2.156l1.995-3zM6 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm12 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5-2.25h-1.594a3 3 0 00-5.812 0H8.906a3 3 0 00-5.812 0H1.5V6h21v3.75z"
        fill={color}
      />
    </Svg>
  );
};

export default DesignatedCar_Icon;
