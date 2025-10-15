import React from "react";
import { View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader
        title="Profile"
        onLeftButtonPress={() => navigation.goBack()}
        top={50}
      />
    </View>
  );
};

export default Profile;
