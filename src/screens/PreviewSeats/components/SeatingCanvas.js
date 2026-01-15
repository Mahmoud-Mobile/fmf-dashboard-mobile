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
  onSeatPress,
  isManualRegisterMode = false,
}) => {
  const scaledWidth = canvasWidth * scale;
  const scaledHeight = canvasHeight * scale;

  // Ensure content is at least as large as the scaled canvas
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
  console.log(`Canvas size: ${canvasWidth}x${canvasHeight}, Scaled: ${scaledWidth}x${scaledHeight}, Content: ${contentWidth}x${contentHeight}`);

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
        contentContainerStyle={{
          width: Math.max(scaledWidth, SCREEN_WIDTH),
          minHeight: contentHeight,
        }}
        bounces={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={styles.scrollView}
          contentContainerStyle={{
            width: scaledWidth,
            height: Math.max(scaledHeight, contentHeight),
            minHeight: contentHeight,
          }}
          bounces={false}
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
                onSeatPress={onSeatPress}
                isManualRegisterMode={isManualRegisterMode}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default SeatingCanvas;
