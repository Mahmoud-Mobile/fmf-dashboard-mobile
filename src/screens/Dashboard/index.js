import React, { useEffect, useState } from "react";
import { View, FlatList, Alert, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Global/colors";
import LoadingModal from "../../components/LoadingModal";
import {
  fetchEvents,
  setSelectedEvent,
  fetchEventById,
} from "../../redux/actions/api";
import HomeHeader from "./components/HomeHeader";
import EventCard from "./components";
import EmptyListComponent from "../../components/EmptyListComponent";
import {
  getGridColumns,
  getDeviceDimensions,
} from "../../constant/deviceUtils";
import styles from "./Styles";

const Dashboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.api);
  const [refreshing, setRefreshing] = useState(false);

  const { width: screenWidth } = getDeviceDimensions();
  const numColumns = getGridColumns();
  const cardWidth = (screenWidth - 40 - (numColumns - 1) * 10) / numColumns;

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchEvents());
    setRefreshing(false);
  };

  const handleEventPress = async (item) => {
    try {
      dispatch(setSelectedEvent(item));
      await dispatch(fetchEventById(item.id));
      navigation.navigate("MyTabs");
    } catch (error) {
      Alert.alert("Error", "Failed to load event details");
    }
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      {loading ? (
        <LoadingModal visible={loading} />
      ) : (
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <EventCard
              item={item}
              onPress={handleEventPress}
              cardWidth={cardWidth}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.Primary]}
              tintColor={Colors.Primary}
            />
          }
          ListEmptyComponent={() => (
            <EmptyListComponent
              icon="Calendar_Icon"
              title="No Events Available"
              description="There are no events to display at the moment."
              buttonText="Refresh"
              onRefresh={onRefresh}
            />
          )}
        />
      )}
    </View>
  );
};

export default Dashboard;
