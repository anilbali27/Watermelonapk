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
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import GlobalStyles from '../../../assets/css/styles';

const SupplierProfile= props => {
    const [email, setEmail] = useState('');
    const [designation, setdesignation] = useState('');
    const [mobile, setmobile] = useState('');
    const [address, setaddress] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [id, setId] = useState('');
    return ( 
        <ScrollView>
      <View style={GlobalStyles.signupContainer}>
    
        <View style={GlobalStyles.signupTitle}>
          <Text style={GlobalStyles.signupTitleStyle}>
            Personal Information.
          </Text> 
        </View>
             <Text style={GlobalStyles.labelText}>Email ID</Text>
              <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Email"
                placeholderTextColor="#222B2E"
                onChangeText={(email) => setEmail(email)}
              /> 
              </View>
           <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Registration ID</Text>
              <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Registration No"
                placeholderTextColor="#222B2E"
                onChangeText={(id) => setId(id)}
              /> 
              </View>
            </View> 
           <View style={GlobalStyles.imageIcon}>
            <View style={GlobalStyles.inputView} width="35%" marginRight="2%">
              <Text style={GlobalStyles.labelText}>Country Code*</Text>
              <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Email"
                placeholderTextColor="#222B2E"
                onChangeText={(email) => setEmail(email)}
              /> 
              </View>
            </View> 
            <View style={GlobalStyles.inputView} width="60%" marginLeft="2%">
              <Text style={GlobalStyles.labelText}>Mobile No</Text>
              <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Mobile No"
                placeholderTextColor="#222B2E"
                onChangeText={(mobile) => setmobile(mobile)}
              /> 
              </View>
            </View> 
            </View>
    
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Assigned Warehouse</Text>
              <View style={GlobalStyles.inputContainer}>
              <TextInput
                multiline={true}
                numberOfLines={8}
                style={GlobalStyles.signupTextInput}
                placeholder="Address"
                placeholderTextColor="#222B2E"
                onChangeText={(address) => setaddress(address)}
              /> 
              </View>
            </View> 
            <View style={GlobalStyles.inputView}>
         <Text style={GlobalStyles.labelText}>Designation</Text>
         <View style={GlobalStyles.containerPassword}>
         <View style={GlobalStyles.inputContainer}>
           <TextInput
            style={GlobalStyles.signupPasswordInput}
             placeholder="Designation"
             placeholderTextColor="#222B2E"
             
             onChangeText={(designation) => setdesignation(designation)}
           /> 
           </View>
          </View>
         </View>
      <View style={GlobalStyles.inputView}>
         <Text style={GlobalStyles.labelText}>Get Notified When</Text>
         <View style={GlobalStyles.containerPassword}>
         <View style={GlobalStyles.inputContainer}>
           <TextInput
            style={GlobalStyles.signupPasswordInput}
             placeholder="Get Notified"
             placeholderTextColor="#222B2E"
             
             onChangeText={(password) => setPassword(password)}
           /> 
           
          </View>
          </View>
         </View> 
         <View style={GlobalStyles.inputView}>
         <Text style={GlobalStyles.labelText}>My Address</Text>
         <View style={GlobalStyles.containerPassword}>
         <View style={GlobalStyles.inputContainer}>
           <TextInput
            style={GlobalStyles.signupPasswordInput}
             placeholder="Home"
             placeholderTextColor="#222B2E"
            
             onChangeText={(address1) => setaddress1(address1)}
           /> 
          
          </View>
          <View style={GlobalStyles.inputContainer}>
           <TextInput
            style={GlobalStyles.signupPasswordInput}
             placeholder="Office Address"
             placeholderTextColor="#222B2E"
            
             onChangeText={(address2) => setaddress2(address2)}
           /> 
            
          </View>
          </View>
         </View> 
         <View>         
          </View>
          </View>
       
      </ScrollView>
      );
};
export default SupplierProfile;