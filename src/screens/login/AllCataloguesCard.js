/** @format */

import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import GlobalStyles from "../../../assets/css/styles";
import { COLORS } from "../../constant/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import styles from "../../../assets/css/styles";
import React, {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
  Pressable,
} from "react-native";

const AllCataloguesCard = (props) => {
  // const date = moment(props.timing).format("MMM DD");
  // const in_stock = props.in_stock;
  const images = props.product_image;
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [deleteId, setdeleteId] = useState();

  //Edit Catelogue
  const Editcatelogue = (id) => {
    props.navigation.navigate("Editcatelogue", { id: props?.id });
  };

  //Delete Catelogue
  const DeleteCatelogue = (id) => {
    refRBSheet.current.open();
    setdeleteId(id);
  };
  //Delete catelogue API Integration
  const DeletecateCatelogueAPICall = async () => {
    refRBSheet.current.close();
    // const token =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";

    const token = await AsyncStorage.getItem("UserToken");
    var myJson = {
      id: [deleteId],
      status: 2,
    };
    const result = await api.CreateMasterData(
      endPoint.delete_catelogue,
      token,
      myJson
    );
    props.updateData();
  };

  return (
    <>
      <View style={GlobalStyles.paymentCardContainer}>
        <View style={GlobalStyles.paddingViewSubCatalogue}>
          <View
            style={[
              GlobalStyles.changeFlexDirection,
              GlobalStyles.justifyContent,
            ]}>
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              {/* <Image
              style={GlobalStyles.allOrdersImage}
              source={require("../../../assets/images/icons/MaskGroup.png")}
              // source={props.image}
            /> */}

              <Image
                source={{
                  uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
                }}
                style={GlobalStyles.catalogueImage}></Image>
            </View>
            <View style={{ flex: 3.2, paddingLeft: 15 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View style={{ width: "75%" }}>
                    <Text style={GlobalStyles.orderCardHeading}>
                      {props?.product_name}
                    </Text>
                  </View>
                
                  <View style={GlobalStyles.flexRow}>
                

                    { props?.status === "Active" ? 
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
                
                    {/* {moneyStatus == 10 ? (
                    <View style={GlobalStyles.outletActiveView}>
                      <Text style={GlobalStyles.paidText}>No Stock</Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.outletActiveView}>
                      <Text style={GlobalStyles.paidText}>In Stock</Text>
                    </View>
                  )} */}
                    {/* <View style={GlobalStyles.pricingTierInstockview}>
                      <Text style={GlobalStyles.pricingTierInstockText}>
                        In Stock
                      </Text>
                    </View> */}
                  </View>
                </View>
                <View style={GlobalStyles.catalogueCardFruitsText}>
                  <Text style={[GlobalStyles.subText]}>
                    {props?.category_name}({props?.umo})
                  </Text>
                </View>
                <View style={GlobalStyles.outletEmailView}>
                  <Text style={GlobalStyles.outletEmailText}>
                    Product Code : {props?.supplier_product_code}
                  </Text>
                </View>
                {/* <View style={GlobalStyles.outletEmailView}>
                  <Text style={GlobalStyles.outletEmailText}>
                    Registration No : {props?.registrationNumber}
                  </Text>
                </View> */}
                <View style={GlobalStyles.outletEmailView}>
                  <Text style={GlobalStyles.outletEmailText}>
                    Sub Category : {props?.subcategory_name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                  }}>
                    {props?.marketPlace === 1 ?
                  <View style={GlobalStyles.outletEmailView}>
                    <View>
                      <AntDesign
                        name='checkcircle'
                        size={11}
                        color={COLORS.green}
                      />
                    </View>
                    <View style={{ paddingLeft: 4 }}>
                      <Text style={GlobalStyles.emailText}>
                        Market Place Availability
                      </Text>
                    </View>
                  </View>
                  :
                  // null
                  <View style={GlobalStyles.outletEmailView}>
                  {/* <View>
                    <AntDesign
                      name='checkcircle'
                      size={11}
                      color={COLORS.red}
                    />
                  </View> */}
                  {/* <View style={{ paddingLeft: 4 }}>
                    <Text style={GlobalStyles.emailText1}>
                      Market Place Availability
                    </Text>
                  </View> */}
                </View>
}
                  <View style={GlobalStyles.flexRow}>
                    <TouchableOpacity onPress={() => Editcatelogue(props?.id)}>
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
                        onPress={() => DeleteCatelogue(props?.id)}>
                        <AntDesign name='delete' size={15} color={COLORS.red} />
                      </TouchableOpacity>
                    </View>
                  </View>
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
                onPress={() => DeletecateCatelogueAPICall()}>
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
        {/* <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.padt30]}>
          <Image source={require('../../../assets/images/dashboard/success_img.png')} style={[styles.successIcon]}></Image>
          <Text style={[styles.font22, styles.textBlack, styles.textCenter, styles.mb11, styles.fontBold]}>Deleted Successfully</Text>
          <Text style={[styles.font15, styles.textBlack, styles.mb37, styles.textCenter]}>Your catelogue deleted successfully</Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]} onPress={() => props.navigation.navigate("PaymentScreen")}>
              <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </RBSheet>
      {/* Success Popup Ends*/}
    </>
  );
};

export default AllCataloguesCard;
