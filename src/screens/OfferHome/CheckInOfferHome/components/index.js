import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./Styles";
import { Colors } from "../../../../Global/colors";
import { Ionicons } from "@expo/vector-icons";
const CustomItem = ({
  item,
  vendorData,
  onVisitPress,
  onPurchasePress,
  showVendorOnly = false,
}) => {
  const {
    name: vendorName = "Vendor Name",
    booth = "Booth A-12",
    visits = 0,
    purchases = 0,
    avatar,
  } = vendorData || {};

  const vendorInitial =
    vendorName.charAt(0).toUpperCase() + vendorName.charAt(1).toUpperCase() ||
    "";

  const renderAvatar = () => {
    if (avatar) {
      return <Image source={{ uri: avatar }} style={styles.avatarImage} />;
    }
    return (
      <View style={styles.vendorAvatar}>
        <Text style={styles.avatarText}>{vendorInitial}</Text>
      </View>
    );
  };

  if (showVendorOnly) {
    return (
      <View style={styles.vendorHeader}>
        <View style={styles.vendorLeft}>
          {renderAvatar()}
          <View style={styles.vendorInfo}>
            <Text style={styles.vendorName} numberOfLines={1}>
              {vendorName}
            </Text>
            <View style={styles.boothContainer}>
              <Ionicons
                name="location-outline"
                size={14}
                color={Colors.SecondaryText}
              />
              <Text style={styles.boothText} numberOfLines={1}>
                {booth}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.vendorCenter}>
          <View style={styles.statItem}>
            <Ionicons
              name="eye-outline"
              size={16}
              color={Colors.SecondaryText}
            />
            <Text style={styles.statText}>{visits} Visits</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons
              name="cart-outline"
              size={16}
              color={Colors.SecondaryText}
            />
            <Text style={styles.statText}>{purchases} Purchases</Text>
          </View>
        </View>

        <View style={styles.vendorRight}>
          <TouchableOpacity
            style={styles.visitButton}
            onPress={onVisitPress}
            activeOpacity={0.7}
          >
            <Text style={styles.visitButtonText}>Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={() => onPurchasePress && onPurchasePress()}
            activeOpacity={0.7}
          >
            <Text style={styles.purchaseButtonText}>Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!item) return null;

  return (
    <View style={styles.productCard}>
      <View style={styles.productContent}>
        <View style={styles.productLeft}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
        </View>

        <View style={styles.productMiddle}>
          <Text style={styles.originalPrice} numberOfLines={1}>
            Original Price: SAR{" "}
            <Text style={styles.strikethrough}>{item.originalPrice}</Text>
          </Text>
          <Text style={styles.finalPrice} numberOfLines={1}>
            Final Price: SAR {item.finalPrice}
          </Text>
        </View>

        <View style={styles.productRight}>
          <Text style={styles.recordedPurchase} numberOfLines={1}>
            Recorded Purchase {item.recordedPurchaseTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomItem;
