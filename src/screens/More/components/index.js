import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { ImagesWithProps } from "../../../config/images";
import { useNavigation } from "@react-navigation/native";
// Removed i18n - using static English text
import { Colors } from "../../../Global/colors";

const CustomList = ({ item, Logout, totalItems, index }) => {
  const navigation = useNavigation();
  // Removed useTranslation - using static English text

  return (
    <TouchableOpacity
      onPress={() => {
        item.navigation !== null
          ? navigation.navigate(item.navigation)
          : Alert.alert("Logout", "Are you sure you want to log out?", [
              { text: "No" },
              { text: "Yes", onPress: Logout },
            ]);
      }}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderBottomWidth: index === totalItems - 1 ? 0 : 1,
        },
      ]}
    >
      <View style={styles.flexView}>
        <Text
          style={[
            styles.title,
            { color: item.navigation !== null ? Colors.Secondary : "#FF5757" },
          ]}
        >
          {item.title}
        </Text>
        <View style={styles.borderIconView}>
          <ImagesWithProps source={item.icon} color="#282828" />
        </View>
      </View>
      <AntDesign
        name="right"
        size={17}
        color={item.navigation !== null ? "#020201" : "#FF5757"}
      />
    </TouchableOpacity>
  );
};

export default CustomList;
