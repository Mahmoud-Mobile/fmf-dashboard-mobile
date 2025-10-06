import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Styles";
import { ImagesWithProps } from "../../config/images";

const CustomHeader = ({
  title,
  rightIcon,
  onLeftButtonPress,
  onRightButtonPress,
  top,
  center,
}) => {
  return (
    <View>
      {center ? (
        <View
          style={[
            styles.centerView,
            { paddingTop: top, borderColor: "#F4F4F4" },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { paddingTop: top, borderColor: "#F4F4F4" },
          ]}
        >
          <TouchableOpacity
            style={styles.leftButton}
            onPress={onLeftButtonPress}
          >
            <ImagesWithProps source="Arrow_Icon" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={onRightButtonPress}>
            <ImagesWithProps source={rightIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
