import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Home_Tab(props) {
  return (
    <Svg
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity={0.1}
        d="M16.745 7.41l-2.75-2.553c-1.183-1.1-1.775-1.649-2.495-1.649-.72 0-1.312.55-2.495 1.649L6.255 7.41c-.577.536-.866.804-1.019 1.155-.153.35-.153.744-.153 1.532v5.486c0 1.729 0 2.593.537 3.13.537.537 1.402.537 3.13.537h.688v-3.667a2.063 2.063 0 014.124 0v3.667h.688c1.729 0 2.593 0 3.13-.537.537-.537.537-1.401.537-3.13v-5.486c0-.788 0-1.182-.153-1.532-.153-.35-.442-.619-1.019-1.155z"
        fill={props.color}
      />
      <Path
        d="M17.917 8.25v7.333c0 1.729 0 2.593-.537 3.13-.537.537-1.401.537-3.13.537h-5.5c-1.728 0-2.593 0-3.13-.537-.537-.537-.537-1.401-.537-3.13V8.25"
        stroke={props.color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M3.25 10.083l4.125-3.666 2.907-2.584a1.833 1.833 0 012.436 0l2.907 2.584 4.125 3.666M9.667 19.25v-3.667a1.833 1.833 0 013.666 0v3.667"
        stroke={props.color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
export default Home_Tab;
