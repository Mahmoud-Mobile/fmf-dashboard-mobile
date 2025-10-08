import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../Global/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const FloatingChatIcon = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    x: screenWidth - 80,
    y: screenHeight / 2,
  });

  const translateX = useRef(new Animated.Value(screenWidth - 80)).current;
  const translateY = useRef(new Animated.Value(screenHeight / 2)).current;

  const handlePress = () => {
    navigation.navigate("Chat");
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Store the current position
        translateX.setOffset(translateX._value);
        translateY.setOffset(translateY._value);
        translateX.setValue(0);
        translateY.setValue(0);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: translateX, dy: translateY }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        translateX.flattenOffset();
        translateY.flattenOffset();

        // Calculate new position
        const newX = position.x + gestureState.dx;
        const newY = position.y + gestureState.dy;

        // Keep within screen bounds
        let finalX = Math.max(10, Math.min(screenWidth - 60, newX));
        let finalY = Math.max(50, Math.min(screenHeight - 150, newY));

        // Snap to left or right edge
        const centerX = screenWidth / 2;
        if (finalX < centerX) {
          finalX = 10; // Left edge
        } else {
          finalX = screenWidth - 60; // Right edge
        }

        // Animate to final position
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: finalX,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(translateY, {
            toValue: finalY,
            useNativeDriver: false,
            tension: 100,
            friction: 8,
          }),
        ]).start();

        // Update state
        setPosition({ x: finalX, y: finalY });
      },
    })
  ).current;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.floatingIcon,
          {
            transform: [{ translateX: translateX }, { translateY: translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
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
            <MaterialIcons
              name="support-agent"
              size={28}
              color={Colors.White}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  floatingIcon: {
    position: "absolute",
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
