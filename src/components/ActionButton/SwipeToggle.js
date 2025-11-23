import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";
import { Fonts } from "../../Global/fonts";

const SwipeToggle = ({
  title = "Swipe to submit",
  onSwipeSuccess,
  disabled = false,
  containerStyle,
  disabledText = "Disabled",
  icon = "arrow-forward",
}) => {
  const containerWidth = useSharedValue(0);
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const onSlideCompleted = () => {
    if (onSwipeSuccess) {
      onSwipeSuccess();
    }
    position.value = withTiming(0, { duration: 1000 });
    onLeft.value = true;
  };

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .runOnJS(true)
    .onUpdate((e) => {
      const endPosition = Math.max(containerWidth.value - 90, 50);
      if (onLeft.value) {
        position.value = Math.min(Math.max(0, e.translationX), endPosition);
      } else {
        position.value = Math.min(
          Math.max(endPosition + e.translationX, 0),
          endPosition
        );
      }
    })
    .onEnd(() => {
      const endPosition = Math.max(containerWidth.value - 90, 50);
      if (endPosition > 0 && position.value > endPosition / 2) {
        position.value = withTiming(endPosition, { duration: 120 });
        onLeft.value = false;
        runOnJS(onSlideCompleted)(); // 👈 trigger callback + return back
      } else {
        position.value = withTiming(0, { duration: 120 });
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const handleContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      containerWidth.value = width;
    }
  };

  return (
    <View style={[styles.swipeContainer, containerStyle]}>
      {disabled && <Text style={styles.disabledText}>{disabledText}</Text>}
      <View
        onLayout={handleContainerLayout}
        style={[
          customStyles.sliderContainer,
          disabled && customStyles.disabledContainer,
        ]}
      >
        <Text
          style={[
            customStyles.sliderText,
            disabled && customStyles.disabledText,
          ]}
        >
          {title}
        </Text>
        {!disabled ? (
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[customStyles.swipeBtn, animatedStyle]}>
              <MaterialIcons name={icon} size={22} color={Colors.PrimaryText} />
            </Animated.View>
          </GestureDetector>
        ) : (
          <View style={customStyles.disabledIconContainer}>
            <MaterialIcons name="check-circle" size={20} color="#10B981" />
          </View>
        )}
      </View>
    </View>
  );
};

export default SwipeToggle;

const customStyles = StyleSheet.create({
  sliderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.Primary,
    height: 50,
    overflow: "hidden",
    borderRadius: 50,
  },
  sliderText: {
    color: Colors.PrimaryText,
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
  },
  swipeBtn: {
    width: 40,
    height: 40,
    backgroundColor: Colors.LightGray,
    position: "absolute",
    left: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  disabledContainer: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  disabledText: {
    color: "#9CA3AF",
    fontFamily: Fonts.FONT_REGULAR,
  },
  disabledIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#D1FAE5",
    position: "absolute",
    left: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#10B981",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
});
