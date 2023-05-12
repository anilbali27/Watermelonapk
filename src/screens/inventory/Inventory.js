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

import InventoryCard from "./InventoryCard";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const InventoryScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

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

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.warehouse
          ? item.warehouse.toUpperCase()
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

  const handleSubmit = async (data) => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    console.log(jsonValue, "token00");
    // let token = jsonValue;
    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    const result = await api.getPayments(endPoint.inventory_List, token);
    console.log(result, "109");
    setMyList(result.data);
    console.log(result.data?.inventory, "209");
    setList(result.data?.inventory);
    setmasterData(result.data?.inventory);
    setfilterData(result.data?.inventory);
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
            </View>
            <Text style={GlobalStyles.menuText}>Inventory</Text>
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
            {/* <Pressable onPress={() => setModalVisible(true)}> */}
            <View style={GlobalStyles.searchfilterView}>
              <SettingIcon />
            </View>
            {/* </Pressable> */}
          </View>
        </View>
      </View>
      <View style={GlobalStyles.PaymentsPadding}>
        {/* <InventoryCard /> */}
        {!myList ? (
          <View>
            <ActivityIndicator color={COLORS.button} size='large' />
          </View>
        ) : (
          <FlatList
            data={filterdData}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
              // onPress={() => navigation.navigate("EditStock")}
              >
                <InventoryCard
                  name={item.warehouse}
                  productName={item.product_name}
                  productCode={item.product}
                  skuName={item.sku_name}
                  opening={item.Opening}
                  add={item.Add}
                  sales={item.Sales}
                  lost={item.Lost}
                  damaged={item.Damaged}
                  expired={item.Expired}
                  returned={item.Returned}
                  adjusted={item.Adjusted}
                  closing={item.Closing}
                  totalPrice={item.total_price}
                  navigation={navigation}
                  updateData={() => handleSubmit()}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>
      <View style={GlobalStyles.addButton}>
        <Pressable
          onPress={() => {
            navigation.navigate("AdjustInventory");
          }}>
          <Text style={GlobalStyles.stictyText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InventoryScreen;

// import React from "react";
// import { View, Text } from "react-native";

// export default function InventoryScreen({ navigation }) {
//   return (
//     <View>
//       <Text>InventoryScreen</Text>
//     </View>
//   );
// }
