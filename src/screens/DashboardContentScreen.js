/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../assets/css/styles";
import SideMenu from "../../assets/jsx/SideMenu";
import NotificationIcon from "../../assets/jsx/dashbord/NotificationIcon";
import TotalOrderIcon from "../../assets/jsx/dashbord/TotalOrderIcon";
import TickIcon from "../../assets/jsx/dashbord/TickIcon";
import TotalCustomerIcon from "../../assets/jsx/dashbord/TotalCustomerIcon";
import TotalReceiverIcon from "../../assets/jsx/dashbord/TotalReceiverIcon";
import { COLORS } from "../constant/Colors";
import DropDownIconWhite from "../../assets/jsx/dashbord/DropDownWhite";

import ModalSelector from "react-native-modal-selector";

import api from "../screens/Services/API/CallingApi";
import { endPoint } from "./Services/API/ApiConstants";

export default function DashboardContentScreen({ navigation }) {
  // console.log(navigation, "123");
  const [dashboardData, setDashboardData] = useState([]);
  const [totalOrder, setTotalOrder] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalBuyerCount, setBuyerCount] = useState();
  const [topCategories, setTopCategories] = useState([]);
  const [topCategoriesOne, setTopCategoriesOne] = useState({});
  const [topCategoriesTwo, setTopCategoriesTwo] = useState({});
  const [topCategoriesThree, setTopCategoriesThree] = useState({});
  const [recentUser, setRecentUser] = useState({});
  const [recentUserOne, setrecentUserOne] = useState({});
  const [recentUserTwo, setrecentUserTwo] = useState({});
  const [recentUserThree, setrecentUserThree] = useState({});
  const [duration, setDuration] = useState(2);
  const [isLoading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [totalScales, setTotalScales] = useState();
  // console.log(duration, "2121");

  //topCategories images
  const imageOne = topCategoriesOne?.category_image;
  const imageTwo = topCategoriesTwo?.category_image;
  const imageThree = topCategoriesThree?.category_image;

  //recentUser images
  const userOne = recentUserOne?.profile;
  const userTwo = recentUserTwo?.profile;
  const userThree = recentUserThree?.profile;

  const data = [
    { key: 1, label: "Daily" },
    { key: 2, label: "Weekly" },
    { key: 3, label: "monthly" },
    { key: 4, label: "Yearly" },
  ];

  // useEffect(() => {}, [duration]);

  useEffect(() => {
    getDashboardData();
  }, [duration]);

  const getDashboardData = async (data) => {
    setLoading(true);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const firstName = await AsyncStorage.getItem("firstname");
    setFirstName(firstName);
    const lastName = await AsyncStorage.getItem("lastname");
    setLastName(lastName);
    const id = await AsyncStorage.getItem("userTypeId");
    // console.log(jsonValue, "aaaaaaaaaaaaaaa");

    var myData = "";
    {
      duration == 1 ? (myData = "day") : " ";
    }
    {
      duration == 2 ? (myData = "week") : " ";
    }
    {
      duration == 3 ? (myData = "month") : " ";
    }
    {
      duration == 4 ? (myData = "year") : " ";
    }
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MzIwNTM2MSwiZXhwIjoxNzE0NzQxMzYxLCJuYmYiOjE2ODMyMDUzNjEsImp0aSI6IlcyNHJDWmNZbmo1V3BRclIiLCJzdWIiOiI1ZmY1NzBlYThiMDU4ZDVhMTQ2MGEwZjYiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.uoYhaOxiMvCB3P5BAG9n5glbjonj9lnMsSZYxACLt08";
    var myJson = {
      supplier_id: id,
      // supplier_id: "60784da77b60b7605a47a41c",
      duration: "month",
    };
    // console.log(myJson, "dd");
    const result = await api.getDashboardDetails(
      token,
      endPoint.dashboard_details,
      myJson
    );

    // console.log(result, "123");
    setDashboardData(result);
    // console.log(result.data.orders_count, "111");
    setTotalOrder(result.data?.orders_count);
    // console.log(result.data, "222");
    setTotalAmount(result.data?.total_amount);
    // console.log(result.data.buyer_count, "333");
    setBuyerCount(result.data?.buyer_count);
    setTopCategories(result.data?.top_categories);
    setTopCategoriesOne(result.data?.top_categories[0]);
    setTopCategoriesTwo(result.data?.top_categories[1]);
    setTopCategoriesThree(result.data?.top_categories[2]);
    // console.log(result.data.top_categories[0].category_name, "777");
    setRecentUser(result.data?.recent_users);
    setrecentUserOne(result.data?.recent_users[0]);
    setrecentUserTwo(result.data?.recent_users[1]);
    setrecentUserThree(result.data?.recent_users[2]);
    // console.log(result.data.recent_users[0], "1010");
    // console.log(result.data.graph_data.total_sales, "tttt");
    setTotalScales(result.data?.graph_data.total_sales);
    setLoading(false);

    // setMyList(result);
    // setList(result.data?.payments);
    // setfilterData(result.data?.payments);
    // setmasterData(result.data?.payments);
  };

  // const getDashboardData = async (data) => {
  //   setLoading(true);
  //   const jsonValue = await AsyncStorage.getItem("UserToken");
  //   const firstName = await AsyncStorage.getItem("firstname");
  //   setFirstName(firstName);
  //   const lastName = await AsyncStorage.getItem("lastname");
  //   setLastName(lastName);
  //   const id = await AsyncStorage.getItem("userTypeId");
  //   // console.log(jsonValue, "aaaaaaaaaaaaaaa");
  //   var myData = "";
  //   {
  //     duration == 1 ? (myData = "day") : " ";
  //   }
  //   {
  //     duration == 2 ? (myData = "week") : " ";
  //   }
  //   {
  //     duration == 3 ? (myData = "month") : " ";
  //   }
  //   {
  //     duration == 4 ? (myData = "year") : " ";
  //   }
  //   let token = jsonValue;
  //   var myJson = {
  //     supplier_id: id,
  //     duration: "week",
  //   };
  //   console.log(myJson, "dd");
  //   const result = await api.getDashboardDetails(
  //     token,
  //     endPoint.dashboard_details,
  //     myJson
  //   );
  //   // console.log(result, "123");
  //   setDashboardData(result);
  //   // console.log(result.data.orders_count, "111");
  //   setTotalOrder(result.data?.orders_count);
  //   // console.log(result.data, "222");
  //   setTotalAmount(result.data?.total_amount);
  //   // console.log(result.data.buyer_count, "333");
  //   setBuyerCount(result.data?.buyer_count);
  //   setTopCategories(result.data?.top_categories);
  //   setTopCategoriesOne(result.data?.top_categories[0]);
  //   setTopCategoriesTwo(result.data?.top_categories[1]);
  //   setTopCategoriesThree(result.data?.top_categories[2]);
  //   // console.log(result.data.top_categories[0].category_name, "777");
  //   setRecentUser(result.data?.recent_users);
  //   setrecentUserOne(result.data?.recent_users[0]);
  //   setrecentUserTwo(result.data?.recent_users[1]);
  //   setrecentUserThree(result.data?.recent_users[2]);
  //   // console.log(result.data.recent_users[0], "1010");
  //   // console.log(result.data.graph_data.total_sales, "tttt");
  //   setTotalScales(result.data?.graph_data.total_sales);
  //   setLoading(false);

  //   // setMyList(result);
  //   // setList(result.data?.payments);
  //   // setfilterData(result.data?.payments);
  //   // setmasterData(result.data?.payments);
  // };

  const total = totalScales;
  let totalAmountScales;
  if (total !== undefined) {
    totalAmountScales = (total / 1000).toFixed(1) + "k";
  } else {
    totalAmountScales = ""; // or any other desired value
  }

  const number = totalAmount;
  console.log(number, "369");
  // const formattedTotalReceivables = (number / 1000).toFixed(1) + "k";

  let formattedTotalReceivables;
  if (number !== undefined) {
    formattedTotalReceivables = (number / 1000).toFixed(1) + "k";
  } else {
    formattedTotalReceivables = ""; // or any other desired value
  }

  // const formattedTotalReceivables =
  //   (totalAmount / 1000).toLocaleString("en-US", {
  //     style: "decimal",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 1,
  //   }) + "k";

  const number1 = topCategoriesOne?.spends;

  let formattedTopCatOne;
  if (number1 !== undefined) {
    formattedTopCatOne = (number1 / 1000).toFixed(1) + "k";
  } else {
    formattedTopCatOne = ""; // or any other desired value
  }

  // const formattedTopCatOne =
  //   (number1 / 1000).toLocaleString("en-US", {
  //     style: "decimal",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 1,
  //   }) + "k";

  const number2 = topCategoriesTwo?.spends;

  let formattedTopCatTwo;
  if (number2 !== undefined) {
    formattedTopCatTwo = (number2 / 1000).toFixed(1) + "k";
  } else {
    formattedTopCatTwo = ""; // or any other desired value
  }

  // const formattedTopCatTwo =
  //   (number2 / 1000).toLocaleString("en-US", {
  //     style: "decimal",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 1,
  //   }) + "k";

  const number3 = topCategoriesThree?.spends;

  let formattedTopCatThree;
  if (number3 !== undefined) {
    formattedTopCatThree = (number3 / 1000).toFixed(1) + "k";
  } else {
    formattedTopCatThree = ""; // or any other desired value
  }
  // const formattedTopCatThree =
  //   (number3 / 1000).toLocaleString("en-US", {
  //     style: "decimal",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 1,
  //   }) + "k";

  // console.log(formattedTopCatTwo, "0909");
  //Loader
  const Loader = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 300,
      }}>
      {/* < size='large' color={"#1F9CEF"} /> */}
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.grayBg, styles.flex1]}>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#1F9CEF" }} /> */}
      {/* <StatusBar backgroundColor='#1F9CEF' /> */}
      <View>
        {/* Header HTML */}

        <View>
          <View style={[styles.dahboardHeader]}>
            <View
              style={[
                styles.width100,
                styles.justifyBetween,
                styles.flexRow,
                styles.alignCenter,
              ]}>
              <View
                style={[styles.flexRow, styles.alignCenter, styles.width20]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.toggleDrawer();
                    // navigation.navigate("CustomSidebarMenu");
                  }}>
                  <SideMenu />
                </TouchableOpacity>
                <Image
                  source={require("../../assets/images/dashboard/dashboard-logo.png")}
                  style={[
                    styles.dashboardLogo,
                    styles.marlft13,
                    styles.resizeContain,
                  ]}></Image>
              </View>
              <View
                style={[styles.width60, styles.flexRow, styles.justifyCenter]}>
                <Text
                  style={[styles.textWhite, styles.font12, styles.fontSemi]}>
                  Hi, {firstName} {lastName}
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  styles.alignCenter,
                  styles.width20,
                  styles.justifyEnd,
                ]}>
                {/* <SvgUri
                    source={require("../../assets/images/dashboard/search_icon.svg")}
                  /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("NotificationScreen")}>
                  <View>
                    <View style={[styles.notCount]}></View>

                    <NotificationIcon />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.flexRow,
                styles.justifyBetween,
                styles.alignCenter,
                styles.padtop30,
              ]}>
              <View style={[styles.width50]}>
                <Text
                  style={[
                    styles.textWhite,
                    styles.fontMed,
                    styles.font12,
                    styles.marBtm4,
                  ]}>
                  Total Sales
                </Text>

                <Text
                  style={[styles.textWhite, styles.fontSemi, styles.font18]}>
                  AED {totalScales || 0}
                  {/* AED {totalAmountScales} */}
                </Text>
              </View>
              {/* <View style={[styles.width50, styles.flexRow, styles.justifyEnd]}>
                <View>
                  <DropDownIconWhite style={[styles.modalDropDown]} />
                  <ModalSelector
                    data={data}
                    initValue='Weekly'
                    selectStyle={[styles.weekyDropDown]}
                    initValueTextStyle={[
                      styles.font12,
                      styles.textWhite,
                      styles.fontMed,
                    ]}
                    overlayStyle={[
                      styles.popupOverlay,
                      styles.flexColumn,
                      styles.justifyEnd,
                      styles.alignCenter,
                    ]}
                    onChange={(option) => {
                      if (option.label) {
                        setDuration(option.label);
                      }
                    }}
                    optionContainerStyle={[styles.width300px]}
                    cancelStyle={[styles.width300px, styles.marHorauto]}
                    optionTextStyle={[styles.textBlack, styles.font12]}
                    cancelTextStyle={[styles.textBlack, styles.font12]}
                  />
                </View>
              </View> */}
            </View>
          </View>

          <View style={[styles.width100, styles.pad20]}>
            {/* total order HTML */}
            <View style={[styles.flexRow, styles.flexWrap]}>
              <View style={[styles.width50, styles.padR7]}>
                <View
                  style={[
                    styles.orderCol,
                    styles.width100,
                    styles.whiteBg,
                    styles.pad20,
                    styles.flexColumn,
                    styles.alignStart,
                  ]}>
                  <View
                    style={[
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyCenter,
                      styles.orderCircle,
                      styles.mb16,
                    ]}>
                    <TotalOrderIcon />
                  </View>
                  <Text
                    style={[
                      styles.font12,
                      styles.textDefault,
                      styles.fontMed,
                      styles.marBtm6,
                    ]}>
                    Total Orders
                  </Text>
                  <Text
                    style={[
                      styles.font18,
                      styles.textBlack,
                      styles.fontSemi,
                      styles.mb18,
                    ]}>
                    {totalOrder || 0}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.activeSKUBtn,
                      styles.flexRow,
                      styles.alignCenter,
                    ]}>
                    <View style={[styles.pr4]}>
                      <TickIcon />
                    </View>
                    <Text
                      style={[styles.font12, styles.fontMed, styles.textPri]}>
                      0 Active SKU
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.width50, styles.padL7]}>
                <View
                  style={[
                    styles.orderCol,
                    styles.width100,
                    styles.whiteBg,
                    styles.pad20,
                    styles.flexRow,
                    styles.justifyBetween,
                    styles.mb16,
                  ]}>
                  <View style={[styles.width80]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.textDefault,
                        styles.fontMed,
                        styles.marBtm6,
                      ]}>
                      Total Customers
                    </Text>
                    <Text
                      style={[
                        styles.font18,
                        styles.textBlack,
                        styles.fontSemi,
                      ]}>
                      {totalBuyerCount || 0}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyCenter,
                      styles.orderCircle,
                    ]}>
                    <TotalCustomerIcon />
                  </View>
                </View>
                <View
                  style={[
                    styles.orderCol,
                    styles.width100,
                    styles.whiteBg,
                    styles.pad20,
                    styles.flexRow,
                    styles.justifyBetween,
                  ]}>
                  <View style={[styles.width80]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.textDefault,
                        styles.fontMed,
                        styles.marBtm6,
                      ]}>
                      Total Receivables
                    </Text>
                    <Text
                      style={[
                        styles.font18,
                        styles.textBlack,
                        styles.fontSemi,
                      ]}>
                      AED {formattedTotalReceivables || 0}
                      {/* AED {totalAmount} */}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyCenter,
                      styles.orderCircle,
                    ]}>
                    <TotalReceiverIcon />
                  </View>
                </View>
              </View>
            </View>
            {/* total order HTML - Ends */}

            {/* Top Categories */}
            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.padtop30,
                styles.mb12,
                styles.justifyBetween,
              ]}>
              <Text style={[styles.font16, styles.textBlack, styles.fontBold]}>
                Top Categories
              </Text>
              <TouchableOpacity>
                <Text style={[styles.font12, styles.textPri, styles.fontMed]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {topCategories.length == 0 ? (
              <View
                style={[
                  styles.categoryBlk,
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.whiteBg,
                  styles.mb12,
                ]}>
                <Text style={[styles.font14, styles.textBlack]}>
                  No Record Found
                </Text>
              </View>
            ) : (
              <View>
                <View
                  style={[
                    styles.categoryBlk,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyBetween,
                    styles.whiteBg,
                    styles.mb12,
                  ]}>
                  <View
                    style={[
                      // styles.width80,
                      styles.flexRow,
                      styles.alignCenter,
                    ]}>
                    {/* <Image
 source={require("../../assets/images/dashboard/category_image_1.png")}
 style={[styles.categoryImage, styles.resizeContain]}></Image> */}
                    <Image
                      source={{
                        uri: `https://stagingapi.watermelon.market/upload/upload_photo/${imageOne}`,
                      }}
                      style={[
                        styles.categoryImage,
                        styles.resizeContain,
                      ]}></Image>
                    <View style={[styles.pl10]}>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb3,
                        ]}>
                        {topCategoriesOne?.category_name}
                      </Text>
                      <Text style={[styles.font12, styles.textDefault]}>
                        {topCategoriesOne?.customer_count} Customers
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.font12,
                        styles.textBlack,
                        styles.fontBold,
                      ]}>
                      AED {formattedTopCatOne}
                      {/* AED {number1} */}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.categoryBlk,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyBetween,
                    styles.whiteBg,
                    styles.mb12,
                  ]}>
                  <View
                    style={[
                      // styles.width80,
                      styles.flexRow,
                      styles.alignCenter,
                    ]}>
                    {/* <Image
 source={require("../../assets/images/dashboard/category_image_2.png")}
 style={[styles.categoryImage, styles.resizeContain]}></Image> */}
                    <Image
                      source={{
                        uri: `https://stagingapi.watermelon.market/upload/upload_photo/${imageTwo}`,
                      }}
                      style={[
                        styles.categoryImage,
                        styles.resizeContain,
                      ]}></Image>
                    <View style={[styles.pl10]}>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb3,
                        ]}>
                        {topCategoriesTwo?.category_name}
                      </Text>
                      <Text style={[styles.font12, styles.textDefault]}>
                        {topCategoriesTwo?.customer_count} Customers
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[styles.font12, styles.textBlack, styles.fontBold]}>
                    AED {formattedTopCatTwo}
                    {/* AED {number2} */}
                  </Text>
                </View>
                <View
                  style={[
                    styles.categoryBlk,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyBetween,
                    styles.whiteBg,
                    styles.mb12,
                  ]}>
                  <View
                    style={[
                      // styles.width80,
                      styles.flexRow,
                      styles.alignCenter,
                    ]}>
                    {/* <Image
 source={require("../../assets/images/dashboard/category_image_3.png")}
 style={[styles.categoryImage, styles.resizeContain]}></Image> */}
                    <Image
                      source={{
                        uri: `https://stagingapi.watermelon.market/upload/upload_photo/${imageThree}`,
                      }}
                      style={[
                        styles.categoryImage,
                        styles.resizeContain,
                      ]}></Image>
                    <View style={[styles.pl10]}>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb3,
                        ]}>
                        {topCategoriesThree?.category_name}
                      </Text>
                      <Text style={[styles.font12, styles.textDefault]}>
                        {topCategoriesThree?.customer_count} Customers
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[styles.font12, styles.textBlack, styles.fontBold]}>
                    AED {formattedTopCatThree}
                    {/* AED {number3} */}
                  </Text>
                </View>
              </View>
            )}

            {/* Top Categories - Ends */}

            {/* Recent Users */}
            <View>
              <View
                style={[
                  styles.flexRow,
                  styles.alignCenter,
                  styles.padtop30,
                  styles.mb12,
                  styles.justifyBetween,
                ]}>
                <Text
                  style={[styles.font16, styles.textBlack, styles.fontBold]}>
                  Recent Users
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.font12, styles.textPri, styles.fontMed]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              {recentUser.length == null ? (
                <View
                  style={[
                    styles.categoryBlk,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyCenter,
                    styles.whiteBg,
                    styles.mb12,
                  ]}>
                  <Text style={[styles.font14, styles.textBlack]}>
                    No Record Found
                  </Text>
                </View>
              ) : (
                <View style={[styles.flexRow]}>
                  <View style={[styles.width33, styles.padR8]}>
                    <View
                      style={[
                        styles.categoryBlk,
                        styles.flexColumn,
                        styles.alignCenter,
                        styles.justifyCenter,
                        styles.whiteBg,
                      ]}>
                      {/* <Image
                       source={require("../../assets/images/dashboard/recent_user_1.png")}
                       style={[
                         styles.recentuserImage,
                         styles.resizeContain,
                         styles.mb7,
                       ]}></Image> */}
                      <Image
                        source={{
                          uri: `https://stagingapi.watermelon.market/upload/upload_photo/${userOne}`,
                        }}
                        style={[
                          styles.recentuserImage,
                          styles.resizeContain,
                          styles.mb7,
                        ]}></Image>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb2,
                        ]}>
                        {recentUserOne?.firstname}
                        {/* {topCategoriesTwo.category_name} */}
                      </Text>
                      <Text
                        style={[
                          styles.font12,
                          styles.textDefault,
                          styles.mb12,
                        ]}>
                        {/* 200 Orders */}
                        {recentUserOne?.orders_count} Orders
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.activeSKUBtn,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.AEDBtn,
                        ]}>
                        <Text
                          style={[
                            styles.font12,
                            styles.fontMed,
                            styles.textBlacks,
                          ]}>
                          {/* AED 200 */}
                          AED {recentUserOne?.recent_order_amt}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.width33, styles.padR4, styles.padL4]}>
                    <View
                      style={[
                        styles.categoryBlk,
                        styles.flexColumn,
                        styles.alignCenter,
                        styles.justifyCenter,
                        styles.whiteBg,
                      ]}>
                      {/* <Image
                       source={require("../../assets/images/dashboard/recent_user_1.png")}
                       style={[
                         styles.recentuserImage,
                         styles.resizeContain,
                         styles.mb7,
                       ]}></Image> */}
                      <Image
                        source={{
                          uri: `https://stagingapi.watermelon.market/upload/upload_photo/${userTwo}`,
                        }}
                        style={[
                          styles.recentuserImage,
                          styles.resizeContain,
                          styles.mb7,
                        ]}></Image>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb2,
                        ]}>
                        {recentUserTwo?.firstname}
                      </Text>
                      <Text
                        style={[
                          styles.font12,
                          styles.textDefault,
                          styles.mb12,
                        ]}>
                        {recentUserTwo?.orders_count} Orders
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.activeSKUBtn,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.AEDBtn,
                        ]}>
                        <Text
                          style={[
                            styles.font12,
                            styles.fontMed,
                            styles.textBlacks,
                          ]}>
                          AED {recentUserTwo?.recent_order_amt}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.width33, styles.padL8]}>
                    <View
                      style={[
                        styles.categoryBlk,
                        styles.flexColumn,
                        styles.alignCenter,
                        styles.justifyCenter,
                        styles.whiteBg,
                      ]}>
                      {/* <Image
                       source={require("../../assets/images/dashboard/recent_user_1.png")}
                       style={[
                         styles.recentuserImage,
                         styles.resizeContain,
                         styles.mb7,
                       ]}></Image> */}
                      <Image
                        source={{
                          uri: `https://stagingapi.watermelon.market/upload/upload_photo/${userThree}`,
                        }}
                        style={[
                          styles.recentuserImage,
                          styles.resizeContain,
                          styles.mb7,
                        ]}></Image>
                      <Text
                        style={[
                          styles.font14,
                          styles.textBlack,
                          styles.fontSemi,
                          styles.mb2,
                        ]}>
                        {recentUserThree?.firstname}
                      </Text>
                      <Text
                        style={[
                          styles.font12,
                          styles.textDefault,
                          styles.mb12,
                        ]}>
                        {recentUserThree?.orders_count} Orders
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.activeSKUBtn,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.AEDBtn,
                        ]}>
                        <Text
                          style={[
                            styles.font12,
                            styles.fontMed,
                            styles.textBlacks,
                          ]}>
                          AED {recentUserThree?.recent_order_amt}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
            {/* Recent Users - Ends */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F1",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
