/** @format */

import React, { useState, useRef } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "../../../assets/css/styles";
import { Button } from "react-native-paper";
import api from "../Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import GlobalStyles from "../../../assets/css/styles";
import * as Urls from "../../constant/Urls";
import RBSheet from "react-native-raw-bottom-sheet";
import EyeIcon1 from "../../../assets/jsx/eyeIcon";
import SplashIcon from "../../../assets/images/dashboard/splash_icon";
const EMAIL_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]/;

const LoginScreen = ({ navigation }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const refRBSheet1 = useRef();

  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [rightIcon, setRightIcon] = useState(
    require("../../../assets/images/dashboard/splash_icon")
  );
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const [errortext, setErrortext] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

  //password hide and show
  const handlePasswordVisibility = () => {
    if (rightIcon === require("../../../assets/images/dashboard/splash_icon")) {
      setRightIcon(require("../../../assets/images/dashboard/eye_icon.svg"));
      setPasswordVisibility(!passwordVisibility);
    } else if (
      rightIcon === require("../../../assets/images/dashboard/eye_icon.svg")
    ) {
      setRightIcon(require("../../../assets/images/dashboard/splash_icon"));
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleSubmitPress = async () => {
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    var myJson = {
      email: email,
      password: password,
    };
    console.log(myJson, "loginmyjson");
    storeData(myJson);
    const result = await api.Login(endPoint.Login, myJson);

    if (result.success === "1") {
      // console.log(result, "*********************9999880000*****************");
      await AsyncStorage.setItem("UserToken", result.data.token);
      await AsyncStorage.setItem("id", result.data._id);
      await AsyncStorage.setItem(
        "userTypeId",
        result.data.user_type_id || "null"
      );

      console.log(result.data.token, "LOGIN RESPONSE");
      await AsyncStorage.setItem(
        "userType",
        JSON.stringify(result.data.user_type) || "null"
      );
      // await AsyncStorage.setItem("tierapproval", result.data.tier_approval);
      // await AsyncStorage.setItem(
      //   "registration_no",
      //   result.data.company.registration_no || "null"
      // );
      // await AsyncStorage.setItem(
      //   "mobileCode",
      //   result.data?.mobile_no_code || "null"
      // );
      // await AsyncStorage.setItem(
      //   "mobileNumber",
      //   result.data?.phone_number || "null"
      // );
      // await AsyncStorage.setItem("email", result.data?.email || "null");
      // await AsyncStorage.setItem(
      //   "companyName",
      //   result.data?.company.name || "null"
      // );
      // await AsyncStorage.setItem("address", result.data?.address || "null");
      // await AsyncStorage.setItem("city", result.data?.city || "null");
      // await AsyncStorage.setItem(
      //   "updatedBy",
      //   result.data?.updated_by || "null"
      // );
      // await AsyncStorage.setItem(
      //   "updatedAt",
      //   result.data?.updated_at || "null"
      // );
      // await AsyncStorage.setItem("firstname", result.data?.firstname || "null");
      // await AsyncStorage.setItem("lastname", result.data?.lastname || "null");

      // console.log(result.data.token, "Tokennn");
      // console.log(result.data.user_type_id, "result.data.user_type_id");

      // await AsyncStorage.setItem('UserLogId', result.data.userId)
      // await AsyncStorage.setItem('email', result.data.email)
      // await AsyncStorage.setItem('userName', result.data.userName)
      // await AsyncStorage.setItem('loginpassword', result.data?.password)
      // await AsyncStorage.setItem('loginStatus', '1')
      // setUserinvalidemail(false)
      // console.log(result.data, "resJson.data");
      //  signIn(result.data.email);
      //  signIn(result.data.firstname);
      //  signIn(result.data.token)

      navigation.navigate("DrawerNavigationRoutes");
    } else {
      setLoginError(result.message);
      refRBSheet1.current.open();
      setUserinvalidemail(true);
    }
    if (result.data?.length == 0) {
      Toast.show("User not found, please enter valid credentials.");
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userInfo", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const gotToSignup = () => {
    navigation.navigate("SignupScreen");
    //console.log(navigation)
  };
  const goToForgotpassword = () => {
    navigation.navigate("ForgotPassword");
  };
  return (
    <ScrollView style={GlobalStyles.whiteBg}>
      <View style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.logo}>
          <Image source={require("../../../assets/images/logo/Layer1.png")} />
        </View>

        <View style={[GlobalStyles.container, GlobalStyles.width100]}>
          <Text style={GlobalStyles.titleStyle}>Login</Text>
          <Text style={GlobalStyles.paragraphStyle}>
            Please enter the details below to continue
          </Text>

          <View style={GlobalStyles.signupInputView}>
            <Text
              style={[
                GlobalStyles.font12,
                GlobalStyles.marBtm4,
                GlobalStyles.textDefault,
              ]}>
              Email or Mobile No
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
                    style={[styles.inputStyle]}
                    placeholder='Email'
                    placeholderTextColor='#222B2E'
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
          <View style={GlobalStyles.mb11}>
            <Text
              style={[
                GlobalStyles.font12,
                GlobalStyles.marBtm4,
                GlobalStyles.textDefault,
              ]}>
              Password
            </Text>
            <View style={styles.containerPassword}>
              <Controller
                name='password'
                control={control}
                rules={{ required: "Password is required." }}
                render={(props) => (
                  <TextInput
                    style={[styles.inputStyle]}
                    placeholder='Password'
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
                <Text style={[styles.errorMsg]}>{errors.password.message}</Text>
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
              </Pressable>

              {/* {passwordVisibility ? <View style={{marginTop:-30,marginLeft:250}}><SplashIcon/></View> : <View style={{marginTop:-30,marginLeft:250}}><EyeIcon1/></View>} */}

              {/* <Image source={require('../../../assets/images/dashboard/eye_icon.png')} style={[styles.]}></Image> */}
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => goToForgotpassword()}>
              <Text style={GlobalStyles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={[GlobalStyles.width100]}
          onPress={handleSubmit(handleSubmitPress)}>
          <View style={[styles.saveButtonFooterLogin1]}>
            <Button style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
              <Text
                style={[
                  styles.font15,
                  styles.letterSpa33,
                  styles.textWhite,
                  styles.fontMed,
                ]}>
                Sign In
              </Text>
            </Button>
          </View>
        </TouchableOpacity>

        <View>
          <Text style={GlobalStyles.labelSignin}>Or sign in with</Text>

          <View style={GlobalStyles.imageIcon}>
            <View style={GlobalStyles.imageBox}>
              <Image
                source={require("../../../assets/images/icons/google-color.png")}
                style={GlobalStyles.logoIcon}
              />
            </View>
            <View style={GlobalStyles.imageBox}>
              <Image
                source={require("../../../assets/images/icons/Icon-awesome-apple.png")}
                style={GlobalStyles.logoIcon}
              />
            </View>
          </View>
          <View style={GlobalStyles.newSignup}>
            <Text style={GlobalStyles.account}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => gotToSignup()}>
              <Text style={GlobalStyles.new_sign}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
            {loginError}
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

export default LoginScreen;
