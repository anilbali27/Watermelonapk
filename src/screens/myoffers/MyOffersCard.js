/** @format */

// /** @format */

// import React from "react-native";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
// import moment from "moment";

// import GlobalStyles from "../../../assets/css/styles";
// import Star from "../../../assets/images/icons/Star";
// import SvgUri from "react-native-svg-uri-updated";

// const MyOffersCard = (props) => {
//   const date = moment(props.timing).format("MMM DD");
//   const in_stock = props.in_stock;
//   console.log(props, "props");

//   return (
//     <View
//       style={[
//         GlobalStyles.catalogueCol,
//         GlobalStyles.flexRow,
//         GlobalStyles.justifyBetween,
//         GlobalStyles.whiteBg,
//       ]}
//     >
//       <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
//         <Image
//           style={[
//             GlobalStyles.catalogueImg,
//             GlobalStyles.resizeContain,
//             GlobalStyles.mr8,
//           ]}
//           source={require("../../../assets/images/icons/MaskGroup.png")}
//           //source={props.product_image}
//         />
//         <View>
//           <Text
//             style={[
//               GlobalStyles.font12,
//               GlobalStyles.textBlack,
//               GlobalStyles.fontSemi,
//               GlobalStyles.mb2,
//             ]}
//           >
//             Uni Food - Dubai,UAE
//           </Text>
//           <Text
//             style={[
//               GlobalStyles.font10,
//               GlobalStyles.textDefault,
//               GlobalStyles.mb7,
//             ]}
//           >
//             #261123
//           </Text>
//           <Text
//             style={[
//               GlobalStyles.font10,
//               GlobalStyles.textBlack,
//               GlobalStyles.mb7,
//             ]}
//           >
//             Weight in kg : 10
//           </Text>
//           <View style={[GlobalStyles.flexRow]}>
//             <Text
//               style={[
//                 GlobalStyles.font10,
//                 GlobalStyles.textBlack,
//                 GlobalStyles.mb7,
//               ]}
//             >
//               Category : Fresh
//             </Text>
//           </View>
//           <Text
//             style={[
//               GlobalStyles.font10,
//               GlobalStyles.textBlack,
//               GlobalStyles.mb7,
//             ]}
//           >
//             Offer price : AED 12
//           </Text>
//         </View>
//       </View>
//       <View
//         style={[
//           GlobalStyles.cataloguergt,
//           GlobalStyles.flexColumn,
//           GlobalStyles.justifyBetween,
//           GlobalStyles.alignEnd,
//         ]}
//       >
//         <View
//           style={[
//             GlobalStyles.flexRow,
//             GlobalStyles.alignCenter,
//             GlobalStyles.padR6,
//           ]}
//         >
//           <TouchableOpacity>
//             <SvgUri
//               source={require("../../../assets/images/dashboard/edit_icon.svg")}
//             />
//           </TouchableOpacity>
//           {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
//                         <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
//                     </TouchableOpacity> */}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default MyOffersCard;

/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const MyOffersCard = () => {
  return (
    <View style={GlobalStyles.allOrderCardcardView}>
      <View style={GlobalStyles.allOrderCardInnerDimension}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Image
              style={GlobalStyles.allOrdersImage}
              source={require("../../../assets/images/icons/MaskGroup.png")}
            />
          </View>
          <View style={{ flex: 5 }}>
            <View style={GlobalStyles.textView}>
              <Text style={GlobalStyles.orderCardHeading}>
                Uni Food - Dubai, UAE
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.colorOne,
                  GlobalStyles.paddingFour,
                ]}>
                #261311
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Weight in kg : 10
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Category : Fresh Fruits
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 10,
              }}>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Offer Price : AED 55.05
              </Text>

              <View style={GlobalStyles.flexRow}>
                <View style={{ marginRight: 20 }}>
                  <MaterialIcons name='edit' size={15} color={COLORS.button} />
                </View>
                <AntDesign name='delete' size={15} color={COLORS.red} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyOffersCard;
