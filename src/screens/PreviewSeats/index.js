import React from "react";
import { View, Image } from "react-native";

import CustomHeader from "../../components/CustomHeader";
import navigationService from "../../Global/navRef";
import { styles } from "./Styles";

const SeatingPlanPreview = ({ route }) => {
  // console.log(route.params);

  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader leftLabel="Preview" onLeftButtonPress={handleBack} />
      <Image
        source={require("../../Assets/seats2.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SeatingPlanPreview;
