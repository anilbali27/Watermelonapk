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
import { Form, FormItem } from "react-native-form-component";
import * as Urls from "../../constant/Urls";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [rightIcon, setRightIcon] = useState(
    require("../../../assets/images/dashboard/eye_splash_icon.svg")
  );
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const [errortext, setErrortext] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();

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

  const handleSubmitPress = async () => {
    navigation.navigate("DrawerNavigationRoutes");

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
    console.log(myJson, "90uyhuh");
    storeData(myJson);
    const result = await api.Login(endPoint.Login, myJson);

    let token = result.data.token;
    console.log(token, "tokeeennnnnnnnn");
    if (result) {
      console.log(result, "*********************9999880000*****************");
      console.log(result.data.token);
      await AsyncStorage.setItem("UserToken", result.data.token);
      await AsyncStorage.setItem("id", result.data._id);
      await AsyncStorage.setItem("userTypeId", result.data.user_type_id);

      // await AsyncStorage.setItem('UserLogId', result.data.userId)
      // await AsyncStorage.setItem('email', result.data.email)
      // await AsyncStorage.setItem('userName', result.data.userName)
      // await AsyncStorage.setItem('loginpassword', result.data?.password)
      // await AsyncStorage.setItem('loginStatus', '1')
      // setUserinvalidemail(false)
      console.log(result.data, "resJson.data");
      //  signIn(result.data.email);
      //  signIn(result.data.firstname);
      //  signIn(result.data.token)

      // navigation.navigate('DrawerNavigationRoutes');
    } else {
      setUserinvalidemail(true);
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
    <ScrollView style={GlobalStyles.scrollViewBG}>
      <View style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.logo}>
          <Image source={require("../../../assets/images/logo/Layer1.png")} />
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.titleStyle}>Login</Text>
          <Text style={GlobalStyles.paragraphStyle}>
            Please enter the details below to continue
          </Text>

          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.signupLabel}>Email or Mobile No</Text>

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
          <View style={GlobalStyles.signinPasswordInputView}>
            <Text style={GlobalStyles.signupLabel}>Password</Text>
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
                <SvgUri source={rightIcon} />
              </Pressable>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => goToForgotpassword()}>
              <Text style={GlobalStyles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmitPress}>
          <View style={[styles.saveButtonFooterLogin]}>
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
    </ScrollView>
  );
};

export default LoginScreen;
