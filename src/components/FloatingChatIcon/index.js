import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../Global/colors";

const FloatingChatIcon = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={Colors.PrimaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <MaterialIcons name="support-agent" size={28} color={Colors.White} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradientButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingChatIcon;
