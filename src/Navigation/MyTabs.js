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
import {
  createPermissionCheckers,
  isTabAllowed as checkTabAllowed,
} from "../config/permissionUtils";
import {
  createPermissionCheckersOffer,
  isTabAllowedOffer as checkTabAllowedOffer,
} from "../config/permissionUtilsOffer";

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
  const userInfo = useSelector((state) => state.auth.user);

  const userPermissions = React.useMemo(() => {
    return Array.isArray(userInfo?.user?.permissions)
      ? userInfo.user.permissions
      : [];
  }, [userInfo]);

  const [currentEnvironment, setCurrentEnvironment] = React.useState("fmf");
  const [TabArr, setTabArr] = React.useState(() =>
    getTabsForEnvironment("fmf", rolePermission)
  );

  // Create permission checkers based on environment
  const permissions = React.useMemo(() => {
    if (currentEnvironment === "offerHome") {
      return createPermissionCheckersOffer(userPermissions);
    }
    return createPermissionCheckers(userPermissions);
  }, [userPermissions, currentEnvironment]);

  // Check if tab is allowed based on permissions and environment
  const isTabAllowed = React.useCallback(
    (tabId) => {
      if (currentEnvironment === "offerHome") {
        return checkTabAllowedOffer(tabId, permissions);
      }
      return checkTabAllowed(tabId, permissions);
    },
    [permissions, currentEnvironment]
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
  }, [rolePermission]);

  // Update tabs when role or environment changes
  React.useEffect(() => {
    setTabArr(getTabsForEnvironment(currentEnvironment, rolePermission));
  }, [currentEnvironment, rolePermission]);

  React.useEffect(() => {
    if (route.params?.selectedEvent) {
      dispatch(setSelectedEvent(route.params.selectedEvent));
    }
  }, [route.params?.selectedEvent, dispatch]);

  // Filter tabs based on permissions first, then check visibility
  const allowedTabs = React.useMemo(() => {
    return TabArr.filter((tab) => isTabAllowed(tab.route));
  }, [TabArr, isTabAllowed]);

  // Helper to convert stored value to boolean
  const toBoolean = React.useCallback((value, defaultValue = true) => {
    if (value === undefined) return defaultValue;
    if (typeof value === "string") return value === "true";
    return Boolean(value);
  }, []);

  const resolvedTabVisibility = React.useMemo(() => {
    return allowedTabs.reduce((acc, tab) => {
      // If tab has explicit visibility setting in Redux, use it
      if (tabVisibility?.[tab.route] !== undefined) {
        acc[tab.route] = toBoolean(tabVisibility[tab.route], true);
      } else {
        // If tab passed permission check (is in allowedTabs), make it visible by default
        // Tabs that pass permission checks should be visible unless explicitly hidden
        acc[tab.route] = true;
      }
      return acc;
    }, {});
  }, [
    tabVisibility,
    allowedTabs,
    toBoolean,
  ]);

  const visibleRoutes = React.useMemo(() => {
    const forcedVisible = { ...resolvedTabVisibility };

    allowedTabs.forEach((tab) => {
      if (tab.alwaysVisible) {
        forcedVisible[tab.route] = true;
      }
    });

    const sortedTabs = [...allowedTabs]
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
  }, [resolvedTabVisibility, allowedTabs]);

  const visibleTabs = allowedTabs.filter((t) => visibleRoutes.has(t.route));

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
