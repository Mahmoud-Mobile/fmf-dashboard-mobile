import React, { useState, useMemo, useRef } from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CustomEventHeader from "../../../components/CustomEventHeader";
import SearchActionRow from "../../../components/SearchActionRow";
import CustomItem from "./components";
import { vendorData as vendorsData } from "./components/vendorData";
import RecordPurchaseModal from "../../../components/RecordPurchaseModal";
import { styles } from "./Styles";

const CheckInOfferHome = () => {
  const navigation = useNavigation();
  const { selectedEvent } = useSelector((state) => state.api);
  const [searchText, setSearchText] = useState("");
  const recordPurchaseModalRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleVisitPress = () => {};

  const handlePurchasePress = (item) => {
    setSelectedProduct(item);
    recordPurchaseModalRef.current?.open();
  };

  const handleRecordPurchase = (purchaseData) => {
    console.log("Purchase recorded:", purchaseData);
    // TODO: Implement API call to record purchase
  };

  const handleCancelPurchase = () => {
    // Handle cancel if needed
  };

  const renderVendorCard = ({ item: vendor }) => {
    const renderProductItem = ({ item, index }) => (
      <CustomItem
        item={item}
        vendorData={vendor}
        index={index}
        onVisitPress={handleVisitPress}
        onPurchasePress={() => handlePurchasePress(item)}
      />
    );

    return (
      <View style={styles.vendorCard}>
        <CustomItem
          item={null}
          vendorData={vendor}
          index={0}
          onVisitPress={handleVisitPress}
          onPurchasePress={() =>
            handlePurchasePress(vendor.products?.[0] || null)
          }
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

      <RecordPurchaseModal
        ref={recordPurchaseModalRef}
        productName={selectedProduct?.name || ""}
        originalPrice={selectedProduct?.originalPrice?.toString() || ""}
        finalPrice={selectedProduct?.finalPrice?.toString() || ""}
        discount={selectedProduct?.discount?.toString() || ""}
        onRecordPurchase={handleRecordPurchase}
        onCancel={handleCancelPurchase}
      />
    </View>
  );
};

export default CheckInOfferHome;
