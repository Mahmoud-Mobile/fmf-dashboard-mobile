import React, { useState, useMemo, useCallback } from "react";
import { View, FlatList, Pressable, Text, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as SecureStore from "expo-secure-store";
import { shareAsync } from "expo-sharing";

import { getEnvVars } from "../../constant";
import CustomEventHeader from "../../components/CustomEventHeader";
import LoadingModal from "../../components/LoadingModal";
import SearchActionRow from "../../components/SearchActionRow";
import CustomItem from "./components";
import { styles } from "./Styles";
import { fetchExhibitorById } from "../../redux/actions/api";
import { Colors } from "../../Global/colors";

import {
  importPurchases,
  downloadPurchasesTemplate,
} from "../../webservice/apiConfig";

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
  const transformedPurchases = purchases.map(transformPurchase).filter(Boolean);

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
  const [isImporting, setIsImporting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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

    if (!searchText.trim()) return [transformedVendor];

    const vendorMatches = doesVendorMatchSearch(transformedVendor, searchText);
    if (vendorMatches) return [transformedVendor];

    const filteredItems = filterItemsBySearch(
      transformedVendor.items,
      searchText
    );

    if (filteredItems.length === 0) return [];

    return [{ ...transformedVendor, items: filteredItems }];
  }, [transformedVendor, searchText]);

  const handleSearchClear = useCallback(() => setSearchText(""), []);

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

  // ✅ IMPORT (FIXED)
  const handleImportFile = useCallback(async () => {
    const eventId = selectedEvent?.id;
    const exhibitorId = exhibitor?.exhibitor?.id || exhibitorFromAuth?.id;

    if (!eventId || !exhibitorId) {
      Alert.alert("Error", "Event or exhibitor information not found.");
      return;
    }

    try {
      setIsImporting(true);

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "text/csv",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets?.[0];
      if (!file?.uri) throw new Error("No file selected");

      const uri = file.uri;
      const name = file.name || `import_${Date.now()}.xlsx`;
      const type =
        file.mimeType ||
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      // FormData الحقيقي
      const fd = new FormData();
      fd.append("file", { uri, name, type });

      // ارفع
      await importPurchases(eventId, exhibitorId, fd);

      // Refresh
      dispatch(fetchExhibitorById(eventId, exhibitorId));
      Alert.alert("Success", "File imported successfully!");
    } catch (error) {
      console.error("Import error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.errorMessage ||
        error?.message ||
        "Failed to import file. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsImporting(false);
    }
  }, [
    selectedEvent?.id,
    exhibitor?.exhibitor?.id,
    exhibitorFromAuth?.id,
    dispatch,
  ]);

  const handleDownloadTemplate = useCallback(async () => {
    const eventId = selectedEvent?.id;
    if (!eventId) {
      Alert.alert("Error", "Event information not found.");
      return;
    }

    try {
      setIsDownloading(true);

      const baseURL = await getEnvVars("apiUrl");
      const accessToken = await SecureStore.getItemAsync("accessToken");
      if (!accessToken) throw new Error("Authentication token not found.");

      const downloadUrl = `${baseURL}mobile/ops/events/${eventId}/exhibitors/template/purchases`;

      const fileName = `purchases_template_${Date.now()}.xlsx`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      const downloadResult = await FileSystem.downloadAsync(
        downloadUrl,
        fileUri,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (downloadResult.status === 200) {
        await shareAsync(downloadResult.uri, {
          UTI: "org.openxmlformats-officedocument.spreadsheetml.sheet",
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
      } else {
        throw new Error("Failed to download template file");
      }
    } catch (error) {
      console.error("Download template error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.errorMessage ||
        error?.message ||
        "Failed to download template. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsDownloading(false);
    }
  }, [selectedEvent?.id]);

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

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[
            styles.downloadButton,
            isDownloading && styles.buttonDisabled,
          ]}
          onPress={handleDownloadTemplate}
          disabled={isDownloading || isImporting}
        >
          <MaterialIcons
            name="file-download"
            size={16}
            color={Colors.DarkGray}
          />
          <Text style={styles.buttonText}>
            {isDownloading ? "Downloading..." : "Download Template"}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.importButton, isImporting && styles.buttonDisabled]}
          onPress={handleImportFile}
          disabled={isDownloading || isImporting}
        >
          <MaterialIcons name="file-upload" size={16} color={Colors.DarkGray} />
          <Text style={styles.buttonText}>
            {isImporting ? "Importing..." : "Import Files Excel"}
          </Text>
        </Pressable>
      </View>

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
