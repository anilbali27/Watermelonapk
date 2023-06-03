/** @format */

/** @format */

// /** @format */

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Alert,
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   Pressable,
// //   FlatList,
// //   ActivityIndicator,
// //   TextInput,
// // } from "react-native";
// // import { Appbar, Searchbar } from "react-native-paper";
// // import { COLORS } from "../../constant/Colors";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // import GlobalStyles from "../../../assets/css/styles";
// // import BackArrow from "../../../assets/images/icons/BackArrow";
// // import SearchIcon from "../../../assets/images/icons/Search";
// // import SettingIcon from "../../../assets/images/icons/Setting";
// // import SvgUri from "react-native-svg-uri-updated";

// // import api from "../../screens/Services/API/CallingApi";
// // import { endPoint } from "../../screens/Services/API/ApiConstants";
// // import InvoiceCard from "./InvoiceCard";

// // import DetailedAllinvoices from "./DetailedAllinvoice";

// // const InvoiceScreen = ({ navigation }) => {
// //   const [invoiceListData, setinvoiceListData] = useState([]);
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     getInvoiceList();
// //   }, []);

// //   const getInvoiceList = async () => {
// //     const jsonValue = await AsyncStorage.getItem("UserToken");
// //     let token = jsonValue;

// //     const result = await api.getReviews(token, endPoint.invoice_list);
// //     console.log(
// //       result.data?.invoices[0]?.products_info[0]?.product_image,
// //       "hjhjuy"
// //     );

// //     if (result) {
// //       setinvoiceListData(result.data.invoices, "gbhnjm");
// //     } else {
// //       setinvoiceListData([]);
// //     }
// //   };

// //   const searchFilterFunction = (text) => {
// //     if (text) {
// //       const newData = invoiceListData.filter((item) => {
// //         const itemData = item.status_name
// //           ? item.unique_name.toUpperCase()
// //           : "".toUpperCase();
// //         const textData = text.toUpperCase();
// //         return itemData.indexOf(textData) > -1;
// //       });
// //       setinvoiceListData(newData);
// //       setSearch(text);
// //     } else {
// //       setinvoiceListData(invoiceListData);
// //       setSearch(text);
// //     }
// //   };
// //   const ItemSepartorView = () => {
// //     return <View style={{ height: 0, width: "100%" }} />;
// //   };
// //   return (
// //     <View style={GlobalStyles.orderContainer}>
// //       <View style={GlobalStyles.promotionsHeaderContainer}>
// //         {/* <View style={GlobalStyles.PromotionScreenIconView}>
// //           <Pressable
// //             onPress={() => {
// //               //   navigation.navigate("DrawerNavigationRoutes");
// //               navigation.goBack();
// //             }}
// //           >
// //             <BackArrow />
// //           </Pressable>
// //           <Text style={GlobalStyles.promotionsHeaderText}>Invoices</Text>
// //         </View> */}
// //       </View>
// //       <View
// //         style={{
// //           height: 38,
// //           width: "100%",
// //           paddingLeft: 19,
// //           paddingRight: 18,
// //           marginTop: 19,
// //         }}
// //       >
// //         <View>
// //           <Searchbar
// //             style={[GlobalStyles.searchBarStyle]}
// //             inputStyle={[
// //               GlobalStyles.font12,
// //               GlobalStyles.textBlack,
// //               GlobalStyles.searchinput,
// //             ]}
// //             placeholderTextColor={"#0F141A"}
// //             placeholder="Search"
// //             value={search}
// //             icon={{ display: "none" }}
// //             onChangeText={(text) => searchFilterFunction(text)}
// //           />
// //           <SvgUri
// //             source={require("../../../assets/images/dashboard/input_search_icon.svg")}
// //             style={[GlobalStyles.searchIcon]}
// //           />
// //           <TouchableOpacity
// //             style={[
// //               GlobalStyles.filterBlk,
// //               GlobalStyles.flexRow,
// //               GlobalStyles.alignCenter,
// //               GlobalStyles.justifyCenter,
// //             ]}
// //           >
// //             <SvgUri
// //               source={require("../../../assets/images/dashboard/filter_icon.svg")}
// //             />
// //           </TouchableOpacity>
// //           <View></View>
// //         </View>
// //       </View>
// //       <View style={[GlobalStyles.padVer30, GlobalStyles.padb80]}>
// //         {!invoiceListData ? (
// //           <View>
// //             <ActivityIndicator color={"#1F9CEF"} size="large" />
// //           </View>
// //         ) : (
// //           <FlatList
// //             data={invoiceListData}
// //             keyExtractor={(item) => item._id}
// //             ItemSeparatorComponent={ItemSepartorView}
// //             showsVerticalScrollIndicator={false}
// //             renderItem={({ item }) => (
// //               <Pressable
// //                 style={{ flex: 1 }}
// //                 // onPress={() =>
// //                 //   navigation.navigate("DetailedAllinvoices", {
// //                 //   _id:item?._id,
// //                 //   unique_name:item?.unique_name,
// //                 //   review:item?.review,
// //                 //   supplier_address:item?.supplier_address,
// //                 //   status_name:item?.status_name
// //                 //   })
// //                 onPress={() =>
// //                   navigation.navigate("DetailedAllinvoices", {
// //                     unique_name: item?.unique_name,
// //                     id: item?._id,
// //                     invoice: item?.link,
// //                     image: item?.products_info[0]?.product_image,
// //                   })
// //                 }
// //               >
// //                 <InvoiceCard
// //                   id={item?._id}
// //                   unique_name={item?.unique_name}
// //                   review={item?.review}
// //                   supplier_address={item?.supplier_info?.supplier_address}
// //                   status_name={item?.status_name}
// //                   due_date={item?.due_date}
// //                 />
// //               </Pressable>
// //             )}
// //           />
// //         )}
// //       </View>
// //     </View>
// //   );
// // };

// // export default InvoiceScreen;

// /** @format */

// // /** @format */

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Alert,
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   SafeAreaView,
// //   StatusBar,
// //   Pressable,
// // } from "react-native";
// // import { Appbar, Searchbar } from "react-native-paper";

// // import PromotionCard from "./PromotionCard";
// // import GlobalStyles from "../../../assets/css/styles";
// // // import BackArrowIcon from "../../../assets/images/icons/BackArrowIcon";
// // import { useFonts } from "expo-font";
// // import * as Font from "expo-font";
// // import BackArrow from "../../../assets/images/icons/BackArrow";

// // const PromotionScreen = ({ navigation }) => {
// //   // useEffect(() => {
// //   //     Font.loadAsync({ Medium: require("../../../assets/fonts/Inter-Medium.ttf"),
// //   //    Bold : require("../../../assets/fonts/Inter-ExtraBold.ttf")

// //   //     }) }, [])

// //   // const [loaded] = useFonts({ HelveticaNeueLTStdMd: require("./assets/fonts/HelveticaNeueLTStd-Md.otf"), });
// //   //  if (!loaded) { return null; }

// //   const [searchQuery, setSearchQuery] = React.useState("");

// //   const onChangeSearch = (query) => setSearchQuery(query);

// //   return (
// //     <View style={GlobalStyles.orderContainer}>
// //       <View style={GlobalStyles.promotionsHeaderContainer}>
// //         <View
// //           style={{
// //             flexDirection: "row",
// //             paddingTop: 41,
// //             paddingLeft: 22,
// //             alignItems: "center",
// //           }}>
// //           {/* <BackArrowIcon /> */}
// //           <Pressable
// //             onPress={() => {
// //               //   navigation.navigate("DrawerNavigationRoutes");
// //               navigation.goBack();
// //             }}>
// //             <BackArrow />
// //           </Pressable>
// //           <Text style={GlobalStyles.promotionsHeaderText}>Promotions</Text>
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           height: 38,
// //           width: "100%",
// //           paddingLeft: 19,
// //           paddingRight: 18,
// //           marginTop: 25,
// //         }}>
// //         <Searchbar
// //           // icon={() => <SearchIcon />}
// //           inputStyle={GlobalStyles.searchInput}
// //           style={GlobalStyles.searchContainer}
// //           placeholderTextColor={"#0F141A"}
// //           placeholder='Search'
// //           onChangeText={() => {}}
// //           //   value={searchQuery}
// //         />
// //       </View>
// //       <View
// //         style={{
// //           paddingLeft: 19,
// //           paddingRight: 18,
// //           alignContent: "center",
// //           marginTop: 19,
// //           backgroundColor: "red",
// //         }}>
// //         <View>
// //           <PromotionCard />
// //         </View>
// //       </View>
// //       <View style={GlobalStyles.addButton}>
// //         <Text style={GlobalStyles.stictyText}>+</Text>
// //       </View>
// //     </View>
// //   );
// // };

// // export default PromotionScreen;

// /** @format */

// // import React, { useState, useRef, useEffect } from "react";
// // import {
// //   Alert,
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   Pressable,
// //   FlatList,
// //   ActivityIndicator,
// //   TextInput,
// // } from "react-native";
// // import { Appbar, Searchbar } from "react-native-paper";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { COLORS } from "../../constant/Colors";

// // import GlobalStyles from "../../../assets/css/styles";
// // import BackArrow from "../../../assets/images/icons/BackArrow";
// // import api from "../../screens/Services/API/CallingApi";
// // import { endPoint } from "../../screens/Services/API/ApiConstants";
// // import SearchIcon from "../../../assets/images/icons/Search";
// // import SettingIcon from "../../../assets/images/icons/Setting";
// // import InvoiceCard from "./InvoiceCard";

// // const InvoiceScreen = ({ navigation }) => {
// //   const [invoiceListData, setinvoiceListData] = useState([]);
// //   const [search, setSearch] = useState("");

// //   useEffect(() => {
// //     getInvoiceList();
// //   }, []);

// //   const getInvoiceList = async () => {
// //     const jsonValue = await AsyncStorage.getItem("UserToken");
// //     let token = jsonValue;

// //     const result = await api.getReviews(token, endPoint.invoice_list);
// //     console.log(
// //       result.data?.invoices[0]?.products_info[0]?.product_image,
// //       "hjhjuy"
// //     );

// //     if (result) {
// //       setinvoiceListData(result.data.invoices ,"gbhnjm");
// //     } else {
// //       setinvoiceListData([]);
// //     }
// //   };

// //   const searchFilterFunction = (text) => {
// //     if (text) {
// //       const newData = invoiceListData.filter((item) => {
// //         const itemData = item.status_name
// //           ? item.unique_name.toUpperCase()
// //           : "".toUpperCase();
// //         const textData = text.toUpperCase();
// //         return itemData.indexOf(textData) > -1;
// //       });
// //       setinvoiceListData(newData);
// //       setSearch(text);
// //     } else {
// //       setinvoiceListData(invoiceListData);
// //       setSearch(text);
// //     }
// //   };

// //   return (
// //     <View style={GlobalStyles.orderContainer}>
// //       <View style={GlobalStyles.searchBarPaddingView}>
// //         <View style={GlobalStyles.searchBarView}>
// //           <View style={GlobalStyles.searchIconView}>
// //             <SearchIcon />
// //             <View style={GlobalStyles.searchPlaceHolderView}>
// //               <TextInput
// //                 onChangeText={(text) => searchFilterFunction(text)}
// //                 // value={number}
// //                 placeholder='Search'
// //                 placeholderTextColor={COLORS.introText}
// //               />
// //             </View>
// //           </View>
// //           <View>
// //             <Pressable
// //               onPress={() => {
// //                 console.log("pressed");
// //               }}>
// //               <View style={GlobalStyles.searchfilterView}>
// //                 <SettingIcon />
// //               </View>
// //             </Pressable>
// //           </View>
// //         </View>
// //       </View>
// //       <View style={[GlobalStyles.padVer30, GlobalStyles.padb80]}>
// //         {!invoiceListData ? (
// //           <View>
// //             <ActivityIndicator color={"#1F9CEF"} size='large' />
// //           </View>
// //         ) : (
// //           <FlatList
// //             data={invoiceListData}
// //             keyExtractor={(item) => item._id}
// //             showsVerticalScrollIndicator={false}
// //             renderItem={({ item }) => (
// //               <Pressable
// //                 style={{ flex: 1 }}
// //                 onPress={() =>
// //                   navigation.navigate("DetailedAllinvoices", {
// //                     unique_name: item?.unique_name,
// //                     id: item?._id,
// //                     invoice: item?.link,
// //                     image: item?.products_info[0]?.product_image,
// //                   })
// //                 }>
// //               <InvoiceCard
// //                 id={item?._id}
// //                 unique_name={item?.unique_name}
// //                 review={item?.review}
// //                 supplier_address={item?.supplier_info?.supplier_address}
// //                 status_name={item?.status_name}
// //                 due_date={item?.due_date}
// //               />
// //                </Pressable>
// //             )}
// //           />
// //         )}
// //       </View>

// //       <View style={GlobalStyles.addButton}>
// //         <Pressable
// //           onPress={() => {
// //             console.log("add promotions");
// //           }}>
// //           <Text style={GlobalStyles.stictyText}>+</Text>
// //         </Pressable>
// //       </View>
// //     </View>
// //   );
// // };

// // export default InvoiceScreen;

// /** @format */

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Alert,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Pressable,
//   FlatList,
//   ActivityIndicator,
//   TextInput,
// } from "react-native";
// import { Appbar, Searchbar } from "react-native-paper";
// import { COLORS } from "../../constant/Colors";

// import GlobalStyles from "../../../assets/css/styles";
// import BackArrow from "../../../assets/images/icons/BackArrow";

// import PaymentCard from "../payments/PaymentCard";
// import SearchIcon from "../../../assets/images/icons/Search";
// import SettingIcon from "../../../assets/images/icons/Setting";

// const InvoiceScreen = ({ navigation }) => {
//   return (
//     <View style={GlobalStyles.orderContainer}>
//       <View style={GlobalStyles.promotionsHeaderContainer}>
//         <View style={GlobalStyles.PromotionScreenIconView}>
//           <Pressable
//             onPress={() => {
//               //   navigation.navigate("DrawerNavigationRoutes");
//               navigation.goBack();
//             }}>
//             <BackArrow />
//           </Pressable>
//           <Text style={GlobalStyles.promotionsHeaderText}>InvoiceScreenq</Text>
//         </View>
//       </View>

//       <View style={GlobalStyles.searchBarPaddingView}>
//         <View style={GlobalStyles.searchBarView}>
//           <View style={GlobalStyles.searchIconView}>
//             <SearchIcon />
//             <View style={GlobalStyles.searchPlaceHolderView}>
//               <TextInput
//                 onChangeText={() => {}}
//                 // value={number}
//                 placeholder='Search'
//                 placeholderTextColor={COLORS.introText}
//               />
//             </View>
//           </View>
//           <View>
//             <Pressable
//               onPress={() => {
//                 console.log("pressed");
//               }}>
//               <View style={GlobalStyles.searchfilterView}>
//                 <SettingIcon />
//               </View>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//       <View style={GlobalStyles.promotoinsCardPaddingView}>
//         <PaymentCard />
//       </View>

//       <View style={GlobalStyles.addButton}>
//         <Pressable
//           onPress={() => {
//             console.log("add promotions");
//           }}>
//           <Text style={GlobalStyles.stictyText}>+</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default InvoiceScreen;

/** @format */

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  SafeAreaView,
  Animated,
  Pressable,
} from "react-native";

import { Appbar, Searchbar } from "react-native-paper";
import GlobalStyles from "../../../assets/css/styles";
import Icon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import { FlatList } from "react-native-gesture-handler";
import styles from "../../../assets/css/styles";
import SvgUri from "react-native-svg-uri-updated";
import { useFocusEffect } from "@react-navigation/native";
import DetailedInvoicePage from "./DetailedAllinvoice";
import { Row } from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";

const InvoiceScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const [invoiceModal, setInvoiceModal] = useState(false);
  const showDetailsModal = (id) => {
    setInvoiceModal(true);
    getInvoiceDetailList(id);
  };
  const [invoiceList, setinvoiceList] = useState([]);
  const [invoiceListView, setinvoiceListView] = useState([]);
  const [search, setSearch] = useState("");
  const [invoicedata, setinvoicedata] = useState([]);
  const [tempinvoicedata, settempinvoicedata] = useState([]);

  const [filterdData, setfilterData] = useState([]);

  const [suppliers, setSuppliers] = useState(false);
  const [outlets, setOutlets] = useState(false);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(2);
  const [statuss, setStatuss] = useState();

  const height = React.useRef(null);

  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });

  const [sheetHeight, setSheetHeight] = useState(500);

  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    if (outlets == true || suppliers == true) {
      setSheetHeight(700);
    } else {
      setSheetHeight(500);
    }
  }, [outlets, suppliers]);

  /*filter supplier names*/
  const names = [
    "HK Enteprisers(Dry)",
    "Royal Techno Foodstuff LLC",
    "Bryght Supplies",
    "Premium First Choice Foods",
  ];

  const outletNames = [
    "Al1",
    "Global Beverages",
    "FResh Bulk",
    "Chief Middle East(CME)",
  ];

  const statussList = ["active", "inactive", "all"];
  const handlePress = (name) => {
    console.log(name, "anil");
  };

  useEffect(() => {
    // console.log(suppliers, outlets, status, "0000000000000000000000");
    if (suppliers === true || outlets === true || status === true) {
      animationValue.setValue(1);
    } else {
      animationValue.setValue(0);
    }
  }, [suppliers, outlets, status]);

  //Get Invoice List By API
  useEffect(() => {
    getInvoiceList();
  }, []);

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      console.log(text, "text");
      setSearch(text);
      const filteredData = tempinvoicedata.filter(
        (element) =>
          element.status_name.toLowerCase().includes(text.toLowerCase()) ||
          element.buyer_company_name
            .toLowerCase()
            .includes(text.toLowerCase()) ||
          element.outlet_info.name.toLowerCase().includes(text.toLowerCase())
      );
      // console.log(filteredData, "filteredData");
      if (filteredData.length > 0) {
        setinvoiceList(filteredData);
        setSearch(text);
      } else {
        setSearch(text);
        setinvoiceList([]);
      }
    } else {
      setSearch("");
      setinvoiceList(tempinvoicedata);
    }
  };
  const nameList = names.map((namee, index) => (
    <View>
      <TouchableOpacity onPress={() => handlePress(namee)}>
        <Text key={index} style={GlobalStyles.textBackground}>
          {namee}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  const statusList = statussList.map((statussList, index) => (
    <View>
      <TouchableOpacity onPress={() => handlePress(statussList)}>
        <Text key={index} style={GlobalStyles.textBackground}>
          {statussList}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  const getInvoiceList = async (id) => {
    const accesstoken = await AsyncStorage.getItem("UserToken");
    const supplierId = await AsyncStorage.getItem("userTypeId");
    var myJson = {
      supplier_id: supplierId,
    };

    const result = await api.getAllCategory(
      accesstoken,
      endPoint.invoice_list,
      myJson
    );

    // console.log(supplierId, "myJson");
    if (result.success) {
      setinvoiceList(result.data?.invoices);
      settempinvoicedata(result.data?.invoices);
      setinvoicedata(result.data?.invoices);
      setfilterData(result.data?.invoices);
    } else {
      setinvoicedata([]);
    }
  };

  //Get Invoice List View By API
  {
    /*const getInvoiceDetailList = async (id) => {
    const accesstoken = await AsyncStorage.getItem('UserToken')
    var myJson = {
      invoice_id: id
    }
    const result = await api.getAllCategory(accesstoken, endPoint.invoice_view_List, myJson)
    console.log(result.data?.invoices, "INVOICELIST");
    if (result.success) {
      setinvoiceList(result.data)
    }
  };*/
  }

  return (
    <SafeAreaView>
      <View style={GlobalStyles.defaultScreenContainer}>
        
        <View>
          <Searchbar
            style={[styles.searchBarStyle]}
            inputStyle={[
              GlobalStyles.font12,
              GlobalStyles.textBlack,
              GlobalStyles.searchinput,
            ]}
            placeholderTextColor={"#0F141A"}
            placeholder='Search'
            value={search}
            icon={{ display: "none" }}
            onChangeText={(text) => searchFilterFunction(text)}
          />
          <SvgUri
            source={require("../../../assets/images/dashboard/input_search_icon.svg")}
            style={[GlobalStyles.searchIcon]}
          />

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={[
              GlobalStyles.filterBlk,
              GlobalStyles.flexRow,
              GlobalStyles.alignCenter,
              GlobalStyles.justifyCenter,
            ]}>
            <SvgUri
              source={require("../../../assets/images/dashboard/filter_icon.svg")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 100 }}>
          <FlatList
            data={invoiceList}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.push("DetailedInvoicePage", item)}>
                <View style={GlobalStyles.notificationOddContainer}>
                  <View style={GlobalStyles.invoiceContainer}>
                    <View style={GlobalStyles.invoiceTwoSectionRow_first}>
                      <View
                        style={[
                          GlobalStyles.flexRow,
                          GlobalStyles.justifyBetween,
                          GlobalStyles.alignCenter,
                          GlobalStyles.mb4,
                        ]}>
                        <View style={{ flexDirection: "row", flex: 0.8 }}>
                          <Text
                            style={[
                              GlobalStyles.font12,
                              GlobalStyles.textBlack,
                              GlobalStyles.fontBold,
                            ]}>
                            {item.buyer_company_name}
                          </Text>
                        </View>
                        <View>
                          {item.status_name == "Unpaid" ? (
                            <View style={GlobalStyles.invoiceUnpaidStatus}>
                              <Text style={GlobalStyles.paidText}>
                                {item.status_name}
                              </Text>
                            </View>
                          ) : (
                            <View style={GlobalStyles.invoicepaidStatus}>
                              <Text style={GlobalStyles.paidText}>
                                {item.status_name}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <Text
                        style={[
                          GlobalStyles.font10,
                          GlobalStyles.textDefault,
                          GlobalStyles.mb4,
                        ]}>
                        Outlet: {item.outlet_info.name}
                      </Text>
                      <Text
                        style={[
                          GlobalStyles.font10,
                          GlobalStyles.textPri,
                          GlobalStyles.mb4,
                          GlobalStyles.fontMed,
                        ]}>
                        {item.unique_name}
                      </Text>
                      <View
                        style={[
                          GlobalStyles.flexRow,
                          GlobalStyles.alignCenter,
                          GlobalStyles.justifyBetween,
                        ]}>
                        <Text
                          style={[
                            GlobalStyles.amountText,
                            GlobalStyles.font14,
                            GlobalStyles.fontSemi,
                          ]}>
                          AED {item.total_cost_amount}
                        </Text>
                        <View
                          style={[
                            GlobalStyles.flexRow,
                            GlobalStyles.alignCenter,
                            GlobalStyles.justifyEnd,
                          ]}>
                          <View
                            style={[
                              GlobalStyles.flexRow,
                              GlobalStyles.alignCenter,
                            ]}>
                            <SvgUri
                              source={require("../../../assets/images/dashboard/calender_icon.svg")}
                            />
                            <Text
                              style={[
                                GlobalStyles.textDefault,
                                GlobalStyles.font10,
                                GlobalStyles.pl4,
                              ]}>
                              {item.delivery_requested.delivery_date}
                            </Text>
                          </View>
                          <View
                            style={[
                              GlobalStyles.flexRow,
                              GlobalStyles.alignCenter,
                              GlobalStyles.pl8,
                            ]}>
                            <SvgUri
                              source={require("../../../assets/images/dashboard/clock_icon.svg")}
                            />
                            <Text
                              style={[
                                GlobalStyles.textDefault,
                                GlobalStyles.font10,
                                GlobalStyles.pl4,
                              ]}>
                              {item.delivery_requested.earlier_time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* <TouchableOpacity onPress={() => showDetailsModal(1)}>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceTitle}>
                  Unibic Dubai International
                </Text>
                <View style={GlobalStyles.invoiceButtonPaid}>
                  <Text style={GlobalStyles.invoiceButtonText}>Paid</Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.invoiceAddress}>
                  Outlet : Abu Dhabi
                </Text>
              </View>
              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.invoiceInv}>INV-000039</Text>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceAed}>AED 12.55</Text>

                <Text style={GlobalStyles.invoiceDate}>
                  <Icon name='calendar' size={10}></Icon> Mar 23{" "}
                  <Icon name='calendar' size={10}></Icon> 11:50:00
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => showDetailsModal(1)}>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceTitle}>
                  Unibic Dubai International
                </Text>
                <View style={GlobalStyles.invoiceButtonUnPaid}>
                  <Text style={GlobalStyles.invoiceButtonText}>Unpaid</Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.invoiceAddress}>
                  Outlet : Abu Dhabi
                </Text>
              </View>
              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.invoiceInv}>INV-000039</Text>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceAed}>AED 12.55</Text>

                <Text style={GlobalStyles.invoiceDate}>
                  <Icon name='calendar' size={10}></Icon> Mar 23{" "}
                  <Icon name='calendar' size={10}></Icon> 11:50:00
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={invoiceModal}
          onRequestClose={() => {
          }}>
          <ScrollView></ScrollView>
        </Modal>
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
                    setSuppliers(!suppliers);
                    setOutlets(false);
                    setStatus(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Buyers
                      </Text>
                    </View>
                    <View>{suppliers ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {suppliers ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {nameList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setOutlets(!outlets);
                    setSuppliers(false);
                    setStatus(false);

                    //  setSheetHeight(700);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Outlets
                      </Text>
                    </View>
                    <View>{outlets ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {outlets ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {nameList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setStatus(!status);
                    setOutlets(false);
                    setSuppliers(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Status
                      </Text>
                    </View>
                    <View>{status ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {status ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {statusList}
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
                <TouchableOpacity>
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
                <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default InvoiceScreen;
