/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import GlobalStyles from "../../../assets/css/styles";
import Bell from "../../../assets/images/icons/Bell";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../../../assets/css/styles";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import api from "../../screens/Services/API/CallingApi";
import AllCataloguesCard from "./AllCataloguesCard";
import AllTiersCard from "./AllTiersCard";
import ImportCatalogueScreen from "./ImportCatalogueScreen";
import SubCatalogueCard from "./SubCatalogueCard";
import { useIsFocused } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
import FilterIcon from "../../../assets/images/dashboard/filter_icon.jsx";
import InputSearch from "../../../assets/images/dashboard/input_search_icon.jsx";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import { COLORS } from "../../constant/Colors";

export default function Catelogue({ navigation, route }) {
  const [Productsdata, setProductsdata] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [filterdData1, setfilterdData1] = useState([]);
  const [tierdata, settierdata] = useState([]);
  const [allCatalogues, setallCatalogues] = useState(true);
  const [tier, settier] = useState(false);
  const [subCatalogue, setsubCatalogue] = useState(false);
  const [importCatalogue, setimportCatalogue] = useState(false);
  const [search, setSearch] = useState("");
  const [myproducts, setmyproducts] = useState();
  const [mytiers, setmytiers] = useState();
  const [subCatDetails, setSubCatDetails] = useState([]);
  const [subdata, setSubdata] = useState([]);

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [catelogue, setCatelogue] = useState(false);
  const [subCatelogue, setSubCatelogue] = useState(false);
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTier, setIsLoadingisTier] = useState(false);
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedStatus2, setSelectedStatus2] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const { category } = route?.params || {};
  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });

  //clear filter
  const clearFilters = () => {
    setfilterdData(Productsdata);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedStatus(null);
    refRBSheet.current.close();
  };
  // alert(category)
  useEffect(() => {
    getProducts();
    getTiers();
    getSubCatalogueList();

    if (category === "subcatlouge") {
      onPressofSubCatalogue();
      setCatelogue(false);
      setsubCatalogue(true);
    }
    if (category === "tier") {
      onPressofTier();
      setCatelogue(false);
      setsubCatalogue(false);
      settier(true);
    }
  }, [isFocused]);

  const onPressofCatalogues = () => {
    settier(false);
    setsubCatalogue(false);
    setimportCatalogue(false);
    setallCatalogues(true);
  };

  const onPressofSubCatalogue = () => {
    settier(false);

    setimportCatalogue(false);
    setallCatalogues(false);
    setsubCatalogue(true);
  };

  const onPressofTier = () => {
    setimportCatalogue(false);
    setallCatalogues(false);
    setsubCatalogue(false);
    settier(true);
  };

  const onPressofImportCatalogue = () => {
    setallCatalogues(false);
    setsubCatalogue(false);
    settier(false);
    setimportCatalogue(true);
  };

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      
      const newData = Productsdata.filter((item) => {
        const itemData = item.product_name
          ? item.product_name.toUpperCase() +
            item.category_name.toUpperCase() +
            item.subcategory_name.toUpperCase() +
            item.supplier_product_code.toUpperCase() +
            item.base_uom.toUpperCase() +
            item.status_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(Productsdata);
      setSearch(text);
    }
  };

  // subcatalogue search
  const searchFilterFunction2 = (text) => {
    if (text) {
      
      const newData = subdata.filter((item) => {
        const itemData = item.subcatalogue_name
          ? item.subcatalogue_name.toUpperCase() +
            item.subcatalogue_no.toUpperCase() +
            item.sku_id +
            item.status_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSubCatDetails(newData);
      setSearch(text);
    } else {
      setSubCatDetails(subdata);
      setSearch(text);
    }
  };
  const showresult = (
    textselectedCategory,
    textselectedSubCategory,
    textselectedStatus
  ) => {
    let newData = Productsdata;
    if (textselectedCategory) {
      newData = newData.filter(
        (item) => item.category_id === textselectedCategory
      );
    }

    if (textselectedSubCategory) {
      newData = newData.filter(
        (item) => item.subcategory_id === textselectedSubCategory
      );
    }

    if (textselectedStatus) {
      newData = newData.filter(
        (item) => item.status_name === textselectedStatus
      );
    }
    if (
      !textselectedCategory &&
      !textselectedSubCategory &&
      !textselectedStatus
    ) {
      newData = filterdData;
    }

    refRBSheet.current.close();
    if (newData.length === 0) {
      setfilterdData([]);
    } else {
      setfilterdData(newData);
    }
  };

  const categorySet = new Set(
    Productsdata && Productsdata?.map((product) => product.category_id)
  );
  const categoryList = Array.from(categorySet).map((categoryId) => {
    const filteredProducts = Productsdata.filter(
      (product) => product.category_id === categoryId
    );
    const categoryName =
      filteredProducts.length > 0 ? filteredProducts[0].category_name : "";
    return (
      <View key={categoryId}>
        <TouchableOpacity onPress={() => setSelectedCategory(categoryId)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedCategory === categoryId && {
                backgroundColor: "#1F9CEF",
              },
            ]}>
            {categoryName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const subCategorySet = new Set(
    Productsdata && Productsdata.map((product) => product.subcategory_id)
  );
  const subCategoryList = Array.from(subCategorySet).map((subCategoryId) => {
    const filteredProducts = Productsdata.filter(
      (product) => product.subcategory_id === subCategoryId
    );
    const subCategoryName =
      filteredProducts.length > 0 ? filteredProducts[0].subcategory_name : "";
    return (
      <View key={subCategoryId}>
        <TouchableOpacity onPress={() => setSelectedSubCategory(subCategoryId)}>
          <Text
            style={[
              GlobalStyles.textBackground,
              selectedSubCategory === subCategoryId && {
                backgroundColor: "#1F9CEF",
              },
            ]}>
            {subCategoryName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });

  const statusSet = new Set(
    Productsdata && Productsdata.map((product) => product.status_name)
  );
  const statusList = Array.from(statusSet).map((statusName) => (
    <View key={statusName}>
      <TouchableOpacity onPress={() => setSelectedStatus(statusName)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedStatus === statusName && { backgroundColor: "#1F9CEF" },
          ]}>
          {statusName}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  const statusLookup = {
    0: "Not Visible",
    1: "Visible",
  };

  const statusSet2 = new Set(
    subCatDetails &&
      subCatDetails.map((product) =>
        product.status === 1 ? "Active" : "Inactive"
      )
  );

  const statusList2 = Array.from(statusSet2).map((statusName) => (
    <View key={statusName}>
      <TouchableOpacity onPress={() => setSelectedStatus2(statusName)}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedStatus2 === statusName && { backgroundColor: "#1F9CEF" },
          ]}>
          {statusName}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  const statusSet1 = new Set(
    subCatDetails && subCatDetails.map((product) => product.status)
  );
  const statusList1 = Array.from(statusSet1).map((statusId) => (
    <View key={statusId}>
      <TouchableOpacity
        onPress={() => setSelectedStatus1(statusLookup[statusId])}>
        <Text
          style={[
            GlobalStyles.textBackground,
            selectedStatus1 === statusLookup[statusId] && {
              backgroundColor: "#1F9CEF",
            },
          ]}>
          {statusLookup[statusId]}
        </Text>
      </TouchableOpacity>
    </View>
  ));
  const showresult2 = (status) => {
    if (status === "Active") {
      status = 1;
    } else if (status === "Inactive") {
      status = 0;
    }
    if (status == null) {
      setfilterdData1(tierdata);
    } else {
      const newData = tierdata.filter((item) => item.status === status);
      setfilterdData1(newData);
    }

    refRBSheet2.current.close();
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
  const showresult1 = (status) => {
    if (status === "Visible") {
      setSubCatDetails(subdata);
    } else {
      const newData = subdata.filter((item) => item.status === status);
      setSubCatDetails(newData);
    }

    refRBSheet1.current.close();
  };

  const clearFilter1 = () => {
    setSubCatDetails(subdata);
    setSelectedStatus1(null);
    refRBSheet1.current.close();
  };

  const clearFilter2 = () => {
    setfilterdData1(tierdata);
    setSelectedStatus2(null);

    refRBSheet2.current.close();
  };

  //search function
  const searchFilterFunction1 = (text) => {
    if (text) {
      const newData = tierdata.filter((item) => {
    
        const itemData = item.name
          ? item.name.toUpperCase() +
            item.amount_type.toUpperCase() +
            item.discount_price
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData1(newData);
      setSearch(text);
    } else {
      setfilterdData1(tierdata);
      setSearch(text);
    }
  };
  //getproducts
  const getProducts = async () => {
    setIsLoading(true);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    var myJson = {
      user_type_id: id,
      // user_type_id: "60784da77b60b7605a47a41c",
    };
    const result = await api.getProduct(token, endPoint.get_products, myJson);
    setIsLoading(false);
    if (result) {
      setmyproducts(result);
      setProductsdata(result.data);
      setfilterdData(result.data);
    } else {
      setProductsdata([]);
    }
  };
  //gettiers
  const getTiers = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    
    var myJson = {
      supplier_id: id,
      
    };
    const result = await api.getTier(token, endPoint.get_tiers, myJson);

    if (result) {
      setmytiers(result);
      settierdata(result.data);
      setfilterdData1(result.data);
    } else {
      settierdata([]);
    }
  };

  //get subcataloge
  const getSubCatalogueList = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    var myJson = {
      user_type_id: id,
      // user_type_id: "60784da77b60b7605a47a41c",
    };
    const result = await api.getsubCatList(
      token,
      endPoint.getSubCatalogue_list,
      myJson
    );
    if (result) {
      setSubCatDetails(result.data);
      setSubdata(result.data);
    } else {
    }
  };
  //TO Give padding between the flatlist
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     //Below alert will fire every time when profile screen is focused
  //     settier(false);
  //     setsubCatalogue(false);
  //     setimportCatalogue(false);
  //     setallCatalogues(true);
  //   }, [])
  // );
  //Loader
  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={COLORS.button} size='large' />
    </View>
  );
  return (
    <>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#1F9CEF" }} /> */}
      {/* <StatusBar backgroundColor='#1F9CEF' /> */}
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
                </View>
                <Text style={GlobalStyles.menuText}>Catalogue</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}>
                <View style={{ alignContent: "flex-end" }}>
                  <Bell />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            style={{ paddingBottom: 15 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ width: "auto" }}>
            <View style={GlobalStyles.orderTabDirection}>
              <Pressable onPress={() => onPressofCatalogues()}>
                {allCatalogues ? (
                  <View style={GlobalStyles.allOrderView}>
                    <Text style={GlobalStyles.allOrderOnpressText}>
                      Catalogue
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={GlobalStyles.allOrderText}>Catalogue</Text>
                  </View>
                )}
              </Pressable>

              <View style={GlobalStyles.prendingAccecptance}>
                <Pressable onPress={() => onPressofSubCatalogue()}>
                  {subCatalogue ? (
                    <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                      <Text style={GlobalStyles.pendingOnPressText}>
                        Sub Catalogue
                      </Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.pendingAcceptanceView}>
                      <Text style={GlobalStyles.pendingText}>
                        Sub Catalogue
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>

              <View style={GlobalStyles.prendingAccecptance}>
                <Pressable onPress={() => onPressofTier()}>
                  {tier ? (
                    <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                      <Text style={GlobalStyles.pendingOnPressText}>
                        Pricing Tier
                      </Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.pendingAcceptanceView}>
                      <Text style={GlobalStyles.pendingText}>Pricing Tier</Text>
                    </View>
                  )}
                </Pressable>
              </View>

              {/* <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofImportCatalogue()}>
                {importCatalogue ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      Import Catalogue
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>
                      Import Catalogue
                    </Text>
                  </View>
                )}
              </Pressable>
            </View> */}
            </View>
          </ScrollView>
        </View>

        {allCatalogues ? (
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
                  data={filterdData}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    // <Pressable
                    //   style={{ flex: 1 }}
                    //   onPress={() =>
                    //     navigation.navigate("Editcatelogue", {
                    //       id: item?._id,
                    //       product_image: item?.product_image,
                    //       supplier_product_code: item?.supplier_product_code,
                    //       product_code: item?.product_code,
                    //       product_name: item?.product_name,
                    //       category_name: item?.category_name,
                    //     })
                    //   }>
                    <AllCataloguesCard
                      id={item?._id}
                      // title={title}
                      supplier_product_code={item?.supplier_product_code}
                      product_code={item?.product_code}
                      product_name={item?.product_name}
                      category_id={item?.category_id}
                      category_name={item?.category_name}
                      subcategory_name={item?.subcategory_name}
                      in_stack={item?.in_stock}
                      status={item?.status_name}
                      marketPlace={item?.in_marketplace}
                      subcategory_id={item?.subcategory_id}
                      product_image={item?.product_image}
                      umo={item?.base_uom}
                      navigation={navigation}
                      updateData={() => getProducts()}
                    />
                    // </Pressable>
                  )}
                  ListEmptyComponent={renderEmpty}
                />
              )}
            </View>
          </View>
        ) : null}
        {subCatalogue ? (
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
                      onChangeText={(text) => searchFilterFunction2(text)}
                      value={search}
                      placeholder='Search'
                      placeholderTextColor={"#0F141A"}
                    />
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      refRBSheet1.current.open();
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
                  data={subCatDetails}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    // <Pressable
                    //   style={{ flex: 1 }}
                    //   onPress={() =>
                    //     navigation.navigate("EditSubCatalogue", {
                    //       category_name: item?.subcatalogue_name,
                    //       product_code: item?.subcatalogue_no,
                    //       priceing_method: item?.priceing_method,
                    //     })
                    //   }>
                    <SubCatalogueCard
                      id={item._id}
                      category_name={item?.subcatalogue_name}
                      sku_name={item?.sku_id}
                      product_code={item?.subcatalogue_no}
                      in_stock={item?.status}
                      status={item?.status_name}
                      addData={item}
                      navigation={navigation}
                      updateData={() => getSubCatalogueList()}
                    />
                    // </Pressable>
                  )}
                  ListEmptyComponent={renderEmpty}
                />
              )}
            </View>
          </View>
        ) : null}

        {tier ? (
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
                      value={search}
                      placeholder='Search'
                      placeholderTextColor={"#0F141A"}
                    />
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      refRBSheet2.current.open();
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
              {isLoadingTier ? (
                <View>{isLoadingTier ? <Loader /> : null}</View>
              ) : (
                <FlatList
                  data={filterdData1}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    // <Pressable
                    //   style={{ flex: 1 }}
                    //   onPress={() =>
                    //     navigation.navigate("Edittier", {
                    //       idnumber: item?._id,
                    //       tierName: item?.name,
                    //       amountType: item?.amount_type,
                    //       value: item?.discount_price,
                    //     })
                    //   }>
                    <AllTiersCard
                      id={item?._id}
                      tierName={item?.name}
                      amountType={item?.amount_type}
                      value={item?.discount_price}
                      status={item?.status}
                      navigation={navigation}
                      updateData={() => getTiers()}
                    />
                    //  </Pressable>
                  )}
                  ListEmptyComponent={renderEmpty}
                />
              )}
            </View>
          </View>
        ) : null}
        {/* {importCatalogue ? <ImportCatalogueScreen /> : null}
      {allCatalogues && (
        <View style={GlobalStyles.addButton1}>
          <Pressable onPress={() => navigation.navigate("AddCatalogueScreen")}>
            <Text style={GlobalStyles.stictyText1}>+</Text>
          </Pressable>
        </View>
        // <FloatingAction
        //   onPressMain={() => navigation.navigate("AddCatalogueScreen")}
        //   color={"#1F9CEF"}
        //   default={{
        //     shadowOpacity: 0,

        //   }}
        //   buttonSize={64}
        //   iconWidth={20}
        //   iconHeight={20}
        //   animated={false}
        // />
      )} */}
        {tier && (
          <View style={GlobalStyles.addButton1}>
            <Pressable onPress={() => navigation.navigate("Addtier")}>
              <Text style={GlobalStyles.stictyText1}>+</Text>
            </Pressable>
          </View>
          // <FloatingAction
          //   onPressMain={() => navigation.navigate("Addtier")}
          //   color={"#1F9CEF"}
          //   // default={{
          //   //   shadowOpacity: 0.35,
          //   //   shadowOffset: { width: 0, height: 5 },
          //   //   shadowColor: "#00000029",
          //   //   shadowRadius: 3,
          //   //   fontSize: 20,
          //   // }}
          //   buttonSize={64}
          //   iconWidth={20}
          //   iconHeight={20}
          //   animated={false}
          // />
        )}
        {allCatalogues && (
          <View style={GlobalStyles.addButton1}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddCatalogueScreen")}>
              <Text style={GlobalStyles.stictyText1}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        {subCatalogue && (
          <View style={GlobalStyles.addButton1}>
            <Pressable onPress={() => navigation.navigate("AddSubCatalogue")}>
              <Text style={GlobalStyles.stictyText1}>+</Text>
            </Pressable>
          </View>
        )}
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
                    setCatelogue(!catelogue);
                    setSubCatelogue(false);
                    setStatus(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Category
                      </Text>
                    </View>
                    <View>{catelogue ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {catelogue ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {categoryList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setSubCatelogue(!subCatelogue);
                    setCatelogue(false);
                    setStatus(false);

                    //  setSheetHeight(700);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Sub Category
                      </Text>
                    </View>
                    <View>{subCatelogue ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {subCatelogue ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {subCategoryList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setStatus(!status);
                    setSubCatelogue(false);
                    setCatelogue(false);
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
                    showresult(
                      selectedCategory,
                      selectedSubCategory,
                      selectedStatus
                    )
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

              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setStatus1(!status1);
                    // setSubCatelogue(false);
                    // setCatelogue(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Status
                      </Text>
                    </View>
                    <View>{status1 ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {status1 ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {statusList1}
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
                <TouchableOpacity onPress={clearFilter1}>
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
                <TouchableOpacity onPress={() => showresult1(selectedStatus1)}>
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
          ref={refRBSheet2}
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

              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setStatus2(!status2);
                    // setSubCatelogue(false);
                    // setCatelogue(false);
                  }}>
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}>
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Status
                      </Text>
                    </View>
                    <View>{status2 ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {status2 ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}>
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {statusList2}
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
                <TouchableOpacity onPress={clearFilter2}>
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
                <TouchableOpacity onPress={() => showresult2(selectedStatus2)}>
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
    </>
  );
}
