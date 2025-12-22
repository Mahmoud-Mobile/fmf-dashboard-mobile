import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";
import { horizontalMargin } from "../../../../config/metrics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const VendorPerformance = () => {
  const [selectedFilter, setSelectedFilter] = useState("Highest Sales");

  const filters = ["Highest Sales", "Most Visits", "Highest conversion"];

  const vendors = [
    {
      name: "Product 1",
      visits: 360,
      purchases: 220,
      sales: "SAR 210K",
      conversion: "41%",
      status: "High",
    },
    {
      name: "Product 2",
      visits: 160,
      purchases: 110,
      sales: "SAR 160K",
      conversion: "36%",
      status: "Medium",
    },
    {
      name: "Product 3",
      visits: 100,
      purchases: 90,
      sales: "SAR 100K",
      conversion: "25%",
      status: "Low",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "High") {
      return {
        backgroundColor: "#F0FDF4",
        color: "#008236",
        borderColor: "rgba(0, 130, 54, 0.20)",
      };
    }
    if (status === "Medium") {
      return {
        backgroundColor: "rgba(255, 172, 74, 0.10)",
        color: "#FF9517",
        borderColor: "rgba(255, 172, 74, 0.20)",
      };
    }
    if (status === "Low") {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.10)",
        color: "#FF0000",
        borderColor: "rgba(255, 0, 0, 0.20)",
      };
    }
    return {
      backgroundColor: "",
      color: Colors.White,
      borderColor: "",
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Vendor Performance</Text>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter && styles.filterButtonTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Table */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tableContentContainer}
      >
        <View style={styles.tableContent}>
          {/* HEADER */}
          <View style={styles.tableHeader}>
            <View style={[styles.headerColumn, styles.vendorNameColumn]}>
              <Image
                source={{ uri: "https://picsum.photos/200/300" }}
                style={styles.headerImage}
                resizeMode="cover"
              />
              <Text style={styles.headerText}>Daze</Text>
            </View>
            <View style={[styles.headerColumn, styles.visitsColumn]}>
              <Text style={styles.headerText}>Visits</Text>
            </View>
            <View style={[styles.headerColumn, styles.purchasesColumn]}>
              <Text style={styles.headerText}>Purchases</Text>
            </View>
            <View style={[styles.headerColumn, styles.salesColumn]}>
              <Text style={styles.headerText}>Sales</Text>
            </View>
            <View style={[styles.headerColumn, styles.conversionColumn]}>
              <Text style={styles.headerText}>Conv.</Text>
            </View>
            <View style={[styles.headerColumn, styles.statusColumn]}>
              <Text style={styles.headerText}>Status</Text>
            </View>
          </View>

          {/* ROWS */}
          {vendors.map((vendor, index) => {
            const statusColors = getStatusColor(vendor.status);
            return (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.dataColumn, styles.vendorNameColumn]}>
                  <View style={styles.vendorAvatar}>
                    <Text style={styles.vendorAvatarText}>
                      {vendor.name.charAt(0).toUpperCase()}
                      {vendor.name.charAt(1).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.dataText}>{vendor.name}</Text>
                </View>
                <View style={[styles.dataColumn, styles.visitsColumn]}>
                  <Text style={styles.dataText}>{vendor.visits}</Text>
                </View>
                <View style={[styles.dataColumn, styles.purchasesColumn]}>
                  <Text style={styles.dataText}>{vendor.purchases}</Text>
                </View>
                <View style={[styles.dataColumn, styles.salesColumn]}>
                  <Text style={styles.dataText}>{vendor.sales}</Text>
                </View>
                <View style={[styles.dataColumn, styles.conversionColumn]}>
                  <Text style={styles.dataText}>{vendor.conversion}</Text>
                </View>
                <View style={[styles.dataColumn, styles.statusColumn]}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: statusColors.backgroundColor,
                        borderColor: statusColors.borderColor,
                        borderWidth: 0.5,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: statusColors.color }]}
                    >
                      {vendor.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 30 },

  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },

  filtersContainer: {
    paddingHorizontal: horizontalMargin,
    marginBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
    marginRight: 8,
  },

  filterButtonActive: { backgroundColor: Colors.Primary },

  filterButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.DarkGray,
  },

  filterButtonTextActive: { color: Colors.White },

  tableContent: { minWidth: SCREEN_WIDTH },

  tableContentContainer: { backgroundColor: "white" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F3F5",
    paddingVertical: 12,
    paddingHorizontal: horizontalMargin,
  },

  headerColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  headerText: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
    textAlign: "left",
  },
  headerImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: horizontalMargin,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },

  dataColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  dataText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "left",
    maxWidth: 100,
  },

  vendorNameColumn: { width: 150, flexDirection: "row", alignItems: "center" },
  vendorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.LightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    overflow: "hidden",
  },
  vendorAvatarText: {
    fontSize: 10,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.SecondaryText,
  },
  visitsColumn: { width: 90 },
  purchasesColumn: { width: 90 },
  salesColumn: { width: 100 },
  conversionColumn: { width: 100 },
  statusColumn: { width: 100 },

  statusBadge: {
    paddingVertical: 4,
    borderRadius: 8,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});

export default VendorPerformance;
