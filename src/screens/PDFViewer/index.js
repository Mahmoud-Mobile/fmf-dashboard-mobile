import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { Asset } from "expo-asset";
import CustomHeader from "../../components/CustomHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./Styles";
import { Colors } from "../../Global/colors";

const PDFViewer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const pdfSource = route.params?.pdfUrl;
  const isLocalAsset = route.params?.isLocalAsset || false;
  const [loading, setLoading] = useState(true);
  const [pdfUri, setPdfUri] = useState(null);

  useEffect(() => {
    const loadLocalPDF = async () => {
      if (isLocalAsset && pdfSource) {
        try {
          const asset = Asset.fromModule(pdfSource);
          await asset.downloadAsync();
          setPdfUri(asset.localUri || asset.uri);
          setLoading(false);
        } catch (error) {
          Alert.alert("Error", "Failed to load PDF file. Please try again.");
          setLoading(false);
        }
      } else {
        setPdfUri(
          pdfSource ||
            "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf"
        );
        setLoading(false);
      }
    };

    loadLocalPDF();
  }, [pdfSource, isLocalAsset]);

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent) => {
    setLoading(false);
    Alert.alert(
      "Error",
      "Failed to load PDF. Please check your internet connection and try again."
    );
  };

  const getSource = () => {
    if (isLocalAsset && pdfUri) {
      return { uri: pdfUri };
    }
    return {
      uri:
        pdfUri ||
        pdfSource ||
        "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf",
    };
  };

  if (loading && isLocalAsset && !pdfUri) {
    return (
      <View style={styles.container}>
        <CustomHeader
          leftLabel="PDF Viewer"
          onLeftButtonPress={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.Primary} />
        </View>
      </View>
    );
  }

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
        source={getSource()}
        style={styles.webView}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Colors.Primary} />
          </View>
        )}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default PDFViewer;
