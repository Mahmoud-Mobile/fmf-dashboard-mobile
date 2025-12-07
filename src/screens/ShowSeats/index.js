import React from "react";
import { View, Image } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import navigationService from "../../Global/navRef";
import { styles } from "./Styles";

const ShowSeats = ({ route }) => {
  const participantId = route?.params;
  console.log("participantId", participantId);
  const handleBack = () => {
    navigationService.navigation?.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomHeader leftLabel="Show Seats" onLeftButtonPress={handleBack} />
      <View style={styles.imageContainer}>
        <Image
          source={require("../../Assets/seats.png")}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default ShowSeats;
