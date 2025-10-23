import React from "react";
import Home_Tab from "../SVG/Home_Tab";
import More_Tab from "../SVG/More_Tab";
import Arrow_Icon from "../SVG/Arrow_Icon";
import Logout_Icon from "../SVG/Logout_Icon";
import Chat_Icon from "../SVG/Chat_Icon";
import Flights_Icon from "../SVG/Flights_Icon";
import CheckIn_Icon from "../SVG/CheckIn_Icon";
import Calendar_Icon from "../SVG/Calendar_Icon";
import Location_Icon from "../SVG/Location_Icon";
import User_Icon from "../SVG/User_Icon";
import OverView_Icon from "../SVG/OverView_Icon";

const images = {
  Home_Tab: <Home_Tab />,
  More_Tab: <More_Tab />,
  Arrow_Icon: <Arrow_Icon />,
  Logout_Icon: <Logout_Icon />,
  Chat_Icon: <Chat_Icon />,
  Flights_Icon: <Flights_Icon />,
  CheckIn_Icon: <CheckIn_Icon />,
  Calendar_Icon: <Calendar_Icon />,
  Location_Icon: <Location_Icon />,
  User_Icon: <User_Icon />,
  OverView_Icon: <OverView_Icon />,
};
export const ImagesWithProps = ({
  props,
  source,
  color,
  width,
  height,
  size,
}) =>
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
  ) : source == "Calendar_Icon" ? (
    <Calendar_Icon color={color} size={size} />
  ) : source == "Location_Icon" ? (
    <Location_Icon color={color} size={size} />
  ) : source == "User_Icon" ? (
    <User_Icon color={color} size={size} />
  ) : source == "OverView_Icon" ? (
    <OverView_Icon color={color} size={size} />
  ) : null;

export default images;
