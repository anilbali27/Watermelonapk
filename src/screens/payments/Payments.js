/** @format */

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
//   Modal,
//   StyleSheet,
//   Animated,
// } from "react-native";
// import styles from "../../../assets/css/styles";

// import { Appbar, Searchbar } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import RBSheet from "react-native-raw-bottom-sheet";
// import CrossMark from "../../../assets/images/icons/CrossMark";
// import DropDown from "../../../assets/images/icons/DropDown";
// import UpArrow from "../../../assets/images/UpArrow";
// import ArrowRight from "../../../assets/images/icons/ArrowRight";
// import { COLORS } from "../../constant/Colors";
// import GlobalStyles from "../../../assets/css/styles";
// import BackArrow from "../../../assets/images/icons/BackArrow";
// import PaymentCard from "./PaymentCard";
// import SearchIcon from "../../../assets/images/icons/Search";
// import SettingIcon from "../../../assets/images/icons/Setting";
// import MenuIcon from "../../../assets/images/icons/MenuIcon";
// import Bell from "../../../assets/images/icons/Bell";
// import api from "../Services/API/CallingApi";
// import { endPoint } from "../Services/API/ApiConstants";

// const PaymentScreen = ({ navigation }) => {
//   const [myList, setMyList] = useState();
//   const [list, setList] = useState([]);
//   const [filterdData, setfilterData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const [masterData, setmasterData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [outlets, setOutlets] = useState(false);
//   const [buyers, setBuyers] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("");
//   const [selectedBuyer, setSelectedBuyer] = useState("");
//   const [selectedOutlet, setselectedOutlet] = useState("");

//   const [modalVisible, setModalVisible] = useState(false);
//   const [animationValue] = useState(() => new Animated.Value(0));

//   const maxHeight = animationValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [500, 600], // <-- value that larger than your content's height
//   });
//   const refRBSheet = useRef();

//   useEffect(() => {
//     handleSubmit();
//   }, []);

//   //search function
//   const searchFilterFunction = (text) => {
//     if (text) {
//       const newData = masterData?.filter((item) => {
//         const itemData = item?.invoice_unique_name
//           ? item.invoice_unique_name.toUpperCase() +
//             item.type.toUpperCase() +
//             item.outlet_info.name.toUpperCase() +
//             item.amount
//           : "".toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setfilterData(newData);
//       setSearch(text);
//     } else {
//       setfilterData(masterData);
//       setSearch(text);
//     }
//   };
//   const clearFilters = () => {
//     setfilterData(masterData);
//     setSelectedBuyer(null);
//     setselectedOutlet(null);
//     refRBSheet.current.close();
//   };

//   const handleSubmit = async (data) => {
//     const jsonValue = await AsyncStorage.getItem("UserToken");
//     let token = jsonValue;
//     const result = await api.getPayments(endPoint.get_payments, token);
//     console.log(result.data?.payments, "oooooooooooooooooooooo");
//     setMyList(result);
//     setList(result.data?.payments);
//     setfilterData(result.data?.payments);
//     setmasterData(result.data?.payments);
//   };
//   // const buyerList = filterdData.map(item => item.buyer_company_name);

//   const buyerSet = new Set(
//     filterdData?.map((payments) => payments?.buyer_company_name)
//   );
//   const buyerList = Array.from(buyerSet).map((buyer, index) => (
//     <View key={index}>
//       <TouchableOpacity onPress={() => setSelectedBuyer(buyer)}>
//         <Text
//           style={[
//             GlobalStyles.textBackground,
//             selectedBuyer === buyer && { backgroundColor: "#1F9CEF" },
//           ]}>
//           {buyer}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   ));
//   const outletSet = new Set(
//     filterdData?.map((payment) => payment?.outlet_info.name)
//   );
//   const outletList = Array.from(outletSet).map((outletName, index) => {
//     // Get an array of objects that match the outlet name
//     const payments = filterdData?.filter(
//       (payment) => payment?.outlet_info.name === outletName
//     );

//     return (
//       <View key={index}>
//         <TouchableOpacity onPress={() => setselectedOutlet(outletName)}>
//           <Text
//             style={[
//               GlobalStyles.textBackground,
//               selectedOutlet === outletName && { backgroundColor: "#1F9CEF" },
//             ]}>
//             {outletName}
//           </Text>
//         </TouchableOpacity>
//         {/* Map the payments for this outlet */}
//       </View>
//     );
//   });
//   const showresult = (selectedBuyer, selectedOutlet) => {
//     console.log(selectedBuyer, selectedOutlet, "selectedBuyer, selectedOutlet");
//     if (selectedBuyer || selectedOutlet) {
//       const newData = masterData.filter((item) => {
//         const itemData =
//           (item.outlet_info.name
//             ? item.outlet_info.name.toUpperCase() + " - "
//             : "") +
//           (item.buyer_company_name
//             ? item.buyer_company_name.toUpperCase()
//             : "");

//         const textData1 = selectedBuyer || "";
//         const textData2 = selectedOutlet || "";
//         return (
//           itemData.indexOf(textData1.toUpperCase()) > -1 &&
//           itemData.indexOf(textData2.toUpperCase()) > -1
//         );
//       });
//       console.log(newData.length, "QWERTYUI");
//       setfilterData(newData);
//       refRBSheet.current.close();
//     } else {
//       setfilterData(masterData);
//       refRBSheet.current.close();
//     }
//   };

//   // const showresult = (selectedBuyer, selectedOutlet) => {
//   //   let newData = masterData;
//   //   if (selectedBuyer) {
//   //     newData = newData.filter(item => item.buyer_company_name === selectedBuyer);
//   //   }

//   //   if (selectedOutlet) {
//   //     newData = newData.filter(item => item.outlet_info.name === selectedOutlet);
//   //   }

//   // if(newData.length === 0){
//   //   setList([])
//   //   refRBSheet.current.close();
//   // } else {
//   //   setList(newData);
//   //   console.log(newData.length,"NEWDATALENGTH")
//   //   refRBSheet.current.close();
//   // }

//   // };

//   const renderEmpty = () => {
//     return (
//       <View
//         style={[
//           styles.flexColumn,
//           styles.alignCenter,
//           styles.justifyCenter,
//           styles.padt30,
//         ]}>
//         <Image
//           source={require("../../../assets/images/dashboard/Noorder.png")}
//           style={[styles.successIcon]}></Image>
//         <Text
//           style={[
//             styles.font22,
//             styles.textBlack,
//             styles.textCenter,
//             styles.mb11,
//             styles.fontBold,
//           ]}>
//           No records found
//         </Text>
//         <Text
//           style={[
//             styles.font15,
//             styles.textBlack,
//             styles.mb37,
//             styles.textCenter,
//           ]}></Text>
//       </View>
//     );
//   };

//   return (
//     <View style={GlobalStyles.orderContainer}>
//       <View style={GlobalStyles.paymentHeaderView}>
//         <View style={GlobalStyles.paymentHeaderPaddingView}>
//           <View style={GlobalStyles.changeFlexDirection}>
//             <View style={{ justifyContent: "center" }}>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.toggleDrawer();
//                 }}>
//                 <MenuIcon />
//               </TouchableOpacity>

//               {/* <Pressable onPress={() => {}}>
//                   <MenuIcon />
//                 </Pressable> */}
//             </View>
//             <Text style={GlobalStyles.menuText}>Payments</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("NotificationScreen")}>
//             <View style={{ alignContent: "flex-end" }}>
//               <Bell />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={GlobalStyles.searchBarPaddingView}>
//         <View style={GlobalStyles.searchBarView}>
//           <View style={GlobalStyles.searchIconView}>
//             <SearchIcon />
//             <View style={GlobalStyles.searchPlaceHolderView}>
//               <TextInput
//                 onChangeText={(text) => searchFilterFunction(text)}
//                 value={search}
//                 placeholder='Search'
//                 placeholderTextColor={COLORS.introText}
//               />
//             </View>
//           </View>
//           <View>
//             <TouchableOpacity
//               onPress={() => {
//                 refRBSheet.current.open();
//               }}>
//               <View style={GlobalStyles.searchfilterView}>
//                 <SettingIcon />
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       <View style={GlobalStyles.PaymentsPadding}>
//         {/* <PaymentCard /> */}
//         {isLoading ? (
//           <View>
//             <ActivityIndicator color={COLORS.button} size='large' />
//           </View>
//         ) : (
//           <FlatList
//             data={filterdData}
//             keyExtractor={(item) => item._id}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <PaymentCard
//                 type={item.type}
//                 invoiceUniqueName={item?.invoice_unique_name}
//                 amount={item?.amount}
//                 buyer={item?.buyer_company_name}
//                 outlet={item?.outlet_info.name}
//                 date={item?.date}
//               />
//             )}
//             ListEmptyComponent={isLoading ? null : renderEmpty}
//           />
//         )}
//       </View>

//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View >
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Hello World!</Text>
//             <Pressable
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal> */}
//       <RBSheet
//         ref={refRBSheet}
//         closeOnDragDown={true}
//         closeOnPressMask={true}
//         animationType={"none"}
//         // height={sheetHeight}
//         height={maxHeight}
//         // height={outlets ? 700 : 500}
//         customStyles={{
//           // wrapper: {
//           //   backgroundColor: "transparent",
//           // },
//           draggableIcon: {
//             backgroundColor: "#1F9CEF",
//           },
//         }}>
//         <View
//           style={{
//             justifyContent: "space-between",
//           }}>
//           <View
//             style={{
//               justifyContent: "flex-start",
//               height: maxHeight.outputRange == 500 ? 500 : 390,
//             }}>
//             <View style={GlobalStyles.filterContainer}>
//               <View style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
//                 <View>
//                   <Text style={GlobalStyles.filterHeadingText}>
//                     Sort & Filter
//                   </Text>
//                 </View>
//                 <View>
//                   <CrossMark />
//                 </View>
//               </View>
//             </View>
//             <View style={GlobalStyles.HorizantalLine} />

//             <View style={GlobalStyles.filterSubHeadingView}>
//               <Pressable
//                 onPress={() => {
//                   setBuyers(!buyers);
//                   setOutlets(false);
//                 }}>
//                 <View
//                   style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
//                   <View>
//                     <Text style={[GlobalStyles.filterSubHeadingText]}>
//                       Buyer
//                     </Text>
//                   </View>
//                   <View>{buyers ? <UpArrow /> : <DropDown />}</View>
//                 </View>
//               </Pressable>
//               {buyers ? (
//                 <View
//                   style={{
//                     // backgroundColor: "red",
//                     width: "100%",
//                     paddingRight: 10,
//                     paddingTop: 10,
//                   }}>
//                   <Text style={{ paddingRight: 10, paddingTop: 10 }}>
//                     {buyerList}
//                   </Text>
//                 </View>
//               ) : null}
//             </View>
//             <View style={GlobalStyles.HorizantalLine} />
//             <View style={GlobalStyles.filterSubHeadingView}>
//               <Pressable
//                 onPress={() => {
//                   setOutlets(!outlets);
//                   setBuyers(false);

//                   //  setSheetHeight(700);
//                 }}>
//                 <View
//                   style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
//                   <View>
//                     <Text style={[GlobalStyles.filterSubHeadingText]}>
//                       Outlet
//                     </Text>
//                   </View>
//                   <View>{outlets ? <UpArrow /> : <DropDown />}</View>
//                 </View>
//               </Pressable>
//               {outlets ? (
//                 <View
//                   style={{
//                     // backgroundColor: "red",
//                     width: "100%",
//                     paddingRight: 10,
//                     paddingTop: 10,
//                   }}>
//                   <Text style={{ paddingRight: 10, paddingTop: 10 }}>
//                     {outletList}
//                   </Text>
//                 </View>
//               ) : null}
//             </View>

//             <View
//               style={{
//                 justifyContent: "flex-end",
//                 position: "absolute",
//                 bottom: -100,
//                 width: "100%",

//                 // marginTop: animationValue == 0 ? 0 : 135,
//               }}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   backgroundColor: "#EDF5FF",
//                   paddingLeft: 20,
//                   paddingRight: 20,
//                   height: 92,
//                   alignItems: "center",
//                   // marginTop: 135,
//                 }}>
//                 <TouchableOpacity onPress={clearFilters}>
//                   <View
//                     style={{
//                       width: 161,
//                       height: 47,

//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}>
//                     <Text>Clear All</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => showresult(selectedBuyer, selectedOutlet)}>
//                   <View
//                     style={{
//                       width: 161,
//                       height: 47,
//                       backgroundColor: "#1F9CEF",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       flexDirection: "row",
//                       borderRadius: 10,
//                     }}>
//                     <View style={{ paddingRight: 5 }}>
//                       <Text
//                         style={{
//                           fontSize: 16,
//                           lineHeight: 20,
//                           fontWeight: "bold",
//                           color: "white",
//                         }}>
//                         Show Results
//                       </Text>
//                     </View>
//                     <ArrowRight />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       </RBSheet>
//     </View>
//   );
// };

// export default PaymentScreen;

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
import styles from "../../../assets/css/styles";

import { Appbar, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import PaymentCard from "./PaymentCard";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const PaymentScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);

  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [outlets, setOutlets] = useState(false);
  const [buyers, setBuyers] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [selectedOutlet, setselectedOutlet] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });
  const refRBSheet = useRef();

  useEffect(() => {
    handleSubmit();
  }, []);

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData?.filter((item) => {
        const itemData = item?.invoice_unique_name
          ? item.invoice_unique_name.toUpperCase()
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
  const clearFilters = () => {
    setfilterData(masterData);
    setSelectedBuyer(null);
    setselectedOutlet(null);
    refRBSheet.current.close();
  };

  const handleSubmit = async (data) => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    const id = await AsyncStorage.getItem("userTypeId");
    var myJson = {
      supplier_id: id,
    };
    const result = await api.getFilter(token, endPoint.get_payments, myJson);

    // const result = await api.getPayments(endPoint.get_payments, token);
    console.log(result.data?.payments, "oooooooooooooooooooooo");
    setMyList(result);
    setList(result.data?.payments);
    setfilterData(result.data?.payments);
    setmasterData(result.data?.payments);
  };
  // const buyerList = filterdData.map(item => item.buyer_company_name);

  const buyerSet = new Set(
    filterdData.map((payments) => payments?.buyer_company_name)
  );
  const buyerList = Array.from(buyerSet).map((buyer, index) => (
    <View key={index}>
      <TouchableOpacity onPress={() => setSelectedBuyer(buyer)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedBuyer === buyer && { backgroundColor: "#1F9CEF" },
          ]}>
          {buyer}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  const outletSet = new Set(
    filterdData.map((payment) => payment?.outlet_info.name)
  );
  const outletList = Array.from(outletSet).map((outletName, index) => {
    // Get an array of objects that match the outlet name
    const payments = filterdData.filter(
      (payment) => payment?.outlet_info.name === outletName
    );

    return (
      <View key={index}>
        <TouchableOpacity onPress={() => setselectedOutlet(outletName)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedOutlet === outletName && { backgroundColor: "#1F9CEF" },
            ]}>
            {outletName}
          </Text>
        </TouchableOpacity>
        {/* Map the payments for this outlet */}
      </View>
    );
  });
  const showresult = (selectedBuyer, selectedOutlet) => {
    console.log(selectedBuyer, selectedOutlet, "selectedBuyer, selectedOutlet");
    if (selectedBuyer || selectedOutlet) {
      const newData = masterData.filter((item) => {
        const itemData =
          (item.outlet_info.name
            ? item.outlet_info.name.toUpperCase() + " - "
            : "") +
          (item.buyer_company_name
            ? item.buyer_company_name.toUpperCase()
            : "");

        const textData1 = selectedBuyer || "";
        const textData2 = selectedOutlet || "";
        return (
          itemData.indexOf(textData1.toUpperCase()) > -1 &&
          itemData.indexOf(textData2.toUpperCase()) > -1
        );
      });
      console.log(newData.length, "QWERTYUI");
      setfilterData(newData);
      refRBSheet.current.close();
    } else {
      setfilterData(masterData);
      refRBSheet.current.close();
    }
  };

  // const showresult = (selectedBuyer, selectedOutlet) => {
  //   let newData = masterData;
  //   if (selectedBuyer) {
  //     newData = newData.filter(item => item.buyer_company_name === selectedBuyer);
  //   }

  //   if (selectedOutlet) {
  //     newData = newData.filter(item => item.outlet_info.name === selectedOutlet);
  //   }

  // if(newData.length === 0){
  //   setList([])
  //   refRBSheet.current.close();
  // } else {
  //   setList(newData);
  //   console.log(newData.length,"NEWDATALENGTH")
  //   refRBSheet.current.close();
  // }

  // };

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
                  navigation.toggleDrawer();
                }}>
                <MenuIcon />
              </TouchableOpacity>

              {/* <Pressable onPress={() => {}}>
                  <MenuIcon />
                </Pressable> */}
            </View>
            <Text style={GlobalStyles.menuText}>Payments</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}>
            <View style={{ alignContent: "flex-end" }}>
              <Bell />
            </View>
          </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <View style={GlobalStyles.searchfilterView}>
                <SettingIcon />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={GlobalStyles.PaymentsPadding}>
        {/* <PaymentCard /> */}
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
              <PaymentCard
                type={item.type}
                invoiceUniqueName={item?.invoice_unique_name}
                amount={item?.amount}
                buyer={item?.buyer_company_name}
                outlet={item?.outlet_info.name}
                date={item?.date}
              />
            )}
            ListEmptyComponent={renderEmpty}
          />
        )}
      </View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
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
              <View style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
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
                  setBuyers(!buyers);
                  setOutlets(false);
                }}>
                <View
                  style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                  <View>
                    <Text style={[GlobalStyles.filterSubHeadingText]}>
                      Buyer
                    </Text>
                  </View>
                  <View>{buyers ? <UpArrow /> : <DropDown />}</View>
                </View>
              </Pressable>
              {buyers ? (
                <View
                  style={{
                    // backgroundColor: "red",
                    width: "100%",
                    paddingRight: 10,
                    paddingTop: 10,
                  }}>
                  <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                    {buyerList}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={GlobalStyles.HorizantalLine} />
            <View style={GlobalStyles.filterSubHeadingView}>
              <Pressable
                onPress={() => {
                  setOutlets(!outlets);
                  setBuyers(false);

                  //  setSheetHeight(700);
                }}>
                <View
                  style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                  <View>
                    <Text style={[GlobalStyles.filterSubHeadingText]}>
                      Outlet
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
                    {outletList}
                  </Text>
                </View>
              ) : null}
            </View>

            <View
              style={{
                justifyContent: "flex-end",
                position: "absolute",
                bottom: -100,
                width: "100%",

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
                <TouchableOpacity onPress={clearFilters}>
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
                  onPress={() => showresult(selectedBuyer, selectedOutlet)}>
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
        </View>
      </RBSheet>
    </View>
  );
};

export default PaymentScreen;
