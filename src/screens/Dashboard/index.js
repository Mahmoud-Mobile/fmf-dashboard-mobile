import React, { useMemo, useEffect, useCallback } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../../Global/colors";
import DashboardOverview from "./components/DashboardOverview";
import TopCountries from "./components/TopCountries";
import CustomEventHeader from "../../components/CustomEventHeader";
import { fetchDashboardSummary } from "../../redux/actions/dashboardActions";
import {
  createPermissionCheckers,
  hasSectionPermission as checkSectionPermission,
} from "../../config/permissionUtils";

const SECTION_CONFIG = [
  { 
    id: "dashboardOverview", 
    label: "Dashboard Overview",
    requiredPermission: "dashboard:read"
  },
  { 
    id: "topCountries", 
    label: "Top Countries",
    requiredPermission: "dashboard:read"
  },
  { 
    id: "eventAnalytics", 
    label: "Event Analytics",
    requiredPermission: "dashboard:read_data_entry"
  },
  { 
    id: "arrivalGuests", 
    label: "Arrival Guests",
    requiredPermission: "dashboard:read_flights"
  },
  { 
    id: "returnGuests", 
    label: "Return Guests",
    requiredPermission: "dashboard:read_flights"
  },
  { 
    id: "flights", 
    label: "Flights",
    requiredPermission: "dashboard:read_flights"
  },
  { 
    id: "hotelOccupancy", 
    label: "Hotel Occupancy",
    requiredPermission: "dashboard:read_accommodations"
  },
  { 
    id: "hotelDetails", 
    label: "Hotel Details",
    requiredPermission: "dashboard:read_accommodations"
  },
  { 
    id: "tripList", 
    label: "Trip List",
    requiredPermission: "dashboard:read_trips"
  },
  { 
    id: "tripsSummary", 
    label: "Trips Summary",
    requiredPermission: "dashboard:read_trips"
  },
];

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.api) || {};
  const userInfo = useSelector((state) => state.auth.user);
  const storedSectionVisibility =
    useSelector((state) => state.ui?.sectionVisibility) || {};

  const userPermissions = useMemo(() => {
    return Array.isArray(userInfo?.user?.permissions)
      ? userInfo.user.permissions
      : [];
  }, [userInfo]);

  // Create permission checkers
  const permissions = useMemo(
    () => createPermissionCheckers(userPermissions),
    [userPermissions]
  );

  // Fetch dashboard summary when component mounts or event changes
  useEffect(() => {
    if (selectedEvent?.id) {
      dispatch(fetchDashboardSummary(selectedEvent.id));
    }
  }, [selectedEvent?.id, dispatch]);

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
      acc[section.id] = toBoolean(
        storedSectionVisibility?.[section.id],
        true
      );
      return acc;
    }, {});
  }, [storedSectionVisibility, hasSectionPermission, toBoolean]);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleSections.dashboardOverview && <DashboardOverview />}
        {visibleSections.topCountries && <TopCountries />}
        <TouchableOpacity
          onPress={() => navigation.navigate("VisibilitySettings")}
          style={styles.visibleBtn}
        >
          <View style={styles.visibleContent}>
            <MaterialIcons name="tune" size={18} color={Colors.White} />
            <Text style={styles.visibleText}>Customize View</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
