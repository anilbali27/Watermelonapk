/** @format */

/** @format */

import React, {
  useState,
  useEffect,
  useContext,
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
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { useForm, Controller ,useRef} from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LeftArrow from "../../../assets/signup/LeftArrow";

import styles from "../../../assets/css/styles";
import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import RBSheet from "react-native-raw-bottom-sheet";

const EMAIL_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]/;

export default function ForgotPassword({ navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();

  //  const [userinvalidemail, setUserinvalidemail] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
const[errorMsg,setErrorMsg] = useState("");
const[successMessage,setSuccessMessage] = useState("");

  console.log("email76543", email);
  const refRBSheet = useRef();

  const { width, height } = Dimensions.get("window");

  const [invalidMail, setInvalidMail] = useState({ value: "", error: "" });

  const emailValidator = (email) => {
    if (!email) return "Email is Required";
    return "";
  };
  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    var myJson = {
      email: email,
    };
    const result = await api.ForgotPassword(endPoint.Forgot_Password, myJson);
    if (result.success === "1") {
     
      setSuccessMessage(result.message);
      refRBSheet.current.open();
    } else {
      setErrorMsg(result.message)
      refRBSheet1.current.open();
    }
  };

  return (
    <ScrollView>
      <View style={GlobalStyles.mainContainer}>
        <View style={[GlobalStyles.forgetPasswordBackArrow]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}>
            <LeftArrow />
          </TouchableOpacity>
        </View>

        <View style={GlobalStyles.logo}>
          <Image source={require("../../../assets/images/logo/Layer1.png")} />
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.titleStyle}>Forgot Password?</Text>
          <Text style={GlobalStyles.forgotParagraphStyle}>
            No worries, we will send you instructions to reset your password
          </Text>

          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.labelTextforgot}>
              Registered Email Address
            </Text>
            <View
              style={[
                GlobalStyles.inputContainer,
                errors && errors.email && styles.borderRed,
              ]}>
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
                    style={GlobalStyles.signupTextInput}
                    placeholder='Email'
                    placeholderTextColor='#222B2E'
                    onChangeText={(email) => {
                      setEmail(email);
                      props.field.onChange(email);
                    }}
                  />
                )}
              />
            </View>
            {errors && errors.email && (
              <Text style={[styles.errorMsg]}>{errors.email.message}</Text>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={[GlobalStyles.loginBtn, GlobalStyles.m0]}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={GlobalStyles.loginText}
                onPress={handleSubmit(onSubmit)}>
                Send
              </Text>
            </TouchableOpacity>

            <View
              style={[
                GlobalStyles.mt18,
                GlobalStyles.flexRow,
                GlobalStyles.justifyCenter,
              ]}>
              {/* <TouchableOpacity>
                <Text style={[GlobalStyles.textPri, GlobalStyles.font14]}>
                  Go Back
                </Text>
              </TouchableOpacity> */}
            </View>
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
            Success
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
           An email with the password has been sent to the user.
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
                navigation.navigate("Catelogue", { category: "tier" });
              }}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => {
                  navigation.navigate("Catelogue", { category: "tier" });
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
            {errorMsg}
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
}

// import React from "react";
// import { View, Text } from "react-native";

// export default function ForgotPassword({ navigation }) {
//   return (
//     <View>
//       <Text>ForgotPassword</Text>
//     </View>
//   );
// }
