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
  Keyboard,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Colors } from "../../Global/colors";
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
    const productNameRef = useRef(null);
    const quantityRef = useRef(null);
    const originalPriceRef = useRef(null);
    const discountRef = useRef(null);
    const finalPriceRef = useRef(null);
    const notesRef = useRef(null);
    const [productNameValue, setProductNameValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [originalPrice, setOriginalPrice] = useState(
      initialOriginalPrice || ""
    );
    const [discount, setDiscount] = useState(initialDiscount || "");
    const [notes, setNotes] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const lastEditedRef = useRef(null);

    const calculateFinalPriceFromDiscount = () => {
      const original = parseFloat(originalPrice) || 0;
      const discountPercent = parseFloat(discount) || 0;
      const discountAmount = (original * discountPercent) / 100;
      return original - discountAmount;
    };

    const calculateDiscountFromFinalPrice = () => {
      const original = parseFloat(originalPrice) || 0;
      const final = parseFloat(finalPrice) || 0;
      if (original > 0) {
        return ((original - final) / original) * 100;
      }
      return 0;
    };

    // Determine which value to use based on last edited field
    const getFinalPrice = () => {
      if (lastEditedRef.current === "finalPrice" && finalPrice !== "") {
        return parseFloat(finalPrice) || 0;
      }
      return calculateFinalPriceFromDiscount();
    };

    const getDiscount = () => {
      if (lastEditedRef.current === "finalPrice" && finalPrice !== "") {
        const calculatedDiscount = calculateDiscountFromFinalPrice();
        return calculatedDiscount.toFixed(2);
      }
      return discount;
    };

    const currentFinalPrice = getFinalPrice();
    const currentDiscountValue = parseFloat(getDiscount()) || 0;
    const original = parseFloat(originalPrice) || 0;
    const qty = parseInt(quantity) || 1;
    const savedAmount = (original - currentFinalPrice) * qty;

    // Auto-update discount when final price is manually edited
    useEffect(() => {
      if (
        lastEditedRef.current === "finalPrice" &&
        finalPrice !== "" &&
        originalPrice !== "" &&
        originalPrice !== " "
      ) {
        const original = parseFloat(originalPrice) || 0;
        const final = parseFloat(finalPrice) || 0;
        if (original > 0 && final >= 0 && final <= original) {
          const calculatedDiscount = calculateDiscountFromFinalPrice();
          const newDiscount = calculatedDiscount.toFixed(2);
          const currentDiscountValue = parseFloat(discount) || 0;
          // Only update if different to avoid infinite loop
          if (Math.abs(currentDiscountValue - calculatedDiscount) > 0.01) {
            setDiscount(newDiscount);
          }
        }
      }
    }, [finalPrice]);

    // Auto-update final price when discount is manually edited
    useEffect(() => {
      if (
        lastEditedRef.current === "discount" &&
        discount !== "" &&
        originalPrice !== "" &&
        originalPrice !== " "
      ) {
        const calculatedFinal = calculateFinalPriceFromDiscount();
        const newFinalPrice = calculatedFinal.toFixed(2);
        const currentFinalValue = parseFloat(finalPrice) || 0;
        // Only update if different to avoid infinite loop
        if (
          finalPrice === "" ||
          Math.abs(currentFinalValue - calculatedFinal) > 0.01
        ) {
          setFinalPrice(newFinalPrice);
        }
      }
    }, [discount]);

    // Update when original price changes
    useEffect(() => {
      if (originalPrice !== "" && originalPrice !== " ") {
        if (
          lastEditedRef.current === "discount" ||
          lastEditedRef.current === null
        ) {
          // Recalculate final price from discount
          const calculatedFinal = calculateFinalPriceFromDiscount();
          setFinalPrice(calculatedFinal.toFixed(2));
        } else if (
          lastEditedRef.current === "finalPrice" &&
          finalPrice !== ""
        ) {
          // Recalculate discount from final price
          const original = parseFloat(originalPrice) || 0;
          if (original > 0) {
            const calculatedDiscount = calculateDiscountFromFinalPrice();
            setDiscount(calculatedDiscount.toFixed(2));
          }
        }
      }
    }, [originalPrice]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(0);

            // Initialize all inputs as empty, or use provided initial values
            setProductNameValue(productName || "");
            setQuantity("");
            setOriginalPrice(initialOriginalPrice || "");
            setDiscount(initialDiscount || "");
            setFinalPrice(initialFinalPrice || "");
            setNotes("");
            lastEditedRef.current = null;

            // If initial values are provided, set up the calculations
            if (initialOriginalPrice && initialFinalPrice) {
              // If both original and final price are provided, calculate discount
              const original = parseFloat(initialOriginalPrice) || 0;
              const final = parseFloat(initialFinalPrice) || 0;
              if (original > 0) {
                const calculatedDiscount =
                  ((original - final) / original) * 100;
                setDiscount(calculatedDiscount.toFixed(2));
                lastEditedRef.current = "finalPrice";
              }
            } else if (initialOriginalPrice && initialDiscount) {
              // If original price and discount are provided, calculate final price
              const original = parseFloat(initialOriginalPrice) || 0;
              const discountPercent = parseFloat(initialDiscount) || 0;
              const discountAmount = (original * discountPercent) / 100;
              const calculatedPrice = (original - discountAmount).toFixed(2);
              setFinalPrice(calculatedPrice);
              lastEditedRef.current = "discount";
            }
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
          pressBehavior="close"
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
        discount: currentDiscountValue,
        finalPrice: currentFinalPrice,
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

    const handleNotesInputFocus = () => {
      // For multiline input, snap to full height with a slight delay
      // to allow the keyboard to position properly
      setTimeout(() => {
        if (bottomSheetRef.current) {
          try {
            bottomSheetRef.current.snapToIndex(1);
          } catch (error) {
            // Ignore errors if bottom sheet is not available
          }
        }
      }, 150);
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US").format(value);
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["95%", "100%"]}
        enablePanDownToClose={false}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
        // keyboardBehavior="interactive"
        // keyboardBlurBehavior="restore"
        // android_keyboardInputMode="adjustResize"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <BottomSheetScrollView
            style={styles.modalContentContainer}
            // keyboardShouldPersistTaps="handled"
            // nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
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

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Product Name / ID</Text>
              <TextInput
                ref={productNameRef}
                style={styles.textInput}
                value={productNameValue}
                onChangeText={setProductNameValue}
                onFocus={handleTextInputFocus}
                onSubmitEditing={() => quantityRef.current?.focus()}
                returnKeyType="next"
                placeholder="Enter product name or ID"
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>purchase Quantity</Text>
              <TextInput
                ref={quantityRef}
                style={styles.textInput}
                value={quantity}
                onChangeText={setQuantity}
                onFocus={handleTextInputFocus}
                onSubmitEditing={() => originalPriceRef.current?.focus()}
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="Enter quantity"
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Original Price (SAR)</Text>
              <TextInput
                ref={originalPriceRef}
                style={styles.textInput}
                value={originalPrice}
                onChangeText={setOriginalPrice}
                onFocus={handleTextInputFocus}
                onSubmitEditing={() => discountRef.current?.focus()}
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="Enter original price"
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Discount (%)</Text>
              <TextInput
                ref={discountRef}
                style={styles.textInput}
                value={discount}
                onChangeText={(text) => {
                  setDiscount(text);
                  lastEditedRef.current = "discount";
                }}
                onFocus={handleTextInputFocus}
                onSubmitEditing={() => finalPriceRef.current?.focus()}
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="Enter discount percentage"
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Final Price (SAR)</Text>
              <TextInput
                ref={finalPriceRef}
                style={styles.textInput}
                value={
                  finalPrice !== ""
                    ? finalPrice
                    : originalPrice !== "" && discount !== ""
                    ? currentFinalPrice.toFixed(2)
                    : ""
                }
                onChangeText={(text) => {
                  setFinalPrice(text);
                  lastEditedRef.current = "finalPrice";
                }}
                onFocus={handleTextInputFocus}
                onSubmitEditing={() => notesRef.current?.focus()}
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="Enter final price"
                placeholderTextColor={Colors.SecondaryText}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelText}>Purchase Notes (Optional)</Text>
              <TextInput
                ref={notesRef}
                style={[styles.textInput, styles.textAreaInput]}
                value={notes}
                onChangeText={setNotes}
                onFocus={handleNotesInputFocus}
                onSubmitEditing={() => Keyboard.dismiss()}
                returnKeyType="done"
                placeholder="Any additional Notes...."
                placeholderTextColor={Colors.SecondaryText}
                multiline
                textAlignVertical="top"
              />
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Original Price:</Text>
                <Text style={styles.summaryValue}>
                  SAR {formatCurrency(original * qty)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Final Price:</Text>
                <Text style={styles.summaryValueBold}>
                  SAR {formatCurrency(currentFinalPrice * qty)}
                </Text>
              </View>
              <Text style={styles.savedText}>
                You saved SAR {formatCurrency(savedAmount)} (
                {currentDiscountValue.toFixed(2)}% off)
              </Text>
            </View>

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
                <Text style={styles.modalRecordButtonText}>
                  Record Purchase
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  }
);

RecordPurchaseModal.displayName = "RecordPurchaseModal";

export default RecordPurchaseModal;
