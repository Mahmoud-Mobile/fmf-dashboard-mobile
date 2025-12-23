import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import { MaterialIcons } from "@expo/vector-icons";

const NoInternetScreen = () => {
  const navigation = useNavigation();

  const handleCheckConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      } else {
        Alert.alert(
          "Connection Failed",
          "Internet connection failed. Please check your internet connection."
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={200} color={Colors.Primary} />
      <TouchableOpacity
        onPress={handleCheckConnection}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Check Internet Connection</Text>
      </TouchableOpacity>
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
  button: {
    marginBottom: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.White,
    fontSize: 16,
    fontWeight: "400",
  },
});
export default NoInternetScreen;
