/** @format */

import React, { useState } from "react";
import { Alert, View, Text, Image, ScrollView } from "react-native";
import { Form, FormItem } from "react-native-form-component";

import GlobalStyles from "../../../assets/css/styles";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleSubmitPress = () => {
    console.log("handle press code goes here");
  };

  return (
    <ScrollView style={GlobalStyles.scrollViewBG}>
      <View style={GlobalStyles.mainContainer}>
        <View style={GlobalStyles.logo}>
          <Image source={require("../../../assets/images/logo/Layer1.png")} />
        </View>

        <Form
          onButtonPress={() => handleSubmitPress()}
          buttonText={"Reset Password"}
          buttonStyle={GlobalStyles.buttonStyle}
          style={{ width: "100%" }}>
          <View style={GlobalStyles.container}>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.signupLabel}>Email or Mobile No</Text>
              <FormItem
                value={email}
                asterik
                onChangeText={(email) => setEmail(email)}
                isRequired
                style={GlobalStyles.inputContainer}
              />
            </View>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
