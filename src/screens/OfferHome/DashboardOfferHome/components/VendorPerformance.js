import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Colors } from "../../../../Global/colors";
import { Fonts } from "../../../../Global/fonts";
import { StyleSheet } from "react-native";
import { horizontalMargin } from "../../../../config/metrics";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const VendorPerformance = () => {
  const [selectedFilter, setSelectedFilter] = useState("Highest Sales");

  const filters = ["Highest Sales", "Most Visits", "Highest conversion"];

  const vendors = [
    {
      name: "Daze",
      visits: 360,
      purchases: 220,
      sales: "SAR 210K",
      conversion: "41%",
      status: "High",
      statusColor: Colors.Success,
      avatar: "https://picsum.photos/200/300",
    },
    {
      name: "Daze",
      visits: 160,
      purchases: 110,
      sales: "SAR 160K",
      conversion: "36%",
      status: "Medium",
      statusColor: Colors.Warning,
      avatar: "https://picsum.photos/200/300",
    },
    {
      name: "Daze",
      visits: 100,
      purchases: 90,
      sales: "SAR 100K",
      conversion: "25%",
      status: "Low",
      statusColor: Colors.Error,
      avatar: "https://picsum.photos/200/300",
    },
    {
      name: "Daze",
      visits: 460,
      purchases: 360,
      sales: "SAR 380K",
      conversion: "46%",
      status: "Active",
      statusColor: Colors.Success,
    },
  ];

  const getStatusColor = (status) => {
    if (status === "High" || status === "Active") return Colors.Success;
    if (status === "Medium") return Colors.Warning;
    return Colors.Error;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Vendor Performance</Text>

      <View style={styles.filtersContainer}>
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
      </View>

      <View style={styles.tableContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.tableContent}>
            <View style={styles.tableHeader}>
              <View style={[styles.headerColumn, styles.vendorNameColumn]}>
                <View style={styles.headerIconContainer}>
                  <Image
                    source={{ uri: "https://picsum.photos/200/300" }}
                    style={styles.headerImage}
                  />
                  <Text style={styles.headerText}>Vendor Name</Text>
                </View>
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

            {vendors.map((vendor, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index === vendors.length - 1 && styles.lastRow,
                ]}
              >
                <View style={[styles.dataColumn, styles.vendorNameColumn]}>
                  <View style={styles.vendorNameContainer}>
                    <View style={styles.vendorAvatar}>
                      <Text style={styles.vendorAvatarText}>
                        {vendor.name.charAt(0).toUpperCase()}
                        {vendor.name.charAt(1).toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                  </View>
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
                      { backgroundColor: getStatusColor(vendor.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{vendor.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
    marginBottom: 15,
    paddingHorizontal: horizontalMargin,
  },
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: horizontalMargin,
    marginBottom: 15,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: horizontalMargin,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.LightGray,
  },
  filterButtonActive: {
    backgroundColor: Colors.Primary,
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.DarkGray,
  },
  filterButtonTextActive: {
    color: Colors.White,
  },
  tableContainer: {
    backgroundColor: Colors.White,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tableContent: {
    minWidth: SCREEN_WIDTH,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F3F5",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F4",
    minWidth: SCREEN_WIDTH,
    alignItems: "center",
  },
  headerColumn: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 12,
    flexShrink: 0,
    paddingLeft: 0,
  },
  vendorNameColumn: {
    flexBasis: SCREEN_WIDTH * 0.25,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 120,
  },
  visitsColumn: {
    flexBasis: SCREEN_WIDTH * 0.15,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 80,
  },
  purchasesColumn: {
    flexBasis: SCREEN_WIDTH * 0.15,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 90,
  },
  salesColumn: {
    flexBasis: SCREEN_WIDTH * 0.2,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 100,
  },
  conversionColumn: {
    flexBasis: SCREEN_WIDTH * 0.1,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 70,
  },
  statusColumn: {
    flexBasis: SCREEN_WIDTH * 0.15,
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 80,
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  headerText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.PrimaryText,
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    alignItems: "center",
    minHeight: 50,
    minWidth: SCREEN_WIDTH,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  dataColumn: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 12,
    flexShrink: 0,
    paddingLeft: 0,
  },
  vendorNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  vendorName: {
    fontSize: 13,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.PrimaryText,
  },
  dataText: {
    fontSize: 12,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "left",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.FONT_MEDIUM,
    color: Colors.White,
  },
});

export default VendorPerformance;
