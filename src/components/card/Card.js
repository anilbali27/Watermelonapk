/** @format */

import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
} from "react-native";

export default function Card(props) {
  return (
    <View>
      <View style={styles.carD}>
        <View>{props.children}</View>
      </View>
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: props.height,
    borderColor: "#DCDCDC",
    borderWidth: 1,
    marginBottom: 20,
  },
};
