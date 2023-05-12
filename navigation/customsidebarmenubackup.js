/** @format */

// import React from 'react';
// import {View, Text, Alert, StyleSheet,Image} from 'react-native';
// import ChangePassword from '../src/screens/login/ChangePassword';
// import AddCatalogueScreen from '../src/screens/login/AddCatalogue';
// import Editcatelogue from '../src/screens/login/Editcatelogue';
// import SupplierProfile from '../src/screens/login/SupplierProfile';
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {COLORS} from '../src/constant/Colors';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// //import AsyncStorage from '@react-native-community/async-storage';

// const CustomSidebarMenu = (props) => {
//   const goToStack = (stackName) => {
//     console.log(stackName,'stackName')
//     if(stackName==="ChangePassword"){
//       props.navigation.navigate(stackName);

//     }
//     if(stackName==="AppSettingsscreen"){
//       props.navigation.navigate(stackName);

//     }
//     if(stackName==="AddCatalogueScreen"){
//       props.navigation.navigate(stackName);

//     }
//     if (stackName==="Editcatelogue"){
//       props.navigation.navigate(stackName);

//     }
//     if (stackName==="SupplierProfile"){
//       props.navigation.navigate(stackName);

//     }
//     if (stackName==="Catelogue"){
//       props.navigation.navigate(stackName);

//     }
//     else{

//     //console.log(props)
//     props.navigation.navigate(stackName);
//     }
//    };
//   return (
//     <View style={stylesSidebar.sideMenuContainer}>
//       <View style={stylesSidebar.profileHeader}>
//         <View style={stylesSidebar.profileHeaderPicCircle}>
//           <Text style={{fontSize: 25, color: '#307ecc'}}>
//             {'Haadiya Talwar'.charAt(0)}
//           </Text>
//         </View>
//         <Text style={stylesSidebar.profileHeaderText}>
//         Welcome Haadiya Talwar
//         </Text>
//       </View>

//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//         <View style={stylesSidebar.profileHeaderLine} />
//         <DrawerItem
//           icon={() => <Ionicons name="options-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput}}>
//               Change Password
//             </Text>
//           }
//           onPress={() => goToStack("ChangePassword")}
//         />
//          <DrawerItem
//           icon={() => <Ionicons name="options-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput}}>
//              Add Catelogue
//             </Text>
//           }
//           onPress={() => goToStack("AddCatalogueScreen")}
//         />
//          <DrawerItem
//           icon={() => <Ionicons name="options-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput}}>
//              Edit Catelogue
//             </Text>
//           }
//           onPress={() => goToStack("Editcatelogue")}
//         />
//         <DrawerItem
//           icon={() => <Ionicons name="options-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput}}>
//              Supplier Profile
//             </Text>
//           }
//           onPress={() => goToStack("SupplierProfile")}
//         />
//         <DrawerItem
//           icon={() => <Ionicons name="options-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput}}>
//               App Settings
//             </Text>
//           }
//           onPress={() => goToStack("AppSettingsScreen")}
//         />
//         <DrawerItem
//           icon={() => <Ionicons name="power-outline" size={18}
//             style={{alignSelf: "center",marginLeft:30,marginRight:-20}}
//           />}
//           label={({color}) =>
//             <Text style={{color: COLORS.loginTextInput, paddingLeft:0}}>
//               Logout
//             </Text>
//           }
//           onPress={() => {
//             props.navigation.toggleDrawer();
//             Alert.alert(
//               'Logout',
//               'Are you sure to logout?',
//               [
//                 {
//                   text: 'Cancel',
//                   onPress: () => {
//                     return null;
//                   },
//                 },
//                 {
//                   text: 'Confirm',
//                   onPress: () => {
//                     //AsyncStorage.clear();
//                     props.navigation.replace('LoginScreen');
//                   },
//                 },
//               ],
//               {cancelable: false},
//             );
//           }}
//         />
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// export default CustomSidebarMenu;

// const stylesSidebar = StyleSheet.create({
//   sideMenuContainer: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: COLORS.white,
//     paddingTop: 0,
//     color: 'white',
//   },
//   profileHeader: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.blue,
//     padding: 15,
//     textAlign: 'center',
//     paddingTop:50,
//     paddingBottom:24,
//     borderBottomRightRadius:25,
//     borderBottomLeftRadius:25,
//   },
//   profileHeaderPicCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 60 / 2,
//     color: 'white',
//     backgroundColor: '#ffffff',
//     textAlign: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileHeaderText: {
//     color: 'white',
//     alignSelf: 'center',
//     paddingHorizontal: 10,
//     fontWeight: 'bold',
//   },
//   profileHeaderLine: {
//     height: 1,
//     marginHorizontal: 20,
//     backgroundColor: '#e2e2e2',
//     marginTop: 15,
//   },
// });

import React from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import ChangePassword from "../src/screens/login/ChangePassword";
import AddCatalogueScreen from "../src/screens/login/AddCatalogue";
import Editcatelogue from "../src/screens/login/Editcatelogue";
import SupplierProfile from "../src/screens/login/SupplierProfile";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { COLORS } from "../src/constant/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

//import AsyncStorage from '@react-native-community/async-storage';

const CustomSidebarMenu = (props) => {
  const goToStack = (stackName) => {
    console.log(stackName, "stackName");
    if (stackName === "ChangePassword") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "AppSettingsscreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "AddCatalogueScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "Editcatelogue") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "SupplierProfile") {
      props.navigation.navigate(stackName);
    }
   
    if (stackName === "Catelogue") {
      props.navigation.navigate(stackName);
    } else {
      //console.log(props)
      props.navigation.navigate(stackName);
    }
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: "#307ecc" }}>
            {"Haadiya Talwar".charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          Welcome Haadiya Talwar
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={stylesSidebar.profileHeaderLine} />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='options-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput }}>
              Change Password
            </Text>
          )}
          onPress={() => goToStack("ChangePassword")}
        />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='options-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput }}>Add Catelogue</Text>
          )}
          onPress={() => goToStack("AddCatalogueScreen")}
        />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='options-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput }}>Edit Catelogue</Text>
          )}
          onPress={() => goToStack("Editcatelogue")}
        />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='options-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput }}>
              Supplier Profile
            </Text>
          )}
          onPress={() => goToStack("SupplierProfile")}
        />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='options-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput }}>App Settings</Text>
          )}
          onPress={() => goToStack("AppSettingsScreen")}
        />
        <DrawerItem
          icon={() => (
            <Ionicons
              name='power-outline'
              size={18}
              style={{ alignSelf: "center", marginLeft: 30, marginRight: -20 }}
            />
          )}
          label={({ color }) => (
            <Text style={{ color: COLORS.loginTextInput, paddingLeft: 0 }}>
              Logout
            </Text>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              "Logout",
              "Are you sure to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    //AsyncStorage.clear();
                    props.navigation.replace("LoginScreen");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 0,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.blue,
    padding: 15,
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 24,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
