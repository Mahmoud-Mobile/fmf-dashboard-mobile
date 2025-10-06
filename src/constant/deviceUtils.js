import { Dimensions } from "react-native";

/**
 * Get device dimensions
 */
export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

/**
 * Check if device is tablet based on screen width
 * @param {number} width - Screen width
 * @returns {boolean} - True if device is tablet
 */
export const isTablet = (width = null) => {
  const { width: screenWidth } = getDeviceDimensions();
  const deviceWidth = width || screenWidth;
  return deviceWidth >= 768; // iPad and larger tablets
};

/**
 * Check if device is mobile based on screen width
 * @param {number} width - Screen width
 * @returns {boolean} - True if device is mobile
 */
export const isMobile = (width = null) => {
  return !isTablet(width);
};

/**
 * Get number of columns for grid layout based on device type
 * @param {number} width - Screen width (optional)
 * @returns {number} - Number of columns (1 for mobile, 2 for tablet)
 */
export const getGridColumns = (width = null) => {
  return isTablet(width) ? 2 : 1;
};

/**
 * Get responsive layout properties
 * @param {number} width - Screen width (optional)
 * @returns {object} - Object containing layout properties
 */
export const getResponsiveLayout = (width = null) => {
  const { width: screenWidth } = getDeviceDimensions();
  const deviceWidth = width || screenWidth;

  return {
    isTablet: isTablet(deviceWidth),
    isMobile: isMobile(deviceWidth),
    columns: getGridColumns(deviceWidth),
    width: deviceWidth,
  };
};
