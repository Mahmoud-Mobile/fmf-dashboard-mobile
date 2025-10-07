import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { styles } from "./Styles";
import { NotificationItem } from "./components";
import { componentStyles } from "./components/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = [
      {
        id: "1",
        title: "New Event Update",
        desc: "There's a new update for the upcoming event. Please check the details.",
        time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "2",
        title: "Flight Status Changed",
        desc: "Your flight status has been updated. Please review the new information.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "3",
        title: "Check-in Reminder",
        desc: "Don't forget to check in for your upcoming event. Check-in opens in 2 hours.",
        time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      },
    ];
    setData(mockData);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <CustomHeader
        title="Notifications"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={componentStyles.listContainer}
        ItemSeparatorComponent={() => (
          <View style={componentStyles.separator} />
        )}
        renderItem={({ item }) => (
          <NotificationItem
            iconName="notifications-outline"
            title={item.title}
            desc={item.desc}
            time={item.time}
          />
        )}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
