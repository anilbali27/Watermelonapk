/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const ReviewCard = (props) => {
  const date = moment(props.datee).format("DD-MMM-YYYY");

  const moneyStatus = props.moneyStatus;

  const rating = props.rating;

  const images = props.image;

  // // const date = new Date(1666632563517);
  // console.log(date.getMonth() + "/" + date.getDate());
  // // const month = date.toDateString();
  // // console.log(month, "oooooooooo");

  return (
    <View style={GlobalStyles.paymentCardContainer}>
      <View style={GlobalStyles.paymentCardPaddingView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ width: "75%" }}>
            <Text style={GlobalStyles.orderCardHeading}>
              {props.supplier_name}
            </Text>
          </View>

          <View>
            <Text style={GlobalStyles.outletEmailText}>{date}</Text>
          </View>
        </View>
        <View style={{ paddingTop: 2, paddingBottom: 6 }}>
          <Text style={GlobalStyles.outletTextorders}>{props.buyerName}</Text>
        </View>
        {rating == 0 ? (
          <View
            style={[
              GlobalStyles.changeFlexDirection,
              GlobalStyles.ratingreviewStart,
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
            style={[GlobalStyles.changeFlexDirection, GlobalStyles.ratingView]}>
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
            style={[GlobalStyles.changeFlexDirection, GlobalStyles.ratingView]}>
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
            style={[GlobalStyles.changeFlexDirection, GlobalStyles.ratingView]}>
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
            style={[GlobalStyles.changeFlexDirection, GlobalStyles.ratingView]}>
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
            style={[GlobalStyles.changeFlexDirection, GlobalStyles.ratingView]}>
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
            paddingTop: 9,
          }}>
          <Text style={[GlobalStyles.subText, GlobalStyles.colorTwo]}>
            {props.review}
          </Text>

          <View style={GlobalStyles.flexRow}>
            <View>
              {/* <MaterialIcons name='edit' size={15} color={COLORS.button} /> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
