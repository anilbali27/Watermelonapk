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
import Icon from "react-native-vector-icons/AntDesign";
import DateTimePicker from "react-native-neat-date-picker";
import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import { useForm, Controller } from "react-hook-form";
import ModalSelector from "react-native-modal-selector";
import styles from "../../../assets/css/styles";
import DropDown from "../../../assets/images/icons/DropDown";
import moment from "moment";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import { Fontisto } from "@expo/vector-icons";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
import AddCatalogueScreen from "../login/AddCatalogue";
// import DatePicker from "react-native-neat-date-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import { Row } from "native-base";

const AdjustInventory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const [subCategoryData, setSubCategoryData] = useState("");
  const [invError, setInvError] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [productKey, setproductKey] = useState("Select");
  const [product, setproduct] = useState("0");
  const [warehouseKey, setWarehouseKey] = useState("Select");
  const [warehouse, setWarehouse] = useState("Select");
  const [skuKey, setSkuKey] = useState("Select");
  const [sku, setSku] = useState("Select");
  const [selectedDate, setSelectedDate] = React.useState(
    moment().format("DD-MM-YYYY")
  );
  const [typeKey, setTypeKey] = useState(0);
  const [type, setType] = useState("Select");
  const [warehouseData, setWarehouseData] = useState([]);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] =
    React.useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [supplierid, setsupplierid] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const isFocused = useIsFocused();

  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [date, setDate] = useState("");
  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  const [Productsdata, setProductsdata] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [quantity, setquantity] = useState("");
  const [filterdData, setfilterdData] = useState([]);
  const [countryCode1, setcountryCode] = useState("Select");
  const [countrykey, setcountrykey] = useState("Select");
  const [skuData, setSkuData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getWarehouse();
    getProducts();
    getTypeData();
  }, [isFocused]);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (date: any) => {
    const selDate = moment(date.dateString).format("DD-MM-YYYY");
    setSelectedDate(selDate);
    hideDateTimePicker();
  };

  const getProducts = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      user_type_id: id,
    };
    const result = await api.getProduct(token, endPoint.get_products, myJson);

    if (result) {
      setProductsdata(result.data);
      setfilterdData(result.data);
    } else {
      setProductsdata([]);
    }
  };
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
  const getTypeData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      end: 10,
      keyword: "",
      name: "stocktype",
      sort_by: "",
      sort_method: "",
      start: 0,
      status: "1",
    };
    const result = await api.getType(token, endPoint.get_Type, myJson);
    if (result) {
      setTypeData(result.data);
    } else {
      setTypeData([]);
    }
  };
  const warehouseDataArray = warehouseData.map((warehouse, index) => {
    let newData = {
      key: index + 1,
      label: warehouse.warehouse_name,
      value: warehouse._id,
    };
    return newData;
  });

  const productDataArray = Productsdata.map((product, index) => {
    let newData = {
      key: index + 1,
      label: product.product_name,
      value: product.product_code,
    };
    return newData;
  });
  const filterSKUDATA = (product_na) => {
    const filter_prdct = Productsdata.filter(
      (item) => item.product_name === product_na
    );
    if (filter_prdct) {
      const skuDataArray1 = filter_prdct.map((uom, index) => {
        let newData = {
          key: index + 1,
          label: uom.base_uom,
          value: uom.base_uom,
        };
        return newData;
      });
      setSkuData(skuDataArray1);
      setCategoryData(filter_prdct[0].category_name);
      setCategoryId(filter_prdct[0].category_id);
      setSubCategoryData(filter_prdct[0].subcategory_name);
      setSubcategoryId(filter_prdct[0].subcategory_id);
      setsupplierid(filter_prdct[0].supplier_product_code);
    }
  };

  const listDataArray = typeData.map((type, index) => {
    let newData = {
      key: index + 1,
      label: type.value,
      value: type.value,
    };
    return newData;
  });

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;

    var myJson = {
      catalogue_id: product,
      catalogue_name: productKey,
      category_id: categoryId,
      category_name: categoryData,
      product_code: product,
      product_uom: sku,
      quantity: quantity,
      sku_id: sku,
      sku_name: sku,
      stock_date: selectedDate,
      subcategory_id: subcategoryId,
      subcategory_name: subCategoryData,
      supplier_id: id,
      supplier_product_code: supplierid,
      type: type,
      warehouse_id: warehouseKey,
      warehouse_name: warehouse,
    };
    const result = await api.createInventory(
      token,
      endPoint.create_Inventory,
      myJson
    );
    if (result.success === "1") {
      refRBSheet.current.open();
      // resetForm();
    } else {
      setInvError(result.message);
      refRBSheet1.current.open();
    }
  };

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false);
  };

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false);

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and EndDateString
    setDate(output.dateString);
  };
  const colorOptions = {
    headerColor: "#257FF7",
    backgroundColor: "#fff",
    weekDaysColor: "#257FF7",
    selectedDateBackgroundColor: "#257FF7",
    confirmButtonColor: "#257FF7",
  };
  return (
    <View style={GlobalStyles.orderContainer}>
      <DateTimePicker
        mode='single'
        colorOptions={colorOptions}
        isVisible={isDateTimePickerVisible}
        minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
      <View style={GlobalStyles.paymentHeaderView}>
        <View style={GlobalStyles.paymentHeaderPaddingView}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={{ justifyContent: "center" }}>
              <Pressable
                onPress={() => {
                  //   navigation.navigate("DrawerNavigationRoutes");
                  navigation.goBack();
                }}>
                <BackArrow />
              </Pressable>
            </View>
            <Text style={GlobalStyles.menuText}> Add Inventory</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          height: 38,
          width: "100%",
          paddingLeft: 19,
          paddingRight: 18,
          marginTop: 19,
        }}>
        {/* product */}

        <View style={[styles.mb30, styles.width100]}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Product
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <DropDownIcon style={[styles.modalDropDown]} />
            <Controller
              name='products'
              control={control}
              rules={{ required: "Product is required." }}
              render={(props) => (
                <ModalSelector
                  data={productDataArray}
                  initValue={productKey}
                  selectStyle={[
                    styles.inputStyle,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyStart,
                    errors && errors.products && styles.borderRed,
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
                      setproduct(option.value);
                      setproductKey(option.label);
                      filterSKUDATA(option.label);
                      props.field.onChange(option.value);
                      setSelectedProduct(option.value);
                    }
                  }}
                  value={productKey}
                />
              )}
            />
          </View>
          {errors && errors.products && (
            <Text style={[styles.errorMsg]}>Product is required.</Text>
          )}
        </View>
        {/* sku */}

        <View style={[styles.mb30, styles.width100]}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            SKU
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <DropDownIcon style={[styles.modalDropDown]} />
            <Controller
              name='sku'
              control={control}
              rules={{ required: "Sku is required." }}
              render={(props) => (
                <ModalSelector
                  data={skuData}
                  initValue={sku}
                  selectStyle={[
                    styles.inputStyle,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyStart,
                    errors && errors.sku && styles.borderRed,
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
                      setSku(option.label);
                      setSkuKey(option.value);
                      props.field.onChange(option.value);
                    }
                  }}
                  value={sku}
                />
              )}
            />
          </View>
          {errors && errors.sku && (
            <Text style={[styles.errorMsg]}>Sku is required.</Text>
          )}
        </View>
        {/* Category */}
        {selectedProduct && (
          <View style={[styles.mb30, styles.width100]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Category
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <TextInput
              style={[styles.inputStyle]}
              textAlignVertical='top'
              editable={false}
              value={categoryData}
            />
          </View>
        )}
        {/* End Category */}
        {/* SubCategory */}
        {selectedProduct && (
          <View style={[styles.mb30, styles.width100]}>
            <Text
              style={[
                styles.labelText,
                styles.font12,
                styles.fontMed,
                styles.mb4,
              ]}>
              Sub Category
              <Text style={[styles.font12, styles.textPri1]}>*</Text>
            </Text>
            <TextInput
              style={[styles.inputStyle]}
              textAlignVertical='top'
              editable={false}
              value={subCategoryData}
            />
          </View>
        )}
        {/* endSubcategory */}
        {/*  Select Warehouse Input */}
        <View style={[styles.mb30, styles.width100]}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Warehouse
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <DropDownIcon style={[styles.modalDropDown]} />
            <Controller
              name='warehouse'
              control={control}
              rules={{ required: "Warehouse is required." }}
              render={(props) => (
                <ModalSelector
                  data={warehouseDataArray}
                  initValue={warehouse}
                  selectStyle={[
                    styles.inputStyle,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyStart,
                    errors && errors.warehouse && styles.borderRed,
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
                      props.field.onChange(option.value);
                    }
                  }}
                  value={warehouse}
                  // onChange={(value) => {
                />
              )}
            />
          </View>
          {errors && errors.warehouse && (
            <Text style={[styles.errorMsg]}>Warehouse is required.</Text>
          )}
        </View>
        {/*  Select Warehouse Input - Ends */}
        {/* List */}
        <View style={[styles.mb30, styles.width100]}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Type
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <DropDownIcon style={[styles.modalDropDown]} />
            <Controller
              name='type'
              control={control}
              rules={{ required: "Type is required." }}
              render={(props) => (
                <ModalSelector
                  data={listDataArray}
                  initValue={type}
                  selectStyle={[
                    styles.inputStyle,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyStart,
                    errors && errors.type && styles.borderRed,
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
                      setType(option.label);
                      setTypeKey(option.value);
                      props.field.onChange(option.value);
                    }
                  }}
                  value={type}
                />
              )}
            />
          </View>
          {errors && errors.type && (
            <Text style={[styles.errorMsg]}>Type is required.</Text>
          )}
        </View>
        {/* end list */}
        {/* Date */}

        <View style={[styles.marBtm12, styles.wdth100]}>
          <Text style={styles.craeteLabel}>Date</Text>
          <TouchableOpacity
            onPress={showDateTimePicker}
            style={[styles.createInputStyles, styles.flexRowbet]}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text>{selectedDate}</Text>
              </View>
              <View>
                <Fontisto name='date' size={22} color='#D0D6DD' />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/* Quantity false */}
        <View style={[styles.mb30, styles.width100]}>
          <Text
            style={[
              styles.labelText,
              styles.font12,
              styles.fontMed,
              styles.mb4,
            ]}>
            Quantity
            <Text style={[styles.font12, styles.textPri1]}>*</Text>
          </Text>
          <View>
            <Controller
              name='quantity'
              control={control}
              rules={{ required: "Quantity is required." }}
              render={(props) => (
                <TextInput
                  style={[
                    styles.inputStyle,
                    errors && errors.quantity && styles.borderRed,
                    ,
                  ]}
                  textAlignVertical='top'
                  multiline={true}
                  keyboardType={"numeric"}
                  onChangeText={(quantity) => {
                    props.field.onChange(quantity);
                    setquantity(quantity);
                  }}
                  value={quantity}
                />
              )}
            />
          </View>
          {errors && errors.quantity && (
            <Text style={[styles.errorMsg]}>Quantity is required.</Text>
          )}
        </View>

        {/* footer */}
        <View
          style={[
            styles.flexRow,
            styles.defaultBottomView,
            styles.justifyBetween,
          ]}>
          <View style={GlobalStyles.defaultSubmitBotton}>
            <TouchableOpacity
              style={[
                styles.primaryBg,
                styles.saveBtn,
                styles.width100,
                styles.flexRow,
                styles.alignCenter,
                styles.justifyCenter,
                styles.defaultBottom,
              ]}
              onPress={handleSubmit(onSubmit)}>
              <Text
                style={[styles.font15, styles.letterSpa33, styles.textWhite]}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={GlobalStyles.defaultSubmitCancel}>
            <TouchableOpacity
              style={[
                styles.cancelStyle,
                styles.saveBtn,
                styles.width100,
                styles.flexRow,
                styles.alignCenter,
                styles.justifyCenter,
                styles.defaultBottom,
              ]}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={GlobalStyles.defaultSubmitCancel}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddCatalogueScreen")}>
            <Text>Add Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
            Inventory Added Successfully
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Your inventory added successfully
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
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                onPress={() => navigation.goBack()}>
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
            {invError}
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
                onPress={() => navigation.goBack()}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* error Popup Ends */}
      </RBSheet>
    </View>
  );
};

export default AdjustInventory;
