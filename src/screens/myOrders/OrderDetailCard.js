/** @format */

import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import { G } from "react-native-svg";

const OrderDetailCard = (props) => {
  console.log(props, "propspropsprops");
  const [count, setCount] = useState(props.quantity ? props.quantity : 1);
  const handleIncrement = () => {
    setCount(count + 1);
    props.incrementqty(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      props.incrementqty(count - 1);
    }
  };

  const images = props.image;

  return (
    <View style={GlobalStyles.orderDetailCardGlobalView}>
      <View style={GlobalStyles.orderDetailCardInnerDimension}>
        <View style={{ width: "100%" }}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={GlobalStyles.width30}>
              {/* <Image
                style={GlobalStyles.allOrdersImage}
                source={require("../../../assets/images/icons/MaskGroup.png")}
              /> */}
              <Image
                source={{
                  uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
                }}
                style={GlobalStyles.invoiceImg}></Image>

              {/* <View style={GlobalStyles.addSubView}>
                <View style={GlobalStyles.addSubViewOne}>
                  <Pressable onPress={handleDecrement}>
                    <View style={GlobalStyles.addSubViewTwo}>
                      <Text style={GlobalStyles.colorTwo}>-</Text>
                    </View>
                  </Pressable>
                  <View style={GlobalStyles.addSubViewTwo}>
                    <Text style={GlobalStyles.colorTwo}>{count}</Text>
                  </View>
                  <Pressable o onPress={handleIncrement}>
                    <View style={GlobalStyles.addSubViewFour}>
                      <Text style={GlobalStyles.colorTwo}>+</Text>
                    </View>
                  </Pressable>
                </View>
              </View> */}
              {props.status === 10 ? (
                <View style={GlobalStyles.addSubView}>
                  <View style={GlobalStyles.addSubViewOne}>
                    <Pressable onPress={handleDecrement}>
                      <View style={GlobalStyles.addSubViewTwo}>
                        <Text style={GlobalStyles.colorTwo}>-</Text>
                      </View>
                    </Pressable>
                    <View style={GlobalStyles.addSubViewTwo}>
                      <Text style={GlobalStyles.colorTwo}>{count}</Text>
                    </View>
                    <Pressable o onPress={handleIncrement}>
                      <View style={GlobalStyles.addSubViewFour}>
                        <Text style={GlobalStyles.colorTwo}>+</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              ) : (
                <View style={GlobalStyles.addSubView}>
                  <View style={GlobalStyles.addSubViewOne}>
                    {/* <Pressable 
              onPress={handleDecrement}> */}
                    <View style={GlobalStyles.addSubViewTwo}>
                      <Text style={GlobalStyles.colorTwo}>-</Text>
                    </View>
                    {/* </Pressable> */}
                    <View style={GlobalStyles.addSubViewTwo}>
                      <Text style={GlobalStyles.colorTwo}>{count}</Text>
                    </View>
                    {/* <Pressable o onPress={handleIncrement}> */}
                    <View style={GlobalStyles.addSubViewFour}>
                      <Text style={GlobalStyles.colorTwo}>+</Text>
                    </View>
                    {/* </Pressable> */}
                  </View>
                </View>
              )}
            </View>
            <View style={GlobalStyles.width70}>
              <Text style={GlobalStyles.orderDetailCardHeading}>
                {props.title}
              </Text>
              <Text
                style={[
                  GlobalStyles.font10,
                  GlobalStyles.textDefault,
                  GlobalStyles.mb3,
                ]}>
                {props.displayskuName}
              </Text>
              <Text
                style={[
                  GlobalStyles.font10,
                  GlobalStyles.textDefault,
                  GlobalStyles.mb3,
                ]}>
                Package {props.displayskuName}
              </Text>
              <Text
                style={[
                  GlobalStyles.font10,
                  GlobalStyles.textDefault,
                  GlobalStyles.mb3,
                ]}>
                Received Qty {props.displayskuName}{" "}
              </Text>
              <View style={GlobalStyles.orderCardflexView}>
                <View>
                  <Text
                    style={[
                      GlobalStyles.font14,
                      GlobalStyles.amountText,
                      GlobalStyles.fontSemi,
                    ]}>
                    AED {props.costPriceperUnit * count}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailCard;
