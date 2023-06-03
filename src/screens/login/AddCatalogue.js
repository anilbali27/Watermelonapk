/** @format */

import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
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
  StatusBar,
} from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
//import SvgUri from "react-native-svg-uri-updated";
import { getDocumentAsync } from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as mime from "react-native-mime-types";
import RBSheet from "react-native-raw-bottom-sheet";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import styles from "../../../assets/css/styles";
import Catelogue from "./Catelogue";
import GlobalStyles from "../../../assets/css/styles";
import LeftArrowImg from "../../../assets/images/dashboard/left_arrow";
import BlackSearchIcon from "../../../assets/images/dashboard/black_search_icon";
import ChooseFileIcon from "../../../assets/images/dashboard/choose_file";
import BlackNotificationIcon from "../../../assets/images/dashboard/black_notification";
import DropDownIcon from "../../../assets/images/dashboard/dropdown";
import TickIcon from "../../../assets/jsx/dashbord/TickIcon";
import CollapseDropDown from "../../../assets/images/dashboard/collapse_dropdown";
import { useIsFocused } from "@react-navigation/native";
import CheckBox from "../../components/form/CheckBox";
import * as ImagePicker from "expo-image-picker";
export default function AddCatalogueScreen({ navigation }) {
  const {
    control,
    handleSubmit: handleSubmit1,
    formState: formState1,
    setValue
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
  const isFocused = useIsFocused();

  const [isstepone, setisstepone] = useState(true);
  const [issteptwo, setissteptwo] = useState(false);
  const [isstepthree, setisstepthree] = useState(false);
  const [country, setcountry] = useState("");
  const [quantity, setquantity] = useState("");
  const [shelllife, setshelllife] = useState("");
  const [ordersku, setordersku] = useState("");
  const [ordersku1, setordersku1] = useState("");

  const [copies, setCopies] = useState([]);


  const [SKUS, setSKUS] = useState("");
  const [SKUS1, setSKUS1] = useState("");
  const [SKUSkey1, setSKUSkey1] = useState("Select");

  const [SKUSkey, setSKUSkey] = useState([]);
  const [certificationkey, setcertificationkey] = useState(0);
  const [marketplacekey, setmarketplacekey] = useState(0);
  const [leadtimekey, setleadtimekey] = useState(0);
  const [certification, setcertification] = useState("");
  const [marketplace, setmarketplace] = useState("");
  const [leadtime, setleadtime] = useState("");
  const [baseUnit, setbaseUnit] = useState("");
  const [catalogueError, setCatalogueError] = useState("");
  const [hashtagselKey, sethashtagselKey] = useState(0);
  const [shelllifekey, setshelllifekey] = useState(0);
  const [CategoryselKey, setCategoryselKey] = useState(0);
  const [subCategoryselKey, setSubCategoryselKey] = useState(0);
  const [baseunitselKey, setBaseunitselKey] = useState(0);
  const [shelloptionskey, setshelloptionskey] = useState("Select");
  const [shelloptionsselkey, setshelloptionsselkey] = useState(0);
const[moqValues,setMoqValues] = useState([])
const[listPriceValues,setListPriceValues] = useState([])
const[promoPriceValues,setPromoPriceValues] = useState([])


  const [baseunitkey, setbaseunitkey] = useState(0);
  const [countrykey, setcountrykey] = useState("Select");
  const [Categorykey, setCategorykey] = useState("Select");
  const [subCategorykey, setsubCategorykey] = useState("Select");
  const [laedtimedayskey, setlaedtimedayskey] = useState("Select");
  const [laedtimedayskeyselkey, setlaedtimedayskeyselkey] = useState("Select");
  const [displayValue, setDisplayValue] = useState('Display Value');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
 
  
  const [hashtagkey, sethashtagkey] = useState("Select");
  const [statuskey, setstatuskey] = useState(0);
  const [Countrydata, setCountrydata] = useState([]);
  const [key, setkey] = useState(0);
  const [email, setEmail] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Select");
  const [brand, setBrand] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setsubCategory] = useState("");
  const [description1, setdescription1] = useState("");
  const [description2, setdescription2] = useState("");
  const [Userdata, setUserdata] = useState("");
  const [Categorydata, setCategorydata] = useState([]);
  const [SubCategoryData, setSubCategoryData] = useState([]);
  const [moq, setMoq] = useState("");
  const [display, setDisplay] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [SKUSdata, setSKUSdata] = useState([]);
  const [hashtagdata, sethashtagdata] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions,"selectedOptions")
  const [UOMdata, setUOMdata] = useState([]);
  const [productCode, setproductCode] = React.useState("");
  const [ProductName, setProductName] = React.useState(" ");
  const [presentationFile, setPresentationFile] = useState('');
  const [fields, setFields] = useState([{ SKUS: '', ordersku: '' }]);
  const[image,setImage]=useState("")
  const [fieldValues, setFieldValues] = useState([{ orderunit: '', equalsto: '' }]);
 const [upc,setUpc] = useState("")
  const resetFormText = () => {
    setCode("");
    setdescription1(" ");
    setdescription2("");
    setsubCategorykey("Select");
    setProductName("");
    setproductCode("");
    setBrand("");
    setCategorykey("Select");
    setquantity("");
    setName("");
    sethashtagkey("Select");
    setbaseunitkey("Select");
    setSKUS("");
    setCategoryselKey("Select");
    setSubCategoryselKey("Select");
    setbaseUnit("Select");
    setcountry("Select");
    setCategory("Select");
    setsubCategory("Select");
    setStatus("Select");
    setHashtag("Select");
    setSKUSkey("Select");
    setshelllife("");
    setBaseunitselKey("Select");
    setleadtime("");
    setcountrykey("Select");
    setmarketplace("");
    setstatuskey("");
  };

  useEffect(() => {
    gethashtagData(),
    getCategory(),

      getSKUSData(),
      getCountryOfOriginData(),
      getUOMData();
    setisstepone(true);
    setissteptwo(false);
    setisstepthree(false);
  }, [isFocused]);

  

  const initializeFieldValues = () => {
    const values = orderingOptions.map(() => ({
      moq: '',
      listPrice: '',
      promoPrice: '',
    }));
    setFieldValues(values);
  };

  const handleChangeFieldValue = (index, field, value) => {
    const newFieldValues = [...fieldValues];
    newFieldValues[index][field] = value;
    setFieldValues(newFieldValues);
  };

  const renderFields = () => {
    const selectedOption = fieldValues[selectedOptionIndex];
    if (!selectedOption) return null;

    const { moq, listPrice, promoPrice } = fieldValues[selectedOptionIndex];

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.heading}>MOQ</Text>
          <TextInput
            style={styles.editableValue}
            value={moq}
            onChangeText={(value) =>
              handleChangeFieldValue(selectedOptionIndex, 'moq', value)
            }
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>List Price</Text>
          <TextInput
            style={styles.editableValue}
            value={listPrice}
            onChangeText={(value) =>
              handleChangeFieldValue(selectedOptionIndex, 'listPrice', value)
            }
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.heading}>Promo Price</Text>
          <TextInput
            style={styles.editableValue}
            value={promoPrice}
            onChangeText={(value) =>
              handleChangeFieldValue(selectedOptionIndex, 'promoPrice', value)
            }
          />
        </View>
      </View>
    );
  };

  const handlePlusIconClick = () => {
    const newCopy = { SKUS: '', ordersku: '' };
    setCopies([...copies, newCopy]);
  };

  const handleMinusIconClick = (index) => {
    const newCopies = [...copies];
    newCopies.splice(index, 1);
    setCopies(newCopies);
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

  const getCategory = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      user_type_id: "",
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
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      // user_type_id: "",
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
      console.log(result,"resultresult")
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
  const handleOptionChange = (index) => {
    setSelectedOptionIndex(index);
  };
  const handleMoqValueChange = (value, index) => {
    const updatedMoqValues = [...moqValues]; // Create a copy of the moqValues array
    updatedMoqValues[index] = value; // Update the value at the specified index
    setMoqValues(updatedMoqValues); // Update the state with the updated moqValues
  };
  const handleListPriceValueChange = (value, index) => {
    const updatedListPriceValues = [...listPriceValues]; // Create a copy of the listPriceValues array
    updatedListPriceValues[index] = value; // Update the value at the specified index
    setListPriceValues(updatedListPriceValues); // Update the state with the updated listPriceValues
  };
  
  const handlePromoPriceValueChange = (value, index) => {
    const updatedPromoPriceValues = [...promoPriceValues]; // Create a copy of the promoPriceValues array
    updatedPromoPriceValues[index] = value; // Update the value at the specified index
    setPromoPriceValues(updatedPromoPriceValues); // Update the state with the updated promoPriceValues
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
                    styles.mb4,]}>MOQ</Text>
          <TextInput
            style={styles.inputStyle}
            value={moqValues[index]}
            onChangeText={(value) => handleMoqValueChange(value, index)}
          />
        </View>
        <View style={[styles.mb12]}>
          <Text style={[styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,]}>List Price</Text>
          <TextInput
            style={styles.inputStyle}
            value={listPriceValues[index]}
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
            value={promoPriceValues[index]}
            onChangeText={(value) => handlePromoPriceValueChange(value, index)}
          />
        </View>
      </View>
    ));
  };
  
  const getSKUSData = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
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
  const SKUSDataArray = SKUSdata.map((SKUS, index) => {
    let newData = {
      key: index + 1,
      label: SKUS.name,
      value: SKUS._id,
    };
    return newData;
  });
  //Success Pop up
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const selectOneFile = async () => {
    try {
      const res = await getDocumentAsync({
        type: [
          "image/png",
          "image/jpeg",
        ],

        multiple: true,
        copyToCacheDirectory: true,
        base64: true,
        
      });
      console.log(res),"QWERTYUIO"
      setPresentationFile(res);
    } catch (err) {
    }
  };

  const get_subcategory = async (cat_id) => {
    getSubCategory(cat_id);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      base64: true,
      bytes:true,
      aspect: [4, 3],
      quality: 1,
    });
    
    // console.log(result.base64,"RTWYWUWUWIWIWI")
    if (!result) {
      
      setImage(result.assets[0].base64);
      const extn = result.uri ? result.uri.split(".").pop() : "";
      const fileUriPart = result.uri ? result.uri.split("/") : [];
      const filename = fileUriPart.length
        ? fileUriPart[fileUriPart.length - 1]
        : "";
      const imageObj: any = {
         base64: result.base64,
       
        uri: result.uri,
        extn,
        type: `image/${extn}`,
        name: filename,
        // name:"data:image/jpg;base64," + result.base64
      };
      // console.log(filename,"SETIMAGRYU")
      

      // setImageError(false);
      // setImage(imageObj);
    } else {
      // setImageError(true);
      const extn = result.uri ? result.uri.split(".").pop() : "";
      const fileUriPart = result.uri ? result.uri.split("/") : [];
      const filename = fileUriPart.length
        ? fileUriPart[fileUriPart.length - 1]
        : "";
      const imageObj: any = {
         base64: result.assets[0].base64,
       
        uri: result.uri,
        extn,
        type: `image/${extn}`,
        name: filename,
        // name:"data:image/jpg;base64," + result.base64
      };
  //  setImageName()
       console.log(imageObj,'dss')
      setImage(imageObj);
      //  setImage(null);
    }

  };
  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let supplierId = await AsyncStorage.getItem("userTypeId");
    let userType = await AsyncStorage.getItem("userType");
   
    let token = jsonValue;
    console.log(image,'image image')
    const pricing_range = listPriceValues.map((listPrice, index) => {
      const moqValue = moqValues[index];
      const promoval = promoPriceValues[index]
      const _ids = SKUSkey[index]
      return {
        default: true,
        priceunit: listPrice,
        id: _ids,
        pricemoq: moqValue,
        ref: "",
        promo: promoval,
        sku_status: true,
        isuom: true,
      };
    });

    var myJson = {
      product_code: code,
      product_name: ProductName,
      company: name,
      brand: brand,
      tags: hashtagkey,
      supplier_product_code: productCode,
      category_id: Categorykey,
      subcategory_id: subCategorykey,
      in_stock: "",
      pro_img_base64: image.base64,
      short_desc: description1,
      long_desc: description2,
      base_uom: baseunitkey,
      sku_id:baseUnit,
      critical_level: quantity,
      ordering_option: fieldValues,
      platform:"mobile",
      upc_ean_no:upc,
      pricing_range: pricing_range ,
      shelf_life: shelllife,
      shelf_daymonth: shelloptionskey,
      lead_daymonth: laedtimedayskey,
      lead_time: leadtime,
           
      country_of_origin: countrykey,
      hashtag: hashtag,
      certification: selectedOptions,
      in_marketplace: marketplace,
      user_type: parseInt(userType),
      user_type_id: supplierId,
      status: statuskey,
    };
    console.log(myJson,"ADD CATALOGUE")
    const result = await api.createProduct(
      token,
      endPoint.create_Product,
      myJson
    );
    console.log(result,"resultresultresultresult")
    if (result.success === "1") {
      refRBSheet.current.open();
      resetFormText();
      setUserdata(false);
    } else {
      setCatalogueError(result.message);
      refRBSheet1.current.open();

      setUserdata(true);
    }
  };

  const handleCheckBoxToggle = (option) => {
    if (selectedOptions.some((selectedOption) => selectedOption.id === option.id)) {
      setSelectedOptions(selectedOptions.filter((item) => item.id !== option.id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  
  
  // category
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

  const categoryDataArray = Categorydata.map((category, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      value: category._id,
      label: category.category_name,
    };
    return newData;
  });
  //BaseUnitData

  const BaseUnitDataArray = UOMdata.map((uom, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: uom.name,
      value: uom._id,
    };
    return newData;
  });
  // sub category
  const subcategoryDataArray = SubCategoryData.map((subCategory, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: subCategory.subcategory_name,
      value: subCategory._id,
    };
    return newData;
  });

  //Country
  const countryDataArray = Countrydata.map((country, index) => {
    let newData = {
      // key: project.projectId + '_' + index,
      key: index + 1,
      label: country.code,
      value: country._id,
    };
    return newData;
  });

  // status
  const shelllifeDataArray = [
    { key: 1, label: "Day(s)", value: 0 },
    { key: 2, label: "Month(s)", value: 1 },
  ];

  const StatusData = [
    { key: 1, label: "Inactive", value: 0 },
    { key: 2, label: "Active", value: 1 },
  ]
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

 

  const addField = () => {
    // setFields([...fields, { SKUS: '', ordersku: '' }]);
    setFieldValues((prevFieldValues) => [...prevFieldValues, { orderunit: '', equalsto: '' }]);
  };


const removeLastField = () => {
  setFieldValues((prevFieldValues) => prevFieldValues.slice(0, -1));
};


return (
  <View style={{ flex: 1 }}>
  
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
            {/* <SvgUri
                source={require("../../../assets/images/dashboard/left_arrow.jsx")}
              /> */}
            <LeftArrowImg />
          </TouchableOpacity>
        </View>
        <View style={[styles.width60, styles.flexRow, styles.justifyCenter]}>
          <Text style={[styles.textBlack, styles.font16, styles.fontSemi]}>
            Add Catalogue
          </Text>
        </View>
        <View
          style={[
            styles.flexRow,
            styles.alignCenter,
            styles.width20,
            styles.justifyEnd,
          ]}>
          {/* <SvgUri
              source={require("../../../assets/images/dashboard/black_search_icon.svg")}
            /> */}
          {/* < BlackSearchIcon/> */}
          <View>
            <View style={[styles.notCount, styles.borderWhite]}></View>
            {/* <SvgUri
                source={require("../../../assets/images/dashboard/black_notification.svg")}
                style={[styles.marlft17]}
              /> */}
            <BlackNotificationIcon />
          </View>
        </View>
      </View>
    </View>
    {/* Header HTML - Ends */}
    <ScrollView style={[styles.grayBg]}>
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
                // onPress={() => selectOneFile()}
                onPress={()=>pickImage()}
                >
                {/* <SvgUri
                    source={require("../../../assets/images/dashboard/choose_file.svg")}
                    style={[styles.mb18]}
                  /> */}
                <ChooseFileIcon />
                <Text style={[styles.font15, styles.textBlack, styles.mb2]}>
                  Choose file here
                </Text>
                <Text style={[styles.font12, styles.textDefault]}>
                  Tap here to upload your catalogue images
                </Text>
              </TouchableOpacity>
              {presentationFile &&  
                <View>
                  <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    File Name:{" "}
                    {presentationFile?.name ? presentationFile.name : ""}
                    {"\n"}
                  </Text>
                </View>
              }
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
              {/* <View style={[styles.mb20, styles.width100]}>
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
                      rules={{
                        required: "System generated product code is required.",
                      }}
                      render={(props) => (
                        <TextInput
                          style={[
                            styles.inputStyle,
                            styles.fontMed,
                            formState1.errors.code && styles.borderRed,
                          ]}
                          placeholderTextColor='#222B2E'
                          onChangeText={(code) => {
                            setCode(code);
                            props.field.onChange(code);
                          }}
                          value={code}
                        />
                      )}
                    />
                    {formState1.errors.code && (
                      <Text style={[styles.errorMsg]}>
                        System generated product code is required.
                      </Text>
                    )}
                  </View>
                </View> */}
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
                  rules={{ required: "Product name is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        formState1.errors.ProductName && styles.borderRed,
                      ]}
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
                    Product name is required.
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
                  Brand<Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <Controller
                  name='brand'
                  control={control}
                  rules={{ required: "Brand is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        formState1.errors.brand && styles.borderRed,
                      ]}
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
                  rules={{ required: "Supplier product code is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        formState1.errors.productCode && styles.borderRed,
                      ]}
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
                    Product code is required.
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
                  {/* <SvgUri
                      source={require("../../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    /> */}
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: "Category is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={categoryDataArray}
                        initValue={Categorykey}
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState1.errors.category && styles.borderRed,
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
                        value={Categorykey}
                      />
                    )}
                  />
                </View>
                {formState1.errors.category && (
                  <Text style={[styles.errorMsg]}>Category is required.</Text>
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
                  {/* <SvgUri
                      source={require("../../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    /> */}
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='subCategory'
                    control={control}
                    rules={{ required: "Sub Category is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={subcategoryDataArray}
                        initValue={subCategorykey}
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState1.errors.subCategory && styles.borderRed,
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
                        selectedKey={subCategoryselKey}
                        onChange={(option) => {
                          if (option.key) {
                            setsubCategory(option.label);
                            setSubCategoryselKey(option.key);
                            setsubCategorykey(option.value);
                            props.field.onChange(option.value);
                          }
                        }}
                        value={subCategorykey}
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
                  {/* <SvgUri
                      source={require("../../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    /> */}
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='status'
                    control={control}
                    rules={{ required: "Status is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={StatusData}
                        initValue={status}
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState1.errors.status && styles.borderRed,
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
                  {/* <SvgUri
                      source={require("../../../assets/images/dashboard/dropdown.svg")}
                      style={[styles.modalDropDown]}
                    /> */}
                  <DropDownIcon style={[styles.modalDropDown]} />
                  <Controller
                    name='hashtag'
                    control={control}
                    rules={{ required: "Hashtag is required." }}
                    render={(props) => (
                      <ModalSelector
                        data={HashtagDataArray}
                        initValue='Select'
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState1.errors.hashtag && styles.borderRed,
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

                        selectedKey={hashtagselKey}
                        onChange={(option) => {
                          if (option.key) {
                            setHashtag(option.label);
                            sethashtagselKey(option.key);
                            sethashtagkey(option.value);
                            props.field.onChange(option.value);
                          }
                        }}
                        value={hashtagselKey}
                      />
                    )}
                  />
                </View>
                {formState1.errors.hashtag && (
                  <Text style={[styles.errorMsg]}>Hashtag is required.</Text>
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
                  rules={{ required: "Short description is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.textArae,
                        formState1.errors.description1 && styles.borderRed,
                      ]}
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
                  rules={{ required: "Long description is required." }}
                  render={(props) => (
                    <TextInput
                      style={[
                        styles.inputStyle,
                        styles.textArae,
                        formState1.errors.description2 && styles.borderRed,
                      ]}
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
              <Text
                style={[
                  GlobalStyles.labelText,
                  GlobalStyles.font12,
                  GlobalStyles.fontMed,
                  GlobalStyles.mb4,
                ]}>
                Basic Unit
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='baseUnit'
                  control={control2}
                  rules={{ required: "Base unit is required." }}
                  render={(props) => (
                    <View>
                      {/* <SvgUri
                          source={require("../../../assets/images/dashboard/dropdown.svg")}
                          style={[GlobalStyles.modalDropDown]}
                        /> */}
                      <DropDownIcon style={[styles.modalDropDown]} />
                      <ModalSelector
                        data={BaseUnitDataArray}
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState2.errors.baseUnit && styles.borderRed,
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
                        initValue='Select'
                        selectedKey={baseunitselKey}
                        onChange={(option) => {
                          if (option.key) {
                            setbaseUnit(option.value);
                            setBaseunitselKey(option.key);
                            setbaseunitkey(option.label);
                            props.field.onChange(option.value);
                          }
                        }}
                        value={baseunitkey}
                      />
                    </View>
                  )}
                />
                {formState2.errors.baseUnit && (
                  <Text style={[styles.errorMsg]}>
                    Base unit is required.
                  </Text>
                )}
              </View>
            </View>

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
                  GlobalStyles.labelText,
                  GlobalStyles.font12,
                  GlobalStyles.fontMed,
                  GlobalStyles.mb4,
                ]}>
                Shell Life
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>

              <View style={[styles.flexRow]}>
                    <View style={[styles.width50, styles.pr8]}>
                <Controller
                  name='shelllife'
                  control={control2}
                  rules={{ required: "Shell life is required." }}
                  render={(props) => (

                    <TextInput
                      style={[
                        styles.inputStyle,
                        formState2.errors.shelllife && styles.borderRed,
                      ]}
                      multiline={true}
                      keyboardType={"numeric"}
                      onChangeText={(shelllife) => {
                        props.field.onChange(shelllife);
                        setshelllife(shelllife);
                      }}
                      value={shelllife}
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
                     
                        selectStyle={[
                          styles.inputStyle,
                          styles.flexRow,
                          styles.alignCenter,
                          styles.justifyStart,
                          formState2.errors.shelllife && styles.borderRed,
                        ]}                     
                           initValueTextStyle={[styles.font15, styles.textBlack, styles.fontMed]}
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
                <Text style={[styles.errorMsg]}>Shell life is required.</Text>
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
                  GlobalStyles.labelText,
                  GlobalStyles.font12,
                  GlobalStyles.fontMed,
                  GlobalStyles.mb4,
                ]}>
                Critical Level
              </Text>
              <View>
                <Controller
                  name='quantity'
                  control={control2}
                  // rules={{ required: "Critical quantity is required." }}
                  render={(props) => (
                    // <ModalSelector
                    //             data={CriticalquantityData}
                    //             initValue="Select"
                    //             // onChangeText={(quantity) => setquantity(quantity)}

                    //             selectStyle={[styles.inputStyle, styles.flexRow, styles.alignCenter, styles.justifyStart]}
                    //             initValueTextStyle={[styles.font15, styles.textBlack, styles.fontMed]}
                    //             overlayStyle={[styles.popupOverlay, styles.flexColumn, styles.justifyEnd, styles.alignCenter]}
                    //             optionContainerStyle={[styles.width300px]}
                    //             cancelStyle={[styles.width300px, styles.marHorauto]}
                    //             optionTextStyle={[styles.textBlack, styles.font15]}
                    //             cancelTextStyle={[styles.textBlack, styles.font15]}
                    //             onChange={(option) => {
                    //                 if (option.key) {
                    //                     setquantity(option.key)
                    //                  setkey(option.key)
                    //                   props.field.onChange(option.key);
                    //                 }
                    //               }}
                    //               value={key}

                    //         />
                    <TextInput
                    style={[
                      styles.inputStyle,
                      formState2.errors.quantity && styles.borderRed,
                    ]}
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
                    style={[
                      styles.inputStyle,
                      formState2.errors.upc && styles.borderRed,
                    ]}
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
                  GlobalStyles.labelText,
                  GlobalStyles.font12,
                  GlobalStyles.fontMed,
                  GlobalStyles.mb4,
                ]}>
                Country of Origin
                <Text style={[styles.font12, styles.textPri1]}>*</Text>
              </Text>
              <View>
                <Controller
                  name='country'
                  control={control2}
                  rules={{ required: "Country of origin is required." }}
                  render={(props) => (
                    <View>
                      {/* <SvgUri
                          source={require("../../../assets/images/dashboard/dropdown.svg")}
                          style={[GlobalStyles.modalDropDown]}
                        /> */}
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
                          formState2.errors.country && styles.borderRed,
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
                {formState2.errors.country && (
                  <Text style={[styles.errorMsg]}>
                    Country of origin is required.
                  </Text>
                )}
              </View>
            </View>

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
              // <View
              //   key={index}
              //   style={[
              //     styles.width100,
              //     styles.whiteBg,
              //     styles.pad16,
              //     styles.borderRadius4,
              //     styles.mb14,
              //   ]}
              // >
              //   <View
              //     style={[
              //       styles.width50,
              //       styles.whiteBg,
              //       styles.pad16,
              //       styles.borderRadius4,
              //       styles.mb14,
              //     ]}
              //   >
              //     <Text
              //       style={[
              //         GlobalStyles.labelText,
              //         GlobalStyles.font12,
              //         GlobalStyles.fontMed,
              //         GlobalStyles.mb4,
              //       ]}
              //     >
              //       Ordering Options(SKUS)
              //     </Text>
              //     <View>
              //       <Controller
              //         name={`orderunit[${index}].orderunit`}
              //         control={control3}
              //         // rules={{ required: "SKUS is required." }}
              //         render={({ field: { onChange, value } }) => (
              //           <View>
              //             <DropDownIcon style={[styles.modalDropDown]} />
              //             <ModalSelector
              //               data={SKUSDataArray}
              //               initValue={field.orderunit}
              //               selectStyle={[
              //                 styles.inputStyle,
              //                 styles.flexRow,
              //                 styles.alignCenter,
              //                 styles.justifyStart,
              //               ]}
              //               initValueTextStyle={[
              //                 styles.font15,
              //                 styles.textBlack,
              //                 styles.fontMed,
              //               ]}
              //               overlayStyle={[
              //                 styles.popupOverlay,
              //                 styles.flexColumn,
              //                 styles.justifyEnd,
              //                 styles.alignCenter,
              //               ]}
              //               optionContainerStyle={[styles.width300px]}
              //               cancelStyle={[styles.width300px, styles.marHorauto]}
              //               optionTextStyle={[styles.textBlack, styles.font15]}
              //               cancelTextStyle={[styles.textBlack, styles.font15]}
              //               onChange={(option) => {
              //                 if (option.key) {
              //                   const updatedFieldValues = [...fieldValues];
              //                   updatedFieldValues[index].orderunit  = option.label;
              //                   setFieldValues(updatedFieldValues);
              //                   // console.log(fieldValues,"VALUSDOPAYIONDS")
              //                   // console.log(fieldValues.option)
              //                   onChange(option.label);
              //                 }
              //               }}
              //               value={value}
              //             />
              //           </View>
              //         )}
              //       />
              //       {formState3.errors.SKUS && (
              //         <Text style={[styles.errorMsg]}>
              //           Ordering options is required.
              //         </Text>
              //       )}
                   
              //     </View>
              //   </View>
              //   <View
              //     style={[
              //       styles.width50,
              //       styles.whiteBg,
              //       styles.pad16,
              //       styles.borderRadius4,
              //       styles.mb14,
              //     ]}
              //   >
              //     <Controller
              //       name={`equalsto[${index}].equalsto`}
              //       control={control2}
              //       rules={{ required: "ordersku is required." }}
              //       render={({ field }) => (
              //         <TextInput
              //           style={[
              //             styles.inputStyle,
              //             formState2.errors.ordersku && styles.borderRed,
              //           ]}
              //           textAlignVertical="top"
              //           multiline={true}
              //           keyboardType={"numeric"}
              //           onChangeText={(equalsto) => {
              //             const updatedFieldValues = [...fieldValues];
              //           updatedFieldValues[index].equalsto  = equalsto;
              //           setFieldValues(updatedFieldValues);
              //           field.onChange(equalsto);
              //           }}
              //           value={field.equalsto}
              //         />
              //       )}
              //     />
              //     <Text>=</Text>
              //     <View >
              //     <TextInput
              //         style={[styles.inputStyle, styles.textArae]}
              //         textAlignVertical='top'
              //         multiline={true}
              //         keyboardType={"numeric"}
              //         // onChangeText={(quantity) => {
              //         //   props.field.onChange(quantity);
              //         //   setquantity(quantity);
              //         // }}
              //         value={baseunitkey}
              //       />
                  
              //     </View>
              //   </View>
              //   {index === 0 && (
              //     <TouchableOpacity onPress={addField}>
              //       <Text>Add More</Text>
              //     </TouchableOpacity>
              //   )}
              //   {index === fieldValues.length - 1 && index !== 0 && (
              //     <TouchableOpacity onPress={removeLastField}>
              //       <Text>Remove Last</Text>
              //     </TouchableOpacity>
              //   )}
              // </View>
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
                    styles.width40,
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
                    styles.width30,
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
                <Text style={styles.equalsText}> = </Text>
                <View style={[
        styles.width30,
        styles.pl8,
        styles.flexRow,
        styles.alignCenter,
      ]}>
                   <TextInput
                      style={[styles.inputStyle]}
                       textAlignVertical='top'
                      multiline={true}
                      keyboardType={"numeric"}
                      // onChangeText={(quantity) => {
              //         //   props.field.onChange(quantity);
              //         //   setquantity(quantity);
              //         // }}
                      value={baseunitkey}
                   />
                  
                   </View>
              </View>
              {index === 0 && (
              //    <TouchableOpacity onPress={addField}>
              //    <Feather name="plus" size={24} color="black" />
              //  </TouchableOpacity>
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
                  GlobalStyles.labelText,
                  GlobalStyles.font12,
                  GlobalStyles.fontMed,
                  GlobalStyles.mb4,
                ]}>
                Certification
              </Text>

              <View>
              <View>
     
              {options.map((option) => (
  <CheckBox
    key={option.id}
    title={option.label}
    isChecked={selectedOptions.some((selectedOption) => selectedOption.id === option.id)}
    onPress={() => handleCheckBoxToggle(option)}
  />
))}
    </View>
                {/* <Controller
                  name='certification'
                  control={control3}
                  //rules={{ required: "Certification is required." }}
                  render={(props) => (
                    <TextInput
                      style={[styles.inputStyle, styles.textArae]}
                      textAlignVertical='top'
                      multiline={true}
                      onChangeText={(certification) => {
                        props.field.onChange(certification);
                        setcertification(certification);
                      }}
                      value={certification}
                    />
                  )}
                /> */}
              </View>

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
                    GlobalStyles.labelText,
                    GlobalStyles.font12,
                    GlobalStyles.fontMed,
                    GlobalStyles.mb4,
                  ]}>
                  Market Place Settings
                </Text>

                <View>
                  <Controller
                    name='marketplace'
                    control={control3}
                    // rules={{ required: "Market place is required." }}
                    render={(props) => (
                      // <ModalSelector
                      //             data={MarketPlaceData}
                      //             initValue="Select"
                      //             // onChangeText={(country) => setcountry(country)}

                      //             selectStyle={[styles.inputStyle, styles.flexRow, styles.alignCenter, styles.justifyStart]}
                      //             initValueTextStyle={[styles.font15, styles.textBlack, styles.fontMed]}
                      //             overlayStyle={[styles.popupOverlay, styles.flexColumn, styles.justifyEnd, styles.alignCenter]}
                      //             optionContainerStyle={[styles.width300px]}
                      //             cancelStyle={[styles.width300px, styles.marHorauto]}
                      //             optionTextStyle={[styles.textBlack, styles.font15]}
                      //             cancelTextStyle={[styles.textBlack, styles.font15]}
                      //             onChange={(option) => {
                      //                 if (option.key) {
                      //                     setmarketplacekey(option.key)
                      //                     setmarketplace(option.key)
                      //                   props.field.onChange(option.key);
                      //                 }
                      //               }}
                      //               value={marketplacekey}

                      //         />
                      <TextInput
                        style={[styles.inputStyle, styles.textArae]}
                        keyboardType={"numeric"}
                        textAlignVertical='top'
                        multiline={true}
                        onChangeText={(marketplace) => {
                          props.field.onChange(marketplace);
                          setmarketplace(marketplace);
                        }}
                        value={marketplace}
                      />
                    )}
                  />
                </View>
              </View>
              {formState3.errors.marketplace && (
                <Text style={[styles.errorMsg]}>Market place is required.</Text>
              )} */}
            {/* MARKET PLACE SETTINGS - ends */}

            {/* LEAD TIME */}
            {marketplace &&
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
                        textAlignVertical='top'
                        multiline={true}
                        onChangeText={(leadtime) => {
                          props.field.onChange(leadtime);
                          setleadtime(leadtime);
                        }}
                        value={leadtime}
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
                        initValueTextStyle={[styles.font15, styles.textBlack, styles.fontMed]}
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
                  {formState3.errors.leadtime && (
                    <Text style={[styles.errorMsg]}>
                      Lead time is required.
                    </Text>
                  )}
                </View>
              </View>
            }
            {/* LEAD TIME - ends */}
{fieldValues[selectedOptionIndex]?.orderunit &&
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
}
            {/* <View style={[styles.mb28]}>
                <Text
                  style={[
                    styles.labelText,
                    styles.font12,
                    styles.fontMed,
                    styles.mb4,
                  ]}>
                  Catalogue for
                  <Text style={[styles.font12, styles.textPri1]}>*</Text>
                </Text>
                <View style={[styles.flexRow, styles.flexWrap]}>
                  <TouchableOpacity
                    style={[
                      styles.catalogueForcheckbox,
                      styles.mr10,
                      styles.borderActive,
                      styles.checkboxBG,
                      GlobalStyles.mb12,
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
                      GlobalStyles.mb12,
                    ]}>
                    <Text
                      style={[styles.font13, styles.textBlack, styles.fontMed]}>
                      Offers by Supplier
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.catalogueForcheckbox,
                      styles.mr10,
                      styles.whiteBg,
                      GlobalStyles.mb12,
                    ]}>
                    <Text
                      style={[styles.font13, styles.textBlack, styles.fontMed]}>
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
          Added Successfully
        </Text>
        <Text
          style={[
            styles.font15,
            styles.textBlack,
            styles.mb37,
            styles.textCenter,
          ]}>
          Your catalogue added successfully
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
          {catalogueError}
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
          GlobalStyles.saveButtonFooter,
          GlobalStyles.whiteBg,
          GlobalStyles.flexRow,
          GlobalStyles.alignCenter,
          GlobalStyles.justifyBetween,
        ]}>
        <View style={[GlobalStyles.width30]}>
          <TouchableOpacity
            onPress={() => {
              setissteptwo(!issteptwo);
              setisstepone(!isstepone);
            }}>
            <Text style={[GlobalStyles.font15, GlobalStyles.textPri]}>
              Previous
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[GlobalStyles.width70]}>
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
          GlobalStyles.flexRow,
          GlobalStyles.alignCenter,
        ]}>
        <View style={[GlobalStyles.width30]}>
          <TouchableOpacity
            onPress={() => {
              setisstepthree(!isstepthree);
              setissteptwo(!issteptwo);
            }}>
            <Text style={[GlobalStyles.font15, GlobalStyles.textPri]}>
              Previous
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[GlobalStyles.width70]}>
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