import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";

const DefaultScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const { width, height } = Dimensions.get("window");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  return (
    <ScrollView>
      <View style={GlobalStyles.signupContainer}>
        <View style={GlobalStyles.signupTitle}>
          <Text style={GlobalStyles.signupTitleStyle}>
            DEFAULT
            <Text style={GlobalStyles.signupTitleStyle}>
              DELIVERY
              <Text style={GlobalStyles.signupTitleStyle}>OUTLETS</Text>
            </Text>
          </Text>
        </View>

        <View style={GlobalStyles.backgrey}>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.labelText}>Registration No</Text>
            <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Registration No"
                placeholderTextColor="#222B2E"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.labelText}>Registered Phone No</Text>
            <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Registered Phone No"
                placeholderTextColor="#222B2E"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <Text style={GlobalStyles.labelText}>Registered Email</Text>
            <View style={GlobalStyles.inputContainer}>
              <TextInput
                style={GlobalStyles.signupTextInput}
                placeholder="Registered Email"
                placeholderTextColor="#222B2E"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>
          <View style={GlobalStyles.inputView}>
            <View style={GlobalStyles.imageIcon}>
              <View style={GlobalStyles.inputView} width="35%" marginRight="2%">
                <Text style={GlobalStyles.labelText}>Country Code*</Text>
                <View style={GlobalStyles.inputContainer}>
                  <TextInput
                    style={GlobalStyles.signupTextInput}
                    placeholder="971"
                    placeholderTextColor="#222B2E"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
              <View style={GlobalStyles.inputView} width="60%" marginLeft="2%">
                <Text style={GlobalStyles.labelText}> Default Mobile No*</Text>
                <View style={GlobalStyles.inputContainer}>
                  <TextInput
                    style={GlobalStyles.signupTextInput}
                    placeholder="Default Mobile No"
                    placeholderTextColor="#222B2E"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Default Email*</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Default Email"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Contact Name*</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Contact Name"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.imageIcon}>
              <View style={GlobalStyles.inputView} width="35%" marginRight="2%">
                <Text style={GlobalStyles.labelText}>Country Code*</Text>
                <View style={GlobalStyles.inputContainer}>
                  <TextInput
                    style={GlobalStyles.signupTextInput}
                    placeholder="971"
                    placeholderTextColor="#222B2E"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
              <View style={GlobalStyles.inputView} width="60%" marginLeft="2%">
                <Text style={GlobalStyles.labelText}>Contact No*</Text>
                <View style={GlobalStyles.inputContainer}>
                  <TextInput
                    style={GlobalStyles.signupTextInput}
                    placeholder="Contact No"
                    placeholderTextColor="#222B2E"
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Alternate Email1</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Default Email"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Alternate Email2</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Default Email"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Credits</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Credits"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>PO Box</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="PO Box"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Business Type</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Business Type"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Email</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Email"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Address</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Address"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Modified</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Modified"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
            <View style={GlobalStyles.inputView}>
              <Text style={GlobalStyles.labelText}>Modified Date</Text>
              <View style={GlobalStyles.inputContainer}>
                <TextInput
                  style={GlobalStyles.signupTextInput}
                  placeholder="Modified Date"
                  placeholderTextColor="#222B2E"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          GlobalStyles.signupInputContainerButton,
          GlobalStyles.shadowProp,
        ]}
      >
        <TouchableOpacity style={GlobalStyles.loginBtn1}>
          <Text style={GlobalStyles.loginText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={GlobalStyles.loginBtn1}>
          <Text style={GlobalStyles.loginText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DefaultScreen;
