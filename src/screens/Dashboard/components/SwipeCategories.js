import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Colors } from "../../../Global/colors";
import { Fonts } from "../../../Global/fonts";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { showLocation } from "react-native-map-link";

const SwipeCategories = () => {
  const navigation = useNavigation();

  const categories = [
    {
      id: 1,
      title: "Flights",
      icon: "flight",
      iconFamily: "MaterialIcons",
      action: () => navigation.navigate("MyTabs", { screen: "Flights" }),
    },
    {
      id: 2,
      title: "Trips",
      icon: "directions-car",
      iconFamily: "MaterialIcons",
      action: () => navigation.navigate("MyTabs", { screen: "Trips" }),
    },
    {
      id: 3,
      title: "Designated Cars",
      icon: "car-multiple",
      iconFamily: "MaterialCommunityIcons",
      action: () => navigation.navigate("DesignatedCars"),
    },
    {
      id: 4,
      title: "Hotels",
      icon: "business",
      iconFamily: "MaterialIcons",
      action: () => navigation.navigate("Hotels"),
    },
    {
      id: 5,
      title: "Map",
      icon: "map",
      iconFamily: "MaterialIcons",
      action: () => showLocationOptions(),
    },
  ];

  const openEventLocation = () => {
    showLocation({
      latitude: "22.3845293",
      longitude: "48.2116733",
      alwaysIncludeGoogle: true,
      appsWhiteList: ["google-maps", "apple-maps"],
      directionsMode: "car",
    });
  };

  const openAirportLocation = () => {
    showLocation({
      latitude: "22.3845293",
      longitude: "48.2116733",
      alwaysIncludeGoogle: true,
      appsWhiteList: ["google-maps", "apple-maps"],
      directionsMode: "car",
    });
  };

  const showLocationOptions = () => {
    Alert.alert(
      "Choose Destination",
      "Where would you like to go?",
      [
        {
          text: "Event Location",
          onPress: openEventLocation,
        },
        {
          text: "Airport",
          onPress: openAirportLocation,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };
  const CategoryItem = ({ category }) => {
    const IconComponent =
      category.iconFamily === "MaterialIcons"
        ? MaterialIcons
        : MaterialCommunityIcons;

    return (
      <TouchableOpacity
        style={styles.categoryItemWrapper}
        onPress={category.action}
      >
        <View style={styles.categoryItem}>
          <View style={styles.iconContainer}>
            <IconComponent
              name={category.icon}
              size={24}
              color={Colors.Primary}
            />
          </View>
          <Text style={styles.categoryTitle}>{category.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Text style={styles.subtitle}>Access your most used features</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.Black,
    fontFamily: Fonts.FONT_BOLD,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: Fonts.FONT_REGULAR,
    opacity: 0.8,
  },
  scrollContainer: {
    paddingRight: 16,
  },
  categoryItemWrapper: {
    marginRight: 16,
  },
  categoryItem: {
    alignItems: "center",
    width: 80,
  },
  iconContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.Black,
    fontFamily: Fonts.FONT_MEDIUM,
    textAlign: "center",
  },
});

export default SwipeCategories;
