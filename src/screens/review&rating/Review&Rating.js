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

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import ReviewCard from "./ReviewCard";

const ReviewRatingScreen = ({ navigation }) => {
  const [reviewData, setreviewData] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);
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

    const result = await api.getReviews(token, endPoint.get_reviews);
    console.log(result, "hjhjuy");

    if (result) {
      setList(result);
      setreviewData(result.data);
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
  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.paymentHeaderView}>
        <View style={GlobalStyles.paymentHeaderPaddingView}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={{ justifyContent: "center" }}>
              <Pressable
                onPress={() => {
                  //   navigation.navigate("DrawerNavigationRoutes");
                  navigation.goBack();
                }}>
                <BackArrow />
              </Pressable>

              {/* <Pressable onPress={() => {}}>
                <MenuIcon />
              </Pressable> */}
            </View>
            <Text style={GlobalStyles.menuText}>Ratings and Reviews</Text>
          </View>
        </View>
      </View>

      <View style={GlobalStyles.ratingreviewFlatListView}>
        <View>
          {/* <ReviewCard /> */}
          {!list ? (
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
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ReviewRatingScreen;
