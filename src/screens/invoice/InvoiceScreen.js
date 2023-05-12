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
  ActivityIndicator,
} from "react-native";

import { Appbar, Searchbar } from "react-native-paper";
import GlobalStyles from "../../../assets/css/styles";
import Icon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../../screens/Services/API/CallingApi";
import { FlatList } from "react-native-gesture-handler";
import styles from "../../../assets/css/styles";
import { useFocusEffect } from "@react-navigation/native";
import DetailedInvoicePage from "./DetailedAllinvoice";
import RBSheet from "react-native-raw-bottom-sheet";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
import SearchIcon from "../../../assets/images/icons/Search";
import FilterIcon from "../../../assets/images/dashboard/filter_icon";
import SettingIcon from "../../../assets/images/icons/Setting";
import { COLORS } from "../../constant/Colors";
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
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedOutlet, setselectedOutlet] = useState("");
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

  const renderEmpty = () => {
    return (
      <View
        style={[
          styles.flexColumn,
          styles.alignCenter,
          styles.justifyCenter,
          styles.padt30,
          { alignItems: "center" },
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

  const statussList = ["active", "inactive", "all"];
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
      console.log(filteredData, "filteredData");
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

  const getInvoiceList = async (id) => {
    const accesstoken = await AsyncStorage.getItem("UserToken");
    const supplierId = await AsyncStorage.getItem("id");
    var myJson = {
      supplier_id: supplierId,
    };

    const result = await api.getInvoice(
      accesstoken,
      endPoint.invoice_list,
      myJson
    );

    if (result.success) {
      console.log(result.data?.invoices, "myJsontyuyuiuiuiui");

      setinvoiceList(result.data?.invoices);
      settempinvoicedata(result.data?.invoices);
      setinvoicedata(result.data?.invoices);
      setfilterData(result.data?.invoices);
    } else {
      setinvoicedata([]);
    }
  };
  const buyerSet = new Set(
    filterdData && filterdData?.map((invoices) => invoices.buyer_company_name)
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
    filterdData && filterdData?.map((invoices) => invoices.outlet_info.name)
  );
  const ouletList = Array.from(outletSet).map((outlet, index) => (
    <View key={index}>
      <TouchableOpacity onPress={() => setselectedOutlet(outlet)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedOutlet === outlet && { backgroundColor: "#1F9CEF" },
          ]}>
          {outlet}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  const statusSet = new Set(
    filterdData && filterdData?.map((invoices) => invoices.status_name)
  );
  const statusList = Array.from(statusSet).map((status, index) => (
    <View key={index}>
      <TouchableOpacity onPress={() => setSelectedStatus(status)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedStatus === status && { backgroundColor: "#1F9CEF" },
          ]}>
          {status}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  //search function
  const showresult = (selectedBuyer, selectedOutlet, selectedStatus) => {
    console.log(selectedBuyer, selectedOutlet, selectedStatus);
    if (selectedBuyer || selectedOutlet || selectedStatus) {
      const newData = tempinvoicedata.filter((item) => {
        const itemData =
          (item.outlet_info.name
            ? item.outlet_info.name.toUpperCase() + " - "
            : "") +
          (item.buyer_company_name
            ? item.buyer_company_name.toUpperCase()
            : "") +
          (item.status_name ? " - " + item.status_name.toUpperCase() : "");

        const textData1 = selectedBuyer || "";
        const textData2 = selectedOutlet || "";
        const textData3 = selectedStatus || "";

        return (
          itemData.indexOf(textData1.toUpperCase()) > -1 &&
          itemData.indexOf(textData2.toUpperCase()) > -1 &&
          itemData.indexOf(textData3.toUpperCase()) > -1
        );
      });
      setinvoiceList(newData);
      refRBSheet.current.close();
    } else {
      refRBSheet.current.close();
      setinvoiceList(tempinvoicedata);
    }
  };

  const clearFilters = () => {
    setinvoiceList(tempinvoicedata);
    setSelectedBuyer(null);
    setselectedOutlet(null);
    setSelectedStatus(null);
    refRBSheet.current.close();
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
      <View style={GlobalStyles.defaultScreenContainerInvoice}>
        {/* <View style={GlobalStyles.invoiceSearchContainer}>
 <AntDesign
 name='search1'
 placeholder='Search'
 size={16}
 color='#0F141A'
 style={GlobalStyles.invoiceSearch}
 />
 <TextInput style={GlobalStyles.searchText}></TextInput>
 <Ionicons
 name='options-outline'
 size={20}
 style={GlobalStyles.invoiceFilter}
 color='#0F141A'
 />
 </View> */}
        <View style={GlobalStyles.searchBarPaddingViewInvoice}>
          <View style={GlobalStyles.searchBarView}>
            <View style={GlobalStyles.searchIconView}>
              <SearchIcon />
              <View style={GlobalStyles.searchPlaceHolderView}>
                <TextInput
                  onChangeText={(text) => searchFilterFunction(text)}
                  value={search}
                  placeholder='Search'
                  placeholderTextColor={"#0F141A"}
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

        <View style={{ paddingBottom: 140 }}>
          {!invoiceList ? (
            <View>
              <ActivityIndicator color={COLORS.button} size='large' />
            </View>
          ) : (
            <FlatList
              data={invoiceList}
              showsVerticalScrollIndicator={false}
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
                              {/* <SvgUri
 source={require("../../../assets/images/dashboard/calender_icon.svg")}
 /> */}
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
                              {/* <SvgUri
 source={require("../../../assets/images/dashboard/clock_icon.svg")}
 /> */}
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
              ListEmptyComponent={
                <View style={{ flex: 1 }}>
                  <ActivityIndicator color={COLORS.button} size='large' />
                </View>
              }
            />
          )}
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
            console.log("Modal has been closed.");
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
                      {ouletList}
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
                    showresult(selectedBuyer, selectedOutlet, selectedStatus)
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
      </View>
    </SafeAreaView>
  );
};

export default InvoiceScreen;
