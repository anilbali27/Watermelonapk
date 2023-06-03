/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
  Linking,
} from "react-native";
import moment from "moment";
// import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RBSheet from "react-native-raw-bottom-sheet";
import { useForm, Controller } from "react-hook-form";
import MyorderScreen from "./MyOrders";
import GlobalStyles from "../../../assets/css/styles";
import CrossMark from "../../../assets/images/icons/CrossMark";
import AllOrdersCard from "./AllOrdersCard";
import RequiredIcon from "../../../assets/images/icons/Required";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailCard from "./OrderDetailCard";
import { G } from "react-native-svg";
import { log } from "react-native-reanimated";
import styles from "../../../assets/css/styles";
import ModalSelector from "react-native-modal-selector";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
const DetailedOrderPage = ({ route, navigation }) => {
  const {
    id,
    status,
    orderNumber,
    titleOne,
    outlet,
    emailStatus,
    deliveryaddress,
    billingAddress,
    payments,
    deliveryData,
    totalPayableAmount,
    orderDateTime,
    estimatedSubtotal,
    estimatedDeliveryFee,
    vatAmount,
    moneyStatus,
    items,
    productInfo,
    invoice,
    image,
    warehouseid,
    pdf,
  } = route.params;
  const [data1, setData11] = useState(route.params);
  console.log(invoice, "963");
  const {
    control,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = useForm();
  const [orders, setorders] = useState([]);
  const [Data1, setData1] = useState([]);
  const [warehouse, setWarehouse] = useState("Select");
  const [notes, setNotes] = React.useState(" ");
  const [acceptError, setAcceptError] = React.useState(" ");
  const [declineError, setDeclineError] = React.useState(" ");

  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseKey, setWarehouseKey] = useState("Select");
  const date = moment(orderDateTime).format("DD MMMM YYYY");
  const [updatedProductInfo, setUpdatedProductInfo] = useState(productInfo);
  // Accepet
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();

  // notes
  const [text, onChangeNotes] = React.useState("");

  const getWarehouse = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      start: 0,
      end: 10,
      page: 1,
      sort_method: "",
      keyword: "",
      sort_by: "",
      supplier_id: id,
      status: null,
    };
    const result = await api.getWarehouse(
      token,
      endPoint.get_Warehouse,
      myJson
    );

    if (result) {
      setWarehouseData(result.data);
    } else {
      setWarehouseData([]);
    }
  };
  // select warehouse
  const data = [{ key: 1, label: "W1" }];

  const ItemSepartorView = () => {
    return <View style={{ height: 10, width: "100%" }} />;
  };

  const warehouseDataArray = warehouseData.map((warehouse, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: warehouse.warehouse_name,
      value: warehouse._id,
    };
    return newData;
  });

  // const openResume = (invoice) => {
  //   if (invoice) {
  //     const file_url = invoice;
  //     Linking.canOpenURL(file_url).then(async (supported) => {
  //       if (supported) {
  //         Linking.openURL(file_url);
  //       } else {
  //         await WebBrowser.openBrowserAsync(file_url);
  //       }
  //     });
  //   }
  // };

  const openResume = (invoice) => {
    // alert(pdf);

    if (invoice) {
      alert();
      console.log(pdf, "999");
      const file_url = pdf;
      Linking.canOpenURL(file_url).then(async (supported) => {
        if (supported) {
          Linking.openURL(file_url);
        } else {
          await WebBrowser.openBrowserAsync(file_url);
        }
      });
    }
  };

  // const requestStoragePermission = async () => {
  //   console.log("7777777777777777788888888888899999999999");
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "Watermelon supplier App storage permission",
  //         message:
  //           "Downloader App needs access to your storage " +
  //           "so you can download files.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       downloadFile();
  //     } else {
  //       console.log("storage permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const downloadFile = () => {
  //   const { config, fs } = RNFetchBlob;
  //   const date = new Date();
  //   const fileDir = fs.dirs.DownloadDir;
  //   config({
  //     // add this option that makes response data to be stored as a file,
  //     // this is much more performant.
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         fileDir +
  //         "/download" +
  //         Math.floor(date.getDate() + date.getSeconds() / 2),
  //       description: "file download",
  //     },
  //   })
  //     .fetch("GET", { invoice })
  //     .then((res) => {
  //       // the temp file path
  //       console.log("The file saved to ", res.path());
  //       alert("file downloaded completly");
  //     });
  // };
  useEffect(() => {
    getOrdersSupplierlist();
    getWarehouse();
    Incrementqty();
  }, [500]);

  const onAccept = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token = jsonValue;
    var myJson = {
      order_id: id,
      status: 30,
      notes: text,
      warehouse_id: warehouseKey,
    };
    console.log(myJson, "ACCEPT DATA");
    const result = await api.changeStatus(
      token,
      endPoint.status_change,
      myJson
    );
    console.log(result, "DECLINE RESULT");
    if (result.success === "1") {
      setData1(result.data);
      refRBSheet2.current.open();
    } else {
      setAcceptError(result.message);
      refRBSheet3.current.open();
      setData1([]);
    }
  };
  const onDecline = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token = jsonValue;
    var myJson = {
      order_id: id,
      status: 40,
      notes: notes,
    };
    const result = await api.changeStatus(
      token,
      endPoint.status_change,
      myJson
    );
    console.log(result, "ACCept RESULT");

    if (result.success === "1") {
      setData1(result.data);

      refRBSheet2.current.open();
    } else {
      setDeclineError(result.message);
      setData1([]);
      refRBSheet3.current.open();
    }
  };
  const Incrementqty = (qty, id) => {
    // Update the array
    const newProductInfo = updatedProductInfo.map((item) => {
      if (item.id === id) {
        return { ...item, qty: qty };
      }
      return item;
    });

    // Update state with the updated array
    setUpdatedProductInfo(newProductInfo);
  };

  //orders/supplier-list
  const getOrdersSupplierlist = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token = jsonValue;

    const result = await api.getorders(token, endPoint.get_orders);

    if (result) {
      setorders(result);
    } else {
      setorders([]);
    }
  };

  // Add the other price from cost_price_per_unit
  const totalPrice = updatedProductInfo.reduce(
    (total, item) => total + item.cost_price_per_unit * item.qty,
    0
  );
  // const totalPrice = updatedProductInfo[updatedProductInfo.length - 1].qty * updatedProductInfo[updatedProductInfo.length - 1].price_per_unit;
  // console.log(totalPrice,'totalPrice')
  const taxRate = 5; // percentage tax rate
  const taxAmount = (totalPrice * taxRate) / 100;
  const totalPriceWithTax = totalPrice + taxAmount;

  return (
    <ScrollView>
      <SafeAreaView style={GlobalStyles.orderContainer}>
        {/* <StatusBar animated={true} backgroundColor='#1F9CEF' /> */}
        <View style={GlobalStyles.headerDetailOrderView}>
          <Pressable
            onPress={() => {
              navigation.navigate("Orders");
            }}>
            <CrossMark />
          </Pressable>

          {moneyStatus == 10 ? (
            <View
              style={[
                GlobalStyles.orderDetailPaidStatus,
                GlobalStyles.orderDetailPaidStatusColor,
              ]}>
              <Text style={GlobalStyles.paidTextOrderDetail}>UnPaid</Text>
            </View>
          ) : (
            <View style={GlobalStyles.orderDetailPaidStatus}>
              <Text style={GlobalStyles.paidTextOrderDetail}>Paid</Text>
            </View>
          )}
          <Text style={GlobalStyles.orderNumberText}>
            Order No : {orderNumber}
          </Text>
          <Text style={GlobalStyles.orderTitle}>
            {/* Unibic Dubai International */}
            {titleOne}
          </Text>
          <Text style={GlobalStyles.orderOutlet}>Outlet : {outlet}</Text>
        </View>

        <View style={GlobalStyles.positionalAbsoluteCardPadding}>
          <View
            style={[
              GlobalStyles.positionalAbsoluteCard,
              GlobalStyles.orderDetailCardOneHeight,
            ]}>
            <View style={GlobalStyles.positionalAbsoluteCardView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={{ marginTop: 22 }}>
                  <Text style={GlobalStyles.orderDetailPositionText}>
                    Items
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.paddingFour,
                    ]}>
                    {items}
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.marginTopFive,
                    ]}>
                    Email Status
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.paddingFour,
                    ]}>
                    {emailStatus}
                  </Text>
                </View>
                <View style={GlobalStyles.orderDetailamountCard}>
                  <Text style={GlobalStyles.orderDetailPositionText}>
                    Amount
                  </Text>
                  <Text style={GlobalStyles.orderAmountText}>
                    AED {totalPriceWithTax}
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.colorBlue,
                    ]}>
                    Ordered On {date}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* <FlatList
            data={productInfo}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSepartorView}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <OrderDetailCard
                title={item?.product_name}
                costPriceperUnit={item?.cost_price_per_unit}
                displayskuName={item?.display_sku_name}
                image={item?.product_image}
                incrementqty={(text) => Incrementqty(text,item.id)}
              />
            )}
          /> */}
          {moneyStatus === 10 ? (
            <FlatList
              data={productInfo}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSepartorView}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <OrderDetailCard
                  title={item?.product_name}
                  costPriceperUnit={item?.cost_price_per_unit}
                  displayskuName={item?.display_sku_name}
                  image={item?.product_image}
                  status={data1?.moneyStatus}
                  quantity={item?.qty}
                  incrementqty={(text) => Incrementqty(text, item.id)}
                />
              )}
            />
          ) : (
            <FlatList
              data={productInfo}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSepartorView}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <OrderDetailCard
                  title={item?.product_name}
                  costPriceperUnit={item?.cost_price_per_unit}
                  displayskuName={item?.display_sku_name}
                  status={data1?.moneyStatus}
                  image={item?.product_image}
                />
              )}
            />
          )}

          {/* <OrderDetailCard /> */}

          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}>
            <View style={GlobalStyles.cardThreeView}>
              <Text style={GlobalStyles.orderDetailCardHeading}>
                Billing Address
              </Text>
              <Text
                style={[
                  GlobalStyles.orderDetailCardText,
                  GlobalStyles.marginTopSeven,
                ]}>
                {billingAddress}
              </Text>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}>
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardHeading}>
                    Delivery Address
                  </Text>
                </View>

                {/* <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => { }}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View> */}
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>
                  {deliveryaddress}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}>
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardHeading}>
                    Order Notes
                  </Text>
                </View>

                {/* <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => { }}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View> */}
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>{}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}>
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={GlobalStyles.orderDetailCardHeading}>
                        Delivery Date
                      </Text>
                    </View>
                    <View style={GlobalStyles.requiredIconPadding}>
                      <Ionicons
                        name='information-circle-outline'
                        size={14}
                        color='red'
                      />
                    </View>
                  </View>
                </View>

                {/* <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => { }}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View> */}
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>
                  {deliveryData}
                </Text>
              </View>
            </View>
          </View>
          {/* {updatedProductInfo.map((item) => ( */}
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}>
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        Estimated Subtotal
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {totalPrice}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        Estimated Delivery Fee
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {estimatedDeliveryFee}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        VAT(5%)
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {taxAmount}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.marginTopSeven,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.orderDetailCardHeading,
                          GlobalStyles.colorRed,
                        ]}>
                        Estimated total
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.colorRed,
                    ]}>
                    AED {totalPriceWithTax}
                  </Text>
                </View>
              </View>
            </View>
            <View style={GlobalStyles.orderDetailFlexView} />
            <View style={[GlobalStyles.cardThreeView]}>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.marginTopSeven,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.orderDetailCardHeading,
                          GlobalStyles.colorRed,
                        ]}>
                        Payment Status
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  {moneyStatus == 10 ? (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.colorRed,
                      ]}>
                      UnPaid
                    </Text>
                  ) : (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.colorRed,
                      ]}>
                      Paid
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          {/* ))} */}

          <Pressable onPress={(invoice) => openResume(invoice)}>
            <View
              style={[
                GlobalStyles.marginTopSix,
                GlobalStyles.onPressMarkReceived,
              ]}>
              <Text style={GlobalStyles.onPressedOrderText}>
                Download Invoice
              </Text>
            </View>
          </Pressable>

          {/* {emailStatus === "Pending for acceptance" ? (
            <View>
              <View
                style={[
                  GlobalStyles.marginTopSix,
                  GlobalStyles.onPressMarkReceived,GlobalStyles.width50
                ]}
              >
                <Pressable onPress={() => {}}>
                  <Text style={[GlobalStyles.onPressedOrderText]}>
                  Decline 
                  </Text>
                </Pressable>
              </View>
              <Pressable onPress={() => {}}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressMarkReceived,,GlobalStyles.width50
                  ]}
                >
                  <Text style={GlobalStyles.onPressedOrderText}>
                   Accept
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : null} */}
          {emailStatus === "Pending for acceptance" ? (
            // <View style={GlobalStyles.row}>
            //   <TouchableOpacity  onPress={() => {
            //     refRBSheet1.current.open();
            //   }}>
            //     <View style={[GlobalStyles.marginTopSix, GlobalStyles.onPressMarkReceived, GlobalStyles.width50]}>
            //       <Text style={GlobalStyles.onPressedOrderText}>Decline</Text>
            //     </View>
            //   </TouchableOpacity>
            //   <TouchableOpacity   onPress={() => {
            //     refRBSheet.current.open();
            //   }}>
            //     <View style={[GlobalStyles.marginTopSix, GlobalStyles.onPressMarkReceived, GlobalStyles.width50]}>
            //       <Text style={GlobalStyles.onPressedOrderText}>Accept</Text>
            //     </View>
            //   </TouchableOpacity>
            // </View>
            <View
              style={[styles.flexRow, styles.justifyCenter, styles.space_btn]}>
              <View style={[styles.width50, styles.PadR9]}>
                <TouchableOpacity
                  style={[
                    styles.continueBtn,
                    styles.flexRow,
                    styles.justifyCenter,
                    styles.cancelStyle,
                  ]}
                  onPress={() => {
                    refRBSheet.current.open();
                  }}>
                  <Text
                    style={[styles.font16, styles.textPri, styles.letspa35]}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.width50, styles.PadL9]}>
                <TouchableOpacity
                  style={[
                    styles.continueBtn,
                    styles.flexRow,
                    styles.justifyCenter,
                  ]}
                  onPress={() => {
                    refRBSheet1.current.open();
                  }}>
                  <Text
                    style={[styles.font16, styles.textWhite, styles.letspa35]}>
                    Decline
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {status === 35 || status === 33 ? (
            <View>
              <View
                style={[
                  GlobalStyles.marginTopSix,
                  GlobalStyles.onPressMarkReceived,
                ]}>
                <Pressable onPress={() => {}}>
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Mark As Reaceived
                  </Text>
                </Pressable>
              </View>
              <Pressable onPress={(invoice) => openResume(invoice)}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressMarkReceived,
                  ]}>
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Download Invoice
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : null}
          {status === 50 ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressReceived,
                  ]}>
                  <Pressable onPress={() => {}}>
                    <Text style={GlobalStyles.onPressedOrderText}>
                      Order Returned
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressReceived,
                  ]}>
                  <Pressable onPress={() => {}}>
                    <Text style={GlobalStyles.onPressedOrderText}>
                      Mark as Complated
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={(invoice) => openResume(invoice)}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressMarkReceived,
                  ]}>
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Download Invoice
                  </Text>

                  {/* <Button
  title="Download PDF"
  onPress={() =>
    downloadPDF(
      'https://example.com/path/to/pdf/file.pdf'
    )
  }
/> */}
                </View>
              </Pressable>
            </View>
          ) : null}

          {/* {moneyStatus == 10 ? (
            <View
              style={[
                GlobalStyles.marginTopSix,
                GlobalStyles.onPressMarkReceived,
              ]}
            >
              <Pressable onPress={() => { }}>
                <Text style={GlobalStyles.onPressedOrderText}>Pay Now</Text>
              </Pressable>
            </View>
          ) : null} */}
        </View>
        <RBSheet
          ref={refRBSheet}
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
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.mb11,
              styles.fontBold,
            ]}>
            Accept Notes
          </Text>

          {/* Notes Input */}
          <View style={[styles.mb20, styles.width100]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Notes
            </Text>

            <TextInput
              style={[styles.inputStyle, styles.fontMed]}
              placeholderTextColor='#222B2E'
              onChangeText={onChangeNotes}
              value={text}
            />
          </View>
          {/* Notes Input - Ends */}

          {/*  Select Warehouse Input */}
          <View style={[styles.mb30, styles.width100]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Select Warehouse
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <View>
              <DropDownIcon style={[styles.modalDropDown]} />
              <ModalSelector
                data={warehouseDataArray}
                initValue={warehouse}
                selectStyle={[
                  styles.inputStyle,
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyStart,
                ]}
                initValueTextStyle={[
                  styles.font15,
                  styles.textBlack,
                  styles.fontMed,
                ]}
                overlayStyle={[
                  styles.popupOverlay,
                  styles.flexColumn,
                  styles.justifyEnd,
                  styles.alignCenter,
                ]}
                optionContainerStyle={[styles.width300px]}
                cancelStyle={[styles.width300px, styles.marHorauto]}
                optionTextStyle={[styles.textBlack, styles.font15]}
                cancelTextStyle={[styles.textBlack, styles.font15]}
                onChange={(option) => {
                  if (option.key) {
                    setWarehouse(option.label);
                    setWarehouseKey(option.value);
                    // props.field.onChange(option.value)
                  }
                }}
                value={warehouse}
                // onChange={(value) => {
                //   setWarehouseKey(value.key);
                // }}
              />
            </View>
          </View>
          {/*  Select Warehouse Input - Ends */}
          <View
            style={[styles.flexRow, styles.justifyCenter, styles.space_btn]}>
            <View style={[styles.width50, styles.PadR9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.cancelStyle,
                ]}
                onPress={() => refRBSheet.current.close()}>
                <Text style={[styles.font16, styles.textPri, styles.letspa35]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.width50, styles.PadL9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={() => onAccept()}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <RBSheet
          ref={refRBSheet1}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          height={350}
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
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Decline Notes
          </Text>
          {/* Notes Input */}
          <View style={[styles.mb20, styles.width100]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              {" "}
              Notes
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>

            <Controller
              name='notes'
              control={control}
              rules={{ required: "Product name is required." }}
              render={(props) => (
                <TextInput
                  style={[styles.inputStyle]}
                  onChangeText={(notes) => {
                    props.field.onChange(notes);
                    setNotes(notes);
                  }}
                  value={notes}
                />
              )}
            />
            {formState1.errors.notes && (
              <Text style={[styles.errorMsg]}>Notes required.</Text>
            )}
          </View>
          <View
            style={[styles.flexRow, styles.justifyCenter, styles.space_btn]}>
            <View style={[styles.width50, styles.PadR9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.cancelStyle,
                ]}
                onPress={() => refRBSheet1.current.close()}>
                <Text style={[styles.font16, styles.textPri, styles.letspa35]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.width50, styles.PadL9]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={handleSubmit1(onDecline)}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Notes Input - Ends */}
        </RBSheet>
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          height={350}
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
          {/* success Popup */}
          <View
            style={[
              styles.flexColumn,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padt30,
            ]}>
            <Image
              source={require("../../../assets/images/dashboard/success_img.png")}
              style={[styles.successIcon]}></Image>
            <Text
              style={[
                styles.font22,
                styles.textBlack,
                styles.textCenter,
                styles.mb11,
                styles.fontBold,
              ]}>
              Updated Successfully
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              Order status successfully
            </Text>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.width50,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                // onPress={() => navigation.navigate("MyorderScreen")}
                onPress={() => [
                  refRBSheet.current.close(),
                  navigation.goBack(),
                ]}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* success Popup Ends */}
        </RBSheet>
        <RBSheet
          ref={refRBSheet3}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          height={350}
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
          {/* error Popup */}
          <View
            style={[
              styles.flexColumn,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padt30,
            ]}>
            <Image
              source={require("../../../assets/images/dashboard/errorImg.png")}
              style={[styles.successIcon]}></Image>
            <Text
              style={[
                styles.font22,
                styles.textBlack,
                styles.textCenter,
                styles.mb11,
                styles.fontBold,
              ]}>
              Error
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              {" "}
              {acceptError ? acceptError : declineError}
            </Text>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.width50,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                onPress={() => navigation.navigate("MyorderScreen")}>
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* error Popup Ends */}
        </RBSheet>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailedOrderPage;
