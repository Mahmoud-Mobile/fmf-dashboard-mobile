import { useMemo } from "react";
import { getDeviceDimensions } from "../../../constant/deviceUtils";
import { horizontalMargin } from "../../../config/metrics";
import styles from "../Styles";

export const useCardSettings = (viewMode) => {
  const { width: screenWidth } = getDeviceDimensions();
  const horizontalPadding = horizontalMargin * 2;

  const numColumns = useMemo(() => {
    if (viewMode === "list") {
      return 1;
    }
    return 2;
  }, [viewMode]);

  const { cardWidth } = useMemo(() => {
    const gapBetweenCards = (numColumns - 1) * 8;
    const width =
      (screenWidth - horizontalPadding - gapBetweenCards) / numColumns;
    return { cardWidth: width };
  }, [numColumns, screenWidth, horizontalPadding]);

  const cardSettings = useMemo(() => {
    const isGrid = viewMode === "grid" && numColumns > 1;
    return {
      isGrid,
      numColumns: numColumns,
      columnWrapper: isGrid ? styles.columnWrapper : undefined,
    };
  }, [numColumns, viewMode]);

  return {
    cardWidth,
    cardSettings,
  };
};
