import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const HEADER_HEIGHT = 100;

/**
 * Calculates the scale factor to fit canvas on screen while allowing scrolling
 * @param {number} canvasWidth - Original canvas width
 * @param {number} canvasHeight - Original canvas height
 * @returns {number} Scale factor (minimum 0.3 to keep it readable)
 */
export const calculateScale = (canvasWidth, canvasHeight) => {
  const maxWidth = SCREEN_WIDTH;
  const maxHeight = SCREEN_HEIGHT - HEADER_HEIGHT;

  const scaleX = maxWidth / canvasWidth;
  const scaleY = maxHeight / canvasHeight;

  // Use the smaller scale to fit, but don't make it too small (minimum 0.3)
  return Math.max(Math.min(scaleX, scaleY), 0.3);
};
