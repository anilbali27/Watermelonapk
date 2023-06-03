/** @format */

import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
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
import DropDownIcon from "../../../assets/images/dashboard/dropdown";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import AllTiersCard from "./AllTiersCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
import GlobalStyles from "../../../assets/css/styles";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import WhiteLeftArrow from "../../../assets/images/dashboard/white_left_arrow";
export default function Edittier({ route, navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [idno, setIdno] = useState(route.params.id);
  //const[name,setname]=useState(route.params.tierName)
  console.log(route.params, "route.params");
  const [tierName, setTierName] = useState(route.params.tierName);
  const [amountType, setamountType] = useState(route.params.amountType);
  const [value1, setValue1] = useState(route.params.value1);
  console.log(typeof route.params.value, "9078776");
  const [editTierError, setEditTierError] = useState("");
  const [amountTypekey, setamountTypekey] = useState(0);

  // const[TierData,setTierData] = useState('false');

  // success popup
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      id: idno,
      amount_type: amountType,
      discount_price: value1,
      name: tierName,
      platform: "",
      supplier_id: id,
      status: 1,
    };
    console.log(myJson, "9900tyu90");
    const result = await api.edittier(token, endPoint.edit_tier, myJson);
    console.log(result.message, "TYUYU878");
    if (result.success === "1") {
      refRBSheet.current.open();
    } else {
      setEditTierError(result.message);
      refRBSheet1.current.open();
    }
  };
  const AmountTypeData = [
    { key: 1, label: "Increase", value: 1 },
    { key: 2, label: "Decrease", value: 2 },
  ];

  return (
    <View style={[styles.width100, styles.flex1]}>
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
            Edit Tier{" "}
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
                name='tierName'
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
                    onChangeText={(tierName) => {
                      setTierName(tierName);
                      props.field.onChange(tierName);
                    }}
                    value={tierName}
                  />
                )}
              />
              {errors && errors.tierName && (
                <Text style={[styles.errorMsg]}>Tier name is required.</Text>
              )}
            </View>
          </View>
          {/* <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Select Amount Type{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>

            <View>
              <Controller
                name='amountType'
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
                    onChangeText={(amountType) => {
                      setamountType(amountType);
                      props.field.onChange(amountType);
                    }}
                    value={amountType}
                  />
                )}
              />
              {errors && errors.amountType && (
                <Text style={[styles.errorMsg]}>Amount type is required.</Text>
              )}
            </View>
          </View> */}
          <View style={[styles.width100, styles.padR7]}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Select Amount Type{" "}
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <DropDownIcon style={[styles.modalDropDown]} />
              <Controller
                name='amountType'
                control={control}
                // rules={{ required: "Amount type is required." }}
                render={(props) => (
                  <ModalSelector
                    data={AmountTypeData}
                    initValue={amountType}
                    selectStyle={[
                      styles.inputStyle,
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyStart,
                      styles.marBtm4,
                      styles.borderDefault,
                      // errors && errors.amountType && styles.borderRed,
                    ]}
                    initValueTextStyle={[
                      styles.font15,
                      styles.textBlack,
                      styles.fontMed,
                    ]}
                    overlayStyle={[
                      styles.popupOverlay,
                      styles.flexColumn,
                      styles.justifyEnd,
                      styles.alignCenter,
                    ]}
                    optionContainerStyle={[styles.width300px]}
                    cancelStyle={[styles.width300px, styles.marHorauto]}
                    optionTextStyle={[styles.textBlack, styles.font15]}
                    cancelTextStyle={[styles.textBlack, styles.font15]}
                    onChange={(option) => {
                      if (option.key) {
                        setamountType(option.label);
                        setamountTypekey(option.value);
                        props.field.onChange(option.value);
                      }
                    }}
                    value={amountType}
                  />
                )}
              />
            </View>
            {/* {amountType && (
                <Text style={[styles.errorMsg]}>Amount type is required.</Text>
              )} */}
          </View>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Value(%)
            </Text>
            <View>
              <Controller
                name='value1'
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
                    keyboardType='numeric'
                    placeholderTextColor='#222B2E'
                    value={value1?.toString() || ""}
                    // value={value1}
                    onChangeText={(value1) => {
                      setValue1(value1);
                      props.field.onChange(value1);
                    }}
                  />
                )}
              />
              {errors && errors.value1 && (
                <Text style={[styles.errorMsg]}>Tier name is required.</Text>
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
                    ]}
                    onPress={handleSubmit(onSubmit)}>
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
            Tier updated successfully.
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => {
                navigation.goBack();
              }}
              // onPress={() => {
              //   navigation.navigate("Catelogue", { category: "tier" });
              // }}
            >
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                // onPress={() => {
                //   navigation.navigate("Catelogue", { category: "tier" });
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
            {editTierError}
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
    </View>
  );
}
