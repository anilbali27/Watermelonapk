/** @format */

import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import RBSheet from "react-native-raw-bottom-sheet";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
import WareHouseList from "./WareHouseList";
import {
  View,
  Alert,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Pressable,
  SafeAreaView,
  Image,
  // Button,
} from "react-native";
import styles from "../../../assets/css/styles";
import { getDocumentAsync } from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDown from "../../../assets/images/icons/DropDown";

import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import ModalSelector from "react-native-modal-selector";
import SplashIcon from "../../../assets/images/dashboard/splash_icon";
import LeftArrow from "../../../assets/signup/LeftArrow";
import ChooseFile from "../../../assets/signup/ChooseFile";
import EyeIcon1 from "../../../assets/jsx/eyeIcon";

const EMAIL_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]/;

export default function AddWareHouse({ navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setcountryCode] = useState("Select");

  const [countrycityList, setCountrycityList] = useState([]);
  const [assignUserList, setAssignUserList] = useState([]);

  const [country, setCountry] = useState("971");
  const [countrykey, setcountrykey] = useState("Select");
  const [assignUserlabel, setAssignUserLabel] = useState("");
  const [assignUserkey, setAssignUserkey] = useState("Select");

  const [area, setArea] = useState("");
  const [areakey, setAreakey] = useState("Select");

  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const [pressed, setPressed] = useState(false);
  const [cityKey, setCityKey] = useState("Select");
  const [city, setCity] = useState("");

  const [status, setStatus] = useState("Select");
  const [statuskey, setstatuskey] = useState(0);

  const [filterData, setFilterData] = useState([]);

  const StatusData = [
    { key: 1, label: "Inactive", value: 0 },
    { key: 2, label: "Active", value: 1 },
  ];

  useEffect(() => {
    getAllCountryList();
    getAllUserList();
  }, []);

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

  // //Mapping assign user Data
  // const filteredAssignUserListArray =
  //   uniqueCountryName &&
  //   uniqueCountryName.map((item, index) => {
  //     let newData = {
  //       key: index + 1,
  //       label: item?.dependent_value,
  //       value: item?.dependent_value,
  //     };
  //     return newData;
  //   });

  //Mapping Country Data
  const filteredCountryListArray =
    uniqueCountryName &&
    uniqueCountryName.map((item, index) => {
      let newData = {
        key: index + 1,
        label: item?.dependent_value,
        value: item?.dependent_value,
      };
      return newData;
    });

  const filterCity = cityList.map((item, index) => {
    let newData = {
      key: index + 1,
      label: item.value,
      value: item.value,
    };
    return newData;
  });

  // const filterArea = areaList.map((item, index) => {
  //   let newData = {
  //     key: index + 1,
  //     label: item.value,
  //     value: item.value,
  //   };
  //   return newData;
  // });

  //working
  // const filterArea = filterCity.filter((item, index) => {
  //   console.log(item, "item?.value", city, "city");
  //   console.log(item?.label === city);
  //   if (item?.value === city) {
  //     let newData = {
  //       key: index + 1,
  //       label: item?.code,
  //       value: item?.code,
  //     };
  //     return newData;
  //   }
  // });

  // const filterArea = countrycityList.filter((item, index) => {
  //   console.log(item, "item?.value", city, "city");
  //   // console.log(item?.label === city);
  //   if (item?.dependent_value === city) {
  //     let newData = {
  //       key: index + 1,
  //       label: item?.value,
  //       value: item?.value,
  //     };
  //     return newData;
  //   }
  // });

  // const filterAreaa = countrycityList.filter((item, index) => {
  //   console.log(item, "pp");
  //   if (item?.name == "area") {
  //  setfilterData(item.)
  //     return newData;
  //   }
  // });

  const filterArea = countrycityList
    .filter((item) => item?.name === "area" && item?.dependent_value === city)
    .map((item, index) => ({
      key: index + 1,
      label: item?.value,
      value: item?.value,
    }));

  console.log(filterArea, "365");

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

  //assign user map
  const userListArray = assignUserList.map((uom, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: uom.firstname + " " + uom.lastname,
      value: uom._id,
    };
    return newData;
  });

  //assign user api calling
  const getAllUserList = async () => {
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let userType = await AsyncStorage.getItem("userType");
    let token = await AsyncStorage.getItem("UserToken");
    let myJson = {
      user_type: 2,
      user_type_id: "64476daa20d63f006b00b854",
      // page: page,
    };
    const result = await api.CreateMasterData(
      endPoint.user_list,
      token,
      myJson
    );

    if (result) {
      setAssignUserList(result.data);
    } else {
      setAssignUserList([]);
    }
  };

  const handleSubmitPress = async (data) => {
    console.log(data, "data1");
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    const id = await AsyncStorage.getItem("userTypeId");
    setPressed(true);
    var myJson = {
      warehouse_name: data?.Name,
      address: data?.address,
      mobile_number: data?.mobileNumber,
      country_code: "+971",
      mobile_country_code: "+971",
      email: data?.email,
      phone_number: data?.phoneNumber,
      supplier_id: id,
      // warehouse_user: "645c9cf26adbdfeeaa064d97",
      warehouse_user: assignUserlabel,
      country: "United Arab Emirates",
      city: data?.city,
      area: area,
      status: data?.status,
    };
    console.log(myJson, "612");
    const result = await api.getFilter(
      token,
      endPoint.create_wareHouse,
      myJson
    );
    if (result.success === "1") {
      // alert("Register");
      console.log(result, "RESULT");
      refRBSheet2.current.open();
    } else {
      console.log(result, "error");
      setSignupError(result.message);
      refRBSheet1.current.open();
    }
  };

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);

  const [rightIcon, setRightIcon] = useState(
    require("../../../assets/images/dashboard/eye_splash_icon.svg")
  );
  const [rightIcon1, setRightIcon1] = useState(
    require("../../../assets/images/dashboard/eye_splash_icon.svg")
  );
  const { width, height } = Dimensions.get("window");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  //password hide and show
  const handlePasswordVisibility = () => {
    if (
      rightIcon ===
      require("../../../assets/images/dashboard/eye_splash_icon.svg")
    ) {
      setRightIcon(require("../../../assets/images/dashboard/eye_icon.svg"));
      setPasswordVisibility(!passwordVisibility);
    } else if (
      rightIcon === require("../../../assets/images/dashboard/eye_icon.svg")
    ) {
      setRightIcon(
        require("../../../assets/images/dashboard/eye_splash_icon.svg")
      );
      setPasswordVisibility(!passwordVisibility);
    }
  };
  //confirm password hide and show
  const handlePasswordVisibility1 = () => {
    if (
      rightIcon1 ===
      require("../../../assets/images/dashboard/eye_splash_icon.svg")
    ) {
      setRightIcon1(require("../../../assets/images/dashboard/eye_icon.svg"));
      setPasswordVisibility1(!passwordVisibility1);
    } else if (
      rightIcon1 === require("../../../assets/images/dashboard/eye_icon.svg")
    ) {
      setRightIcon1(
        require("../../../assets/images/dashboard/eye_splash_icon.svg")
      );
      setPasswordVisibility1(!passwordVisibility1);
    }
  };

  // country code
  const CountryCodeData = [{ key: 1, label: "UAE (+971)" }];

  //RBSheet
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet1 = useRef();

  return (
    <View style={[styles.flex1, styles.whiteBg]}>
      <ScrollView style={[styles.whiteBg]}>
        <View style={styles.signupTitle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.befloginarrow]}>
            {/* <SvgUri
                source={require("../assets/images/dashboard/left_arrow.svg")}
              /> */}
            <LeftArrow />
          </TouchableOpacity>

          <Text
            style={[
              styles.signupTitleStyle,
              styles.textBlack,
              styles.fontSemi,
            ]}>
            Add Warehouse
          </Text>
        </View>

        <View style={styles.backgrey}>
          <View style={styles.signupInputContainer}>
            <View style={styles.signupInputView}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Name
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='Name'
                  control={control}
                  rules={{ required: "name is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.Name && styles.borderRed,
                      ]}
                      placeholder='Name'
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(name) => {
                        props.field.onChange(name);
                        setName(name);
                      }}
                    />
                  )}
                />
                {errors && errors.Name && (
                  <Text style={[styles.errorMsg]}>{errors.Name.message}</Text>
                )}
              </View>
            </View>

            <View style={styles.signupInputView}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Email Id<Text style={[styles.font12, styles.textPri1]}>*</Text>
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
                        styles.fontMed,
                        errors && errors.email && styles.borderRed,
                      ]}
                      placeholder='Email'
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(email) => {
                        setEmail(email);
                        props.field.onChange(email);
                      }}
                    />
                  )}
                />
                {errors && errors.email && (
                  <Text style={[styles.errorMsg]}>{errors.email.message}</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.backgrey}>
          <View style={styles.signupInputView}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Address<Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <Controller
                name='address'
                control={control}
                rules={{ required: "Address is required." }}
                render={(props) => (
                  <TextInput
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={8}
                    style={[
                      styles.inputStyle,
                      styles.fontMed,
                      styles.textArae,
                      errors && errors.address && styles.borderRed,
                    ]}
                    placeholder='Address'
                    placeholderTextColor='#BEBEBE'
                    onChangeText={(address) => {
                      setAddress(address);
                      props.field.onChange(address);
                    }}
                  />
                )}
              />
              {errors && errors.address && (
                <Text style={[styles.errorMsg]}>{errors.address.message}</Text>
              )}
            </View>
          </View>

          <View style={styles.signupInputContainer}>
            <View style={[styles.imageIcon, styles.signupInputView]}>
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
                    rules={{
                      required: "Phone Number is required.",
                      pattern: {
                        value: /^\d{9}$/,
                        message: "Phone Number is required.",
                      },
                    }}
                    // rules={{ required: "Mobile number is required." }}
                    render={(props) => (
                      <TextInput
                        style={[
                          styles.inputStyle,
                          styles.fontMed,
                          errors && errors.phoneNumber && styles.borderRed,
                        ]}
                        placeholder='Phone No'
                        keyboardType='numeric'
                        maxLength={9}
                        placeholderTextColor='#BEBEBE'
                        onChangeText={(phoneNumber) => {
                          setPhoneNumber(phoneNumber);
                          props.field.onChange(phoneNumber);
                        }}
                      />
                    )}
                  />
                  {errors && errors.phoneNumber && (
                    <Text style={[styles.errorMsg]}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={[styles.imageIcon, styles.signupInputView]}>
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
                  Mobile No
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  <Controller
                    name='mobileNumber'
                    control={control}
                    rules={{
                      required: "Mobile number is required.",
                      pattern: {
                        value: /^\d{9}$/,
                        message: "Mobile number is required.",
                      },
                    }}
                    // rules={{ required: "Mobile number is required." }}
                    render={(props) => (
                      <TextInput
                        style={[
                          styles.inputStyle,
                          styles.fontMed,
                          errors && errors.mobileNumber && styles.borderRed,
                        ]}
                        placeholder='Mobile No'
                        keyboardType='numeric'
                        maxLength={9}
                        placeholderTextColor='#BEBEBE'
                        onChangeText={(mobileNumber) => {
                          setMobileNumber(mobileNumber);
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
            <View style={[styles.width100]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Assign User
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='assignuser'
                    control={control}
                    rules={{ required: "Assign user is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={userListArray}
                        initValue={assignUserkey}
                        selectStyle={[
                          styles.inputStyle,
                          styles.fontMed,
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
                            setAssignUserLabel(option.value);
                            setAssignUserkey(option.label);
                            props.field.onChange(option.label);
                            setAssignUserList(userListArray);
                          }
                        }}
                        value={assignUserkey}
                      />
                    )}
                  />
                </View>
                {errors && errors.assignuser && (
                  <Text style={[styles.errorMsg]}>
                    {errors.assignuser.message}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={[
                styles.imageIcon,
                styles.signupInputView,
                styles.marginTopFive,
              ]}>
              <View style={[styles.width50, styles.padR7]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Country
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View>
                  <View>
                    <DropDownIcon style={[styles.modalDropDown]} />
                    <Controller
                      name='country'
                      control={control}
                      rules={{ required: "Country is required." }}
                      render={(props) => (
                        <ModalSelector
                          data={filteredCountryListArray}
                          initValue={countrykey}
                          selectStyle={[
                            styles.inputStyle,
                            styles.fontMed,
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
              <View style={[styles.width50, styles.padR9]}>
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
                            styles.inputStyle,
                            styles.fontMed,
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
                              setAreaList(filterCity);
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
            </View>
            <View style={[styles.width100, styles.marBtm6]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Area
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <View>
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='Area'
                    control={control}
                    rules={{ required: "Area user is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={filterArea}
                        initValue={areakey}
                        selectStyle={[
                          styles.inputStyle,
                          styles.fontMed,
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
                            setArea(option.label);
                            setAreakey(option.label);
                            props.field.onChange(option.label);
                            console.log(filterArea, "opt");
                          }
                        }}
                        // value={areakey}
                      />
                    )}
                  />
                </View>
                {errors && errors.Area && (
                  <Text style={[styles.errorMsg]}>{errors.Area.message}</Text>
                )}
              </View>
            </View>
            <View style={[styles.width100]}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Status
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                {/* <SvgUri
                      source={require("../../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    /> */}
                <DropDownIcon style={[styles.modalDropDown]} />
                <Controller
                  name='status'
                  control={control}
                  rules={{ required: "Status is required." }}
                  render={(props) => (
                    <ModalSelector
                      data={StatusData}
                      initValue={status}
                      selectStyle={[
                        styles.inputStyle,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyStart,
                        errors && errors.status && styles.borderRed,
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
                          setStatus(option.label);
                          setstatuskey(option.value);
                          props.field.onChange(option.value);
                        }
                      }}
                      value={statuskey}
                    />
                  )}
                />
              </View>
              {errors && errors.status && (
                <Text style={[styles.errorMsg]}>{errors.status.message}</Text>
              )}
            </View>
          </View>
          <View>
            <View
              style={[
                styles.flexRow,
                styles.defaultBottomView,
                styles.justifyBetween,
              ]}>
              <View style={styles.defaultSubmitBotton}>
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
                  onPress={handleSubmit(handleSubmitPress)}>
                  <Text
                    style={[
                      styles.font15,
                      styles.letterSpa33,
                      styles.textWhite,
                    ]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.defaultSubmitCancel}>
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
                  <Text
                    style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Success Popup */}
      <RBSheet
        ref={refRBSheet2}
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
            Warehouse Created Successfully
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Warehouse will be added shortly.
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
                navigation.navigate("WareHouseList"),
                refRBSheet2.current.close()
              }}>
              <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
            {signupError}
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              onPress={() => refRBSheet1.current.close()}
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
      {/* save & continue button */}
    </View>
  );
}
