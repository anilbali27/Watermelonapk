/** @format */

// /** @format */

// import React, { useState } from "react";
// import { View, Text, Image, Pressable } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

// import GlobalStyles from "../../../assets/css/styles";
// import Star from "../../../assets/images/icons/Star";
// import { G } from "react-native-svg";

// const InvoiceDetailCard = (props) => {
//   const [count, setCount] = useState(0);

//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   const handleDecrement = () => {
//     setCount(count - 1);
//   };

//   const images = props.image;

//   console.log(props, "ffffffffffffffff");

//   return (
//     <View
//       style={[
//         GlobalStyles.orderDetailCardGlobalView,
//         GlobalStyles.invoiceListDetail,
//       ]}>
//       <View style={GlobalStyles.orderDetailCardInnerDimension}>
//         <View style={GlobalStyles.changeFlexDirection}>
//           <View style={GlobalStyles.width30}>
//             <Image
//               source={{
//                 uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
//               }}
//               style={GlobalStyles.invoiceImg}></Image>
//             <View style={GlobalStyles.addSubView}>
//               <View style={[GlobalStyles.addSubViewOne]}>
//                 <Pressable
//                   onPress={handleDecrement}
//                   style={GlobalStyles.addSubViewTwo}>
//                   <Text style={GlobalStyles.colorTwo}>-</Text>
//                 </Pressable>
//                 <View style={GlobalStyles.addSubViewTwo}>
//                   <Text style={GlobalStyles.colorTwo}>{count}</Text>
//                 </View>
//                 <Pressable
//                   style={GlobalStyles.addSubViewFour}
//                   o
//                   onPress={handleIncrement}>
//                   <Text style={GlobalStyles.colorTwo}>+</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//           <View style={GlobalStyles.width70}>
//             <Text style={GlobalStyles.orderDetailCardHeading}>
//               {props.title}
//             </Text>
//             <Text
//               style={[
//                 GlobalStyles.font10,
//                 GlobalStyles.textDefault,
//                 GlobalStyles.mb3,
//               ]}>
//               {props.displayskuName}
//             </Text>
//             <Text
//               style={[
//                 GlobalStyles.font10,
//                 GlobalStyles.textDefault,
//                 GlobalStyles.mb3,
//               ]}>
//               Package {props.displayskuName}
//             </Text>
//             <Text
//               style={[
//                 GlobalStyles.font10,
//                 GlobalStyles.textDefault,
//                 GlobalStyles.mb3,
//               ]}>
//               Received Qty {props.displayskuName}{" "}
//             </Text>
//             <View style={GlobalStyles.orderCardflexView}>
//               <Text
//                 style={[
//                   GlobalStyles.font14,
//                   GlobalStyles.amountText,
//                   GlobalStyles.fontSemi,
//                 ]}>
//                 AED {props.costPriceperUnit}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default InvoiceDetailCard;

import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import { G } from "react-native-svg";

const InvoiceDetailCard = (props) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const images = props.image;

  // console.log(props, "ffffffffffffffff");

  return (
    <View
      style={[
        GlobalStyles.orderDetailCardGlobalView,
        GlobalStyles.invoiceListDetail,
      ]}>
      <View style={GlobalStyles.orderDetailCardInnerDimension}>
        <View style={GlobalStyles.changeFlexDirection}>
          <View style={GlobalStyles.width30}>
            <Image
              source={{
                uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
              }}
              style={GlobalStyles.invoiceImg}></Image>
            <View style={GlobalStyles.addSubView}>
              <View style={[GlobalStyles.addSubViewOne]}>
                <Pressable
                  onPress={handleDecrement}
                  style={GlobalStyles.addSubViewTwo}>
                  <Text style={GlobalStyles.colorTwo}>-</Text>
                </Pressable>
                <View style={GlobalStyles.addSubViewTwo}>
                  <Text style={GlobalStyles.colorTwo}>{count}</Text>
                </View>
                <Pressable
                  style={GlobalStyles.addSubViewFour}
                  o
                  onPress={handleIncrement}>
                  <Text style={GlobalStyles.colorTwo}>+</Text>
                </Pressable>
              </View>
            </View>
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
              <Text
                style={[
                  GlobalStyles.font14,
                  GlobalStyles.amountText,
                  GlobalStyles.fontSemi,
                ]}>
                AED {props.costPriceperUnit}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InvoiceDetailCard;
