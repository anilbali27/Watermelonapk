/** @format */

// import React, { useState, useEffect, useReducer, useCallback } from 'react';
// import {
//   Alert,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Pressable,
//   Dimensions
// } from 'react-native';
// import { Rating, AirbnbRating } from 'react-native-ratings';
// import styles from '../../../assets/css/styles';
// import SvgUri from 'react-native-svg-uri-updated';
// import { Button } from 'react-native-paper';
// export default function AddReview({ navigation }) {
//      const [comment, onChangeComment] = useState('')
//   return (
//     <SafeAreaView style={[styles.width100, styles.flex1]}>
//       <ScrollView style={[styles.grayBg, styles.width100]}>

//         <View style={[styles.signupTitle, styles.mb28, styles.primaryBg, styles.flexRow, styles.alignCenter, styles.headerShadow]}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <SvgUri source={require('../../../assets/images/dashboard/white_left_arrow.svg')} />
//           </TouchableOpacity>
//           <Text style={[styles.font16, styles.textWhite, styles.padl15, styles.fontMed]}>KF12</Text>
//         </View>

//         <View style={[styles.ph18, styles.mb18, styles.width100]}>
//           <View style={[styles.mb24]}>
//             <Text style={[styles.textDefault, styles.font13]}>Your overall experience with us ?</Text>
//             <AirbnbRating
//               defaultRating={1}
//               reviews={false}
//               starContainerStyle={[styles.flexRow, styles.alignCenter]}
//               ratingContainerStyle={[styles.flexRow, styles.justifyStart, {marginLeft: -15}]}
//               selectedColor='#FFDD00'
//               unSelectedColor='#BFBFBF'
//               imageSize={40}
//             />
//           </View>
//           <View style={[styles.mb24]}>
//             <Text style={[styles.textDefault, styles.font13, styles.mb4]}>Comments <Text style={[styles.textred, styles.font13]}>*</Text></Text>
//             <TextInput
//                style={[styles.inputStyle, styles.feedtextArae, styles.borderDefault, styles.borderRadius0]}
//                placeholderTextColor="#222B2E"
//                multiline={true}
//                textAlignVertical="top"
//                onChangeText={onChangeComment}
//                value={comment}
//             />
//           </View>
//           <View style={[styles.mb24]}>
//             <Text style={[styles.textDefault, styles.font13, styles.mb4]}>Add Photos</Text>
//             <View style={[styles.flexRow, styles.flexWrap]}>
//                 <TouchableOpacity style={[styles.flexRow, styles.alignCenter, styles.justifyCenter, styles.addPhotoCon, styles.whiteBg]}>

//                 </TouchableOpacity>
//             </View>
//           </View>
//           <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
//             <View style={[styles.width50, styles.pr15]}>
//               {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}> */}
//                 <Button
//                   style={[
//                     styles.primaryBg,
//                     styles.saveBtn,
//                     styles.width100,
//                     styles.flexRow,
//                     styles.alignCenter,
//                     styles.justifyCenter,
//                   ]}>
//                   <Text
//                     style={[
//                       styles.font15,
//                       styles.letterSpa33,
//                       styles.textWhite,
//                     ]}>
//                     Submit
//                   </Text>
//                 </Button>
//               {/* </TouchableOpacity> */}
//             </View>
//             <View style={[styles.width50, styles.pl15]}>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Button
//                   style={[
//                     styles.cancelStyle,
//                     styles.saveBtn,
//                     styles.width100,
//                     styles.flexRow,
//                     styles.alignCenter,
//                     styles.justifyCenter,
//                   ]}>
//                   <Text
//                     style={[styles.font15, styles.letterSpa33, styles.textPri]}>
//                     Cancel
//                   </Text>
//                 </Button>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* <View>
//           <Button style={[styles.mt18, styles.primaryBg, styles.saveBtn, styles.width50]}><Text style={[styles.font15, styles.letterSpa33, styles.textWhite, styles.fontMed]}>Submit</Text></Button>
//           <Button style={[styles.mt18, styles.primaryBg, styles.saveBtn, styles.width50]}><Text style={[styles.font15, styles.letterSpa33, styles.textWhite, styles.fontMed]}>Submit</Text></Button>
//           </View> */}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

import React from "react";
import { View, Text } from "react-native";

export default function AddReview({ navigation }) {
  return (
    <View>
      <Text>AddReview</Text>
    </View>
  );
}
