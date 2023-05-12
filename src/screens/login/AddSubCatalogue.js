/** @format */

import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
//import SvgUri from "react-native-svg-uri-updated";
import GlobalStyles from "../../../assets/css/styles";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import WhiteLeftArrow from "../../../assets/images/dashboard/white_left_arrow";
import Catelogue from "./Catelogue";
export default function AddSubCatalogue({ navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const isFocused = useIsFocused();

  const [subCatalogueName, setSubCatalogueName] = useState("");
  const [subCatalogueNumber, setSubCatalogueNumber] = useState("");
  const [priceingMethod, setPricingMethod] = useState("");
  const [subCatalogueError, setsubCatalogueError] = useState("");

  //Success Pop up
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      // subcatalogue_no: subCatalogueNumber,
      // priceing_method: priceingMethod,
      // subcatalogue_name: subCatalogueName,
      // sku_id: [
      //   {
      //     _id: "600e953b86048b7a801fc550",
      //   },
      // ],
      // buyer_id: ["61a4869a39590e2efc463423"],
      // user_type_id: id,

      subcatalogue_no: subCatalogueNumber,
      subcatalogue_name: subCatalogueName,
      sku_id: [
        {
          _id: "4cc2deb9d38fe3d010d575e65a30bc95",
          pricing_range_id: "4cc2deb9d38fe3d010d575e65a30bc95",
          supplier_product_code: "0000001",
          supplier_company_name: "Awesome Foods",
          product_code: "PRO-000134",
          product_name: "Apple",
          category_name: "Fruits",
          subcategory_name: "Apple",
          option: "Kgs",
          created_at: "",
          price: 45,
          selected: true,
          discount_value: 0,
          amount_type: "",
          discount_amount: 0,
          final_price: 45,
        },
      ],
      buyer_id: [" 60647a8638266952d5615552"],
      user_type_id: id,
    };
    const result = await api.createSubCatalogue(
      token,
      endPoint.create_subcatalogue,
      myJson
    );
    if (result.success === "1") {
      console.log(result, "SUB CATALOGUE ADDED");
      refRBSheet.current.open();
      resetForm();
    } else {
      setsubCatalogueError(result.message);
      refRBSheet1.current.open();
    }
  };

  const resetForm = () => {
    console.log("Reset Form");
    setSubCatalogueNumber("");
    setSubCatalogueName(" ");
  };

  return (
    <SafeAreaView style={[styles.width100, styles.flex1]}>
      <ScrollView style={[styles.grayBg, styles.width100]}>
        <View
          style={[
            styles.signupTitle,
            styles.mb28,
            styles.primaryBg,
            styles.flexRow,
            styles.alignCenter,
            styles.headerShadow,
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* <SvgUri
              source={require("../../../assets/images/dashboard/white_left_arrow.jsx")}
            /> */}
            <WhiteLeftArrow />
          </TouchableOpacity>
          <Text
            style={[
              styles.font16,
              styles.textWhite,
              styles.padl15,
              styles.fontMed,
            ]}>
            {" "}
            Add Sub Catalogue{" "}
          </Text>
        </View>

        <View style={[styles.ph18, styles.mb18, styles.width100]}>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Sub Catalogue Name{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View>
              <Controller
                name='subCatalogueName'
                control={control}
                rules={{
                  required: "System generated product code is required.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(subCatalogueName) => {
                      setSubCatalogueName(subCatalogueName);
                      props.field.onChange(subCatalogueName);
                    }}
                    value={subCatalogueName}
                  />
                )}
              />
              {errors && errors.subCatalogueName && (
                <Text style={[styles.errorMsg]}>
                  SubCatalogueName is required.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Sub Catalogue No
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>

            <View>
              <Controller
                name='subCatalogueNumber'
                control={control}
                rules={{
                  required: "subCatalogueNumber is required.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(subCatalogueNumber) => {
                      setSubCatalogueNumber(subCatalogueNumber);
                      props.field.onChange(subCatalogueNumber);
                    }}
                    value={subCatalogueNumber}
                  />
                )}
              />
              {errors && errors.subCatalogueNumber && (
                <Text style={[styles.errorMsg]}>
                  SubCatalogueNumber is required.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Priceing Method
            </Text>
            <View>
              <Controller
                name='priceingMethod'
                control={control}
                rules={{
                  required: "Value is required.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    // keyboardType='numeric'
                    placeholderTextColor='#222B2E'
                    onChangeText={(priceingMethod) => {
                      setPricingMethod(priceingMethod);
                      props.field.onChange(priceingMethod);
                    }}
                    value={priceingMethod}
                  />
                )}
              />
              {errors && errors.priceingMethod && (
                <Text style={[styles.errorMsg]}>
                  {" "}
                  PriceingMethod is required.
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
            <View style={[styles.width50, styles.pr15]}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                {/* <TouchableOpacity> */}
                <Button
                  style={[
                    styles.primaryBg,
                    styles.saveBtn,
                    styles.width100,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}>
                  <Text
                    style={[
                      styles.font15,
                      styles.letterSpa33,
                      styles.textWhite,
                    ]}>
                    Submit
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
            <View style={[styles.width50, styles.pl15]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Button
                  style={[
                    styles.cancelStyle,
                    styles.saveBtn,
                    styles.width100,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}>
                  <Text
                    style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                    Cancel
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={"none"}
        height={350}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#BEBEBE",
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 9,
            paddingHorizontal: 30,
          },
        }}>
        {/* success Popup */}
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.padt30,
          ]}>
          <Image
            source={require("../../../assets/images/dashboard/success_img.png")}
            style={[styles.successIcon]}></Image>
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Added Successfuly
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Your sub catalogue added successfully
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              // onPress={() => {
              //   navigation.navigate("Catelogue", { category: "subcatlouge" });
              // }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                // onPress={() => {
                //   navigation.navigate("Catelogue", { category: "subcatlouge" });
                // }}
                onPress={() => {
                  navigation.goBack();
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* success Popup Ends */}
      </RBSheet>
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType={"none"}
        height={350}
        customStyles={{
          draggableIcon: {
            backgroundColor: "#BEBEBE",
          },
          container: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingTop: 9,
            paddingHorizontal: 30,
          },
        }}>
        {/* error Popup */}
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.padt30,
          ]}>
          <Image
            source={require("../../../assets/images/dashboard/errorImg.png")}
            style={[styles.successIcon]}></Image>
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Error
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            {subCatalogueError}
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => navigation.goBack()}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* error Popup Ends */}
      </RBSheet>
    </SafeAreaView>
  );
}
