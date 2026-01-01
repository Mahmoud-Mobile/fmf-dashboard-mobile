import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles";
import { ImagesWithProps } from "../../config/images";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = ({
  title,
  subtitle,
  leftLabel,
  rightIcon,
  onLeftButtonPress,
  onRightButtonPress,
  textColor = "#FFFFFF",
}) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <TouchableOpacity onPress={onLeftButtonPress} style={styles.leftAction}>
        <ImagesWithProps source="Arrow_Icon" color="#fff" />
        {leftLabel ? (
          <Text style={[{ color: textColor, fontSize: 16 }, styles.titleText]}>
            {leftLabel}
          </Text>
        ) : null}
      </TouchableOpacity>

      <View style={styles.centerOverlay}>
        {title && (
          <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitleText, { color: textColor }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={onRightButtonPress}>
        <ImagesWithProps source={rightIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomHeader;
