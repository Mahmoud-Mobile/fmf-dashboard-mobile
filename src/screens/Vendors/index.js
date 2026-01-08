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

  // Transform API response to match component structure
  const transformedVendor = useMemo(() => {
    if (!exhibitor?.exhibitor) return null;

    const exhibitorData = exhibitor.exhibitor;
    const products = exhibitor.products || [];
    const purchases = exhibitor.purchases || [];

    // Transform products array to match expected structure
    const transformedProducts = products.map((product) => ({
      id: product.id,
      type: "product",
      name: product.name || "Product",
      discount: product.discount || 0,
      originalPrice: product.originalPrice || product.price || 0,
      finalPrice: product.finalPrice || product.price || 0,
      recordedPurchaseTime:
        product.recordedPurchaseTime || product.createdAt || "",
    }));

    // Transform purchases array to match expected structure
    const transformedPurchases = purchases.map((purchase) => ({
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
    }));

    // Show only purchases (filter out products)
    const items = [...transformedPurchases];

    return {
      id: exhibitorData.id,
      name: exhibitorData.name || " ",
      booth: exhibitorData.boothNumber || exhibitorData.boothLocation || " ",
      visits: exhibitorData.stats?.totalVisits || 0,
      purchases: exhibitor.purchasesTotal || purchases.length || 0,
      avatar: exhibitorData.logo || null,
      products: transformedProducts,
      items: items, // Only purchases
    };
  }, [exhibitor]);

  const filteredVendors = useMemo(() => {
    if (!transformedVendor) return [];

    if (!searchText.trim()) {
      return [transformedVendor];
    }

    const searchLower = searchText.toLowerCase();
    const filteredItems = transformedVendor.items.filter((item) => {
      if (item.type === "purchase") {
        return (
          (item.name && item.name.toLowerCase().includes(searchLower)) ||
          (item.status && item.status.toLowerCase().includes(searchLower))
        );
      }
      return false;
    });

    if (filteredItems.length === 0) return [];

    return [{ ...transformedVendor, items: filteredItems }];
  }, [transformedVendor, searchText]);

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleVisitPress = (vendor, actionType = "visit") => {
    navigation.navigate("CheckInScan_Vendor", {
      slectedVendor: vendor,
      actionType: actionType, // "visit" or "purchase"
      sourceScreen: "Vendors",
      exhibitorId: exhibitor.id,
    });
  };

  const renderVendorCard = ({ item: vendor }) => {
    const renderItem = ({ item, index }) => (
      <CustomItem
        item={item}
        vendorData={vendor}
        index={index}
        onVisitPress={() => handleVisitPress(vendor, "visit")}
        onPurchasePress={() => handleVisitPress(vendor, "purchase")}
      />
    );

    return (
      <View style={styles.vendorCard}>
        <CustomItem
          item={null}
          vendorData={vendor}
          index={0}
          onVisitPress={() => handleVisitPress(vendor, "visit")}
          onPurchasePress={() => handleVisitPress(vendor, "purchase")}
          showVendorOnly={true}
        />
        <View style={styles.separator} />
        <FlatList
          data={vendor.items || []}
          renderItem={renderItem}
          keyExtractor={(item) =>
            `${item.type || "purchase"}-${vendor.id}-${item.id}`
          }
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <SearchActionRow
        searchPlaceholder="Search purchases..."
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
        keyExtractor={(vendor) => `vendor-${vendor.id}`}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Vendors;
