import React from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const GradientHeader = ({ title, subtitle, onBackPress }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.Primary} />
      <LinearGradient
        colors={Colors.PrimaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={18} color={Colors.White} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{title}</Text>
              {subtitle && (
                <Text style={styles.headerSubtitle}>{subtitle}</Text>
              )}
            </View>
            <View style={styles.headerRight} />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default GradientHeader;

