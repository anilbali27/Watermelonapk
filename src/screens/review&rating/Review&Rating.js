/** @format */

// /** @format */

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
import ReviewCard from "./ReviewCard";

const ReviewRatingScreen = ({ navigation }) => {
  const [reviewData, setreviewData] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = filterdData.filter((item) => {
        const itemData = item.supplier_name
          ? item.supplier_name.toUpperCase() +
          item.buyer_name.toUpperCase() +
          item.review.toUpperCase() +
          item.updated_at
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setreviewData(newData);
      setSearch(text);
    } else {
      setreviewData(filterdData);
      setSearch(text);
    }
  };
  console.log(filterdData, "filterdData");
  useEffect(() => {
    getReviews();
  }, []);
  //getreviews
  const getReviews = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MzUyNzAyMSwiZXhwIjoxNzE1MDYzMDIxLCJuYmYiOjE2ODM1MjcwMjEsImp0aSI6IncwWEdXc3ZGT1NkZm1rbW0iLCJzdWIiOiI2NDQ3NmRhYjIwZDYzZjAwNmIwMGI4NTYiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.0VE-p6o9CAcgACW4bEx3-6nokHyqTpus3mP0MiWUhlI";
    let supplierId = await AsyncStorage.getItem("userTypeId");

    let myJson = {
      supplier_id: supplierId
    };
    const result = await api.getReviews(token, endPoint.get_reviews,myJson);
    console.log(result, "hjhjuy");

    if (result) {
      setList(result);
      setreviewData(result.data);
      setIsLoading(false);
      setfilterdData(result.data);
    } else {
      setreviewData([]);
      setfilterdData([]);
    }
  };
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;

    const Loader = () => (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 300,
        }}>
        <ActivityIndicator size='large' color={"#1F9CEF"} />
      </View>
    );
  };
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
            <Text style={GlobalStyles.menuText}>Ratings and Reviews</Text>
          </View>
         
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
           
            </View>
          </View>
        </View>
      <View style={GlobalStyles.ratingreviewFlatListView}>
        
        <View>
          {/* <ReviewCard /> */}
          {isLoading ? (
  <View>
    <ActivityIndicator color={COLORS.button} size='large' />
  </View>
) : (
  <FlatList
    data={reviewData}
    keyExtractor={(item) => item._id}
    ItemSeparatorComponent={ItemSepartorView}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <Pressable
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("", {
            id: item?._id,
            product_code: item?.product_code,
            review: item?.review,
            supplier_name: item?.supplier_name,
            rating: item?.rating,
          })
        }>
        <ReviewCard
          id={item?._id}
          product_code={item?.product_code}
          review={item?.review}
          supplier_name={item?.supplier_name}
          buyerName={item?.buyer_name}
          rating={item?.rating}
          updated_at={item?.updated_at}
          datee={item?.created_at}
        />
      </Pressable>
    )}
    ListEmptyComponent={isLoading ? null : renderEmpty}
  />
)}

        </View>
      </View>
    </View>
  );
};

export default ReviewRatingScreen;
