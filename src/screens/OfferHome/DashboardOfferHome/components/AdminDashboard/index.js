import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../../Global/colors";
import { styles } from "./Styles";
import dummyData from "../../../../../data/dummyData.json";
import OverviewCards from "../OverviewCards";
import AreasOverview from "../AreasOverview";

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Highest Sales");

  const { adminDashboard } = dummyData;
  const filters = adminDashboard.filters;

  const overviewCards = adminDashboard.overviewCards;
  const areas = adminDashboard.areas;
  const vendors = adminDashboard.vendors;

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
      <OverviewCards cards={overviewCards} />
      <View style={styles.performanceSection}>
        <Text style={styles.sectionTitle}>Vendor Performance</Text>

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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tableContentContainer}
        >
          <View style={styles.tableContent}>
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
                        style={[
                          styles.statusText,
                          { color: statusColors.color },
                        ]}
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
        <View style={styles.areasOverviewContainer}>
          <AreasOverview areas={areas} />
        </View>
      </View>
    </View>
  );
};

export default AdminDashboard;
