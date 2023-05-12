/** @format */

import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../src/screens/login/LoginScreen";
import SignupScreen from "../src/screens/login/SignupScreen";
import AllTiersCard from "../src/screens/login/AllTiersCard";
import AddCatalogueScreen from "../src/screens/login/AddCatalogue";
import ForgotPassword from "../src/screens/login/ForgotPassword";
import Catelogue from "../src/screens/login/Catelogue";
import Addtier from "../src/screens/login/Addtier";
import AddReview from "../src/screens/review&rating/AddReview";
import Edittier from "../src/screens/login/Edittier";
// import SignupScreen from '../src/screens/login/SignupScreen';
import PromotionScreen from "../src/screens/promotions/Promotion";
import ReviewRatingScreen from "../src/screens/review&rating/Review&Rating";
import PaymentScreen from "../src/screens/payments/Payments";
// import SupplierProfileScreen from "../src/screens/supplierProfile/SupplierProfile";
import MyOffersScreen from "../src/screens/myoffers/MyOffer";
import AccountSettingScreen from "../src/screens/accountSetting/AccountSettings";
import CustomSidebarMenu from "./CustomSidebarMenu";
import BuyersScreen from "../src/screens/Buyers/Buyers";
import DetailedAllinvoices from "../src/screens/invoicebackup/DetailedAllinvoice";
import AddSubCatalogue from "../src/screens/login/AddSubCatalogue";
import EditSubCatalogue from "../src/screens/login/EditSubCatalogue";
import DetailedInvoicePage from "../src/screens/invoice/DetailedAllinvoice";
import ChangePassword from "../src/screens/login/ChangePassword";
import SplashScreen from "../src/screens/splash/SplashScreen";
import SupplierProfile from "../src/screens/login/SupplierProfile";
import AppSettingsScreen from "../src/screens/settings/AppSettingsScreen";
import Editcatelogue from "../src/screens/login/Editcatelogue";
import InvoiceScreen from "../src/screens/invoice/InvoiceScreen";
import NotificationScreen from "../src/screens/notifications/NotificationScreen";
import DashboardContentScreen from "../src/screens/DashboardContentScreen";
import InventoryScreen from "../src/screens/inventory/Inventory";
import AdjustInventory from "../src/screens/inventory/AdjustInventory";
import EditStock from "../src/screens/inventory/EditStock";
import AntDesign from "react-native-vector-icons/AntDesign";
import DrawerNavigationRoutes from "./DrawerNavigatorRoutes";
import { COLORS } from "../src/constant/Colors";
import { FONTS } from "../src/constant/Font";
import UsersScreen from "../src/screens/users/Users";
import AddUser from "../src/screens/users/AddUser";

const Stack = createStackNavigator();
//const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LoginScreen'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignupScreen'
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='CustomSidebarMenu'
          component={CustomSidebarMenu}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name='SupplierProfile'
          component={SupplierProfile}
          options={{
            headerShown: false,
            // title: '',
            // headerBackTitleVisible:false,
          }}
        />

        <Stack.Screen
          name='Catelogue'
          component={Catelogue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='ChangePassword'
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AllTiersCard'
          component={AllTiersCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InventoryScreen'
          component={InventoryScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name='InvoiceScreen'
          component={InvoiceScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='Editcatelogue'
          component={Editcatelogue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditSubCatalogue'
          component={EditSubCatalogue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Edittier'
          component={Edittier}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='AdjustInventory'
          component={AdjustInventory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EditStock'
          component={EditStock}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='ReviewRatingScreen'
          component={ReviewRatingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='PaymentScreen'
          component={PaymentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='BuyersScreen'
          component={BuyersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MyOffersScreen'
          component={MyOffersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Users'
          component={UsersScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddUser'
          component={AddUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddCatalogueScreen'
          component={AddCatalogueScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='Addtier'
          component={Addtier}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddSubCatalogue'
          component={AddSubCatalogue}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AccountSettingScreen'
          component={AccountSettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DashboardContentScreen'
          component={DashboardContentScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='NotificationScreen'
          component={NotificationScreen}
          options={{
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#1F9CEF" },
            headerShadowVisible: false,
            headerTitleStyle: { color: "white" },
            headerLeftContainerStyle: { paddingLeft: 10 },
            headerBackImage: () => (
              <AntDesign name='arrowleft' size={24} color='white' />
            ),
            headerTintColor: "white",
            headerTitle: () => (
              <View style={{ width: 300, flexDirection: "row", marginLeft: 1 }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontFamily: FONTS.SemiBold,
                  }}>
                  Notifications
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='InvoiceScreen'
          component={InvoiceScreen}
          options={{
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#1F9CEF" },
            headerTintColor: "white",
            headerShadowVisible: false,
            headerTitleStyle: { color: "white" },
            headerBackImage: () => (
              <AntDesign
                name='arrowleft'
                size={24}
                color='white'
                style={{ marginLeft: 10 }}
              />
            ),
            headerTitle: () => (
              <View style={{ width: 300, flexDirection: "row" }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontFamily: FONTS.SemiBold,
                  }}>
                  Invoices
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='DetailedInvoicePage'
          component={DetailedInvoicePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name='AppSettingsScreen'
          component={AppSettingsScreen}
          options={{
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#1F9CEF" },
            headerTintColor: "white",
            headerShadowVisible: false,
            headerTitleStyle: { color: "white" },

            headerTitle: () => (
              <View style={{ width: 300, flexDirection: "row" }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 18,
                    fontFamily: FONTS.SemiBold,
                    paddingTop: 1,
                  }}>
                  Settings
                </Text>
              </View>
            ),
          }}
        />

        <Stack.Screen
          name='DrawerNavigationRoutes'
          component={DrawerNavigationRoutes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
