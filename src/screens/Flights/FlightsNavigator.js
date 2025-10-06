import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MinistryFlights from "./MinistryFlights";
import ArrivalFlights from "./ArrivalFlights";
import ReturnFlights from "./ReturnFlights";
import { Fonts } from "../../Global/fonts";

const Tab = createMaterialTopTabNavigator();

const FlightsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: Fonts.FONT_MEDIUM,
          textTransform: "none",
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarIndicatorStyle: {
          backgroundColor: "#2563EB",
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
      }}
    >
      <Tab.Screen
        name="MinistryFlights"
        component={MinistryFlights}
        options={{
          title: "Ministry Flights",
        }}
      />
      <Tab.Screen
        name="ArrivalFlights"
        component={ArrivalFlights}
        options={{
          title: "Arrival Flights",
        }}
      />
      <Tab.Screen
        name="ReturnFlights"
        component={ReturnFlights}
        options={{
          title: "Return Flights",
        }}
      />
    </Tab.Navigator>
  );
};

export default FlightsNavigator;
