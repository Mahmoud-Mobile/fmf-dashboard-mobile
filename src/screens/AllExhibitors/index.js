import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import LoadingModal from "../../components/LoadingModal";
import CustomEventHeader from "../../components/CustomEventHeader";
import SearchActionRow from "../../components/SearchActionRow";
import EmptyListComponent from "../../components/EmptyListComponent";
import { Colors } from "../../Global/colors";
import { fetchExhibitors } from "../../redux/actions/api";
import { setExhibitor as setExhibitorAction } from "../../redux/actions/authActions";
import { styles } from "./Styles";

const AllExhibitors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent, exhibitors, loading } = useSelector(
    (state) => state.api
  );
  const [searchText, setSearchText] = useState("");

  // Handle exhibitors data structure - could be array or object with exhibitors property
  const exhibitorsList = useMemo(() => {
    if (Array.isArray(exhibitors)) {
      return exhibitors;
    }
    if (exhibitors?.exhibitors && Array.isArray(exhibitors.exhibitors)) {
      return exhibitors.exhibitors;
    }
    return [];
  }, [exhibitors]);

  useFocusEffect(
    useCallback(() => {
      if (selectedEvent?.id) {
        dispatch(fetchExhibitors(selectedEvent.id, { page: 1, limit: 1000 }));
      }
    }, [selectedEvent?.id, dispatch])
  );

  const filteredExhibitors = useMemo(() => {
    if (!exhibitorsList || exhibitorsList.length === 0) return [];

    if (!searchText.trim()) {
      return exhibitorsList;
    }

    const searchLower = searchText.toLowerCase();
    return exhibitorsList.filter((exhibitor) => {
      const name = (exhibitor?.name || "").toLowerCase();
      const booth = (
        exhibitor?.boothNumber ||
        exhibitor?.boothLocation ||
        ""
      ).toLowerCase();
      return name.includes(searchLower) || booth.includes(searchLower);
    });
  }, [exhibitorsList, searchText]);

  const handleExhibitorPress = useCallback(
    async (exhibitor) => {
      try {
        // Store exhibitor in auth state
        if (exhibitor) {
          dispatch(setExhibitorAction(exhibitor));
        }
        // Navigate to MyTabs
        navigation.navigate("MyTabs");
      } catch (error) {
        Alert.alert("Error", "Failed to select exhibitor");
      }
    },
    [navigation, dispatch]
  );

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  const renderExhibitorItem = useCallback(
    ({ item: exhibitor }) => {
      const exhibitorName = exhibitor?.name || "Unknown";
      const booth = exhibitor?.boothNumber || exhibitor?.boothLocation || "N/A";
      const logo = exhibitor?.logo || null;
      const initials = exhibitorName
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <TouchableOpacity
          style={styles.exhibitorCard}
          onPress={() => handleExhibitorPress(exhibitor)}
          activeOpacity={0.7}
        >
          <View style={styles.exhibitorContent}>
            <View style={styles.exhibitorLeft}>
              {logo ? (
                <Image
                  source={{ uri: logo }}
                  style={styles.exhibitorLogo}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.exhibitorAvatar}>
                  <Text style={styles.avatarText}>{initials}</Text>
                </View>
              )}
              <View style={styles.exhibitorInfo}>
                <Text style={styles.exhibitorName} numberOfLines={2}>
                  {exhibitorName}
                </Text>
                <View style={styles.boothContainer}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={Colors.SecondaryText}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.boothText} numberOfLines={1}>
                    {booth}
                  </Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.Gray} />
          </View>
        </TouchableOpacity>
      );
    },
    [handleExhibitorPress]
  );

  const keyExtractor = useCallback(
    (item, index) => item?.id || `exhibitor-${index}`,
    []
  );

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder="Search exhibitors..."
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchClear={handleSearchClear}
        showPrintButton={false}
        showDateButton={false}
      />

      <FlatList
        data={filteredExhibitors}
        renderItem={renderExhibitorItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyListComponent
            icon="Vendor_Icon"
            title={
              searchText ? "No Exhibitors Found" : "No Exhibitors Available"
            }
            description={
              searchText
                ? `No exhibitors match "${searchText}". Try a different search term.`
                : "There are no exhibitors to display at the moment."
            }
          />
        )}
      />
    </View>
  );
};

export default AllExhibitors;
