import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../Global/colors";
import OverviewCards from "../OverviewCards.js";
import { styles, customItemStyles } from "./Styles";
import dummyData from "../../../../data/dummyData.json";

const CustomItem = ({
  item,
  vendorData,
  showVendorOnly = false,
  dateFilters = [],
  selectedDateFilter,
  setSelectedDateFilter,
}) => {
  const {
    name: vendorName = "Vendor Name",
    booth = "Booth A-12",
    avatar,
  } = vendorData || {};

  const vendorInitial =
    vendorName.charAt(0).toUpperCase() + vendorName.charAt(1).toUpperCase() ||
    "";

  const renderAvatar = () => {
    if (avatar) {
      return (
        <Image source={{ uri: avatar }} style={customItemStyles.avatarImage} />
      );
    }
    return (
      <View style={customItemStyles.vendorAvatar}>
        <Text style={customItemStyles.avatarText}>{vendorInitial}</Text>
      </View>
    );
  };

  if (showVendorOnly) {
    return (
      <View style={customItemStyles.vendorHeader}>
        <View style={customItemStyles.vendorLeft}>
          {renderAvatar()}
          <View style={customItemStyles.vendorInfo}>
            <Text style={customItemStyles.vendorName} numberOfLines={1}>
              {vendorName}
            </Text>
            <View style={customItemStyles.boothContainer}>
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.SecondaryText}
              />
              <Text style={customItemStyles.boothText} numberOfLines={1}>
                {booth}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.dateFiltersScroll}>
          {dateFilters.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateFilterButton,
                selectedDateFilter === filter && styles.dateFilterButtonActive,
              ]}
              onPress={() => setSelectedDateFilter(filter)}
            >
              <Text
                style={[
                  styles.dateFilterText,
                  selectedDateFilter === filter && styles.dateFilterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (!item) return null;

  return (
    <View style={customItemStyles.productCard}>
      <View style={customItemStyles.productContent}>
        <View style={customItemStyles.productLeft}>
          <Text style={customItemStyles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={customItemStyles.productDiscount}>
            Discount: {item.discount}%
          </Text>
        </View>

        <View style={customItemStyles.productMiddle}>
          <Text style={customItemStyles.originalPrice} numberOfLines={1}>
            Original Price: SAR{" "}
            <Text style={customItemStyles.strikethrough}>
              {item.originalPrice}
            </Text>
          </Text>
          <Text style={customItemStyles.finalPrice} numberOfLines={1}>
            Final Price: SAR {item.finalPrice}
          </Text>
        </View>

        <View style={customItemStyles.productRight}>
          <Text style={customItemStyles.recordedPurchase} numberOfLines={1}>
            {item.recordedPurchaseTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

const VendorDashboard = () => {
  const { vendorDashboard } = dummyData;
  const [selectedDateFilter, setSelectedDateFilter] = useState(
    vendorDashboard.dateFilters[0]
  );

  const overviewCards = vendorDashboard.overviewCards;
  const dateFilters = vendorDashboard.dateFilters;
  const purchases = vendorDashboard.purchases;
  const vendorInfo = vendorDashboard.vendorInfo;

  return (
    <View style={styles.container}>
      <OverviewCards cards={overviewCards} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Purchases List</Text>
        <View style={styles.purchasesCard}>
          <CustomItem
            item={null}
            vendorData={vendorInfo}
            showVendorOnly={true}
            dateFilters={dateFilters}
            selectedDateFilter={selectedDateFilter}
            setSelectedDateFilter={setSelectedDateFilter}
          />

          <View style={styles.separator} />

          <View style={styles.purchasesList}>
            {purchases.map((purchase, index) => (
              <CustomItem
                key={purchase.id}
                item={purchase}
                vendorData={vendorInfo}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default VendorDashboard;
