import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";
import { ImagesWithProps } from "../config/images";

const EmptyListComponent = ({ icon, title, description }) => {
  return (
    <View style={styles.emptyContainer}>
      <ImagesWithProps
        source={icon ?? "Calendar_Icon"}
        color={Colors.SecondaryText}
        size={25}
      />
      <Text style={styles.emptyTitle}>{title ?? "Empty List"}</Text>
      <Text style={styles.emptyDescription}>
        {description ?? "Check back later for updates"}
      </Text>
    </View>
  );
};

const styles = {
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  emptyTitle: {
    fontSize: 14,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    marginTop: 10,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 10,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.SecondaryText,
    textAlign: "center",
    marginBottom: 24,
  },
};

export default EmptyListComponent;
