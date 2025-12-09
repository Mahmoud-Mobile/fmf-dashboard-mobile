import React from "react";
import { View, Image } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { styles } from "./Styles";
import { useNavigation } from "@react-navigation/native";

const ShowSeats = ({ route }) => {
  const navigation = useNavigation();
  const participantId = route?.params?.participantId;
  console.log("participantId", participantId);
  const handleBack = () => {
    navigation.goBack();
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
