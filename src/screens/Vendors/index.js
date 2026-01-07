import React, { useState, useMemo, useEffect, useCallback } from "react";
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
      name: product.name || "Product",
      discount: product.discount || 0,
      originalPrice: product.originalPrice || product.price || 0,
      finalPrice: product.finalPrice || product.price || 0,
      recordedPurchaseTime:
        product.recordedPurchaseTime || product.createdAt || "",
    }));

    return {
      id: exhibitorData.id,
      name: exhibitorData.name || " ",
      booth: exhibitorData.boothNumber || exhibitorData.boothLocation || " ",
      visits: exhibitorData.stats?.totalVisits || 0,
      purchases: exhibitor.purchasesTotal || purchases.length || 0,
      avatar: exhibitorData.logo || null,
      products: transformedProducts,
    };
  }, [exhibitor]);

  const filteredVendors = useMemo(() => {
    if (!transformedVendor) return [];

    if (!searchText.trim()) {
      return [transformedVendor];
    }

    const filteredProducts = transformedVendor.products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredProducts.length === 0) return [];

    return [{ ...transformedVendor, products: filteredProducts }];
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
    const renderProductItem = ({ item, index }) => (
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
          data={vendor.products}
          renderItem={renderProductItem}
          keyExtractor={(product) => `product-${vendor.id}-${product.id}`}
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
        searchPlaceholder="Search products..."
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
