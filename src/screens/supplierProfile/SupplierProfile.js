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
// import SearchIcon from "../../../assets/images/icons/Search";
// import SettingIcon from "../../../assets/images/icons/Setting";

// const SupplierProfileScreen = ({ navigation }) => {
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
//           <Text style={GlobalStyles.promotionsHeaderText}>SupplierProfile</Text>
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
//     </View>
//   );
// };

// export default SupplierProfileScreen;
