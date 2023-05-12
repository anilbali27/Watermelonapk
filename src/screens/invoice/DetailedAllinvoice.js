/** @format */

// /** @format */

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   Image,
//   Pressable,
//   ScrollView,
//   Button,
//   FlatList,
//   TouchableOpacity,
//   PermissionsAndroid,
//   Platform,
//   Linking,
// } from "react-native";
// import moment from "moment";
// import InvoiceDetailCard from "./InvoiceDetailCard";
// // import RNFetchBlob from "rn-fetch-blob";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { endPoint } from "../Services/API/ApiConstants";
// import api from "../../screens/Services/API/CallingApi";
// import GlobalStyles from "../../../assets/css/styles";

// const DetailedInvoicePage = ({ route, navigation }) => {
//   const [Data, setData] = useState(route.params);
//   const [invoiceList, setinvoiceList] = useState([]);
//   const [invoiceListView, setinvoiceListView] = useState([]);
//   const [search, setSearch] = useState("");
//   const [invoicedata, setinvoicedata] = useState([]);
//   const [filterdData, setfilterData] = useState([]);
//   //Get Invoice List By API
//   useEffect(() => {
//     getInvoiceDetails();
//   }, []);
//   const ItemSepartorView = () => {
//     return <View style={{ height: 10, width: "100%" }} />;
//   };
//   const openResume = (invoice) => {
//     if (invoice) {
//       const file_url = invoicedata.link;
//       Linking.canOpenURL(file_url).then(async (supported) => {
//         if (supported) {
//           Linking.openURL(file_url);
//         } else {
//           await WebBrowser.openBrowserAsync(file_url);
//         }
//       });
//     }
//   };
//   const getInvoiceDetails = async (id) => {
//     const accesstoken = await AsyncStorage.getItem("UserToken");
//     var myJson = {
//       invoice_id: Data._id,
//     };
//     console.log(myJson, "accesstoken");

//     const result = await api.getInvoiceDetails(
//       accesstoken,
//       endPoint.invoice_detail_List,
//       myJson
//     );
//     if (result.success) {
//       console.log(result.data.invoice, "myJsondatar");
//       console.log(result.data.invoice.link, "mylink");
//       setinvoicedata(result.data?.invoice);
//     } else {
//       setinvoicedata([]);
//     }
//   };

//   return (
//     <ScrollView>
//       <SafeAreaView style={GlobalStyles.orderContainer}>
//         {/* <StatusBar animated={true} backgroundColor='#1F9CEF' /> */}
//         <View style={GlobalStyles.headerDetailOrderView}>
//           <Pressable
//             onPress={() => {
//               navigation.navigate("InvoiceScreen");
//             }}>
//             <Text style={[GlobalStyles.textWhite, GlobalStyles.closeText]}>
//               {" "}
//               &times;
//             </Text>
//           </Pressable>

//           <View
//             style={[
//               GlobalStyles.flexRow,
//               GlobalStyles.justifyStart,
//               GlobalStyles.mb12,
//             ]}>
//             {invoicedata.status_name == "paid" ? (
//               <View style={[GlobalStyles.invoiceButtonPaid]}>
//                 <Text style={GlobalStyles.invoiceButtonText}>
//                   {invoicedata.status_name}
//                 </Text>
//               </View>
//             ) : (
//               <View
//                 style={[
//                   GlobalStyles.invoiceButtonPaid,
//                   GlobalStyles.borderWhite,
//                 ]}>
//                 <Text style={GlobalStyles.invoiceButtonText}>
//                   {invoicedata.status_name}
//                 </Text>
//               </View>
//             )}
//           </View>
//           <Text
//             style={[
//               GlobalStyles.font14,
//               GlobalStyles.textWhite,
//               GlobalStyles.fontSemi,
//               GlobalStyles.mb17,
//             ]}>
//             Invoice No : {invoicedata.unique_name}
//           </Text>
//           <Text
//             style={[
//               GlobalStyles.font16,
//               GlobalStyles.textWhite,
//               GlobalStyles.mb3,
//             ]}>
//             {" "}
//             {invoicedata.supplier_info?.supplier_name}
//           </Text>
//           <Text style={GlobalStyles.orderOutlet}>
//             Outlet : {invoicedata.outlet_info?.name}
//           </Text>
//         </View>

//         <View
//           style={[
//             GlobalStyles.positionalAbsoluteCardPadding,
//             GlobalStyles.padT0,
//           ]}>
//           <View style={[GlobalStyles.detailInvoiceBlk]}>
//             <View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                 }}>
//                 <View style={[GlobalStyles.width50, GlobalStyles.padR10]}>
//                   <Text
//                     style={[
//                       GlobalStyles.font10,
//                       GlobalStyles.textPri,
//                       GlobalStyles.mb3,
//                     ]}>
//                     Order No
//                   </Text>
//                   <Text
//                     style={[
//                       GlobalStyles.font12,
//                       GlobalStyles.textBlack,
//                       GlobalStyles.mb12,
//                       GlobalStyles.fontSemi,
//                     ]}>
//                     {invoicedata.order_id}
//                   </Text>
//                   <Text style={GlobalStyles.orderOutlet}>
//                     Outlet : {invoicedata.outlet_info?.name}
//                   </Text>
//                   <Text
//                     style={[
//                       GlobalStyles.orderDetailCardHeading,
//                       GlobalStyles.paddingFour,
//                     ]}></Text>
//                 </View>
//                 <View
//                   style={[GlobalStyles.detailAmountCard, GlobalStyles.width50]}>
//                   <Text
//                     style={[
//                       GlobalStyles.font10,
//                       GlobalStyles.textPri,
//                       GlobalStyles.mb2,
//                     ]}>
//                     Amount
//                   </Text>
//                   <Text
//                     style={[
//                       GlobalStyles.font19,
//                       GlobalStyles.textBlack,
//                       GlobalStyles.fontSemi,
//                       GlobalStyles.mb14,
//                     ]}>
//                     AED {invoicedata.total_cost_amount}
//                   </Text>
//                   <Text style={[GlobalStyles.font10, GlobalStyles.textBlack]}>
//                     Created On {invoicedata.created_at}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View>
//             <FlatList
//               data={invoicedata.products_info}
//               keyExtractor={(item) => item.id}
//               ItemSeparatorComponent={ItemSepartorView}
//               showsVerticalScrollIndicator={false}
//               renderItem={({ item }) => (
//                 <InvoiceDetailCard
//                   title={item?.product_name}
//                   costPriceperUnit={item?.cost_price_per_unit}
//                   displayskuName={item?.display_sku_name}
//                   image={item?.product_image}
//                 />
//               )}
//             />

//             <View
//               style={[
//                 GlobalStyles.addressBlk,
//                 GlobalStyles.flexRow,
//                 GlobalStyles.justifyBetween,
//               ]}>
//               <View style={[GlobalStyles.width50]}>
//                 <Text
//                   style={[
//                     GlobalStyles.font12,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontSemi,
//                     GlobalStyles.mb6,
//                   ]}>
//                   Billing Address
//                 </Text>
//                 <Text
//                   style={[
//                     GlobalStyles.font10,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontMed,
//                   ]}>
//                   {" "}
//                   {invoicedata.billing_address}
//                 </Text>
//               </View>
//             </View>

//             <View
//               style={[
//                 GlobalStyles.addressBlk,
//                 GlobalStyles.flexRow,
//                 GlobalStyles.justifyBetween,
//               ]}>
//               <View style={[GlobalStyles.width50]}>
//                 <Text
//                   style={[
//                     GlobalStyles.font12,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontSemi,
//                     GlobalStyles.mb6,
//                   ]}>
//                   Delivery Address
//                 </Text>
//                 <Text
//                   style={[
//                     GlobalStyles.font10,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontMed,
//                   ]}>
//                   {invoicedata.delivery_address}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={() => {}}
//                 style={[
//                   GlobalStyles.editView,
//                   GlobalStyles.flexRow,
//                   GlobalStyles.justifyCenter,
//                   GlobalStyles.alignCenter,
//                 ]}>
//                 <Text
//                   style={[
//                     GlobalStyles.textPri,
//                     GlobalStyles.font10,
//                     GlobalStyles.fontMed,
//                   ]}>
//                   Edit
//                 </Text>
//               </Pressable>
//             </View>

//             <View
//               style={[
//                 GlobalStyles.addressBlk,
//                 GlobalStyles.flexRow,
//                 GlobalStyles.justifyBetween,
//               ]}>
//               <View style={[GlobalStyles.width50]}>
//                 <Text
//                   style={[
//                     GlobalStyles.font12,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontSemi,
//                     GlobalStyles.mb6,
//                   ]}>
//                   Delivery Date
//                 </Text>
//                 <Text
//                   style={[
//                     GlobalStyles.font10,
//                     GlobalStyles.textBlack,
//                     GlobalStyles.fontMed,
//                   ]}>
//                   {Data.delivery_requested.delivery_date}
//                 </Text>
//               </View>
//               <Pressable
//                 onPress={() => {}}
//                 style={[
//                   GlobalStyles.editView,
//                   GlobalStyles.flexRow,
//                   GlobalStyles.justifyCenter,
//                   GlobalStyles.alignCenter,
//                 ]}>
//                 <Text
//                   style={[
//                     GlobalStyles.textPri,
//                     GlobalStyles.font10,
//                     GlobalStyles.fontMed,
//                   ]}>
//                   Edit
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//           <View style={[GlobalStyles.addressBlk, GlobalStyles.padh0]}>
//             <View style={[GlobalStyles.padH15, GlobalStyles.padb15]}>
//               <View style={GlobalStyles.bottomLineOrderCared1}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text style={[GlobalStyles.orderDetailCardText]}>
//                       Estimated Subtotal
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text style={GlobalStyles.orderDetailCardText}>AED</Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.paddingThree,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text style={[GlobalStyles.orderDetailCardText]}>
//                       Estimated Delivery Fee
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text style={GlobalStyles.orderDetailCardText}>
//                     AED {invoicedata.delivery_fee}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.paddingThree,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text style={[GlobalStyles.orderDetailCardText]}>
//                       VAT(5%)
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text style={GlobalStyles.orderDetailCardText}>
//                     AED {invoicedata.vat_amount}
//                   </Text>
//                 </View>
//               </View>
//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.marginTopSeven,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text
//                       style={[
//                         GlobalStyles.orderDetailCardHeading,
//                         GlobalStyles.textPri,
//                       ]}>
//                       Estimated total
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text
//                     style={[
//                       GlobalStyles.orderDetailCardHeading,
//                       GlobalStyles.textPri,
//                     ]}>
//                     AED {invoicedata.total_net_amount}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             <View style={GlobalStyles.orderDetailFlexView} />
//             <View style={[GlobalStyles.padH15, GlobalStyles.padt8]}>
//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.marginTopSeven,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text
//                       style={[
//                         GlobalStyles.orderDetailCardHeading,
//                         GlobalStyles.textPri,
//                       ]}>
//                       STATUS
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   {invoicedata.status_name == "paid" ? (
//                     <Text
//                       style={[
//                         GlobalStyles.orderDetailCardHeading,
//                         GlobalStyles.textPri,
//                       ]}>
//                       {invoicedata.status_name}
//                     </Text>
//                   ) : (
//                     <Text
//                       style={[
//                         GlobalStyles.orderDetailCardHeading,
//                         GlobalStyles.textred,
//                       ]}>
//                       {invoicedata.status_name}
//                     </Text>
//                   )}
//                 </View>
//               </View>

//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.paddingThree,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text style={[GlobalStyles.orderDetailCardText]}>
//                       PAID AMOUNT
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text style={GlobalStyles.orderDetailCardText}>
//                     AED {invoicedata.total_payable_amount}
//                   </Text>
//                 </View>
//               </View>

//               <View
//                 style={[
//                   GlobalStyles.bottomLineOrderCared1,
//                   GlobalStyles.paddingThree,
//                 ]}>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <View style={GlobalStyles.orderDetailcardView}>
//                     <Text style={[GlobalStyles.orderDetailCardText]}>
//                       REMAINING AMOUNT
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={GlobalStyles.justifyContentCenter}>
//                   <Text style={GlobalStyles.orderDetailCardText}>
//                     AED {invoicedata.pending_amount}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <Pressable onPress={(invoicedata) => openResume(invoicedata)}>
//             <View
//               style={[
//                 GlobalStyles.marginTopSix,
//                 GlobalStyles.onPressMarkReceived,
//                 GlobalStyles.width100,
//                 GlobalStyles.flexRow,
//                 GlobalStyles.alignCenter,
//                 GlobalStyles.justifyCenter,
//               ]}>
//               <Text style={GlobalStyles.onPressedOrderText}>
//                 Download Invoice
//               </Text>
//             </View>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// };

// export default DetailedInvoicePage;

/** @format */

import React, { useState, useEffect } from "react";
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
  Linking,
} from "react-native";
import moment from "moment";
import InvoiceDetailCard from "./InvoiceDetailCard";
// import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../../screens/Services/API/CallingApi";
import GlobalStyles from "../../../assets/css/styles";

const DetailedInvoicePage = ({ route, navigation }) => {
  const [Data, setData] = useState(route.params);
  const [invoiceList, setinvoiceList] = useState([]);
  const [invoiceListView, setinvoiceListView] = useState([]);
  const [search, setSearch] = useState("");
  const [invoicedata, setinvoicedata] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  //Get Invoice List By API
  useEffect(() => {
    getInvoiceDetails();
  }, []);
  const ItemSepartorView = () => {
    return <View style={{ height: 10, width: "100%" }} />;
  };
  const openResume = (invoice) => {
    if (invoice) {
      const file_url = invoicedata.link;
      Linking.canOpenURL(file_url).then(async (supported) => {
        if (supported) {
          Linking.openURL(file_url);
        } else {
          await WebBrowser.openBrowserAsync(file_url);
        }
      });
    }
  };
  const getInvoiceDetails = async (id) => {
    const accesstoken = await AsyncStorage.getItem("UserToken");
    var myJson = {
      invoice_id: Data._id,
    };
    console.log(myJson, "accesstoken");

    const result = await api.getInvoiceDetails(
      accesstoken,
      endPoint.invoice_detail_List,
      myJson
    );
    if (result.success) {
      console.log(result.data.invoice, "myJsondatar");
      console.log(result.data.invoice.link, "mylink");
      setinvoicedata(result.data?.invoice);
    } else {
      setinvoicedata([]);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={GlobalStyles.orderContainer}>
        {/* <StatusBar animated={true} backgroundColor='#1F9CEF' /> */}
        <View style={GlobalStyles.headerDetailOrderView}>
          <Pressable
            onPress={() => {
              navigation.navigate("InvoiceScreen");
            }}>
            <Text style={[GlobalStyles.textWhite, GlobalStyles.closeText]}>
              {" "}
              &times;
            </Text>
          </Pressable>

          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.justifyStart,
              GlobalStyles.mb12,
            ]}>
            {invoicedata.status_name == "Paid" ? (
              <View style={GlobalStyles.orderPaidStatus}>
                <Text style={GlobalStyles.paidText}>
                  {invoicedata?.status_name}
                </Text>
              </View>
            ) : (
              <View style={GlobalStyles.orderPaid}>
                <Text style={GlobalStyles.paidText}>
                  {invoicedata?.status_name}
                </Text>
              </View>
            )}
          </View>
          <Text
            style={[
              GlobalStyles.font14,
              GlobalStyles.textWhite,
              GlobalStyles.fontSemi,
              GlobalStyles.mb17,
            ]}>
            Invoice No : {invoicedata?.unique_name}
          </Text>
          <Text
            style={[
              GlobalStyles.font16,
              GlobalStyles.textWhite,
              GlobalStyles.mb3,
            ]}>
            {" "}
            {invoicedata.supplier_info?.supplier_name}
          </Text>
          <Text style={GlobalStyles.orderOutlet}>
            Outlet : {invoicedata.outlet_info?.name}
          </Text>
        </View>

        <View
          style={[
            GlobalStyles.positionalAbsoluteCardPadding,
            GlobalStyles.padT0,
          ]}>
          <View style={[GlobalStyles.detailInvoiceBlk]}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View style={[GlobalStyles.width50, GlobalStyles.padR10]}>
                  <Text
                    style={[
                      GlobalStyles.font10,
                      GlobalStyles.textPri,
                      GlobalStyles.mb3,
                    ]}>
                    Order No
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.font12,
                      GlobalStyles.textBlack,
                      GlobalStyles.mb12,
                      GlobalStyles.fontSemi,
                    ]}>
                    {invoicedata?.order_unique_name}
                  </Text>
                  <Text style={GlobalStyles.orderOutlet}>
                    Outlet : {invoicedata.outlet_info?.name}
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.paddingFour,
                    ]}></Text>
                </View>
                <View
                  style={[GlobalStyles.detailAmountCard, GlobalStyles.width50]}>
                  <Text
                    style={[
                      GlobalStyles.font10,
                      GlobalStyles.textPri,
                      GlobalStyles.mb2,
                    ]}>
                    Amount
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.font19,
                      GlobalStyles.textBlack,
                      GlobalStyles.fontSemi,
                      GlobalStyles.mb14,
                    ]}>
                    AED {invoicedata.total_cost_amount}
                  </Text>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textBlack]}>
                    Created On {invoicedata.created_at}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <FlatList
              data={invoicedata.products_info}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSepartorView}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <InvoiceDetailCard
                  title={item?.product_name}
                  costPriceperUnit={item?.cost_price_per_unit}
                  displayskuName={item?.display_sku_name}
                  image={item?.product_image}
                />
              )}
            />

            <View
              style={[
                GlobalStyles.addressBlk,
                GlobalStyles.flexRow,
                GlobalStyles.justifyBetween,
              ]}>
              <View style={[GlobalStyles.width50]}>
                <Text
                  style={[
                    GlobalStyles.font12,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontSemi,
                    GlobalStyles.mb6,
                  ]}>
                  Billing Address
                </Text>
                <Text
                  style={[
                    GlobalStyles.font10,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontMed,
                  ]}>
                  {" "}
                  {invoicedata.billing_address}
                </Text>
              </View>
            </View>

            <View
              style={[
                GlobalStyles.addressBlk,
                GlobalStyles.flexRow,
                GlobalStyles.justifyBetween,
              ]}>
              <View style={[GlobalStyles.width50]}>
                <Text
                  style={[
                    GlobalStyles.font12,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontSemi,
                    GlobalStyles.mb6,
                  ]}>
                  Delivery Address
                </Text>
                <Text
                  style={[
                    GlobalStyles.font10,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontMed,
                  ]}>
                  {invoicedata.delivery_address}
                </Text>
              </View>
              <Pressable
                onPress={() => {}}
                style={[
                  GlobalStyles.editView,
                  GlobalStyles.flexRow,
                  GlobalStyles.justifyCenter,
                  GlobalStyles.alignCenter,
                ]}>
                <Text
                  style={[
                    GlobalStyles.textPri,
                    GlobalStyles.font10,
                    GlobalStyles.fontMed,
                  ]}>
                  Edit
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                GlobalStyles.addressBlk,
                GlobalStyles.flexRow,
                GlobalStyles.justifyBetween,
              ]}>
              <View style={[GlobalStyles.width50]}>
                <Text
                  style={[
                    GlobalStyles.font12,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontSemi,
                    GlobalStyles.mb6,
                  ]}>
                  Delivery Date
                </Text>
                <Text
                  style={[
                    GlobalStyles.font10,
                    GlobalStyles.textBlack,
                    GlobalStyles.fontMed,
                  ]}>
                  {Data.delivery_requested.delivery_date}
                </Text>
              </View>
              <Pressable
                onPress={() => {}}
                style={[
                  GlobalStyles.editView,
                  GlobalStyles.flexRow,
                  GlobalStyles.justifyCenter,
                  GlobalStyles.alignCenter,
                ]}>
                <Text
                  style={[
                    GlobalStyles.textPri,
                    GlobalStyles.font10,
                    GlobalStyles.fontMed,
                  ]}>
                  Edit
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={[GlobalStyles.addressBlk, GlobalStyles.padh0]}>
            <View style={[GlobalStyles.padH15, GlobalStyles.padb15]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <Text style={[GlobalStyles.orderDetailCardText]}>
                      Estimated Subtotal
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>AED</Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <Text style={[GlobalStyles.orderDetailCardText]}>
                      Estimated Delivery Fee
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {invoicedata.delivery_fee}
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
                    <Text style={[GlobalStyles.orderDetailCardText]}>
                      VAT(5%)
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {invoicedata.vat_amount}
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
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.textPri,
                      ]}>
                      Estimated total
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.textPri,
                    ]}>
                    AED {invoicedata.total_net_amount}
                  </Text>
                </View>
              </View>
            </View>
            <View style={GlobalStyles.orderDetailFlexView} />
            <View style={[GlobalStyles.padH15, GlobalStyles.padt8]}>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.marginTopSeven,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.textPri,
                      ]}>
                      STATUS
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  {invoicedata.status_name == "Paid" ? (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.textGreen,
                      ]}>
                      {invoicedata.status_name}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.textred,
                      ]}>
                      {invoicedata.status_name}
                    </Text>
                  )}
                </View>
              </View>

              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <Text style={[GlobalStyles.orderDetailCardText]}>
                      PAID AMOUNT
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {invoicedata.total_payable_amount}
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
                    <Text style={[GlobalStyles.orderDetailCardText]}>
                      REMAINING AMOUNT
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {invoicedata.pending_amount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable onPress={(invoicedata) => openResume(invoicedata)}>
            <View
              style={[
                GlobalStyles.marginTopSix,
                GlobalStyles.onPressMarkReceived,
                GlobalStyles.width100,
                GlobalStyles.flexRow,
                GlobalStyles.alignCenter,
                GlobalStyles.justifyCenter,
              ]}>
              <Text style={GlobalStyles.onPressedOrderText}>
                Download Invoice
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailedInvoicePage;
