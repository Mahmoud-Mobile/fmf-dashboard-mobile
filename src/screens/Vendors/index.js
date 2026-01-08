import React, { useState, useMemo, useCallback } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import CustomEventHeader from "../../components/CustomEventHeader";
import LoadingModal from "../../components/LoadingModal";
import SearchActionRow from "../../components/SearchActionRow";
import CustomItem from "./components";
import { styles } from "./Styles";
import { fetchExhibitorById } from "../../redux/actions/api";
import { Colors } from "../../Global/colors";

const SEARCH_PLACEHOLDER = "Search purchases, vendor, or booth...";
const ACTION_TYPE_VISIT = "visit";
const ACTION_TYPE_PURCHASE = "purchase";
const SOURCE_SCREEN = "Vendors";

const transformPurchase = (purchase) => {
  if (!purchase?.id) return null;

  return {
    id: purchase.id,
    type: "purchase",
    name: purchase.notes || "Purchase",
    discount: purchase.totalDiscount || 0,
    originalPrice: purchase.subtotal || 0,
    finalPrice: purchase.total || 0,
    recordedPurchaseTime: purchase.createdAt || "",
    status: purchase.status || "",
    totalSavings: purchase.totalSavings || 0,
    itemsCount: purchase.items?.length || 0,
  };
};

const transformExhibitorToVendor = (exhibitor) => {
  if (!exhibitor?.exhibitor) return null;

  const exhibitorData = exhibitor.exhibitor;
  if (!exhibitorData?.id) return null;

  const purchases = exhibitor.purchases || [];
  const transformedPurchases = purchases.map(transformPurchase).filter(Boolean); // Filter out any null values

  return {
    id: exhibitorData.id,
    name: exhibitorData.name || " ",
    booth: exhibitorData.boothNumber || exhibitorData.boothLocation || " ",
    visits: exhibitorData.stats?.totalVisits || 0,
    purchases: exhibitor.purchasesTotal || purchases.length,
    avatar: exhibitorData.logo || null,
    items: transformedPurchases,
  };
};

// Filter items based on search text (purchase name and status)
const filterItemsBySearch = (items, searchText) => {
  if (!searchText.trim()) return items;

  const searchLower = searchText.toLowerCase();
  return items.filter((item) => {
    if (item.type !== "purchase") return false;
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.status?.toLowerCase().includes(searchLower)
    );
  });
};

// Check if vendor matches search (vendor name or booth)
const doesVendorMatchSearch = (vendor, searchText) => {
  if (!searchText.trim() || !vendor) return false;

  const searchLower = searchText.toLowerCase();
  const vendorName = vendor.name?.toLowerCase() || "";
  const vendorBooth = vendor.booth?.toLowerCase() || "";

  return vendorName.includes(searchLower) || vendorBooth.includes(searchLower);
};

const Vendors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedEvent, exhibitor, loading } = useSelector(
    (state) => state.api
  );
  const exhibitorFromAuth = useSelector((state) => state.auth.exhibitor);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (selectedEvent?.id && exhibitorFromAuth?.id) {
        dispatch(fetchExhibitorById(selectedEvent.id, exhibitorFromAuth.id));
      }
    }, [selectedEvent?.id, exhibitorFromAuth?.id, dispatch])
  );

  const transformedVendor = useMemo(
    () => transformExhibitorToVendor(exhibitor),
    [exhibitor]
  );

  const filteredVendors = useMemo(() => {
    if (!transformedVendor) return [];

    // If no search text, return all vendor data
    if (!searchText.trim()) {
      return [transformedVendor];
    }

    // Check if search matches vendor name or booth
    const vendorMatches = doesVendorMatchSearch(transformedVendor, searchText);

    // If vendor matches, return all items for that vendor
    if (vendorMatches) {
      return [transformedVendor];
    }

    // Otherwise, filter items by purchase name and status
    const filteredItems = filterItemsBySearch(
      transformedVendor.items,
      searchText
    );

    // If no items match, return empty array
    if (filteredItems.length === 0) return [];

    // Return vendor with filtered items
    return [{ ...transformedVendor, items: filteredItems }];
  }, [transformedVendor, searchText]);

  const handleSearchClear = useCallback(() => {
    setSearchText("");
  }, []);

  const handleVisitPress = useCallback(
    (vendor, actionType = ACTION_TYPE_VISIT) => {
      if (!vendor?.id) return;

      navigation.navigate("CheckInScan_Vendor", {
        selectedVendor: vendor,
        actionType,
        sourceScreen: SOURCE_SCREEN,
        exhibitorId: exhibitor?.id || exhibitorFromAuth?.id || vendor.id,
      });
    },
    [navigation, exhibitor?.id, exhibitorFromAuth?.id]
  );

  const renderVendorCard = useCallback(
    ({ item: vendor }) => {
      if (!vendor?.id) return null;

      const renderPurchaseItem = ({ item, index }) => {
        if (!item?.id) return null;

        return (
          <CustomItem
            item={item}
            vendorData={vendor}
            index={index}
            onVisitPress={() => handleVisitPress(vendor, ACTION_TYPE_VISIT)}
            onPurchasePress={() =>
              handleVisitPress(vendor, ACTION_TYPE_PURCHASE)
            }
          />
        );
      };

      return (
        <View style={styles.vendorCard}>
          <CustomItem
            item={null}
            vendorData={vendor}
            index={0}
            onVisitPress={() => handleVisitPress(vendor, ACTION_TYPE_VISIT)}
            onPurchasePress={() =>
              handleVisitPress(vendor, ACTION_TYPE_PURCHASE)
            }
            showVendorOnly={true}
          />
          <View style={styles.separator} />
          <FlatList
            data={vendor.items || []}
            renderItem={renderPurchaseItem}
            keyExtractor={(item, index) =>
              `purchase-${vendor?.id || "unknown"}-${item?.id || index}`
            }
            scrollEnabled={false}
          />
        </View>
      );
    },
    [handleVisitPress]
  );

  const keyExtractor = useCallback(
    (vendor) => `vendor-${vendor?.id || "unknown"}`,
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
        searchPlaceholder={SEARCH_PLACEHOLDER}
        searchValue={searchText}
        onSearchChange={setSearchText}
        onSearchClear={handleSearchClear}
        showPrintButton={false}
        showDateButton={false}
      />

      <Pressable style={styles.importButton}>
        <MaterialIcons name="file-upload" size={16} color={Colors.DarkGray} />
        <Text style={styles.importButtonText}>Import Files Excel</Text>
      </Pressable>

      <FlatList
        data={filteredVendors}
        renderItem={renderVendorCard}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Vendors;
