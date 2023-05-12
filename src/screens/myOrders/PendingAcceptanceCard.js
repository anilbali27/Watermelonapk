/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import { useState } from "react";

const PendingAcceptanceCard = (props) => {
  const datee = moment(props.timing).format("MMM DD");

  const rating = props.rating;

  const status = props.status;

  const images = props.image;

 


  console.log(status, "333333333333333333333.....................");
  return (
    <View style={GlobalStyles.allOrderCardcardView}>
      <View style={GlobalStyles.allOrderCardInnerDimension}>
        <View style={{ width: "100%" }}>
          <View
            style={[
              GlobalStyles.changeFlexDirection,
              GlobalStyles.justifyContent,
            ]}>
            <View
              style={[
                GlobalStyles.changeFlexDirection,
                GlobalStyles.imagePadding,
              ]}>
              {/* <Image
                style={GlobalStyles.allOrdersImage}
                source={require("../../../assets/images/icons/MaskGroup.png")}
              /> */}
              <Image
                source={{
                  uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
                }}
                style={GlobalStyles.allOrdersImage}></Image>
              <View style={GlobalStyles.textView}>
                <Text style={GlobalStyles.orderCardHeading}>{props.title}</Text>
                <Text style={GlobalStyles.outletTextorders}>
                  Outlet :{props.outlet}
                </Text>
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}>
                  {/* <View style={GlobalStyles.ratingPadding}>
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

              <Star /> */}

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
                </View>

                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.paddingThree,
                  ]}>
                  <View style={GlobalStyles.acticeView}>
                    <FontAwesome name='circle' size={5} color='green' />
                  </View>
                  <Text style={GlobalStyles.emailText}>
                  {props.emailStatus}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.bottomLinePendingAcceptanceCard}>
            <View style={GlobalStyles.justifyContentCenter}>
              <Text style={GlobalStyles.aedValueText}>AED {props.amount}</Text>
            </View>

            <View style={GlobalStyles.justifyContentCenter}>
              <Text style={GlobalStyles.getTimeText}>
                Payment due by {datee}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PendingAcceptanceCard;
