import React, { useCallback, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import CustomEventHeader from "../../components/CustomEventHeader";
import LoadingModal from "../../components/LoadingModal";
import EmptyListComponent from "../../components/EmptyListComponent";
import AreaItem from "./components/AreaItem";
import { styles } from "./Styles";
import { Colors } from "../../Global/colors";
import { fetchResources } from "../../redux/actions/api";

const SelectYourArea = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { selectedEvent, resources, loading } = useSelector(
    (state) => state.api
  );

  const fetchAreas = useCallback(() => {
    if (selectedEvent?.id) {
      dispatch(
        fetchResources(selectedEvent.id, {
          type: "AREA",
          page: 1,
          limit: 100,
        })
      );
    }
  }, [selectedEvent?.id, dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchAreas();
    }, [fetchAreas])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (selectedEvent?.id) {
        await dispatch(
          fetchResources(selectedEvent.id, {
            type: "AREA",
            page: 1,
            limit: 100,
          })
        );
      }
    } catch (error) {
      console.error("Error refreshing areas:", error);
    } finally {
      setRefreshing(false);
    }
  }, [selectedEvent?.id, dispatch]);

  const areas = resources?.resources || [];

  const handleAreaPress = (area) => {
    navigation.navigate("CheckIn_Area", {
      area: area,
    });
  };

  const renderListHeader = () => (
    <View style={styles.cardHeader}>
      <Text style={styles.title}>Select Your Area</Text>
      <Text style={styles.subtitle}>
        Choose the location you're managing today
      </Text>
      <View style={styles.separator} />
    </View>
  );

  const renderAreaItemWrapper = useCallback(
    ({ item, index }) => {
      const isLastItem = index === areas.length - 1;
      return (
        <AreaItem
          area={item}
          onPress={handleAreaPress}
          isLastItem={isLastItem}
        />
      );
    },
    [areas.length, handleAreaPress]
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const renderEmptyComponent = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Select Your Area</Text>
      <Text style={styles.subtitle}>
        Choose the location you're managing today
      </Text>
      <View style={styles.separator} />
      <EmptyListComponent
        title="No Areas Available"
        description="There are no areas to display at the moment."
      />
    </View>
  );

  const renderListFooter = () => <View style={styles.cardFooter} />;

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <CustomEventHeader
        event={selectedEvent}
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.navigate("NotificationScreen")}
      />

      <FlatList
        data={areas}
        renderItem={renderAreaItemWrapper}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderListFooter}
        ItemSeparatorComponent={null}
        contentContainerStyle={[styles.listContainer, styles.cardBody]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.Primary]}
            tintColor={Colors.Primary}
          />
        }
      />
    </View>
  );
};

export default SelectYourArea;
