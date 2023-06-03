/** @format */
import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import RBSheet from "react-native-raw-bottom-sheet";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import styles from "../../../assets/css/styles";
import EditWareHouse from "./EditWareHouse";

const WareHouseListCard = (props) => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [deleteId, setdeleteId] = useState();

  //Edit  warehouse
  const EditWareHouse = (id) => {
    console.log(props, "EditWareHouse");
    props.navigation.navigate("EditWareHouse", {
      id: props?.id,
      data: props,
    });
  };

  //Delete warehouse
  const DeleteSubCatelogue = (id) => {
    console.log("Deleteid::", id);
    refRBSheet.current.open();
    setdeleteId(id);
  };
  //Delete warehouse API Integration
  const DeleteSubCateCatelogueAPICall = async () => {
    refRBSheet.current.close();
    const token = await AsyncStorage.getItem("UserToken");
    var myJson = {
      id: [deleteId],
      status: 2,
    };
    console.log("myJsonCatelogue", myJson);
    const result = await api.CreateMasterData(
      endPoint.delete_warehouse,
      token,
      myJson
    );
    // props.updateData();
    console.log("deletesubcatelogueresult::", result.success === "1");
    refRBSheet2.current.open();
    if ((result.success = 1)) {
      refRBSheet2.current.open();
    }
    console.log("result.data?.length::", result.data?.length);
  };

  return (
    <>
      <View style={GlobalStyles.paymentCardContainer}>
        <View style={GlobalStyles.subCatalogueView}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View style={{ width: "75%" }}>
                <Text style={GlobalStyles.orderCardHeading}>
                  {props.warehouse_name}
                </Text>
              </View>
              {/* <View style={GlobalStyles.flexRow}>
                {props?.status === "Visible" ? (
                  <View style={{ paddingLeft: 4 }}>
                    <Text style={GlobalStyles.emailText}>Visible</Text>
                  </View>
                ) : (
                  <View></View>
                )}
              </View> */}
              {/* <View style={GlobalStyles.outletActiveView}>
                <Text style={GlobalStyles.paidText}>Active</Text>
              </View> */}
              <View>
                {props?.status_name == "Active" ? (
                  <View style={GlobalStyles.outletActiveView}>
                    <Text style={GlobalStyles.paidText}>Active</Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.outletActiveView}>
                    <Text style={GlobalStyles.paidText}>In Active</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={GlobalStyles.outletEmailView}>
              <Text style={GlobalStyles.outletEmailText}>
                {props.email || "N/A"}
              </Text>
            </View>
            <View style={GlobalStyles.outletEmailView}>
              <Text style={GlobalStyles.outletEmailText}>
                {props.country_code}
                {props.phone_number}
              </Text>
            </View>
            <View style={GlobalStyles.outletEmailView}>
              <Text style={GlobalStyles.outletEmailText}>
                {props.mobile_country_code}
                {props.mobile_number}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 5,
              }}>
              <Text style={GlobalStyles.orderCardHeading}>{props.address}</Text>

              <View style={GlobalStyles.flexRow}>
                <TouchableOpacity onPress={() => EditWareHouse(props?.id)}>
                  <View style={{ marginRight: 20 }}>
                    <MaterialIcons
                      name='edit'
                      size={15}
                      color={COLORS.button}
                    />
                  </View>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => DeleteSubCatelogue(props?.id)}>
                    <AntDesign name='delete' size={15} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Delete popu Alert */}
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
            source={require("../../../assets/images/dashboard/delete_img.png")}
            style={[styles.successIcon]}></Image>
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Delete
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Are you sure want to delete?
          </Text>
          <View
            style={[styles.flexRow, styles.justifyCenter, styles.space_btn]}>
            <View style={[styles.width50, styles.PadR9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.cancelStyle,
                ]}
                onPress={() => refRBSheet.current.close()}>
                <Text style={[styles.font16, styles.textPri, styles.letspa35]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.width50, styles.PadL9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={() => DeleteSubCateCatelogueAPICall()}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Yes, delete it
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
      {/* Delete popu Alert Ends*/}

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
            Deleted Successfully
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Your warehouse deleted successfully
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => refRBSheet2.current.close()}>
              <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      {/* Success Popup Ends*/}
    </>
  );
};

export default WareHouseListCard;
