import React, { useEffect, useState } from "react";
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
import axios from "axios";
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
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);
  let token = AsyncStorage.getItem("accesstoken");
  const getUser = useEffect(() => {
    axios
      .get("http://10.10.22.24:8000/api/user/profile/", {
        headers: {"Authorization" : `Bearer ${token}`}
      })
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors("User token is expired.");
      });
  }, []);

  const otp = () => {
    var condition = false;
    if (OTP != "") {
      condition = true;
    }
    if (condition) {
      let access = AsyncStorage.getItem("access_token");
      console.log(access, "access");
      let config = {
        headers: {
          'Authorization': 'Bearer ' + access
        }
      };
      axios
        .post(
          "http://10.10.22.24:8000/api/user/verify-email/",
          { email: email, otp: otp },
          config
        )
        .then((r) => {
          navigation.navigate("MainLayout");
        })
        .catch((error) => {
          setAlert(true);
          setAlertMessage("Please enter valid OTP");
        });
    } else {
      setAlert(true);
      setAlertMessage("Please Enter OTP");
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
              placeholder="OTP"
              placeholderTextColor="#FFFFFF"
              onChangeText={(otp) => setOTP(otp)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              //navigation.navigate("MainLayout");
              otp();
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
