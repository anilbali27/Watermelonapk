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
import EditSubCatalogue from "./EditSubCatalogue";

const SubCatalogueCard = (props) => {
  // console.log(props,"SUBCATALOGFUECARD")
  const Status = props.in_stock;
  const sku = props.sku_name;
  const length = sku.length;
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [deleteId, setdeleteId] = useState();

  //Edit Sub Catelogue
  const EditSubCatalogue = (id) => {
    props.navigation.navigate("EditSubCatalogue", {data:props });
  };

  //Delete Sub Catelogue
  const DeleteSubCatelogue = (id) => {
    console.log("Deleteid::", id);
    refRBSheet.current.open();
    setdeleteId(id);
  };
  //Delete sub catelogue API Integration
  const DeleteSubCateCatelogueAPICall = async () => {
    refRBSheet.current.close();
    // let token =jsonValue;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    const token = await AsyncStorage.getItem("UserToken");
    var myJson = {
      id: [deleteId],
      status: 2,
    };
    console.log("myJsonCatelogue", myJson);
    const result = await api.CreateMasterData(
      endPoint.delete_sub_catelogue,
      token,
      myJson
    );
    props.updateData();
    console.log("deletesubcatelogueresult::", result.success === "1");
    // refRBSheet2.current.open();
    // if(result.success = 1){
    //   refRBSheet2.current.open();
    // }
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
                  {props.category_name}
                </Text>
              </View>
              <View style={GlobalStyles.flexRow}>


                {props?.status === "Visible" ?

                  <View style={{ paddingLeft: 4 }}>
                    <Text style={GlobalStyles.emailText}>
                    Active
                    </Text>
                  </View>
                  :
                  <View>

                  </View>



                }


              </View>
              {/* <View>
                {Status == 0 ? (
                  <View style={GlobalStyles.outletActiveView}>
                    <Text style={GlobalStyles.paidText}>No Stock</Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.outletActiveView}>
                    <Text style={GlobalStyles.paidText}>In Stock</Text>
                  </View>
                )}
              </View> */}
            </View>
            <View style={GlobalStyles.outletEmailView}>
              <Text style={GlobalStyles.outletEmailText}>
                NO : {props.product_code}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 5,
              }}>
              <Text style={[GlobalStyles.subText, GlobalStyles.colorTwo]}>
                No. of SKU's : {length}
              </Text>

              <View style={GlobalStyles.flexRow}>
                <TouchableOpacity
               onPress={() => EditSubCatalogue(props)}

                >
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
            Your sub catelogue deleted successfully
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

export default SubCatalogueCard;
