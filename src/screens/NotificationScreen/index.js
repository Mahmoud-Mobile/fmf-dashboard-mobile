import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { styles } from "./Styles";
import { NotificationItem } from "./components";
import { componentStyles } from "./components/Styles";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const mockData = [
      {
        id: "1",
        title: "New Update Available",
        desc: "There's a new update available. Please check the details.",
        time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      },
      {
        id: "2",
        title: "Status Changed",
        desc: "Your status has been updated. Please review the new information.",
        time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        id: "3",
        title: "Reminder",
        desc: "Don't forget about your upcoming event. It starts in 2 hours.",
        time: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      },
    ];
    setData(mockData);
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="Notifications"
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
    </View>
  );
};

export default NotificationScreen;
