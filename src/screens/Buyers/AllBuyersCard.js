/** @format */

import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";


export default function AllBuyersCard({ navigation, route }) {
};
