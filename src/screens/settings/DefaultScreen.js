/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import GlobalStyles from "../../../assets/css/styles";
import styles from "../../../assets/css/styles";
import RBSheet from "react-native-raw-bottom-sheet";

import CheckBox from "../../components/form/CheckBox";
import TextBoxAccount from "../../components/form/TextBoxAccount";
import ModalSelector from "react-native-modal-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import moment from "moment";
import DropDown from "../../../assets/images/icons/DropDown";

import { useForm, Controller } from "react-hook-form";

const DefaultScreen = ({ navigation }) => {
  const [countryCode1, setcountryCode] = useState("Select");
  const [countrykey, setcountrykey] = useState("Select");

  const [countryCode2, setcountryCode2] = useState("Select");
  const [countrykey2, setcountrykey2] = useState("Select");
  const [regNo, setRegNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileCode, setMobileCode] = useState("");
  const [email, setEmail] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [address, setAddress] = useState("");
  const [orderApproval, setOrderApproval] = useState(false);
  const [defaultError, setDefaultError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    getData();
  }, []);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const date = moment(updatedAt).format("YYYY-MM-DD");
  console.log(date, "ooooo9");

  const getData = async () => {
    const regNumber = await AsyncStorage.getItem("registration_no");
    setRegNo(regNumber);
    const mobCode = await AsyncStorage.getItem("mobileCode");
    setMobileCode(mobCode);
    const mobNUmber = await AsyncStorage.getItem("mobileNumber");
    setMobileNumber(mobNUmber);
    const email = await AsyncStorage.getItem("email");
    setEmail(email);
    const updatedBy = await AsyncStorage.getItem("updatedBy");
    setUpdatedBy(updatedBy);
    const updatedAt = await AsyncStorage.getItem("updatedAt");
    setUpdatedAt(updatedAt);
    const address = await AsyncStorage.getItem("address");
    setAddress(address);
    console.log(regNumber, "147");
  };

  const handleSubmitPress = async (data) => {
    console.log(data, "pa");
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const userTypeId = await AsyncStorage.getItem("userTypeId");
    const userTypeNumber = await AsyncStorage.getItem("userType");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;
    var myJson = {
      user_id: userTypeId,
      user_type: userTypeNumber,
      default_setting: {
        email: data.DefaultEmail,
        country_code: "+9711",
        mobile: data.DefaultMobileNo,
        contact: data.ContactName,
        country_coded: "+971",
        contact_number: data.ContactNo,
        altername_email1: data.AlternateEmail1,
        altername_email2: data.AlternateEmail2,
      },
    };
    console.log(myJson, "mydataa");
    const result = await api.getorderslist(
      token,
      endPoint.update_defaultSetting,
      myJson
    );
    // alert("hi");
    console.log(result.message, "MESSAGE");
    if (result.success === "1") {
      refRBSheet.current.open();
      console.log(result, "runninggggggggg");
    } else {
      setDefaultError(result.message);
      refRBSheet1.current.open();

      console.error(errors, "error");
    }
  };

  const countryCode = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
    { key: 2, label: "IND (+91)" },
  ];

  const countryCodelist = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
    { key: 2, label: "IND (+91)" },
  ];

  const handleButton = () => {
    handleSubmit(handleSubmitPress);
  };

  return (
    <ScrollView>
      <View style={GlobalStyles.defaultScreenContainer}>
        <View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registration No.
            </Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={regNo}
                readOnly={true}
              />
            </View>
          </View>

          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registered Phone No
            </Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={mobileCode + " " + mobileNumber}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registered Email
            </Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={email}
                readOnly={true}
              />
            </View>
          </View>

          <View style={GlobalStyles.rowTwoInput}>
            <View style={GlobalStyles.defaultScreenCountryCodeSection}>
              <Text style={GlobalStyles.defaultScreenLabel}>Country Code*</Text>
              <View>
                {errors.countryCode ? (
                  // <SvgUri
                  // source={require("../../../assets/images/dashboard/dropdown.svg")}
                  // style={[styles.pressedmodalDropDown]}
                  // />
                  <View style={[styles.pressedmodalDropDown]}>
                    <DropDown />
                  </View>
                ) : (
                  // <SvgUri
                  // source={require("../../../assets/images/dashboard/dropdown.svg")}
                  // style={[styles.modalDropDown]}
                  // />
                  <View style={[styles.modalDropDown]}>
                    <DropDown />
                  </View>
                )}

                <Controller
                  name='countryCode'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={(props) => (
                    <ModalSelector
                      data={countryCode}
                      selectStyle={[styles.defaultSettingDropdownText]}
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
                      initValue={countrykey}
                      selectedKey={countrykey}
                      value={countryCode1}
                      onChange={(option) => {
                        if (option.key) {
                          setcountryCode(option.label);
                          setcountrykey(option.label);
                          props.field.onChange(option.key);
                        }
                      }}></ModalSelector>
                  )}
                />

                {errors.countryCode && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Country Code is required.
                  </Text>
                )}
              </View>
            </View>
            <View style={GlobalStyles.defaultScreenMobileNoSection}>
              <View style={GlobalStyles.inputView}>
                <Text style={GlobalStyles.defaultScreenLabel}>
                  Default Mobile No*
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: { value: true },
                    pattern: {
                      value: /^[0-9]{10}$/,
                    },
                  }}
                  required
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.defaultSettingInputView2]}>
                      <TextInput
                        style={[styles.defaultSettingInputText]}
                        placeholder=' Default Mobile No'
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                  name='DefaultMobileNo'
                />
                {errors.DefaultMobileNo && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Default Mobile Number is reqiuired
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Default Email*</Text>
            <Controller
              control={control}
              rules={{
                required: { value: true },
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                },
              }}
              required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.defaultSettingInputView2]}>
                  <TextInput
                    style={[styles.defaultSettingInputText]}
                    placeholder='Default Email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
              )}
              name='DefaultEmail'
            />
            {errors.DefaultEmail && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Default Email is reqiuired
              </Text>
            )}
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Contact Name*</Text>
            <Controller
              control={control}
              rules={{
                required: { value: true },
              }}
              required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.defaultSettingInputView2]}>
                  <TextInput
                    style={[styles.defaultSettingInputText]}
                    placeholder='Contact Name'
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
              )}
              name='ContactName'
            />
            {errors.ContactName && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Contact Name is reqiuired
              </Text>
            )}
          </View>
          <View style={GlobalStyles.rowTwoInput}>
            <View style={GlobalStyles.defaultScreenCountryCodeSection}>
              <Text style={GlobalStyles.defaultScreenLabel}>
                Country Code1*
              </Text>
              <View>
                {errors.countryCode ? (
                  // <SvgUri
                  // source={require("../../../assets/images/dashboard/dropdown.svg")}
                  // style={[styles.pressedmodalDropDown]}
                  // />
                  <View style={[styles.pressedmodalDropDown]}>
                    <DropDown />
                  </View>
                ) : (
                  // <SvgUri
                  // source={require("../../../assets/images/dashboard/dropdown.svg")}
                  // style={[styles.modalDropDown]}
                  // />
                  <View style={[styles.modalDropDown]}>
                    <DropDown />
                  </View>
                )}

                <Controller
                  name='countryCode2'
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={(props) => (
                    <ModalSelector
                      data={countryCodelist}
                      selectStyle={[styles.defaultSettingDropdownText]}
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
                      initValue={countrykey2}
                      selectedKey={countrykey2}
                      value={countryCode2}
                      onChange={(option) => {
                        if (option.key) {
                          setcountryCode2(option.label);
                          setcountrykey2(option.label);
                          props.field.onChange(option.key);
                        }
                      }}></ModalSelector>
                  )}
                />

                {errors.countryCode2 && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Country Code is required.
                  </Text>
                )}
              </View>
            </View>
            <View style={GlobalStyles.defaultScreenMobileNoSection}>
              <View style={GlobalStyles.inputView}>
                <Text style={GlobalStyles.defaultScreenLabel}>Contact No*</Text>
                <Controller
                  control={control}
                  rules={{
                    required: { value: true },
                    pattern: {
                      value: /^[0-9]{10}$/,
                    },
                  }}
                  required
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.defaultSettingInputView2]}>
                      <TextInput
                        style={[styles.defaultSettingInputText]}
                        placeholder='Contact No'
                        onBlur={onBlur}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                  name='ContactNumber'
                />
                {errors.ContactNumber && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Contact Number is reqiuired
                  </Text>
                )}
              </View>
            </View>
          </View>
          {/* <View>
 <TextBoxAccount
 label='Default Email*'
 placeholder='Default Email'
 readOnly={false}
 control={control}
 name='DefaultEmail'
 rules={{
 required: { value: true },
 pattern: {
 value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
 },
 }}
 required
 />
 {errors.DefaultEmail && (
 <Text style={{ color: "red", fontSize: 10, marginTop: -5 }}>
 Default Email is reqiuired
 </Text>
 )}
 </View> */}
          {/* <View>
 <TextBoxAccount
 label='Contact Name*'
 placeholder='Contact Name'
 readOnly={false}
 type='text'
 control={control}
 name='ContactName'
 rules={{
 required: { value: true },
 pattern: {
 value: /^[a-zA-Z]+$/,
 },
 }}
 required
 />
 {errors.ContactName && (
 <Text style={{ color: "red", fontSize: 10, marginTop: -5 }}>
 Contact Name is reqiuired
 </Text>
 )}
 </View> */}

          {/* <View style={GlobalStyles.rowTwoInput}>
 <View style={GlobalStyles.defaultScreenCountryCodeSection}>
 <Text style={GlobalStyles.defaultScreenLabel}>Country Code*</Text>
 <View>
 <SvgUri
 source={require("../../../assets/images/dashboard/dropdown.svg")}
 style={[styles.modalDropDown]}
 />
 <ModalSelector
 data={countryCode}
 initValue={countrykey}
 selectStyle={[styles.defaultSettingDropdownText]}
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
 onChange={(option) => {
 if (option.key) {
 setcountryCode(option.label);
 setcountrykey(option.label);
 }
 }}
 />
 </View>
 </View>
 <View style={GlobalStyles.defaultScreenMobileNoSection}>
 <TextBoxAccount
 label='Contact No*'
 placeholder='Contact No'
 readOnly={false}
 name='ContactNo'
 control={control}
 rules={{
 required: { value: true },
 pattern: {
 value: /^[0-9]{10}$/,
 },
 }}
 required
 />
 {errors.ContactNo && (
 <Text style={{ color: "red", fontSize: 10, marginTop: -5 }}>
 Contact Number is reqiuired
 </Text>
 )}
 </View>
 </View> */}
          {/* <View>
 <TextBoxAccount
 label='Alternate Email1'
 placeholder='Alternate Email1'
 readOnly={false}
 control={control}
 name='AlternateEmail1'
 rules={{
 required: { value: true },
 pattern: {
 value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
 },
 }}
 required
 />
 {errors.AlternateEmail1 && (
 <Text style={{ color: "red", fontSize: 10, paddingTop: -10 }}>
 AlternateEmail1 is reqiuired
 </Text>
 )}
 </View> */}
          {/* <View>
 <TextBoxAccount
 label='Alternate Email2'
 placeholder='Alternate Email2'
 readOnly={false}
 control={control}
 name='AlternateEmail2'
 rules={{
 required: { value: true },
 pattern: {
 value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
 },
 }}
 required
 />
 {errors.AlternateEmail2 && (
 <Text style={{ color: "red", fontSize: 10, marginTop: -10 }}>
 AlternateEmail2 is reqiuired
 </Text>
 )}
 </View> */}
          {/* <View>
 <Text style={GlobalStyles.defaultScreenLabel}>Credits</Text>
 <View style={GlobalStyles.fullWidthDropDown}>
 <Dropdown
 label='Select Credits'
 data={countryCode}
 ref={creditInput}
 onSelect={setCountry}
 />
 </View>
 </View> */}
          {/* <TextBoxAccount
 control={control}
 value='904984'
 name='POBox'
 type='number'
 readOnly={true}
 label='PO Box'
 /> */}
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Alternate Email1
            </Text>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.defaultSettingInputView2]}>
                  <TextInput
                    style={[styles.defaultSettingInputText]}
                    placeholder=' Alternate Email1'
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
              )}
              name=' AlternateEmail1'
            />
            {errors.AlternateEmail1 && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Alternate Email1 is reqiuired
              </Text>
            )}
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Alternate Email2
            </Text>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.defaultSettingInputView2]}>
                  <TextInput
                    style={[styles.defaultSettingInputText]}
                    placeholder=' Alternate Email2'
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
              )}
              name=' AlternateEmail2'
            />
            {errors.AlternateEmail1 && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Alternate Email1 is reqiuired
              </Text>
            )}
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>PO Box</Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value='904984'
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Business Type</Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value='Dine In'
                readOnly={true}
              />
            </View>
          </View>
          {/* <TextBoxAccount
 control={control}
 value='Dine In'
 name='Business Type'
 type='text'
 readOnly={true}
 label='Business Type'
 /> */}
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Email</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: 39,
                backgroundColor: "#F6F5F5",
                borderColor: "#DCDCDC",
                borderWidth: 1,
                marginBottom: 4,
                paddingLeft: 0,
              }}>
              <TextInput
                style={{ paddingLeft: 10 }}
                value='cofinadxb@gmail.com'
                readOnly={true}
              />
            </View>
          </View>

          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Address</Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={address}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Modified</Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={updatedBy}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.defaultScreenLabel}>Modified Date</Text>
            <View style={[styles.defaultSettingInputView]}>
              <TextInput
                style={[styles.defaultSettingInputText]}
                value={date}
                readOnly={true}
              />
            </View>
          </View>
          {/* <TextBoxAccount
 label='Modified Date'
 type='text'
 readOnly={true}
 value={updatedAt}
 control={control}
 name='ModifiedDate'
 /> */}
          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setOrderApproval(!orderApproval)}
                title='Order approval is not required for the BuyerMe'
                isChecked={orderApproval}
              />
            </View>
          </View>
        </View>

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
              onPress={handleSubmit(handleSubmitPress)}
              // onPress={handleButton()}
            >
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
              onPress={() => {}}>
              <Text style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
            Default setting successfully
          </Text>

          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => [navigation.goBack(), refRBSheet.current.close()]}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => [
                  refRBSheet.current.close(),
                  navigation.goBack(),
                ]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            {defaultError}
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
    </ScrollView>
  );
};

export default DefaultScreen;

// import React from "react";
// import { View, Text } from "react-native";

// export default function DefaultScreen({ navigation }) {
// return (
// <View>
// <Text>DefaultScreen</Text>
// </View>
// );
// }
