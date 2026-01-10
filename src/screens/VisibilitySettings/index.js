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
  toggleSectionVisibility,
  toggleTabVisibility,
  toggleActionButtonVisibility,
  resetAllVisibilitySettings,
} from "../../redux/reducers/uiReducer";
import CustomHeader from "../../components/CustomHeader";
import {
  getTabsForEnvironment,
  getDefaultTabVisibility,
} from "../../config/tabConfig";
import {
  createPermissionCheckers,
  hasSectionPermission as checkSectionPermission,
  isActionButtonDisabled as checkActionButtonDisabled,
  isTabAllowed as checkTabAllowed,
} from "../../config/permissionUtils";
import { Storage } from "expo-storage";

const SECTION_CONFIG = [
  {
    id: "dashboardOverview",
    label: "Dashboard Overview",
    requiredPermission: "dashboard:read",
  },
  {
    id: "topCountries",
    label: "Top Countries",
    requiredPermission: "dashboard:read",
  },
  {
    id: "eventAnalytics",
    label: "Event Analytics",
    requiredPermission: "dashboard:read_data_entry",
  },
  {
    id: "flights",
    label: "Flights",
    requiredPermission: "dashboard:read_flights",
  },
  {
    id: "hotelOccupancy",
    label: "Hotel Occupancy",
    requiredPermission: "dashboard:read_accommodations",
  },
  {
    id: "hotelDetails",
    label: "Hotel Details",
    requiredPermission: "dashboard:read_accommodations",
  },
  {
    id: "tripList",
    label: "Trip List",
    requiredPermission: "dashboard:read_trips",
  },
  {
    id: "tripsSummary",
    label: "Trips Summary",
    requiredPermission: "dashboard:read_trips",
  },
];

const ACTION_BUTTON_CONFIG = [
  // Flights
  { text: "Participant Departed", category: "Flights" },
  { text: "Luggage Received", category: "Flights" },
  { text: "Meet Done", category: "Flights" },
  { text: "Participant Arrived", category: "Flights" },
  // Trips
  { text: "Mark Picked Up", category: "Trips" },
  { text: "Mark No Show", category: "Trips" },
  // Hotels
  { text: "Check In", category: "Hotels" },
  { text: "Check Out", category: "Hotels" },
  // Designated Cars
  { text: "Vehicle Ready", category: "Designated Cars" },
  { text: "Guest Picked up", category: "Designated Cars" },
  { text: "Trip Completed", category: "Designated Cars" },
];

const VisibilitySettings = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storedSectionVisibility =
    useSelector((state) => state.ui?.sectionVisibility) || {};
  const storedTabVisibility =
    useSelector((state) => state.ui?.tabVisibility) || {};
  const storedActionButtonVisibility =
    useSelector((state) => state.ui?.actionButtonVisibility) || {};
  const rolePermission = useSelector((state) => state.auth.user?.user);
  const userInfo = useSelector((state) => state.auth.user);
  const userPermissions = useMemo(() => {
    return Array.isArray(userInfo?.user?.permissions)
      ? userInfo.user.permissions
      : [];
  }, [userInfo]);
  console.log(JSON.stringify(userInfo, null, 2));

  const [currentEnvironment, setCurrentEnvironment] = useState("fmf");

  // Create permission checkers
  const permissions = useMemo(
    () => createPermissionCheckers(userPermissions),
    [userPermissions]
  );

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        setCurrentEnvironment(selectedCategory || "fmf");
      } catch (error) {
        setCurrentEnvironment("fmf");
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

  // Check if section has required permission
  const hasSectionPermission = useCallback(
    (requiredPermission) => {
      return checkSectionPermission(requiredPermission, permissions);
    },
    [permissions]
  );

  const visibleSections = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      const hasPermission = hasSectionPermission(section.requiredPermission);
      if (!hasPermission) {
        acc[section.id] = false;
        return acc;
      }
      acc[section.id] = toBoolean(storedSectionVisibility?.[section.id], true);
      return acc;
    }, {});
  }, [storedSectionVisibility, hasSectionPermission, toBoolean]);

  const handleToggleSectionVisibility = (sectionId) => {
    dispatch(toggleSectionVisibility(sectionId));
  };

  // Check if tab should be disabled
  const isTabDisabled = useCallback(
    (tabId) => {
      if (tabId === "Trips" && !permissions.hasTripsPermission()) {
        return true;
      }
      if (tabId === "Hotels" && !permissions.hasHotelsPermission()) {
        return true;
      }
      if (tabId === "Flights" && !permissions.hasFlightsPermission()) {
        return true;
      }
      return false;
    },
    [permissions]
  );

  // Filter tabs based on permissions - always show Dashboard and More
  const TABS_CONFIG = useMemo(() => {
    const allTabs = getTabsForEnvironment(currentEnvironment, rolePermission);
    const alwaysVisibleTabs = ["Dashboard", "DashboardOfferHome", "More"];

    // Filter tabs: show only if user has permission OR it's Dashboard/More
    const filteredTabs = allTabs.filter((tab) => {
      // Always show Dashboard and More
      if (alwaysVisibleTabs.includes(tab.route)) {
        return true;
      }
      // For other tabs, check if user has permission
      return checkTabAllowed(tab.route, permissions);
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

  const visibleActionButtons = useMemo(() => {
    return ACTION_BUTTON_CONFIG.reduce((acc, button) => {
      acc[button.text] = toBoolean(
        storedActionButtonVisibility?.[button.text],
        true
      );
      return acc;
    }, {});
  }, [storedActionButtonVisibility, toBoolean]);

  const handleToggleActionButtonVisibility = (buttonText, category) => {
    if (checkActionButtonDisabled(category, permissions)) {
      Alert.alert(
        "Access Denied",
        "You don't have permission to modify this action button's visibility."
      );
      return;
    }
    dispatch(toggleActionButtonVisibility(buttonText));
  };

  const handleResetAll = () => {
    Alert.alert(
      "Reset All Settings",
      "Are you sure you want to reset all visibility settings to default? This will show all sections, tabs, and action buttons.",
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

  const actionButtonsByCategory = useMemo(() => {
    const grouped = {};
    ACTION_BUTTON_CONFIG.forEach((button) => {
      if (!grouped[button.category]) {
        grouped[button.category] = [];
      }
      grouped[button.category].push(button);
    });
    return grouped;
  }, []);

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
            <Text style={styles.sectionTitle}>Sections</Text>
            {SECTION_CONFIG.filter((section) => {
              // Only show sections user has permission for
              return hasSectionPermission(section.requiredPermission);
            }).map((section) => {
              return (
                <View
                  key={section.id}
                  style={[styles.visibilityRow, styles.sectionRow]}
                >
                  <Text style={styles.visibilityLabel}>{section.label}</Text>
                  <Switch
                    value={visibleSections[section.id]}
                    onValueChange={() =>
                      handleToggleSectionVisibility(section.id)
                    }
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
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tabs</Text>
            {TABS_CONFIG.map((tab) => {
              const isDisabled = tab.locked || tab.disabled;
              return (
                <View
                  key={tab.id}
                  style={[styles.visibilityRow, styles.tabRow]}
                >
                  <Text style={styles.visibilityLabel}>{tab.label}</Text>
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
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Action Buttons</Text>
            {Object.entries(actionButtonsByCategory)
              .filter(([category]) => {
                // Only show categories user has permission for
                return !checkActionButtonDisabled(category, permissions);
              })
              .map(([category, buttons]) => {
                return (
                  <View key={category} style={styles.categoryGroup}>
                    <Text style={styles.categoryLabel}>{category}</Text>
                    {buttons.map((button) => (
                      <View
                        key={button.text}
                        style={[styles.visibilityRow, styles.actionButtonRow]}
                      >
                        <Text style={styles.visibilityLabel}>
                          {button.text}
                        </Text>
                        <Switch
                          value={visibleActionButtons[button.text]}
                          onValueChange={() =>
                            handleToggleActionButtonVisibility(
                              button.text,
                              category
                            )
                          }
                          trackColor={{
                            false: Colors.LightGray,
                            true: Colors.Primary,
                          }}
                          thumbColor={Colors.White}
                        />
                      </View>
                    ))}
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

export default VisibilitySettings;
