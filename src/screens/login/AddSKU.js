/** @format */

import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import AddSubCatalogue from "./AddSubCatalogue";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import Star from "../../../assets/images/icons/Star";
import EditSubCatalogue from "./EditSubCatalogue";
export default function AddSKU({ navigation, route }) {

  const [SKUData, setSKUData] = useState(route?.params?.skudata)
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedSKUS, setSelectedSKUS] = useState(route?.params?.selectedSKUSdata ? route?.params?.selectedSKUSdata : []);

  // const handleCheckBoxPress = (buyerId) => {
  //   if (selectedSKUS.includes(buyerId)) {
  //     setSelectedSKUs(selectedSKUS.filter((id) => id !== buyerId));
  //   } else {
  //     setSelectedSKUs((prevselectedSKUS) => [...prevselectedSKUS, buyerId]);
  //   }
  // };

  const handleCheckBoxPress = (skuId) => {

    if (selectedSKUS.includes(skuId)) {
      setSelectedSKUS(selectedSKUS.filter((id) => id._id !== skuId._id));
    } else {
      setSelectedSKUS((prevSelectedSKUS) => [...prevSelectedSKUS, skuId]);
    }
  };
  const onSubmitSku = () => {
    if (selectedSKUS.length > 0 && route?.params?.edit_sku != "edit_sku") {
      navigation.navigate('AddSubCatalogue', { selectedSKUS: selectedSKUS, SelectedbuyerData: route?.params?.SelectedbuyerData })
    } else if (route?.params?.edit_sku === 'edit_sku') {
      navigation.navigate('EditSubCatalogue', { edit_subcat: selectedSKUS, SelectedbuyerData: route?.params?.SelectedbuyerData, edit_subData: route?.params?.edit_subData })
    } else {
      alert("Please select atleast one sku")
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
              <Text style={GlobalStyles.menuText}>Add Sku</Text>
            </View>
          </View>
        </View>
        <View style={[GlobalStyles.addSkuCon, GlobalStyles.width100]}>
          <FlatList
            data={SKUData}
            keyExtractor={(item) => item._id}
            //   showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) => (
              <View style={[GlobalStyles.skuCard, GlobalStyles.flexRow, GlobalStyles.alignStart]}>
                <View style={[GlobalStyles.skulft]}>
                  {/* <CheckBox
                  onPress={() => handleCheckBoxPress(item)}
                  isChecked={selectedSKUS.some(
                    (selectedItem) => selectedItem._id === item._id
                  )}
                /> */}
<TouchableOpacity onPress={() => handleCheckBoxPress(item)}>
  <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
    {selectedSKUS.some((selectedItem) => selectedItem._id === item._id) && (
      <View style={GlobalStyles.checkTick}></View>
    )}
  </View>
</TouchableOpacity>

                </View>

                <View style={[GlobalStyles.skurgt]}>
                  <Text style={[GlobalStyles.font12, GlobalStyles.fontBold, GlobalStyles.textBlack]}>{item.product_name}</Text>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.category_name}</Text>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.mb2]}>
                    <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Product Code : {item.product_code}</Text>
                    <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Sub Category : {item.subcategory_name}</Text>
                  </View>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width33, GlobalStyles.mb2]}>SKU : {item.option}</Text>
                  <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width33, GlobalStyles.mb2]}>List Price : {item.price}</Text>
                </View>
                {/* {
                index === SKUData.length - 1 &&
                <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
                  <View style={[styles.width50, styles.pr15]}>
                    <TouchableOpacity
                      onPress={() =>
                        // navigation.navigate('AddSubCatalogue', { selectedSKUS })
                        onSubmitSku()
                      }
                    >
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

          />



        </View>
        <View style={[styles.flexRow, styles.alignCenter, GlobalStyles.saveButtonFooter, GlobalStyles.whiteBg]}>
          <View style={[styles.width50, styles.pr8]}>
            <TouchableOpacity
              onPress={() =>
                // navigation.navigate('AddSubCatalogue', { selectedSKUS })
                onSubmitSku()
              }
            >
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
    </>



  );
};


