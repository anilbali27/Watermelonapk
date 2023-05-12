/** @format */

import { StyleSheet, I18nManager } from "react-native";
import { COLORS } from "../../src/constant/Colors";
import { FONTS } from "../../src/constant/Font";
const isAndroidRTL = I18nManager.isRTL && Platform.OS === "android";
import { Dimensions } from "react-native";

const GlobalStyles = StyleSheet.create({
  /** intorslider css **/
  flexOne: {
    flex: 1,
    backgroundColor: COLORS.theme,
  },
  flatList: {
    flex: 1,
    flexDirection: isAndroidRTL ? "row-reverse" : "row",
  },
  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  skipContainer: {
    right: 16,
    marginTop: 50,
    flex: 0.05,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: isAndroidRTL ? "row-reverse" : "row",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  leftButtonContainer: {
    position: "absolute",
    backgroundColor: COLORS.DragBG,
    top: 0,
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  rightButtonContainer: {
    position: "absolute",
    backgroundColor: COLORS.button,
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    color: COLORS.white,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .3)",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentBottomButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextSkip: {
    color: COLORS.button,
    fontSize: 15,
    padding: 5,
    fontFamily: FONTS.Medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    padding: 8,
    fontFamily: FONTS.Medium,
  },
  /** intorslider css - Ends **/
  mainContainer: {
    alignItems: "center",
    margin: 0,
    padding: 40,
  },

  signupContainer: {
    flex: 1,
    width: "100%",
    margin: 0,
    padding: 0,
  },
  backgrey: {
    paddingHorizontal: 35,
    paddingBottom: 2,
  },
  signupTitle: {
    backgroundColor: COLORS.white,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 18,
  },
  signupTitleStyle: {
    fontFamily: FONTS.SemiBold,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
  },
  signupParagraph: {
    textAlign: "left",
    paddingTop: 20,
    paddingLeft: 18,
    paddingBottom: 29,
    fontSize: 12,
    fontFamily: FONTS.Medium,
    color: COLORS.textInputBorder,
    lineHeight: 15,
  },
  signupInputContainer: {
    backgroundColor: COLORS.white,
  },
  signupTextInput: {
    fontSize: 16,
  },
  signupPasswordInput: {
    fontSize: 16,
    width: "85%",
  },
  signupInputContainerButton: {
    padding: 10,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  shadowProp: {
    shadowColor: COLORS.colorFive,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  container: {
    marginTop: 50,
  },
  inputView: {
    marginBottom: 6,
  },
  signupInputView: {
    marginBottom: 20,
  },
  logo: {
    paddingTop: 0,
    marginTop: 20,
    width: 185,
    height: 120,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLORS.textInputBorder,
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    padding: 5,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    justifyContent: "space-between",
  },
  imageIcon: {
    // width: '100%',
    //height: 40,
    // alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: 110,
    height: 60,
    backgroundColor: COLORS.DragBG,
    borderRadius: 6,
  },
  logoIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 10,
    height: 10,
    //backgroundColor: '#F7F9FA',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  logoAppleIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 20,
    //backgroundColor: '#F7F9FA',
    marginLeft: 10,
    marginRight: 10,
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "bold",
    lineHeight: 26,
  },
  paragraphStyle: {
    textAlign: "center",
    fontSize: 15,
    color: COLORS.loginText,
    lineHeight: 22,
  },
  TextInput: {
    fontSize: 16,
  },
  passwordIcon: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 0,
    textAlign: "right",
  },
  passwordInput: {
    width: "80%",
    fontSize: 15,
  },
  labelText: {
    fontSize: 12,
    paddingBottom: 2,
    color: COLORS.loginTextInput,
    fontFamily: FONTS.Medium,
  },
  forgot_button: {
    textAlign: "right",
    color: COLORS.button,
    fontFamily: FONTS.Medium,
  },
  loginBtn: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.button,
    marginTop: 27,
    marginBottom: 56,
    borderRadius: 6,
  },
  deliverySubmit: {
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.button,
    marginTop: 38,
    marginBottom: 12,
    borderRadius: 6,
  },
  loginText: {
    width: "100%",
    color: COLORS.white,
    fontFamily: FONTS.Medium,
    textAlign: "center",
    padding: 10,
  },
  labelSignin: {
    marginBottom: 26,
    textAlign: "center",
    fontFamily: FONTS.Regular,
    color: COLORS.colorFour,
  },
  newSignup: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 12,
  },
  account: {
    color: COLORS.colorFour,
    fontFamily: FONTS.Regular,
  },
  new_sign: {
    color: COLORS.button,
    fontFamily: FONTS.Regular,
  },

  frontcontainer: {
    flex: 1,
    backgroundColor: COLORS.theme,
    alignItems: "center",
    //padding: 10,
    justifyContent: "center",
  },
  // titleStyle: {
  //   padding: 10,
  //   textAlign: 'center',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 350,
    height: 450,
  },
  introTextStyle: {
    fontSize: 16,
    color: COLORS.introText,
    fontFamily: FONTS.Regular,
    textAlign: "center",
    marginTop: 40,
  },
  introTitleStyle: {
    fontSize: 20,
    fontFamily: FONTS.Bold,
    color: COLORS.introText,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 0,
    paddingBottom: 5,
    marginTop: 40,
  },

  /*** dashboard css **/
  dahboardHeader: {
    backgroundColor: COLORS.button,
    paddingTop: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  width100: {
    width: "100%",
  },
  width: {
    width: 340,
  },
  flexRow: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  textWhite: {
    color: COLORS.white,
  },
  font12: {
    fontSize: 12,
    lineHeight: 15,
  },
  fontBold: {
    fontWeight: "700",
  },
  fontSemi: {
    fontWeight: "700",
  },
  dashboardLogo: {
    width: 41,
    height: 41,
  },
  sidemenuProfile: {
    width: 43,
    borderRadius: 43,
    height: 43,
  },
  unibicLogo: {
    width: 28,
    height: 28,
  },
  textCenter: {
    textAlign: "center",
  },
  width20: {
    width: "20%",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  marlft13: {
    marginLeft: 13,
  },
  marlft21: {
    marginLeft: 21,
  },
  notCount: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.button,
    width: 9,
    height: 9,
    position: "absolute",
    borderRadius: 9,
    top: -2,
    right: 0,
    zIndex: 2,
    borderWidth: 1,
  },
  resizeContain: {
    resizeMode: "contain",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  flex1: {
    flex: 1,
  },
  width50: {
    width: "50%",
  },
  padtop30: {
    paddingTop: 30,
  },
  marBtm4: {
    marginBottom: 4,
  },
  fontMed: {
    fontWeight: "500",
  },
  font18: {
    fontSize: 18,
    lineHeight: 21,
  },
  width60: {
    width: "60%",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  weekyDropDown: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 3.5,
    paddingLeft: 9,
    paddingRight: 26,
  },
  flexColumn: {
    flexDirection: "column",
  },
  popupOverlay: {
    backgroundColor: COLORS.overlayBG,
  },
  width300px: {
    width: 300,
  },
  marHorauto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  textBlack: {
    color: COLORS.introText,
  },
  modalDropDown: {
    position: "absolute",
    right: 9,
    bottom: "30%",
    zIndex: 2,
  },
  pressedmodalDropDown: {
    position: "absolute",
    right: 9,
    bottom: "50%",
    zIndex: 2,
  },
  grayBg: {
    backgroundColor: COLORS.grayBG,
  },
  pad20: {
    padding: 20,
  },
  pad25: {
    padding: 25,
  },
  padR7: {
    paddingRight: 7,
  },
  whiteBg: {
    backgroundColor: COLORS.white,
  },
  orderCol: {
    borderRadius: 8,
  },
  orderCircle: {
    backgroundColor: COLORS.CircleBG,
    width: 33,
    height: 33,
    borderRadius: 33,
  },
  mb16: {
    marginBottom: 16,
  },
  mb18: {
    marginBottom: 18,
  },
  textDefault: {
    color: COLORS.textInputBorder,
  },
  fontMed: {
    fontWeight: "500",
  },
  marBtm6: {
    marginBottom: 6,
  },
  textPri: {
    color: COLORS.button,
  },
  activeSKUBtn: {
    borderWidth: 1,
    borderColor: COLORS.ActiveSKUBorder,
    backgroundColor: COLORS.activeSKUBg,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  padL7: {
    paddingLeft: 7,
  },
  mr3: {
    marginRight: 3,
  },
  /*** dashboard css - Ends **/

  /*** Catalogue Screen css **/
  mr10: {
    marginRight: 10,
  },
  width80: {
    width: "80%",
  },
  padtop20: {
    paddingTop: 20,
  },
  tabActive: {
    backgroundColor: COLORS.white,
  },
  tabList: {
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 19,
  },
  font14: {
    fontSize: 14,
    lineHeight: 17,
  },
  tabwidth: {
    width: Dimensions.get("window").width - 20,
  },
  searchBarStyle: {
    backgroundColor: COLORS.white,
    shadowColor: 0,
    borderWidth: 1,
    borderColor: COLORS.searchBorderColor,
    borderRadius: 0,
    height: 38,
  },
  searchinput: {
    marginLeft: -10,
    marginTop: -10,
  },
  searchIcon: {
    position: "absolute",
    top: 13,
    left: 13,
  },
  filterBlk: {
    backgroundColor: COLORS.grayBG,
    width: 28,
    height: 25,
    top: 7,
    right: 7,
    position: "absolute",
    zIndex: 2,
  },
  catalogueCol: {
    paddingVertical: 25,
    paddingLeft: 13,
    paddingRight: 7,
    borderWidth: 1,
    borderColor: COLORS.searchBorderColor,
    marginBottom: 20,
  },
  catalogueLeft: {
    width: Dimensions.get("window").width - 114,
  },
  catalogueImg: {
    width: 78,
    height: 55,
  },
  mr8: {
    marginRight: 8,
  },
  mb2: {
    marginBottom: 2,
  },
  font10: {
    fontSize: 8,
    lineHeight: 12,
  },
  mb7: {
    marginBottom: 7,
  },
  textGreen: {
    color: COLORS.green,
  },
  pl2: {
    paddingLeft: 2,
  },
  cataloguergt: {
    width: 54,
  },
  stockView: {
    backgroundColor: COLORS.green,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  padR6: {
    paddingRight: 6,
  },
  padb80: {
    paddingBottom: 80,
  },
  sidemenuView: {
    width: 320,
  },
  sidemenuHeader: {
    backgroundColor: COLORS.button,
    paddingTop: 50,
    paddingLeft: 27,
    paddingRight: 30,
    paddingBottom: 35,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  font16: {
    fontSize: 16,
    lineHeight: 20,
  },
  padl15: {
    paddingLeft: 15,
  },
  sidemenuContent: {
    paddingTop: 22.5,
  },
  sidemenuMenu: {
    paddingVertical: 17.5,
    paddingLeft: 0,
    paddingRight: 18,
  },
  pl10: {
    paddingLeft: 10,
  },
  sidemenuFooter: {
    paddingLeft: 35,
  },
  sidemenuBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.sidemnuBorder,
  },
  pb20: {
    paddingBottom: 20,
  },
  sidemenuOverlay: {
    position: "absolute",
    left: 0,
    Zindex: 1,
    width: Dimensions.get("window").width,
    height: "100%",
    top: 0,
  },
  padt50: {
    paddingTop: 50,
  },
  /*** Catalogue Screen css - Ends **/

  /*** splash Screen css **/
  primaryBg: {
    backgroundColor: COLORS.button,
  },
  /*** splash Screen css - Ends **/

  /*** add catalogue Screen css **/
  catalogueHeader: {
    paddingHorizontal: 17,
    paddingVertical: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  marlft17: {
    marginLeft: 17,
  },
  borderWhite: {
    borderColor: COLORS.white,
  },
  font15: {
    fontSize: 15,
    lineHeight: 19,
  },
  font14: {
    fontSize: 14,
    lineHeight: 19,
  },
  letterSpa33: {
    letterSpacing: 0.33,
  },
  saveBtn: {
    padding: 5,
    borderRadius: 6,
  },
  saveButtonFooter: {
    paddingHorizontal: 40,
    paddingVertical: 13,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    borderTopColor: COLORS.shadowColor,
    borderTopWidth: 1,
  },
  saveButtonFooterLogin: {
    paddingLeft: 13,
    paddingRight: 13,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 6,
    width: "80%",
  },
  saveButtonFooterLogin1: {
    // marginLeft: 13,
    // marginRight: 13,
    marginTop: 27,
    marginBottom: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },

  width33: {
    width: "33.33%",
  },
  pl4: {
    paddingLeft: 4,
  },
  pr4: {
    paddingRight: 4,
  },
  TabTextColor: {
    color: COLORS.tabtextColor,
  },
  tabBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.tabbarBG,
  },
  mb24: {
    marginBottom: 24,
  },
  pad16: {
    padding: 16,
  },
  mb4: {
    marginBottom: 4,
  },
  labelText: {
    color: COLORS.textInputBorder,
  },
  dragChooseFile: {
    padding: 15,
    backgroundColor: COLORS.DragBG,
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.introText,
  },
  mb14: {
    marginBottom: 14,
  },
  borderRadius4: {
    borderRadius: 4,
  },
  mb20: {
    marginBottom: 20,
  },
  inputStyle: {
    borderColor: COLORS.textInputBorder,
    backgroundColor: COLORS.white,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 45,
    color: COLORS.loginTextInput,
  },
  textArae: {
    height: 67,
  },
  collapseCard: {
    borderWidth: 1,
    borderColor: COLORS.textInputBorder,
    padding: 15,
    borderRadius: 4,
    marginBottom: 19,
  },
  pt18: {
    paddingTop: 18,
  },
  borderActive: {
    borderColor: COLORS.button,
  },
  dnone: {
    display: "none",
  },
  rotateImg: {
    transform: [{ rotate: "180deg" }],
  },
  mb28: {
    marginBottom: 28,
  },
  font13: {
    fontSize: 13,
    lineHeight: 16,
  },
  catalogueForcheckbox: {
    padding: 13,
    borderWidth: 1,
    borderColor: COLORS.textInputBorder,
    borderRadius: 4,
    position: "relative",
  },
  mr10: {
    marginRight: 10,
  },
  checkboxBG: {
    backgroundColor: COLORS.checkboxBG,
  },
  checkboxTick: {
    position: "absolute",
    right: 4,
    top: 4,
  },
  mb12: {
    marginBottom: 12,
  },
  categoryImage: {
    width: 32,
    height: 32,
    borderRadius: 32,
  },
  /*** add catalogue Screen css - Ends **/

  /*** Dashboard Screen css **/
  categoryBlk: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  mb3: {
    marginBottom: 3,
  },
  padR8: {
    paddingRight: 8,
  },
  padL8: {
    paddingLeft: 8,
  },
  padR4: {
    paddingRight: 4,
  },
  padL4: {
    paddingLeft: 4,
  },
  recentuserImage: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  AEDBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  footerMenu: {
    shadowColor: COLORS.shadowColorOne,
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    height: 70,
    paddingHorizontal: 8,
  },
  height70px: {
    height: 100,
  },
  footerActive: {
    position: "absolute",
    left: 0,
    top: -15,
    height: 2,
    Zindex: 2,
    width: 59,
  },
  pt8: {
    paddingTop: 8,
  },
  floatIcon: {
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: COLORS.shadowColor,
    shadowRadius: 3,
    fontSize: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  mb44: {
    marginBottom: 44,
  },
  /*** Dashboard Screen css - Ends **/

  /*** Dashboard Screen css **/
  eyeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 45,
    height: 45,
    zIndex: 2,
  },
  padR50: {
    paddingRight: 50,
  },
  /*** Dashboard Screen css - Ends **/

  /*** signup css **/
  befloginarrow: {
    position: "absolute",
    top: 44,
    left: 18,
    zIndex: 2,
  },
  width40: {
    width: "40%",
  },
  dragDropView: {
    borderColor: COLORS.introText,
    backgroundColor: COLORS.DragBG,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 4,
    padding: 15,
  },
  dragView: {
    backgroundColor: COLORS.dragboxBG,
    width: 65,
    height: 3,
  },
  rboverlayBG: {
    backgroundColor: COLORS.overlayBG,
  },
  rbContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 9,
    paddingHorizontal: 40,
    paddingBottom: 40,
    height: 430,
  },
  font22: {
    fontSize: 22,
    lineHeight: 26,
  },
  uploadPercentage: {
    backgroundColor: COLORS.uploadBG,
    borderColor: COLORS.button,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    height: 73,
  },
  perBar: {
    height: 71,
    position: "absolute",
    left: 0,
    backgroundColor: COLORS.uploadedBG,
    borderRadius: 4,
  },
  cancelStyle: {
    borderWidth: 1,
    borderColor: COLORS.button,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    padding: 14,
  },
  headerShadow: {
    shadowColor: COLORS.shadowColorTwo,
    shadowRadius: 20,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  ph18: {
    paddingHorizontal: 18,
  },
  mt18: {
    marginTop: 18,
  },
  borderDefault: {
    borderColor: COLORS.searchBorderColor,
  },
  feedtextArae: {
    height: 84,
  },
  borderRadius0: {
    borderRadius: 0,
  },
  textred: {
    color: COLORS.red,
  },
  addPhotoCon: {
    borderColor: COLORS.searchBorderColor,
    width: 89,
    height: 79,
    borderWidth: 1,
  },
  /*** signup css - Ends **/

  /*** supplier profile css **/
  profileHeader: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  profilelogo: {
    width: 83,
    height: 83,
    borderRadius: 83,
    borderWidth: 3,
    borderColor: COLORS.searchBorderColor,
  },
  mb9: {
    marginBottom: 9,
  },
  editProfileBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 19,
  },
  mb6: {
    marginBottom: 6,
  },
  profileprogressBg: {
    backgroundColor: COLORS.profileProgressBG,
    height: 4,
    borderRadius: 5,
  },
  progressBar: {
    height: 4,
    borderRadius: 5,
    position: "absolute",
    top: 0,
    left: 0,
  },
  profileContainer: {
    paddingHorizontal: 17,
    paddingVertical: 29,
  },
  borderLeftnone: {
    borderLeftWidth: 0,
  },
  mb30: {
    marginBottom: 30,
  },
  homeContainerBlk: {
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    padding: 15,
  },
  addHomeView: {
    borderColor: COLORS.button,
    borderWidth: 1,
    backgroundColor: COLORS.homeBg,
    borderRadius: 11,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  pr15: {
    paddingRight: 15,
  },
  pl15: {
    paddingLeft: 15,
  },
  underline: {
    textDecorationLine: "underline",
  },
  uploadCsv: {
    borderColor: COLORS.button,
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: COLORS.chooseFileBG,
  },
  /*** supplier profile css - Ends **/

  /*** forgot Password css **/
  mb50: {
    marginBottom: 50,
  },
  mb37: {
    marginBottom: 37,
  },
  errorMsg: {
    color: COLORS.colorSix,
    fontSize: 12,
    lineHeight: 15,
  },
  invoiceView: {
    marginLeft: 18,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 18,
  },
  invoiceBottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  outletScreenouterView: {
    backgroundColor: COLORS.white,
    width: "100%",

    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    marginBottom: 20,
  },
  /*** forgot Password css - Ends **/

  //anil

  colorRed: {
    color: COLORS.red,
  },
  colorBlue: {
    color: COLORS.blueTwo,
  },
  colorOne: {
    color: COLORS.colorOne,
  },
  colorTwo: {
    color: COLORS.barkBlue,
  },
  colorBlueTheme: {
    color: "#1F9CEF",
  },

  changeFlexDirection: {
    flexDirection: "row",
  },
  paddingThree: {
    // paddingTop: 10,`
    paddingTop: 5,
  },
  paddingFour: {
    // paddingTop: 10,
    paddingTop: 3,
  },
  paddingTwo: {
    paddingTop: 2,
  },
  pt6: {
    paddingTop: 6,
  },
  marginTopFive: {
    marginTop: 12,
  },
  marginTopSeven: {
    marginTop: 7,
  },
  marginTopSix: {
    marginTop: 20,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 4,
  },
  orderContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: COLORS.grayBG,
  },
  headerContainer: {
    backgroundColor: COLORS.button,
    width: "100%",
    height: 127,
  },
  headerAligment: {
    marginTop: 10,
    marginLeft: 19,
    marginRight: 17,
  },
  headerDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuText: {
    paddingLeft: 20,
    color: COLORS.white,
    fontSize: 16,

    //  fontFamily:InterMedium,
  },
  orderTabDirection: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 22,
  },
  orderTabTextView: {
    width: 115,
    marginLeft: 22,
    backgroundColor: COLORS.white,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
  },
  allOrderView: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 15,
    paddingRight: 14,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  allOrderOnpressText: {
    fontSize: 14,
    color: COLORS.button,
  },
  allOrderText: {
    fontSize: 14,
    color: COLORS.white,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 15,
    paddingRight: 14,
    borderRadius: 30,
  },
  prendingAccecptance: {
    marginLeft: 20,
  },
  pendingAcceptanceOnpressView: {
    backgroundColor: COLORS.white,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 14,
    paddingRight: 15,
    borderRadius: 30,
  },
  pendingAcceptanceView: {
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 14,
    paddingRight: 15,
  },
  pendingOnPressText: {
    color: COLORS.button,
  },
  pendingText: {
    color: COLORS.white,
  },
  searchBar: {
    alignItems: "center",
    paddingLeft: 19,
    backgroundColor: COLORS.black,
  },
  searchInput: {
    fontSize: 12,
    // lineHeight: 38,
    marginLeft: -13,
    height: 38,
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.searchBorderColor,
    height: 38,
  },
  promotionsHeaderContainer: {
    backgroundColor: COLORS.button,
    width: "100%",
    height: 61,
  },
  promotionsHeaderText: {
    paddingLeft: 20,
    color: COLORS.white,
    fontSize: 16,
    alignItems: "center",
  },
  PromotionScreenIconView: {
    flexDirection: "row",
    paddingTop: 21,
    paddingLeft: 22,
    alignItems: "center",
  },
  promotoinsCardPaddingView: {
    paddingLeft: 18,
    paddingRight: 19,
    paddingTop: 19,
    width: "100%",
    // backgroundColor: "red",
    marginBottom: 260,
  },
  cardView: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: 130,
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
  },
  innerDimension: {
    paddingTop: 23,
    paddingLeft: 24.18,
    paddingRight: 15.24,
  },
  cardText: {
    fontSize: 12,
    color: COLORS.introText,
    lineHeight: 15,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 10,
    lineHeight: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 58,
    right: 18,
    width: 64,
    height: 64,
    backgroundColor: COLORS.button,
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  stictyText: {
    color: COLORS.white,
    fontSize: 39,
  },
  allOrderCardcardView: {
    backgroundColor: COLORS.white,
    width: "100%",
    // height: 130,
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    marginBottom: 20,
    // marginTop: 10,
  },
  allOrderCardInnerDimension: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 15.24,
    paddingBottom: 20,
  },
  allOrdersImage: {
    width: 43,
    height: 43,
    marginLeft: 10,
    marginRight: 10,
  },
  textView: {
    marginLeft: 10,
    width: "65%",
  },
  justifyContent: {
    justifyContent: "space-between",
  },
  imagePadding: {
    paddingTop: 1.5,
  },
  orderCardHeading: {
    color: COLORS.introText,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
  },
  outletTextorders: {
    color: COLORS.colorOne,
    fontSize: 10,
    lineHeight: 12,
  },
  orderPaid: {
    height: 19,
    width: 45,
    borderRadius: 12,
    // backgroundColor: "#36B152",
    backgroundColor: COLORS.red,
    borderWidth: 1,
    // borderColor: "#36B152",
    borderColor: COLORS.red,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orderPaidStatus: {
    height: 19,
    width: 45,
    borderRadius: 12,
    backgroundColor: COLORS.green,
    borderWidth: 1,
    borderColor: COLORS.green,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paidText: {
    color: COLORS.white,
    fontSize: 10,
    lineHeight: 12,
    textAlign: "center",
  },
  ratingView: {
    // marginTop: 7.5,
    marginTop: 3,
    paddingRight: 1,
  },
  ratingPadding: {
    paddingRight: 5,
  },
  emailText: {
    color: COLORS.green,
    fontSize: 10,
    lineHeight: 12,
  },
  orderActiveView: {
    paddingLeft: 25,
  },
  bottomLineOrderCared: {
    flexDirection: "row",
    // paddingLeft: 74,
    justifyContent: "space-between",
    // alignItems: "center",
    // marginTop: 5,
    marginTop: 3,
  },
  bottomLinePendingAcceptanceCard: {
    flexDirection: "row",
    paddingLeft: 74,
    justifyContent: "space-between",
    // alignItems: "center",
    // marginTop: 5,
    marginTop: 3,
  },
  PendingAcceptanceCardPadding: {
    paddingLeft: 18,
    paddingRight: 19,
    paddingTop: 19,
    width: "100%",
    marginBottom: 260,
    // paddingBottom:20,
  },
  PaymentsPadding: {
    paddingLeft: 18,
    paddingRight: 19,
    paddingTop: 19,
    width: "100%",
    marginBottom: 130,
    // paddingBottom:20,
  },
  aedValueText: {
    color: COLORS.blueOne,
    fontWeight: "bold",
    fontSize: 14,
  },
  getTimeText: {
    color: COLORS.colorOne,
    fontSize: 10,
    lineHeight: 12,
    paddingLeft: 50,
  },
  bottomPendingText: {
    flexDirection: "row",
    paddingLeft: 74,
    justifyContent: "space-between",
    marginTop: 5,
    paddingRight: 20,
  },
  paymentdueText: {
    color: COLORS.colorOne,
    fontSize: 10,
    lineHeight: 12,
    paddingLeft: 25,
  },
  acticeView: {
    justifyContent: "center",
    paddingRight: 3,
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  orderDetailcontainer: {
    backgroundColor: COLORS.grayBG,
  },
  orderDetailFlexView: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.searchBorderColor,
  },
  headerDetailOrderView: {
    backgroundColor: COLORS.button,
    width: "100%",
    height: 277,
    paddingTop: 39,
    paddingLeft: 19,
  },
  headingRowDelivery: {
    flexDirection: "row",
    marginLeft: 22,
    marginTop: 17,
    alignItems: "center",
  },
  deliveryTitle: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 21,
  },
  tabView: {
    marginTop: 19,
    marginLeft: 22,
  },
  orderDetailPaidStatus: {
    marginTop: 22,
    height: 24,
    width: 67,
    borderRadius: 16,
    backgroundColor: COLORS.green,
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: COLORS.green,
    // borderColor: "red",
    justifyContent: "center",
  },
  orderDetailPaidStatusColor: {
    borderColor: COLORS.red,
    backgroundColor: COLORS.red,
  },
  paidTextOrderDetail: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
  },
  orderNumberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 12.5,
    lineHeight: 21,
  },
  orderTitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 17,
    lineHeight: 20,
  },
  orderOutlet: {
    color: COLORS.introText,
    fontSize: 10,
    lineHeight: 12,
    marginTop: 3,
  },

  /*SUNIL*/
  orderDetailamountCard: {
    backgroundColor: COLORS.grayBG,
    width: 149,
    height: 93,
    borderRadius: 9,
    marginTop: 13,
    paddingTop: 14.5,
    paddingLeft: 14.5,
    paddingRight: 14.5,
  },
  orderDetailCardOne: {
    height: 38,
    width: "100%",
    paddingLeft: 19,
    paddingRight: 18,
    marginTop: 19,
    backgroundColor: COLORS.red,
  },
  orderDetailCardGlobalView: {
    backgroundColor: COLORS.white,
    width: "100%",
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 6,
  },
  orderDetailCardOneHeight: {
    height: 124,
  },
  orderDetailCardTwoHeight: {
    height: 72,
  },
  orderDetailCardThreeHeight: {
    height: 271,
  },
  onPressMarkReceived: {
    borderRadius: 6,
    backgroundColor: COLORS.button,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  onPressReceived: {
    borderRadius: 6,
    backgroundColor: COLORS.button,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
  },
  onPressedOrderText: {
    fontSize: 16,
    color: COLORS.white,
    lineHeight: 20,
  },
  cardThreeView: {
    marginTop: 18,
    marginLeft: 17,
    marginRight: 17,
    marginBottom: 18,
    // backgroundColor: "red",
  },
  orderDetailCardHeading: {
    fontSize: 12,
    lineHeight: 15,
    color: COLORS.blueTwo,
    fontWeight: "bold",
  },
  orderDetailCardText: {
    fontSize: 10,
    lineHeight: 18,
    color: COLORS.barkBlue,
  },
  orderDetailcardView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomLineOrderCared1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editView: {
    height: 19,
    width: 43,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.redOne,
  },
  editText: {
    color: COLORS.redOne,
    fontSize: 10,
    textAlign: "center",
  },
  requiredIconPadding: {
    paddingLeft: 3,
  },
  positionalAbsoluteCardPadding: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 71,
    width: "100%",
    // backgroundColor: "red",
    marginBottom: 60,
  },
  positionalAbsoluteCard: {
    backgroundColor: COLORS.white,
    width: "100%",
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    borderRadius: 9,
    height: 30,
    position: "absolute",
    left: 19,
    top: -60,
  },
  positionalAbsoluteCardView: {
    // marginTop: 22,
    marginLeft: 19,
    marginRight: 15,
    marginBottom: 12,
    // backgroundColor: "red",
  },
  orderDetailPositionText: {
    fontSize: 10,
    lineHeight: 12,
    color: COLORS.barkBlue,
  },
  orderAmountText: {
    color: COLORS.blueTwo,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: "bold",
  },
  orderDetailCardInnerDimension: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 15.24,
    paddingBottom: 19,
  },
  orderCardflexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  orderDetailAedText: {
    color: COLORS.blueOne,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
  },
  addSubView: {
    width: 60,
    height: 25,
    borderWidth: 1,
    borderColor: COLORS.searchBorderColor,
    borderRadius: 4,
    marginRight: 10,
    flexDirection: "row",
  },
  addSubViewOne: {
    flexDirection: "row",
    justifyContent: "center",
  },
  addSubViewTwo: {
    borderRightWidth: 1,
    width: 20,
    alignItems: "center",
    borderColor: COLORS.searchBorderColor,
  },
  addSubViewFour: {
    width: 20,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: COLORS.button,
  },
  defaultBottomView: {
    marginTop: 40,
    marginBottom: 63,
  },
  defaultSubmitBotton: {
    width: 160,
    height: 45,
  },
  defaultBottom: {
    height: 45,
  },
  defaultSubmitCancel: {
    width: 160,
    height: 45,
  },
  outletActiveView: {
    height: 19,
    width: 52,
    borderRadius: 12,
    backgroundColor: COLORS.green,
    borderWidth: 1,
    borderColor: COLORS.green,
    justifyContent: "center",
    alignSelf: "center",
  },
  outletEmailView: {
    marginTop: 4.5,
    flexDirection: "row",
  },
  outletEmailText: {
    color: COLORS.barkBlue,
    fontSize: 10,
    lineHeight: 12,
  },
  bottomLineOutletcard: {
    flexDirection: "row",
    // paddingLeft: 74,
    justifyContent: "space-between",
    // alignItems: "center",

    marginTop: 3,
  },
  outletsCardPaddingView: {
    paddingLeft: 18,
    paddingRight: 19,
    paddingTop: 19,
    width: "100%",
    // backgroundColor: "red",
  },
  paddingViewSubCatalogue: {
    paddingTop: 25,
    paddingLeft: 7,
    paddingRight: 15,
  },
  pricingTierInstockText: {
    color: COLORS.white,
    fontSize: 10,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  pricingTierInstockview: {
    height: 19,
    width: 54,
    borderRadius: 12,
    backgroundColor: COLORS.green,
    borderWidth: 1,
    borderColor: COLORS.green,
    textAlign: "center",
  },
  catalogueCardFruitsText: {
    marginTop: 0,
    paddingBottom: 3,
    flexDirection: "row",
  },
  catalogueImage: {
    width: 60,
    height: 55,
    marginLeft: 10,
    marginRight: 10,
  },
  invoiceINVView: {
    marginTop: 5,
    flexDirection: "row",
  },
  invoiceINVText: {
    color: COLORS.button,
    fontSize: 10,
    lineHeight: 12,
  },
  ratingreviewStart: {
    paddingTop: 12,
    paddingRight: 1,
  },
  subCatalogueView: {
    marginLeft: 18,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 18,
  },
  ratingreviewFlatListView: {
    paddingLeft: 18,
    paddingRight: 19,
    paddingTop: 19,
    width: "100%",
    marginBottom: 70,
  },
  addUserHeader: {
    backgroundColor: COLORS.white,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 18,
  },
  //anil
  //after merge
  forgotParagraphStyle: {
    color: COLORS.loginText,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    textAlign: "center",
    margin: 6,
    marginBottom: 37,
  },
  labelTextforgot: {
    color: COLORS.loginText,
    fontSize: 12,
    lineHeight: 22,
  },
  defaultScreenContainer: {
    marginTop: 26,
    marginLeft: 19,
    marginRight: 19,
    marginBottom: 43,
  },
  defaultScreenContainerInvoice: {
    marginTop: 26,
    marginLeft: 19,
    marginRight: 19,
    marginBottom: 43,
  },
  defaultScreenLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.colorThree,
    marginBottom: 5,
  },
  defaultScreenCountryCodeSection: {
    flex: 1,
  },
  defaultScreenMobileNoSection: {
    flex: 2,
  },
  rowTwoInput: {
    flexDirection: "row",
  },
  /*search bar*/
  searchBarPaddingView: {
    height: 38,
    width: "100%",
    paddingLeft: 19,
    paddingRight: 18,
    marginTop: 19,
  },
  searchBarPaddingViewInvoice: {
    height: 38,
    width: "100%",
    marginTop: 10,
  },
  searchBarView: {
    borderWidth: 1,
    borderColor: COLORS.searchBorderColor,
    height: 38,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: COLORS.white,
  },
  searchIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchPlaceHolderView: {
    marginLeft: 10,
    width: "80%",
  },
  searchfilterView: {
    backgroundColor: COLORS.filterIconBG,
    padding: 6,
    borderRadius: 3,
  },
  /*search  bar end*/

  /*payment screen*/
  paymentHeaderView: {
    backgroundColor: COLORS.button,
    width: "100%",
    height: 51,
  },
  paymentHeaderPaddingView: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentCardContainer: {
    backgroundColor: COLORS.white,
    width: "100%",
    // height: 102,
    borderColor: COLORS.searchBorderColor,
    borderWidth: 1,
    marginBottom: 20,
  },
  paymentCardPaddingView: {
    marginLeft: 18,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  subText: {
    fontSize: 10,
    lineHeight: 12,
    color: COLORS.colorOne,
  },
  pr16: {
    paddingRight: 16,
  },
  pr8: {
    paddingRight: 8,
  },
  pl8: {
    paddingLeft: 8,
  },
  paymentCardBottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },
  verticalLine: {
    height: 15,
    borderWidth: 0.2,
    marginTop: 3,
    borderColor: COLORS.colorOne,
  },
  /*filter screen*/
  HorizantalLine: {
    borderWidth: 0.2,
    marginTop: 3,
    borderColor: COLORS.searchBorderColor,
  },
  filterContainer: {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 5,
    marginTop: 20,
  },
  filterHeadingText: {
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.blueOne,
    fontWeight: "600",
  },
  filterSubHeadingView: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  filterSubHeadingText: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.blueOne,
    fontWeight: "bold",
  },
  textBackground: {
    backgroundColor: "#EDF5FF",
    padding: 5,
    color: COLORS.barkBlue,
    marginRight: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  defaultSettingInputView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 39,
    backgroundColor: "#F6F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 4,
    paddingLeft: 0,
  },
  defaultSettingInputView2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 39,
    backgroundColor: "#FFFFFF",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 4,
    paddingLeft: 0,
  },
  defaultSettingInputText: {
    paddingLeft: 10,
    fontSize: 14,
  },
  defaultSettingDropdownText: {
    height: 39,
    borderRadius: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#DCDCDC",
  },
  AdjustInventoryDropDownView: {
    height: 45,
    borderRadius: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  adjustInventoryDateDropDownView: {
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  //Prajwala
  containerPassword: {
    width: "100%",
  },
  textPri1: {
    color: "#E83B42",
  },
  Cateloguetext: {
    color: "#1F222F",
    fontSize: 10,
    lineHeight: 12,
    paddingTop: 2,
  },

  CataloguePaid: {
    height: 12,
    width: 45,
    borderRadius: 12,
    paddingRight: 8,

    backgroundColor: "#36B152",
    borderWidth: 1,
    borderColor: "#36B152",
  },
  redbg: {
    backgroundColor: "#F21616",
  },
  flaotingButton: {
    position: "absolute",
    top: 600,
    right: 0,
  },

  fixedView: {
    right: 20,
    position: "fixed",
  },
  passwordIcon1: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 0,
    textAlign: "right",
    bottom: 35,
  },
  addButton1: {
    position: "absolute",
    bottom: 28,
    right: 18,
    width: 64,
    height: 64,
    backgroundColor: COLORS.button,
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  stictyText1: {
    color: COLORS.white,
    fontSize: 39,
    alignItems: "center",
    bottom: 0,
  },
  account: {
    color: "#7B868A",
    fontFamily: FONTS.Regular,
  },
  new_sign: {
    color: COLORS.button,
    fontFamily: FONTS.Regular,
  },

  frontcontainer: {
    flex: 1,
    backgroundColor: COLORS.theme,
    alignItems: "center",
    //padding: 10,
    justifyContent: "center",
  },
  // titleStyle: {
  //   padding: 10,
  //   textAlign: 'center',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: 350,
    height: 450,
  },
  introTextStyle: {
    fontSize: 16,
    color: COLORS.introText,
    fontFamily: FONTS.Regular,
    textAlign: "center",
    marginTop: 40,
  },
  introTitleStyle: {
    fontSize: 20,
    fontFamily: FONTS.Bold,
    color: COLORS.introText,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 0,
    paddingBottom: 5,
    marginTop: 40,
  },
  defaultScreenContainer: {
    backgroundColor: "#F2F7FC",
    padding: 16,
  },
  defaultScreenLabel: {
    color: "#5B6B65",
    fontSize: 15,
    fontFamily: FONTS.Regular,
    paddingBottom: 5,
  },
  defaultScreenDropdownContainer: {
    borderColor: "#DCDCDC",
    borderWidth: 1,
    height: 46,
    backgroundColor: "#fff",
    marginBottom: 17,
  },
  defaultScreenInputContainer: {
    backgroundColor: "#F6F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
  },
  defaultScreenInputWhiteContainer: {
    borderColor: "#DCDCDC",
    borderWidth: 1,
  },
  defaultScreenCountryCodeSection: {
    width: "40%",
    paddingTop: 5,
    marginBottom: 5,
    marginLeft: 0,
  },
  defaultScreenMobileNoSection: {
    width: "60%",
    paddingTop: 5,
    marginBottom: 5,
    marginLeft: 0,
  },
  flexSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxLabel: {
    margin: 8,
    color: "#5B6B65",
    fontSize: 13,
  },
  deliveryScreenContainer: {
    backgroundColor: "#F2F7FC",
    padding: 16,
  },
  deliveryScreenSideDropdownContainer: {
    borderColor: "#DCDCDC",
    borderWidth: 1,
    height: 46,
    marginTop: 28,
    backgroundColor: "white",
  },
  fullWidthDropDown: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    height: 46,
  },
  deliveryFlexSection: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
  },
  checkboxSelectAllLabel: {
    color: "#1F222F",
    fontSize: 14,
    margin: 9,
  },
  deliveryFlexSectionLabels: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    justifyContent: "space-between",
    paddingStart: 25,
    paddingRight: 20,
    paddingTop: 15,
  },
  deliveryFlexLabel: {
    color: "#9FA3AB",
    fontSize: 13,
  },
  deliveryFeeScreenLabel: {
    color: "#5B6B65",
    fontSize: 15,
    fontFamily: FONTS.Regular,
    paddingBottom: 12,
    paddingTop: 20,
    paddingLeft: 10,
  },
  deliveryAreaScreenLabel: {
    color: "#5B6B65",
    fontSize: 15,
    fontFamily: FONTS.Regular,
    marginTop: 20,
    paddingBottom: 8,
  },
  dayCheckboxContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  notificationDay: {
    color: "#1F9CEF",
    fontSize: 15,
    fontFamily: FONTS.Regular,
    marginTop: 20,
  },
  notificationOddContainer: {
    width: "100%",
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 15,
    flexDirection: "row",
  },
  notificationEvenContainer: {
    minHeight: 100,
    width: "100%",
    borderColor: "#DCDCDC",
    backgroundColor: "#F2F7FC",
    marginTop: 15,
    borderWidth: 1,
    flexDirection: "row",
  },
  invoiceNoMarginContainer: {
    minHeight: 100,
    width: "100%",
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 0,
    flexDirection: "row",
  },
  invoiceSearchContainer: {
    minHeight: 45,
    width: "100%",
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 15,
    flexDirection: "row",
    padding: 10,
  },
  searchText: {
    width: "80%",
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.Regular,
  },
  //changed Padding top  and padding
  invoiceSearch: {
    paddingTop: 5,
    padding: 2,
  },
  //changed height and width
  invoiceFilter: {
    height: 27,
    width: 27,
    backgroundColor: "#D0D6DD",
    padding: 5,
    alignItems: "center",
  },
  notificationImageContainer: {
    width: 40,
    marginTop: 25,
    marginLeft: 13,
  },
  notificationTextContainer: {
    width: "83%",
    marginLeft: 13,
  },
  notificationTitle: {
    color: "#0F141A",
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    marginTop: 13,
  },
  notificationText: {
    color: "#1F222F",
    fontSize: 13,
    fontFamily: FONTS.Regular,
    marginTop: 5,
  },
  notificationDate: {
    color: "#617191",
    fontSize: 13,
    fontFamily: FONTS.Regular,
    textAlign: "right",
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: -10,
  },
  notificationBell: {
    textAlign: "right",
    paddingRight: 10,
    marginTop: -20,
  },
  invoiceContainer: {
    width: "100%",
    padding: 15,
  },

  invoiceTwoSectionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  invoiceTwoSectionRow_first: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 5,
    width: "100%",
  },
  invoiceSingleSectionRow: {
    width: "100%",
    paddingBottom: 5,
  },
  invoiceCardLeft: {
    width: 250,
  },
  invoiceCardRight: {
    width: 100,
    alignContent: "flex-start",
  },
  invoiceTitle: {
    marginTop: 5,
    fontFamily: FONTS.SemiBold,
    fontSize: 16,
    color: "#0F141A",
  },
  invoiceINV: {
    marginTop: 5,
    fontFamily: FONTS.SemiBold,
    fontSize: 16,
    color: "#1F9CEF",
  },
  invoiceButtonPaid: {
    backgroundColor: "#36B152",
    borderWidth: 1,
    borderColor: "#36B152",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },

  invoiceButtonPaid_aedbtn: {
    color: "#617191",
  },
  invoicepaidStatus: {
    flexDirection: "row-reverse",
    flex: 0.14,
    backgroundColor: "#36B152",
    borderWidth: 1,
    borderColor: "#36B152",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  invoiceUnpaidStatus: {
    flexDirection: "row-reverse",
    flex: 0.14,
    backgroundColor: "#1F9CEF",
    borderWidth: 1,
    borderColor: "#1F9CEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  invoiceButtonUnPaid: {
    backgroundColor: "#1F9CEF",
    borderWidth: 1,
    borderColor: "#1F9CEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  invoiceButtonText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    fontFamily: FONTS.SemiBold,
  },
  invoiceAddress: {
    color: "#617191",
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },
  billingAddress: {
    color: "#1F222F",
    fontSize: 14,
    fontFamily: FONTS.Regular,
    lineHeight: 20,
  },
  billingCurrency: {
    color: "#1F222F",
    fontSize: 14,
    fontFamily: FONTS.Regular,
    lineHeight: 20,
    paddingRight: 20,
  },
  estimatedTotal: {
    color: "#1F9CEF",
    fontSize: 16,
    fontFamily: FONTS.SemiBold,
    lineHeight: 20,
  },
  invoiceInv: {
    color: "#1F9CEF",
    fontSize: 14,
    fontFamily: FONTS.Medium,
  },
  invoiceAed: {
    color: "#153E73",
    fontSize: 18,
    fontFamily: FONTS.SemiBold,
    height: 20,
    paddingTop: 2,
  },
  invoiceDate: {
    color: "#617191",
    fontSize: 14,
    fontFamily: FONTS.Regular,
    paddingTop: 3,
  },
  modal: {
    backgroundColor: "#F2F7FC",
    height: "90%",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 10,
  },
  topModelSection: {
    backgroundColor: "#1F9CEF",
    color: "#fff",
    padding: 20,
    paddingBottom: 80,
    zIndex: 1,
  },
  closeIcon: {
    color: "#fff",
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modelPaidButton: {
    backgroundColor: "#36B152",
    borderWidth: 1,
    borderColor: "#36B152",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 20,
    width: "20%",
    marginBottom: 20,
  },
  modelInvoiceNo: {
    fontFamily: FONTS.SemiBold,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modelTitle: {
    fontFamily: FONTS.Regular,
    color: "#fff",
    fontSize: 17,
  },
  modelAddress: {
    color: "#E2E6EF",
    fontSize: 14,
    fontFamily: FONTS.Regular,
  },

  modelTopBoxSection: {
    padding: 20,
    zIndex: 5,
    marginTop: -90,
    borderRadius: 10,
  },
  modelTopBoxContainer: {
    minHeight: 100,
    width: "100%",
    borderColor: "#DCDCDC",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 15,
    flexDirection: "row",
    borderRadius: 10,
  },
  modelTwoSectionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modelOneBox: {
    padding: 10,
    width: "50%",
  },
  modelTwoBox: {
    backgroundColor: "#F2F7FC",
    padding: 10,
    width: "50%",
    borderColor: "#fff",
  },
  modelSingleBoxTitle: {
    color: "#1F9CEF",
    fontFamily: FONTS.Regular,
    fontSize: 13,
    paddingBottom: 2,
  },
  modelSingleBoxValue: {
    fontFamily: FONTS.SemiBold,
    fontSize: 15,
    paddingBottom: 15,
  },
  modelSingleBoxBottomValue: {
    fontFamily: FONTS.SemiBold,
    fontSize: 15,
  },
  modelSingleBoxUniqValue: {
    fontFamily: FONTS.SemiBold,
    fontSize: 19,
    paddingBottom: 25,
  },
  modelSingleBoxDate: {
    color: "#1F222F",
    fontSize: 12,
    fontFamily: FONTS.Regular,
    bottom: 0,
  },
  modelImageBoxSectionRow: {
    display: "flex",
    flexDirection: "row",
  },
  modelImageBox: {
    padding: 10,
    marginRight: 10,
  },
  modelContentBox: {
    padding: 10,
  },
  modelImageCircleBox: {
    justifyContent: "center",
    textAlign: "center",
  },
  modelImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  modelAmmountUpdateRow: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  modelAmmountUpdateBox: {
    padding: 6,
  },
  modelAmmountUpdateBoxNumber: {
    padding: 6,
    borderLeftColor: "#DCDCDC",
    borderRightColor: "#DCDCDC",
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  mpText: {
    fontSize: 14,
  },
  mpIcon: {
    paddingTop: 2,
  },
  modelImageBoxTitle: {
    color: "#0F141A",
    fontFamily: FONTS.SemiBold,
    fontSize: 15,
    paddingBottom: 2,
  },
  modelImageBoxContent: {
    fontFamily: FONTS.Regular,
    color: "#617191",
    fontSize: 12,
    paddingBottom: 5,
  },
  modelImageBoxContentPackage: {
    fontFamily: FONTS.Regular,
    color: "#617191",
    fontSize: 12,
  },
  modelImageBoxUniqValue: {
    fontSize: 17,
    color: "#153E73",
    height: 20,
    fontFamily: FONTS.SemiBold,
    marginTop: 30,
  },
  invoiceButtonEdit: {
    borderWidth: 1,
    borderColor: "#1F9CEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  invoiceButtonEditText: {
    color: "#1F9CEF",
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    textAlign: "left",
  },
  outletButton: {
    borderWidth: 1,
    borderColor: "#1F9CEF",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginRight: 20,
  },
  outletButtonText: {
    color: "#1F9CEF",
    fontSize: 13,
    fontFamily: FONTS.SemiBold,
    textAlign: "left",
  },
  width30: {
    width: "30%",
  },

  amountText: {
    color: "#153E73",
  },
  closeText: {
    fontSize: 41,
    lineHeight: 50,
  },
  mb17: {
    marginBottom: 17,
  },
  outletText: {
    color: "#E2E6EF",
  },
  detailInvoiceBlk: {
    backgroundColor: "#fff",
    padding: 13,
    borderRadius: 9,
    marginTop: -59,
    marginBottom: 23,
  },
  paddh19: {
    paddingHorizontal: 19,
  },
  padT0: {
    paddingTop: 0,
  },
  padR10: {
    paddingRight: 10,
  },
  detailAmountCard: {
    backgroundColor: COLORS.grayBG,
    padding: 13,
    borderRadius: 9,
  },
  font19: {
    fontSize: 19,
    lineHeight: 23,
  },
  invoiceListDetail: {
    marginTop: 0,
    marginBottom: 12,
  },
  width70: {
    width: "70%",
  },
  invoiceImg: {
    width: 43,
    height: 43,
    marginBottom: 13,
  },
  addressBlk: {
    backgroundColor: "#fff",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 15,
    borderRadius: 4,
    marginBottom: 13,
  },
  padh0: {
    paddingHorizontal: 0,
  },
  padH15: {
    paddingHorizontal: 15,
  },
  padb15: {
    paddingBottom: 15,
  },
  padt8: {
    paddingTop: 8,
  },
  borderWhite: {
    borderColor: "white",
    backgroundColor: COLORS.button,
  },
  //14_04_prajwala
  marBtm24: {
    marginBottom: 24,
  },
  fontWeiBold: {
    fontWeight: "700",
  },
  marBtm12: {
    marginBottom: 12,
  },
  craeteLabel: {
    fontSize: 12,
    lineHeight: 15,
    color: "#1F222B",
    fontWeight: "400",
    marginBottom: 6,
  },
  createInputStyles: {
    borderColor: "#C7CFD8",
    borderWidth: 1,
    height: 32,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 2,
    fontSize: 14,
    lineHeight: 15,
    elevation: 0,
  },
  formButton: {
    marginTop: 40,
  },
  btnheading: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "bold",
  },
  CreateSubmit: {
    backgroundColor: "#2580F7",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  wdth50: {
    width: "50%",
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mb11: {
    marginBottom: 11,
  },
  mb37: {
    marginBottom: 37,
  },
  continueBtn: {
    backgroundColor: COLORS.button,
    padding: 13,
    borderRadius: 6,
  },
  CancelBtn: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: COLORS.button,
    padding: 12,
  },
  letspa35: {
    letterSpacing: 0.35,
  },
  updatedIcon: {
    width: 66,
    height: 66,
    resizeMode: "contain",
    marginBottom: 19,
  },
  padt30: {
    paddingTop: 30,
  },
  successIcon: {
    width: 104,
    height: 104,
    resizeMode: "contain",
  },
  padL9: {
    paddingLeft: 9,
  },
  space_btn: {
    padding: 10,
    marginRight: 10,
  },

  //Prajwala 19_04
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //KVenkatesh
  // ---------------- Css 18/04/2023 ---------------------------
  mrg20: {
    marginRight: 20,
  },
  ModStyle: {
    height: 45,
    borderRadius: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textInp: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 46,
    backgroundColor: "white",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 4,
    paddingLeft: 0,
  },
  // ---------------- Css 18/04/2023 Ends ---------------------------

  // Delete Popup
  PadR9: {
    paddingRight: 9,
  },
  // Delete Popup Ends,
});

export default GlobalStyles;
