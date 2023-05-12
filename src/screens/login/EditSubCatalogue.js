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

import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
// import SvgUri from "react-native-svg-uri-updated";
import GlobalStyles from "../../../assets/css/styles";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import WhiteLeftArrow from "../../../assets/images/dashboard/white_left_arrow";
export default function EditSubCatalogue({ route, navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();

  // success popup
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const [id, setId] = useState(route.params.id);
  const [editSubCatalogueError, setEditSubCatalogueError] = useState("");

  //const[name,setname]=useState(route.params.tierName)
  console.log(route.params, "PARAMS");
  const [subCatalogueName, setSubCatalogueName] = useState(
    route.params.subcatalogue_name
  );
  const [subCatalogueNumber, setSubCatalogueNumber] = useState(
    route.params.product_code
  );
  const [priceingMethod, setPricingMethod] = useState(route.params.amount_type);

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      id: id,
      subcatalogue_no: subCatalogueNumber,
      priceing_method: priceingMethod,
      subcatalogue_name: subCatalogueName,
      sku_id: [
        {
          _id: "600e953b86048b7a801fc550",
        },
      ],
      buyer_id: ["61a4869a39590e2efc463423"],
      user_type_id: id,
    };

    console.log(myJson, "9900tyu90");
    const result = await api.updateSubcatalogue(
      token,
      endPoint.update_subcatalogue,
      myJson
    );
    console.log(result.message, "TYUYU878");
    if (result.success === "1") {
      refRBSheet.current.open();
    } else {
      setEditSubCatalogueError(result.message);
      refRBSheet1.current.open();
    }
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
              source={require("../../../assets/images/dashboard/white_left_arrow.svg")}
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
            Edit Sub Catalogue{" "}
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
              Tier Name <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View>
              <Controller
                name='subCatalogueName'
                control={control}
                //   rules={{
                //     required: "Tier is required.",
                //   }}
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
                  subCatalogueName is required.
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
                //   rules={{
                //     required: "Amount type is required.",
                //   }}
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
                  subCatalogueNumber is required.
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
                //   rules={{
                //     required: "Value is required.",
                //   }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    // keyboardType='numeric'
                    // placeholderTextColor='#222B2E'
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
                  priceingMethod is required.
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
            <View style={[styles.width50, styles.pr15]}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
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
        {/* Update Popup */}
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.padt30,
          ]}>
          <Image
            source={require("../../../assets/images/dashboard/updated_icon.png")}
            style={[styles.updatedIcon]}></Image>
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Updated
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Sub catalogue updated successfully.
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
        {/* Update Popup Ends */}
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
            {editSubCatalogueError}
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
