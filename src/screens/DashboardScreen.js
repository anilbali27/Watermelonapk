/** @format */

import React from "react";
import { View, Text, ScrollView } from "react-native";
import GlobalStyles from "../../assets/css/styles";
import { COLORS } from "../../src/constant/Colors";
import { FONTS } from "../../src/constant/Font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardContentScreen from "../screens/DashboardContentScreen";
import MyorderScreen from "./myOrders/MyOrders";
import Icon from "react-native-vector-icons/FontAwesome5";
import AddCatalogueScreen from "./login/AddCatalogue";
import DetailedOrderPage from "./myOrders/DetailedAllOrders";
import PaymentScreen from "./payments/Payments";
import SupplierProfile from "./login/SupplierProfile";
import Catelogue from "./login/Catelogue";

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#1F9CEF",
        tabBarInactiveTintColor: COLORS.textInputBorder,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: FONTS.SemiBold,
        },
      })}>
      <Tab.Screen
        name='Dashboard'
        component={DashboardContentScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name='th-large'
                size={20}
                color={tabInfo.focused ? COLORS.button : COLORS.colorFour}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Orders'
        component={MyorderScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name='dice-d6'
                size={21}
                color={tabInfo.focused ? COLORS.button : COLORS.colorFour}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Catalogue'
        component={Catelogue}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name='shopping-cart'
                size={21}
                color={tabInfo.focused ? COLORS.button : COLORS.colorFour}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Payment'
        component={PaymentScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name='credit-card'
                size={21}
                color={tabInfo.focused ? COLORS.button : COLORS.colorFour}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='Account'
        component={SupplierProfile}
        options={{
          headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name='user-circle'
                size={21}
                color={tabInfo.focused ? COLORS.button : COLORS.colorFour}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
