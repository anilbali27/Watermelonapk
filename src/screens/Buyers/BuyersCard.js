/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
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

const BuyersCard = (props) => {
  const date = moment(props.timing).format("MMM DD");
  const moneyStatus = props.moneyStatus;

  const rating = props.rating;

  const images = props.profile;

  // // const date = new Date(1666632563517);
  // console.log(date.getMonth() + "/" + date.getDate());
  // // const month = date.toDateString();
  // // console.log(month, "oooooooooo");

  return (<>
    
      <View style={GlobalStyles.paymentCardContainer}>
        <View style={GlobalStyles.allOrderCardInnerDimension}>
          <View
            style={[
              GlobalStyles.changeFlexDirection,
              GlobalStyles.justifyContent,
            ]}
          >
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
             style={GlobalStyles.allOrdersImage}
           ></Image>
            </View>
            <View style={{ flex: 4 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "75%" }}>
                    <Text style={GlobalStyles.orderCardHeading}>
                      {props.city}
                    </Text>
                  </View>
                  <View>

                    <View style={GlobalStyles.outletActiveView}>
                      <Text style={GlobalStyles.paidText}>{props.status_name}</Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.outletEmailView}>
                  <View>
                    <Text style={GlobalStyles.outletEmailText}>{props.firstname} {props.lastname}</Text>
                  </View>
                </View>

                <View style={GlobalStyles.outletEmailView}>
                  <View>
                    <Text style={GlobalStyles.outletEmailText}>
                      Reg. No : {props.company_registration_no} 
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.outletEmailView}>
                  <View>
                    <Text style={GlobalStyles.outletEmailText}>
                    Buyer Type : {props.buyer_type ? props.buyer_type : "NA"} 
                    </Text>
                  </View>
                </View>
                {/* <View style={GlobalStyles.outletEmailView}>
                  <View>
                    <Text style={GlobalStyles.outletEmailText}>
                    Approval : {props.buyer_type} 
                    </Text>
                  </View>
                </View> */}
              </View>

              {/* <View style={GlobalStyles.bottomLineOutletcard}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.outletEmailView}>
                    <View style={{ width: "70%" }}>
                      <Text style={GlobalStyles.emailText}>{props.on_boarding_status_name}</Text>
                    </View>
                  </View>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </View>
  </>
  );
};

export default BuyersCard;