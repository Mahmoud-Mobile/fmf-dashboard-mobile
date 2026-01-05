import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Storage } from "expo-storage";
import CustomEventHeader from "../../components/CustomEventHeader";
import CustomCategories from "../../components/CustomCategories";
import SearchActionRow from "../../components/SearchActionRow";
import DateSearchModal from "../../components/DateSearchModal";
import { styles } from "./Styles";
import CheckInSubEvent from "./CheckInSubEvent";
import CheckInResource from "./CheckInResource";
import { createPermissionCheckers } from "../../config/permissionUtils";

const CheckInScreen = () => {
  const navigation = useNavigation();
  const [currentEnvironment, setCurrentEnvironment] = useState("fmf");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const printFunctionRef = useRef(null);
  const { selectedEvent } = useSelector((state) => state.api);
  const userInfo = useSelector((state) => state.auth.user);

  // Get user permissions
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

  // Check permissions for sub-events and resources
  const hasSubEventsPermission = useMemo(
    () => permissions.hasSubEventsPermission(),
    [permissions]
  );
  const hasResourcesPermission = useMemo(
    () => permissions.hasResourcesPermission(),
    [permissions]
  );

  useEffect(() => {
    const loadEnvironment = async () => {
      try {
        const storedCategory = await Storage.getItem({
          key: "selected-category",
        });
        const env = storedCategory || "fmf";
        setCurrentEnvironment(env);
        // If offerHome environment, set default category to resource
        if (env === "offerHome") {
          setSelectedCategory("resource");
        }
      } catch (error) {
        setCurrentEnvironment("fmf");
      }
    };
    loadEnvironment();
  }, []);

  // Ensure selectedCategory is always "resource" when in offerHome environment
  useEffect(() => {
    if (currentEnvironment === "offerHome" && selectedCategory === "subEvent") {
      setSelectedCategory("resource");
    }
  }, [currentEnvironment, selectedCategory]);

  // Update selected category if user doesn't have permission for current category
  useEffect(() => {
    if (selectedCategory === "subEvent" && !hasSubEventsPermission) {
      // If user doesn't have sub-events permission, switch to resource if available
      if (hasResourcesPermission) {
        setSelectedCategory("resource");
      } else {
        Alert.alert(
          "Access Denied",
          "You don't have permission to access sub-events or resources."
        );
      }
    } else if (selectedCategory === "resource" && !hasResourcesPermission) {
      // If user doesn't have resources permission, switch to sub-event if available
      if (hasSubEventsPermission) {
        setSelectedCategory("subEvent");
      } else {
        Alert.alert(
          "Access Denied",
          "You don't have permission to access sub-events or resources."
        );
      }
    }
  }, [selectedCategory, hasSubEventsPermission, hasResourcesPermission]);

  // Build categories based on permissions and environment
  const categories = useMemo(() => {
    const availableCategories = [];

    // Add sub-event category if user has permission and not in offerHome
    if (currentEnvironment !== "offerHome" && hasSubEventsPermission) {
      availableCategories.push({
        id: "subEvent",
        label: "Sub Event",
        key: "subEvent",
      });
    }

    // Add resource category if user has permission
    if (hasResourcesPermission) {
      availableCategories.push({
        id: "resource",
        label: "Resource",
        key: "resource",
      });
    }

    return availableCategories;
  }, [currentEnvironment, hasSubEventsPermission, hasResourcesPermission]);

  // Set initial category based on permissions and environment
  useEffect(() => {
    if (selectedCategory === null) {
      if (currentEnvironment === "offerHome") {
        // offerHome always uses resource
        if (hasResourcesPermission) {
          setSelectedCategory("resource");
        }
      } else {
        // For fmf, prefer sub-event if available, otherwise resource
        if (hasSubEventsPermission) {
          setSelectedCategory("subEvent");
        } else if (hasResourcesPermission) {
          setSelectedCategory("resource");
        }
      }
    }
  }, [
    selectedCategory,
    currentEnvironment,
    hasSubEventsPermission,
    hasResourcesPermission,
  ]);

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  }, []);

  const handleDateModalClose = useCallback(() => {
    setShowDateModal(false);
  }, []);

  const handlePrint = useCallback(async () => {
    if (printFunctionRef.current) {
      await printFunctionRef.current();
    }
  }, []);

  const handlePrintReady = useCallback((printFn) => {
    printFunctionRef.current = printFn;
  }, []);

  const searchPlaceholder = useMemo(() => {
    if (selectedCategory === "subEvent") {
      return "Search sub events...";
    } else if (selectedCategory === "resource") {
      return "Search resources...";
    }
    return "Search...";
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder={searchPlaceholder}
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchClear={handleSearchClear}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onPressPrint={handlePrint}
        isPrinting={isPrinting}
        onPressDate={() => setShowDateModal(true)}
        selectedDate={selectedDate}
        onClearDate={() => setSelectedDate(null)}
      />

      {currentEnvironment !== "offerHome" && categories.length > 1 && (
        <CustomCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      )}

      {!hasSubEventsPermission && !hasResourcesPermission ? (
        <View style={styles.noAccessContainer}>
          <Text style={styles.noAccessText}>
            You don't have permission to access sub-events or resources.
          </Text>
        </View>
      ) : selectedCategory === "subEvent" && hasSubEventsPermission ? (
        <CheckInSubEvent
          searchText={searchText}
          viewMode={viewMode}
          selectedDate={selectedDate}
          onPrintReady={handlePrintReady}
          setIsPrinting={setIsPrinting}
        />
      ) : selectedCategory === "resource" && hasResourcesPermission ? (
        <CheckInResource
          searchText={searchText}
          viewMode={viewMode}
          selectedDate={selectedDate}
          onPrintReady={handlePrintReady}
          setIsPrinting={setIsPrinting}
        />
      ) : null}

      <DateSearchModal
        visible={showDateModal}
        onClose={handleDateModalClose}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
        title={
          selectedCategory === "subEvent"
            ? "Filter Sub Events by Date"
            : selectedCategory === "resource"
            ? "Filter Resources by Date"
            : "Filter by Date"
        }
        placeholder={
          selectedCategory === "subEvent"
            ? "Select a date to show sub events from that date onwards"
            : selectedCategory === "resource"
            ? "Select a date to show resources from that date onwards"
            : "Select a date to filter"
        }
      />
    </View>
  );
};

export default CheckInScreen;
