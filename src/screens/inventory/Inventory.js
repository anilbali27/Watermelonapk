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
  Animated,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

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
import RBSheet from "react-native-raw-bottom-sheet";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
const InventoryScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedSKU, setSelectedSKU] = useState("");
  const isFocused = useIsFocused();


  const [products, setProducts] = useState(false);
  const [warehouse, setWarehouse] = useState(false);
  const [sku, setSku] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });
  const refRBSheet = useRef();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getInventoryData();
  }, [isFocused]);

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
          ? item.warehouse.toUpperCase() +
         item.product_name.toUpperCase() +
         item.sku_name.toUpperCase() +
         item.product.toUpperCase() +
        
         item.Add +
         item.Sales +
         item.Lost +
         item.Damaged +
         item.Expired +
         item.Returned +
         item.Adjusted +
         item.Closing +
         item.total_price +
         item.Opening
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
  const uniqueProducts = new Set();

  masterData.forEach((product) => {
    uniqueProducts.add(product.product_name);
  });
  
  const productList = Array.from(uniqueProducts).map((productName) => (
    <View key={productName}>
      <TouchableOpacity onPress={() => setSelectedProduct(productName)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedProduct === productName && { backgroundColor: "#1F9CEF" },
          ]}
        >
          {productName}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  

 // Create a Set to store unique warehouse names
 const uniqueWarehouses = new Set();

 masterData.forEach((product) => {
   uniqueWarehouses.add(product.warehouse);
 });
 
 const warehouseList = Array.from(uniqueWarehouses).map((warehouse) => (
   <View key={warehouse}>
     <TouchableOpacity onPress={() => setSelectedWarehouse(warehouse)}>
       <Text
         style={[
           GlobalStyles.textBackground,
           selectedWarehouse === warehouse && { backgroundColor: "#1F9CEF" },
         ]}
       >
         {warehouse}
       </Text>
     </TouchableOpacity>
   </View>
 ));
 

 const uniqueSKUs = new Set();

 masterData.forEach((product) => {
   uniqueSKUs.add(product.sku_name);
 });
 
 const skuList = Array.from(uniqueSKUs).map((skuName) => (
   <View key={skuName}>
     <TouchableOpacity onPress={() => setSelectedSKU(skuName)}>
       <Text
         style={[
           GlobalStyles.textBackground,
           selectedSKU === skuName && { backgroundColor: "#1F9CEF" },
         ]}
       >
         {skuName}
       </Text>
     </TouchableOpacity>
   </View>
 ));
 
 const showResult = (selectedProduct, selectedWarehouse, selectedSKU) => {
  if (selectedProduct || selectedWarehouse || selectedSKU) {
    const newData = masterData.filter((item) => {
      const itemData =
        (item.product_name
          ? item.product_name.toUpperCase() + " - "
          : "") +
        (item.sku_name? item.sku_name.toUpperCase() : "") +
        (item.warehouse
          ? " - " + item.warehouse.toUpperCase()
          : "");

      const textData1 = selectedProduct || "";
      const textData2 = selectedWarehouse || "";
      const textData3 = selectedSKU || "";

      return (
        itemData.indexOf(textData1.toUpperCase()) > -1 &&
        itemData.indexOf(textData2.toUpperCase()) > -1 &&
        itemData.indexOf(textData3.toUpperCase()) > -1
      );
    });

    setfilterData(newData);
    refRBSheet.current.close();
  } else {
    refRBSheet.current.close();
    setfilterData(masterData);
  }
};

const clearFilters = () => {
  setfilterData(masterData);
  setSelectedProduct(null);
  setSelectedSKU(null);
  setSelectedWarehouse(null);
  refRBSheet.current.close();
};



  
  const getInventoryData = async (data) => {
    const accesstoken = await AsyncStorage.getItem("UserToken");
    const supplierId = await AsyncStorage.getItem("userTypeId");
    var myJson = {
      supplier_id: supplierId,
    };
    const result = await api.getPayments(endPoint.inventory_List, accesstoken,myJson);
    setMyList(result.data);
    setList(result.data?.inventory);
    setmasterData(result.data?.inventory);
    setIsLoading(false)
    setfilterData(result.data?.inventory);
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
            <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
            >
              <View style={GlobalStyles.searchfilterView}>
                <SettingIcon />
              </View>
            </TouchableOpacity>
            {/* </Pressable> */}
          </View>
        </View>
      </View>
      <View style={GlobalStyles.PaymentsPadding}>
        {/* <InventoryCard /> */}
        {isLoading ? (
          <View>
            <ActivityIndicator color={COLORS.button} size='large' />
          </View>
        ) : (
          <FlatList
            data={filterdData}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              // <TouchableOpacity
              // onPress={() => navigation.navigate("EditStock")}
              // >
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
              // </TouchableOpacity>
            )}
            ListEmptyComponent={isLoading ? null : renderEmpty}
          />
        )}
      </View>
      <View style={GlobalStyles.addButton}>
        <Pressable
        onPress={() => {
          navigation.navigate("AdjustInventory");
        }}
        >
          <Text style={GlobalStyles.stictyText}>+</Text>
        </Pressable>
      </View>
      <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          // height={sheetHeight}
          height={maxHeight}
          // height={outlets ? 700 : 500}
          customStyles={{
            // wrapper: {
            //   backgroundColor: "transparent",
            // },
            draggableIcon: {
              backgroundColor: "#1F9CEF",
            },
          }}>
          <View
            style={{
              justifyContent: "space-between",
            }}>
            <View
              style={{
                justifyContent: "flex-start",
                height: maxHeight.outputRange == 500 ? 500 : 390,
              }}>
              <View style={GlobalStyles.filterContainer}>
                <View
                  style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                  <View>
                    <Text style={GlobalStyles.filterHeadingText}>
                      Sort & Filter
                    </Text>
                  </View>
                  <View>
                    <CrossMark />
                  </View>
                </View>
              </View>
              <View style={GlobalStyles.HorizantalLine} />

              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setProducts(!products);
                    setWarehouse(false);
                    setSku(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Products
                      </Text>
                    </View>
                    <View>{products ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {products ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {productList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setWarehouse(!warehouse);
                    setProducts(false);
                    setSku(false);

                    //  setSheetHeight(700);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Warehouse
                      </Text>
                    </View>
                    <View>{warehouse ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {warehouse ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {warehouseList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setSku(!sku);
                    setProducts(false);
                    setWarehouse(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Sku
                      </Text>
                    </View>
                    <View>{sku ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {sku ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {skuList}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",

                // marginTop: animationValue == 0 ? 0 : 135,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#EDF5FF",
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: 92,
                  alignItems: "center",
                  // marginTop: 135,
                }}>
                <TouchableOpacity 
                onPress={clearFilters}
                >
                  <View
                    style={{
                      width: 161,
                      height: 47,

                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text>Clear All</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    showResult(
                      selectedProduct,selectedSKU,selectedWarehouse
                    )
                  }
                  >
                  <View
                    style={{
                      width: 161,
                      height: 47,
                      backgroundColor: "#1F9CEF",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      borderRadius: 10,
                    }}>
                    <View style={{ paddingRight: 5 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 20,
                          fontWeight: "bold",
                          color: "white",
                        }}>
                        Show Results
                      </Text>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
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
