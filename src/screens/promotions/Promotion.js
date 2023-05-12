/** @format */

// /** @format */

// // /** @format */

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Alert,
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   SafeAreaView,
// //   StatusBar,
// //   Pressable,
// // } from "react-native";
// // import { Appbar, Searchbar } from "react-native-paper";

// // import PromotionCard from "./PromotionCard";
// // import GlobalStyles from "../../../assets/css/styles";
// // // import BackArrowIcon from "../../../assets/images/icons/BackArrowIcon";
// // import { useFonts } from "expo-font";
// // import * as Font from "expo-font";
// // import BackArrow from "../../../assets/images/icons/BackArrow";

// // const PromotionScreen = ({ navigation }) => {
// //   // useEffect(() => {
// //   //     Font.loadAsync({ Medium: require("../../../assets/fonts/Inter-Medium.ttf"),
// //   //    Bold : require("../../../assets/fonts/Inter-ExtraBold.ttf")

// //   //     }) }, [])

// //   // const [loaded] = useFonts({ HelveticaNeueLTStdMd: require("./assets/fonts/HelveticaNeueLTStd-Md.otf"), });
// //   //  if (!loaded) { return null; }

// //   const [searchQuery, setSearchQuery] = React.useState("");

// //   const onChangeSearch = (query) => setSearchQuery(query);

// //   return (
// //     <View style={GlobalStyles.orderContainer}>
// //       <View style={GlobalStyles.promotionsHeaderContainer}>
// //         <View
// //           style={{
// //             flexDirection: "row",
// //             paddingTop: 41,
// //             paddingLeft: 22,
// //             alignItems: "center",
// //           }}>
// //           {/* <BackArrowIcon /> */}
// //           <Pressable
// //             onPress={() => {
// //               //   navigation.navigate("DrawerNavigationRoutes");
// //               navigation.goBack();
// //             }}>
// //             <BackArrow />
// //           </Pressable>
// //           <Text style={GlobalStyles.promotionsHeaderText}>Promotions</Text>
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           height: 38,
// //           width: "100%",
// //           paddingLeft: 19,
// //           paddingRight: 18,
// //           marginTop: 25,
// //         }}>
// //         <Searchbar
// //           // icon={() => <SearchIcon />}
// //           inputStyle={GlobalStyles.searchInput}
// //           style={GlobalStyles.searchContainer}
// //           placeholderTextColor={"#0F141A"}
// //           placeholder='Search'
// //           onChangeText={() => {}}
// //           //   value={searchQuery}
// //         />
// //       </View>
// //       <View
// //         style={{
// //           paddingLeft: 19,
// //           paddingRight: 18,
// //           alignContent: "center",
// //           marginTop: 19,
// //           backgroundColor: "red",
// //         }}>
// //         <View>
// //           <PromotionCard />
// //         </View>
// //       </View>
// //       <View style={GlobalStyles.addButton}>
// //         <Text style={GlobalStyles.stictyText}>+</Text>
// //       </View>
// //     </View>
// //   );
// // };

// // export default PromotionScreen;

// /** @format */

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Alert,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Pressable,
//   FlatList,
//   ActivityIndicator,
//   TextInput,
// } from "react-native";
// import { Appbar, Searchbar } from "react-native-paper";
// import { COLORS } from "../../constant/Colors";

// import GlobalStyles from "../../../assets/css/styles";
// import BackArrow from "../../../assets/images/icons/BackArrow";
// import PromotionCard from "./PromotionCard";
// import SearchIcon from "../../../assets/images/icons/Search";
// import SettingIcon from "../../../assets/images/icons/Setting";

// const PromotionScreen = ({ navigation }) => {
//   return (
//     <View style={GlobalStyles.orderContainer}>
//       <View style={GlobalStyles.promotionsHeaderContainer}>
//         <View style={GlobalStyles.PromotionScreenIconView}>
//           <Pressable
//             onPress={() => {
//               //   navigation.navigate("DrawerNavigationRoutes");
//               navigation.goBack();
//             }}
//           >
//             <BackArrow />
//           </Pressable>
//           <Text style={GlobalStyles.promotionsHeaderText}>Promotions</Text>
//         </View>
//       </View>

//       <View style={GlobalStyles.searchBarPaddingView}>
//         <View style={GlobalStyles.searchBarView}>
//           <View style={GlobalStyles.searchIconView}>
//             <SearchIcon />
//             <View style={GlobalStyles.searchPlaceHolderView}>
//               <TextInput
//                 onChangeText={() => {}}
//                 // value={number}
//                 placeholder="Search"
//                 placeholderTextColor={COLORS.introText}
//               />
//             </View>
//           </View>
//           <View>
//             <Pressable
//               onPress={() => {
//                 console.log("pressed");
//               }}
//             >
//               <View style={GlobalStyles.searchfilterView}>
//                 <SettingIcon />
//               </View>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//       <View style={GlobalStyles.promotoinsCardPaddingView}>
//         <PromotionCard />
//       </View>

//       <View style={GlobalStyles.addButton}>
//         <Pressable
//           onPress={() => {
//             console.log("add promotions");
//           }}
//         >
//           <Text style={GlobalStyles.stictyText}>+</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default PromotionScreen;

import React from "react";
import { View, Text } from "react-native";

export default function PromotionScreen({ navigation }) {
  return (
    <View>
      <Text>PromotionScreen</Text>
    </View>
  );
}
