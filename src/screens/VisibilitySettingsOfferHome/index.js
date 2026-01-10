import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  View,
  ScrollView,
  Text,
  Switch,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../Global/colors";
import styles from "./Styles";
import {
  toggleTabVisibility,
  resetAllVisibilitySettings,
} from "../../redux/reducers/uiReducer";
import CustomHeader from "../../components/CustomHeader";
import {
  getTabsForEnvironment,
  getDefaultTabVisibility,
} from "../../config/tabConfig";
import {
  createPermissionCheckersOffer,
  isTabAllowedOffer,
} from "../../config/permissionUtilsOffer";
import { Storage } from "expo-storage";

const VisibilitySettingsOfferHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storedTabVisibility =
    useSelector((state) => state.ui?.tabVisibility) || {};
  const rolePermission = useSelector((state) => state.auth.user?.user);
  const userInfo = useSelector((state) => state.auth.user);

  const userPermissions = useMemo(() => {
    return Array.isArray(userInfo?.user?.permissions)
      ? userInfo.user.permissions
      : [];
  }, [userInfo]);

  const [currentEnvironment, setCurrentEnvironment] = useState("offerHome");

  // Create permission checkers for Offer Home
  const permissions = useMemo(
    () => createPermissionCheckersOffer(userPermissions),
    [userPermissions]
  );

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        setCurrentEnvironment(selectedCategory || "offerHome");
      } catch (error) {
        setCurrentEnvironment("offerHome");
      }
    };
    loadEnvironment();
  }, []);

  // Helper to convert stored value to boolean
  const toBoolean = useCallback((value, defaultValue = true) => {
    if (value === undefined) return defaultValue;
    if (typeof value === "string") return value === "true";
    return Boolean(value);
  }, []);

  // Check if tab should be disabled based on permissions
  const isTabDisabled = useCallback(
    (tabId) => {
      // Check if tab is allowed by permissions
      return !isTabAllowedOffer(tabId, permissions);
    },
    [permissions]
  );

  // Filter tabs based on permissions - always show DashboardOfferHome and More
  const TABS_CONFIG = useMemo(() => {
    const allTabs = getTabsForEnvironment(currentEnvironment, rolePermission);
    const alwaysVisibleTabs = ["DashboardOfferHome", "More"];

    // Filter tabs: show only if user has permission OR it's DashboardOfferHome/More
    const filteredTabs = allTabs.filter((tab) => {
      // Always show DashboardOfferHome and More
      if (alwaysVisibleTabs.includes(tab.route)) {
        return true;
      }
      // For other tabs, check if user has permission
      return isTabAllowedOffer(tab.route, permissions);
    });

    return filteredTabs.map((tab) => ({
      id: tab.route,
      label: tab.titleText || tab.route,
      locked: tab.alwaysVisible || alwaysVisibleTabs.includes(tab.route),
      disabled: isTabDisabled(tab.route),
    }));
  }, [currentEnvironment, rolePermission, isTabDisabled, permissions]);

  const DEFAULT_TAB_VISIBILITY = useMemo(() => {
    return getDefaultTabVisibility(currentEnvironment, rolePermission);
  }, [currentEnvironment, rolePermission]);

  const resolvedTabVisibility = useMemo(() => {
    return TABS_CONFIG.reduce((acc, tab) => {
      const defaultValue = DEFAULT_TAB_VISIBILITY[tab.id] ?? true;
      acc[tab.id] = toBoolean(storedTabVisibility?.[tab.id], defaultValue);
      return acc;
    }, {});
  }, [storedTabVisibility, TABS_CONFIG, DEFAULT_TAB_VISIBILITY, toBoolean]);

  const latestTabVisibilityRef = useRef(resolvedTabVisibility);
  useEffect(() => {
    latestTabVisibilityRef.current = resolvedTabVisibility;
  }, [resolvedTabVisibility]);

  const handleToggleTabVisibility = (tabId) => {
    // Don't allow toggle if tab is disabled due to permissions
    if (isTabDisabled(tabId)) {
      Alert.alert(
        "Access Denied",
        "You don't have permission to modify this tab's visibility."
      );
      return;
    }

    const MAX_VISIBLE_TABS = 5;
    const snapshot = latestTabVisibilityRef.current || {};
    const currentIsVisible = !!snapshot[tabId];
    const currentVisibleCount = Object.values(snapshot).filter(Boolean).length;

    if (!currentIsVisible && currentVisibleCount >= MAX_VISIBLE_TABS) {
      Alert.alert(
        "Limit reached",
        `You can select up to ${MAX_VISIBLE_TABS} tabs.`
      );
      return;
    }

    dispatch(toggleTabVisibility(tabId));
  };

  const handleResetAll = () => {
    Alert.alert(
      "Reset All Settings",
      "Are you sure you want to reset all visibility settings to default? This will show all tabs.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch(resetAllVisibilitySettings());
            Alert.alert(
              "Success",
              "All visibility settings have been reset to default."
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Visibility Settings"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tabs</Text>
            <Text style={styles.sectionDescription}>
              Customize which tabs are visible in the navigation bar
            </Text>
            {TABS_CONFIG.map((tab) => {
              const isDisabled = tab.locked || tab.disabled;
              return (
                <View
                  key={tab.id}
                  style={[styles.visibilityRow, styles.tabRow]}
                >
                  <View style={styles.labelContainer}>
                    <Text style={styles.visibilityLabel}>{tab.label}</Text>
                    {isDisabled && (
                      <Text style={styles.disabledLabel}>
                        {tab.disabled
                          ? "Permission required"
                          : "Always visible"}
                      </Text>
                    )}
                  </View>
                  <Switch
                    value={tab.locked ? true : resolvedTabVisibility[tab.id]}
                    onValueChange={() =>
                      !isDisabled && handleToggleTabVisibility(tab.id)
                    }
                    disabled={isDisabled}
                    trackColor={{
                      false: Colors.LightGray,
                      true: Colors.Primary,
                    }}
                    thumbColor={Colors.White}
                  />
                </View>
              );
            })}
          </View>

          <View style={styles.resetContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetAll}
            >
              <Text style={styles.resetButtonText}>Reset All Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default VisibilitySettingsOfferHome;
