import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
import { Fonts } from "../../Global/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Styles";

const RecordPurchaseModal = forwardRef(
  (
    {
      productName = "",
      originalPrice: initialOriginalPrice = "",
      finalPrice: initialFinalPrice = "",
      discount: initialDiscount = "",
      onRecordPurchase,
      onCancel,
    },
    ref
  ) => {
    const bottomSheetRef = useRef(null);
    const [productNameValue, setProductNameValue] = useState(productName);
    const [quantity, setQuantity] = useState("2");
    const [originalPrice, setOriginalPrice] = useState(
      initialOriginalPrice || "5000"
    );
    const [discount, setDiscount] = useState(initialDiscount || "20");
    const [notes, setNotes] = useState("");

    // Calculate final price from original price and discount
    const calculateFinalPrice = () => {
      const original = parseFloat(originalPrice) || 0;
      const discountPercent = parseFloat(discount) || 0;
      const discountAmount = (original * discountPercent) / 100;
      return original - discountAmount;
    };

    const finalPrice = calculateFinalPrice();
    const original = parseFloat(originalPrice) || 0;
    const savedAmount = original - finalPrice;

    // Calculate discount from original and final price if finalPrice is provided but discount is not
    useEffect(() => {
      if (initialOriginalPrice && initialFinalPrice && !initialDiscount) {
        const original = parseFloat(initialOriginalPrice) || 0;
        const final = parseFloat(initialFinalPrice) || 0;
        if (original > 0) {
          const calculatedDiscount = ((original - final) / original) * 100;
          setDiscount(calculatedDiscount.toFixed(0));
        }
      }
    }, [initialOriginalPrice, initialFinalPrice, initialDiscount]);

    // Update state when props change
    useEffect(() => {
      setProductNameValue(productName || "");
      if (initialOriginalPrice) {
        setOriginalPrice(initialOriginalPrice);
      }
      if (initialDiscount) {
        setDiscount(initialDiscount);
      }
    }, [productName, initialOriginalPrice, initialDiscount]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);
            setProductNameValue(productName || "");
            setQuantity("2");
            setOriginalPrice(initialOriginalPrice || "5000");
            setDiscount(initialDiscount || "20");
            setNotes("");
          } catch (error) {
            console.log("Error opening record purchase modal:", error);
          }
        }
      },
      close: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.close();
            setNotes("");
          } catch (error) {
            console.log("Error closing record purchase modal:", error);
          }
        }
      },
    }));

    const handleSheetChanges = useCallback((index) => {
      if (index === -1) {
        setNotes("");
      }
    }, []);

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
          pressBehavior="none"
        />
      ),
      []
    );

    const handleClose = () => {
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
      if (onCancel) {
        onCancel();
      }
    };

    const handleRecordPurchase = () => {
      const purchaseData = {
        productName: productNameValue,
        quantity: parseInt(quantity) || 0,
        originalPrice: parseFloat(originalPrice) || 0,
        discount: parseFloat(discount) || 0,
        finalPrice: finalPrice,
        notes: notes.trim(),
      };

      if (onRecordPurchase) {
        onRecordPurchase(purchaseData);
      }
      bottomSheetRef.current?.close();
    };

    const handleTextInputFocus = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(1);
      }
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US").format(value);
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["85%", "95%"]}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={styles.modalContentContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.modalTitle}>Record Purchase</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleClose}
              activeOpacity={0.6}
            >
              <MaterialIcons
                name="close"
                size={24}
                color={Colors.PrimaryText}
              />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              style={styles.modalScrollView}
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Product Name / ID */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Product Name / ID</Text>
                <BottomSheetTextInput
                  style={styles.textInput}
                  value={productNameValue}
                  onChangeText={setProductNameValue}
                  onFocus={handleTextInputFocus}
                  placeholder="Enter product name or ID"
                  placeholderTextColor={Colors.SecondaryText}
                />
              </View>

              {/* Purchase Quantity */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>purchase Quantity</Text>
                <BottomSheetTextInput
                  style={styles.textInput}
                  value={quantity}
                  onChangeText={setQuantity}
                  onFocus={handleTextInputFocus}
                  keyboardType="numeric"
                  placeholder="Enter quantity"
                  placeholderTextColor={Colors.SecondaryText}
                />
              </View>

              {/* Original Price */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Original Price (SAR)</Text>
                <BottomSheetTextInput
                  style={styles.textInput}
                  value={originalPrice}
                  onChangeText={setOriginalPrice}
                  onFocus={handleTextInputFocus}
                  keyboardType="numeric"
                  placeholder="Enter original price"
                  placeholderTextColor={Colors.SecondaryText}
                />
              </View>

              {/* Discount */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Discount (%)</Text>
                <BottomSheetTextInput
                  style={styles.textInput}
                  value={discount}
                  onChangeText={setDiscount}
                  onFocus={handleTextInputFocus}
                  keyboardType="numeric"
                  placeholder="Enter discount percentage"
                  placeholderTextColor={Colors.SecondaryText}
                />
              </View>

              {/* Final Price */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Final Price (SAR)</Text>
                <BottomSheetTextInput
                  style={[styles.textInput, styles.readOnlyInput]}
                  value={finalPrice.toFixed(2)}
                  editable={false}
                  placeholderTextColor={Colors.SecondaryText}
                />
              </View>

              {/* Purchase Notes */}
              <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Purchase Notes (Optional)</Text>
                <BottomSheetTextInput
                  style={[styles.textInput, styles.textAreaInput]}
                  value={notes}
                  onChangeText={setNotes}
                  onFocus={handleTextInputFocus}
                  placeholder="Any additional Notes...."
                  placeholderTextColor={Colors.SecondaryText}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Purchase Summary */}
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Original Price:</Text>
                  <Text style={styles.summaryValue}>
                    SAR {formatCurrency(parseFloat(originalPrice) || 0)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Final Price:</Text>
                  <Text style={styles.summaryValueBold}>
                    SAR {formatCurrency(finalPrice)}
                  </Text>
                </View>
                <Text style={styles.savedText}>
                  You saved SAR {formatCurrency(savedAmount)} ({discount || 0}%
                  off)
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Action Buttons */}
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalRecordButton]}
              onPress={handleRecordPurchase}
              activeOpacity={0.7}
            >
              <Text style={styles.modalRecordButtonText}>Record Purchase</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

RecordPurchaseModal.displayName = "RecordPurchaseModal";

export default RecordPurchaseModal;
