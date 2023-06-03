/** @format */

import React, {
  useState,
  useEffect,
  useRef,
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalStyles from "../../../assets/css/styles";
import styles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import { useForm, Controller } from "react-hook-form";
import RBSheet from "react-native-raw-bottom-sheet";
import SplashIcon from "../../../assets/images/dashboard/splash_icon";
import EyeIcon1 from "../../../assets/jsx/eyeIcon";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ navigation }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [rightIcon, setRightIcon] = useState("eye");
  const [rightIcon1, setRightIcon1] = useState("eye");
  const [rightIcon2, setRightIcon2] = useState("eye");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [profileDatta, setProfileDatta] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const storedPassword = password;
  const userPassword = "myPassword123";

  const PASSWORD_REGEX1 = new_password;
  const PASSWORD_REGEX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{4,}$/;
  // bcrypt.compare(userPassword, apiPassword, function(err, result) {
  //   if (err) {
  //     console.log("Error comparing passwords:", err);
  //   } else if (result === true) {
  //     console.log("Passwords match!");
  //   } else {
  //     console.log("Passwords do not match!");
  //   }
  // });
  useEffect(() => {
    getProfile();
  }, []);

  const handlePasswordVisibility = () => {
    // if (rightIcon === "eye") {
    //   setRightIcon("eye-off");
    // } else {
    //   setRightIcon("eye");
    // }
    setPasswordVisibility(!passwordVisibility);
  };
  const handlePasswordVisibility1 = () => {
    if (rightIcon1 === "eye") {
      setRightIcon1("eye-off");
    } else {
      setRightIcon1("eye");
    }
    setPasswordVisibility1(!passwordVisibility1);
  };

  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === "eye") {
      setRightIcon2("eye-off");
    } else {
      setRightIcon2("eye");
    }
    setPasswordVisibility2(!passwordVisibility2);
  };
  // success popup
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const getProfile = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("id");
    console.log(jsonId, "jsonId");
    let token = jsonValue;
    var myJson = {
      id: jsonId,
    };

    const result = await api.getProfile(token, endPoint.get_profile, myJson);
    // console.log(result, "getprofile");

    if (result) {
      setProfileDatta(result.data);
      setPassword(result.data?.password);
    } else {
      setProfileDatta([]);
    }
  };
  const onChangePassword = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      old_password: old_password,
      new_password: new_password,
      confirm_password: confirm_password,
    };

    const result = await api.ChangePassword(
      token,
      endPoint.CHANGE_PASSWORD,
      myJson
    );
    setnew_password(result);
    if (result.success === "1") {
      // setnew_password(false);
      refRBSheet.current.open();
    } else {
      setPasswordError(result.message);
      refRBSheet1.current.open();
    }
  };
  return (
    <View style={GlobalStyles.signupContainer}>
      <View style={GlobalStyles.promotionsHeaderContainer}>
        <View style={GlobalStyles.PromotionScreenIconView}>
          <TouchableOpacity
            onPress={() => {
              //   navigation.navigate("DrawerNavigationRoutes");
              navigation.goBack();
            }}>
            <BackArrow />
          </TouchableOpacity>
          <Text style={GlobalStyles.promotionsHeaderText}>Change Password</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.mb24}>
          <Text
            style={[
              styles.textDefault,
              styles.font12,
              styles.fontMed,
              styles.marBtm4,
            ]}>
            Current Password{" "}
            <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name='old_password'
                control={control}
                rules={{
                  required: "Current password is required.",
                  pattern: {
                    value: PASSWORD_REGEX1,
                    message: "Please enter correct old password.",
                  },
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                      styles.height39,
                      errors && errors.old_password && styles.borderRed,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(old_password) => {
                      setold_password(old_password);
                      props.field.onChange(old_password);
                    }}
                    value={old_password}
                    secureTextEntry={!passwordVisibility}
                  />
                )}
              />
              <Pressable
                style={[
                  styles.eyeIcon,
                  styles.height,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.alignCenter,
                ]}
                onPress={handlePasswordVisibility}>
                {/* <MaterialCommunityIcons
                  name={rightIcon}
                  size={24}
                  color='#222B2E'
                  // style={GlobalStyles.passwordIcon}
                /> */}
                {passwordVisibility ? <EyeIcon1 /> : <SplashIcon />}
              </Pressable>
            </View>
            {errors && errors.old_password && (
              <Text style={[styles.errorMsg]}>
                Current Password is required.
              </Text>
            )}
          </View>
        </View>

        <View style={styles.mb24}>
          <Text
            style={[
              styles.textDefault,
              styles.font12,
              styles.fontMed,
              styles.marBtm4,
            ]}>
            New Password <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name='new_password'
                control={control}
                rules={{
                  required: "New password is required.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    // message: "Password length should be 4 minimum.",
                  },
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                      styles.height39,
                      errors && errors.new_password && styles.borderRed,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(new_password) => {
                      setnew_password(new_password);
                      props.field.onChange(new_password);
                    }}
                    value={new_password}
                    secureTextEntry={!passwordVisibility1}
                  />
                )}
              />
              <Pressable
                style={[
                  styles.eyeIcon,
                  styles.height,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.alignCenter,
                ]}
                onPress={handlePasswordVisibility1}>
                {/* <MaterialCommunityIcons
                  name={rightIcon1}
                  size={24}
                  color='#222B2E'
                  // style={GlobalStyles.passwordIcon}
                /> */}
                {passwordVisibility1 ? <EyeIcon1 /> : <SplashIcon />}
              </Pressable>
            </View>
            {/* {errors && errors.new_password && (
                <Text style={[styles.errorMsg]}>New Password is required.</Text>
              )} */}
            {errors && errors.new_password && (
              <Text style={[styles.errorMsg]}>
                {errors.new_password.message}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.mb24}>
          <Text
            style={[
              styles.textDefault,
              styles.font12,
              styles.fontMed,
              styles.marBtm4,
            ]}>
            Confirm Password{" "}
            <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name='confirm_password'
                control={control}
                rules={{
                  required: "Confirm password is required.",
                  validate: (value) =>
                    value === new_password ||
                    "The confirm password and new password must match.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                      styles.height39,
                      errors && errors.confirm_password && styles.borderRed,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(confirm_password) => {
                      setconfirm_password(confirm_password);
                      props.field.onChange(confirm_password);
                    }}
                    value={confirm_password}
                    secureTextEntry={!passwordVisibility2}
                  />
                )}
              />
              <Pressable
                style={[
                  styles.eyeIcon,
                  styles.height,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.alignCenter,
                ]}
                onPress={handlePasswordVisibility2}>
                {/* <MaterialCommunityIcons
                  name={rightIcon2}
                  size={24}
                  color='#222B2E'
                  // style={GlobalStyles.passwordIcon}
                /> */}
                {passwordVisibility2 ? <EyeIcon1 /> : <SplashIcon />}
              </Pressable>
            </View>

            {errors && errors.confirm_password && (
              <Text style={[styles.errorMsg]}>
                {errors.confirm_password.message}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={GlobalStyles.loginBtn}
          onPress={handleSubmit(onChangePassword)}>
          <Text
            style={GlobalStyles.loginText}
            onPress={handleSubmit(onChangePassword)}>
            Submit
          </Text>
        </TouchableOpacity>
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
          {/* Update Popup  */}
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
              Updated
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              Password updated successfully.
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
                  onPress={() => navigation.goBack()}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.padt30]}>
              <Image source={require('../../../assets/images/dashboard/delete_img.png')} style={[styles.successIcon]}></Image>
              <Text style={[styles.font22, styles.textBlack, styles.textCenter, styles.mb11, styles.fontBold]}>Delete</Text>
              <Text style={[styles.font15, styles.textBlack, styles.mb37, styles.textCenter]}>Are you sure want to delete?</Text>
              <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]}>
                <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Cancel</Text>
                </TouchableOpacity>
               
              
                <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]}>
                  <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Yes, delete it</Text>
                </TouchableOpacity>
              </View>
          </View> */}
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
              {passwordError}
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
          {/* Delete popo up */}
          {/* <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.padt30]}>
              <Image source={require('../../../assets/images/dashboard/delete_img.png')} style={[styles.successIcon]}></Image>
              <Text style={[styles.font22, styles.textBlack, styles.textCenter, styles.mb11, styles.fontBold]}>Delete</Text>
              <Text style={[styles.font15, styles.textBlack, styles.mb37, styles.textCenter]}>Are you sure want to delete?</Text>
              <View style={[styles.flexRow, styles.justifyCenter,styles.space_btn]}>
              <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]}>
                <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Cancel</Text>
                </TouchableOpacity>
               
              
                <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]}>
                  <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Yes, delete it</Text>
                </TouchableOpacity>
               
              </View>
          </View> */}
          {/* Delete popo up end*/}
        </RBSheet>
      </View>
    </View>
  );
};
export default ChangePassword;
