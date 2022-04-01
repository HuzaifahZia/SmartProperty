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
} from "react-native";
const { width, height } = Dimensions.get("window");
import { FlatList } from "react-native-gesture-handler";
import styles from "./styles";
import { normalize } from "../../Normalizer";
import { COLORS } from "../../constants";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import * as theme from "../../components/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native-paper";

const ChangePass = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [radixId, setRadixId] = useState("0");
  const [radixPwd, setRadixPwd] = useState("0");
  const changePass = () => {
    var form = new FormData();
    var user = "0";

    var condition = false;
    if (user == "0") {
      condition = oldPass != "" && newPass != "" && confirmPass != "";
    }
    console.log(condition);
    if (condition) {
      form.append("oldPass", `${oldPass}`);
      form.append("newPass", `${newPass}`);
      form.append("confirmPass", `${confirmPass}`);
      fetch("http://192.168.137.44:8000/auth/register/", {
        method: "POST",
        body: form,
      })
        .then((r) =>
          r.json().then((data) => {
            console.log(data);
            if (data.token) {
              console.log(data.token);
              setLoading(false);
              // AsyncStorage.setItem('token',JSON.stringify(data.token));
              // AsyncStorage.setItem('userRole',JSON.stringify(""));
              navigation.navigate("profile");
            } else {
              setLoading(false);
              setAlert(true);
              setAlertMessage("One or more field is invalid");
            }
          })
        )
        .catch(function (error) {
          setLoading(false);
          console.log(error, "change Password");
          setAlert(true);
          setAlertMessage("Wrong password!");
        });
    } else {
      setLoading(false);
      setAlert(true);
      setAlertMessage("One or more fields are invalid");
    }
  };
  const alerting = () => {
    setAlert(false);
    setAlertMessage("");
  };
  function LoadingIndicatorView() {
    // return <ActivityIndicator
    //           color={theme.red}
    //           size="large"
    //           style={styles.activityIndicatorStyle}
    //         />
    return (
      <View style={styles.activityIndicatorStyle}>
        <Image
          style={{ width: normalize(414), height: normalize(736) }}
          source={require("../../assets/loading.gif")}
        />
      </View>
    );
  }
  if (loading) {
    return LoadingIndicatorView();
  } else
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.inputView,
            { paddingRight: 20 },
            oldPass ? { backgroundColor: "grey" } : null,
          ]}
        >
          <TextInput
            style={[styles.TextInput, { width: "90%" }]}
            placeholder="OLD Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={showPassword}
            onChangeText={(oldPass) => setoldPass(oldPass)}
          />
          <Icon
            onPress={() => setShowPassword((prev) => !prev)}
            name={showPassword ? "eye-off" : "eye"}
            color={"white"}
            size={normalize(18)}
          />
        </View>
        <View
          style={[
            styles.inputView,
            { paddingRight: 20 },
            newPass ? { backgroundColor: "grey" } : null,
          ]}
        >
          <TextInput
            style={[styles.TextInput, { width: "90%" }]}
            placeholder="New Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={showPassword}
            onChangeText={(newPass) => setnewPass(newPassw)}
          />
          <Icon
            onPress={() => setShowPassword((prev) => !prev)}
            name={showPassword ? "eye-off" : "eye"}
            color={"white"}
            size={normalize(18)}
          />
        </View>
        <View
          style={[
            styles.inputView,
            { paddingRight: 20 },
            confirmPass ? { backgroundColor: "grey" } : null,
          ]}
        >
          <TextInput
            style={[styles.TextInput, { width: "90%" }]}
            placeholder="Confirm Password"
            placeholderTextColor="#FFFFFF"
            onChangeText={(confirmPass) => setconfirmPass(confirmPass)}
          />
        </View>
      </View>
    );
};
export default ChangePass;
