/** @format */

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
import * as ImagePicker from "expo-image-picker";

import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import ModalSelector from "react-native-modal-selector";
import SplashIcon from "../../../assets/images/dashboard/splash_icon";
import LeftArrow from "../../../assets/signup/LeftArrow";
import ChooseFile from "../../../assets/signup/ChooseFile";
import EyeIcon1 from "../../../assets/jsx/eyeIcon";

const EMAIL_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]/;

export default function SignUp({ navigation }) {
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
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setcountryCode] = useState("Select");
  const [countrykey, setcountrykey] = useState("Select");
  const [countrycityList, setCountrycityList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [number, setNumber] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("971");
  const [errortext, setErrortext] = useState("");
  const [presentationFile, setPresentationFile] = useState({});
  const [presentationFile1, setPresentationFile1] = useState({});
  const [presentationFile2, setPresentationFile2] = useState({});
const[image,setImage]=useState('')
const[image1,setImage1]=useState('')

  const [pressed, setPressed] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);
  const [cityKey, setCityKey] = useState("Select");
  const [city, setCity] = useState("");

  const selectOneFile = async () => {
    try {
      const res = await getDocumentAsync({
        type: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
        ],
        multiple: true,
        copyToCacheDirectory: true,
      });
      console.log(res, "qqqqqqqqqqqqqq");
      setPresentationFile(res);
      // Alert.alert("uploaded");
    } catch (err) {
      console.log(err, "errrrrrr");
    }
  };
  const selectOneFile2 = async () => {
    try {
      const res = await getDocumentAsync({
        type: [
          "image/png",
          "image/jpeg",
        ],
        multiple: true,
        copyToCacheDirectory: true,
      });
      console.log(res, "qqqqqqqqqqqqqq");
      setPresentationFile2(res);
      // Alert.alert("uploaded");
    } catch (err) {
      console.log(err, "errrrrrr");
    }
  };
  useEffect(() => {
    getAllCountryList();
   
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
  const uniqueCountryName = filtercountrylist && filtercountrylist.filter((element) => {
    // console.log("elementelement::", element)
    const isDuplicate = uniqueIds.includes(element?.dependent_value);

    if (!isDuplicate) {
      uniqueIds.push(element.dependent_value);
      return true;
    }
    return false;
  });
  //Mapping Country Data
  const filteredCountryListArray = uniqueCountryName && uniqueCountryName.map((item, index) => {
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
  const getAllCountryList = async () => {
    let token = await AsyncStorage.getItem("UserToken");
    let myJson = {};
    const result = await api.CreateMasterData(
      endPoint.get_country,
      token,
      myJson
    );
     console.log("API LIst Data:::", result.data)
    setCountrycityList(result.data);
  };
  

  const selectOneFile1 = async () => {
    try {
      const res = await getDocumentAsync({
        type: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
        ],
        multiple: true,
        copyToCacheDirectory: true,
      });
      console.log(res, "qqqqqqqqqqqqqq");
      setPresentationFile1(res);
      // Alert.alert("uploaded");
    } catch (err) {
      console.log(err, "errrrrrr");
    }
  };
  //const icon = 'https://svgshare.com/i/pSH.svg';
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      base64: true,
      bytes:true,
      aspect: [4, 3],
      quality: 1,
    });
    
    // console.log(result.base64,"RTWYWUWUWIWIWI")
    if (!result) {
      
      const extn = result.uri ? result.uri.split(".").pop() : "";
      const fileUriPart = result.uri ? result.uri.split("/") : [];
      const filename = fileUriPart.length
        ? fileUriPart[fileUriPart.length - 1]
        : "";
      const imageObj: any = {
         base64: result.base64,
       
        uri: result.uri,
        extn,
        type: `image/${extn}`,
        name: filename,
        // name:"data:image/jpg;base64," + result.base64
      };

      setImage(imageObj);
     
    } else {
      const extn = result.uri ? result.uri.split(".").pop() : "";
      const fileUriPart = result.uri ? result.uri.split("/") : [];
      const filename = fileUriPart.length
        ? fileUriPart[fileUriPart.length - 1]
        : "";
      const imageObj: any = {
         base64: result.assets[0].base64,
       
        uri: result.uri,
        extn,
        type: `image/${extn}`,
        name: filename,
        // name:"data:image/jpg;base64," + result.base64
      };
  //  setImageName()
      setImage(imageObj);
      //  setImage(null);
    }

  };
  const handleSubmitPress = async (data) => {
    setPressed(true);
    console.log(image.base64,'tyutu')
    var myJson = {
      company_name: companyName,
      firstname: firstname,
      lastname: lastName,
      email: email,
      password: password,
      cpassword: conPassword,
      countrycode: "971",
      mobile_no: mobileNumber,
      address: address,
      country: countrykey,
      city: cityKey,
      platform: "mobile",
      profile : image.base64,
      company_registration_no: code,
    };

    const result = await api.createSupplier(endPoint.create_Supplier, myJson);
    console.log(result.data,'result')
    if (result.success === "1") {
      refRBSheet2.current.open();
    } else {
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
            Sign Up
          </Text>
        </View>

        <Text style={styles.signupParagraph}>
          * Mandatory Fields are required
        </Text>
        <View style={styles.backgrey}>
          <View style={styles.signupInputContainer}>
            <View style={styles.signupInputView}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Profile Photo
              </Text>
              <View>
  <TouchableOpacity
    style={[
      styles.dragDropView,
      styles.flexColumn,
      styles.alignCenter,
      styles.justifyCenter,
    ]}
    onPress={() => pickImage()}
  >
    <View style={[styles.mb18]}>
      <ChooseFile />
    </View>
    <Text style={[styles.font15, styles.textBlack, styles.mb3]}>
      Choose file here
    </Text>
    <Text style={[styles.font12, styles.textDefault]}>
      Tap here to upload your profile photo
    </Text>
  </TouchableOpacity>
  {image && (
    <View>
      <Image
        source={{ uri: image.uri}}
        style={{ width: 200, height: 200 }} // Adjust the width and height as per your requirement
      />
      <Text style={{ fontSize: 13, fontWeight: '500' }}>
        File Name: {image?.name ? image.name : ''}
        {'\n'}
      </Text>
    </View>
  )}
</View>


             
            </View>

          </View>
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
                Company Name
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='companyName'
                  control={control}
                  rules={{ required: "Company name is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.companyName && styles.borderRed,
                      ]}
                      placeholder='Company Name'
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(companyName) => {
                        props.field.onChange(companyName);
                        setCompanyName(companyName);
                      }}
                    />
                  )}
                />
                {errors && errors.companyName && (
                  <Text style={[styles.errorMsg]}>
                    {errors.companyName.message}
                  </Text>
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
                Registration No
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='code'
                  control={control}
                  rules={{ required: "Registration number is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.code && styles.borderRed,
                      ]}
                      placeholder='Registration No'
                      placeholderTextColor='#BEBEBE'
                      // onChangeText={(email) => setEmail(email)}
                      onChangeText={(code) => {
                        setCode(code);
                        props.field.onChange(code);
                      }}
                    />
                  )}
                />
                {errors && errors.code && (
                  <Text style={[styles.errorMsg]}>{errors.code.message}</Text>
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
                Contact Person First Name
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>

              <View>
                <Controller
                  name='firstname'
                  control={control}
                  rules={{ required: "Contact person First name is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.firstname && styles.borderRed,
                      ]}
                      placeholder='Contact Person First Name'
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(firstname) => {
                        setFirstname(firstname);
                        props.field.onChange(firstname);
                      }}
                    />
                  )}
                />
                {errors && errors.firstname && (
                  <Text style={[styles.errorMsg]}>
                    {errors.firstname.message}
                  </Text>
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
                Contact Person Last Name
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>

              <View>
                <Controller
                  name='lastName'
                  control={control}
                  rules={{ required: "Contact person Last name is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.lastName && styles.borderRed,
                      ]}
                      placeholder='Contact Person Last Name'
                      placeholderTextColor='#BEBEBE'
                      onChangeText={(lastName) => {
                        setLastName(lastName);
                        props.field.onChange(lastName);
                      }}
                    />
                  )}
                />
                {errors && errors.lastName && (
                  <Text style={[styles.errorMsg]}>
                    {errors.lastName.message}
                  </Text>
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
                  <Text style={[styles.errorMsg]}>
                    {errors.address.message}
                  </Text>
                )}
              </View>
            </View>
            <View style={[styles.imageIcon, styles.signupInputView]}>
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
          </View>
        </View>

        <View style={styles.backgrey}>
          <View style={styles.signupInputContainer}>
            <View style={styles.signupInputView}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Upload Trade License
              </Text>
              <View>
                <TouchableOpacity
                  style={[
                    styles.dragDropView,
                    styles.flexColumn,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}
                  onPress={() => selectOneFile()}>
                  {/* // onPress={() => refRBSheet.current.open()}> */}
                  {/* <SvgUri
                    source={require("../assets/images/dashboard/choose_file.svg")}
                    style={[styles.mb18]}
                  /> */}
                  <View style={[styles.mb18]}>
                    <ChooseFile />
                  </View>
                  <Text style={[styles.font15, styles.textBlack, styles.mb3]}>
                    Choose file here
                  </Text>
                  <Text style={[styles.font12, styles.textDefault]}>
                    Tap here to upload your TRN Certificate
                  </Text>
                </TouchableOpacity>
                {presentationFile && presentationFile.type === "success" && (
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      File Name:{" "}
                      {presentationFile?.name ? presentationFile.name : ""}
                      {"\n"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.backgrey}>
          <View style={styles.signupInputContainer}>
            <View style={styles.signupInputView}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Upload TRN Certificate
              </Text>
              <View>
                <TouchableOpacity
                  style={[
                    styles.dragDropView,
                    styles.flexColumn,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}
                   onPress={() => selectOneFile1()}
                  // onPress={()=>pickImage()}
                  >
                  {/* // onPress={() => refRBSheet.current.open()}> */}
                  {/* <SvgUri
                    source={require("../assets/images/dashboard/choose_file.svg")}
                    style={[styles.mb18]}
                  /> */}
                  <View style={[styles.mb18]}>
                    <ChooseFile />
                  </View>
                  <Text style={[styles.font15, styles.textBlack, styles.mb3]}>
                    Choose file here
                  </Text>
                  <Text style={[styles.font12, styles.textDefault]}>
                    Tap here to upload your TRN Certificate
                  </Text>
                </TouchableOpacity>
                {presentationFile1 && presentationFile1.type === "success" && (
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      File Name:{" "}
                      {presentationFile1?.name ? presentationFile1.name : ""}
                      {"\n"}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
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
                Password<Text style={[styles.font12, styles.textPri1]}>*</Text>
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
                        styles.fontMed,
                        styles.padR50,
                        errors && errors.password && styles.borderRed,
                      ]}
                      placeholder='Password'
                      placeholderTextColor='#BEBEBE'
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
                    styles.flexRow,
                    styles.justifyCenter,
                    styles.alignCenter,
                  ]}
                  onPress={handlePasswordVisibility}>
                  {passwordVisibility ? (
                    <View
                      style={[
                        styles.eyeIcon,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyCenter,
                      ]}>
                      <SplashIcon />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.eyeIcon,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyCenter,
                      ]}>
                      <EyeIcon1 />
                    </View>
                  )}

                  {/* <SvgUri source={rightIcon} /> */}
                </Pressable>
              </View>
            </View>

            <View style={styles.inputView}>
              <Text
                style={[
                  styles.labelText,
                  styles.font12,
                  styles.fontMed,
                  styles.mb4,
                ]}>
                Confirm Password
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View style={styles.containerPassword}>
                <Controller
                  name='conPassword'
                  control={control}
                  rules={{ required: "Confirm password is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.fontMed,
                        errors && errors.conPassword && styles.borderRed,
                        styles.padR50,
                      ]}
                      placeholder='Confirm Password'
                      placeholderTextColor='#BEBEBE'
                      secureTextEntry={passwordVisibility1}
                      onChangeText={(conPassword) => {
                        setConPassword(conPassword);
                        props.field.onChange(conPassword);
                      }}
                    />
                  )}
                />
                {errors && errors.conPassword && (
                  <Text style={[styles.errorMsg]}>
                    {errors.conPassword.message}
                  </Text>
                )}
                <Pressable
                  style={[
                    styles.eyeIcon,
                    styles.flexRow,
                    styles.justifyCenter,
                    styles.alignCenter,
                  ]}
                  onPress={handlePasswordVisibility1}>
                  {passwordVisibility1 ? (
                    <View
                      style={[
                        styles.eyeIcon,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyCenter,
                      ]}>
                      <SplashIcon />
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.eyeIcon,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyCenter,
                      ]}>
                      <EyeIcon1 />
                    </View>
                  )}

                  {/* <SvgUri source={rightIcon1} /> */}
                </Pressable>
              </View>
            </View>
            <View></View>
          </View>
        </View>
      </ScrollView>
      {/* rbSheet */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            ...styles.rboverlayBG,
          },
          draggableIcon: {
            ...styles.dragView,
          },
          container: {
            ...styles.rbContainer,
          },
        }}>
        <View
          style={[
            styles.padt50,
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
          ]}>
          {/* <SvgUri
            source={require("../../assets/images/dashboard/upload_icon.svg")}
            style={[styles.mb14]}
          /> */}
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.mb44,
              styles.fontBold,
            ]}>
            Uploading Trade License
          </Text>

          <View
            style={[
              styles.width100,
              styles.uploadPercentage,
              styles.flexRow,
              styles.alignCenter,
              styles.justifyCenter,
              styles.mb44,
            ]}>
            <View style={[styles.perBar, { width: "75%" }]}></View>
            <Text style={[styles.textPri, styles.font12, styles.fontMed]}>
              Uploading 75%
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.cancelStyle,
              styles.width100,
              styles.flexRow,
              styles.justifyCenter,
            ]}
            onPress={() => refRBSheet.current.close()}>
            <Text
              style={[
                styles.letterSpa33,
                styles.font15,
                styles.textPri,
                styles.fontMed,
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {/* rbSheet - Ends */}

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
            Supplier has been Created Successfully
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Profile will be activated shortly.
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => [
                navigation.navigate("LoginScreen"),
                refRBSheet.current.close(),
              ]}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => [
                  navigation.navigate("LoginScreen"),
                  refRBSheet.current.close(),
                ]}>
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
      <TouchableOpacity onPress={() => handleSubmit(handleSubmitPress)}>
        <View style={[styles.saveButtonFooter, styles.whiteBg]}>
          {/* <Button style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
            <Text
              style={[
                styles.font15,
                styles.letterSpa33,
                styles.textWhite,
                styles.fontMed,
              ]}>
              Sign Up
            </Text>
          </Button> */}
          {/* <Button
            onPress={handleSubmit(handleSubmitPress)}
            style={[styles.primaryBg, styles.saveBtn, styles.width100]}
            title='Sign Up'
          /> */}
          <Button
            onPress={handleSubmit(handleSubmitPress)}
            style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
            <Text
              style={[
                styles.font15,
                styles.letterSpa33,
                styles.textWhite,
                styles.fontMed,
              ]}>
              Sign Up
            </Text>
          </Button>
        </View>
      </TouchableOpacity>
      {/* save & continue button - Ends */}
    </View>
  );
}

