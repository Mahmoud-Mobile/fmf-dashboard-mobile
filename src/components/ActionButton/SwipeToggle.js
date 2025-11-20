import React from "react";
import { View, Text } from "react-native";
import SwipeButton from "rn-swipe-button";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../Global/colors";
import styles from "./Styles";

const SwipeToggle = ({
  title = "Swipe to submit",
  onSwipeSuccess,
  disabled = false,
  containerStyle,
  disabledText = "Disabled",
  icon = "arrow-forward",
}) => {
  const Icon = () => <MaterialIcons name={icon} size={22} color="#374151" />;

  return (
    <View style={[styles.swipeContainer, containerStyle]}>
      {disabled && <Text style={styles.disabledText}>{disabledText}</Text>}
      <SwipeButton
        disabled={disabled}
        // swipeSuccessThreshold={70}
        // height={50}
        // width="100%"
        title={title}
        // titleColor="#374151"
        titleFontSize={14}
        // titleStyles={{ fontFamily: Fonts.FONT_REGULAR }}
        thumbIconBackgroundColor="#F3F4F6"
        thumbIconComponent={Icon}
        railBackgroundColor="#F3F4F6"
        railBorderColor="#9CA3AF"
        railFillBackgroundColor={Colors.Primary}
        railFillBorderColor="transparent"
        shouldResetAfterSuccess={true}
        onSwipeSuccess={onSwipeSuccess}
        disabledThumbIconBackgroundColor="#E5E7EB"
        disabledRailBackgroundColor="#F9FAFB"
        disabledThumbIconBorderColor="#D1D5DB"
        disabledRailBorderColor="#E5E7EB"
      />
    </View>
  );
};

export default SwipeToggle;
