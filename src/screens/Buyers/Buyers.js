/** @format */

/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import BuyersCard from "./BuyersCard";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const BuyersScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [buyerlist, setBuyerList] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [appendBuyerlist, setAppendBuyerlist] = useState([]);

  // -------------------------------- Search Functionality ----------------------------------------------------
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = buyerlist.filter((item) => {
        const itemData = item.city ? item.city.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        // return(item.city.toUpperCase().includes(text.toLowerCase()) || item.firstname.toLowerCase().includes(text.toLowerCase())
        // || item.company_registration_no.toLowerCase().includes(text.toLowerCase()) || item.buyer_type.toLowerCase().includes(text.toLowerCase())
        // || item.status_name.toLowerCase().includes(text.toLowerCase()));
      });
      setBuyerList(newData);
      setSearch(text);
    } else {
      setBuyerList(filterdData);
      setSearch(text);
    }
  };
  // -------------------------------- Search Functionality Ends ----------------------------------------------------

  // -------------------------------- Get All Buyer List API Calling ----------------------------------------------------
  useEffect(() => {
    getAllBuyerList();
  }, []);
  const getAllBuyerList = async () => {
    console.log("Page:::", page);
    setIsLoading(true);
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let token = await AsyncStorage.getItem("UserToken");

    let myJson = {
      supplier_id: supplierId,
      // page: page,
    };
    const result = await api.CreateMasterData(
      endPoint.buyer_list,
      token,
      myJson
    );
    setfilterData(result.data);
    var BuyerListApiResponse = result.data;
    setBuyerList(result.data);
    // setAppendOrderlist(result.data)
    // setBuyerList(...buyerlist, ...appendOrderlist)
    // console.log("buyerlistbuyerlist:::", buyerlist)
    setPage(page + 1);
    setIsLoading(false);
  };
  // -------------------------------- Get All Buyer List API Calling Ends ----------------------------------------------------
  const renderEmpty = () => {
    return (
      <View
        style={[
          styles.flexColumn,
          styles.alignCenter,
          styles.justifyCenter,
          styles.padt30,
        ]}>
        <Image
          source={require("../../../assets/images/dashboard/Noorder.png")}
          style={[styles.successIcon]}></Image>
        <Text
          style={[
            styles.font22,
            styles.textBlack,
            styles.textCenter,
            styles.mb11,
            styles.fontBold,
          ]}>
          No records found
        </Text>
        <Text
          style={[
            styles.font15,
            styles.textBlack,
            styles.mb37,
            styles.textCenter,
          ]}></Text>
      </View>
    );
  };

  //Loader
  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );
  return (
    <>
      <View style={GlobalStyles.orderContainer}>
        <View style={GlobalStyles.promotionsHeaderContainer}>
          <View style={GlobalStyles.PromotionScreenIconView}>
            <Pressable
              onPress={() => {
                //   navigation.navigate("DrawerNavigationRoutes");
                navigation.goBack();
              }}>
              <BackArrow />
            </Pressable>
            <Text style={GlobalStyles.promotionsHeaderText}>Buyers</Text>
          </View>
        </View>
        <View style={GlobalStyles.searchBarPaddingView}>
          <View style={GlobalStyles.searchBarView}>
            <View style={GlobalStyles.searchIconView}>
              <SearchIcon />
              <View style={GlobalStyles.searchPlaceHolderView}>
                <TextInput
                  onChangeText={(text) => searchFilterFunction(text)}
                  value={search}
                  placeholder='Search'
                  placeholderTextColor={COLORS.introText}
                />
              </View>
            </View>
            <View>
              {/* <Pressable onPress={() => setModalVisible(true)}> */}
              {/* <View style={GlobalStyles.searchfilterView}>
              <SettingIcon />
            </View> */}
              {/* </Pressable> */}
            </View>
          </View>
        </View>
        <View style={GlobalStyles.PaymentsPadding}>
          {/* <BuyersCard /> */}
          {!buyerlist ? (
            <View>
              <ActivityIndicator color={COLORS.button} size='large' />
            </View>
          ) : (
            <FlatList
              data={buyerlist}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              // onEndReached={getAllBuyerList}
              // onEndReachedThreshold={0.7}
              // ListFooterComponent={() => {
              //   return isLoading ? <Loader /> : null;
              // }}
              renderItem={({ item }) => (
                <BuyersCard
                  city={item.city}
                  profile={item.profile}
                  lastname={item.lastname}
                  buyer_type={item.buyer_type}
                  firstname={item.firstname}
                  company_registration_no={item.company_registration_no}
                  on_boarding_status_name={item.on_boarding_status_name}
                  status_name={item.status_name}
                  total_count={item.total_count}
                  message={item.message}
                />
              )}
              ListEmptyComponent={renderEmpty}
            />
          )}
        </View>
      </View>
      <View style={GlobalStyles.addButton1}>
        <Pressable onPress={() => navigation.navigate("AddUser")}>
          <Text style={GlobalStyles.stictyText1}>+</Text>
        </Pressable>
      </View>
    </>
  );
};

export default BuyersScreen;

// import React from "react";
// import { View, Text } from "react-native";

// export default function BuyersScreen({ navigation }) {
//   return (
//     <View>
//       <Text>BuyersScreen</Text>
//     </View>
//   );
// }
