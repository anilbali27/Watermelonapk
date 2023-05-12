/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";

const InvoiceCard = (props) => {
  const status_name = props.status_name;

  return (
    // <View
    //   style={[
    //     GlobalStyles.catalogueCol,
    //     GlobalStyles.flexRow,
    //     GlobalStyles.justifyBetween,
    //     GlobalStyles.whiteBg,
    //   ]}
    // >
    //   <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
    //     <View>
    //       <Text
    //         style={[
    //           GlobalStyles.font12,
    //           GlobalStyles.textBlack,
    //           GlobalStyles.fontSemi,
    //           GlobalStyles.mb7,
    //         ]}
    //       >
    //         Unibic Dubai International
    //       </Text>
    //       <Text
    //         style={[
    //           GlobalStyles.font12,
    //           GlobalStyles.textDefault,
    //           GlobalStyles.mb7,
    //         ]}
    //       >
    //         Outlet : {props.supplier_address}
    //       </Text>
    //       <Text
    //         style={[
    //           GlobalStyles.font10,
    //           GlobalStyles.textBlue,
    //           GlobalStyles.mb7,
    //         ]}
    //       >
    //         {props.unique_name}
    //       </Text>
    //       <View style={[GlobalStyles.flexRow]}>
    //         <Text
    //           style={[
    //             GlobalStyles.font14,
    //             GlobalStyles.textblueOne,
    //             GlobalStyles.mb7,
    //           ]}
    //         >
    //           AED 10
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    //   <View
    //     style={[
    //       GlobalStyles.cataloguergt,
    //       GlobalStyles.flexColumn,
    //       GlobalStyles.justifyBetween,
    //       GlobalStyles.alignEnd,
    //     ]}
    //   >
    //     {status_name === "Paid" ? (
    //       <View style={[GlobalStyles.stockView, GlobalStyles.redBg]}>
    //         <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
    //           Paid
    //         </Text>
    //       </View>
    //     ) : (
    //       <View style={GlobalStyles.stockViewUnpaid}>
    //         <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
    //           Unpaid
    //         </Text>
    //       </View>
    //     )}

    //     <View
    //       style={[
    //         GlobalStyles.flexRow,
    //         GlobalStyles.alignCenter,
    //         GlobalStyles.padR6,
    //       ]}
    //     >
    //       <Text
    //         style={[
    //           GlobalStyles.font10,
    //           GlobalStyles.textblueOne,
    //           GlobalStyles.mb7,
    //         ]}
    //       >
    //         <Icon name="calendar" size={10}>
    //           {" "}
    //         </Icon>
    //         {props.due_date} <Icon name="clock" size={10}></Icon>11:50:00
    //         {/* <Icon name='calendar' size={10}></Icon> 11:50:00 */}
    //       </Text>
    //     </View>
    //   </View>
    // </View>
    // <View
    //   style={[
    //     GlobalStyles.catalogueCol,
    //     GlobalStyles.flexRow,
    //     GlobalStyles.justifyBetween,
    //     GlobalStyles.whiteBg,
    //   ]}
    // >
    //   <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>

    //     <View style={{ width: "60%" }}>
    //       <Text
    //         style={[
    //           GlobalStyles.font12,
    //           GlobalStyles.textBlack,
    //           GlobalStyles.fontSemi,
    //           GlobalStyles.mb2,
    //         ]}
    //       >
    //         {props.supplier_address}
    //       </Text>

    //       <Text
    //          style={[
    //           GlobalStyles.font10,
    //           GlobalStyles.textDefault,
    //           GlobalStyles.mb7,
    //         ]}
    //       >
    //           {props.unique_name}

    //       </Text>

    //       <Text
    //         style={[
    //           GlobalStyles.font10,
    //           GlobalStyles.textBlack,
    //           GlobalStyles.mb7,
    //           GlobalStyles.padR6,
    //         ]}
    //       >

    //       </Text>

    //     </View>
    //   </View>
    //   <View
    //     style={[
    //       GlobalStyles.cataloguergt,
    //       GlobalStyles.flexColumn,
    //       GlobalStyles.justifyBetween,
    //       GlobalStyles.alignEnd,
    //     ]}
    //   >
    //      <Text
    //         style={[
    //           GlobalStyles.font10,
    //           GlobalStyles.textBlack,
    //           GlobalStyles.mb7,
    //         ]}
    //       >

    //       </Text>
    //     <View
    //       style={[
    //         GlobalStyles.flexRow,
    //         GlobalStyles.alignCenter,
    //         GlobalStyles.padR6,
    //       ]}
    //     >
    //        {status_name === "Paid" ? (
    //       <View style={[GlobalStyles.stockView, GlobalStyles.redBg]}>
    //         <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
    //           Paid
    //         </Text>
    //       </View>
    //     ) : (
    //       <View style={GlobalStyles.stockView}>
    //         <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
    //          Un paid
    //         </Text>
    //       </View>
    //     )}
    //     < View style={[
    //         GlobalStyles.flexRow,
    //         GlobalStyles.alignCenter,
    //         GlobalStyles.padR6,
    //       ]}>
    //       <Text style={GlobalStyles.invoiceDate}>
    //              <Icon name='calendar' size={10}></Icon>{props.due_date}{" "}
    //              <Icon name='calendar' size={10}></Icon> 11:50:00
    //            </Text>
    //       {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
    //             <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
    //         </TouchableOpacity> */}
    //     </View>
    //     </View>
    //   </View>
    // </View>

    // <View style={GlobalStyles.paymentCardContainer}>
    //   <View style={GlobalStyles.invoiceView}>
    <View style={GlobalStyles.paymentCardContainer}>
      <View style={GlobalStyles.paymentCardPaddingView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View style={{ width: "75%" }}>
            <Text style={GlobalStyles.orderCardHeading}>
              {props.unique_name}
            </Text>
          </View>

          <View style={GlobalStyles.orderPaidStatus}>
            <Text style={GlobalStyles.paidText}>Paid</Text>
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.justifyBetween]}>
          <Text style={[GlobalStyles.subText, GlobalStyles.pt6]}>
            Outlet : Abu Dhabi
          </Text>
        </View>
        <View style={GlobalStyles.invoiceINVView}>
          <Text style={[GlobalStyles.invoiceINVText]}>INV-000039</Text>
        </View>
        <View style={GlobalStyles.invoiceBottomView}>
          <View style={GlobalStyles.justifyContentCenter}>
            <Text style={GlobalStyles.aedValueText}>AED {props.amount}</Text>
          </View>

          <View style={{ justifyContent: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingRight: 15 }}>
                <Text style={GlobalStyles.subText}>
                  <Icon name='calendar' size={10}></Icon> Mar 23 11.50.01
                </Text>
              </View>
              <View>
                <Text style={GlobalStyles.subText}>
                  <Icon name='clock' size={10} />
                  11:50:00
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvoiceCard;
