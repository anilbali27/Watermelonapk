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
import DropDown from "../../../assets/images/dashboard/dropdown";

import MultiSelect from "react-native-multiple-select";

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
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [orderApproval, setOrderApproval] = useState(false);
  const [defaultError, setDefaultError] = useState("");
  const [level, setLevel] = useState("");

  //multiselect
  const [show, setShow] = React.useState(false);
  const [selectedItems, setselectedItems] = React.useState([]);

  const [selectedProjects, setselectedProjects] = useState([]);
  const [DispalyName, setDispalyName] = useState([]);

  const onChange = (e, date) => {
    console.log("HEY THERE", e, date);
    setShow(false);
  };

  var array = [];

  const onSelectedItemsChange = async (selectedProjects) => {
    console.log("selectediems::", selectedProjects);
    setselectedProjects(selectedProjects);
    var filterName = levelArray.filter((item) =>
      selectedProjects.includes(item?.id)
    );
    await AsyncStorage.setItem("SelectedProjects", JSON.stringify(filterName));
    // alert(JSON.stringify(filterName));
    setDispalyName(filterName);
    console.log("900", filterName);
  };

  //checkbox
  // const [vat, setVat] = useState(false);
  const [b2bMarket, setB2bMarket] = useState(false);
  const [visibleB2B, setVisibleB2B] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [isoffline, setisOffline] = useState(false);

  const [defaultData, setDefaultData] = useState([]);
  const number = defaultData[0]?.default_setting?.mobile || "";
  const defaultemail = defaultData[0]?.default_setting?.email || "";
  const contactname = defaultData[0]?.default_setting?.contact || "";
  const contactnumber = defaultData[0]?.default_setting?.contact_number || "";
  const alternateemail = defaultData[0]?.default_setting?.contact_email || "";
  const alternateemail2 =
    defaultData[0]?.default_setting?.altername_email2 || " ";
  const accountdetails1 =
    defaultData[0]?.default_setting?.account_details || "";
  const accountdetails2 =
    defaultData[0]?.default_setting?.other_account_details || "";
  const vatnumber = defaultData[0]?.default_setting?.vat_percentage || " ";
  const descriptionofcompany =
    defaultData[0]?.default_setting?.description_of_company || "";

  const rfqemail = defaultData[0]?.default_setting?.rfq_email || "";
  const paytabsprofile =
    defaultData[0]?.default_setting?.paytabs_profile_ID || "";
  const marchantemail = defaultData[0]?.default_setting?.marchant_Email || "";
  const marchantsecretkey =
    defaultData[0]?.default_setting?.marchant_secret_Key || "";
  const vatinclude = defaultData[0]?.default_setting?.include_in_pricing || " ";

  console.log(contactname, "163");

  const [phoneNumber, setPhoneNumber] = useState(number);
  const [defaultEmail, setDefaultEmail] = useState(defaultemail);
  const [contactName, setContactName] = useState(contactname);
  const [contactNumber, setContactNumber] = useState(contactnumber);
  const [alternateEmail1, setAlternateEmail1] = useState(alternateemail);
  const [alternateEmail2, setAlternateEmail2] = useState(alternateemail2);
  const [accountDetails1, setAccountDetails1] = useState(accountdetails1);
  const [accountDetails2, setAccountDetails2] = useState(accountdetails2);
  const [vatNumber, setVatNumber] = useState(vatnumber);
  const [descriptionOfCompany, setDescriptionOfCompany] =
    useState(descriptionofcompany);
  const [rfqEmail, setrfqEmail] = useState(rfqemail);
  const [payTabsProfile, setPayTabsProfile] = useState(paytabsprofile);
  const [marchantEmail, setMarchantEmail] = useState(marchantemail);
  const [marchantSecretKey, setmarchantSecretKey] = useState(marchantsecretkey);
  // const [vatInclude, setVatInclude] = useState(vatinclude);
  const [vat, setVat] = useState("false");

  const [defaultId, setDefaultId] = useState("");

  const [name, setname] = useState("");
  console.log(name, "963");

  useEffect(() => {
    setPhoneNumber(number);
    setDefaultEmail(defaultemail);
    setContactName(contactname);
    setContactNumber(contactnumber);
    setAlternateEmail1(alternateemail);
    setAlternateEmail2(alternateemail2);
    setAccountDetails1(accountdetails1);
    setAccountDetails2(accountdetails2);
    setVatNumber(vatnumber);
    setDescriptionOfCompany(descriptionofcompany);
    setrfqEmail(rfqemail);
    setPayTabsProfile(paytabsprofile);
    setMarchantEmail(marchantemail);
    setmarchantSecretKey(marchantsecretkey);
  }, [
    number,
    defaultemail,
    contactname,
    contactnumber,
    alternateemail,
    alternateemail2,
    accountdetails1,
    accountdetails2,
    vatnumber,
    descriptionofcompany,
    marchantsecretkey,
  ]);

  const [supplierCategory, setSupplierCategory] = useState([]);
  console.log(defaultData[0]?._id, "212");

  // const levelArray = [
  //   {
  //     key: 0,
  //     label: "No item Found",
  //   },
  // ];

  const levelArray = supplierCategory.map((item, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      name: item.supplier_category_name,
      id: item._id,
    };
    return newData;
  });
  console.log("levelArray::", levelArray);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    getData();
    defaultSupplierData();
    supplierCategoryData();
  }, []);

  useEffect(() => {
    {
      supplierCategory._id === defaultId
        ? setname(supplierCategory.supplier_category_name)
        : " ";
    }
  }, [name]);

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
    const registrationNUmber = await AsyncStorage.getItem("registration_no");
    setRegistrationNumber(registrationNUmber);

    console.log(regNumber, "147");
  };

  const defaultSupplierData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      supplier_id: id,
    };
    const result = await api.getFilter(
      token,
      endPoint.supplier_default,
      myJson
    );
    if (result) {
      setDefaultData(result.data);
      // console.log(result.data, "124");
      // setDefaultId(result.data[0]?._id, "dataa");
      setDefaultId(result.data[0]?.category_info[0], "dataa");
    } else {
      setDefaultData({});
    }
  };

  const supplierCategoryData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      keyword: "",
      page: 1,
      sort_by: "",
      sort_method: "",
      status: 1,
    };
    const result = await api.getFilter(
      token,
      endPoint.supplier_category,
      myJson
    );
    if (result) {
      setSupplierCategory(result.data);
      // console.log(result.data, "124");
      console.log(result.data, "1281");
    } else {
      setSupplierCategory({});
    }
  };

  const handleSubmitPress = async (data) => {
    console.log(data, "pa");
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const userTypeId = await AsyncStorage.getItem("userTypeId");
    const userTypeNumber = await AsyncStorage.getItem("userType");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;
    var myJson = {
      default_setting: {
        CheckoutandPaytab: false,
        account_details: accountDetails1,
        altername_email2: alternateEmail2,
        contact: contactName,
        contact_email: alternateEmail1,
        contact_number: contactNumber,
        country_code: "+971",
        country_coded: "+971",
        description_of_company: descriptionOfCompany,
        display_for_b2c_buyer: true,
        email: defaultEmail,
        include_in_pricing: true,
        marchant_Email: marchantEmail,
        marchant_secret_Key: marchantSecretKey,
        mobile: phoneNumber,
        other_account_details: accountDetails2,
        participate_in_marketplace: true,
        paytabs_profile_ID: payTabsProfile,
        rfq_email: rfqEmail,
        vat_percentage: vatNumber,
        on_boarding_assigned_to: "test",
        on_boarding_assigned_to_name: "testname ",
        on_boarding_date: "2023",
        on_boarding_status: "active",
        platform: "mobile",
      },
      is_offline: false,
      user_id: "60784da77b60b7605a47a41c",
      user_type: 2,
      category_ids: array,
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
    { key: 1, label: "UAE (+971)" },
    { key: 2, label: "IND (+91)" },
  ];

  const countryCodelist = [
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
          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registration No.
            </Text>
            <View style={[styles.inputStyle, styles.ReadOnly]}>
              <TextInput
                style={[styles.padh0]}
                value={registrationNumber}
                readOnly={true}
              />
            </View>
          </View>

          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registered Phone No
            </Text>
            <View style={[styles.inputStyle, styles.ReadOnly]}>
              <TextInput
                style={[styles.padh0]}
                value={971 + " " + mobileNumber}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Registered Email
            </Text>
            <View style={[styles.inputStyle, styles.ReadOnly]}>
              <TextInput style={[styles.padh0]} value={email} readOnly={true} />
            </View>
          </View>

          {/* <View style={GlobalStyles.rowTwoInput}>
            <View style={GlobalStyles.defaultScreenCountryCodeSection}>
              <Text style={GlobalStyles.defaultScreenLabel}>
                Country Code{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.countryCode ? (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <DropDown style={[styles.modalDropDown]} />
                  ) : (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <DropDown style={[styles.modalDropDown]} />
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
                        selectStyle={[
                          styles.defaultSettingDropdownText,
                          errors.countryCode && styles.borderRed,
                        ]}
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
                </View>

                {errors.countryCode && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Country Code is required.
                  </Text>
                )}
              </View>
            </View>
            <View style={GlobalStyles.defaultScreenMobileNoSection}>
              <View style={GlobalStyles.mb11}>
                <Text style={GlobalStyles.defaultScreenLabel}>
                  Default Mobile No{" "}
                  <Text style={[styles.textred, styles.font13]}>*</Text>
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: { value: true },
                    pattern: {
                      value: /^[0-9]{9}$/,
                    },
                  }}
                  required
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        styles.inputStyle2,
                        errors.DefaultMobileNo && styles.borderRed,
                      ]}>
                      <TextInput
                        style={[styles.padh0]}
                        keyboardType='numeric'
                        maxLength={9}
                        placeholder=' Default Mobile No'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={defaultData[0]?.default_setting?.mobile}
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
          </View> */}

          <View style={[styles.imageIcon, styles.mb11]}>
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
                <View>
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
                Phone No
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='phoneNumber'
                  control={control}
                  // rules={{
                  //   required: "Phone Number is required.",
                  //   pattern: {
                  //     value: /^\d{9}$/,
                  //     message: "Phone Number is required.",
                  //   },
                  // }}
                  // rules={{ required: "Mobile number is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        // errors && errors.phoneNumber && styles.borderRed,
                      ]}
                      placeholder='Phone No'
                      keyboardType='numeric'
                      initValue={phoneNumber}
                      maxLength={9}
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(phoneNumber) => {
                        setPhoneNumber(phoneNumber);
                        props.field.onChange(phoneNumber);
                      }}
                      value={phoneNumber}
                    />
                  )}
                />
                {/* {errors && errors.phoneNumber && (
                  <Text style={[styles.errorMsg]}>
                    {errors.phoneNumber.message}
                  </Text>
                )} */}
              </View>
            </View>
          </View>

          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Default Email{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
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
                <View
                  style={[
                    styles.inputStyle2,
                    errors.DefaultEmail && styles.borderRed,
                  ]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='Default Email'
                    onBlur={onBlur}
                    onChangeText={(defaultEmail) => {
                      setDefaultEmail(defaultEmail);
                      props.field.onChange(defaultEmail);
                    }}
                    value={defaultEmail}
                    // onChangeText={onChange}
                    // value={defaultData[0]?.default_setting?.email}
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
          </View> */}
          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Default Email{" "}
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='DefaultEmail'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Default Email'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(defaultEmail) => {
                      setDefaultEmail(defaultEmail);
                      props.field.onChange(defaultEmail);
                    }}
                    value={defaultEmail}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
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
              Contact Name{" "}
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='ContactName'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Contact Name'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(contactName) => {
                      setContactName(contactName);
                      props.field.onChange(contactName);
                    }}
                    value={contactName}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={GlobalStyles.rowTwoInput}>
            <View style={GlobalStyles.defaultScreenCountryCodeSection}>
              <Text style={GlobalStyles.defaultScreenLabel}>
                Country Code{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.countryCode ? (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <View style={[styles.modalDropDown]}>
                      <DropDown />
                    </View>
                  ) : (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <View style={[styles.modalDropDownDefault]}>
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
                        selectStyle={[
                          styles.defaultSettingDropdownText,
                          errors.countryCode2 && styles.borderRed,
                        ]}
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
                            props.field.onChange(option.label);
                          }
                        }}></ModalSelector>
                    )}
                  />
                </View>

                {errors.countryCode2 && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Country Code is required.
                  </Text>
                )}
              </View>
            </View>
            <View style={GlobalStyles.defaultScreenMobileNoSection}>
              <View style={GlobalStyles.mb11}>
                <Text style={GlobalStyles.defaultScreenLabel}>
                  Contact No{" "}
                  <Text style={[styles.textred, styles.font13]}>*</Text>
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: { value: true },
                    pattern: {
                      value: /^[0-9]{9}$/,
                    },
                  }}
                  required
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        styles.inputStyle2,
                        errors.ContactNumber && styles.borderRed,
                      ]}>
                      <TextInput
                        style={[styles.padh0]}
                        keyboardType='numeric'
                        maxLength={9}
                        placeholder='Contact No'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={defaultData[0]?.default_setting?.contact_number}
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
          </View> */}

          <View style={[styles.imageIcon, styles.mb11]}>
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
                <View>
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
                Contact No{" "}
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='ContactNumber'
                  control={control}
                  // rules={{
                  //   required: "Phone Number is required.",
                  //   pattern: {
                  //     value: /^\d{9}$/,
                  //     message: "Phone Number is required.",
                  //   },
                  // }}
                  // rules={{ required: "Mobile number is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        // errors && errors.phoneNumber && styles.borderRed,
                      ]}
                      placeholder='Contact Number'
                      keyboardType='numeric'
                      maxLength={9}
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(contactNumber) => {
                        setContactNumber(contactNumber);
                        props.field.onChange(contactNumber);
                      }}
                      value={contactNumber}
                    />
                  )}
                />
                {/* {errors && errors.phoneNumber && (
                  <Text style={[styles.errorMsg]}>
                    {errors.phoneNumber.message}
                  </Text>
                )} */}
              </View>
            </View>
          </View>

          {/* <View style={GlobalStyles.mb11}>
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
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder=' Alternate Email1'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={defaultData[0]?.default_setting?.contact_email}
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
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Alternate Email1
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name=' AlternateEmail1'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Alternate Email1'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(defaultEmail) => {
                      setAlternateEmail1(alternateEmail1);
                      props.field.onChange(alternateEmail1);
                    }}
                    value={alternateEmail1}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
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
              Alternate Email2
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name=' AlternateEmail2'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Alternate Email2'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(defaultEmail) => {
                      setAlternateEmail2(alternateEmail2);
                      props.field.onChange(alternateEmail2);
                    }}
                    value={alternateEmail2}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Account Details 1
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='  Account Details 1'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={defaultData[0]?.default_setting?.account_details}
                  />
                </View>
              )}
              name='AccountDetails1'
            />
            {errors.AccountDetails1 && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Account Details 1 is reqiuired
              </Text>
            )}
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Account Details 1
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='AccountDetails1'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='  Account Details 1'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(accountDetails1) => {
                      setAccountDetails1(accountDetails1);
                      props.field.onChange(accountDetails1);
                    }}
                    value={accountDetails1}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
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
              Account Details 2
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='AccountDetails2'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Account Details2'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(accountDetails2) => {
                      setAccountDetails2(accountDetails2);
                      props.field.onChange(accountDetails2);
                    }}
                    value={accountDetails2}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Account Details 2
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='  Account Details 2'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={
                      defaultData[0]?.default_setting?.other_account_details
                    }
                  />
                </View>
              )}
              name='AccountDetails2'
            />
            {errors.AccountDetails2 && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Account Details 2 is reqiuired
              </Text>
            )}
          </View> */}
          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Onboarding Status{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View style={[styles.inputStyle, styles.ReadOnly]}>
              <TextInput
                style={[styles.padh0]}
                value={defaultData[0]?.on_boarding_status_name}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Onboarding Assign User{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View style={[styles.inputStyle, styles.ReadOnly]}>
              <TextInput
                style={[styles.padh0]}
                value={defaultData[0]?.on_boarding_assigned_to_name}
                readOnly={true}
              />
            </View>
          </View>
          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>VAT</Text>
            <Controller
              control={control}
              // rules={{
              //   required: { value: true },
              // }}
              // required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='VAT'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={defaultData[0]?.default_setting?.vat_percentage}
                  />
                </View>
              )}
              name='VAT'
            />
            {errors.VAT && (
              <Text style={{ color: "red", fontSize: 10 }}>
                VAT is reqiuired
              </Text>
            )}
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              VAT
            </Text>
            <View>
              <Controller
                name='VAT'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='  Account Details 1'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(vatNumber) => {
                      setVatNumber(vatNumber);
                      props.field.onChange(vatNumber);
                    }}
                    value={vatNumber}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* checkbox */}
          {/* <TouchableOpacity onPress={() => {}}>
            <View
              style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}></View>
          </TouchableOpacity> */}

          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setVat(!vat)}
                title='Include Vat In Pricing '
                isChecked={
                  defaultData[0]?.default_setting?.include_in_pricing == "true"
                    ? vat
                    : !vat
                }
                // isChecked={vat}
              />
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
              Description of Company
            </Text>
            <View>
              <Controller
                name=' DescriptionofCompany'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Description of Company'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(descriptionOfCompany) => {
                      setDescriptionOfCompany(descriptionOfCompany);
                      props.field.onChange(descriptionOfCompany);
                    }}
                    value={descriptionOfCompany}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Description of Company
            </Text>
            <Controller
              control={control}
              // rules={{
              //   required: { value: true },
              // }}
              // required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='Description of Company'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={
                      defaultData[0]?.default_setting?.description_of_company ||
                      ""
                    }
                  />
                </View>
              )}
              name=' DescriptionofCompany'
            />
            {errors.DescriptionofCompany && (
              <Text style={{ color: "red", fontSize: 10 }}>
                DescriptionofCompany is reqiuired
              </Text>
            )}
          </View> */}
          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              RFQ Email <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <Controller
              control={control}
              rules={{
                required: { value: true },
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputStyle2,
                    errors.RFQEmail && styles.borderRed,
                  ]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='RFQ Email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={defaultData[0]?.default_setting?.rfq_email || ""}
                  />
                </View>
              )}
              name='RFQEmail'
            />
            {errors.RFQEmail && (
              <Text style={{ color: "red", fontSize: 10 }}>
                RFQ Email is reqiuired
              </Text>
            )}
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              RFQ Email
            </Text>
            <View>
              <Controller
                name='RFQEmail'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='RFQ Email'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(rfqEmail) => {
                      setrfqEmail(rfqEmail);
                      props.field.onChange(rfqEmail);
                    }}
                    value={rfqEmail}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setB2bMarket(!b2bMarket)}
                title='Participate In B2B Marketplace'
                // isChecked={b2bMarket}
                isChecked={
                  defaultData[0]?.default_setting?.participate_in_marketplace ==
                  "true"
                    ? b2bMarket
                    : !b2bMarket
                }
              />
            </View>
          </View>
          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setVisibleB2B(!visibleB2B)}
                title='Visible For B2C Buyer In Market Place'
                // isChecked={visibleB2B}
                isChecked={
                  defaultData[0]?.default_setting?.display_for_b2c_buyer ==
                  "true"
                    ? visibleB2B
                    : !visibleB2B
                }
              />
            </View>
          </View>
          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setCheckout(!checkout)}
                title='Pay At Checkout'
                // isChecked={checkout}
                isChecked={
                  defaultData[0]?.default_setting?.display_for_b2c_buyer ==
                  "true"
                    ? checkout
                    : !checkout
                }
              />
            </View>
          </View>
          <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setisOffline(!isoffline)}
                title='Is Offline'
                // isChecked={isoffline}
                isChecked={
                  defaultData[0]?.is_offline == "true" ? isoffline : !isoffline
                }
              />
            </View>
          </View>
          {/* <View style={[GlobalStyles.mb11, GlobalStyles.marginTopFive]}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              {" "}
              PayTabs Profile Id
            </Text>
            <Controller
              control={control}
              // rules={{
              //   required: { value: true },
              // }}
              // required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='PayTabs Profile Id'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={
                      defaultData[0]?.default_setting?.paytabs_profile_ID || ""
                    }
                  />
                </View>
              )}
              name='PayTabsProfileId'
            />
            {errors.PayTabsProfileId && (
              <Text style={{ color: "red", fontSize: 10 }}>
                PayTabs Profile Id is reqiuired
              </Text>
            )}
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              PayTabs Profile Id
            </Text>
            <View>
              <Controller
                name='PayTabsProfileId'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='PayTabs Profile Id'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(payTabsProfile) => {
                      setPayTabsProfile(payTabsProfile);
                      props.field.onChange(payTabsProfile);
                    }}
                    value={payTabsProfile}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
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
              Marchant Email
            </Text>
            <View>
              <Controller
                name=' MarchantEmail'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder=' Marchant Email'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(marchantEmail) => {
                      setMarchantEmail(marchantEmail);
                      props.field.onChange(marchantEmail);
                    }}
                    value={marchantEmail}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={[GlobalStyles.mb11]}>
            <Text style={GlobalStyles.defaultScreenLabel}> Marchant Email</Text>
            <Controller
              control={control}
              // rules={{
              //   required: { value: true },
              // }}
              // required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder=' Marchant Email'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={
                      defaultData[0]?.default_setting?.marchant_Email || ""
                    }
                  />
                </View>
              )}
              name=' MarchantEmail'
            />
            {errors.MarchantEmail && (
              <Text style={{ color: "red", fontSize: 10 }}>
                Marchant Email is reqiuired
              </Text>
            )}
          </View> */}

          {/* <View style={[GlobalStyles.mb11]}>
            <Text style={GlobalStyles.defaultScreenLabel}>
              Marchant Secret Key
            </Text>
            <Controller
              control={control}
              // rules={{
              //   required: { value: true },
              // }}
              // required
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputStyle2]}>
                  <TextInput
                    style={[styles.padh0]}
                    placeholder='Marchant Secret Key'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={
                      defaultData[0]?.default_setting?.marchant_secret_Key || ""
                    }
                  />
                </View>
              )}
              name='MarchantSecretKey'
            />
            {errors.MarchantSecretKey && (
              <Text style={{ color: "red", fontSize: 10 }}>
                MarchantSecret Key is reqiuired
              </Text>
            )}
          </View> */}

          <View style={styles.mb11}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Marchant Secret Key
            </Text>
            <View>
              <Controller
                name='MarchantSecretKey'
                control={control}
                // rules={{ required: "name is required." }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      // errors && errors.Name && styles.borderRed,
                    ]}
                    placeholder='Marchant Secret Key'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(marchantSecretKey) => {
                      setmarchantSecretKey(marchantSecretKey);
                      props.field.onChange(marchantSecretKey);
                    }}
                    value={marchantSecretKey}
                  />
                )}
              />
              {/* {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )} */}
            </View>
          </View>

          {/* <View style={GlobalStyles.rowTwoInput}>
            <View style={GlobalStyles.defaultScreenCountryCodeSection}>
              <Text style={GlobalStyles.defaultScreenLabel}>
                Country Code{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.countryCode ? (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <DropDown style={[styles.modalDropDown]} />
                  ) : (
                    // <SvgUri
                    // source={require("../../../assets/images/dashboard/dropdown.svg")}
                    // style={[styles.modalDropDown]}
                    // />
                    <DropDown style={[styles.modalDropDown]} />
                  )}

                  <Controller
                    name="countryCode"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={(props) => (
                      <ModalSelector
                        data={countryCode}
                        selectStyle={[
                          styles.defaultSettingDropdownText,
                          errors.countryCode && styles.borderRed,
                        ]}
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
                        }}
                      ></ModalSelector>
                    )}
                  />
                </View>

                {errors.countryCode && (
                  <Text style={{ color: "red", fontSize: 10 }}>
                    Country Code is required.
                  </Text>
                )}
              </View>
            </View>
          </View> */}
          <View style={[styles.width100, styles.mb11]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Supplier Category
              {/* <Text style={[styles.font12, styles.textPri1]}>*</Text> */}
            </Text>
            <View>
              {/* <SvgUri
 source={require("../../../assets/images/dashboard/dropdown.svg")}
 style={[styles.modalDropDown]}
 /> */}
              <View>
                {/* <View style={[styles.modalDropDown]}>
                  <DropDown />
                </View>
                <ModalSelector
                  data={levelArray}
                  initValue={level}
                  selectStyle={[styles.inputStyle]}
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
                      setLevel(option.label);
                      console.log("LEVEL:::", option.label);
                      // props.field.onChange(marchantSecretKey);
                      // props.field.onChange(option.label);
                    }
                  }}
                /> */}

                <MultiSelect
                  hideTags
                  items={levelArray}
                  uniqueKey='id'
                  onSelectedItemsChange={(item) => onSelectedItemsChange(item)}
                  selectedItems={DispalyName}
                  selectText='Pick Items'
                  searchInputPlaceholderText='Search Items...'
                  onChangeInput={(text) => console.log(text)}
                  altFontFamily='ProximaNova-Light'
                  tagRemoveIconColor='#CCC'
                  tagBorderColor='#CCC'
                  tagTextColor='#CCC'
                  selectedItemTextColor='#CCC'
                  selectedItemIconColor='#CCC'
                  itemTextColor='#000'
                  displayKey='name'
                  searchInputStyle={{ color: "#CCC" }}
                  submitButtonColor='#CCC'
                  submitButtonText='Submit'
                />
                <View>
                  {DispalyName?.map((item) => (
                    <View>
                      <Text>{item?.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
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
          {/* <View style={GlobalStyles.mb11}>
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
              }}
            >
              <TextInput
                style={{ paddingLeft: 10 }}
                value="cofinadxb@gmail.com"
                readOnly={true}
              />
            </View>
          </View>

          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>Address</Text>
            <View style={[styles.inputStyle]}>
              <TextInput
                style={[styles.padh0]}
                value={address}
                readOnly={true}
              />
            </View>
          </View>
          <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>Modified</Text>
            <View style={[styles.inputStyle]}>
              <TextInput
                style={[styles.padh0]}
                value={updatedBy}
                readOnly={true}
              />
            </View>
          </View> */}
          {/* <View style={GlobalStyles.mb11}>
            <Text style={GlobalStyles.defaultScreenLabel}>Modified Date</Text>
            <View style={[styles.inputStyle]}>
              <TextInput
                style={[styles.padh0]}
                value={date}
                readOnly={true}
              />
            </View>
          </View> */}
          {/* <TextBoxAccount
 label='Modified Date'
 type='text'
 readOnly={true}
 value={updatedAt}
 control={control}
 name='ModifiedDate'
 /> */}
          {/* <View style={GlobalStyles.flexSection}>
            <View style={GlobalStyles.checkboxContainer}>
              <CheckBox
                onPress={() => setOrderApproval(!orderApproval)}
                title="Order approval is not required for the BuyerMe"
                isChecked={orderApproval}
              />
            </View>
          </View> */}
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
              // onPress={() => {
              //   console.log("presed");
              // }}
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
              onPress={() => navigation.goBack()}>
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
            Default setting Updated successfully
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
              onPress={() => navigation.goBack()}
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}>
              <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>
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
