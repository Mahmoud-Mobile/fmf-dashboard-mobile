import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";

const { width: screenWidth } = Dimensions.get("window");

const SwipeButton = ({
  onSwipeComplete,
  text = "Swipe to Action",
  swipeText = "Swipe",
  iconName = "arrow-forward",
  backgroundColor = "#F8F9FA",
  height = 60,
  borderRadius = 30,
  disabled = false,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);
  const buttonWidth = screenWidth * 0.8; // 80% of screen width
  const swipeThreshold = buttonWidth * 0.7; // 70% of button width to complete

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !isCompleted,
      onMoveShouldSetPanResponder: () => !disabled && !isCompleted,
      onPanResponderGrant: () => {
        translateX.setOffset(translateX._value);
        translateX.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        translateX.flattenOffset();

        if (gestureState.dx >= swipeThreshold && !isCompleted) {
          // Complete the swipe
          Animated.timing(translateX, {
            toValue: buttonWidth - 50, // Move to end minus thumb width
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setIsCompleted(true);
            onSwipeComplete && onSwipeComplete();
          });
        } else {
          // Reset to start
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const resetSwipe = () => {
    setIsCompleted(false);
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  return (
    <View style={[styles.container, { width: buttonWidth }]}>
      <View
        style={[
          styles.buttonBackground,
          {
            backgroundColor,
            height,
            borderRadius,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: Colors.gray }]}>
          {isCompleted ? "Completed!" : text}
        </Text>
      </View>

      <Animated.View
        style={[
          styles.swipeThumb,
          {
            height: height - 4,
            borderRadius: borderRadius - 2,
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={Colors.PrimaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientThumb,
            {
              height: height - 4,
              borderRadius: borderRadius - 2,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <MaterialIcons name={iconName} size={24} color={Colors.White} />
          </View>
        </LinearGradient>
      </Animated.View>

      {isCompleted && (
        <View style={styles.resetButton}>
          <TouchableOpacity onPress={resetSwipe}>
            <Text style={[styles.resetText, { color: Colors.Primary }]}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
    marginVertical: 20,
  },
  buttonBackground: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.FONT_MEDIUM,
    textAlign: "center",
  },
  swipeThumb: {
    position: "absolute",
    left: 2,
    top: 2,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientThumb: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  resetButton: {
    position: "absolute",
    top: -30,
    right: 0,
  },
  resetText: {
    fontSize: 14,
    fontFamily: Fonts.FONT_MEDIUM,
    textDecorationLine: "underline",
  },
});

export default SwipeButton;
