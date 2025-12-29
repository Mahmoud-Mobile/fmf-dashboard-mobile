import React from "react";
import {
  View,
  Image,
  Text,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";
import * as Device from "expo-device";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./Styles";
import QRCodeStyled from "react-native-qrcode-styled";
import { Colors } from "../../Global/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const isIPad = () => {
  if (Platform.OS === "ios") {
    if (Device.deviceType === Device.DeviceType.TABLET) {
      return true;
    }
    return SCREEN_WIDTH >= 768;
  }
  if (Platform.OS === "android") {
    return Device.deviceType === Device.DeviceType.TABLET;
  }
  return false;
};

const hexToRgba = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const generateGradientColors = (baseColor) => {
  return [
    hexToRgba(baseColor, 1.0),
    hexToRgba(baseColor, 0.7),
    hexToRgba(baseColor, 0.2),
  ];
};

const DigitalIdCard = ({
  id,
  name,
  image,
  color,
  backgroundImage,
  participantType,
  containerStyle,
  position,
  nationality,
}) => {
  const gradientColors = color
    ? generateGradientColors(color)
    : ["#569549", "#419a6d", "#229593"];

  const defaultContainerStyle = isIPad()
    ? [styles.containerView, { width: "45%", height: 650 }]
    : [styles.containerView];

  const finalContainerStyle = containerStyle
    ? [defaultContainerStyle, containerStyle]
    : defaultContainerStyle;

  return (
    <View style={finalContainerStyle}>
      <ImageBackground
        source={backgroundImage || require("../../Assets/FMF26-Background.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../Assets/FMS-Logo.png")}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
        </View>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.blurContainer}
        >
          <View style={styles.year2026Container}>
            <Image
              source={require("../../Assets/2026.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText} numberOfLines={2}>
              Dawn of a Global cause
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.borderContainer}>
          <QRCodeStyled
            data={id ?? "N/A"}
            style={styles.qrCode}
            color={Colors.PrimaryText}
            size={Platform.OS === "ios" ? 70 : 60}
          />
        </View>
        <View style={styles.borderContainer2}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.userAvatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.userAvatarImage} />
          )}
          <View style={styles.userInfoContainer}>
            {name ? (
              <Text style={styles.userNameText}>{name}</Text>
            ) : (
              <Text style={styles.positionText}>-</Text>
            )}
            {position ? (
              <Text style={styles.positionText}>{position}</Text>
            ) : (
              <Text style={styles.positionText}>-</Text>
            )}
            {nationality ? (
              <Text style={[styles.countryText]}>{nationality}</Text>
            ) : (
              <Text style={styles.positionText}>-</Text>
            )}
          </View>
        </View>
        {participantType ? (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {participantType.toUpperCase()}
            </Text>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>-</Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default DigitalIdCard;
