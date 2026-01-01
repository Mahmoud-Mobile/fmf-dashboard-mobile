import React, { useMemo, useEffect, useRef, useState } from "react";
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
import { Storage } from "expo-storage";

const SECTION_CONFIG = [
  { id: "dashboardOverview", label: "Dashboard Overview" },
  { id: "eventAnalytics", label: "Event Analytics" },
  { id: "arrivalGuests", label: "Arrival Guests" },
  { id: "returnGuests", label: "Return Guests" },
  { id: "flights", label: "Flights" },
  { id: "hotelOccupancy", label: "Hotel Occupancy" },
  { id: "hotelDetails", label: "Hotel Details" },
  { id: "tripList", label: "Trip List" },
  { id: "tripsSummary", label: "Trips Summary" },
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
  const [currentEnvironment, setCurrentEnvironment] = useState("fmf");

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const selectedCategory = await Storage.getItem({
          key: "selected-category",
        });
        const env = selectedCategory || "fmf";
        setCurrentEnvironment(env);
      } catch (error) {
        console.log("Error loading environment:", error);
        setCurrentEnvironment("fmf");
      }
    };
    loadEnvironment();
  }, []);

  const visibleSections = useMemo(() => {
    return SECTION_CONFIG.reduce((acc, section) => {
      const storedValue = storedSectionVisibility?.[section.id];
      const boolValue =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      acc[section.id] = boolValue;
      return acc;
    }, {});
  }, [storedSectionVisibility]);

  const handleToggleSectionVisibility = (sectionId) => {
    dispatch(toggleSectionVisibility(sectionId));
  };

  const TABS_CONFIG = useMemo(() => {
    const tabs = getTabsForEnvironment(currentEnvironment, rolePermission);
    return tabs.map((tab) => ({
      id: tab.route,
      label: tab.titleText || tab.route,
      locked: tab.alwaysVisible || false,
    }));
  }, [currentEnvironment, rolePermission]);

  const DEFAULT_TAB_VISIBILITY = useMemo(() => {
    return getDefaultTabVisibility(currentEnvironment, rolePermission);
  }, [currentEnvironment, rolePermission]);

  const resolvedTabVisibility = useMemo(() => {
    return TABS_CONFIG.reduce((acc, tab) => {
      const storedValue = storedTabVisibility?.[tab.id];
      const boolValue =
        storedValue === undefined
          ? DEFAULT_TAB_VISIBILITY[tab.id] ?? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      acc[tab.id] = boolValue;
      return acc;
    }, {});
  }, [storedTabVisibility, TABS_CONFIG, DEFAULT_TAB_VISIBILITY]);

  const latestTabVisibilityRef = useRef(resolvedTabVisibility);
  useEffect(() => {
    latestTabVisibilityRef.current = resolvedTabVisibility;
  }, [resolvedTabVisibility]);

  const handleToggleTabVisibility = (tabId) => {
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
      const storedValue = storedActionButtonVisibility?.[button.text];
      const boolValue =
        storedValue === undefined
          ? true
          : typeof storedValue === "string"
          ? storedValue === "true"
          : Boolean(storedValue);
      acc[button.text] = boolValue;
      return acc;
    }, {});
  }, [storedActionButtonVisibility]);

  const handleToggleActionButtonVisibility = (buttonText) => {
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

  // Group action buttons by category
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
        title="Visibility Settings"
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
            {SECTION_CONFIG.map((section) => (
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
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tabs</Text>
            {TABS_CONFIG.map((tab) => (
              <View key={tab.id} style={[styles.visibilityRow, styles.tabRow]}>
                <Text style={styles.visibilityLabel}>{tab.label}</Text>
                <Switch
                  value={tab.locked ? true : resolvedTabVisibility[tab.id]}
                  onValueChange={() =>
                    !tab.locked && handleToggleTabVisibility(tab.id)
                  }
                  disabled={!!tab.locked}
                  trackColor={{
                    false: Colors.LightGray,
                    true: Colors.Primary,
                  }}
                  thumbColor={Colors.White}
                />
              </View>
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Action Buttons</Text>
            {Object.entries(actionButtonsByCategory).map(
              ([category, buttons]) => (
                <View key={category} style={styles.categoryGroup}>
                  <Text style={styles.categoryLabel}>{category}</Text>
                  {buttons.map((button) => (
                    <View
                      key={button.text}
                      style={[styles.visibilityRow, styles.actionButtonRow]}
                    >
                      <Text style={styles.visibilityLabel}>{button.text}</Text>
                      <Switch
                        value={visibleActionButtons[button.text]}
                        onValueChange={() =>
                          handleToggleActionButtonVisibility(button.text)
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
              )
            )}
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
