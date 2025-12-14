import React from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { styles } from "../Styles";
import SeatingElement from "./SeatingElement";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = 100;

const SeatingCanvas = ({
  layoutElements,
  seatsMap,
  canvasWidth,
  canvasHeight,
  scale,
}) => {
  const scaledWidth = canvasWidth * scale;
  const scaledHeight = canvasHeight * scale;

  const contentWidth = Math.max(scaledWidth, SCREEN_WIDTH);
  const contentHeight = Math.max(scaledHeight, SCREEN_HEIGHT - HEADER_HEIGHT);

  // Filter valid elements for rendering
  const validElements = layoutElements.filter((element) => {
    const hasValidX = typeof element.x === "number" && !isNaN(element.x);
    const hasValidY = typeof element.y === "number" && !isNaN(element.y);
    return hasValidX && hasValidY;
  });

  console.log(
    `Rendering ${validElements.length} of ${layoutElements.length} elements with valid positions`
  );

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.verticalScrollContent,
            {
              width: contentWidth,
              height: contentHeight,
            },
          ]}
        >
          <View
            style={[
              styles.canvas,
              {
                width: scaledWidth,
                height: scaledHeight,
              },
            ]}
          >
            {validElements.map((element) => (
              <SeatingElement
                key={element.id}
                element={element}
                seat={seatsMap[element.id]}
                scale={scale}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default SeatingCanvas;
