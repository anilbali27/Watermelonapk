/** @format */

import React, { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const InventoryCard = (props) => {
  // const datee = moment(props.date).format("D MMM YY");
  // console.log(datee, "dateeee");

  //Edit Catelogue
  const EditStock = (id, name, amounttype, price) => {
    props.navigation.navigate("EditStock");
  };

  return (
    <View style={GlobalStyles.paymentCardContainer}>
      <View style={GlobalStyles.paymentCardPaddingView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ width: "75%" }}>
            <Text style={GlobalStyles.orderCardHeading}>{props.name}</Text>
          </View>
          <View style={GlobalStyles.pricingTierInstockview}>
            <Text style={GlobalStyles.pricingTierInstockText}>In Stock</Text>
          </View>
        </View>
        <View>
          <Text style={[GlobalStyles.subText, GlobalStyles.paddingTwo]}>
            {props.productName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
          }}>
          <View style={{ flexDirection: "row", width: "90%" }}>
            <View style={{ width: "55%" }}>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Product Code :{props.productCode}
              </Text>
            </View>
            <Text style={{ color: "#DCDCDC", paddingLeft: 8, paddingRight: 8 }}>
              |
            </Text>
            <View style={{ width: "45%" }}>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                SKU : {props.skuName}
              </Text>
            </View>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
          <View style={{ width: "34%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Opening : {props.opening}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Add : {props.add}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Sales : {props.sales}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
          <View style={{ width: "34%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Lost : {props.lost}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Damaged : {props.damaged}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Expired : {props.expired}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
          <View style={{ width: "34%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Returned : {props.returned}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Adjusted : {props.adjusted}
            </Text>

            {/* <View style={GlobalStyles.verticalLine} /> */}
          </View>

          <View style={{ width: "33%" }}>
            <Text
              style={[
                GlobalStyles.subText,
                GlobalStyles.paddingThree,
                GlobalStyles.colorTwo,
              ]}>
              Closing : {props.closing}
            </Text>
          </View>
        </View>
        {/* <View style={GlobalStyles.paymentCardBottomLine}>
          <View style={GlobalStyles.justifyContentCenter}>
            <Text style={GlobalStyles.aedValueText}>AED 60.00</Text>
          </View>

          <View style={GlobalStyles.justifyContentCenter}>
            <Text style={GlobalStyles.getTimeText}></Text>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 5,
          }}>
          <Text style={GlobalStyles.aedValueText}>AED {props.totalPrice}</Text>

          <View style={GlobalStyles.flexRow}>
            <TouchableOpacity onPress={() => EditStock()}>
              <View>
                <MaterialIcons name='edit' size={16} color={COLORS.button} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InventoryCard;
