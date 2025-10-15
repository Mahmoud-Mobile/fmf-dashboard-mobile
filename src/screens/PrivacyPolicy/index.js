import React from "react";
import { View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader
        title="Privacy Policy"
        onLeftButtonPress={() => navigation.goBack()}
        top={50}
      />
    </View>
  );
};

export default PrivacyPolicy;
