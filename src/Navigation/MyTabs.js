import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent } from "../redux/actions/api";
import Home from "../screens/Home";
import Flights from "../screens/Flights";
import CheckIn from "../screens/CheckIn";
import Trips from "../screens/Trips";
import More from "../screens/More";
import Hotels from "../screens/Hotels";
import DesignatedCars from "../screens/DesignatedCars";
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
    route: "DesignatedCars",
    component: DesignatedCars,
    icon: "Location_Icon",
    headerShown: false,
    titleText: "Designated Cars",
  },
  {
    route: "Hotels",
    component: Hotels,
    icon: "OverView_Icon",
    headerShown: false,
    titleText: "Hotels",
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

  const scale = useSharedValue(1);
  const translateY = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withTiming(pressed ? 1.1 : focused ? 1.05 : 1, {
      duration: 500,
    });
    translateY.value = withTiming(focused ? 5 : 1, { duration: 500 });
  }, [pressed, focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

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
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
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
      </Animated.View>
    </TouchableOpacity>
  );
};

const MyTabs = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const tabVisibility = useSelector((state) => state.ui?.tabVisibility) || {};

  // Get the selected event from route params and store it in Redux
  React.useEffect(() => {
    if (route.params?.selectedEvent) {
      dispatch(setSelectedEvent(route.params.selectedEvent));
    }
  }, [route.params?.selectedEvent, dispatch]);

  const resolvedTabVisibility = React.useMemo(() => {
    // Default visible tabs on first app open (no persisted state yet)
    const DEFAULT_TAB_VISIBILITY = {
      Home: true,
      More: true,
      Flights: true,
      CheckIn: true,
      Trips: true,
      DesignatedCars: false,
      Hotels: false,
    };
    return TabArr.reduce((acc, tab) => {
      const stored = tabVisibility?.[tab.route];
      acc[tab.route] =
        stored === undefined
          ? DEFAULT_TAB_VISIBILITY[tab.route] ?? true
          : stored;
      return acc;
    }, {});
  }, [tabVisibility]);

  // Always force Home and More to be visible
  const visibleRoutes = React.useMemo(() => {
    const forcedVisible = { ...resolvedTabVisibility, Home: true, More: true };

    // Priority order to include when limiting to 5
    const priorityOrder = [
      "Home",
      "More",
      "Flights",
      "CheckIn",
      "Trips",
      "DesignatedCars",
      "Hotels",
    ];

    const selected = [];
    for (const routeName of priorityOrder) {
      if (forcedVisible[routeName]) {
        selected.push(routeName);
      }
      if (selected.length >= 5) break;
    }
    return new Set(selected);
  }, [resolvedTabVisibility]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        headerBackLeft: true,
      }}
    >
      {TabArr.filter((t) => visibleRoutes.has(t.route)).map((item) => (
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
