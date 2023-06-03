/** @format */

import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import { useForm, Controller } from "react-hook-form";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  Alert,
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
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { getDocumentAsync } from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as mime from "react-native-mime-types";
import * as ImagePicker from "expo-image-picker";

import styles from "../../../assets/css/styles";
import LeftArrow from "../../../assets/signup/LeftArrow";
import BlackSearchIcon from "../../../assets/images/dashboard/black_search_icon";
import BlackNotificationIcon from "../../../assets/images/dashboard/black_notification";
import ChooseFileIcon from "../../../assets/images/dashboard/choose_file";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
import CollapseDropDown from "../../../assets/images/dashboard/collapse_dropdown";
import TickIcon from "../../../assets/jsx/dashbord/TickIcon";
import GlobalStyles from "../../../assets/css/styles";
import CheckBox from "../../components/form/CheckBox";

export default function Editcatelogue({ route, navigation }) {
  const {
    control,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = useForm();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: formState2,
  } = useForm();
  const {
    control: control3,
    handleSubmit: handleSubmit3,
    formState: formState3,
  } = useForm();
  const [productId, setproductId] = useState(route.params.id);
  const [isstepone, setisstepone] = useState(true);
  const [issteptwo, setissteptwo] = useState(false);
  const [isstepthree, setisstepthree] = useState(false);
  const [fieldValues, setFieldValues] = useState([{ orderunit: '', equalsto: '' }]);
  const [laedtimedayskey, setlaedtimedayskey] = useState("Select");
  const [laedtimedayskeyselkey, setlaedtimedayskeyselkey] = useState("Select");
  const [codeError, setCodeError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [country, setcountry] = useState("");
  const [quantity, setquantity] = useState("");
  const [shelllifeval, setshelllifeval] = useState(0);
  const [SKUS, setSKUS] = useState("");
  const [SKUSkey, setSKUSkey] = useState([]);
  const [certificationkey, setcertificationkey] = useState(0);
  const [marketplacekey, setmarketplacekey] = useState(0);
  const [leadtimekey, setleadtimekey] = useState(0);
  const [certification, setcertification] = useState([]);
  const [marketplace, setmarketplace] = useState("");
  const [leadtime, setleadtime] = useState(0);
  const [baseUnit, setbaseUnit] = useState("");
  const [baseunitkey, setbaseunitkey] = useState("Select");
  const [countrykey, setcountrykey] = useState("Select");
  const [Categorykey, setCategorykey] = useState("Select");
  const [subCategorykey, setsubCategorykey] = useState("Select");
  const [hashtagkey, sethashtagkey] = useState(0);
  const [statuskey, setstatuskey] = useState(0);
  const [Countrydata, setCountrydata] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [codeCont, setCodeCont] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const [description1, setdescription1] = useState("");
  const [description2, setdescription2] = useState("");
  const [Userdata, setUserdata] = useState("");
  const [Categorydata, setCategorydata] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [SKUSdata, setSKUSdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const[image,setImage]=useState("")

  const [hashtagdata, sethashtagdata] = useState([]);
  const [CategoryselKey, setCategoryselKey] = useState(0);
  const [subCategoryselKey, setSubCategoryselKey] = useState(0);
  const [baseunitselKey, setBaseunitselKey] = useState(0);
  const [UOMdata, setUOMdata] = useState([]);
  const [productCode, setproductCode] = React.useState("");
  const [ProductName, setProductName] = React.useState(" ");
  const [hashtagselKey, sethashtagselKey] = useState(0);
  const [ordersku, setordersku] = useState("");
  const [ordersku1, setordersku1] = useState("");
  const [productbyiddata, setproductbyiddata] = useState([]);
  const [presentationFile, setPresentationFile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editCatalogueError, setEditCatalogueError] = useState("");
  const [shelloptionskey, setshelloptionskey] = useState("Select");
  const [shelloptionsselkey, setshelloptionsselkey] = useState(0);
  const [copies, setCopies] = useState([{ SKUS: '', ordersku: '' }]);
  const [upc, setUpc] = useState("")
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [moqValues, setMoqValues] = useState([])
  const [listPriceValues, setListPriceValues] = useState([])
  const [promoPriceValues, setPromoPriceValues] = useState([])
  const [SKUS1, setSKUS1] = useState("");
  const [SKUSkey1, setSKUSkey1] = useState("Select");
  // success popup
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const shelllifeDataArray = [
    { key: 1, label: "Day(s)", value: 0 },
    { key: 2, label: "Month(s)", value: 1 },
  ];
  const handlePlusIconClick = () => {
    const newCopies = [...copies]; // Create a copy of the current copies array
    newCopies.push({}); // Add an empty object to the array
    setCopies(newCopies); // Update the copies state with the new array
    //  setCopies([...copies, { orderunit: '', equalsto: '' }]);
  };
  const handleMinusIconClick = (index) => {
    //  const newCopies = [...copies]; // Create a copy of the current copies array
    //  newCopies.pop(); // Remove the last element from the array
    //  setCopies(newCopies); // Update the copies state with the new array
    const newCopies = [...copies];
    newCopies.splice(index, 1);
    setCopies(newCopies);
  };
  const options = [
    { id: "Halal", label: "Halal" },
    { id: "HACCP", label: "HACCP" },
    { id: "Gluten Free", label: "Gluten Free" },
    { id: "Organic", label: "Organic" },
    { id: "Vegan", label: "Vegan" },
    { id: "FDA", label: "FDA" },
    { id: "Fairtrade", label: "Fairtrade" },
    { id: "GMP", label: "GMP" },
    { id: "Others", label: "Others" },
  ];
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      bytes:true,
      aspect: [4, 3],
      quality: 1,
    });
    
    // console.log(result.base64,"RTWYWUWUWIWIWI")
    if (!result) {
      setImage(result.assets[0].base64);
      // const extn = result.uri ? result.uri.split(".").pop() : "";
      // const fileUriPart = result.uri ? result.uri.split("/") : [];
      // const filename = fileUriPart.length
      //   ? fileUriPart[fileUriPart.length - 1]
      //   : "";
      // const imageObj: any = {
      //    base64: result.base64,
       
      //   uri: result.uri,
      //   extn,
      //   type: `image/${extn}`,
      //   name: filename,
      //   // name:"data:image/jpg;base64," + result.base64
      // };
      // console.log(filename,"SETIMAGRYU")
      

      // setImageError(false);
      // setImage(imageObj);
    } else {
      // setImageError(true);
      alert('')
       console.log(result.assets[0].base64,'dss')
      setImage(result.assets[0].base64);
      //  setImage(null);
    }

  };
  const addField = () => {
    // setFields([...fields, { SKUS: '', ordersku: '' }]);
    setFieldValues((prevFieldValues) => [...prevFieldValues, { orderunit: '', equalsto: '' }]);
  };
  const removeLastField = () => {
    setFieldValues((prevFieldValues) => prevFieldValues.slice(0, -1));
  };

  const onSubmit1 = async (data) => {

    setisstepone(false);
    setisstepone(!isstepone);
    setissteptwo(!issteptwo);
  };
  const onSubmit2 = async (data) => {

    setissteptwo(false);
    setissteptwo(!issteptwo);
    setisstepthree(!isstepthree);
  };
  const onSubmit3 = async (data) => {

    setisstepthree(false);
    setisstepthree(!isstepthree);
  };

  const resetFormText = () => { };

  const onRefresh = React.useCallback(() => {
    console.log("On Refresh");
  }, []);

  useEffect(() => {
    resetFormText();
    getCategory(),
      gethashtagData(),
      getSKUSData(),
      getCountryOfOriginData(),
      getUOMData(),
      getParticularProduct();
  }, []);

  //getProduct
  const getParticularProduct = async () => {
    setIsLoading(true);
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    var myJson = {
      id: productId,
    };
    const result = await api.getParticularProduct(
      token,
      endPoint.get_particularProduct,
      myJson
    );

    console.log("RRRRRRRR", result.data);
    setproductdata(result.data[0]);
    setCodeCont(result.data[0].product_code);
    setProductName(result.data[0].product_name);
    setBrand(result.data[0].brand);
    setproductCode(result.data[0].supplier_product_code);
    setCategorykey(result.data[0].category_id);
    setsubCategorykey(result.data[0].subcategory_id);
    setstatuskey(result.data[0].status);
    setStatus(result.data[0].status_name);
    setdescription1(result.data[0].short_desc);
    setdescription2(result.data[0].long_desc);
    setbaseunitkey(result.data[0].base_uom);
    setCategoryselKey(result.data[0].category_name);
    setleadtime(result.data[0].lead_time);
    setFieldValues(result.data[0].ordering_option)
    setSubCategoryselKey(result.data[0].subcategory_name);
    sethashtagselKey(result.data[0].hashtag[0])
    setBaseunitselKey();
    setMoqValues(result.data[0].pricing_range)
    setListPriceValues(result.data[0].pricing_range)
    setPromoPriceValues(result.data[0].pricing_range)

    setImage(result.data[0].product_image)
    setPresentationFile(result.data[0].product_image)
    sethashtagkey(result.data[0].hashtag[0])
    setUpc(result.data[0].upc_ean_no)
    setshelllifeval(result.data[0].shelf_life);
    setshelloptionskey(result.data[0].shelf_daymonth);
    setlaedtimedayskey(result.data[0].lead_daymonth)
    setordersku(result.data[0].equalsto);
    setquantity(result.data[0].critical_level);
    setcountrykey(result.data[0].country_of_origin);
    setSKUSkey(result.data[0].pricing_range);
    setcertification(result.data[0].certification);

    setmarketplace(result.data[0].in_marketplace);
    setIsLoading(false);

    if (result) {
      setproductbyiddata(result.data);
    } else {
      setproductbyiddata([]);
    }
  };
  const handleOptionChange = (index) => {
    setSelectedOptionIndex(index);
  };
  const handleMoqValueChange = (value, index) => {
    const updatedMoqValues = [...moqValues]; // Create a copy of the moqValues array
    // updatedMoqValues[index] = value; // Update the value at the specified index
    updatedMoqValues[index] = { pricemoq: value };
    setMoqValues(updatedMoqValues); // Update the state with the updated moqValues
  };
  const handleListPriceValueChange = (value, index) => {
    const updatedListPriceValues = [...listPriceValues]; // Create a copy of the listPriceValues array
    // updatedListPriceValues[index] = value; // Update the value at the specified index
    updatedListPriceValues[index] = { priceunit: value };

    setListPriceValues(updatedListPriceValues); // Update the state with the updated listPriceValues
  };

  const handlePromoPriceValueChange = (value, index) => {
    const updatedPromoPriceValues = [...promoPriceValues]; // Create a copy of the promoPriceValues array
    // updatedPromoPriceValues[index] = value; // Update the value at the specified index
    updatedPromoPriceValues[index] = { promo: value };
    setPromoPriceValues(updatedPromoPriceValues); // Update the state with the updated promoPriceValues
  };

  const getCategory = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonUserId = await AsyncStorage.getItem("userTypeId");

    let token = jsonValue;
    var myJson = {
      user_type_id: jsonUserId,
    };
    const result = await api.getAllCategory(
      token,
      endPoint.get_Category,
      myJson
    );

    if (result) {
      setCategorydata(result.data);
    } else {
      setCategorydata([]);
    }
  };
  const getSubCategory = async (cat_id) => {
    const jsonValue: any = await AsyncStorage.getItem("UserToken");
    const jsonUserId = await AsyncStorage.getItem("userTypeId");

    let token = jsonValue;
    var myJson = {
      // user_type_id: jsonUserId,
      category_id: cat_id,
    };

    const result = await api.getAllSubCategory(
      token,
      endPoint.get_SubCategory,
      myJson
    );

    if (result) {
      setSubCategoryData(result.data);
    } else {
      setSubCategoryData([]);
    }
  };
  const gethashtagData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const id = await AsyncStorage.getItem("userTypeId");
    let token = jsonValue;
    var myJson = {
      supplier_id: id,
    };
    const result = await api.gethashtag(token, endPoint.get_hashtag, myJson);
    if (result) {
      sethashtagdata(result.data);
    } else {
      sethashtagdata([]);
    }
  };
  const getCountryOfOriginData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      name: "country,city",
    };
    const result = await api.getCountry(token, endPoint.get_country, myJson);

    if (result) {
      setCountrydata(result.data);
    } else {
      setCountrydata([]);
    }
  };
  const getUOMData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    var myJson = {
      fetch: "1000",
      status: "-1",
      page: "1",
    };
    const result = await api.getUOM(token, endPoint.get_uom, myJson);

    if (result) {
      setUOMdata(result.data.uoms);
    } else {
      setUOMdata([]);
    }
  };
  const renderSKUOptions = () => {
    return fieldValues.map((option, index) => (
      <View key={index} style={[GlobalStyles.mb20]}>

        <Text style={[GlobalStyles.font12, GlobalStyles.textBlack, GlobalStyles.fontBold, GlobalStyles.mb4]}
          // style={[
          //   styles.value,
          //   index === selectedOptionIndex && { fontWeight: 'bold' },
          // ]}
          onPress={() => handleOptionChange(index)}
        >
          {option.orderunit}
        </Text>

        <View style={[styles.mb12]}>
          <Text style={[styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,]}>MOQ </Text>
          <TextInput
            style={styles.inputStyle}
            value={moqValues[index]?.pricemoq ? moqValues[index].pricemoq.toString() : ''}
            onChangeText={(value) => handleMoqValueChange(value, index)}
          />
        </View>
        <View style={[styles.mb12]}>
          <Text style={[styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,]}>List Price </Text>
          <TextInput
            style={styles.inputStyle}
            value={listPriceValues[index]?.priceunit ? listPriceValues[index].priceunit.toString() : ''}
            onChangeText={(value) => handleListPriceValueChange(value, index)}
          />
        </View>
        <View >
          <Text style={[styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,]}>Promo Price</Text>
          <TextInput
            style={styles.inputStyle}
            value={promoPriceValues[index]?.promo ? promoPriceValues[index].promo.toString() : ''}
            onChangeText={(value) => handlePromoPriceValueChange(value, index)}
          />
        </View>
      </View>
    ));
  };

  const getSKUSData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    // let token = jsonValue;
    let token = jsonValue;
    // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU2NDQ3MSwiZXhwIjoxNzA5MTAwNDcxLCJuYmYiOjE2Nzc1NjQ0NzEsImp0aSI6InJrNWpZQnNITEVDNDJjV2siLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.injAIleCfRPGGOSap-YRc3DOATW9V0XN_JdH1uhy5K4";
    var myJson = {
      fetch: "10",
      status: "-1",
      page: "1",
    };
    const result = await api.getSKUS(token, endPoint.get_skus, myJson);

    if (result) {
      setSKUSdata(result.data.skus);
    } else {
      setSKUSdata([]);
    }
  };
  //SKU
  const SKUSDataArray = SKUSdata.map((SKUS: any, index: number) => {
    let newData = {
      key: index + 1,
      label: SKUS.name,
      value: SKUS._id,
    };
    return newData;
  });

  const selectOneFile = async () => {
    try {
      const res = await getDocumentAsync({
        type: [
          "image/png",
          "image/jpeg",
        ],

        multiple: true,
        copyToCacheDirectory: true,
      });
      setPresentationFile(res.uri);
    } catch (err) {
    }
  };
  const get_subcategory = async (cat_id) => {
    getSubCategory(cat_id);
  };

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let userType = await AsyncStorage.getItem("userType");
console.log(listPriceValues,"listPriceValues")
    let token = jsonValue;
    const pricing_range = listPriceValues.map((listPrice, index) => {
      console.log(index,"indexindexindexindex",listPrice.priceunit,moqValues[index],promoPriceValues[index])
      const moqValue = moqValues[index].pricemoq
      const promoval = promoPriceValues[index].promo
      const _ids = SKUSkey[index].id
console.log(moqValue,"moqValue")
console.log(promoval,"promoval")
console.log(_ids,"_ids")

      return {
        default: true,
        priceunit: listPrice.priceunit,
        id: _ids,
        pricemoq: moqValue,
        ref: "",
        promo: promoval,
        sku_status: true,
        isuom: true,
      };
    });
    var myJson = {
      id: productId,
      product_code: codeCont,
      product_name: ProductName,
      company: name,
      brand: brand,
      short_desc: description1,
      long_desc: description2,
      tags: hashtagkey,
      product_image: presentationFile,
      supplier_product_code: productCode,
      category_id: Categorykey,
      subcategory_id: subCategorykey,
      in_stock: "",
      base_uom: baseunitkey,
      critical_level: quantity,
      ordering_option: fieldValues,
      pricing_range:pricing_range,
      shelf_life: shelllifeval,
      shelf_daymonth: shelloptionskey,
      lead_time: leadtime,
      lead_daymonth: laedtimedayskey,
      country_of_origin: countrykey,
      hashtag: hashtag,
      certification: [],
      in_marketplace: marketplace,
      user_type: parseInt(userType),
      user_type_id: supplierId,
      status: statuskey,
    };
    console.log("Updatemyjson::", myJson);
    const result = await api.updateProduct(
      token,
      endPoint.update_product,
      myJson
    );
    console.log("API response Update catalogue::", result);
    if (result.success === "1") {
      // console.log(result.data, "SEWDERFRTG");
      refRBSheet.current.open();

      setUserdata(false);
    } else {
      setEditCatalogueError(result.message);
      refRBSheet1.current.open();

      setUserdata(true);
    }
  };
  // category
  const categoryDataArray = Categorydata.map((category: any, index: number) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: category.category_name,
      value: category._id,
    };
    return newData;
  });
  //BaseUnitData

  const BaseUnitDataArray = UOMdata.map((uom: any, index: number) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: uom.name,
      value: uom._id,
    };
    return newData;
  });
  // sub category
  const subcategoryDataArray = SubCategoryData.map(
    (subCategory: any, index: number) => {
      let newData = {
        // key: project.projectId + '_' + index,
        key: index + 1,
        label: subCategory.subcategory_name,
        value: subCategory._id,
      };
      return newData;
    }
  );

  //Country
  const countryDataArray = Countrydata.map((country: any, index: number) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: country.code,
      value: country._id,
    };
    return newData;
  });

  // status
  const StatusData = [
    { key: 1, label: "Inactive", value: 0 },
    { key: 2, label: "Active", value: 1 },
  ];
  // Hashtag
  const HashtagData = [{ key: 1, label: "Select" }];
  const HashtagDataArray = hashtagdata.map((hashtag, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: hashtag.tag_name,
      value: hashtag._id,
    };
    return newData;
  });
  //Loader
  const Loader = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}>
      <ActivityIndicator size='large' />
    </View>
  );
  const handleCheckBoxPress = (item) => {

    if (certification.some((selectedItem) => selectedItem.label === item.label)) {
      setcertification((prevSelectedSKUS) =>
        prevSelectedSKUS.filter((selectedItem) => selectedItem.label !== item.label)
      );
    } else {
      setcertification((prevSelectedSKUS) => [...prevSelectedSKUS, item]);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }} /> */}
      {/* <StatusBar backgroundColor='#FFFFFF' /> */}
      {/* Header HTML */}
      <View
        style={[styles.dahboardHeader, styles.whiteBg, styles.catalogueHeader]}>
        <View
          style={[
            styles.width100,
            styles.justifyBetween,
            styles.flexRow,
            styles.alignCenter,
          ]}>
          <View style={[styles.flexRow, styles.alignCenter, styles.width20]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <LeftArrow />
            </TouchableOpacity>
          </View>
          <View style={[styles.width60, styles.flexRow, styles.justifyCenter]}>
            <Text style={[styles.textBlack, styles.font16, styles.fontSemi]}>
              Edit Catalogue
            </Text>
          </View>

          <View
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.width20,
              styles.justifyEnd,
            ]}>
            {/* <BlackSearchIcon/> */}
            <View>
              <View style={[styles.notCount, styles.borderWhite]}></View>
              <BlackNotificationIcon />
            </View>
          </View>
        </View>
      </View>
      {/* Header HTML - Ends */}
      <ScrollView style={[styles.grayBg]}>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={[styles.pad20]}>
            {/* Step one tab */}
            {isstepone && (
              <View style={[styles.width100]}>
                {/* navigation tab */}
                <View style={[styles.flexRow, styles.mb24]}>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textPri,
                        styles.mb16,
                      ]}>
                      Step 1
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.TabTextColor,
                        styles.mb16,
                      ]}>
                      Step 2
                    </Text>
                    <View style={[styles.width100, styles.tabBar]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.TabTextColor,
                        styles.mb16,
                      ]}>
                      Step 3
                    </Text>
                    <View style={[styles.width100, styles.tabBar]}></View>
                  </View>
                </View>
                {/* navigation tab - Ends */}

                {/* upload Images */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Upload Images
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.dragChooseFile,
                      styles.flexColumn,
                      styles.justifyCenter,
                      styles.alignCenter,
                    ]}
                    onPress={()=>pickImage()}
                    // onPress={() => selectOneFile()}
                    >
                    <ChooseFileIcon />
                    <Text style={[styles.font15, styles.textBlack, styles.mb2]}>
                      Choose file here
                    </Text>
                    <Text style={[styles.font12, styles.textDefault]}>
                      Tap here to upload your catalogue images
                    </Text>
                  </TouchableOpacity>
                  {presentationFile && presentationFile.type === "success" && (
                    <View>
                      <Text style={{ fontSize: 13, fontWeight: "500" }}>
                        File Name:{" "}
                        {presentationFile?.name ? presentationFile.name : ""}
                        {"\n"}
                      </Text>
                    </View>
                  )}
                </View>
                {/* upload Images - Ends */}

                {/* form */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                    styles.flexRow,
                    styles.flexWrap,
                  ]}>
                  {/* System generated Product Code*  */}
                  <View style={[styles.mb20, styles.width100]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      {" "}
                      System Generated Product Code
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <View>
                      <Controller
                        name='code'
                        control={control}
                        // rules={{
                        //   required: "System generated product code is required.",
                        // }}
                        render={(props) => (
                          <TextInput
                            style={[styles.inputStyle, styles.fontMed]}
                            placeholderTextColor='#222B2E'
                            editable={false}
                            onChangeText={(codeCont) => {
                              setCodeCont(codeCont);
                              props.field.onChange(codeCont);
                            }}
                            value={codeCont}
                          />
                        )}
                      />
                      {formState1.errors.code && (
                        <Text style={[styles.errorMsg]}>Code is required.</Text>
                      )}
                    </View>
                  </View>
                  {/* System generated Product Code* - Ends */}
                  {/* Product Name*  */}
                  <View style={[styles.mb20, styles.width100]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      {" "}
                      Product Name
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <Controller
                      name='ProductName'
                      control={control}
                      //rules={{ required: "Product name is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle]}
                          onChangeText={(ProductName) => {
                            props.field.onChange(ProductName);
                            setProductName(ProductName);
                          }}
                          value={ProductName}
                        />
                      )}
                    />
                    {formState1.errors.ProductName && (
                      <Text style={[styles.errorMsg]}>
                        ProductName is required.
                      </Text>
                    )}
                  </View>
                  {/* Product Name* - Ends */}
                  {/* Brand*  */}
                  <View style={[styles.mb20, styles.width100]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      {" "}
                      Brand
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <Controller
                      name='brand'
                      control={control}
                      // rules={{ required: "Brand is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle]}
                          onChangeText={(brand) => {
                            props.field.onChange(brand);
                            setBrand(brand);
                          }}
                          value={brand}
                        />
                      )}
                    />
                    {formState1.errors.brand && (
                      <Text style={[styles.errorMsg]}>Brand is required.</Text>
                    )}
                  </View>
                  {/* Brand* - Ends */}
                  {/* Supplier Product Code*  */}
                  <View style={[styles.mb20, styles.width100]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      Supplier Product Code
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <Controller
                      name='productCode'
                      control={control}
                      // rules={{ required: "Supplier product code is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle]}
                          onChangeText={(productCode) => {
                            props.field.onChange(productCode);
                            setproductCode(productCode);
                          }}
                          value={productCode}
                        />
                      )}
                    />
                    {formState1.errors.productCode && (
                      <Text style={[styles.errorMsg]}>
                        ProductCode is required.
                      </Text>
                    )}
                  </View>
                  {/* Supplier Product Code* - Ends */}
                  {/* Category*  */}
                  <View style={[styles.mb20, styles.width50, styles.padR7]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      {" "}
                      Category
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <View>
                      <DropDownIcon style={[styles.modalDropDown]} />

                      <Controller
                        name='category'
                        control={control}
                        // rules={{ required: "Category is required." }}
                        render={(props) => (
                          <ModalSelector
                            data={categoryDataArray}
                            initValue={CategoryselKey}
                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                            selectedKey={CategoryselKey}
                            onChange={(option) => {
                              if (option.key) {
                                setCategory(option.label);
                                setCategoryselKey(option.key);
                                setCategorykey(option.value);
                                props.field.onChange(option.value);
                                get_subcategory(option.value);
                              }
                            }}
                            value={CategoryselKey}
                          />
                        )}
                      />
                    </View>
                    {formState1.errors.category && (
                      <Text style={[styles.errorMsg]}>
                        Category is required.
                      </Text>
                    )}
                  </View>

                  {/* Category* - Ends */}
                  {/* Sub Category*  */}
                  <View style={[styles.mb20, styles.width50, styles.padL7]}>
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
                    <View>
                      <DropDownIcon style={[styles.modalDropDown]} />
                      <Controller
                        name='subCategory'
                        control={control}
                        // rules={{ required: "Sub Category is required." }}
                        render={(props) => (
                          <ModalSelector
                            data={subcategoryDataArray}
                            initValue={subCategoryselKey}
                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                            selectedKey={subCategoryselKey}
                            onChange={(option) => {
                              if (option.key) {
                                setsubCategory(option.label);
                                setSubCategoryselKey(option.key);
                                setsubCategorykey(option.value);
                                props.field.onChange(option.value);
                              }
                            }}
                            value={subCategoryselKey}
                          />
                        )}
                      />
                    </View>
                    {formState1.errors.subCategory && (
                      <Text style={[styles.errorMsg]}>
                        Sub category is required.
                      </Text>
                    )}
                  </View>

                  {/* Sub Category* - Ends */}
                  {/* Status*  */}
                  <View style={[styles.width50, styles.padR7]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      Status
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <View>
                      <DropDownIcon style={[styles.modalDropDown]} />

                      <Controller
                        name='status'
                        control={control}
                        //rules={{ required: "Status is required." }}
                        render={(props) => (
                          <ModalSelector
                            data={StatusData}
                            initValue={status}
                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                                setStatus(option.label);
                                setstatuskey(option.value);
                                props.field.onChange(option.value);
                              }
                            }}
                            value={statuskey}
                          />
                        )}
                      />
                    </View>
                    {formState1.errors.status && (
                      <Text style={[styles.errorMsg]}>Status is required.</Text>
                    )}
                  </View>

                  {/* Status* - Ends */}
                  {/* Hashtag*  */}
                  <View style={[styles.width50, styles.padL7]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      Hashtag
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <View>
                      <DropDownIcon style={[styles.modalDropDown]} />

                      <Controller
                        name='hashtag'
                        control={control}
                        //rules={{ required: "Hashtag is required." }}
                        render={(props) => (
                          <ModalSelector
                            data={HashtagDataArray}
                            initValue={hashtagkey}

                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                            selectedKey={hashtagkey}
                            onChange={(option) => {
                              if (option.key) {
                                setHashtag(option.label);
                                sethashtagselKey(option.key);
                                sethashtagkey(option.label);
                                props.field.onChange(option.value);
                              }
                            }}
                            value={hashtagselKey}
                          />
                        )}
                      />
                    </View>
                    {formState1.errors.hashtag && (
                      <Text style={[styles.errorMsg]}>
                        Hashtag is required.
                      </Text>
                    )}
                  </View>

                  {/* Hashtag* - Ends */}
                </View>
                {/* form - Ends */}

                {/* Description form */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  {/* Short Description* */}
                  <View style={[styles.mb20]}>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      Short Description
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <Controller
                      name='description1'
                      control={control}
                      // rules={{ required: "Short description is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle, styles.textArae]}
                          textAlignVertical='top'
                          multiline={true}
                          onChangeText={(description1) => {
                            props.field.onChange(description1);

                            setdescription1(description1);
                          }}
                          placeholder={"Enter Description"}
                          value={description1}
                        />
                      )}
                    />
                    {formState1.errors.description1 && (
                      <Text style={[styles.errorMsg]}>
                        Short description is required.
                      </Text>
                    )}
                  </View>
                  {/* Short Description* - Ends */}
                  {/* Long Description* */}
                  <View>
                    <Text
                      style={[
                        styles.labelText,
                        styles.font12,
                        styles.fontMed,
                        styles.mb4,
                      ]}>
                      Long Description
                      <Text style={[styles.font12, styles.textPri1]}>*</Text>
                    </Text>
                    <Controller
                      name='description2'
                      control={control}
                      //rules={{ required: "Long description is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle, styles.textArae]}
                          textAlignVertical='top'
                          multiline={true}
                          onChangeText={(description2) => {
                            props.field.onChange(description2);
                            setdescription2(description2);
                          }}
                          placeholder={"Enter Description"}
                          value={description2}
                        />
                      )}
                    />
                    {formState1.errors.description2 && (
                      <Text style={[styles.errorMsg]}>
                        Long description is required.
                      </Text>
                    )}
                  </View>
                  {/* Long Description* - Ends */}
                </View>
                {/* Description form - Ends */}
              </View>
            )}
            {/* Step one tab - Ends */}

            {/* Step Two tab */}
            {issteptwo && (
              <View style={[styles.width100]}>
                {/* navigation tab */}
                <View style={[styles.flexRow, styles.mb24]}>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textBlack,
                        styles.mb16,
                      ]}>
                      Step 1
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textPri,
                        styles.mb16,
                      ]}>
                      Step 2
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.TabTextColor,
                        styles.mb16,
                      ]}>
                      Step 3
                    </Text>
                    <View style={[styles.width100, styles.tabBar]}></View>
                  </View>
                </View>
                {/* navigation tab - Ends */}

                {/* BASE UNIT */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  {/* <View
                    style={[
                      styles.flexRow,
                      styles.alignCenter,
                      styles.justifyBetween,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontBold,
                        styles.textBlack,
                      ]}>
                      BASE UNIT
                    </Text>
                    <CollapseDropDown />
                  </View> */}
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Basic Unit{" "}
                    <Text style={[styles.font12, styles.textPri1]}>*</Text>
                  </Text>
                  <View>
                    <Controller
                      name='baseUnit'
                      control={control2}
                      // rules={{ required: "Base unit is required." }}
                      render={(props) => (
                        <View>
                          <DropDownIcon style={[styles.modalDropDown]} />
                          <ModalSelector
                            data={BaseUnitDataArray}
                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                            initValue={baseunitkey}
                            selectedKey={baseunitkey}
                            onChange={(option) => {
                              if (option.key) {
                                setbaseUnit(option.label);
                                setBaseunitselKey(option.label);

                                setbaseunitkey(option.label);
                                props.field.onChange(option.value);
                              }
                            }}
                            value={baseunitkey}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
                {formState2.errors.baseUnit && (
                  <Text style={[styles.errorMsg]}>Base unit is required.</Text>
                )}

                {/* BASE UNIT - ends */}

                {/* SHELL LIFE */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Shell Life{" "}
                    <Text style={[styles.font12, styles.textPri1]}>*</Text>
                  </Text>

                  {/* Short Description* */}
                  <View style={[styles.flexRow]}>
                    <View style={[styles.width50, styles.pr8]}>
                      <Controller
                        name='shelllife'
                        control={control2}
                        // rules={{ required: "Shell life is required." }}
                        render={(props) => (
                          <TextInput
                            style={[styles.inputStyle]}
                            keyboardType={"numeric"}
                            value={shelllifeval.toString()}
                            onChangeText={(shelllifeval) => {
                              props.field.onChange(shelllifeval);
                              setshelllifeval(shelllifeval);
                            }}
                          />
                        )}
                      />
                    </View>
                    <View style={[styles.width50, styles.pl8]}>
                      <Controller
                        name='options'
                        control={control2}
                        // rules={{ required: "Shell life is required." }}
                        render={(props) => (
                          <View>
                            <DropDownIcon style={[styles.modalDropDown]} />
                            <ModalSelector
                              data={shelllifeDataArray}
                              initValue={shelloptionskey}


                              selectStyle={[styles.inputStyle, styles.flexRow, styles.alignCenter, styles.justifyStart]}
                              initValueTextStyle={[styles.font15, styles.textBlack]}
                              overlayStyle={[styles.popupOverlay, styles.flexColumn, styles.justifyEnd, styles.alignCenter]}
                              optionContainerStyle={[styles.width300px]}
                              cancelStyle={[styles.width300px, styles.marHorauto]}
                              optionTextStyle={[styles.textBlack, styles.font15]}
                              cancelTextStyle={[styles.textBlack, styles.font15]}
                              onChange={(option) => {
                                if (option.key) {
                                  setshelloptionskey(option.label)
                                  setshelloptionsselkey(option.key)
                                  props.field.onChange(option.key);
                                }
                              }}
                              value={shelloptionskey}

                            />
                          </View>
                        )}
                      />
                    </View>
                  </View>
                  {formState2.errors.shelllife && (
                    <Text style={[styles.errorMsg]}>
                      Shell life is required.
                    </Text>
                  )}
                </View>

                {/* SHELL LIFE - ends */}

                {/* CRITICAL QUANTITY */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Critical Level
                  </Text>
                  <View>
                    <Controller
                      name='quantity'
                      control={control2}
                      // rules={{ required: "Critical quantity is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle]}
                          multiline={true}
                          keyboardType={"numeric"}
                          onChangeText={(quantity) => {
                            props.field.onChange(quantity);
                            setquantity(quantity);
                          }}
                          value={quantity.toString()}
                        />
                      )}
                    />
                  </View>
                  {formState2.errors.quantity && (
                    <Text style={[styles.errorMsg]}>
                      Critical quantity is required.
                    </Text>
                  )}
                </View>

                {/* CRITICAL QUANTITY - ends */}

                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      GlobalStyles.labelText,
                      GlobalStyles.font12,
                      GlobalStyles.fontMed,
                      GlobalStyles.mb4,
                    ]}>
                    UPC or EAN No.
                  </Text>
                  <View>
                    <Controller
                      name='upc'
                      control={control2}

                      render={(props) => (

                        <TextInput
                          style={[styles.inputStyle]}
                          multiline={true}
                          // keyboardType={"numeric"}
                          onChangeText={(upc) => {
                            props.field.onChange(upc);
                            setUpc(upc);
                          }}
                          value={upc}
                        />
                      )}
                    />
                  </View>
                  {/* {formState2.errors.upc && (
                <Text style={[styles.errorMsg]}>
                  Critical quantity is required.
                </Text>
              )} */}
                </View>
                {/* COUNTRY OF ORIGIN */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Country of Origin{" "}
                    <Text style={[styles.font12, styles.textPri1]}>*</Text>
                  </Text>
                  <View>
                    <Controller
                      name='country'
                      control={control2}
                      // rules={{ required: "Country of origin is required." }}
                      render={(props) => (
                        <View>
                          <DropDownIcon style={[styles.modalDropDown]} />
                          <ModalSelector
                            data={countryDataArray}
                            initValue={countrykey}
                            // onChangeText={(country) => setcountry(country)}

                            selectStyle={[
                              styles.inputStyle,
                              styles.flexRow,
                              styles.alignCenter,
                              styles.justifyStart,
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
                                setcountry(option.label);
                                setcountrykey(option.label);
                                props.field.onChange(option.key);
                              }
                            }}
                            value={countrykey}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
                {formState2.errors.country && (
                  <Text style={[styles.errorMsg]}>
                    Country of origin is required.
                  </Text>
                )}
                {/* COUNTRY OF ORIGIN - ends */}
                <Text style={[styles.font12, styles.textDefault]}>
                  UOM = Unit of Measure<Text style={[styles.textPri]}> | </Text>
                  MOQ = Minimum Order Quantity{" "}
                  <Text style={[styles.textPri]}>|</Text> Critical level alert =
                  Lowest quantity available in inventory at which alert is
                  triggered
                </Text>
              </View>
            )}
            {/* Step Two tab - Ends */}

            {/* Step Three tab */}
            {isstepthree && (
              <View style={[styles.width100]}>
                {/* navigation tab */}
                <View style={[styles.flexRow, styles.mb24]}>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textBlack,
                        styles.mb16,
                      ]}>
                      Step 1
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pr4,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textBlack,
                        styles.mb16,
                      ]}>
                      Step 2
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                  <View
                    style={[
                      styles.width33,
                      styles.pl4,
                      styles.flexColumn,
                      styles.alignCenter,
                      styles.justifyCenter,
                    ]}>
                    <Text
                      style={[
                        styles.font12,
                        styles.fontSemi,
                        styles.textPri,
                        styles.mb16,
                      ]}>
                      Step 3
                    </Text>
                    <View
                      style={[
                        styles.width100,
                        styles.tabBar,
                        styles.primaryBg,
                      ]}></View>
                  </View>
                </View>
                {/* navigation tab - Ends */}

                {/* ORDERING OPTIONS(SKUS) */}
                {fieldValues.map((field, index) => (
                  <View
                    key={index}
                    style={[
                      styles.width100,
                      styles.whiteBg,
                      styles.pad16,
                      styles.borderRadius4,
                      styles.mb14,
                    ]}
                  >
                    <Text
                      style={[
                        GlobalStyles.labelText,
                        GlobalStyles.font12,
                        GlobalStyles.fontMed,
                        GlobalStyles.mb4,
                      ]}
                    >
                      Ordering Options(SKUS)
                    </Text>
                    <View style={[GlobalStyles.flexRow]}>
                      <View
                        style={[
                          styles.width50,
                          styles.pr8,
                        ]}
                      >

                        <View>
                          <Controller
                            name={`orderunit[${index}].orderunit`}
                            control={control3}
                            // rules={{ required: "SKUS is required." }}
                            render={({ field: { onChange, value } }) => (
                              <View>
                                <DropDownIcon style={[styles.modalDropDown]} />
                                <ModalSelector
                                  data={SKUSDataArray}
                                  initValue={field.orderunit}
                                  selectStyle={[
                                    styles.inputStyle,
                                    styles.flexRow,
                                    styles.alignCenter,
                                    styles.justifyStart,
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
                                      const updatedFieldValues = [...fieldValues];
                                      updatedFieldValues[index].orderunit = option.label;
                                      setFieldValues(updatedFieldValues);
                                      setSKUSkey(option.value)
                                      onChange(option.label);
                                    }
                                  }}
                                  value={value}
                                />
                              </View>
                            )}
                          />
                          {formState3.errors.SKUS && (
                            <Text style={[styles.errorMsg]}>
                              Ordering options is required.
                            </Text>
                          )}

                        </View>
                      </View>
                      <View
                        style={[
                          styles.width50,
                          styles.pl8,
                        ]}
                      >
                        <Controller
                          name={`equalsto[${index}].equalsto`}
                          control={control2}
                          rules={{ required: "ordersku is required." }}
                          render={({ field: { onChange, value1 } }) => (
                            <TextInput
                              style={[
                                styles.inputStyle,
                                formState2.errors.ordersku && styles.borderRed,
                              ]}
                              initValue={field.orderunit}
                              multiline={true}
                              keyboardType={"numeric"}
                              onChangeText={(equalsto) => {
                                const updatedFieldValues = [...fieldValues];
                                updatedFieldValues[index].equalsto = equalsto;
                                setFieldValues(updatedFieldValues);
                                onChange(equalsto);
                              }}
                              value={field.equalsto}
                            />
                          )}
                        />
                      </View>
                    </View>
                    {index === 0 && (
                      <TouchableOpacity style={[styles.mt18]} onPress={addField}>
                        <Text style={[styles.font13, styles.textPri]}>Add More</Text>
                      </TouchableOpacity>
                    )}
                    {index === fieldValues.length - 1 && index !== 0 && (
                      <TouchableOpacity style={[styles.mt18]} onPress={removeLastField}>
                        <Text style={[styles.font13, styles.textred]}>Remove Last</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
                {/* ORDERING OPTIONS(SKUS) - ends */}

                {/* CERTIFICATION */}

                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Certification
                  </Text>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.label}


                    renderItem={({ item, index }) => (
                      <View>
                        <CheckBox
                          onPress={() => handleCheckBoxPress(item)}
                          title={item.label}
                          isChecked={certification.some((selectedItem) => selectedItem.label === item.label)}
                        />

                      </View>
                    )}

                  />

                  {/* <CheckBox
                      onPress={() => handleCheckBoxPress(options._id)}
                      isChecked={certification.includes(options._id)}
                    /> */}

                  {formState3.errors.certification && (
                    <Text style={[styles.errorMsg]}>
                      Certification is required.
                    </Text>
                  )}
                </View>

                {/* CERTIFICATION - ends */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <View style={GlobalStyles.checkboxContainer}>
                    <CheckBox
                      onPress={() => setmarketplace(!marketplace)}
                      title='In Market Place'
                      isChecked={marketplace}
                    />
                  </View>
                </View>
                {/* MARKET PLACE SETTINGS */}
                {/* <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      styles.labelText,
                      styles.font12,
                      styles.fontMed,
                      styles.mb4,
                    ]}>
                    Market Place Settings
                  </Text>

                  <View>
                    <Controller
                      name='marketplace'
                      control={control3}
                      // rules={{ required: "Market place is required." }}
                      render={(props) => (
                        <TextInput
                          style={[styles.inputStyle]}
                          keyboardType={"numeric"}
                          textAlignVertical='top'
                          multiline={true}
                          onChangeText={(marketplace) => {
                            props.field.onChange(marketplace);
                            setmarketplace(marketplace);
                          }}
                          value={marketplace.toString()}
                        />
                      )}
                    />
                  </View>
                </View>
                {formState3.errors.marketplace && (
                  <Text style={[styles.errorMsg]}>
                    Market place is required.
                  </Text>
                )} */}
                {/* MARKET PLACE SETTINGS - ends */}

                {/* LEAD TIME */}


                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      GlobalStyles.labelText,
                      GlobalStyles.font12,
                      GlobalStyles.fontMed,
                      GlobalStyles.mb4,
                    ]}>
                    Lead time
                  </Text>

                  <View style={[styles.flexRow]}>
                    <View style={[styles.width50, styles.pr8]}>
                      <Controller
                        name='leadtime'
                        control={control3}
                        //rules={{ required: "Lead time is required." }}
                        render={(props) => (
                          <TextInput
                            style={[styles.inputStyle]}
                            keyboardType={"numeric"}
                            multiline={true}
                            onChangeText={(leadtime) => {
                              props.field.onChange(leadtime);
                              setleadtime(leadtime);
                            }}
                            value={leadtime.toString()}
                          />
                        )}
                      />
                    </View>
                    <View style={[styles.width50, styles.pl8]}>
                      <Controller
                        name='leadtimedays'
                        control={control2}
                        // rules={{ required: "Shell life is required." }}
                        render={(props) => (
                          <View>
                            <DropDownIcon style={[styles.modalDropDown]} />
                            <ModalSelector
                              data={shelllifeDataArray}
                              initValue={laedtimedayskey}


                              selectStyle={[styles.inputStyle, styles.flexRow, styles.alignCenter, styles.justifyStart]}
                              initValueTextStyle={[styles.font15, styles.textBlack]}
                              overlayStyle={[styles.popupOverlay, styles.flexColumn, styles.justifyEnd, styles.alignCenter]}
                              optionContainerStyle={[styles.width300px]}
                              cancelStyle={[styles.width300px, styles.marHorauto]}
                              optionTextStyle={[styles.textBlack, styles.font15]}
                              cancelTextStyle={[styles.textBlack, styles.font15]}
                              onChange={(option) => {
                                if (option.key) {
                                  setlaedtimedayskey(option.label)
                                  setlaedtimedayskeyselkey(option.key)
                                  props.field.onChange(option.key);
                                }
                              }}
                              value={laedtimedayskey}

                            />
                          </View>
                        )}
                      />
                    </View>
                    {/* {formState3.errors.leadtime && (
                    <Text style={[styles.errorMsg]}>
                      Lead time is required.
                    </Text>
                  )} */}
                  </View>
                </View>


                {/* LEAD TIME - ends */}
                <View
                  style={[
                    styles.width100,
                    styles.whiteBg,
                    styles.pad16,
                    styles.borderRadius4,
                    styles.mb14,
                  ]}>
                  <Text
                    style={[
                      GlobalStyles.labelText,
                      GlobalStyles.font12,
                      GlobalStyles.fontMed,
                      GlobalStyles.mb4,
                    ]}>
                    Price Range and Unit Size
                  </Text>

                  <View>
                    <Text style={[
                      GlobalStyles.labelText,
                      GlobalStyles.font12,
                      GlobalStyles.fontMed,
                      GlobalStyles.mb4,
                    ]}>Set reference price range and order size available for ordering</Text>
                  </View>

                  <View style={[styles.mb24]}>
                    <View style={[styles.flexRow, styles.alignCenter, styles.mb4]}>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack, GlobalStyles.fontMed]}>
                        SKU :{" "}
                      </Text>
                      <Text style={[GlobalStyles.font12, GlobalStyles.textBlack]}>
                        {fieldValues[selectedOptionIndex]?.orderunit}
                      </Text>
                    </View>
                    {renderSKUOptions()}
                  </View>


                </View>
                {/* <View style={[styles.mb28]}>
                  <Text
                    style={[styles.font12, styles.textBlack, styles.marBtm4]}>
                    Catalogue for*
                  </Text>
                  <View style={[styles.flexRow, styles.flexWrap]}>
                    <TouchableOpacity
                      style={[
                        styles.catalogueForcheckbox,
                        styles.mr10,
                        styles.borderActive,
                        styles.checkboxBG,
                      ]}>
                      <Text
                        style={[styles.font13, styles.textPri, styles.fontMed]}>
                        Promotion
                      </Text>
                      <TickIcon style={[styles.checkboxTick]} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.catalogueForcheckbox,
                        styles.mr10,
                        styles.whiteBg,
                      ]}>
                      <Text
                        style={[
                          styles.font13,
                          styles.textBlack,
                          styles.fontMed,
                        ]}>
                        Offers by Supplier
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.catalogueForcheckbox,
                        styles.mr10,
                        styles.whiteBg,
                      ]}>
                      <Text
                        style={[
                          styles.font13,
                          styles.textBlack,
                          styles.fontMed,
                        ]}>
                        Hotlists
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}

                <Text style={[styles.font12, styles.textDefault]}>
                  UOM = Unit of Measure<Text style={[styles.textPri]}> | </Text>
                  MOQ = Minimum Order Quantity{" "}
                  <Text style={[styles.textPri]}>|</Text> Critical level alert =
                  Lowest quantity available in inventory at which alert is
                  triggered
                </Text>
              </View>
            )}
            {/* Step Three tab - Ends */}
          </View>
        )}
      </ScrollView>

      {/* success popup  */}
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
        {/* Update Popup */}
        <View
          style={[
            styles.flexColumn,
            styles.alignCenter,
            styles.justifyCenter,
            styles.padt30,
          ]}>
          <Image
            source={require("../../../assets/images/dashboard/updated_icon.png")}
            style={[styles.updatedIcon]}></Image>
          <Text
            style={[
              styles.font22,
              styles.textBlack,
              styles.textCenter,
              styles.mb11,
              styles.fontBold,
            ]}>
            Updated
          </Text>
          <Text
            style={[
              styles.font15,
              styles.textBlack,
              styles.mb37,
              styles.textCenter,
            ]}>
            Catalogue updated successfully.
          </Text>
          <View style={[styles.flexRow, styles.justifyCenter]}>
            <TouchableOpacity
              style={[
                styles.continueBtn,
                styles.width50,
                styles.flexRow,
                styles.justifyCenter,
              ]}
              onPress={() => {
                navigation.goBack();
              }}
            // onPress={() => navigation.navigate("Catelogue")}
            >
              <Text
                style={[styles.font16, styles.textWhite, styles.letspa35]}
                // onPress={() => navigation.navigate("Catelogue")}
                onPress={() => {
                  navigation.goBack();
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Update Popup Ends */}
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
            {editCatalogueError}
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
      {/* successpopup Ends */}
      {isstepone && (
        <TouchableOpacity onPress={handleSubmit1(onSubmit1)}>
          <View style={[styles.saveButtonFooter, styles.whiteBg]}>
            <Button style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
              <Text
                style={[
                  styles.font15,
                  styles.letterSpa33,
                  styles.textWhite,
                  styles.fontMed,
                ]}>
                Save & Continue
              </Text>
            </Button>
          </View>
        </TouchableOpacity>
      )}
      {issteptwo && (
        <View
          style={[
            styles.saveButtonFooter,
            styles.whiteBg,
            styles.flexRow,
            styles.alignCenter,
            styles.justifyBetween,
          ]}>
          <View style={[styles.width30]}>
            <TouchableOpacity
              onPress={() => {
                setissteptwo(!issteptwo);
                setisstepone(!isstepone);
              }}>
              <Text style={[styles.font15, styles.textPri]}>Previous</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.width70]}>
            <Button
              onPress={handleSubmit2(onSubmit2)}
              style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
              <Text
                style={[
                  styles.font15,
                  styles.letterSpa33,
                  styles.textWhite,
                  styles.fontMed,
                ]}>
                Save & Continue
              </Text>
            </Button>
          </View>
        </View>
      )}

      {isstepthree && (
        <View
          style={[
            styles.saveButtonFooter,
            styles.whiteBg,
            styles.flexRow,
            styles.alignCenter,
          ]}>
          <View style={[styles.width30]}>
            <TouchableOpacity
              onPress={() => {
                setisstepthree(!isstepthree);
                setissteptwo(!issteptwo);
              }}>
              <Text style={[styles.font15, styles.textPri]}>Previous</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.width70]}>
            <Button
              onPress={handleSubmit3(onSubmit)}
              style={[styles.primaryBg, styles.saveBtn, styles.width100]}>
              <Text
                style={[
                  styles.font15,
                  styles.letterSpa33,
                  styles.textWhite,
                  styles.fontMed,
                ]}>
                Submit
              </Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
