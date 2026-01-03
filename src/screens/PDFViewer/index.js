import React, { useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

const PDFViewer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const pdfUrl =
    route.params?.pdfUrl ||
    "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";
  const [loading, setLoading] = useState(true);
  console.log("pdfUrl", pdfUrl);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log("WebView error: ", nativeEvent);
    setLoading(false);
    Alert.alert(
      "Error",
      "Failed to load PDF. Please check your internet connection and try again."
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftLabel="PDF Viewer"
        onLeftButtonPress={() => navigation.goBack()}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Primary} />
        </View>
      )}
      <WebView
        source={{ uri: pdfUrl }}
        style={styles.webView}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.Primary} />
          </View>
        )}
      />
    </View>
  );
};

export default PDFViewer;
