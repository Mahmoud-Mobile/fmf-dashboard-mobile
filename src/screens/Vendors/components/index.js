import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { styles } from "./Styles";
import { Colors } from "../../../Global/colors";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");
const isSmallScreen = screenWidth < 375;

const CustomItem = ({
  item,
  vendorData,
  onVisitPress,
  onPurchasePress,
  showVendorOnly = false,
}) => {
  const {
    name: vendorName = " ",
    booth = " ",
    visits = 0,
    purchases = 0,
    avatar,
  } = vendorData || {};

  const vendorInitial =
    vendorName.charAt(0).toUpperCase() + vendorName.charAt(1).toUpperCase() ||
    "";

  const renderAvatar = () => {
    if (avatar) {
      return (
        <Image
          source={{ uri: avatar }}
          style={styles.avatarImage}
          resizeMode="contain"
        />
      );
    }
    return (
      <View style={styles.vendorAvatar}>
        <Text style={styles.avatarText}>{vendorInitial}</Text>
      </View>
    );
  };

  if (showVendorOnly) {
    return (
      <View
        style={[styles.vendorHeader, isSmallScreen && styles.vendorHeaderSmall]}
      >
        <View
          style={[styles.vendorLeft, isSmallScreen && styles.vendorLeftSmall]}
        >
          {renderAvatar()}
          <View style={styles.vendorInfo}>
            <Text
              style={[
                styles.vendorName,
                isSmallScreen && styles.vendorNameSmall,
              ]}
            >
              {vendorName}
            </Text>
            <View style={styles.boothContainer}>
              <Ionicons
                name="location-outline"
                size={isSmallScreen ? 12 : 14}
                color={Colors.SecondaryText}
              />
              <Text
                style={[
                  styles.boothText,
                  isSmallScreen && styles.boothTextSmall,
                ]}
                numberOfLines={1}
              >
                {booth}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.vendorCenter,
            isSmallScreen && styles.vendorCenterSmall,
          ]}
        >
          <View style={styles.statItem}>
            <Ionicons
              name="eye-outline"
              size={isSmallScreen ? 14 : 16}
              color={Colors.SecondaryText}
            />
            <Text
              style={[styles.statText, isSmallScreen && styles.statTextSmall]}
            >
              {isSmallScreen ? visits : `${visits} Visits`}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons
              name="cart-outline"
              size={isSmallScreen ? 14 : 16}
              color={Colors.SecondaryText}
            />
            <Text
              style={[styles.statText, isSmallScreen && styles.statTextSmall]}
            >
              {isSmallScreen ? purchases : `${purchases} Purchases`}
            </Text>
          </View>
        </View>

        <View
          style={[styles.vendorRight, isSmallScreen && styles.vendorRightSmall]}
        >
          <TouchableOpacity
            style={[
              styles.visitButton,
              isSmallScreen && styles.visitButtonSmall,
            ]}
            onPress={() => onVisitPress && onVisitPress()}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.visitButtonText,
                isSmallScreen && styles.visitButtonTextSmall,
              ]}
            >
              Visit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.purchaseButton,
              isSmallScreen && styles.purchaseButtonSmall,
            ]}
            onPress={() => onPurchasePress && onPurchasePress()}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.purchaseButtonText,
                isSmallScreen && styles.purchaseButtonTextSmall,
              ]}
            >
              Purchase
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!item) return null;

  return (
    <View style={styles.productCard}>
      <View
        style={[
          styles.productContent,
          isSmallScreen && styles.productContentSmall,
        ]}
      >
        <View
          style={[styles.productLeft, isSmallScreen && styles.productLeftSmall]}
        >
          <Text
            style={[
              styles.productName,
              isSmallScreen && styles.productNameSmall,
            ]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.productDiscount,
              isSmallScreen && styles.productDiscountSmall,
            ]}
          >
            Discount: {item.discount}%
          </Text>
        </View>

        <View
          style={[
            styles.productMiddle,
            isSmallScreen && styles.productMiddleSmall,
          ]}
        >
          <Text
            style={[
              styles.originalPrice,
              isSmallScreen && styles.originalPriceSmall,
            ]}
            numberOfLines={1}
          >
            Original Price: SAR{" "}
            <Text style={styles.strikethrough}>{item.originalPrice}</Text>
          </Text>
          <Text
            style={[styles.finalPrice, isSmallScreen && styles.finalPriceSmall]}
            numberOfLines={1}
          >
            Final Price: SAR {item.finalPrice}
          </Text>
        </View>

        <View
          style={[
            styles.productRight,
            isSmallScreen && styles.productRightSmall,
          ]}
        >
          <Text
            style={[
              styles.recordedPurchase,
              isSmallScreen && styles.recordedPurchaseSmall,
            ]}
            numberOfLines={1}
          >
            {item.recordedPurchaseTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomItem;
