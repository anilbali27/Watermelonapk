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
import { useIsFocused } from "@react-navigation/native";

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
import AddBuyersScreen from "./Add Buyers";

export default function BuyersScreen({ navigation }) {
  const isFocused = useIsFocused();

  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [buyerlist, setBuyerList] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [appendBuyerlist, setAppendBuyerlist] = useState([]);
  const [buyersData, setBuyersData] = useState([]);
  const [tempData, setTempData] = useState([]);
  // -------------------------------- Search Functionality ----------------------------------------------------
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = buyerlist.filter((item) => {
        const itemData =
          item.city &&
          item.firstname &&
          item.lastname &&
          item.buyer_type &&
          item.company_registration_no &&
          item.status_name
            ? item.city.toUpperCase() +
              item.firstname.toUpperCase() +
              item.lastname.toUpperCase() +
              item.buyer_type.toUpperCase() +
              item.company_registration_no +
              item.status_name.toUpperCase()
            : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
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
    getAllBuyers();
  }, [isFocused]);

  const getAllBuyers = async () => {
  
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    const result = await api.getallbuyers(token, endPoint.all_buyers);
    if (result.success === "1") {
      setBuyersData(result.data);
      setTempData(result.data);
      setIsLoading(false);
    } else {
      setBuyersData([]);
      setTempData([])
     
    }
  };
  const getAllBuyerList = async () => {
    
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let token = await AsyncStorage.getItem("UserToken");

    let myJson = {
      supplier_id: supplierId,
       page: 2,
    };
    console.log(myJson,"myJsonmyJsonmyJson")
    const result = await api.CreateMasterData(
      endPoint.buyer_list,
      token,
      myJson
    );
    setfilterData(result.data);
    // var BuyerListApiResponse = result.data;
    setBuyerList(result.data);
    console.log(result.data.length,"result.dataresult.dataresult.data")
    // setAppendOrderlist(result.data)
    // setBuyerList(...buyerlist, ...appendOrderlist)
    setPage(page + 1);
    setIsLoading(false);
  };
  // -------------------------------- Get All Buyer List API Calling Ends ----------------------------------------------------
  const renderEmpty = () => {
    return (
      <View
        style={[
          GlobalStyles.flexColumn,
          GlobalStyles.alignCenter,
          GlobalStyles.justifyCenter,
          GlobalStyles.padt30,
        ]}>
        <Image
          source={require("../../../assets/images/dashboard/Noorder.png")}
          style={[GlobalStyles.successIcon]}></Image>
        <Text
          style={[
            GlobalStyles.font22,
            GlobalStyles.textBlack,
            GlobalStyles.textCenter,
            GlobalStyles.mb11,
            GlobalStyles.fontBold,
          ]}>
          No records found
        </Text>
        <Text
          style={[
            GlobalStyles.font15,
            GlobalStyles.textBlack,
            GlobalStyles.mb37,
            GlobalStyles.textCenter,
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
            <TouchableOpacity
              onPress={() => {
                //   navigation.navigate("DrawerNavigationRoutes");
                navigation.goBack();
              }}>
              <BackArrow />
            </TouchableOpacity>
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
          {isLoading ? (
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
   ListEmptyComponent={isLoading ? null : renderEmpty}
  />
)}


        </View>
      </View>
      <View style={GlobalStyles.addButton1}>
        <Pressable
        onPress={() =>  navigation.push("AddBuyersScreen",buyersData)}
        >
          <Text style={GlobalStyles.stictyText1}>+</Text>
        </Pressable>
      </View>
    </>
  );
};


