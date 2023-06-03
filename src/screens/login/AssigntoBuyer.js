/** @format */

import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "../../../assets/css/styles";
import CheckBox from "../../components/form/CheckBox";
import { Button } from "react-native-paper";
import AddSubCatalogue from "./AddSubCatalogue";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import { ScrollView } from "react-native-gesture-handler";
import BackArrow from "../../../assets/images/icons/BackArrow";

export default function AssignedtoBuyer({ navigation, route }) {
  console.log(route?.params,'route?.params?.SelectedbuyerData')
  const [buyerData, setBuyerData] = useState(route?.params?.buyersdata)
  const [buyermgs,setBuyermgs] = useState('')
  const[selectedBuyersData,setselectedBuyersData]= useState([]);
  const [selectedBuyers, setSelectedBuyers] = useState(route?.params?.SelectedbuyerData ? route?.params?.SelectedbuyerData : []);  
  const [selectedCount, setSelectedCount] = useState(0);
  const [saveselectedBuyers, setSaveselectedBuyers] = useState([]);
  const [prevSelectedBuyers, setprevSelectedBuyers] = useState([]);
  const maxSelection = selectedCount;
  const selectedValues = selectedBuyers;
  const refRBSheet = useRef();
  const [subCatalogueError, setsubCatalogueError] = useState("");

  const handleCheckBoxPress = (buyerId) => {
    console.log(buyerId, 'buyerId', selectedBuyers?.length);
    if (selectedBuyers?.length > 0 && selectedBuyers?.find((id) => id._id === buyerId._id)) {
      setSelectedBuyers(selectedBuyers?.filter((id) => id._id !== buyerId._id));
    } else {
      console.log('else cond');
      setSelectedBuyers((prevSelectedBuyers) => [...prevSelectedBuyers, buyerId]);
      console.log('select buer',selectedBuyers)
    }
    
  };
  



  const onAddBuyers = async (buyerids) => {
    if(buyerids.length > 0){
      const jsonValue = await AsyncStorage.getItem("UserToken");
      let supplierId = await AsyncStorage.getItem("userTypeId");
      let usertype = await AsyncStorage.getItem("usertype");
      const buyerIds = selectedBuyers.map(item => item._id);

      let token = jsonValue;
      let myJson = {
          buyer_id: buyerIds,
          supplier_id: supplierId,
          user_type: usertype,
          platform: "mobile"
      };
      const result = await api.addbuyers(token, endPoint.add_buyers,myJson);
      if (result.success === "1" && route?.params?.edit_buyer != 'edit_buyer') {
        setselectedBuyersData(result.data)
        console.log(route?.params?.sku_edit_data,"route?.params?.sku_edit_data")
        navigation.navigate("AddSubCatalogue",{SelectedbuyerData:selectedBuyers,edit_subcat:route?.params?.sku_edit_data});

      } else if(route?.params?.edit_buyer === 'edit_buyer') {
          navigation.navigate('EditSubCatalogue', {SelectedbuyerData:selectedBuyers,SelectedEntireData:result.data,edit_subcat:route?.params?.sku_edit_data})

      } else {
        setsubCatalogueError(result.message)
        refRBSheet.current.open()
        setBuyermgs(result.message);
        //  refRBSheet1.current.open();
      }
    } else {
      Alert.alert("Please select atleast one buyer")
    }
  };

  return (
    <>
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
              <Text style={GlobalStyles.menuText}>Assign Buyer</Text>
            </View>
          </View>
        </View>

        <View style={[GlobalStyles.addSkuCon, GlobalStyles.width100]}>
          <FlatList
            data={buyerData}
            keyExtractor={(item) => item._id}
            //   showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (
              <View style={[GlobalStyles.skuCard, GlobalStyles.flexRow, GlobalStyles.alignStart]}>

                <View style={[GlobalStyles.skulft]}>
                 
                  <TouchableOpacity onPress={() => handleCheckBoxPress(item)}>
                    <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                      {selectedBuyers?.length > 0 && selectedBuyers?.some(
                        (selectedItem) => selectedItem._id === item._id) && (
                          <View style={GlobalStyles.checkTick}></View>
                        )}
                    </View>
                  </TouchableOpacity>

                </View>

                <View style={[GlobalStyles.skurgt]}>
                  <Text style={[GlobalStyles.font12, GlobalStyles.fontBold, GlobalStyles.textBlack]}>
                    {item.company_name || item.buyer_name ? item.company_name || item.buyer_name : "NA"}
                  </Text>                  
                  <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.company_registration_no}</Text>
                </View>

                {/* <View style={GlobalStyles.paymentCardContainer}>
                  <ScrollView>
                    <View style={GlobalStyles.allOrderCardInnerDimension}>
                      <View
                        style={[
                          GlobalStyles.changeFlexDirection,
                          GlobalStyles.justifyContent,
                        ]}
                      >
                        <View style={{ flex: 4 }}>
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}>
                              <View style={{ width: "75%" }}>
                                <Text style={GlobalStyles.orderCardHeading}>
                                  {item.company_name ? item.company_name : item.buyer_name}
                                </Text>
                              </View>
                            </View>
                            <View style={GlobalStyles.outletEmailView}>
                              <View>
                                <Text style={GlobalStyles.outletEmailText}>
                                  {item.company_registration_no}
                                </Text>
                              </View>
                            </View> */}
                {/* Rest of the content */}
                {/* </View>
                          <View style={GlobalStyles.bottomLineOutletcard}>
                            <View style={GlobalStyles.justifyContentCenter}>
                              <View style={GlobalStyles.outletEmailView}>
                                <View style={{ width: "70%" }}>
                                  <Text style={GlobalStyles.emailText}> */}
                {/* {item.on_boarding_status_name} */}
                {/* </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View> */}
                {/* Rest of the items in the loop */}
                {/* </View>
                  </ScrollView>
                </View> */}
                {/* {
                  index === buyerData.length - 1 &&
                  <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
                    <View style={[styles.width50, styles.pr15]}>
                      <TouchableOpacity onPress={() => {
                        onAddBuyers(selectedValues);
                      }}>
                        <Button
                          style={[
                            styles.primaryBg,
                            styles.saveBtn,
                            styles.width100,
                            styles.flexRow,
                            styles.alignCenter,
                            styles.justifyCenter,
                          ]}>
                          <Text
                            style={[
                              styles.font15,
                              styles.letterSpa33,
                              styles.textWhite,
                            ]}>
                            Submit
                          </Text>
                        </Button>
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.width50, styles.pl15]}>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Button
                          style={[
                            styles.cancelStyle,
                            styles.saveBtn,
                            styles.width100,
                            styles.flexRow,
                            styles.alignCenter,
                            styles.justifyCenter,
                          ]}>
                          <Text
                            style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                            Cancel
                          </Text>
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </View>
                } */}

              </View>


            )}
          // ListEmptyComponent={isLoading ? null : renderEmpty}
          />
        </View>

        <View style={[styles.flexRow, styles.alignCenter, GlobalStyles.saveButtonFooter, GlobalStyles.whiteBg]}>
          <View style={[styles.width50, styles.pr8]}>
            <TouchableOpacity onPress={() => {
              onAddBuyers(selectedValues);
            }}>
              <Button
                style={[
                  styles.primaryBg,
                  styles.saveBtn,
                  styles.width100,
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                ]} onPress={() => {
                  onAddBuyers(selectedValues);
                }}>
                <Text
                  style={[
                    styles.font15,
                    styles.letterSpa33,
                    styles.textWhite,
                  ]}>
                  Submit
                </Text>
              </Button>
            </TouchableOpacity>
          </View>
          <View style={[styles.width50, styles.pl8]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Button
                style={[
                  styles.cancelStyle,
                  styles.saveBtn,
                  styles.width100,
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                ]}>
                <Text
                  style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                  Cancel
                </Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>



      <RBSheet
        ref={refRBSheet}
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
            {subCatalogueError}
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => refRBSheet.current.close()}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* error Popup Ends */}
      </RBSheet>
    </>



  );

};



