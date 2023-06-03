import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Button,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { COLORS } from "../../constant/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import styles from "../../../assets/css/styles";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import ReviewCard from "../review&rating/ReviewCard";
import WareHouseListCard from "./WareHouseListCard";
import { useIsFocused } from "@react-navigation/native";

const WareHouseList = ({ navigation }) => {
  const [reviewData, setreviewData] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [showloader, setShowLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const isFocused = useIsFocused;

  const [totalCount, setTotalCount] = useState();
  // console.log(totalCount, "777");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [text, setText] = useState("");

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.warehouse_name
          ? item.email.toUpperCase() + item.address
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setreviewData(newData);
      setSearch(text);
    } else {
      setreviewData(data);
      setSearch(text);
    }
  };

  // console.log(filterdData, "filterdData");

  useEffect(() => {
    wareHouseList();
  }, [isFocused]);

  // const wareHouseList = async () => {
  //   setPage((prevPage) => prevPage + 1);
  //   const jsonValue = await AsyncStorage.getItem("UserToken");

  //   const id = await AsyncStorage.getItem("userTypeId");
  //   let token = jsonValue;
  //   console.log(token, "1123");
  //   var myJson = {
  //     // user_type_id: "60784da77b60b7605a47a41c",
  //     supplier_id: id,
  //     page: page,
  //     keyword: text,
  //   };
  //   const result = await api.getFilter(token, endPoint.get_Warehouse, myJson);

  //   if (result) {
  //     setTotalCount(result.total_count);
  //     const newData = [];
  //     if (result.data.length == 0) {
  //       loadMore = false;
  //       setShowLoader(false);
  //     }
  //     setData((prevData) => [...prevData, ...result.data]);
  //     // setShowLoader(false);
  //     // console.log(result, "565");
  //     setList(result);
  //     setreviewData(result.data);
  //     setIsLoading(false);
  //     setfilterdData(result.data);
  //   } else {
  //     setreviewData([]);
  //     setfilterdData([]);
  //   }
  // };

  const wareHouseList = async () => {
    setShowLoader(true); // Show the activity indicator
    setPage((prevPage) => prevPage + 1);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      supplier_id: id,
      page: page,
      keyword: text,
    };

    const result = await api.getFilter(token, endPoint.get_Warehouse, myJson);

    if (result) {
      setTotalCount(result.total_count);
      const newData = [];
      if (result.data.length === 0) {
        // alert();
        setLoadMore(false);
        setShowLoader(false);
      }
      setData((prevData) => [...prevData, ...result.data]);
      setreviewData(result.data);
      setfilterdData(result.data);
    } else {
      setreviewData([]);
      setfilterdData([]);
    }

    setIsLoading(false); // Set isLoading to false after the data is loaded
  };

  // console.log(data.length, "235");

  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };

  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );

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

  const onreachend = () => {
    // if (data.length < totalCount) {
    //   <ActivityIndicator size='large' />;
    //   wareHouseList();
    // } else {
    //   setIsLoading(false);
    // }
    if (loadMore) {
      setShowLoader(true);
      wareHouseList();
    } else {
      // alert("else");
      setLoadMore(false);
      setShowLoader(false);
    }
  };

  const listFooterComponent = useCallback(() => {
    return <ActivityIndicator size='large' />;
  }, []);

  const renderFooter = () => {
    if (isLoading) {
      return;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Fetch new data to refresh the list
    fetchData();
    setRefreshing(false);
  };

  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.paymentHeaderView}>
        <View style={GlobalStyles.paymentHeaderPaddingView}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  //   navigation.navigate("DrawerNavigationRoutes");
                  navigation.goBack();
                }}>
                <BackArrow />
              </TouchableOpacity>

              {/* <Pressable onPress={() => {}}>
                <MenuIcon />
              </Pressable> */}
            </View>
            <Text style={GlobalStyles.menuText}>Warehouse</Text>
          </View>
        </View>
      </View>

      <View style={GlobalStyles.searchBarPaddingView}>
        <View style={GlobalStyles.searchBarView}>
          <View style={GlobalStyles.searchIconView}>
            <SearchIcon />
            <View style={GlobalStyles.searchPlaceHolderView}>
              <TextInput
                // onChangeText={(text) => searchFilterFunction(text)}
                onChangeText={(text) => setText(text)}
                // value={search}
                placeholder='Search'
                placeholderTextColor={COLORS.introText}
              />
            </View>
          </View>
          <View></View>
        </View>
      </View>
      <View style={GlobalStyles.warehouseFlatListView}>
        <View>
          {/* <ReviewCard /> */}
          {isLoading ? (
            <View>
              <ActivityIndicator color={COLORS.button} size='large' />
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={ItemSepartorView}
              showsVerticalScrollIndicator={false}
              // onEndReached={() => setPage((prevPage) => prevPage + 1)}
              // onEndReachedThreshold={0.5}
              // onEndReached={wareHouseList}
              onEndReached={onreachend}
              onEndReachedThreshold={0.5}
              // refreshing={refreshing}
              // onRefresh={handleRefresh}
              ListFooterComponent={showloader && listFooterComponent}
              renderItem={({ item }) => (
                <Pressable
                  style={{ flex: 1 }}
                  onPress={() => navigation.navigate("", {})}>
                  <WareHouseListCard
                    id={item._id}
                    warehouse_name={item?.warehouse_name}
                    email={item?.email}
                    country_code={item?.country_code}
                    phone_number={item?.phone_number}
                    mobile_country_code={item?.mobile_country_code}
                    mobile_number={item?.mobile_number}
                    status_name={item?.status_name}
                    address={item?.address}
                    addData={item}
                    navigation={navigation}
                    updateData={() => wareHouseList()}
                  />
                </Pressable>
              )}
              ListEmptyComponent={isLoading ? null : renderEmpty}
            />
          )}
        </View>
      </View>
      <View style={GlobalStyles.addButton1}>
        <Pressable onPress={() => navigation.navigate("AddWareHouse")}>
          <Text style={GlobalStyles.stictyText1}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WareHouseList;