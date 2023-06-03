/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SvgUri } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

import AppIntroSlider from "../../components/introSlider/IntroSlider";
import { COLORS } from "../../../src/constant/Colors";
import { FONTS } from "../../../src/constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import LoginScreen from "../login/LoginScreen";

// global.myVariable = 1;

// export const myVariable = 1;

const SplashScreen = ({ navigation }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const getToken = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("UserToken");
        let token = jsonValue;
        setTokenData(token);
        console.log(token, "141");
      } catch (error) {
        console.error(error);
      }
    };
    getToken();
  }, [isFocused]);

  // console.log(token, "112");
  // const getToken = async () => {
  //   const tokenData = await AsyncStorage.getItem("UserToken");
  //   setToken(tokenData);
  // };

  // var number = 1;

  // const getToken = async () => {
  //   const jsonValue = await AsyncStorage.getItem("UserToken");
  //   let token = jsonValue;
  //   setTokenData(token);
  //   const id = await AsyncStorage.getItem("id");
  //   console.log(id, "196");
  //   console.log(token, "11235");
  // };

  const onDone = () => {
    {
      tokenData
        ? navigation.navigate("DrawerNavigationRoutes")
        : navigation.navigate("LoginScreen");
    }
  };
  const onSkip = () => {
    {
      tokenData
        ? navigation.navigate("DrawerNavigationRoutes")
        : navigation.navigate("LoginScreen");
    }
  };

  // const onDone = () => {
  //   navigation.navigate("DrawerNavigationRoutes");
  // };
  // const onSkip = () => {
  //   navigation.navigate("DrawerNavigationRoutes");
  // };

  const RenderItem = ({ item }) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: item.backgroundColor,
            alignItems: "center",
            justifyContent: "space-around",
            paddingBottom: 200,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 50,
          }}>
          <SvgUri
            style={GlobalStyles.introImageStyle}
            uri={item.image}
            height='80%'
            width='80%'
          />
          <Text style={GlobalStyles.introTitleStyle}>{item.title}</Text>
          <Text style={GlobalStyles.introTextStyle}>{item.text}</Text>
        </View>
      </>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
};

export default SplashScreen;

const slides = [
  {
    key: "s1",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    title: "Inventory",
    image: "https://svgshare.com/i/p15.svg",
    backgroundColor: COLORS.theme,
  },
  {
    key: "s2",
    title: "Add Product to Cart",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    image: "https://svgshare.com/i/p1n.svg",
    backgroundColor: COLORS.theme,
  },
  {
    key: "s3",
    title: "Get Quickly",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ",
    image: "https://svgshare.com/i/p0G.svg",
    backgroundColor: COLORS.theme,
  },
];
