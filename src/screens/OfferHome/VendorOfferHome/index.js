import React, { useState, useMemo, useRef, useCallback } from "react";
import { View, FlatList, Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomEventHeader from "../../../components/CustomEventHeader";
import SearchActionRow from "../../../components/SearchActionRow";
import CustomItem from "./components";
import { vendorData as vendorsData } from "./components/vendorData";
import { styles } from "./Styles";

const VendorOfferHome = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const [searchText, setSearchText] = useState("");

  const filteredVendors = useMemo(() => {
    if (!searchText.trim()) return vendorsData;

    return vendorsData
      .map((vendor) => {
        const filteredProducts = vendor.products.filter((product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase())
        );
        return { ...vendor, products: filteredProducts };
      })
      .filter((vendor) => vendor.products.length > 0);
  }, [searchText]);

  const handleSearchClear = () => {
    setSearchText("");
  };

  const handleVisitPress = (vendor, actionType = "visit") => {
    navigation.navigate("CheckInScan", {
      slectedVendor: vendor,
      actionType: actionType, // "visit" or "purchase"
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

export default VendorOfferHome;
