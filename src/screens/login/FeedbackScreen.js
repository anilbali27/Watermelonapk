import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions
} from 'react-native';

import GlobalStyles from '../../../assets/css/styles';
const FeedbackScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <View style={GlobalStyles.signupContainer}>
           <View style={GlobalStyles.signupTitle}>
           
      <Text style={GlobalStyles.signupTitleStyle}>
       KF12
      </Text> 
    </View> 
    <View style={GlobalStyles.signupTitle}>
      <Text style={GlobalStyles.signupTitleStyle}>
       Your overall experience with us ?
      </Text> 
    </View> 
    <View style={GlobalStyles.signupTitle}>
      <Text style={GlobalStyles.signupTitleStyle}>
      Comments
      </Text> 
    </View> 
    <View style={GlobalStyles.signupTitle}>
      <Text style={GlobalStyles.signupTitleStyle}>
      Add Photos
      </Text> 
    </View> 
            </View>
    );
};
export default FeedbackScreen;