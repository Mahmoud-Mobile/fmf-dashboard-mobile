import React, { useMemo } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Colors } from "../../../../Global/colors";
import { styles } from "./Styles";
import OverviewCards from "../OverviewCards";
import AreasOverview from "../AreasOverview";

// Helper function to extract numeric value from object or number
const extractValue = (value, defaultVal = 0) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value) || defaultVal;
  if (value && typeof value === "object") {
    // Handle objects like {allTime: 100, today: 50}
    return value.allTime || value.total || value.value || defaultVal;
  }
  return defaultVal;
};

// Helper function to format sales value
const formatSales = (sales) => {
  if (typeof sales === "string") return sales;
  if (typeof sales === "number") return `SAR ${sales.toLocaleString()}`;
  if (sales && typeof sales === "object") {
    const value = sales.allTime || sales.total || sales.value || 0;
    return `SAR ${value.toLocaleString()}`;
  }
  return "SAR 0";
};

const AdminDashboard = ({ exhibitorDashboard }) => {
  // Extract vendor performance data from API response
  // For admin dashboard, we might have multiple vendors or use topProducts
  const vendors = useMemo(() => {
    if (!exhibitorDashboard) return [];

    if (
      exhibitorDashboard.vendors &&
      Array.isArray(exhibitorDashboard.vendors)
    ) {
      return exhibitorDashboard.vendors.map((vendor) => {
        const visits = extractValue(
          vendor.stats?.totalVisits || vendor.visits || vendor.totalVisits
        );
        const purchases = extractValue(
          vendor.purchases || vendor.totalPurchases
        );
        const sales = formatSales(vendor.sales || vendor.totalSales);
        const conversionRate = visits > 0 ? (purchases / visits) * 100 : 0;
        const conversion =
          vendor.conversion ||
          vendor.conversionRate ||
          `${conversionRate.toFixed(0)}%`;
        const conversionNum =
          typeof conversion === "string" ? parseFloat(conversion) : conversion;

        // Determine status based on conversion rate
        let status = vendor.status;
        if (!status) {
          if (conversionNum >= 40) status = "High";
          else if (conversionNum >= 25) status = "Medium";
          else status = "Low";
        }

        return {
          name: vendor.name || vendor.exhibitorName || "N/A",
          visits: visits,
          purchases: purchases,
          sales: sales,
          conversion:
            typeof conversion === "string"
              ? conversion
              : `${conversion.toFixed(0)}%`,
          status: status,
          logo: vendor.logo || vendor.avatar || null,
          booth: vendor.boothNumber || vendor.boothLocation || "",
        };
      });
    }

    // If topProducts exists, convert to vendor-like format
    if (
      exhibitorDashboard.topProducts &&
      Array.isArray(exhibitorDashboard.topProducts)
    ) {
      return exhibitorDashboard.topProducts.map((product, index) => {
        const revenue = product.revenue || 0;
        const quantity = product.quantitySold || 0;
        const avgPrice = quantity > 0 ? revenue / quantity : 0;

        return {
          name: product.productName || "Unknown Product",
          visits: 0, // Not available in topProducts
          purchases: quantity,
          sales: formatSales(revenue),
          conversion: "N/A",
          status:
            revenue >= 10000 ? "High" : revenue >= 5000 ? "Medium" : "Low",
          logo: null,
          booth: "",
        };
      });
    }

    return [];
  }, [exhibitorDashboard]);

  // Extract overview cards data from API response
  const overviewCards = useMemo(() => {
    if (!exhibitorDashboard?.overview) return [];

    const { overview } = exhibitorDashboard;

    // Helper to extract and format values
    const getValue = (obj, key) => {
      const val = obj?.[key];
      if (typeof val === "number") return val;
      if (typeof val === "string") return parseFloat(val) || 0;
      if (val && typeof val === "object") {
        return val.allTime || val.total || val.value || 0;
      }
      return 0;
    };

    const getTodayValue = (obj, key) => {
      const val = obj?.[key];
      if (val && typeof val === "object") {
        return val.today || 0;
      }
      return 0;
    };

    const totalVisits = getValue(overview, "totalVisits");
    const todayVisits = getTodayValue(overview, "totalVisits");
    const totalPurchases = getValue(overview, "totalPurchases");
    const todayPurchases = getTodayValue(overview, "totalPurchases");
    const totalSales = overview.totalSales;
    const todaySales = getTodayValue(overview, "totalSales");
    const totalItems = getValue(overview, "totalItems");
    const todayItems = getTodayValue(overview, "totalItems");

    return [
      {
        title: "Total Visits",
        value: totalVisits.toLocaleString(),
        today: todayVisits > 0 ? todayVisits.toLocaleString() : undefined,
        icon: "people-outline",
      },
      {
        title: "Total Purchases",
        value: totalPurchases.toLocaleString(),
        today: todayPurchases > 0 ? todayPurchases.toLocaleString() : undefined,
        icon: "bag-outline",
      },
      {
        title: "Total Sales",
        value: formatSales(totalSales),
        today: todaySales > 0 ? formatSales(todaySales) : undefined,
        icon: "cash-outline",
      },
      {
        title: "Total Items",
        value: totalItems.toLocaleString(),
        today: todayItems > 0 ? todayItems.toLocaleString() : undefined,
        icon: "storefront-outline",
      },
    ];
  }, [exhibitorDashboard]);

  // Extract areas data from API response
  const areas = useMemo(() => {
    if (
      !exhibitorDashboard?.areas ||
      !Array.isArray(exhibitorDashboard.areas)
    ) {
      return [];
    }

    return exhibitorDashboard.areas.map((area) => {
      const checkedIn =
        area.checkedIn || area.checkedInCount || area.count || "0";
      return {
        name: area.name || area.areaName || "Unknown Area",
        checkedIn:
          typeof checkedIn === "number" ? checkedIn.toString() : checkedIn,
      };
    });
  }, [exhibitorDashboard]);

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
          contentContainerStyle={styles.tableContentContainer}
        >
          <View style={styles.tableContent}>
            <View style={styles.tableHeader}>
              <View style={[styles.headerColumn, styles.vendorNameColumn]}>
                <Text style={styles.headerText}>Vendor</Text>
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

            {vendors.length > 0 ? (
              vendors.map((vendor, index) => {
                const statusColors = getStatusColor(vendor.status);
                const vendorInitial = vendor.name
                  ? vendor.name.charAt(0).toUpperCase() +
                    (vendor.name.charAt(1)?.toUpperCase() || "")
                  : "NA";

                return (
                  <View key={index} style={styles.tableRow}>
                    <View style={[styles.dataColumn, styles.vendorNameColumn]}>
                      {vendor.logo ? (
                        <Image
                          source={{ uri: vendor.logo }}
                          style={styles.headerImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.vendorAvatar}>
                          <Text style={styles.vendorAvatarText}>
                            {vendorInitial}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.dataText} numberOfLines={1}>
                        {vendor.name}
                      </Text>
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
              })
            ) : (
              <View style={styles.tableRow}>
                <Text style={styles.dataText}>No data available</Text>
              </View>
            )}
          </View>
        </ScrollView>
        {areas.length > 0 && (
          <View style={styles.areasOverviewContainer}>
            <AreasOverview areas={areas} />
          </View>
        )}
      </View>
    </View>
  );
};

export default AdminDashboard;
