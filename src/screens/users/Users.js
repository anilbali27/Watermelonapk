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
import styles from "../../../assets/css/styles";

import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import UsersCard from "./UsersCard";

const UsersScreen = ({ navigation }) => {
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);

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

  // -------------------------------- Search Functionality ----------------------------------------------------
  // const searchFilterFunction = (text) => {
  //   if (text) {
  //     const newData = buyerlist.filter((item) => {
  //       const itemData = item.city ? item.city.toUpperCase() : "".toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //       // return(item.city.toUpperCase().includes(text.toLowerCase()) || item.firstname.toLowerCase().includes(text.toLowerCase())
  //       // || item.company_registration_no.toLowerCase().includes(text.toLowerCase()) || item.buyer_type.toLowerCase().includes(text.toLowerCase())
  //       // || item.status_name.toLowerCase().includes(text.toLowerCase()));
  //     });
  //     setBuyerList(newData);
  //     setSearch(text);
  //   } else {
  //     setBuyerList(filterdData);
  //     setSearch(text);
  //   }
  // };

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.firstname
          ? item.firstname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  // -------------------------------- Search Functionality Ends ----------------------------------------------------

  // -------------------------------- Get All User List API Calling ----------------------------------------------------
  useEffect(() => {
    getAllUserList();
  }, []);
  const getAllUserList = async () => {
    console.log("Page:::", page);
    setIsLoading(true);
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let userType = await AsyncStorage.getItem("userType");
    let token = await AsyncStorage.getItem("UserToken");
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MTM3MTIyMSwiZXhwIjoxNzEyOTA3MjIxLCJuYmYiOjE2ODEzNzEyMjEsImp0aSI6Im9aeWpua2FFN0hTU1lwS1oiLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.Xb3JDRswdPXgJORSa-CLZgV9vIOo4huAw4quQ0Ch55Y";
    console.log("userType::", "userType");
    let myJson = {
      // user_type_id: supplierId,
      // user_type: parseInt(userType),
      user_type_id: supplierId,
      user_type: parseInt(userType),
      // page: page,
    };
    console.log("myJsonUser:::", myJson);
    const result = await api.CreateMasterData(
      endPoint.user_list,
      token,
      myJson
    );
    // console.log("Users List:::", result.data)
    // setfilterData(result.data);
    setUsersList(result.data);
    setfilterData(result.data);
    setmasterData(result.data);
    setPage(page + 1);
    setIsLoading(false);
  };
  // -------------------------------- Get All User List API Calling Ends ----------------------------------------------------

  //Loader
  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );
  return (
    //   <View style={GlobalStyles.orderContainer}>
    //   <View style={GlobalStyles.outletsCardPaddingView}>
    //     {/* <OutletsScreenCard /> */}
    //     {!usersList ? (
    //       <View>
    //         <ActivityIndicator color={COLORS.button} size="large" />
    //       </View>
    //     ) : (
    //       <FlatList
    //         data={usersList}
    //         keyExtractor={(item) => item._id}
    //         showsVerticalScrollIndicator={false}
    //       //   onEndReached={handleSubmit}
    //         onEndReachedThreshold={0.7}
    //         renderItem={({ item }) => (
    //           <UsersCard
    //           firstname={item.firstname}
    //           status_name={item.status_name}
    //           designation={item.designation}
    //           permission_role_name={item.permission_role_name}
    //           email={item.email}
    //           phone_number={item.phone_number}
    //           profile={item.profile}
    //           tier_approval={item.tier_approval}
    //       />
    //         )}
    //       />
    //     )}
    //   </View>
    // </View>
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
            <Text style={GlobalStyles.promotionsHeaderText}>Users</Text>
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
          {/* <UsersCard /> */}

          {isLoading ? (
            <View>{isLoading ? <Loader /> : null}</View>
          ) : (
            <FlatList
              data={filterdData}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              //   onEndReached={handleSubmit}
              onEndReachedThreshold={0.7}
              renderItem={({ item }) => (
                <UsersCard
                  firstname={item.firstname}
                  status_name={item.status_name}
                  designation={item.designation}
                  permission_role_name={item.permission_role_name}
                  email={item.email}
                  phone_number={item.phone_number}
                  profile={item.profile}
                  tier_approval={item.tier_approval}
                  navigation={navigation}
                  updateData={() => handleSubmit()}
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

export default UsersScreen;

// import React from "react";
// import { View, Text } from "react-native";

// export default function UsersScreen({ navigation }) {
//   return (
//     <View>
//       <Text>UsersScreen</Text>
//     </View>
//   );
// }
