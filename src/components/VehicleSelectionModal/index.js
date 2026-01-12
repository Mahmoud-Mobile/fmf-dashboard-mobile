import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { MaterialIcons } from "@expo/vector-icons";

const VehicleSelectionModal = ({
  visible,
  onClose,
  onVehicleSelect,
  selectedVehicleId,
  vehicles = [],
  loading = false,
}) => {
  const flatListRef = useRef(null);

  // Debug: Log vehicles when modal becomes visible
  useEffect(() => {
    if (visible) {
      console.log("VehicleSelectionModal - visible:", visible);
      console.log("VehicleSelectionModal - vehicles:", vehicles);
      console.log("VehicleSelectionModal - vehicles length:", vehicles.length);
      console.log("VehicleSelectionModal - loading:", loading);
    }
  }, [visible, vehicles, loading]);

  // Scroll to selected vehicle when modal opens
  useEffect(() => {
    if (visible && selectedVehicleId && vehicles.length > 0) {
      const selectedIndex = vehicles.findIndex(
        (v) => v.id === selectedVehicleId
      );
      if (selectedIndex >= 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: selectedIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }, 300);
      }
    }
  }, [visible, selectedVehicleId, vehicles]);

  const handleVehicleSelect = (vehicle) => {
    onVehicleSelect(vehicle);
    onClose();
  };

  const renderVehicleItem = ({ item, index }) => {
    if (!item) {
      console.warn("VehicleSelectionModal: renderVehicleItem received null item");
      return null;
    }
    
    const isSelected = item.id === selectedVehicleId;
    return (
      <TouchableOpacity
        style={[
          styles.vehicleItem,
          isSelected && styles.vehicleItemSelected,
        ]}
        onPress={() => handleVehicleSelect(item)}
        activeOpacity={0.7}
      >
        <View style={styles.vehicleContent}>
          <View style={styles.vehicleTopRow}>
            <View style={styles.vehicleLeft}>
              <View style={styles.vehicleNumberRow}>
                <MaterialIcons 
                  name="directions-car" 
                  size={14} 
                  color={isSelected ? Colors.Primary : Colors.Gray} 
                />
                <Text style={styles.vehicleNumber}>
                  {item.vehicleNumber || "N/A"}
                </Text>
              </View>
              <Text style={styles.vehicleModel} numberOfLines={1}>
                {item.model || "No model"}
              </Text>
            </View>
            <View style={styles.vehicleRight}>
              <View
                style={[
                  styles.statusBadge,
                  item.status === "AVAILABLE" && styles.statusAvailable,
                  item.status === "IN_USE" && styles.statusInUse,
                  item.status === "MAINTENANCE" && styles.statusMaintenance,
                  item.status === "UNAVAILABLE" && styles.statusUnavailable,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status || "UNKNOWN"}
                </Text>
              </View>
              {isSelected && (
                <MaterialIcons name="check-circle" size={16} color={Colors.Primary} />
              )}
            </View>
          </View>
          
          <View style={styles.vehicleInfoRow}>
            <Text style={styles.vehicleInfoText}>
              {item.vehicleType || "N/A"}
            </Text>
            <Text style={styles.vehicleInfoDot}>•</Text>
            <Text style={styles.vehicleInfoText}>
              {item.year || "N/A"}
            </Text>
            {item.capacity > 0 && (
              <>
                <Text style={styles.vehicleInfoDot}>•</Text>
                <Text style={styles.vehicleInfoText}>
                  {item.capacity} seats
                </Text>
              </>
            )}
          </View>

          {(item.hasAC || item.hasWifi || item.isAccessible) && (
            <View style={styles.amenitiesRow}>
              {item.hasAC && (
                <View style={styles.amenityIcon}>
                  <MaterialIcons name="ac-unit" size={10} color={Colors.Primary} />
                </View>
              )}
              {item.hasWifi && (
                <View style={styles.amenityIcon}>
                  <MaterialIcons name="wifi" size={10} color={Colors.Primary} />
                </View>
              )}
              {item.isAccessible && (
                <View style={styles.amenityIcon}>
                  <MaterialIcons name="accessible" size={10} color={Colors.Primary} />
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="directions-car" size={32} color={Colors.Gray} />
      <Text style={styles.emptyText}>No vehicles available</Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalContent}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
              <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                  <MaterialIcons
                    name="directions-car"
                    size={16}
                    color={Colors.Primary}
                    style={styles.headerIcon}
                  />
                  <Text style={styles.headerTitle}>Select Vehicle</Text>
                  <Text style={{ fontSize: 10, color: Colors.Gray, marginLeft: 6 }}>
                    ({vehicles.length})
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={16} color={Colors.Gray} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.Primary} />
                <Text style={styles.loadingText}>Loading vehicles...</Text>
              </View>
            ) : vehicles.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={vehicles}
                renderItem={renderVehicleItem}
                keyExtractor={(item, index) => item?.id || `vehicle-${index}`}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={true}
                style={styles.flatList}
                removeClippedSubviews={false}
                onScrollToIndexFailed={(info) => {
                  // Fallback if scroll to index fails
                  const wait = new Promise((resolve) => setTimeout(resolve, 500));
                  wait.then(() => {
                    flatListRef.current?.scrollToOffset({
                      offset: info.averageItemLength * info.index,
                      animated: true,
                    });
                  });
                }}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="directions-car" size={32} color={Colors.Gray} />
                <Text style={styles.emptyText}>
                  {loading ? "Loading..." : "No vehicles available"}
                </Text>
                {!loading && (
                  <Text style={[styles.emptyText, { fontSize: 10, marginTop: 4 }]}>
                    Vehicles count: {vehicles.length}
                  </Text>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    height: "85%",
    maxHeight: "85%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalContent: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  safeArea: {
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerIcon: {
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Primary,
  },
  closeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    minHeight: 200,
    backgroundColor: Colors.White,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  flatList: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 12,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  vehicleItem: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.03,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  vehicleItemSelected: {
    borderColor: Colors.Primary,
    borderWidth: 1.5,
    backgroundColor: "#F0F7FF",
  },
  vehicleContent: {
    flex: 1,
  },
  vehicleTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  vehicleLeft: {
    flex: 1,
    marginRight: 8,
  },
  vehicleRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  vehicleNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 4,
  },
  vehicleNumber: {
    fontSize: 12,
    fontFamily: Fonts.FONT_BOLD,
    color: Colors.PrimaryText,
  },
  vehicleModel: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  statusBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  statusAvailable: {
    backgroundColor: "#D1FAE5",
  },
  statusInUse: {
    backgroundColor: "#FEE2E2",
  },
  statusMaintenance: {
    backgroundColor: "#FEF3C7",
  },
  statusUnavailable: {
    backgroundColor: "#E5E7EB",
  },
  statusText: {
    fontSize: 8,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.DarkGray,
    textTransform: "uppercase",
  },
  vehicleInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  vehicleInfoText: {
    fontSize: 9,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
  },
  vehicleInfoDot: {
    fontSize: 9,
    color: Colors.SecondaryText,
    marginHorizontal: 4,
  },
  amenitiesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  amenityIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: Colors.White,
    minHeight: 200,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 11,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.Gray,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    minHeight: 200,
  },
});

export default VehicleSelectionModal;
