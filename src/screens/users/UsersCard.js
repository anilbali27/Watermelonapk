/** @format */



import React, { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";

const UsersCard = (props) => {
  // // const date = new Date(1666632563517);
  // console.log(date.getMonth() + "/" + date.getDate());
  // // const month = date.toDateString();
  // // console.log(month, "oooooooooo");
  const images = props.profile;

  return (
    <View style={GlobalStyles.outletScreenouterView}>
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
          <View style={{ flex: 4 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{ width: "75%" }}>
                  <Text style={GlobalStyles.orderCardHeading}>
                    {props.firstname}
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
                  <Icon name='mail' size={11} color={COLORS.barkBlue} />
                </View>
                <View style={{ paddingLeft: 4 }}>
                  <Text style={GlobalStyles.outletEmailText}>
                    {props.email}
                  </Text>
                </View>
              </View>

              <View style={GlobalStyles.outletEmailView}>
                <View>
                  <Feather name='phone' size={11} color={COLORS.barkBlue} />
                </View>
                <View style={{ paddingLeft: 4 }}>
                  <Text style={GlobalStyles.outletEmailText}>
                    {props.countryCode} {props.phone_number}
                  </Text>
                </View>
              </View>
            </View>

            <View style={GlobalStyles.bottomLineOutletcard}>
              <View style={GlobalStyles.justifyContentCenter}>
                <View style={GlobalStyles.outletEmailView}>
                  <View>
                    <SimpleLineIcons
                      name='location-pin'
                      size={11}
                      color={COLORS.barkBlue}
                    />
                  </View>
                  <View style={{ paddingLeft: 4, width: "70%" }}>
                    <Text style={GlobalStyles.outletEmailText}>
                      {props.designation} - {props.permission_role_name}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={GlobalStyles.justifyContentCenter}>
                <View style={GlobalStyles.outletEmailView}>
                  {/* <View>
                    <AntDesign
                      name='checkcircle'
                      size={11}
                      color={COLORS.green}
                    />
                  </View> */}
                  {/* <View style={{ paddingLeft: 4 }}>
                    <Text >{props.tier_approval}</Text>
                  </View> */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UsersCard;