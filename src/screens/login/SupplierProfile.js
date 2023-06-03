
/** @format */

/** @format */

import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
import { useForm, Controller } from "react-hook-form";
import SideMenu from "../../../assets/jsx/SideMenu";
import ModalSelector from "react-native-modal-selector";
import { Progress, NativeBaseProvider } from "native-base";
// import api from "../../screens/Services/API/CallingApi";

import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";

export default function SupplierProfile({ navigation, route }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [wareHouse, setWareHouse] = useState("");
  const [lastName, setLastName] = useState("");
  const [countrykey, setcountrykey] = useState("Select");
  const [profileDatta, setProfileDatta] = useState([]);
  const [designation, setdesignation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [id, setId] = useState("");
  const [notified, setNotified] = useState("");
  const [countryCode, setcountryCode] = useState("Select");
  const [userdata, setUserdata] = useState([]);
  const [progressValue, setProgressValue] = useState(50);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({});

  // country code
  const CountryCodeData = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
  ];

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    console.log(
      data,
      Object.keys(data),
      "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    const array = Object.keys(data);
    const profile = array.filter((val) => data[val] === "");
    console.log(profile, "profileeeeeee");
    console.log(profile.length, "profileeeeeeelengthhhhhhh");
    if (profile.length != 0) {
      if (profile.length === 5) {
        setProgressValue(50);
      } else if (profile.length === 4) {
        setProgressValue(60);
      } else if (profile.length === 3) {
        setProgressValue(70);
      } else if (profile.length === 2) {
        setProgressValue(80);
      } else if (profile.length === 1) {
        setProgressValue(90);
      }
    } else {
      setProgressValue(100);
    }
  }, [data]);

  //get Profile
  const getProfile = async () => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("userTypeId");
    console.log(jsonId, "jsonId");
    let token = jsonValue;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MzIwNTM2MSwiZXhwIjoxNzE0NzQxMzYxLCJuYmYiOjE2ODMyMDUzNjEsImp0aSI6IlcyNHJDWmNZbmo1V3BRclIiLCJzdWIiOiI1ZmY1NzBlYThiMDU4ZDVhMTQ2MGEwZjYiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.uoYhaOxiMvCB3P5BAG9n5glbjonj9lnMsSZYxACLt08";
    var myJson = {
      id: jsonId,
      // id: "5fe9c03ab70cb405ba5dcb33",
    };

    const result = await api.getProfile(token, endPoint.get_profile, myJson);
    // console.log(result, "getprofile");

    if (result) {
      setData({
        wareHouseAddress: result.data?.w_address,
        wareHouseName: result.data?.w_name,
        id: result.data?.company_registration_no,
        profile: result.data?.profile,
        email: result.data?.email,
      });
      console.log(result.data,"result.dataresult.data")
      setProfileDatta(result.data);
      setEmail(result.data?.email);
      setImage(result.data?.profile);
      setId(result.data?.company_registration_no);
      setMobileNumber(result.data?.mobile_no);
      setcountrykey(result.data?.mobile_no_code);
      setWareHouse(result.data?.w_name);
      setAddress(result.data?.address);
      setOfficeAddress(result.data?.w_address);
      setName(result.data?.firstname);
      setLastName(result.data?.lastname);
      setLoading(false);
    } else {
      setProfileDatta([]);
    }
  };

  const getValue = () => {
    if (data.address || data.w_name || data.w_address || data.profile) {
    } else {
      setProgressValue((progressValue) => progressValue + 20);
    }
  };

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("id");
    const jsonUserId = await AsyncStorage.getItem("userTypeId");

    let token = jsonValue;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MzIwNTM2MSwiZXhwIjoxNzE0NzQxMzYxLCJuYmYiOjE2ODMyMDUzNjEsImp0aSI6IlcyNHJDWmNZbmo1V3BRclIiLCJzdWIiOiI1ZmY1NzBlYThiMDU4ZDVhMTQ2MGEwZjYiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.uoYhaOxiMvCB3P5BAG9n5glbjonj9lnMsSZYxACLt08";
    var myJson = {
      firstname: name,
      lastname: "n",
      email: email,
      mobile_no: mobileNumber,
      designation: designation,
      password: "",
      confirm_password: "",
      user_type: "2",
      user_type_id: jsonUserId,
      company_name: "baryons123",
      company_registration_no: "500",
      // id: "63fc9812be1995bb0f06f6e7",
      id: jsonId,
      role_id: 0,
    };
    console.log(myJson, "oi7856g66");

    const result = await api.updateUser(token, endPoint.update_user, myJson);
    console.log(result, "67676778787878");

    if (result) {
     
      setUserdata(result.data);
    } else {
      setUserdata([]);
    }
  };

  //Loader
  const Loader = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 300,
      }}>
      <ActivityIndicator size='large' color={"#1F9CEF"} />
    </View>
  );
  return (
    <NativeBaseProvider>
      <ScrollView style={[styles.whiteBg]}>
        {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#1F9CEF" }} /> */}
        {/* <StatusBar backgroundColor='#1F9CEF' /> */}
        {/* profile header */}
        <View style={[styles.profileHeader, styles.primaryBg]}>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <SideMenu />
          </TouchableOpacity>
          <View style={[styles.flexColumn, styles.alignCenter]}>
            {/* <Image
              source={require("../../../assets/images/dashboard/profile_icon.png")}
              style={[styles.profilelogo, styles.resizeContain, styles.mb9]}
            ></Image> */}
            <Image
              source={{
                uri: `https://stagingapi.watermelon.market/upload/upload_photo/${image}`,
              }}
              style={[
                styles.profilelogo,
                styles.resizeContain,
                styles.mb9,
              ]}></Image>
            <Text
              style={[
                styles.textWhite,
                styles.fontBold,
                styles.mb4,
                styles.font16,
              ]}>
              {name} {lastName}
            </Text>
            <Text style={[styles.textWhite, styles.mb16, styles.font14]}>
             {+971} {mobileNumber}
            </Text>
            <TouchableOpacity
              style={[styles.whiteBg, styles.editProfileBtn, styles.mb28]}
              // onPress={handleSubmit(onSubmit)}
            >
              <Text style={[styles.font12, styles.textPri]}>EDIT PROFILE</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.font13, styles.textWhite, styles.mb6]}>
            Profile Completion : {progressValue}%
          </Text>
          {/* <View style={[styles.profileprogressBg]}>
            <View
            style={[styles.whiteBg, styles.progressBar, { width: "60%" }]}
          ></View>
          </View> */}

          <Progress
            value={progressValue}
            bg='#fff5fa5c'
            colorScheme='info'
            _filledTrack={{
              bg: "#fff",
            }}
          />
        </View>
        {/* profile header - Ends */}

        {isLoading ? (
          <Loader />
        ) : (
          <View style={[styles.profileContainer]}>
            <Text
              style={[
                styles.font14,
                styles.textBlack,
                styles.mb16,
                styles.fontBold,
              ]}>
              Personal Information1
            </Text>

            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Email ID<Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='email'
                  control={control}
                  // rules={{ required: "Email Id is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.fontMed]}
                      placeholder='Email ID'
                      editable={false}
                      placeholderTextColor='#617191'
                      onChangeText={(email) => {
                        props.field.onChange(email);

                        setEmail(email);
                      }}
                      value={email}
                    />
                  )}
                />
                {errors && errors.email && (
                  <Text style={[styles.errorMsg]}>{errors.email.message}</Text>
                )}
              </View>
            </View>

            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Registration No
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='id'
                  control={control}
                  //rules={{ required: "Registration No is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.fontMed]}
                      placeholder='Registration No'
                      placeholderTextColor='#617191'
                      onChangeText={(id) => {
                        props.field.onChange(id);

                        setId(id);
                      }}
                      value={id}
                    />
                  )}
                />
                {errors && errors.id && (
                  <Text style={[styles.errorMsg]}>{errors.id.message}</Text>
                )}
              </View>
            </View>

            <View style={[styles.imageIcon, styles.mb11]}>
              {/* <View style={[styles.width40, styles.padR7]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Country Code
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  <DropDownIcon style={[styles.modalDropDown]} />

                  <Controller
                    name='countryCode'
                    control={control}
                     rules={{ required: "Country code is required." }}
                    render={(props) => (
                      <ModalSelector
                         data={CountryCodeData}
                        initValue={"UAE (+971)"}
                        selectStyle={[
                          [styles.inputStyle, styles.fontMed],
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
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
                            setcountryCode(option.label);
                            setcountrykey(option.label);
                            props.field.onChange(option.label);
                          }
                        }}
                        value={countrykey}
                      />
                    )}
                  />
                  {errors && errors.countryCode && (
                    <Text style={[styles.errorMsg]}>
                      {errors.countryCode.message}
                    </Text>
                  )}
                </View>
              </View> */}
                <View style={[styles.width40, styles.padR7]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Country Code
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  {/* {errors.countryCode ? (
                    <SvgUri
                      source={require("../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.pressedmodalDropDown]}
                    />
                  ) : (
                    <SvgUri
                      source={require("../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    />
                  )} */}
                  <View>
                    {/* <DropDownIcon style={[styles.modalDropDown]} /> */}
                    {/* <Controller
                      name='countryCode'
                      control={control}
                      rules={{ required: "Country code is required." }}
                      render={(props) => ( */}
                    {/* <ModalSelector
                      data={CountryCodeData}
                      initValue={"UAE(+971)"}
                      selectStyle={[
                        [styles.inputStyle, styles.fontMed],
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyStart,
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
                          setcountryCode(option.label);
                          setcountrykey(option.label);
                          props.field.onChange(option.label);
                        }
                      }}
                    /> */}
                    {/* )}
                    /> */}
                    <View
                      style={[
                        styles.inputStyle,
                        styles.flexRow,
                        styles.alignCenter,
                      ]}>
                      <Text>UAE(+971)</Text>
                    </View>
                  </View>
                  {errors && errors.countryCode && (
                    <Text style={[styles.errorMsg]}>
                      {errors.countryCode.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={[styles.width60, styles.padR9]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Mobile No
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  <Controller
                    name='mobileNumber'
                    control={control}
                    // rules={{ required: "Mobile number is required." }}
                    render={(props) => (
                      <TextInput
                        style={[styles.inputStyle, styles.fontMed]}
                        placeholder='Mobile No'
                        keyboardType='numeric'
                        maxLength={10}
                        placeholderTextColor='#617191'
                        onChangeText={(mobileNumber) => {
                          setMobileNumber(mobileNumber);
                          props.field.onChange(mobileNumber);
                        }}
                        value={mobileNumber}
                      />
                    )}
                  />
                  {errors && errors.mobileNumber && (
                    <Text style={[styles.errorMsg]}>
                      {errors.mobileNumber.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Assigned Warehouse
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='wareHouse'
                  control={control}
                  // rules={{ required: "Assigned Warehouse is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.fontMed]}
                      placeholder='Assigned Warehouse'
                      placeholderTextColor='#617191'
                      onChangeText={(wareHouse) => {
                        props.field.onChange(wareHouse);

                        setWareHouse(wareHouse);
                      }}
                      value={wareHouse}
                    />
                  )}
                />
                {errors && errors.wareHouse && (
                  <Text style={[styles.errorMsg]}>
                    {errors.wareHouse.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Designation
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='designation'
                  control={control}
                  // rules={{ required: "Designation is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.fontMed]}
                      placeholder='Designation'
                      placeholderTextColor='#617191'
                      onChangeText={(designation) => {
                        props.field.onChange(designation);

                        setdesignation(designation);
                      }}
                    />
                  )}
                />
                {errors && errors.designation && (
                  <Text style={[styles.errorMsg]}>
                    {errors.designation.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Get Notified When
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='notified'
                  control={control}
                  // rules={{ required: "Designation is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.fontMed]}
                      placeholder='Get Notified When'
                      placeholderTextColor='#617191'
                      onChangeText={(notified) => {
                        props.field.onChange(notified);

                        setNotified(notified);
                      }}
                    />
                  )}
                />
                {errors && errors.notified && (
                  <Text style={[styles.errorMsg]}>
                    {errors.notified.message}
                  </Text>
                )}
              </View>
            </View>
            <Text
              style={[
                styles.font14,
                styles.textBlack,
                styles.mb16,
                styles.fontBold,
              ]}>
              My Address
            </Text>
            <View
              style={[
                styles.homeContainerBlk,
                styles.flexColumn,
                styles.alignStart,
                styles.mb12,
              ]}>
              <TouchableOpacity style={[styles.addHomeView, styles.mb12]}>
                <Text style={[styles.font13, styles.textPri]}>Home</Text>
              </TouchableOpacity>

              <View style={[styles.width100]}>
                <Controller
                  name='address'
                  control={control}
                  //rules={{ required: "Address is required." }}
                  render={(props) => (
                    <TextInput
                      multiline={true}
                      textAlignVertical='top'
                      numberOfLines={8}
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        styles.textArae,
                      ]}
                      placeholder='Address'
                      placeholderTextColor='#617191'
                      onChangeText={(address) => {
                        setAddress(address);
                        props.field.onChange(address);
                      }}
                      value={address}
                    />
                  )}
                />
                {errors && errors.address && (
                  <Text style={[styles.errorMsg]}>
                    {errors.address.message}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={[
                styles.homeContainerBlk,
                styles.flexColumn,
                styles.alignStart,
                styles.mb12,
              ]}>
              <TouchableOpacity style={[styles.addHomeView, styles.mb12]}>
                <Text style={[styles.font13, styles.textPri]}>
                  Office Address
                </Text>
              </TouchableOpacity>
              <View style={[styles.width100]}>
                <Controller
                  name='officeAddress'
                  control={control}
                  //rules={{ required: "Address1 is required." }}
                  render={(props) => (
                    <TextInput
                      multiline={true}
                      textAlignVertical='top'
                      numberOfLines={8}
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        styles.textArae,
                      ]}
                      placeholder='officeAddress'
                      placeholderTextColor='#617191'
                      onChangeText={(officeAddress) => {
                        setOfficeAddress(officeAddress);
                        props.field.onChange(officeAddress);
                      }}
                    />
                  )}
                />
                {errors && errors.officeAddress && (
                  <Text style={[styles.errorMsg]}>
                    {errors.officeAddress.message}
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}
