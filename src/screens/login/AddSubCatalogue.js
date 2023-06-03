/** @format */
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import {
  Alert,
  FlatList,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
  Animated,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
import CheckBox from "../../components/form/CheckBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
import GlobalStyles from "../../../assets/css/styles";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import WhiteLeftArrow from "../../../assets/images/dashboard/white_left_arrow";
import Catelogue from "./Catelogue";
import AddSKU from "./AddSKU";
import AssignedtoBuyer from "./AssigntoBuyer";
import { COLORS } from "../../constant/Colors";

export default function AddSubCatalogue({ navigation, route }) {

  const [buyerId, setBuyerId] = useState(route?.params?.selectedValues)

  const [selectedSKUS, setSelectedSKUS] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();

  const [selectedIds, setSelectedIds] = useState('');
  const [tempselectedIds, setTempSelectedIds] = useState([]);
  const [value1, setValue1] = useState("");

  const isFocused = useIsFocused();
  const [animationValue] = useState(() => new Animated.Value(0));
  const [tierKey, settierKey] = useState("")
  const [tiername, setTiername] = useState("")

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });
  const [amountTypekey, setamountTypekey] = useState(0);
  const [amountType, setamountType] = useState("Select");
  const [subCatalogueName, setSubCatalogueName] = useState("");
  const [subCatalogueNumber, setSubCatalogueNumber] = useState("");
  const [priceingMethod, setPricingMethod] = useState("Select");
  const [tiervalue, settiervalue] = useState("Select");
  const [subCatalogueError, setsubCatalogueError] = useState("");
  const [tierdata, settierdata] = useState([]);
  const [filterdData1, setfilterdData1] = useState([]);
  const [skudata, setskudata] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [buyersdata, setbuyersdata] = useState([]);
  const [page, setPage] = useState(1);
  const [assignedBuyerbtn, setAssignedBuyerbtn] = useState(false);
  const [addSKUbtn, setAddSKUbtn] = useState(false);


  //Success Pop up
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  useEffect(() => {
    getallskus()
    getTiers();
    getAllBuyerList()
  }, []);


  const getAllBuyerList = async () => {
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let token = await AsyncStorage.getItem("UserToken");

    let myJson = {
      supplier_id: supplierId,
      page: 1,
    };
    const result = await api.CreateMasterData(
      endPoint.buyer_list,
      token,
      myJson
    );
    if (result) {
      setbuyersdata(result.data);
      // setPage(page + 1);

    } else {
      setbuyersdata([]);
    }
  };
  const AmountTypeData = [
    { key: 0, label: "Select", value: 0 },
    { key: 1, label: "Increase", value: 1 },
    { key: 2, label: "Decrease", value: 2 },
  ];
  const handleCheckBoxPress = (item) => {
    if (selectedSKUS.some((selectedItem) => selectedItem._id === item._id)) {
      setSelectedSKUS((prevSelectedSKUS) =>
        prevSelectedSKUS.filter((selectedItem) => selectedItem._id !== item._id)
      );
    } else {
      setSelectedSKUS((prevSelectedSKUS) => [...prevSelectedSKUS, item]);
    }
  };
  const getTiers = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      supplier_id: id,

    };
    const result = await api.getTier(token, endPoint.get_tiers, myJson);

    if (result) {
      settierdata(result.data);
      setfilterdData1(result.data);
    } else {
      settierdata([]);
    }
  };

  const getallskus = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      user_type_id: id,

    };
    const result = await api.getAllSKUS(token, endPoint.get_all_skus, myJson);
    if (result) {
      setskudata(result.data);

    } else {
      setskudata([]);
    }
  };

  const deleteSKUS = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      sku_id: selectedSKUS,

    };
    const result = await api.deleteSKUS(token, endPoint.delete_sku, myJson);
    if (result) {
    } else {

    }
  };
  const onSubmit1 = async () => {
    navigation.goBack();
  };
  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    const buyer_ids = route?.params?.SelectedbuyerData.map(item => item._id);
    var myJson = {
      subcatalogue_no: subCatalogueNumber,
      subcatalogue_name: subCatalogueName,
      priceing_method: priceingMethod,
      tier_id: "647af75024631f4316071644",
      tier_value: "5",
      manual_value: value1,
      status: 1,
      sku_id: route?.params?.selectedSKUS ? route?.params?.selectedSKUS : (route?.params?.edit_subcat ? route?.params?.edit_subcat : {}),

      // sku_id: route?.params?.selectedSKUS ? route?.params?.selectedSKUS ? route?.params?.edit_subcat : {},
      buyer_id: buyer_ids ?? {},
      user_type_id: id,
    };
    console.log(myJson, 'add sub catelogue')
    const result = await api.createSubCatalogue(
      token,
      endPoint.create_subcatalogue,
      myJson
    );
    console.log(result,"SUBCATALOGUE")
    if (result.success === "1") {
      refRBSheet.current.open();
      resetForm();
    } else {
      setsubCatalogueError(result.message);
      refRBSheet1.current.open();
    }
  };

  const resetForm = () => {
    setSubCatalogueNumber("");
    setSubCatalogueName(" ");
  };
  const addSKUbtnadd = () => {
    if (route?.params?.selectedSKUS?.length > 0) {
      navigation.push("AddSKU", {
        selectedSKUSdata: route?.params?.selectedSKUS,
        skudata: skudata,
        SelectedbuyerData: route?.params?.SelectedbuyerData ? route?.params?.SelectedbuyerData : []
      });
    } else {

      navigation.push("AddSKU", {
        skudata: skudata,
        selectedSKUSdata: route?.params?.edit_subcat,
        SelectedbuyerData: route?.params?.SelectedbuyerData ? route?.params?.SelectedbuyerData : []

      });
    }
  }

  const priceingMethodData = [

    { key: 1, label: "Tier Discount", value: 1 },
    { key: 2, label: "Manual Discount", value: 2 },
  ];

  const tierDataArray = tierdata.map((tier, index) => {
     let label = [];
    if (tier.amount_type === 'Discount') {
  label = `Decrease ` + tier.name + tier.discount_price + ('%');
    } else if (tier.amount_type === 'Additional Charges') {
      label = `Increase ` + tier.name + tier.discount_price + ('%');
    }
    let newData = {
      key: index + 1,
      label1: tier.name,
      value: tier.discount_price,
      label2: tier._id,
      label

    };
    return newData;
  });
  const handleSelectedIdsChange = useCallback((ids) => {
    setSelectedIds(ids);
  });

  return (
    <View style={[styles.width100, styles.flex1, styles.grayBg]}>
      <ScrollView style={[styles.grayBg, styles.width100]}>
        <View
          style={[
            styles.signupTitle,
            styles.mb28,
            styles.primaryBg,
            styles.flexRow,
            styles.alignCenter,
            styles.headerShadow,
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>

            <WhiteLeftArrow />
          </TouchableOpacity>
          <Text
            style={[
              styles.font16,
              styles.textWhite,
              styles.padl15,
              styles.fontMed,
            ]}>
            {" "}
            Add Sub Catalogue{" "}
          </Text>
        </View>

        <View style={[styles.ph18, styles.mb18, styles.width100]}>
          <View style={styles.mb12}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Sub Catalogue Name{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View>
              <Controller
                name='subCatalogueName'
                control={control}
                rules={{
                  required: "System generated product code is required.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                      styles.height39,
                      errors && errors.subCatalogueName && styles.borderRed,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(subCatalogueName) => {
                      setSubCatalogueName(subCatalogueName);
                      props.field.onChange(subCatalogueName);
                    }}
                    value={subCatalogueName}
                  />
                )}
              />
              {errors && errors.subCatalogueName && (
                <Text style={[styles.errorMsg]}>
                  Sub Catalogue Name is required.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.mb12}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Sub Catalogue No{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>

            <View>
              <Controller
                name='subCatalogueNumber'
                control={control}
                rules={{
                  required: "subCatalogueNumber is required.",
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                      styles.height39,
                      errors && errors.subCatalogueName && styles.borderRed,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(subCatalogueNumber) => {
                      setSubCatalogueNumber(subCatalogueNumber);
                      props.field.onChange(subCatalogueNumber);
                    }}
                    value={subCatalogueNumber}
                  />
                )}
              />
              {errors && errors.subCatalogueNumber && (
                <Text style={[styles.errorMsg]}>
                  Sub Catalogue Number is required.
                </Text>
              )}
            </View>
          </View>
          <View style={styles.mb12}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Priceing Method{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View>
              <DropDownIcon style={[styles.modalDropDown]} />

              <Controller
                name='priceingMethod'
                control={control}
                rules={{
                  required: "Value is required.",
                }}
                render={(props) => (

                  <ModalSelector
                    data={priceingMethodData}
                    initValue={priceingMethod}
                    selectStyle={[
                      styles.inputStyle,
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyStart,
                      styles.marBtm4,
                      styles.borderDefault,
                      styles.height39,
                      styles.borderRadius0,
                      errors && errors.priceingMethod && styles.borderRed,
                    ]}
                    initValueTextStyle={[
                      styles.font15,
                      styles.textBlack,
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
                        setPricingMethod(option.label);

                        props.field.onChange(option.value);
                      }
                    }}
                    value={priceingMethod}
                  />
                )}
              />

            </View>
            {errors && errors.priceingMethod && (
              <Text style={[styles.errorMsg]}>
                {" "}
                Priceing Method is required.
              </Text>
            )}
          </View>
          <>
            {priceingMethod === "Tier Discount" &&
              <View style={styles.mb12}>
                <Text
                  style={[
                    styles.textDefault,
                    styles.font12,
                    styles.fontMed,
                    styles.marBtm4,
                  ]}>
                  Tier Value{priceingMethod}
                  <Text style={[styles.textred, styles.font13]}>*</Text>
                </Text>
                <View>
                  <DropDownIcon style={[styles.modalDropDown]} />

                  <Controller
                    name='tiervalue'
                    control={control}
                    rules={{
                      required: "Tier Value is required.",
                    }}
                    render={(props) => (

                      <ModalSelector
                        data={tierDataArray}
                        initValue={tiervalue}
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          styles.marBtm4,
                          styles.borderDefault,
                          errors && errors.tiervalue && styles.borderRed,
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
                            settiervalue(option.label);
                            settierKey(option.value)
                            setTiername(option.label2)
                            props.field.onChange(option.value);
                          }
                        }}
                        value={tiervalue}
                      />
                    )}
                  />
                  {errors && errors.tiervalue && (
                    <Text style={[styles.errorMsg]}>
                      {" "}
                      Tier value is required.
                    </Text>
                  )}
                </View>
              </View>
            }
            {route?.params?.SelectedbuyerData &&
              <FlatList
                data={route?.params?.SelectedbuyerData}
                keyExtractor={(item) => item._id}
                //   showsVerticalScrollIndicator={false}

                renderItem={({ item, index }) => (
                  <View style={[styles.mb12]}>
                    <View style={[styles.flexRow, styles.alignCenter, styles.mb4]}>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack, GlobalStyles.fontMed]}>
                        Company Name :{" "}
                      </Text>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack]}>
                        {item?.buyer_name ? item?.buyer_name : 'NA'}

                      </Text>
                    </View>
                    <View style={[styles.flexRow, styles.alignCenter, styles.mb4]}>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack, GlobalStyles.fontMed]}>
                        Company Registration :{" "}
                      </Text>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack]}>
                        {item?.company_registration_no}
                      </Text>
                    </View>
                  </View>
                )}
              />
            }
            <View style={[styles.flexRow]}>
              <View style={[styles.width50, styles.pr8, styles.mb12]}>
              <TouchableOpacity
                onPress={() => { console.log(route?.params?.selectedSKUS,'guru'), navigation.push("AssignedtoBuyer", { buyersdata: buyersdata, SelectedbuyerData: route?.params?.SelectedbuyerData, sku_edit_data: route?.params?.selectedSKUS ? route?.params?.selectedSKUS : route?.params?.edit_subcat }) }}
              >
                  {/* <TouchableOpacity> */}
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
                      Assign to Buyer
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={[styles.width50, styles.pl8, styles.mb12]}>
                <TouchableOpacity
                  onPress={() => addSKUbtnadd()}

                // navigation.push("AddSKU", skudata)
                // onPress={() =>
                //   navigation.navigate('AddSKU', {skudata, selectedSKUS: route.params?.selectedSKUS })
                // }
                >
                  {/* <TouchableOpacity> */}
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
                      Add SKU
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={[styles.width50, styles.pr15, styles.mb12]}>
              <TouchableOpacity
             
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
                    View Assigned Buyer(s)
                  </Text>
                </Button>
              </TouchableOpacity>
            </View> */}
            {/* <View style={[styles.width50, styles.pr15, styles.mb12]}>
              <TouchableOpacity
                onPress={() => addSKUbtnadd()}

              // navigation.push("AddSKU", skudata)
              // onPress={() =>
              //   navigation.navigate('AddSKU', {skudata, selectedSKUS: route.params?.selectedSKUS })
              // }
              > */}
                {/* <TouchableOpacity> */}
                {/* <Button
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
                    Add SKU
                  </Text>
                </Button>
              </TouchableOpacity>
            </View> */}
            {/* <View style={[styles.width50, styles.pr15, styles.mb12]}>
              <TouchableOpacity
                onPress={() => {deleteSKUS(selectedSKUS)}}

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
                    Delete SKU
                  </Text>
                </Button>
              </TouchableOpacity>
            </View> */}
            {route?.params?.selectedSKUS &&
              <FlatList
                data={route?.params?.selectedSKUS}
                keyExtractor={(item) => item._id}
                //   showsVerticalScrollIndicator={false}

                renderItem={({ item, index }) => (
                  <View style={[GlobalStyles.skuCard, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                  <View style={[GlobalStyles.skulft]}>
                    {/* <CheckBox
                onPress={() => handleCheckBoxPress(item)}
                isChecked={selectedSKUS.some(
                  (selectedItem) => selectedItem._id === item._id
                )}
              /> */}

                    {/* <TouchableOpacity onPress={() => handleCheckBoxPress(item)} >
                      <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                        <View style={GlobalStyles.checkTick}></View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCheckBoxPress(item)}>
                  <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                    {selectedSKUS.some(
                      (selectedItem) => selectedItem._id === item._id) && (
                        <View style={GlobalStyles.checkTick}></View>
                      )}
                  </View>
                </TouchableOpacity> */}
                  </View>

                  <View style={[GlobalStyles.skurgt]}>
                    <Text style={[GlobalStyles.font12, GlobalStyles.fontBold, GlobalStyles.textBlack,GlobalStyles.mb2]}>{item.product_name}</Text>
                    {/* <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.category_name}</Text> */}
                    <View style={[GlobalStyles.flexRow, GlobalStyles.mb2]}>
                      <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Code : {item.product_code}</Text>
                      {/* <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Sub Category : {item.subcategory_name}</Text> */}
                    </View>
                    <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width33, GlobalStyles.mb2]}>SKU : {item.option}</Text>
                    <View style={[GlobalStyles.flexRow]}>
                      <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width33, GlobalStyles.mb2]}>List Price :{item.price}</Text>
                      {/* {priceingMethod === "Manual Discount" &&
                        <TouchableOpacity
                          onPress={() => refRBSheet2.current.open()}
                        >
                          <View style={{ marginRight: 20 }}>
                            <MaterialIcons
                              name='edit'
                              size={15}
                              color={COLORS.button}
                            />
                          </View>
                        </TouchableOpacity>
                      } */}
                    </View>
                  </View>

                </View>


                )}

              />


            }
            {route?.params?.edit_subcat &&
              <FlatList
                data={route?.params?.edit_subcat}
                keyExtractor={(item) => item._id}
                //   showsVerticalScrollIndicator={false}

                renderItem={({ item, index }) => (

                  <View style={[GlobalStyles.skuCard, GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                    <View style={[GlobalStyles.skulft]}>
                      {/* <CheckBox
                  onPress={() => handleCheckBoxPress(item)}
                  isChecked={selectedSKUS.some(
                    (selectedItem) => selectedItem._id === item._id
                  )}
                /> */}

                      {/* <TouchableOpacity onPress={() => handleCheckBoxPress(item)} >
                        <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                          <View style={GlobalStyles.checkTick}></View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleCheckBoxPress(item)}>
                    <View style={[GlobalStyles.skucheckbox, GlobalStyles.primaryBg]}>
                      {selectedSKUS.some(
                        (selectedItem) => selectedItem._id === item._id) && (
                          <View style={GlobalStyles.checkTick}></View>
                        )}
                    </View>ass
                  </TouchableOpacity> */}
                    </View>

                    <View style={[GlobalStyles.skurgt]}>
                      <Text style={[GlobalStyles.font12, GlobalStyles.fontBold, GlobalStyles.textBlack,GlobalStyles.mb2]}>{item.product_name}</Text>
                      {/* <Text style={[GlobalStyles.font10, GlobalStyles.textDefault, GlobalStyles.mb2]}>{item.category_name}</Text> */}
                      <View style={[GlobalStyles.flexRow, GlobalStyles.mb2]}>
                        <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Product Code : {item.product_code}</Text>
                        {/* <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width50, GlobalStyles.pr8]}>Sub Category : {item.subcategory_name}</Text> */}
                      </View>
                      <Text style={[GlobalStyles.font10, GlobalStyles.textBlack, GlobalStyles.width33, GlobalStyles.mb2]}>SKU : {item.option}</Text>
                      <View style={[GlobalStyles.flexRow]}>
                        <Text style={[GlobalStyles.font14, GlobalStyles.colorBlue, GlobalStyles.fontSemi]}>List Price : {item.price}</Text>
                        {/* {priceingMethod === "Manual Discount" &&
                          <TouchableOpacity
                            onPress={() => refRBSheet2.current.open()}
                          >
                            <View style={{ marginRight: 20 }}>
                              <MaterialIcons
                                name='edit'
                                size={15}
                                color={COLORS.button}
                              />
                            </View>
                          </TouchableOpacity>
                        } */}
                      </View>
                    </View>

                  </View>


                )}

              />

            }


            {/* <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
              <View style={[styles.width50, styles.pr15]}>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}> */}
                  {/* <TouchableOpacity> */}
                  {/* <Button
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
                <TouchableOpacity onPress={() => navigation.navigate('Catelogue')}>
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
            </View> */}

          </>
        </View>
      </ScrollView>
      <View style={[styles.flexRow, styles.alignCenter, styles.mt18, styles.saveButtonFooter, styles.whiteBg]}>
        <View style={[styles.width50, styles.pr8]}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            {/* <TouchableOpacity> */}
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
          <TouchableOpacity onPress={() => navigation.navigate('Catelogue')}>
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
      <View >
        <View >
          {!skudata ?? (
            <View>
              <ActivityIndicator color={COLORS.button} size='large' />
            </View>
          )}
          {skudata && addSKUbtn &&
            <FlatList
              data={skudata}
              keyExtractor={(item) => item._id}
              //   showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <AddSKU
                  product_name={item.product_name}
                  category_name={item.category_name}
                  subcategory_name={item.subcategory_name}
                  product_code={item.product_code}
                  option={item.option}
                  price={item.price}
                />
              )}
            />
          }
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
              Added Successfully
            </Text>
            <Text
              style={[
                styles.font15,
                styles.textBlack,
                styles.mb37,
                styles.textCenter,
              ]}>
              Your sub catalogue added successfully
            </Text>
            <View style={[styles.flexRow, styles.justifyCenter]}>
              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  styles.width50,
                  styles.flexRow,
                  styles.justifyCenter,
                ]}
                // onPress={() => {
                //   navigation.navigate("Catelogue", { category: "subcatlouge" });
                // }}
                // onPress={() => {
                //   navigation.navigate('Catelogue');
                // }}
                onPress={() => {
                  navigation.goBack();
                }}
                >
                <Text
                  style={[styles.font16, styles.textWhite, styles.letspa35]}
                  // onPress={() => {
                  //   navigation.navigate("Catelogue", { category: "subcatlouge" });
                  // }}
                  // onPress={() => {
                  //   navigation.navigate('Catelogue');
                  // }}
                  onPress={() => {
                    navigation.goBack();
                  }}
                  >
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
                  onPress={() => refRBSheet1.current.close()}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* error Popup Ends */}
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
          {/* error Popup */}
          <View
            style={[
              styles.flexColumn,
              styles.alignCenter,
              styles.justifyCenter,
              styles.padt30,
            ]}>
            <Text
              style={[
                styles.font22,
                styles.textBlack,
                styles.textCenter,
                styles.mb11,
                styles.fontBold,
              ]}>
              Manage Discount
            </Text>
            <View style={[styles.width100, styles.mb12]}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Select Amount Type{" "}
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>

                <DropDownIcon style={[styles.modalDropDown]} />
                <Controller
                  name='amountType'
                  control={control}
                  rules={{ required: "Amount type is required." }}
                  render={(props) => (
                    <ModalSelector
                      data={AmountTypeData}
                      initValue={amountType}
                      selectStyle={[
                        styles.inputStyle,
                        styles.flexRow,
                        styles.alignCenter,
                        styles.justifyStart,
                        styles.marBtm4,
                        styles.borderDefault,
                        styles.height39,
                        styles.borderRadius0,
                        errors && errors.amountType && styles.borderRed,
                      ]}
                      initValueTextStyle={[
                        styles.font15,
                        styles.textBlack,
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
                          setamountType(option.label);
                          setamountTypekey(option.value);
                          props.field.onChange(option.value);
                        }
                      }}
                      value={amountType}
                    />
                  )}
                />
              </View>
              {errors && errors.amountType && (
                <Text style={[styles.errorMsg]}>Amount type is required.</Text>
              )}
            </View>
            <View style={[styles.mb12, styles.width100]}>
              <Text
                style={[
                  styles.textDefault,
                  styles.font12,
                  styles.fontMed,
                  styles.marBtm4,
                ]}>
                Discount <Text style={[styles.textred, styles.font13]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='value1'
                  control={control}
                  rules={{
                    required: "Value is required.",
                  }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.borderRadius0,
                        styles.borderDefault,
                        styles.height39,
                        errors && errors.value1 && styles.borderRed,
                      ]}
                      keyboardType='numeric'
                      placeholderTextColor='#222B2E'
                      onChangeText={(value1) => {
                        setValue1(value1);
                        props.field.onChange(value1);
                      }}
                      value={value1}
                    />
                  )}
                />
                {errors && errors.value1 && (
                  <Text style={[styles.errorMsg]}>Tier name is required.</Text>
                )}
              </View>
            </View>
            <View style={[styles.flexRow, styles.justifyCenter, styles.mt18]}>
              <View style={[styles.width50, styles.padR8]}>
                <TouchableOpacity style={[styles.continueBtn, styles.flexRow, styles.justifyCenter]} onPress={() => refRBSheet2.current.close()}>
                  <Text style={[styles.font16, styles.textWhite, styles.letspa35]}>Submit</Text>
                </TouchableOpacity>

              </View>
              <View style={[styles.width50, styles.padL8]}>
                <TouchableOpacity style={[styles.continueBtn, styles.flexRow, styles.justifyCenter, styles.cancelStyle]} onPress={() => refRBSheet2.current.close()}>
                  <Text style={[styles.font16, styles.textPri, styles.letspa35]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          {/* error Popup Ends */}
        </RBSheet>
      </View>
    </View>
  );
}
