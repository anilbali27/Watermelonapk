/** @format */

import { useState, useEffect, useReducer, useCallback, useRef } from "react";
import React, {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  default as GlobalStyles,
  default as styles,
} from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import DropDown from "../../../assets/images/icons/DropDown";
import LeftArrow from "../../../assets/signup/LeftArrow";

// import SvgUri from "react-native-svg-uri-updated";
import { Button } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import ModalSelector from "react-native-modal-selector";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countrycodelist from "../../components/CountryCode";
import SplashIcon from "../../../assets/images/dashboard/splash_icon";
import EyeIcon1 from "../../../assets/jsx/eyeIcon";

const AddUser = ({ navigation, props }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyRegNo, setCompanyRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setuserError] = useState("");

  const EMAIL_REGEX =
    /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]/;
  const [trnNo, setTrnNo] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [countrykey, setcountrykey] = useState("");
  const [city, setCity] = useState("");
  const [cityKey, setCityKey] = useState("");
  const [countryCodekey, setcountryCodekey] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [designation, setDesignation] = useState("");
  const [assignRoleData, setAssignRoleData] = useState([]);
  const [assignRole, setAssignRole] = useState("");
  const [assignRoleKey, setAssignRoleKey] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  const [rightIcon, setRightIcon] = useState(
    require("../../../assets/images/dashboard/eye_splash_icon.svg")
  );
  const [rightIcon1, setRightIcon1] = useState(
    require("../../../assets/images/dashboard/eye_splash_icon.svg")
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const PASSWORD_REGEX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{4,}$/;
  const [level, setLevel] = useState("");
  const [getNotifiedWhen, setGetNotifiedWhen] = useState("");
  const [countrycityList, setCountrycityList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [roleid, setRoleid] = useState("");

  const businesstypearray = [
    { name: "Fast Food" },
    { name: "Take Out" },
    { name: "Dine In" },
    { name: "Gourmet" },
    { name: "Bistro" },
    { name: "Buffet" },
    { name: "Cafe" },
    { name: "Healthy Foods" },
    { name: "Artisan" },
    { name: "others" },
  ];
  const levelArray = [{ key: 0, label: "1" }];
  const getNotifiedWhenArray = [{ key: 0, label: "All" }];

  // country code date
  const CountryCodeData = [
    { key: 0, label: "Select" },
    { key: 1, label: "UAE (+971)" },
  ];
  //password hide and show
  const handlePasswordVisibility = () => {
    if (rightIcon1 === "eye") {
      setRightIcon1("eye-off");
    } else {
      setRightIcon1("eye");
    }
    setPasswordVisibility(!passwordVisibility);
  };
  //confirm password hide and show
  const handlePasswordVisibility1 = () => {
    if (rightIcon1 === "eye") {
      setRightIcon1("eye-off");
    } else {
      setRightIcon1("eye");
    }
    setPasswordVisibility1(!passwordVisibility1);
  };
  //Get Country and City List
  useEffect(() => {
    getAllCountryList();
    getAllRoleList();
  }, []);

  const getAllCountryList = async () => {
    let token = await AsyncStorage.getItem("UserToken");
    let myJson = {};
    const result = await api.CreateMasterData(
      endPoint.get_country,
      token,
      myJson
    );
    console.log("API LIst Data:::", result.data);
    setCountrycityList(result.data);
  };
  //Filter Country Data
  const filtercountrylist = countrycityList.filter((item, index) => {
    if (item?.dependent_value == "United Arab Emirates") {
      let newData = {
        key: index + 1,
        label: item?.dependent_value,
        value: item?.dependent_value,
      };
      return newData;
    }
  });

  //Extract Duplicate Country Data
  const uniqueIds = [];
  const uniqueCountryName =
    filtercountrylist &&
    filtercountrylist.filter((element) => {
      // console.log("elementelement::", element)
      const isDuplicate = uniqueIds.includes(element?.dependent_value);

      if (!isDuplicate) {
        uniqueIds.push(element.dependent_value);
        return true;
      }
      return false;
    });
  //Mapping Country Data
  const filteredCountryListArray = uniqueCountryName.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item?.dependent_value,
      value: item?.dependent_value,
    };
    return newData;
  });
  //Mapping City Data
  const filterCity = cityList.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item.value,
      value: item.value,
    };
    return newData;
  });
  //Filter Country Code
  const filtercountrycode = countrycodelist.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item.dial_code,
      value: item.dial_code,
    };
    return newData;
  });

  //Filter Business Type
  const filterbusinesstype = businesstypearray.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item.name,
      value: item.name,
    };
    return newData;
  });
  const getAllRoleList = async () => {
    let token = await AsyncStorage.getItem("UserToken");
    let myJson = {
      page: 1,
      fetch: 10,
    };
    const result = await api.CreateMasterData(
      endPoint.role_list,
      token,
      myJson
    );
    // console.log(result.data)
    setAssignRoleData(result.data?.roles);
  };
  //Extract Duplicate Roles
  const duplicateRole = [];
  const uniqueRoleName = assignRoleData?.filter((element) => {
    const isDuplicate = duplicateRole?.includes(element?.name);
    if (!isDuplicate) {
      duplicateRole.push(element?.name);
      return true;
    }
    return false;
  });
  // //Map Role Data
  const AssignRoleArray = uniqueRoleName?.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item?.name,
      value: item?._id,
    };
    return newData;
  });

  //On Submit Add User Form
  const onSubmit = async () => {
    // if (password != confirmPassword) {
    // setPasswordMatch(true);
    // }
    let tierapproval = await AsyncStorage.getItem("tierapproval");
    let usertype = await AsyncStorage.getItem("userType");
    let usertypeId = await AsyncStorage.getItem("userTypeId");
    let token = await AsyncStorage.getItem("UserToken");

    var myJson = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone_number: mobileNo,
      designation: designation,
      permission_role_id: assignRoleKey,
      tier_approval: tierapproval,
      value_from: "",
      value_to: "",
      level: level,
      password: password,
      confirmpassword: confirmPassword,
      notified: getNotifiedWhen,
      profile: null,
      user_type: parseInt(usertype),
      user_type_id: usertypeId,
      // user_type_id: "64476daa20d63f006b00b854",

      mobile_no_code: countryCodekey,
      address: address,
      country: country,
      city: city,
      company_name: companyName,
      company_registration_no: companyRegNo,
      business_type: businessType,
      TRN_No: trnNo,
      license: null,
      TRN_certificate: null,
      role_id: roleid,
    };
    const result = await api.CreateMasterData(
      endPoint.create_user,
      token,
      myJson
    );
    console.log("resultresultresult::", result.success);
    if (result.success === "1") {
      refRBSheet.current.open();
    } else {
      setuserError(result.message);
      refRBSheet1.current.open();
    }
  };

  // ---------------------------------------------------- User Interface -------------------------------------------------
  return (
    <>
      <View style={[styles.width100, styles.flex1]}>
        <ScrollView style={[styles.grayBg, styles.width100]}>
          {/* Header Starts */}

          <View
            style={[
              styles.addUserHeader,
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
              {/* <LeftArrow /> */}
              <BackArrow />
            </TouchableOpacity>
            <Text
              style={[
                styles.font16,
                styles.textWhite,
                styles.padl15,
                styles.fontMed,
              ]}>
              {" "}
              Add User{" "}
            </Text>
          </View>
          {/* Header Ends */}

          <View style={[styles.ph18, styles.mb18, styles.width100]}>
            {/* First Name Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                First Name{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='firstName'
                  control={control}
                  rules={{
                    required: "First Name is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.firstName && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(firstName) => {
                        setFirstName(firstName);
                        props.field.onChange(firstName);
                      }}
                      value={firstName}
                    />
                  )}
                />
                {errors && errors.firstName && (
                  <Text style={[styles.errorMsg]}>First Name is required.</Text>
                )}
              </View>
            </View>
            {/* First Name Field Ends*/}

            {/* Last Name Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Last Name <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{
                    required: "First Name is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.lastName && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(lastName) => {
                        setlastName(lastName);
                        props.field.onChange(lastName);
                      }}
                      value={lastName}
                    />
                  )}
                />
                {errors && errors.lastName && (
                  <Text style={[styles.errorMsg]}>Last Name is required.</Text>
                )}
              </View>
            </View>
            {/* Last Name Field Ends*/}

            {/* Company Name Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Company Name{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='companyName'
                  control={control}
                  rules={{
                    required: "Company Name is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.companyName && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(companyName) => {
                        setCompanyName(companyName);
                        props.field.onChange(companyName);
                      }}
                      value={companyName}
                    />
                  )}
                />
                {errors && errors.companyName && (
                  <Text style={[styles.errorMsg]}>
                    Company Name is required.
                  </Text>
                )}
              </View>
            </View>
            {/* Company Name Field Ends*/}

            {/* Company Registration No Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Company Registration No{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='companyRegNo'
                  control={control}
                  rules={{
                    required: "Company Registration No. is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.companyRegNo && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(companyRegNo) => {
                        setCompanyRegNo(companyRegNo);
                        props.field.onChange(companyRegNo);
                      }}
                      value={companyRegNo}
                    />
                  )}
                />
                {errors && errors.companyRegNo && (
                  <Text style={[styles.errorMsg]}>
                    Company Registration No. is required.
                  </Text>
                )}
              </View>
            </View>
            {/* Company Registration No Field Ends*/}

            {/* Email Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Email <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='email'
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: EMAIL_REGEX,
                      message: "Email is Invalid",
                    },
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.email && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(email) => {
                        setEmail(email);
                        props.field.onChange(email);
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
            {/* Email Field Ends*/}

            {/* TRN No. Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                TRN No <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='trnNo'
                  control={control}
                  rules={{
                    required: "TRN No. is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.trnNo && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(trnNo) => {
                        setTrnNo(trnNo);
                        props.field.onChange(trnNo);
                      }}
                      value={trnNo}
                    />
                  )}
                />
                {errors && errors.trnNo && (
                  <Text style={[styles.errorMsg]}>TRN No. is required.</Text>
                )}
              </View>
            </View>
            {/* TRN No. Field Ends*/}

            {/* Address Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Address <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='address'
                  control={control}
                  rules={{
                    required: "Address is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.address && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(address) => {
                        setAddress(address);
                        props.field.onChange(address);
                      }}
                      value={address}
                    />
                  )}
                />
                {errors && errors.address && (
                  <Text style={[styles.errorMsg]}>Address is required.</Text>
                )}
              </View>
            </View>
            {/* Address Field Ends*/}

            {/* Country Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Country <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.country ? (
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
                    <View style={[styles.pressedmodalDropDown]}>
                      <DropDown />
                    </View>
                  )}

                  <Controller
                    name='country'
                    control={control}
                    rules={{ required: "Country is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={filteredCountryListArray}
                        initValue={countrykey}
                        selectStyle={[
                          styles.ModStyle,
                          errors && errors.country && styles.borderRed,
                          styles.height39,
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
                            setCountry(option.label);
                            setcountrykey(option.label);
                            props.field.onChange(option.label);
                            setCityList(filtercountrylist);
                          }
                        }}
                        value={countrykey}
                      />
                    )}
                  />
                </View>
                {errors && errors.country && (
                  <Text style={[styles.errorMsg]}>
                    {errors.country.message}
                  </Text>
                )}
              </View>
            </View>
            {/* Country Field Ends */}

            {/* City Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                City <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.city ? (
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
                    <View style={[styles.pressedmodalDropDown]}>
                      <DropDown />
                    </View>
                  )}

                  <Controller
                    name='city'
                    control={control}
                    rules={{ required: "City is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={filterCity}
                        initValue={cityKey}
                        selectStyle={[
                          styles.ModStyle,
                          errors && errors.city && styles.borderRed,
                          styles.height39,
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
                            setCity(option.label);
                            setCityKey(option.label);
                            props.field.onChange(option.label);
                          }
                        }}
                      />
                    )}
                  />
                </View>
                {errors && errors.city && (
                  <Text style={[styles.errorMsg]}>{errors.city.message}</Text>
                )}
              </View>
            </View>
            {/* City Field Ends */}

            {/* Country Code and Mobile No Fields */}
            <View style={[styles.imageIcon, styles.mb11]}>
              <View style={[styles.width40, styles.padR7]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Country Code{" "}
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
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
                      <View style={[styles.pressedmodalDropDown]}>
                        <DropDown />
                      </View>
                    )}

                    <Controller
                      name='countryCode'
                      control={control}
                      rules={{ required: "Country code is required." }}
                      render={(props) => (
                        <ModalSelector
                          data={filtercountrycode}
                          initValue={countryCodekey}
                          selectStyle={[
                            styles.ModStyle,
                            errors && errors.countryCode && styles.borderRed,
                            styles.height39,
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
                          value={countryCodekey}
                          optionContainerStyle={[styles.width300px]}
                          cancelStyle={[styles.width300px, styles.marHorauto]}
                          optionTextStyle={[styles.textBlack, styles.font15]}
                          cancelTextStyle={[styles.textBlack, styles.font15]}
                          onChange={(option) => {
                            if (option.key) {
                              setcountryCodekey(option.value);
                              props.field.onChange(option.value);
                            }
                          }}
                        />
                      )}
                    />
                  </View>
                  {errors && errors.countryCode && (
                    <Text style={[styles.errorMsg]}>
                      {errors.countryCode.message}
                    </Text>
                  )}
                </View>
              </View>
              <View style={[styles.width60]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Mobile No{" "}
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  <Controller
                    name='mobileNumber'
                    control={control}
                    rules={{ required: "Mobile number is required." }}
                    render={(props) => (
                      <TextInput
                        style={[
                          styles.textInpMobileAddUser,
                          styles.height39,
                          errors && errors.mobileNumber && styles.borderRed,
                        ]}
                        // placeholder="Mobile No"
                        keyboardType='numeric'
                        maxLength={10}
                        placeholderTextColor='#222B2E'
                        onChangeText={(mobileNumber) => {
                          setMobileNo(mobileNumber);
                          props.field.onChange(mobileNumber);
                        }}
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
            {/* Country Code and Mobile No Fields Ends */}

            {/* Business Type Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Select Business Type{" "}
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.businessType ? (
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
                    <View style={[styles.pressedmodalDropDown]}>
                      <DropDown />
                    </View>
                  )}

                  <Controller
                    name='businessType'
                    control={control}
                    rules={{ required: "Business Type is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={filterbusinesstype}
                        initValue={businessType}
                        selectStyle={[
                          styles.ModStyle,
                          errors && errors.businessType && styles.borderRed,
                          styles.height39,
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
                            setBusinessType(option.label);
                            props.field.onChange(option.label);
                          }
                        }}
                      />
                    )}
                  />
                </View>
                {errors && errors.businessType && (
                  <Text style={[styles.errorMsg]}>
                    {errors.businessType.message}
                  </Text>
                )}
              </View>
            </View>
            {/* Business Type Field Ends */}

            {/* Designation Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Designation{" "}
                <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='designation'
                  control={control}
                  rules={{
                    required: "Designation is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.designation && styles.borderRed,
                      ]}
                      placeholderTextColor='#222B2E'
                      onChangeText={(designation) => {
                        setDesignation(designation);
                        props.field.onChange(designation);
                      }}
                      value={designation}
                    />
                  )}
                />
                {errors && errors.designation && (
                  <Text style={[styles.errorMsg]}>
                    Designation is required.
                  </Text>
                )}
              </View>
            </View>
            {/* Designation Field Ends*/}

            {/* Assign Role Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Assign Role{" "}
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  {errors.businessType ? (
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
                    <View style={[styles.pressedmodalDropDown]}>
                      <DropDown />
                    </View>
                  )}

                  <Controller
                    name='assignRole'
                    control={control}
                    rules={{ required: "Assign Role is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={AssignRoleArray}
                        initValue={assignRole}
                        selectStyle={[
                          styles.ModStyle,
                          errors && errors.assignRole && styles.borderRed,
                          styles.height39,
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
                            setAssignRole(option.label);
                            setAssignRoleKey(option.value);
                            props.field.onChange(option.label);
                            console.log("option.label", option.label);
                            if (option.label == "Admin") {
                              setRoleid("0");
                            } else if (option.label == "Basic") {
                              setRoleid("1");
                            } else if (option.label == "Custom") {
                              setRoleid("2");
                            } else if (option.label == "Standard") {
                              setRoleid("3");
                            }
                          }
                        }}
                      />
                    )}
                  />
                </View>
                {errors && errors.assignRole && (
                  <Text style={[styles.errorMsg]}>
                    {errors.assignRole.message}
                  </Text>
                )}
              </View>
            </View>
            {/* Assign Role Field Ends */}

            {/* Password Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Password <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View style={styles.containerPassword}>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        styles.padR50,
                        errors && errors.password && styles.borderRed,
                      ]}
                      // placeholder="Password"
                      placeholderTextColor='#222B2E'
                      secureTextEntry={passwordVisibility}
                      onChangeText={(password) => {
                        setPassword(password);
                        props.field.onChange(password);
                      }}
                    />
                  )}
                />
                {errors && errors.password && (
                  <Text style={[styles.errorMsg]}>
                    {errors.password.message}
                  </Text>
                )}
                <Pressable
                  style={[
                    styles.eyeIcon,
                    styles.height39,
                    styles.flexRow,
                    styles.justifyCenter,
                    styles.alignCenter,
                  ]}
                  onPress={handlePasswordVisibility}>
                  {/* <SvgUri source={rightIcon} /> */}
                  {passwordVisibility ? <SplashIcon /> : <EyeIcon1 />}
                </Pressable>
              </View>
            </View>
            {/* Password Field Ends */}

            {/* Confirm Password Field */}
            <View style={styles.mb11}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Confirm Password{" "}
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View style={styles.containerPassword}>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{
                    required: "Confirm password is required.",
                    pattern: {
                      value: PASSWORD_REGEX,
                      message:
                        "The confirm password and new password must match.",
                    },
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.confirmPassword && styles.borderRed,
                        styles.padR50,
                      ]}
                      // placeholder="Confirm Password"
                      placeholderTextColor='#222B2E'
                      secureTextEntry={passwordVisibility1}
                      onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword);
                        props.field.onChange(confirmPassword);
                      }}
                    />
                  )}
                />
                {errors && errors.confirmPassword && (
                  <Text style={[styles.errorMsg]}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
                <Pressable
                  style={[
                    styles.eyeIcon,
                    styles.flexRow,
                    styles.height39,
                    styles.justifyCenter,
                    styles.alignCenter,
                  ]}
                  onPress={handlePasswordVisibility1}>
                  {/* <SvgUri source={rightIcon1} /> */}
                  {passwordVisibility1 ? <SplashIcon /> : <EyeIcon1 />}
                </Pressable>
              </View>
            </View>
            {/* Confirm Password Ends */}

            {/* Level Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Level
                {/* <Text style={[styles.font12, styles.textPri1]}>*</Text> */}
              </Text>
              <View>
                {/* <SvgUri
 source={require("../../../assets/images/dashboard/dropdown.svg")}
 style={[styles.modalDropDown]}
 /> */}
                <View>
                  <View style={[styles.pressedmodalDropDown]}>
                    <DropDown />
                  </View>
                  <ModalSelector
                    data={levelArray}
                    initValue={level}
                    selectStyle={[styles.ModStyle, styles.height39]}
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
                        props.field.onChange(option.label);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            {/* Level Field Ends */}

            {/* Get Notified When Field */}
            <View style={[styles.width100, styles.mb11]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Get Notified When
                {/* <Text style={[styles.font12, styles.textPri1]}>*</Text> */}
              </Text>
              <View>
                {/* <SvgUri
 source={require("../../../assets/images/dashboard/dropdown.svg")}
 style={[styles.modalDropDown]}
 /> */}
                <View>
                  <View style={[styles.pressedmodalDropDown]}>
                    <DropDown />
                  </View>
                  <ModalSelector
                    data={getNotifiedWhenArray}
                    initValue={getNotifiedWhen}
                    selectStyle={[styles.ModStyle]}
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
                    value={getNotifiedWhen}
                    onChange={(option) => {
                      if (option.key) {
                        setGetNotifiedWhen(option.label);
                        props.field.onChange(option.label);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            {/* Get Notified When Field Ends */}
          </View>
        </ScrollView>
        {/* On Submit */}
        <View style={[styles.saveButtonFooter, styles.whiteBg]}>
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
        {/* On Submit Ends*/}

        {/* Success Popup */}
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
              Added Successfully
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              Your User added successfully
            </Text>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.width50,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={() => navigation.goBack()}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}
                  onPress={() => [
                    navigation.navigation("Users"),
                    refRBSheet.current.close(),
                  ]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* success Popup Ends */}
        </RBSheet>
        {/* Success Popup Ends*/}
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
              {userError}
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
    </>
  );
};

export default AddUser;

// import React from "react";
// import { View, Text } from "react-native";

// export default function AddUser({ navigation }) {
// return (
// <View>
// <Text>AddUser</Text>
// </View>
// );
// }
