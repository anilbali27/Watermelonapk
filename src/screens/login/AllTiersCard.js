

/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import Editcatelogue from "./Editcatelogue";
import { COLORS } from "../../constant/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import styles from "../../../assets/css/styles";
import Edittier from "./Edittier";
import EditSubCatalogue from "./EditSubCatalogue";

const AllTiersCard = (props) => {
  console.log(props, "props");
  // const id = props._id;
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [deleteId, setdeleteId] = useState();

  //Edit Catelogue
  const Edittier = (id) => {
    props.navigation.navigate("Edittier", {
      id: props?.id,
      tierName: props?.tierName,
      amountType: props?.amountType,
      value1: props?.value,
    });
  };

  //Delete Tier
  const DeleteTier = (id) => {
    console.log("Deleteid::", id);
    console.log("props.navigation::", props.navigation);
    refRBSheet.current.open();
    setdeleteId(id);
  };
  //Delete Tier API Integration
  const DeleteTierAPICall = async () => {
    refRBSheet.current.close();
    const token = await AsyncStorage.getItem("UserToken");
    var myJson = {
      id: [deleteId],
      status: 2,
    };
    console.log("myJsontier", myJson);
    const result = await api.CreateMasterData(
      endPoint.delete_tier,
      token,
      myJson
    );
    props.updateData();
    console.log("deletetierresult::", result.success === "1");
    // refRBSheet2.current.open();

    // if(result.success = 1){
    //   refRBSheet2.current.open();
    // }
    console.log("result.data?.length::", result.data?.length);
  };
  return (
    <>
      <View style={GlobalStyles.paymentCardContainer}>
        <View style={GlobalStyles.paymentCardPaddingView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ width: "75%" }}>
              <Text style={GlobalStyles.orderCardHeading}>
                {props.tierName}
              </Text>
            </View>
            <View style={GlobalStyles.flexRow}>


              {props?.status === 1 ?

                <View style={{ paddingLeft: 4 }}>
                  <Text style={GlobalStyles.emailText}>
                  Active
                  </Text>
                </View>
                :
                <View style={{ paddingLeft: 4 }}>
                  <Text style={GlobalStyles.emailText1}>
                  Inactive
                  </Text>
                </View>



              }


            </View>

          </View>
          <View style={GlobalStyles.outletEmailView}>
            <Text style={GlobalStyles.outletEmailText}>
              Amount Type : {props.amountType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 10,
              paddingTop: 5,
            }}>
            <Text style={[GlobalStyles.subText, GlobalStyles.colorTwo]}>
              Value : {props.value}
            </Text>

            <View style={GlobalStyles.flexRow}>
              <TouchableOpacity onPress={() => Edittier(props?.id)}>
                <View style={{ marginRight: 20 }}>
                  <MaterialIcons name='edit' size={15} color={COLORS.button} />
                </View>
              </TouchableOpacity>

              <View>
                <TouchableOpacity onPress={() => DeleteTier(props?.id)}>
                  <AntDesign name='delete' size={15} color={COLORS.red} />
                </TouchableOpacity>
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
                onPress={() => DeleteTierAPICall()}>
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
            Your Tier deleted successfully
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => props.navigation.goback()}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => props.navigation.goback()}>
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

export default AllTiersCard;
