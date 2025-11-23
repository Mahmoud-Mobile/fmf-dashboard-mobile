import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import CustomHeader from "../../components/CustomHeader";
import styles from "./Styles";
import { useNavigation } from "@react-navigation/native";

const SUPPORT_URL =
  "https://salesiq.zohopublic.sa/signaturesupport.ls?widgetcode=52a3a64d522882477f125777631707864b1349a5d9ccbc58ff91062c46c88fe0";

const Chat = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} edges={{ top: "additive" }}>
      <CustomHeader
        leftLabel="Support Chat"
        onLeftButtonPress={() => navigation.goBack()}
      />
      <View style={styles.webViewContainer}>
        <WebView
          source={{ uri: SUPPORT_URL }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            // console.warn("WebView error: ", nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            // console.warn("WebView HTTP error: ", nativeEvent);
          }}
        />
      </View>
    </View>
  );
};

export default Chat;
