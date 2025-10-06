import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MotiView } from "moti";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Home from "../screens/Home";
import Flights from "../screens/Flights";
import CheckIn from "../screens/CheckIn";
import Trips from "../screens/Trips";
import More from "../screens/More";
import { ImagesWithProps } from "../config/images";
import { Fonts } from "../Global/fonts";
import { Colors } from "../Global/colors";

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: "Home",
    component: Home,
    icon: "Home_Tab",
    headerShown: false,
    titleText: "Home",
  },
  {
    route: "Flights",
    component: Flights,
    icon: "Flights_Icon",
    headerShown: false,
    titleText: "Flights",
  },
  {
    route: "CheckIn",
    component: CheckIn,
    icon: "CheckIn_Icon",
    headerShown: false,
    titleText: "Check In",
  },
  {
    route: "Trips",
    component: Trips,
    icon: "Chat_Icon",
    headerShown: false,
    titleText: "Trips",
  },
  {
    route: "More",
    component: More,
    icon: "More_Tab",
    headerShown: false,
    titleText: "More",
  },
];

const TabButton = ({ item, onPress, routeName }) => {
  const isFocused = useIsFocused();
  const focused = routeName === item.route && isFocused;
  const [pressed, setPressed] = React.useState(false);

  const handlePress = () => {
    setPressed(true);
    onPress?.();
    setTimeout(() => setPressed(false), 200);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={1}
      style={styles.container}
    >
      <MotiView
        animate={{
          scale: pressed ? 1.1 : focused ? 1.05 : 1,
          translateY: focused ? 5 : 1,
        }}
        transition={{ type: "timing", duration: 500 }}
        style={styles.iconContainer}
      >
        <ImagesWithProps
          source={item.icon}
          color={focused ? Colors.Primary : "rgba(0,0,0,0.4)"}
        />
        <Text
          style={[
            styles.titleText,
            { color: focused ? Colors.Primary : "rgba(0,0,0,0.4)" },
          ]}
        >
          {item.titleText}
        </Text>
      </MotiView>
    </TouchableOpacity>
  );
};

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        headerBackLeft: true,
      }}
    >
      {TabArr.map((item) => (
        <Tab.Screen
          key={item.route}
          name={item.route}
          component={item.component}
          options={({ route }) => ({
            tabBarShowLabel: false,
            tabBarButton: (props) => (
              <TabButton {...props} item={item} routeName={route.name} />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    textAlign: "center",
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    paddingTop: 2,
  },
});

export default MyTabs;
