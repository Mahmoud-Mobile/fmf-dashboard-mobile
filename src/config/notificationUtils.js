import * as Notifications from "expo-notifications";

export const handleTestNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test push notification!",
        sound: true,
        data: { test: true },
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.error("Error sending test notification:", error);
  }
};

export const sendNotification = async (title, body, data = {}) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data,
      },
      trigger: null, // Show immediately
    });
  } catch (error) {
    console.log("Error sending notification:", error);
  }
};
