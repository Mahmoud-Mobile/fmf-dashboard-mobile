import React from "react";
import Svg, { Path } from "react-native-svg";

const Chat_Icon = (props) => {
  return (
    <Svg
      width={props.width ?? 24}
      height={props.height ?? 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
        fill={props.color ?? "#B4B4B4"}
      />
      <Path
        d="M7 9H17V11H7V9ZM7 12H15V14H7V12Z"
        fill={props.color ?? "#B4B4B4"}
      />
    </Svg>
  );
};

export default Chat_Icon;
