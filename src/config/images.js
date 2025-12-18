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
import DesignatedCar_Icon from "../SVG/DesignatedCar_Icon";
import User_Icon from "../SVG/User_Icon";
import Hotels_Icon from "../SVG/Hotels_Icon";
import FMF_Icon from "../SVG/FMF_Icon";
import Notification_Icon from "../SVG/Notification_Icon";
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
  DesignatedCar_Icon: <DesignatedCar_Icon />,
  User_Icon: <User_Icon />,
  Hotels_Icon: <Hotels_Icon />,
  FMF_Icon: <FMF_Icon />,
  Notification_Icon: <Notification_Icon />,
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
  ) : source == "DesignatedCar_Icon" ? (
    <DesignatedCar_Icon color={color} size={size} />
  ) : source == "User_Icon" ? (
    <User_Icon color={color} size={size} />
  ) : source == "Hotels_Icon" ? (
    <Hotels_Icon color={color} size={size} />
  ) : source == "FMF_Icon" ? (
    <FMF_Icon color={color} size={size} />
  ) : source == "Notification_Icon" ? (
    <Notification_Icon color={color} size={size} />
  ) : null;

export default images;
