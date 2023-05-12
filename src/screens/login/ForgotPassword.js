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
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "../../../assets/css/styles";
import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

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

  console.log("email76543", email);

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
    if (result) {
      console.log(result, "resJson.data");
      Alert.alert(result.message);
    } else {
      setUserinvalidemail(true);
    }
  };

  return (
    <ScrollView>
      <View style={GlobalStyles.mainContainer}>
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
            <View style={GlobalStyles.inputContainer}>
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
              style={GlobalStyles.loginBtn}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={GlobalStyles.loginText}
                onPress={handleSubmit(onSubmit)}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
