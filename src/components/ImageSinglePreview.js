import React, { useEffect } from "react";
import {
  Modal,
  View,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Fonts } from "../Global/fonts";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageSinglePreview({ visible, source, onClose }) {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    }
  }, [scale, translateX, translateY, visible]);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      "worklet";
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      "worklet";
      const nextScale = savedScale.value * event.scale;
      scale.value = Math.min(Math.max(nextScale, MIN_SCALE), MAX_SCALE);
    })
    .onEnd(() => {
      "worklet";
      if (scale.value < MIN_SCALE) {
        scale.value = withTiming(MIN_SCALE);
      }
      if (scale.value === MIN_SCALE) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      "worklet";
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      "worklet";
      if (scale.value <= MIN_SCALE) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        return;
      }
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      "worklet";
      if (scale.value <= MIN_SCALE) {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, isFinished) => {
      "worklet";
      if (!isFinished) {
        return;
      }
      if (scale.value > MIN_SCALE) {
        scale.value = withTiming(MIN_SCALE);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
      } else {
        scale.value = withTiming(2);
      }
    });

  const composedGesture = Gesture.Simultaneous(
    doubleTapGesture,
    panGesture,
    pinchGesture
  );

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="light-content" />
        {source ? (
          <GestureDetector gesture={composedGesture}>
            <Animated.View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AnimatedImage
                source={source}
                style={[{ width: "100%", height: "100%" }, animatedImageStyle]}
                resizeMode="contain"
              />
            </Animated.View>
          </GestureDetector>
        ) : null}
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.9}
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? 80 : 30,
            right: 24,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.FONT_MEDIUM,
              color: "#FFF",
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
