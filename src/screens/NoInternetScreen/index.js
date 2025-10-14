import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import ValidationModal from "../../components/ValidationModal";
import CustomPressable from "../../components/CustomPressable";
import { MaterialIcons } from "@expo/vector-icons";

const NoInternetScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleCheckConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else {
        setIsModalVisible(true);
        setValidationMessage(
          "Internet connection failed. Please check your internet connection."
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <ValidationModal
        visible={isModalVisible}
        message={validationMessage}
        onClose={() => setIsModalVisible(false)}
      />
      <MaterialIcons name="wifi-off" size={200} color={Colors.Primary} />
      <CustomPressable
        onPress={handleCheckConnection}
        title="Check Internet Connection"
        style={{
          marginBottom: 30,
          paddingHorizontal: 40,
          width: "60%",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.White,
  },
});
export default NoInternetScreen;
