/** @format */

import React, { useState, useEffect, useRef, usestate } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Linking,
} from "react-native";
import styles from "../../../assets/css/styles";
import SideMenu from "../../../assets/images/dashboard/sidemenu_icon.svg";
import ModalSelector from "react-native-modal-selector";
import SearchIcon from "../../../assets/images/dashboard/notification_icon.svg";
import { Searchbar } from "react-native-paper";
import { Button } from "react-native-paper";
import { getDocumentAsync } from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as mime from "react-native-mime-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";

export default function ImportCatalogueScreen({ navigation }) {
  const [presentationFile, setPresentationFile] = useState({});
  const [importdata, setimportdata] = useState("");
  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await getDocumentAsync({
        type: "*/*",
        multiple: false,
        copyToCacheDirectory: true,
      });
      console.log(res);
      if (res.type && res.type === "cancel") {
        //If user canceled the document selection
        console.log("Canceled from single doc picker");
      } else {
        //Printing the log realted to the file
        console.log("res : " + JSON.stringify(res));
        console.log("uri : " + res.uri);
        console.log("type : " + res.type);
        console.log("File name : " + res.name);
        console.log("File Size : " + res.size);
        //Setting the state to show single file attributes
        const base64String = await FileSystem.readAsStringAsync(res.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const extn = res.name ? res.name.split(".").pop() : "";
        const fileType = mime.lookup(extn);
        res.base64 = `data:${fileType};base64,${base64String}`;
        res.extn = extn;
        const fileUriPart = res.uri ? res.uri.split("/") : [];
        const filename = fileUriPart.length
          ? decodeURIComponent(fileUriPart[fileUriPart.length - 1])?.replace(
              /\s/g,
              "_"
            )
          : "";
        res.filename = filename;
        res.fileType = fileType;
        setPresentationFile(res);
      }
    } catch (err) {
      //For Unknown Error
      alert("Unknown Error: " + JSON.stringify(err));
      console.log(err);
      throw err;
    }
  };

  const openResume = (presentationFile) => {
    if (presentationFile) {
      const file_url = `https://www.africau.edu/images/default/sample.pdf`;
      console.log(file_url, "filename");
      Linking.canOpenURL(file_url).then(async (supported) => {
        if (supported) {
          Linking.openURL(file_url);
        } else {
          await WebBrowser.openBrowserAsync(file_url);
        }
      });
    }
  };

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonUserId = await AsyncStorage.getItem("userTypeId");

    let token = jsonValue;
    var myJson = {
      product_csv: presentationFile.base64,
      user_type_id: jsonUserId,
      validate: "1",
    };
    console.log(myJson, "234567");
    const result = await api.addfile(token, endPoint.add_Cv, myJson);
    console.log(result, "9889876543");

    if (result) {
      alert(result.message);
      setimportdata(result.data);
      navigation.goBack();
    } else {
      setimportdata(true);
    }
  };

  // searchbar
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ScrollView style={[styles.grayBg]}>
      <View style={[styles.pad20, styles.padb80]}>
        {/* Upload csv file */}
        <View style={[styles.mb28]}>
          <View
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.justifyBetween,
              styles.mb9,
            ]}>
            <Text style={[styles.textDefault, styles.font13]}>
              Upload CSV File{" "}
              <Text style={[styles.textPri, styles.font13]}>*</Text>
            </Text>
            <TouchableOpacity onPress={() => openResume(presentationFile)}>
              <Text style={[styles.textPri, styles.font13, styles.underline]}>
                Download Sample
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.dragChooseFile,
              styles.uploadCsv,
            ]}
            onPress={() => selectOneFile()}>
            <SvgUri
              source={require("../../../assets/images/dashboard/choose_file.svg")}
            />
            <View style={[styles.pl15]}>
              <Text style={[styles.textDefault, styles.font13, styles.mb3]}>
                Choose File here
              </Text>
              <Text style={[styles.textDefault, styles.font13]}>
                (max file size 50mb)
              </Text>
            </View>
          </TouchableOpacity>
          {presentationFile && presentationFile.type === "success" && (
            <View>
              <Text style={{ fontSize: 13, fontWeight: "500" }}>
                File Name: {presentationFile?.name ? presentationFile.name : ""}
                {"\n"}
              </Text>
            </View>
          )}
        </View>
        {/* Upload csv file Ends */}

        {/* Notes HTML */}
        <Text
          style={[
            styles.font16,
            styles.textBlack,
            styles.mb9,
            styles.fontSemi,
          ]}>
          Notes:
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          All fields are mandatory to import products.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "CODE" should be unique for a different product. But it could be the
          same when multiple SKUs for the same product.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "CATEGORY" & "SUB_CATEGORY" should be matched with the database.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "UOM" should be matched with the options (KG, G, Pc, Pkt, Ltr, ml).
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "SKU" should be matched with the options (Carton, Box, Package, KG).
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "UOM_VALUE", "LIST_PRICE", "PROMO_PRICE" should be decimal values.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          "MOQ" should be number values and greater than 0.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          Leave SKU, UOM_VALUE blank if you do not have multiple SKUs. It will
          be consider UOM as SKU.
        </Text>
        <Text style={[styles.font12, styles.textBlack, styles.mb9]}>
          For any assistance in importing the catalogue, please email
        </Text>
        {/* Notes HTML Ends */}
        <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
          <View style={[styles.width50, styles.pr15]}>
            <TouchableOpacity onPress={() => onSubmit()}>
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
                  style={[styles.font15, styles.letterSpa33, styles.textWhite]}>
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
      </View>
    </ScrollView>
  );
}
