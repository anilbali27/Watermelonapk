/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import RBSheet from "react-native-raw-bottom-sheet";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from "../../../assets/css/styles";

const AllOrdersCard = (props) => {
  const date = moment(props.timing).format("MMM DD");
  // console.log(date, "ooooo9");

  const moneyStatus = props.moneyStatus;

  const rating = props.rating;

  const images = props.image;
  // console.log("props?.products_info", props?.products_info)
  // console.log(images, "88888888");

  // // const date = new Date(1666632563517);
  // console.log(date.getMonth() + "/" + date.getDate());
  // // const month = date.toDateString();
  // // console.log(month, "oooooooooo");
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const [deleteId, setdeleteId] = useState();
  const [productId, setProductId] = useState();
  const [productRangeId, setProductRangeId] = useState();
  const [productInfo, setProductInfo] = useState([])
  const productData = props?.products_info;
  
  // setProductInfo(props?.products_info)
  //Delete Sub Catelogue
  const DeleteOrder = (id, product_id, product_range_id) => {
    console.log("Deleteid::", id, "productId", product_id, "productrangeid", product_range_id)
    refRBSheet.current.open();
    setdeleteId(id);
    setProductId(product_id);
    setProductRangeId(product_range_id);
  }
  //Delete sub catelogue API Integration
  const DeleteOrderAPICall = async () => {
    refRBSheet.current.close();
    const token = await AsyncStorage.getItem("UserToken");
    var myJson = {
      order_id: deleteId,
      product_id: productId,
      price_range_id: productRangeId
    }
    console.log("myJsonOrder", myJson)
    const result = await api.CreateMasterData(endPoint.delete_order, token, myJson);
    console.log("deleteOrderresult::", result);
    props.updateData();

  }

  return (
    <>
      <View style={GlobalStyles.allOrderCardcardView}>
        <View style={GlobalStyles.allOrderCardInnerDimension}>
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
                style={GlobalStyles.allOrdersImage}></Image>
            </View>
            <View style={{ flex: 3.5 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View style={{ width: "75%" }}>
                    <Text style={GlobalStyles.orderCardHeading}>
                      {props.title}
                    </Text>
                  </View>
                  <View>
                    {moneyStatus == 10 ? (
                      <View style={GlobalStyles.orderPaid}>
                        <Text style={GlobalStyles.paidText}>UnPaid</Text>
                      </View>
                    ) : (
                      <View style={GlobalStyles.orderPaidStatus}>
                        <Text style={GlobalStyles.paidText}>Paid</Text>
                      </View>
                    )}
                  </View>
                </View>

                <Text style={GlobalStyles.outletTextorders}>
                  Outlet : {props.outlet}
                </Text>

                {rating == 0 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>

                    <Star />
                  </View>
                ) : null}
                {rating == 1 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>

                    <Star />
                  </View>
                ) : null}
                {rating == 2 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>

                    <Star />
                  </View>
                ) : null}
                {rating == 3 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star />
                    </View>
                    <Star />
                  </View>
                ) : null}
                {rating == 4 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <Star />
                  </View>
                ) : null}
                {rating == 5 ? (
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.ratingView,
                    ]}>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <View style={GlobalStyles.ratingPadding}>
                      <Star color={COLORS.gold} />
                    </View>
                    <Star color={COLORS.gold} />
                  </View>
                ) : null}
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.paddingThree,
                  ]}>
                  <View style={GlobalStyles.acticeView}>
                    <FontAwesome name='circle' size={5} color={COLORS.green} />
                  </View>
                  <Text style={GlobalStyles.emailText}>{props.emailStatus}</Text>
                  <View
                    style={[
                      GlobalStyles.changeFlexDirection,
                      GlobalStyles.orderActiveView,
                    ]}>
                    <View style={GlobalStyles.acticeView}>
                      <FontAwesome name='circle' size={5} color={COLORS.green} />
                    </View>
                    <Text style={GlobalStyles.emailText}>Order sent</Text>
                  </View>
                </View>
              </View>

              <View style={GlobalStyles.bottomLineOrderCared}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.aedValueText}>
                    AED {props.amount}
                  </Text>
                </View>

                <View style={[GlobalStyles.justifyContentCenter, styles.mrg20]}>
                  <Text style={GlobalStyles.getTimeText}>Get it by {date}</Text>
                </View>
                <View>
                  <TouchableOpacity onPress={() => DeleteOrder(props?.id, props?.products_info[0]?.id, props?.products_info[0]?.price_range_id)}>
                    <AntDesign name='delete' size={15} color={COLORS.red} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <View style={GlobalStyles.flexRow}>
                    <View style={{ marginRight: 20 }}>
                      <MaterialIcons
                        name='edit'
                        size={15}
                        color={COLORS.button}
                      />
                    </View>
                    
                  </View> */}
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
          }
        }}>
        <View style={[styles.flexColumn, styles.alignCenter, styles.justifyCenter, styles.padt30]}>
          <Image source={require('../../../assets/images/dashboard/delete_img.png')} style={[styles.successIcon]}></Image>
          <Text style={[styles.font22, styles.textBlack, styles.textCenter, styles.mb11, styles.fontBold]}>Delete</Text>
          <Text style={[styles.font15, styles.textBlack, styles.mb37, styles.textCenter]}>Are you sure want to delete?</Text>
          <View style={[styles.flexRow, styles.justifyCenter, styles.space_btn]}>
            <View style={[styles.width50, styles.PadR9]}>
              <TouchableOpacity style={[styles.continueBtn, styles.flexRow, styles.justifyCenter, styles.cancelStyle]} onPress={() => refRBSheet.current.close()}>
                <Text style={[styles.font16, styles.textPri, styles.letspa35]}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.width50, styles.PadL9]}>
              <TouchableOpacity style={[styles.continueBtn, styles.flexRow, styles.justifyCenter]} onPress={() => DeleteOrderAPICall()}>
                <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Yes, delete it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
      {/* Delete popu Alert Ends*/}
    </>
  );
};

export default AllOrdersCard;
