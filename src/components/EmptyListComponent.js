import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import { ImagesWithProps } from "../config/images";

const EmptyListComponent = ({ icon, title, description }) => {
  return (
    <View style={styles.emptyContainer}>
      <ImagesWithProps source={icon} color={Colors.Gray} size={64} />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDescription}>{description}</Text>
    </View>
  );
};

const styles = {
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
    marginTop: "40%",
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: Fonts.FONT_Semi,
    color: Colors.Gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.LightGray,
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
};

export default EmptyListComponent;
