import React from "react";
import Home_Tab from "../SVG/Home_Tab";
import More_Tab from "../SVG/More_Tab";
import Arrow_Icon from "../SVG/Arrow_Icon";
import Logout_Icon from "../SVG/Logout_Icon";
import Chat_Icon from "../SVG/Chat_Icon";
import Flights_Icon from "../SVG/Flights_Icon";
import CheckIn_Icon from "../SVG/CheckIn_Icon";

const images = {
  Home_Tab: <Home_Tab />,
  More_Tab: <More_Tab />,
  Arrow_Icon: <Arrow_Icon />,
  Logout_Icon: <Logout_Icon />,
  Chat_Icon: <Chat_Icon />,
  Flights_Icon: <Flights_Icon />,
  CheckIn_Icon: <CheckIn_Icon />,
};
export const ImagesWithProps = ({ props, source, color, width, height }) =>
  source == "Home_Tab" ? (
    <Home_Tab color={color} />
  ) : source == "More_Tab" ? (
    <More_Tab color={color} />
  ) : source == "Arrow_Icon" ? (
    <Arrow_Icon color={color} />
  ) : source == "Logout_Icon" ? (
    <Logout_Icon color={color} />
  ) : source == "Chat_Icon" ? (
    <Chat_Icon color={color} />
  ) : source == "Flights_Icon" ? (
    <Flights_Icon color={color} />
  ) : source == "CheckIn_Icon" ? (
    <CheckIn_Icon color={color} />
  ) : null;

export default images;
