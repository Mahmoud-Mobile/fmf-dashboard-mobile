import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Styles";

const DataTableCard = ({
  title,
  columns = [],
  data = [],
  onPress,
  onItemPress,
  navigationName,
  renderCell,
  containerStyle,
}) => {
  const columnCount = columns.length;

  const getColumnFlex = (index) => {
    if (columnCount === 3) {
      return index === 0 ? 0.3 : index === 1 ? 0.4 : 0.3;
    } else if (columnCount === 4) {
      return 0.25;
    } else if (columnCount === 5) {
      return 0.2;
    }
    return 1 / columnCount;
  };

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => (
        <View
          key={index}
          style={[styles.headerColumn, { flex: getColumnFlex(index) }]}
        >
          <Text
            style={[styles.headerText, index === 0 && styles.headerTextBold]}
          >
            {column.title}
          </Text>
        </View>
      ))}
    </View>
  );

  const getKey = (item, index) => {
    return item.id || item.key || `row-${index}`;
  };

  const renderRows = () => {
    if (!data || data.length === 0) {
      return <View />;
    }

    return data.map((item, index) => {
      const isLastRow = index === data.length - 1;

      return (
        <TouchableOpacity
          key={getKey(item, index)}
          style={[styles.dataRow, isLastRow && styles.lastRow]}
          onPress={() => {
            if (onItemPress) {
              onItemPress(item, navigationName);
            }
          }}
          activeOpacity={onItemPress ? 0.7 : 1}
          disabled={!onItemPress}
        >
          {columns.map((column, colIndex) => {
            const cellValue = item[column.key];
            return (
              <View
                key={colIndex}
                style={[styles.dataColumn, { flex: getColumnFlex(colIndex) }]}
              >
                {renderCell ? (
                  renderCell({
                    item,
                    column,
                    value: cellValue,
                    index: colIndex,
                  })
                ) : column.render ? (
                  column.render({ item, value: cellValue, index: colIndex })
                ) : (
                  <Text
                    style={[
                      styles.dataText,
                      colIndex === 0 && styles.dataTextBold,
                    ]}
                  >
                    {cellValue !== undefined && cellValue !== null
                      ? String(cellValue)
                      : ""}
                  </Text>
                )}
              </View>
            );
          })}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{}}>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={[styles.container, containerStyle]}>
        {renderHeader()}
        <View>{renderRows()}</View>
      </View>
    </View>
  );
};

export default DataTableCard;
