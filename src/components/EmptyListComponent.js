import React from "react";
import { Text } from "react-native";
import { Colors } from "../Global/colors";
import { Fonts } from "../Global/fonts";

const EmptyListComponent = ({ title }) => {
  return (
    <Text
      style={{
        color: Colors.Tertiary,
        fontSize: 16,
        fontFamily: Fonts.FONT_MEDIUM,
        alignSelf: "center",
        marginTop: 250,
      }}
    >
      {title ?? "Empty"}
    </Text>
  );
};

export default EmptyListComponent;
