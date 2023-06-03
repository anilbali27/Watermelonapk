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
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import AllBuyersCard from "./AllBuyersCard";
import BackArrow from "../../../assets/images/icons/BackArrow";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import styles from "../../../assets/css/styles";
import CheckBox from "../../components/form/CheckBox";
import { Button } from "react-native-paper";
import BuyersScreen from "./Buyers";
import RBSheet from "react-native-raw-bottom-sheet";


export default function AddBuyersScreen({ navigation, route }) {
  const [buyersData, setBuyersData] = useState(route.params)
  const [selectedbuyers, setSelectedbuyers] = useState([])
  const handleCheckBoxPress = (buyerId) => {

    console.log(buyerId, "buyerIdbuyerIdbuyerId")
    if (selectedbuyers.includes(buyerId)) {
      setSelectedbuyers(selectedbuyers.filter((id) => id !== buyerId._id));
    } else {
      setSelectedbuyers((prevselectedbuyers) => [...prevselectedbuyers, buyerId]);
    }
    console.log(selectedbuyers, 'selectedbuyers')
  };

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const onAddBuyers = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let usertype = await AsyncStorage.getItem("usertype");
    const ids = selectedbuyers.map((item) => item._id);

    let token = jsonValue;
    let myJson = {
      buyer_id: ids,
      supplier_id:supplierId,
      user_type: 2,
      platform: "mobile"
    };
    console.log(myJson,"myJsonmyJsonmyJsonmyJsonmyJsonmyJson")
    const result = await api.addbuyers(token, endPoint.add_buyers, myJson);
    if (result.success === "1") {
       refRBSheet.current.open();
      
    } else {
      setBuyersData(result.message);
        console.log(result.message,"BUYER ALREADY EXIST")
       refRBSheet1.current.open();
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
              <Text style={GlobalStyles.menuText}>Add Buyer</Text>
            </View>
          </View>
        </View>

        <View style={[GlobalStyles.addSkuCon, GlobalStyles.width100]}>
          <FlatList
            data={buyersData}
            keyExtractor={(item) => item._id}
            //   showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (
              <View style={[GlobalStyles.skuCard, GlobalStyles.flexRow, GlobalStyles.alignStart]}>

                <View style={[GlobalStyles.skulft]}>
                  {/* <CheckBox
                            // onPress={() => handleCheckBoxPress(item)}
                            // isChecked={selectedBuyers.includes(item)}
                            onPress={() => handleCheckBoxPress(item)}
                            isChecked={selectedBuyers.some(
                              (selectedItem) => selectedItem._id === item._id
                            )}
                          />*/}
                  <TouchableOpacity onPress={() => handleCheckBoxPress(item)}>
                    <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                      {selectedbuyers.some(
                        (selectedItem) => selectedItem._id === item._id) && (
                          <View style={GlobalStyles.checkTick}></View>
                        )}
                    </View>
                  </TouchableOpacity>


                </View>

                <View style={[GlobalStyles.skurgt]}>
                  <Text style={[GlobalStyles.font12, GlobalStyles.fontBold, GlobalStyles.textBlack]}>{item.company_name ? item.company_name : item.buyer_name}</Text>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.email}</Text>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.on_boarding_status_name}</Text>

                </View>


              </View>


            )}
          // ListEmptyComponent={isLoading ? null : renderEmpty}
          />
        </View>

        <View style={[styles.flexRow, styles.alignCenter, GlobalStyles.saveButtonFooter, GlobalStyles.whiteBg]}>
          <View style={[styles.width50, styles.pr8]}>
            <TouchableOpacity onPress={() => {
              onAddBuyers(selectedbuyers);
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
           Buyer Added Successfully
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Your buyer added successfully
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => navigation.navigate('BuyersScreen')}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                
                onPress={() => navigation.navigate('BuyersScreen')}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* success Popup Ends */}
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
            {buyersData}
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity onPress={() => refRBSheet1.current.close()}
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}>
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => refRBSheet1.current.close()}>
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

