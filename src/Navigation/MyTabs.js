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
import { Storage } from "expo-storage";
import { setSelectedEvent } from "../redux/actions/api";
import { ImagesWithProps } from "../config/images";
import { Fonts } from "../Global/fonts";
import { Colors } from "../Global/colors";
import {
  getTabsForEnvironment,
  getDefaultTabVisibility,
} from "../config/tabConfig";

const Tab = createBottomTabNavigator();

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
    translateY.value = withTiming(focused ? 4 : 1, { duration: 500 });
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
  const rolePermission = useSelector((state) => state.auth.user?.user);
  const [currentEnvironment, setCurrentEnvironment] = React.useState("fmf");
  const [TabArr, setTabArr] = React.useState(() =>
    getTabsForEnvironment("fmf", rolePermission)
  );

  React.useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        const env = selectedCategory || "fmf";
        setCurrentEnvironment(env);
        setTabArr(getTabsForEnvironment(env, rolePermission));
      } catch (error) {
        console.log("Error loading environment:", error);
        setCurrentEnvironment("fmf");
        setTabArr(getTabsForEnvironment("fmf", rolePermission));
      }
    };
    loadEnvironment();
  }, []);

  // Update tabs when role or environment changes
  React.useEffect(() => {
    setTabArr(getTabsForEnvironment(currentEnvironment, rolePermission));
  }, [currentEnvironment, rolePermission]);

  React.useEffect(() => {
    if (route.params?.selectedEvent) {
      dispatch(setSelectedEvent(route.params.selectedEvent));
    }
  }, [route.params?.selectedEvent, dispatch]);

  const resolvedTabVisibility = React.useMemo(() => {
    const defaultVisibility = getDefaultTabVisibility(
      currentEnvironment,
      rolePermission
    );

    return TabArr.reduce((acc, tab) => {
      const stored = tabVisibility?.[tab.route];
      acc[tab.route] =
        stored === undefined ? defaultVisibility[tab.route] ?? true : stored;
      return acc;
    }, {});
  }, [tabVisibility, TabArr, currentEnvironment, rolePermission]);

  const visibleRoutes = React.useMemo(() => {
    const forcedVisible = { ...resolvedTabVisibility };

    TabArr.forEach((tab) => {
      if (tab.alwaysVisible) {
        forcedVisible[tab.route] = true;
      }
    });

    const sortedTabs = [...TabArr]
      .filter((tab) => forcedVisible[tab.route])
      .sort((a, b) => (a.priority || 999) - (b.priority || 999));

    const selected = [];
    for (const tab of sortedTabs) {
      if (forcedVisible[tab.route]) {
        selected.push(tab.route);
      }
      if (selected.length >= 5) break;
    }
    return new Set(selected);
  }, [resolvedTabVisibility, TabArr]);

  const visibleTabs = TabArr.filter((t) => visibleRoutes.has(t.route));

  // Don't render navigator if there are no visible tabs
  if (visibleTabs.length === 0) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        headerBackLeft: true,
      }}
    >
      {visibleTabs.map((item) => (
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
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    paddingTop: 1,
  },
});

export default MyTabs;
