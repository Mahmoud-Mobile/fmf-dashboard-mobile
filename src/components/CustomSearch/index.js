import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import styles from "./Styles";
import { ImagesWithProps } from "../../config/images";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomSearch = ({
  value,
  onChangeText,
  OnPressFilter,
  extraStyle,
  iconFilter,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = React.createRef();
  const translateX = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    translateX.value = withSpring(10);
  };

  const handleBlur = () => {
    setIsFocused(false);
    translateX.value = withTiming(0);
  };

  const handleClear = () => {
    setValue("");
    onChangeText("");
    inputRef.current.clear();
    Keyboard.dismiss();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        isFocused ? { scale: withSpring(1.2) } : { scale: withSpring(1) },
      ],
    };
  });

  return (
    <View style={[styles.container, extraStyle]}>
      <View
        style={[
          styles.inputView,
          { borderColor: isFocused ? "#007BFF" : "transparent" },
        ]}
      >
        {value !== "" && (
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="close-sharp" size={18} color="#888" />
          </TouchableOpacity>
        )}
        <TextInput
          ref={inputRef}
          value={value}
          style={[styles.input, { textAlign: "right" }]}
          placeholder="Search by name, email, flight number ...."
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#909C9A"
          onChangeText={onChangeText}
        />
        <Animated.View style={[{ marginLeft: 8 }, animatedStyle]}>
          <Ionicons name="search" size={18} color="#888" />
        </Animated.View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={OnPressFilter}
        style={styles.filterBtn}
      >
        <ImagesWithProps source={iconFilter} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearch;
