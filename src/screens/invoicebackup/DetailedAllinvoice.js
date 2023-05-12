/** @format */

// /** @format */

// // // /** @format */

// // // import React, { useState, useRef, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   Image,
// // //   TouchableOpacity,
// // //   Linking,
// // //   Pressable,
// // //   ScrollView,
// // // } from "react-native";
// // // import { MaterialIcons } from "@expo/vector-icons";
// // // import { AntDesign } from "@expo/vector-icons";
// // // import { FontAwesome } from "@expo/vector-icons";
// // // import { COLORS } from "../../constant/Colors";
// // // import moment from "moment";
// // // import Icon from "react-native-vector-icons/Feather";
// // // import GlobalStyles from "../../../assets/css/styles";
// // // import Star from "../../../assets/images/icons/Star";
// // // import SvgUri from "react-native-svg-uri-updated";
// // // import { Button } from "react-native-paper";
// // // import AsyncStorage from "@react-native-async-storage/async-storage";
// // // import api from "../../screens/Services/API/CallingApi";
// // // import { endPoint } from "../../screens/Services/API/ApiConstants";

// // // const DetailedAllinvoices = ({ route, navigation }) => {
// // //   const [id, setId] = useState(route.params.id);
// // //   const [invoice, setInvoice] = useState(route.params.invoice);
// // //   const [image, setImage] = useState(route.params.image);

// // //   const [count, setCount] = useState(0);

// // //   console.log(route.params.image, "route.123params");
// // //   const [invoiceDetailsData, setinvoiceDetailsData] = useState([]);

// // //   useEffect(() => {
// // //     getInvoiceDetailList();
// // //   }, []);

// // //   const getInvoiceDetailList = async () => {
// // //     const jsonValue = await AsyncStorage.getItem("UserToken");

// // //     let token = jsonValue;
// // //     var myJson = {
// // //       invoice_id: id,
// // //     };
// // //     const result = await api.getInvoiceDeatils(
// // //       token,
// // //       endPoint.get_invoice,
// // //       myJson
// // //     );
// // //     console.log(result.data, "RTY090909878");

// // //     if (result) {
// // //       setinvoiceDetailsData(result.data);
// // //     } else {
// // //       setinvoiceDetailsData([]);
// // //     }
// // //   };
// // //   const selDate = moment(invoiceDetailsData?.order?.created_at).format(
// // //     "DD-MMM-YYYY"
// // //   );

// // //   const handleIncrement = () => {
// // //     setCount(count + 1);
// // //   };

// // //   const handleDecrement = () => {
// // //     setCount(count - 1);
// // //   };
// // //   const openResume = (invoice) => {
// // //     if (invoice) {
// // //       const file_url = invoice;
// // //       console.log(file_url, "filename");
// // //       Linking.canOpenURL(file_url).then(async (supported) => {
// // //         if (supported) {
// // //           Linking.openURL(file_url);
// // //         } else {
// // //           await WebBrowser.openBrowserAsync(file_url);
// // //         }
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <ScrollView>
// // //       <View style={GlobalStyles.modal}>
// // //         <View style={GlobalStyles.topModelSection}>
// // //           <TouchableOpacity
// // //             onPress={() => {
// // //               navigation.goBack();
// // //             }}
// // //           >
// // //             <AntDesign
// // //               name="close"
// // //               size={30}
// // //               style={GlobalStyles.closeIcon}
// // //             ></AntDesign>
// // //           </TouchableOpacity>
// // //           <View style={GlobalStyles.modelPaidButton}>
// // //             <Text style={GlobalStyles.invoiceButtonText}>
// // //               {invoiceDetailsData?.invoice?.status_name}
// // //             </Text>
// // //           </View>
// // //           <Text style={GlobalStyles.modelInvoiceNo}>
// // //             Invoice No : {invoiceDetailsData?.invoice?.unique_name}
// // //           </Text>
// // //           <Text style={GlobalStyles.modelTitle}>
// // //             Unibic Dubai International
// // //           </Text>
// // //           <Text style={GlobalStyles.modelAddress}>
// // //             Outlet :{" "}
// // //             {invoiceDetailsData?.invoice?.supplier_info?.supplier_address}
// // //           </Text>
// // //         </View>
// // //         <View style={GlobalStyles.modelTopBoxSection}>
// // //           <View style={GlobalStyles.modelTopBoxContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.modelTwoSectionRow}>
// // //                 <View style={GlobalStyles.modelOneBox}>
// // //                   <Text style={GlobalStyles.modelSingleBoxTitle}>Order No</Text>
// // //                   <Text style={GlobalStyles.modelSingleBoxValue}>
// // //                     {invoiceDetailsData?.invoice?.order_unique_name}
// // //                   </Text>
// // //                   <Text style={GlobalStyles.modelSingleBoxTitle}>Outlet</Text>
// // //                   <Text style={GlobalStyles.modelSingleBoxBottomValue}>
// // //                     Outlet 1
// // //                   </Text>
// // //                 </View>
// // //                 <View style={GlobalStyles.modelTwoBox}>
// // //                   <Text style={GlobalStyles.modelSingleBoxTitle}>Amount</Text>
// // //                   <Text style={GlobalStyles.modelSingleBoxUniqValue}>
// // //                     AED {invoiceDetailsData?.order?.total_payable_amount}
// // //                   </Text>
// // //                   <Text style={GlobalStyles.modelSingleBoxDate}>
// // //                     Created On {selDate}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.notificationOddContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.modelImageBoxSectionRow}>
// // //                 <View style={GlobalStyles.modelImageBox}>
// // //                   <View style={GlobalStyles.modelImageCircleBox}>
// // //                     <Image
// // //                       // source={invoiceDetailsData?.invoice?.products_info[0].product_image}
// // //                       source={{
// // //                         uri: `https://stagingapi.watermelon.market/upload/upload_photo/${image}`,
// // //                       }}
// // //                       style={GlobalStyles.modelImage}
// // //                       resizeMode="cover"
// // //                     />
// // //                   </View>
// // //                   <View style={GlobalStyles.modelAmmountUpdateRow}>
// // //                     <View style={GlobalStyles.addSubViewOne}>
// // //                       <Pressable onPress={handleDecrement}>
// // //                         <View style={GlobalStyles.addSubViewTwo}>
// // //                           <Text style={GlobalStyles.colorTwo}>-</Text>
// // //                         </View>
// // //                       </Pressable>
// // //                       <View style={GlobalStyles.addSubViewTwo}>
// // //                         <Text style={GlobalStyles.colorTwo}>{count}</Text>
// // //                       </View>
// // //                       <Pressable o onPress={handleIncrement}>
// // //                         <View style={GlobalStyles.addSubViewFour}>
// // //                           <Text style={GlobalStyles.colorTwo}>+</Text>
// // //                         </View>
// // //                       </Pressable>
// // //                     </View>
// // //                   </View>
// // //                 </View>
// // //                 <View style={GlobalStyles.modelContentBox}>
// // //                   <Text style={GlobalStyles.modelImageBoxTitle}>
// // //                     {invoiceDetailsData?.invoice?.products_info[0].product_name}
// // //                   </Text>
// // //                   <Text style={GlobalStyles.modelImageBoxContent}>
// // //                     {invoiceDetailsData?.invoice?.products_info[0].product_code}
// // //                   </Text>
// // //                   <Text style={GlobalStyles.modelImageBoxContentPackage}>
// // //                     {invoiceDetailsData?.invoice?.products_info[0].uom} (
// // //                     {invoiceDetailsData?.invoice?.products_info[0].uom_number})
// // //                   </Text>
// // //                   <Text style={GlobalStyles.modelImageBoxUniqValue}>
// // //                     AED{" "}
// // //                     {
// // //                       invoiceDetailsData?.invoice?.products_info[0]
// // //                         .cost_price_per_unit
// // //                     }
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.notificationOddContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <Text style={GlobalStyles.invoiceTitle}>Billing Address</Text>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceSingleSectionRow}>
// // //                 <Text style={GlobalStyles.billingAddress}>
// // //                   {invoiceDetailsData?.invoice?.billing_address}
// // //                 </Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.notificationOddContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <Text style={GlobalStyles.invoiceTitle}>Delivery Address</Text>
// // //                 <View style={GlobalStyles.invoiceButtonEdit}>
// // //                   <Text style={GlobalStyles.invoiceButtonEditText}>Edit</Text>
// // //                 </View>
// // //               </View>

// // //               <View style={GlobalStyles.invoiceSingleSectionRow}>
// // //                 <Text style={GlobalStyles.billingAddress}>
// // //                   {invoiceDetailsData?.invoice?.delivery_address}
// // //                 </Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.notificationOddContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <Text style={GlobalStyles.invoiceTitle}>
// // //                   Delivery Date
// // //                   <Icon name="info" size={16} color="red"></Icon>
// // //                 </Text>
// // //                 <View style={GlobalStyles.invoiceButtonEdit}>
// // //                   <Text style={GlobalStyles.invoiceButtonEditText}>Edit</Text>
// // //                 </View>
// // //               </View>

// // //               <View style={GlobalStyles.invoiceSingleSectionRow}>
// // //                 <Text style={GlobalStyles.billingAddress}>
// // //                   {
// // //                     invoiceDetailsData?.invoice?.delivery_requested
// // //                       ?.delivery_date
// // //                   }
// // //                 </Text>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.notificationOddContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.billingAddress}>
// // //                     Estimated SubTotal
// // //                   </Text>
// // //                 </View>
// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.billingCurrency}>
// // //                     AED {invoiceDetailsData?.order?.total_net_amount}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.billingAddress}>
// // //                     Estimated Delivery Fee
// // //                   </Text>
// // //                 </View>

// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.billingCurrency}>
// // //                     AED {invoiceDetailsData?.order?.delivery_fee}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.billingAddress}>
// // //                     VAT({invoiceDetailsData?.order?.vat?.percentage}%)
// // //                   </Text>
// // //                 </View>

// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.billingCurrency}>
// // //                     AED {invoiceDetailsData?.order?.vat_amount}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.estimatedTotal}>
// // //                     Estimated total
// // //                   </Text>
// // //                 </View>

// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.estimatedTotal}>
// // //                     AED {invoiceDetailsData?.order?.total_payable_amount}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <View style={GlobalStyles.invoiceNoMarginContainer}>
// // //             <View style={GlobalStyles.invoiceContainer}>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.estimatedTotal}>STATUS</Text>
// // //                 </View>

// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.estimatedTotal}>
// // //                     {invoiceDetailsData?.order?.paid_status_name}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.billingAddress}>PAID AMOUNT</Text>
// // //                 </View>
// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.billingCurrency}>
// // //                     AED {invoiceDetailsData?.order?.paid_status}
// // //                   </Text>
// // //                 </View>
// // //               </View>
// // //               <View style={GlobalStyles.invoiceTwoSectionRow}>
// // //                 <View style={GlobalStyles.invoiceCardLeft}>
// // //                   <Text style={GlobalStyles.billingAddress}>
// // //                     REMAINING AMOUNT
// // //                   </Text>
// // //                 </View>

// // //                 <View style={GlobalStyles.invoiceCardRight}>
// // //                   <Text style={GlobalStyles.billingCurrency}>AED 0</Text>
// // //                 </View>
// // //               </View>
// // //             </View>
// // //           </View>
// // //           <TouchableOpacity
// // //             style={GlobalStyles.buttonStyleRounded}
// // //             onPress={() => openResume(invoice)}
// // //           >
// // //             {/* <Text style={GlobalStyles.buttonStyleRoundedText}>
// // //                     Download Invoice
// // //                   </Text> */}
// // //             <Button
// // //               //   onPress={handleSubmit3(onSubmit)}
// // //               style={[
// // //                 GlobalStyles.primaryBg,
// // //                 GlobalStyles.saveBtn,
// // //                 GlobalStyles.width100,
// // //               ]}
// // //             >
// // //               <Text
// // //                 style={[
// // //                   GlobalStyles.font15,
// // //                   GlobalStyles.letterSpa33,
// // //                   GlobalStyles.textWhite,
// // //                   GlobalStyles.fontMed,
// // //                 ]}
// // //               >
// // //                 Download Invoice
// // //               </Text>
// // //             </Button>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </View>
// // //     </ScrollView>
// // //   );
// // // };

// // // export default DetailedAllinvoices;

// // /** @format */

// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   StatusBar,
// //   Image,
// //   Pressable,
// //   ScrollView,
// //   Button,
// //   FlatList,
// //   TouchableOpacity,
// //   PermissionsAndroid,
// //   Platform,
// //   Linking,
// // } from "react-native";
// // import moment from "moment";
// // import InvoiceDetailCard from "./InvoiceDetailCard";
// // // import RNFetchBlob from "rn-fetch-blob";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { endPoint } from "../Services/API/ApiConstants";
// // import api from "../../screens/Services/API/CallingApi";
// // import GlobalStyles from "../../../assets/css/styles";

// // const DetailedInvoicePage = ({ route, navigation }) => {
// //   const [Data, setData] = useState(route.params);
// //   const [invoiceList, setinvoiceList] = useState([]);
// //   const [invoiceListView, setinvoiceListView] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [invoicedata, setinvoicedata] = useState([]);
// //   const [filterdData, setfilterData] = useState([]);
// //   //Get Invoice List By API
// //   useEffect(() => {
// //     getInvoiceDetails();
// //   }, []);
// //   const ItemSepartorView = () => {
// //     return <View style={{ height: 10, width: "100%" }} />;
// //   };
// //   const openResume = (invoice) => {
// //     if (invoice) {
// //       const file_url = invoicedata.link;
// //       Linking.canOpenURL(file_url).then(async (supported) => {
// //         if (supported) {
// //           Linking.openURL(file_url);
// //         } else {
// //           await WebBrowser.openBrowserAsync(file_url);
// //         }
// //       });
// //     }
// //   };
// //   const getInvoiceDetails = async (id) => {
// //     const accesstoken = await AsyncStorage.getItem("UserToken");
// //     var myJson = {
// //       invoice_id: Data._id,
// //     };
// //     console.log(myJson, "accesstoken");

// //     const result = await api.getInvoiceDetails(
// //       accesstoken,
// //       endPoint.invoice_detail_List,
// //       myJson
// //     );
// //     if (result.success) {
// //       console.log(result.data.invoice, "myJsondatar");
// //       console.log(result.data.invoice.link, "mylink");
// //       setinvoicedata(result.data?.invoice);
// //     } else {
// //       setinvoicedata([]);
// //     }
// //   };

// //   return (
// //     <ScrollView>
// //       <SafeAreaView style={GlobalStyles.orderContainer}>
// //         {/* <StatusBar animated={true} backgroundColor='#1F9CEF' /> */}
// //         <View style={GlobalStyles.headerDetailOrderView}>
// //           <Pressable
// //             onPress={() => {
// //               navigation.navigate("InvoiceScreen");
// //             }}>
// //             <Text style={[GlobalStyles.textWhite, GlobalStyles.closeText]}>
// //               {" "}
// //               &times;
// //             </Text>
// //           </Pressable>

// //           <View
// //             style={[
// //               GlobalStyles.flexRow,
// //               GlobalStyles.justifyStart,
// //               GlobalStyles.mb12,
// //             ]}>
// //             {invoicedata.status_name == "paid" ? (
// //               <View style={[GlobalStyles.invoiceButtonPaid]}>
// //                 <Text style={GlobalStyles.invoiceButtonText}>
// //                   {invoicedata.status_name}
// //                 </Text>
// //               </View>
// //             ) : (
// //               <View
// //                 style={[
// //                   GlobalStyles.invoiceButtonPaid,
// //                   GlobalStyles.borderWhite,
// //                 ]}>
// //                 <Text style={GlobalStyles.invoiceButtonText}>
// //                   {invoicedata.status_name}
// //                 </Text>
// //               </View>
// //             )}
// //           </View>
// //           <Text
// //             style={[
// //               GlobalStyles.font14,
// //               GlobalStyles.textWhite,
// //               GlobalStyles.fontSemi,
// //               GlobalStyles.mb17,
// //             ]}>
// //             Invoice No : {invoicedata.unique_name}
// //           </Text>
// //           <Text
// //             style={[
// //               GlobalStyles.font16,
// //               GlobalStyles.textWhite,
// //               GlobalStyles.mb3,
// //             ]}>
// //             {" "}
// //             {invoicedata.supplier_info?.supplier_name}
// //           </Text>
// //           <Text style={GlobalStyles.orderOutlet}>
// //             Outlet : {invoicedata.outlet_info?.name}
// //           </Text>
// //         </View>

// //         <View
// //           style={[
// //             GlobalStyles.positionalAbsoluteCardPadding,
// //             GlobalStyles.padT0,
// //           ]}>
// //           <View style={[GlobalStyles.detailInvoiceBlk]}>
// //             <View>
// //               <View
// //                 style={{
// //                   flexDirection: "row",
// //                   justifyContent: "space-between",
// //                 }}>
// //                 <View style={[GlobalStyles.width50, GlobalStyles.padR10]}>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.font10,
// //                       GlobalStyles.textPri,
// //                       GlobalStyles.mb3,
// //                     ]}>
// //                     Order No
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.font12,
// //                       GlobalStyles.textBlack,
// //                       GlobalStyles.mb12,
// //                       GlobalStyles.fontSemi,
// //                     ]}>
// //                     {invoicedata.order_id}
// //                   </Text>
// //                   <Text style={GlobalStyles.orderOutlet}>
// //                     Outlet : {invoicedata.outlet_info?.name}
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.orderDetailCardHeading,
// //                       GlobalStyles.paddingFour,
// //                     ]}></Text>
// //                 </View>
// //                 <View
// //                   style={[GlobalStyles.detailAmountCard, GlobalStyles.width50]}>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.font10,
// //                       GlobalStyles.textPri,
// //                       GlobalStyles.mb2,
// //                     ]}>
// //                     Amount
// //                   </Text>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.font19,
// //                       GlobalStyles.textBlack,
// //                       GlobalStyles.fontSemi,
// //                       GlobalStyles.mb14,
// //                     ]}>
// //                     AED {invoicedata.total_cost_amount}
// //                   </Text>
// //                   <Text style={[GlobalStyles.font10, GlobalStyles.textBlack]}>
// //                     Created On {invoicedata.created_at}
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>
// //           </View>

// //           <View>
// //             <FlatList
// //               data={invoicedata.products_info}
// //               keyExtractor={(item) => item.id}
// //               ItemSeparatorComponent={ItemSepartorView}
// //               showsVerticalScrollIndicator={false}
// //               renderItem={({ item }) => (
// //                 <InvoiceDetailCard
// //                   title={item?.product_name}
// //                   costPriceperUnit={item?.cost_price_per_unit}
// //                   displayskuName={item?.display_sku_name}
// //                   image={item?.product_image}
// //                 />
// //               )}
// //             />

// //             <View
// //               style={[
// //                 GlobalStyles.addressBlk,
// //                 GlobalStyles.flexRow,
// //                 GlobalStyles.justifyBetween,
// //               ]}>
// //               <View style={[GlobalStyles.width50]}>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font12,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontSemi,
// //                     GlobalStyles.mb6,
// //                   ]}>
// //                   Billing Address
// //                 </Text>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font10,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontMed,
// //                   ]}>
// //                   {" "}
// //                   {invoicedata.billing_address}
// //                 </Text>
// //               </View>
// //             </View>

// //             <View
// //               style={[
// //                 GlobalStyles.addressBlk,
// //                 GlobalStyles.flexRow,
// //                 GlobalStyles.justifyBetween,
// //               ]}>
// //               <View style={[GlobalStyles.width50]}>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font12,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontSemi,
// //                     GlobalStyles.mb6,
// //                   ]}>
// //                   Delivery Address
// //                 </Text>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font10,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontMed,
// //                   ]}>
// //                   {invoicedata.delivery_address}
// //                 </Text>
// //               </View>
// //               <Pressable
// //                 onPress={() => {}}
// //                 style={[
// //                   GlobalStyles.editView,
// //                   GlobalStyles.flexRow,
// //                   GlobalStyles.justifyCenter,
// //                   GlobalStyles.alignCenter,
// //                 ]}>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.textPri,
// //                     GlobalStyles.font10,
// //                     GlobalStyles.fontMed,
// //                   ]}>
// //                   Edit
// //                 </Text>
// //               </Pressable>
// //             </View>

// //             <View
// //               style={[
// //                 GlobalStyles.addressBlk,
// //                 GlobalStyles.flexRow,
// //                 GlobalStyles.justifyBetween,
// //               ]}>
// //               <View style={[GlobalStyles.width50]}>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font12,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontSemi,
// //                     GlobalStyles.mb6,
// //                   ]}>
// //                   Delivery Date
// //                 </Text>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.font10,
// //                     GlobalStyles.textBlack,
// //                     GlobalStyles.fontMed,
// //                   ]}>
// //                   {Data.delivery_requested.delivery_date}
// //                 </Text>
// //               </View>
// //               <Pressable
// //                 onPress={() => {}}
// //                 style={[
// //                   GlobalStyles.editView,
// //                   GlobalStyles.flexRow,
// //                   GlobalStyles.justifyCenter,
// //                   GlobalStyles.alignCenter,
// //                 ]}>
// //                 <Text
// //                   style={[
// //                     GlobalStyles.textPri,
// //                     GlobalStyles.font10,
// //                     GlobalStyles.fontMed,
// //                   ]}>
// //                   Edit
// //                 </Text>
// //               </Pressable>
// //             </View>
// //           </View>
// //           <View style={[GlobalStyles.addressBlk, GlobalStyles.padh0]}>
// //             <View style={[GlobalStyles.padH15, GlobalStyles.padb15]}>
// //               <View style={GlobalStyles.bottomLineOrderCared1}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text style={[GlobalStyles.orderDetailCardText]}>
// //                       Estimated Subtotal
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text style={GlobalStyles.orderDetailCardText}>AED</Text>
// //                 </View>
// //               </View>
// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.paddingThree,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text style={[GlobalStyles.orderDetailCardText]}>
// //                       Estimated Delivery Fee
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text style={GlobalStyles.orderDetailCardText}>
// //                     AED {invoicedata.delivery_fee}
// //                   </Text>
// //                 </View>
// //               </View>
// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.paddingThree,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text style={[GlobalStyles.orderDetailCardText]}>
// //                       VAT(5%)
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text style={GlobalStyles.orderDetailCardText}>
// //                     AED {invoicedata.vat_amount}
// //                   </Text>
// //                 </View>
// //               </View>
// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.marginTopSeven,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text
// //                       style={[
// //                         GlobalStyles.orderDetailCardHeading,
// //                         GlobalStyles.textPri,
// //                       ]}>
// //                       Estimated total
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text
// //                     style={[
// //                       GlobalStyles.orderDetailCardHeading,
// //                       GlobalStyles.textPri,
// //                     ]}>
// //                     AED {invoicedata.total_net_amount}
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>
// //             <View style={GlobalStyles.orderDetailFlexView} />
// //             <View style={[GlobalStyles.padH15, GlobalStyles.padt8]}>
// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.marginTopSeven,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text
// //                       style={[
// //                         GlobalStyles.orderDetailCardHeading,
// //                         GlobalStyles.textPri,
// //                       ]}>
// //                       STATUS
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   {invoicedata.status_name == "paid" ? (
// //                     <Text
// //                       style={[
// //                         GlobalStyles.orderDetailCardHeading,
// //                         GlobalStyles.textPri,
// //                       ]}>
// //                       {invoicedata.status_name}
// //                     </Text>
// //                   ) : (
// //                     <Text
// //                       style={[
// //                         GlobalStyles.orderDetailCardHeading,
// //                         GlobalStyles.textred,
// //                       ]}>
// //                       {invoicedata.status_name}
// //                     </Text>
// //                   )}
// //                 </View>
// //               </View>

// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.paddingThree,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text style={[GlobalStyles.orderDetailCardText]}>
// //                       PAID AMOUNT
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text style={GlobalStyles.orderDetailCardText}>
// //                     AED {invoicedata.total_payable_amount}
// //                   </Text>
// //                 </View>
// //               </View>

// //               <View
// //                 style={[
// //                   GlobalStyles.bottomLineOrderCared1,
// //                   GlobalStyles.paddingThree,
// //                 ]}>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <View style={GlobalStyles.orderDetailcardView}>
// //                     <Text style={[GlobalStyles.orderDetailCardText]}>
// //                       REMAINING AMOUNT
// //                     </Text>
// //                   </View>
// //                 </View>
// //                 <View style={GlobalStyles.justifyContentCenter}>
// //                   <Text style={GlobalStyles.orderDetailCardText}>
// //                     AED {invoicedata.pending_amount}
// //                   </Text>
// //                 </View>
// //               </View>
// //             </View>
// //           </View>
// //           <Pressable onPress={(invoicedata) => openResume(invoicedata)}>
// //             <View
// //               style={[
// //                 GlobalStyles.marginTopSix,
// //                 GlobalStyles.onPressMarkReceived,
// //                 GlobalStyles.width100,
// //                 GlobalStyles.flexRow,
// //                 GlobalStyles.alignCenter,
// //                 GlobalStyles.justifyCenter,
// //               ]}>
// //               <Text style={GlobalStyles.onPressedOrderText}>
// //                 Download Invoice
// //               </Text>
// //             </View>
// //           </Pressable>
// //         </View>
// //       </SafeAreaView>
// //     </ScrollView>
// //   );
// // };

// // export default DetailedInvoicePage;

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
// import api from "../Services/API/CallingApi";
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
//     // console.log(myJson, "accesstoken");

//     const result = await api.getInvoiceDetails(
//       accesstoken,
//       endPoint.invoice_detail_List,
//       myJson
//     );
//     if (result.success) {
//       // console.log(result.data.invoice, "myJsondatar");
//       // console.log(result.data.invoice.link, "mylink");
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

import React from "react";
import { View, Text } from "react-native";

export default function DetailedInvoicePage({ navigation }) {
  return (
    <View>
      <Text>DetailedInvoicePage</Text>
    </View>
  );
}
