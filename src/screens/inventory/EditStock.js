/** @format */

/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/AntDesign";

import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import styles from "../../../assets/css/styles";
import { SvgUri } from "react-native-svg";

import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import { Fontisto } from "@expo/vector-icons";
// import DatePicker from "react-native-neat-date-picker";

const EditStock = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productkey, setProductkey] = useState(0);
  const [product, setProduct] = useState("");
  const [skuKey, setSkuKey] = useState(0);
  const [sku, setSku] = useState("");
  const [wareHouseKey, setWareHouseKey] = useState(0);
  const [wareHouse, setWareHouse] = useState("");
  const [typeKey, setTypeKey] = useState(0);
  const [type, setType] = useState("");
  //date
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [date, setDate] = useState("");
  const openDatePickerSingle = () => setShowDatePickerSingle(true);

  const [countryCode1, setcountryCode] = useState("Select");
  const [countrykey, setcountrykey] = useState("Select");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const productName = [
    { key: 1, label: "Option 1" },
    { key: 2, label: "Option 2" },
    { key: 3, label: "Option 3" },
  ];

  const skuList = [
    { key: 1, label: "Option 1" },
    { key: 2, label: "Option 2" },
    { key: 3, label: "Option 3" },
  ];

  const wearHouse = [
    { key: 1, label: "Option 1" },
    { key: 2, label: "Option 2" },
    { key: 3, label: "Option 3" },
  ];

  const typeList = [
    { key: 1, label: "Option 1" },
    { key: 2, label: "Option 2" },
    { key: 3, label: "Option 3" },
  ];

  const countryCode = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
    { key: 2, label: "IND (+91)" },
  ];

  const onSubmit = (data) => {
    console.log(data, "MyDATA");
  };

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    console.log(output);
    setDate(output.dateString);
  };

  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.paymentHeaderView}>
        <View style={GlobalStyles.paymentHeaderPaddingView}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={{ justifyContent: "center" }}>
              <Pressable
                onPress={() => {
                  //   navigation.navigate("DrawerNavigationRoutes");
                  navigation.goBack();
                }}>
                <BackArrow />
              </Pressable>
            </View>
            <Text style={GlobalStyles.menuText}> Edit Stock</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 38,
          width: "100%",
          paddingLeft: 19,
          paddingRight: 18,
          marginTop: 19,
        }}>
        {/* product */}

        <View>
          <Text style={GlobalStyles.defaultScreenLabel}>Product Name*</Text>
          <View>
            {errors.countryCode ? (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.pressedmodalDropDown]}
              />
            ) : (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.modalDropDown]}
              />
            )}

            <Controller
              name='ProductName'
              control={control}
              rules={{
                required: true,
              }}
              render={(props) => (
                <ModalSelector
                  data={productName}
                  selectStyle={[styles.AdjustInventoryDropDownView]}
                  initValueTextStyle={{ fontSize: 14, color: "#5B6B65" }}
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
                  initValue='Select Product'
                  selectedKey={productkey}
                  value={product}
                  onChange={(option) => {
                    if (option.key) {
                      setProduct(option.key);
                      setProductkey(option.key);
                      props.field.onChange(option.key);
                    }
                  }}></ModalSelector>
              )}
            />

            {errors.ProductName && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Product Name is required.
              </Text>
            )}
          </View>
        </View>
        {/* sku */}

        <View>
          <Text style={GlobalStyles.defaultScreenLabel}>SKU*</Text>
          <View>
            {errors.countryCode ? (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.pressedmodalDropDown]}
              />
            ) : (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.modalDropDown]}
              />
            )}

            <Controller
              name='SKU'
              control={control}
              rules={{
                required: true,
              }}
              render={(props) => (
                <ModalSelector
                  data={skuList}
                  selectStyle={[styles.AdjustInventoryDropDownView]}
                  initValueTextStyle={{ fontSize: 14, color: "#5B6B65" }}
                  overlayStyle={[
                    styles.popupOverlay,
                    styles.flexColumn,
                    styles.justifyEnd,
                    styles.alignCenter,
                  ]}
                  optionContainerStyle={[styles.width300px]}
                  cancelStyle={[styles.width300px, styles.marHorauto]}
                  optionTextStyle={[styles.textBlack, styles.font14]}
                  cancelTextStyle={[styles.textBlack, styles.font14]}
                  initValue='Select SKU'
                  selectedKey={skuKey}
                  value={sku}
                  onChange={(option) => {
                    if (option.key) {
                      setSku(option.key);
                      setSkuKey(option.key);
                      props.field.onChange(option.key);
                    }
                  }}></ModalSelector>
              )}
            />

            {errors.SKU && (
              <Text style={{ color: "red", fontSize: 10 }}>
                SKU is required.
              </Text>
            )}
          </View>
        </View>
        {/* warehouse */}

        <View>
          <Text style={GlobalStyles.defaultScreenLabel}>Ware House*</Text>
          <View>
            {errors.countryCode ? (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.pressedmodalDropDown]}
              />
            ) : (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.modalDropDown]}
              />
            )}

            <Controller
              name='WearHouse'
              control={control}
              rules={{
                required: true,
              }}
              render={(props) => (
                <ModalSelector
                  data={wearHouse}
                  selectStyle={[styles.AdjustInventoryDropDownView]}
                  initValueTextStyle={{ fontSize: 14, color: "#5B6B65" }}
                  overlayStyle={[
                    styles.popupOverlay,
                    styles.flexColumn,
                    styles.justifyEnd,
                    styles.alignCenter,
                  ]}
                  optionContainerStyle={[styles.width300px]}
                  cancelStyle={[styles.width300px, styles.marHorauto]}
                  optionTextStyle={[styles.textBlack, styles.font14]}
                  cancelTextStyle={[styles.textBlack, styles.font14]}
                  initValue='Select WearHouse'
                  selectedKey={wareHouseKey}
                  value={wareHouse}
                  onChange={(option) => {
                    if (option.key) {
                      setWareHouse(option.key);
                      setWareHouseKey(option.key);
                      props.field.onChange(option.key);
                    }
                  }}></ModalSelector>
              )}
            />

            {errors.WearHouse && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Ware House is required.
              </Text>
            )}
          </View>
        </View>
        {/* type */}
        <View>
          <Text style={GlobalStyles.defaultScreenLabel}>Type*</Text>
          <View>
            {errors.countryCode ? (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.pressedmodalDropDown]}
              />
            ) : (
              <SvgUri
                source={require("../../../assets/images/dashboard/dropdown.svg")}
                style={[styles.modalDropDown]}
              />
            )}

            <Controller
              name='Type'
              control={control}
              rules={{
                required: true,
              }}
              render={(props) => (
                <ModalSelector
                  data={typeList}
                  selectStyle={[styles.AdjustInventoryDropDownView]}
                  initValueTextStyle={{ fontSize: 14, color: "#5B6B65" }}
                  overlayStyle={[
                    styles.popupOverlay,
                    styles.flexColumn,
                    styles.justifyEnd,
                    styles.alignCenter,
                  ]}
                  optionContainerStyle={[styles.width300px]}
                  cancelStyle={[styles.width300px, styles.marHorauto]}
                  optionTextStyle={[styles.textBlack, styles.font14]}
                  cancelTextStyle={[styles.textBlack, styles.font14]}
                  initValue='Select Type'
                  selectedKey={typeKey}
                  value={type}
                  onChange={(option) => {
                    if (option.key) {
                      setType(option.key);
                      setTypeKey(option.key);
                      props.field.onChange(option.key);
                    }
                  }}></ModalSelector>
              )}
            />

            {errors.Type && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Type is required.
              </Text>
            )}
          </View>
        </View>
        {/* Date */}

        <View>
          <Text style={GlobalStyles.defaultScreenLabel}>Date</Text>
          <View>
            <View
              style={[
                styles.AdjustInventoryDropDownView,
                styles.adjustInventoryDateDropDownView,
              ]}>
              <TextInput
                placeholder='Date'
                onChangeText={() => {}}
                value={date}
              />

              <View>
                <Pressable
                // onPress={openDatePickerSingle}
                >
                  <View>
                    <Fontisto name='date' size={22} color='#D0D6DD' />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* Quantity false */}

        <View style={GlobalStyles.inputView}>
          <Text style={GlobalStyles.defaultScreenLabel}>Quantity False*</Text>
          <Controller
            control={control}
            rules={{
              required: { value: true },
            }}
            required
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.AdjustInventoryDropDownView]}>
                <TextInput
                  style={[styles.defaultSettingInputText]}
                  placeholder='  Quantity'
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>
            )}
            name='Quantity'
          />
          {errors.Quantity && (
            <Text style={{ color: "red", fontSize: 10 }}>
              Quantity is reqiuired
            </Text>
          )}
        </View>

        {/* footer */}
        <View
          style={[
            styles.flexRow,
            styles.defaultBottomView,
            styles.justifyBetween,
          ]}>
          <View style={GlobalStyles.defaultSubmitBotton}>
            <TouchableOpacity
              style={[
                styles.primaryBg,
                styles.saveBtn,
                styles.width100,
                styles.flexRow,
                styles.alignCenter,
                styles.justifyCenter,
                styles.defaultBottom,
              ]}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={[styles.font15, styles.letterSpa33, styles.textWhite]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={GlobalStyles.defaultSubmitCancel}>
            <TouchableOpacity
              style={[
                styles.cancelStyle,
                styles.saveBtn,
                styles.width100,
                styles.flexRow,
                styles.alignCenter,
                styles.justifyCenter,
                styles.defaultBottom,
              ]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <DatePicker
        isVisible={showDatePickerSingle}
        mode={"single"}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
      /> */}
    </View>
  );
};

export default EditStock;

// import React from "react";
// import { View, Text } from "react-native";

// export default function EditStock({ navigation }) {
//   return (
//     <View>
//       <Text>EditStock</Text>
//     </View>
//   );
// }
