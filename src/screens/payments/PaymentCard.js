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

const PaymentCard = (props) => {
  // const datee = moment(props.date).format("D MMM YY");
  // console.log(datee, "dateeee");

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
              {props.invoiceUniqueName}
            </Text>
          </View>

          <View style={GlobalStyles.orderPaidStatus}>
            <Text style={GlobalStyles.paidText}>Paid</Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
          {/* <Text
            style={[GlobalStyles.subText, GlobalStyles.pt6, GlobalStyles.pr8]}>
            Type : {props.type}
          </Text> */}

          <View style={{ width: "25%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.pt6,
                GlobalStyles.pr8,
                { textAlign: "left" },
              ]}>
              Type : {props.type}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.pt6,
                GlobalStyles.pr8,
                GlobalStyles.pl8,
              ]}>
              Buyer : {props.buyer}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "32%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.pt6,
                GlobalStyles.pl8,
              ]}>
              Outlet : {props.outlet}
            </Text>
          </View>
        </View>
        <View style={GlobalStyles.paymentCardBottomLine}>
          <View style={GlobalStyles.justifyContentCenter}>
            <Text style={GlobalStyles.aedValueText}>AED {props.amount}</Text>
          </View>

          <View style={GlobalStyles.justifyContentCenter}>
            <Text style={GlobalStyles.getTimeText}>{props.date}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentCard;
