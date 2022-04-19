import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { FlatList } from "react-native-gesture-handler";
import { normalize } from "../../Normalizer";
import { COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, IconButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { PickerItem } from "react-native-woodpicker";
import { Picker } from "react-native-woodpicker";

const Otp = ({ navigation }) => {
  const [OTP, setOTP] = useState("");
  const [alert, setAlert] = useState(false);

  const otp = () => {
    var user = "0";

    var condition = false;
    if (user == "0") {
      condition = OTP != "";
    }
    console.log(condition);
    if (condition) {
      fetch("http://192.168.137.44:8000/auth/register/", {
        method: "POST",
        body: form,
      })
        .then((r) =>
          r.json().then((data) => {
            console.log(data);
            if (data.token) {
              console.log(data.token);
              // AsyncStorage.setItem('token',JSON.stringify(data.token));
              // AsyncStorage.setItem('userRole',JSON.stringify(""));
              navigation.navigate("profile");
            } else {
              setAlert(true);
              setAlertMessage("One or more field is invalid");
            }
          })
        )
        .catch(function (error) {
          console.log(error, "change Password");
          setAlert(true);
          setAlertMessage("Wrong password!");
        });
    } else {
      setAlert(true);
      setAlertMessage("One or more fields are invalid");
    }
  };
  const alerting = () => {
    setAlert(false);
    setAlertMessage("");
  };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          marginTop: getStatusBarHeight(),
        }}
      >
        <View>
          <IconButton
            icon="chevron-left"
            color={COLORS.white}
            onPress={() => {
              navigation.navigate("Register");
            }}
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                fontSize: normalize(30),
                fontWeight: "bold",
                color: COLORS.white,
                marginLeft: normalize(20),
              }}
            >
              Otp
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: normalize(30),
              flexDirection: "column",
              width: "100%",
            }}
          >
            <View style={styles.inputView}>
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="Description"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                navigation.navigate("MainLayout");
              }}
            >
              <Text style={styles.loginText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor={COLORS.background} />
      </SafeAreaView>
    );
};
export default Otp;
const styles = StyleSheet.create({
  inputView: {
    flexDirection: "row",
    backgroundColor: "#151B22",
    borderRadius: normalize(30),
    borderWidth: normalize(3),
    borderColor: "#FFF",
    width: "90%",
    height: normalize(45),
    marginBottom: normalize(20),
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
  },
  twoinputView: {
    backgroundColor: "#151B22",
    borderRadius: normalize(30),
    borderWidth: normalize(3),
    borderColor: "#FFF",
    width: "45%",
    height: normalize(50),
    alignSelf: "baseline",
    alignItems: "center",
  },
  twoView: {
    height: normalize(50),
    width: "90%",
    marginBottom: normalize(20),
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  TextInput: {
    height: normalize(50),
    paddingLeft: 20,
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
    justifyContent: "center",
  },

  Registration_button: {
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
    height: normalize(30),
    marginTop: normalize(30),
    textDecorationLine: "underline",
  },

  loginBtn: {
    width: "70%",
    borderRadius: normalize(25),
    backgroundColor: "#615ae8",
    height: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(40),
    alignSelf: "center",
  },
  loginText: {
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
  },
});
