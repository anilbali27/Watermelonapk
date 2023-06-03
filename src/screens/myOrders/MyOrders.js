/** @format */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  Animated,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Searchbar } from "react-native-paper";
// import { useFocusEffect } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Animated from "react-native-reanimated";
// import BottomSheet from "reanimated-bottom-sheet";

import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import AllOrdersCard from "./AllOrdersCard";
import PendingAcceptanceCard from "./PendingAcceptanceCard";
import Bell from "../../../assets/images/icons/Bell";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import SettingIcon from "../../../assets/images/icons/Setting";
import SearchIcon from "../../../assets/images/icons/Search";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
import { FA5Style } from "react-native-vector-icons/FontAwesome5";
import styles from "../../../assets/css/styles";

const MyorderScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const isFocused = useIsFocused();

  const height = React.useRef(null);

  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [textselectedItem, settextselectedItem] = useState("");

  const [buyersData, setBuyersData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [outletsData, setOutletsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [tempOrderData, setTemporderData] = useState([]);

  const [filters, setFilters] = useState({
    buyers: [],
    status: [],
    outlets: [],
  });

  const [withoutPendingData, setWithoutPendingData] = useState([]);
  const [tempwithoutPendingData, settempWithoutPendingData] = useState([]);

  const [withoutPending, setWithoutPending] = useState([]);

  const [allOrders, setAllOrders] = useState(true);
  const [pendingAcceptance, setPendingAcceptance] = useState(false);
  const [list, setList] = useState([]);

  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  console.log(masterData, "masterDatamasterData");
  const [search, setSearch] = useState("");
  const [myList, setMyList] = useState();
  const [suppliers, setSuppliers] = useState(false);
  const [outlets, setOutlets] = useState(false);
  const [status, setStatus] = useState(false);
  // const [page, setPage] = useState(0);
  const [statuss, setStatuss] = useState();

  // console.log(statuss, "222222222222222222222222222222999");

  const emailStatus = list?.status;

  const [sheetHeight, setSheetHeight] = useState(500);

  const bottomSheetModalRef = useRef(null);

  // const snapPoints = useMemo(() => ["25%", "50%"], []);
  const snapPoints = ["48%", "80%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current.open();
  };

  const [isVisible, setIsVisible] = useState(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [norecordsErrorMessage, SetNoRecordsMessage] = useState(false);

  useEffect(() => {
    if (outlets == true || suppliers == true) {
      setSheetHeight(700);
    } else {
      setSheetHeight(500);
    }
  }, [outlets, suppliers]);
  const clearFilters = () => {
    setWithoutPendingData(tempwithoutPendingData);

    setSelectedItem(null);
    setSelectedStatus(null);
    setSelectedOutlet(null);

    refRBSheet.current.close();
  };

  //call back
  const handleSheetChange = useCallback((index) => {
    console.log(index);
  }, []);

  /*filter supplier names*/
  const names = [
    "HK Enteprisers(Dry)",
    "Royal Techno Foodstuff LLC",
    "Bryght Supplies",
    "Premium First Choice Foods",
  ];
  // const showresult = (
  //   selectedItem, selectedStatus, selectedOutlet
  // ) => {
  //   let newData = withoutPendingData;
  //   if (selectedItem) {
  //     newData = newData.filter(
  //       (item) => item.supplier_info.supplier_name === selectedItem
  //     );
  //   }

  //   if (selectedOutlet) {
  //     newData = newData.filter(
  //       (item) => item.outlet_info.name === selectedOutlet
  //     );
  //   }

  //   if (selectedStatus) {
  //     newData = newData.filter(
  //       (item) => item.paid_status_name === selectedStatus
  //     );
  //   }

  //   refRBSheet.current.close();
  //   alert(newData.length)
  //   if (newData.length == 0) {
  //     setWithoutPending(newData);
  //   } else {
  //     setWithoutPending(newData);
  //   }
  // };

  const showresult = (selectedItem, selectedOutlet, selectedStatus) => {
    if (selectedItem || selectedOutlet || selectedStatus) {
      const newData = withoutPendingData.filter((item) => {
        const itemData =
          (item.supplier_info?.supplier_name
            ? item.supplier_info?.supplier_name.toUpperCase() + " - "
            : "") +
          (item.outlet_info?.name ? item.outlet_info?.name.toUpperCase() : "") +
          (item.status_name ? " - " + item.status_name.toUpperCase() : "");

        const textData1 = selectedItem || "";
        const textData2 = selectedOutlet || "";
        const textData3 = selectedStatus || "";

        return (
          itemData.indexOf(textData1.toUpperCase()) > -1 &&
          itemData.indexOf(textData2.toUpperCase()) > -1 &&
          itemData.indexOf(textData3.toUpperCase()) > -1
        );
      });

      setWithoutPendingData(newData);
      refRBSheet.current.close();
    } else {
      refRBSheet.current.close();
      setWithoutPendingData(tempwithoutPendingData);
    }
  };

  const handlePress = (name) => {
    console.log(name, "anil");
  };

  useEffect(() => {
    console.log(suppliers, outlets, status, "0000000000000000000000");
    if (suppliers === true || outlets === true || status === true) {
      animationValue.setValue(1);
    } else {
      animationValue.setValue(0);
    }
  }, [suppliers, outlets, status]);

  useEffect(() => {
    // console.log(suppliers, outlets, status, "0000000000000000000000");
    if (suppliers === true || outlets === true || status === true) {
      animationValue.setValue(1);
    } else {
      animationValue.setValue(0);
    }
  }, [suppliers, outlets, status]);

  const nameList = withoutPendingData
    .filter(
      (order, index, self) =>
        self.findIndex(
          (o) =>
            o.supplier_info.supplier_name === order.supplier_info.supplier_name
        ) === index
    )
    .map((order, index) => (
      <View key={index}>
        <TouchableOpacity
          onPress={() => setSelectedItem(order.supplier_info.supplier_name)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedItem === order.supplier_info.supplier_name && {
                backgroundColor: "#1F9CEF",
              },
            ]}>
            {order.supplier_info.supplier_name}
          </Text>
        </TouchableOpacity>
      </View>
    ));

  const statusList = withoutPendingData
    .filter(
      (order, index, self) =>
        self.findIndex((o) => o.status_name === order.status_name) === index
    )
    .map((order, index) => (
      <View key={index}>
        <TouchableOpacity onPress={() => setSelectedItem(order.status_name)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedItem === order.status_name && {
                backgroundColor: "#1F9CEF",
              },
            ]}>
            {order.status_name}
          </Text>
        </TouchableOpacity>
      </View>
    ));

  const outletList = withoutPendingData
    .filter(
      (order, index, self) =>
        self.findIndex((o) => o.outlet_info.name === order.outlet_info.name) ===
        index
    )
    .map((order, index) => (
      <View key={index}>
        <TouchableOpacity
          onPress={() => setSelectedOutlet(order.outlet_info.name)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedOutlet === order.outlet_info.name && {
                backgroundColor: "#1F9CEF",
              },
            ]}>
            {order.outlet_info.name}
          </Text>
        </TouchableOpacity>
      </View>
    ));

  /*pignation*/
  // const [data, setData] = useState([]);

  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );

  useEffect(() => {
    handleSubmit();
    getFiltersBy();
  }, [isFocused]);
  const getFiltersBy = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    console.log(token, "1123");
    var myJson = {
      // user_type_id: "60784da77b60b7605a47a41c",
      user_type_id: id,
    };
    const result1 = await api.getFilter(token, endPoint.filterby_order, myJson);

    if (result1) {
      setOrderData(result1.data);
      setBuyersData(result1.data.buyers);
      setOutletsData(result1.data.outlets);
      setStatusData(result1.data.status_dropdown);
    } else {
      setBuyersData([]);
      setStatusData([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      //Below alert will fire every time when profile screen is focused
      setAllOrders(true);
      setPendingAcceptance(false);

      // alert("Hi from profile");
    }, [])
  );

  // useFocusEffect(() => {
  //   window.location.reload();
  // });

  const handleSubmit = async () => {
    console.log("on select pressabl");
    setIsLoading(true);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    let supplierId = await AsyncStorage.getItem("userTypeId");

    // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY4MTM3MTIyMSwiZXhwIjoxNzEyOTA3MjIxLCJuYmYiOjE2ODEzNzEyMjEsImp0aSI6Im9aeWpua2FFN0hTU1lwS1oiLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.Xb3JDRswdPXgJORSa-CLZgV9vIOo4huAw4quQ0Ch55Y";
    var myJson = {
      supplier_id: supplierId,
      page: "148",
      platform: "mobile",
    };
    const result = await api.getorderslist(token, endPoint.Order_List, myJson);
    setMyList(result);
    setTemporderData(result.data?.orders);
    setList(result.data?.orders);
    setfilterData(result.data?.orders);
    const pending = result.data.orders.filter(
      (item) => item.status_name !== "Pending for acceptance"
    );
    setWithoutPendingData(pending);
    settempWithoutPendingData(pending);
    setWithoutPending(pending);
    setStatuss(result.data?.orders?.status);
    // setfilterData(...filterdData, ...appendOrderlist)
    // setPage(page + 1);
    setIsLoading(false);
    console.log(
      result.data?.orders[0]?.invoice_status?.invoice_number,
      "987456"
    );
  };

  const title = list?.supplier_info?.supplier_name;

  const onPressofOrders = () => {
    setPendingAcceptance(false);
    setAllOrders(true);
  };

  const onPressofAcceptance = () => {
    setAllOrders(false);
    setPendingAcceptance(true);
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
        {/* <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity style={[styles.continueBtn, styles.width50, styles.flexRow, styles.justifyCenter]} onPress={() => navigation.goBack()}>
                <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Order now</Text>
              </TouchableOpacity>
            </View> */}
      </View>
    );
  };
  //search function
  const searchFilterFunction1 = (text) => {
    if (text) {
      const newData = list.filter((item) => {
        const supplierName = item.supplier_info?.supplier?.name || "";
        const outletName = item.outlet_info?.name || "";
        const statusname = item.status_name || "";
        const paid_status = item.paid_status || "";
        const Price = item.total_payable_amount;
        const itemData =
          supplierName.toUpperCase() +
          outletName.toUpperCase() +
          statusname.toUpperCase() +
          Price +
          paid_status +
          item.outletName;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
      console.log(newData, "newData");
    } else {
      setfilterData(list);
      setSearch(text);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = withoutPending.filter((item) => {
        const supplierName = item.supplier_info?.supplier?.name || "";
        const outletName = item.outlet_info?.name || "";
        const statusname = item.status_name || "";
        const paid_status = item.paid_status || "";
        const Price = item.total_payable_amount;
        const itemData =
          supplierName.toUpperCase() +
          outletName.toUpperCase() +
          statusname.toUpperCase() +
          Price +
          paid_status +
          item.outletName;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setWithoutPendingData(newData);
      setSearch(text);
      console.log(newData, "newData");
    } else {
      setWithoutPendingData(withoutPending);
      setSearch(text);
    }
  };
  /*filter*/

  // const onTextLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setSheetHeight(height);
  // };

  //TO Give padding between the flatlist
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };

  return (
    <>
      <BottomSheetModalProvider>
        <View style={GlobalStyles.orderContainer}>
          <View style={GlobalStyles.headerContainer}>
            <View style={GlobalStyles.headerAligment}>
              <View style={[GlobalStyles.headerDirection]}>
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
                  <Text style={GlobalStyles.menuText}>My Orders</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("NotificationScreen")}>
                  <View style={{ alignContent: "flex-end" }}>
                    <Bell />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={GlobalStyles.orderTabDirection}>
              <Pressable onPress={() => onPressofOrders()}>
                {allOrders ? (
                  <View style={GlobalStyles.allOrderView}>
                    <Text style={GlobalStyles.allOrderOnpressText}>
                      ALL ORDERS
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={GlobalStyles.allOrderText}>ALL ORDERS</Text>
                  </View>
                )}
              </Pressable>

              <View style={GlobalStyles.prendingAccecptance}>
                <Pressable onPress={() => onPressofAcceptance()}>
                  {pendingAcceptance ? (
                    <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                      <Text style={GlobalStyles.pendingOnPressText}>
                        PENDING ACCEPTANCE
                      </Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.pendingAcceptanceView}>
                      <Text style={GlobalStyles.pendingText}>
                        PENDING ACCEPTANCE
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>
            </View>
          </View>

          {allOrders ? (
            <View
              style={{
                width: "100%",
              }}>
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
                    <Pressable
                      onPress={() => {
                        refRBSheet.current.open();
                      }}>
                      <View style={GlobalStyles.searchfilterView}>
                        <SettingIcon />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 18,
                  paddingRight: 19,
                  paddingTop: 19,
                  width: "100%",
                  // backgroundColor: "red",
                  marginBottom: 260,
                }}>
                {isLoading ? (
                  <View>{isLoading ? <Loader /> : null}</View>
                ) : (
                  <FlatList
                    data={withoutPendingData}
                    keyExtractor={(item) => item._id}
                    ItemSeparatorComponent={ItemSepartorView}
                    showsVerticalScrollIndicator={false}
                    // onEndReached={handleSubmit}
                    // onEndReachedThreshold={0.1}
                    // ListFooterComponent={() => {
                    //   return isLoading ? <Loader /> : null;
                    // }}
                    renderItem={({ item }) => (
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() =>
                          navigation.navigate("DetailedOrderPage", {
                            id: item?._id,
                            status: item?.status,
                            orderNumber: item?.unique_name,
                            titleOne: item?.supplier_info?.supplier_name,
                            outlet: item?.outlet_info?.name,
                            emailStatus: item?.status_name,
                            deliveryaddress: item?.delivery_address,
                            billingAddress: item.billing_address,
                            payments: item?.payments,
                            deliveryData: item.delivery_requested.delivery_date,
                            totalPayableAmount: item.total_payable_amount,
                            orderDateTime: item.Order_date_time,
                            estimatedSubtotal: item.total_cost_amount,
                            estimatedDeliveryFee: item.delivery_fee,
                            vatAmount: item.vat_amount,
                            moneyStatus: item?.paid_status,
                            items: item?.products_info.length,
                            productInfo: item?.products_info,
                            invoice: item?.invoice_status,
                            image: item?.products_info?.product_image,
                            pdf: item?.pdf,
                          })
                        }>
                        <AllOrdersCard
                          title={item?.supplier_info?.supplier_name}
                          // title={title}
                          outlet={item?.outlet_info?.name}
                          amount={item?.total_payable_amount}
                          timing={item?.Order_date_time}
                          status={item?.paid_status_name}
                          moneyStatus={item?.paid_status}
                          emailStatus={item?.status_name}
                          image={item?.supplier_info?.supplier_profile}
                          rating={item?.products_info[0]?.r_qty}
                          id={item?._id}
                          products_info={item?.products_info}
                          // product_id={item?.products_info[0]?.id}
                          // product_range_id={item?.products_info[0]?.price_range_id}
                          navigation={navigation}
                          updateData={() => handleSubmit()}
                        />
                      </Pressable>
                    )}
                    ListEmptyComponent={renderEmpty}
                    // onRefresh={handleRefresh}
                    // refreshing={isRefreshing}
                  />
                )}
              </View>
            </View>
          ) : null}

          {pendingAcceptance ? (
            <View
              style={{
                width: "100%",
              }}>
              <View style={GlobalStyles.searchBarPaddingView}>
                <View style={GlobalStyles.searchBarView}>
                  <View style={GlobalStyles.searchIconView}>
                    <SearchIcon />
                    <View style={GlobalStyles.searchPlaceHolderView}>
                      <TextInput
                        onChangeText={(text) => searchFilterFunction1(text)}
                        placeholder='Search'
                        placeholderTextColor={COLORS.introText}
                      />
                    </View>
                  </View>
                  <View>
                    <Pressable
                      onPress={() => {
                        console.log("pressed");
                      }}>
                      <View style={GlobalStyles.searchfilterView}>
                        <SettingIcon />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={GlobalStyles.PendingAcceptanceCardPadding}>
                <FlatList
                  data={filterdData}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsVerticalScrollIndicator={false}
                  // onEndReached={handleSubmit}
                  // onEndReachedThreshold={20}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() =>
                        navigation.navigate("DetailedOrderPage", {
                          id: item?._id,
                          status: item?.status,
                          orderNumber: item?.unique_name,
                          titleOne: item?.supplier_info?.supplier_name,
                          outlet: item?.outlet_info.name,
                          emailStatus: item?.status_name,
                          deliveryaddress: item?.delivery_address,
                          billingAddress: item.billing_address,
                          payments: item?.payments,
                          deliveryData: item.delivery_requested.delivery_date,
                          totalPayableAmount: item.total_payable_amount,
                          orderDateTime: item.Order_date_time,
                          estimatedSubtotal: item.cost_price_per_unit,
                          estimatedDeliveryFee: item.delivery_fee,
                          vatAmount: item.vat_amount,
                          moneyStatus: item?.paid_status,
                          items: item?.products_info.length,
                          productInfo: item?.products_info,
                          invoice: item?.invoice_status.invoice_link,
                          image: item?.products_info?.product_image,
                          warehouseid: item?.warehouse_id,
                        })
                      }>
                      {item?.status_name === "Pending for acceptance" ? (
                        <PendingAcceptanceCard
                          title={item?.supplier_info?.supplier_name}
                          outlet={item?.outlet_info.name}
                          amount={item?.total_payable_amount}
                          timing={item?.Order_date_time}
                          emailStatus={item?.status_name}
                          image={item?.supplier_info?.supplier_profile}
                          rating={item?.products_info[0]?.r_qty}
                          status={item?.status}
                        />
                      ) : null}
                    </Pressable>
                  )}
                  ListEmptyComponent={renderEmpty}
                />
              </View>
            </View>
          ) : null}

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
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
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
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
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
                      style={[
                        GlobalStyles.justifyBetween,
                        GlobalStyles.flexRow,
                      ]}>
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
      </BottomSheetModalProvider>

      <View>
        {norecordsErrorMessage ? (
          <View>
            <Text>Supplier not found.</Text>
          </View>
        ) : null}
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
            // backgroundColor: "transparent",
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

                    // setSheetHeight(700);
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
                      {outletList}
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
                  onPress={() =>
                    showresult(selectedItem, selectedStatus, selectedOutlet)
                  }>
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
        <RBSheet
          ref={refRBSheet1}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          height={450}
          customStyles={{
            draggableIcon: {
              backgroundColor: "#BEBEBE",
            },
            container: {
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingTop: 9,
              paddingHorizontal: 30,
            },
          }}>
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
              No order yet!
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              Looks like you haven't made your order yet
            </Text>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.width50,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={() => navigation.goBack()}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Order now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default MyorderScreen;
