import { Dimensions } from "react-native";

export const getDeviceDimensions = () => {
  const { width, height } = Dimensions.get("window");
  return { width, height };
};

export const isTablet = (width = null) => {
  const { width: screenWidth } = getDeviceDimensions();
  const deviceWidth = width || screenWidth;
  return deviceWidth >= 768;
};

export const isMobile = (width = null) => {
  return !isTablet(width);
};

export const getGridColumns = (width = null) => {
  return isTablet(width) ? 3 : 1;
};

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
