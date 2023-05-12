/** @format */

/** @format */

import React from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";

import GlobalStyles from "../../../assets/css/styles";
import { COLORS } from "../../../src/constant/Colors";
import { FONTS } from "../../../src/constant/Font";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DefaultScreen from "./DefaultScreen";
import DeliveryScreen from "./DeliveryScreen";
import OutletsScreen from "./OutletsScreen";
import usersScreen from "../users/Users";
import BackArrow from "../../../assets/images/icons/BackArrow";

const Tab = createMaterialTopTabNavigator();
const AppSettingsScreen = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      style={{ backgroundColor: "#1F9CEF", width: "100%" }}
      screenOptions={{
        tabBarItemStyle: {
          margin: 5,
          marginLeft: 0,
          flex: 1,
          marginRight: 0,
          width: Dimensions.get("window").width / 3,
        },
        tabBarStyle: {
          backgroundColor: "#1F9CEF",
          height: 80,
          padding: 0,
          margin: 0,
          marginLeft: 20,
          shadowColor: "#1F9CEF",
          paddingLeft: 1,
          paddingRight: 1,
        },
        tabBarActiveTintColor: "#1F9CEF",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: FONTS.SemiBold,
          width: Dimensions.get("window").width / 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          height: "55%",
          borderRadius: 25,
          marginBottom: 27,
          width: Dimensions.get("window").width / 3,
        },
        tabBarPressOpacity: 1,
      }}>
      <Tab.Screen
        name='Default'
        component={DefaultScreen}
        style={GlobalStyles.tabScreens}
        tabBarInactiveTintColor='red'
      />
      {/* <Tab.Screen
        name='Delivery'
        component={DeliveryScreen}
        style={GlobalStyles.tabScreens}
      /> */}
      <Tab.Screen
        name='Outlets'
        component={OutletsScreen}
        style={GlobalStyles.tabScreens}
      />
      {/* <Tab.Screen
        name="Users"
        component={usersScreen}
        style={GlobalStyles.tabScreens}
      /> */}
    </Tab.Navigator>
  );
};

export default AppSettingsScreen;

// import React from "react";
// import { View, Text } from "react-native";

// export default function AppSettingsScreen({ navigation }) {
//   return (
//     <View>
//       <Text>AppSettingsScreen</Text>
//     </View>
//   );
// }
