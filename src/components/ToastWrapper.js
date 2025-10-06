import React, { createContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";

export const ToastContext = createContext();

const ToastWrapper = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);

    setTimeout(() => {
      hideToast();
    }, 3000);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <View style={styles.toastContainer}>
        {toastVisible && (
          <Animatable.View
            animation="fadeInDown"
            animationOut="fadeOutLeft"
            duration={300}
            durationOut={300}
            style={styles.toastContent}
          >
            <Text style={styles.toastMessage}>{toastMessage}</Text>
            <TouchableOpacity onPress={hideToast} style={styles.closeIcon}>
              <Ionicons
                name="close-circle-outline"
                size={24}
                color={Colors.Primary}
              />
            </TouchableOpacity>
          </Animatable.View>
        )}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    marginHorizontal: 30,
  },
  toastContent: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  toastMessage: {
    color: Colors.WhiteColor,
    fontSize: 14,
    flex: 1,
    fontFamily: Fonts.FONT_MEDIUM,
  },
  closeIcon: {
    marginLeft: 10,
  },
});

export default ToastWrapper;
