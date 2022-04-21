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
import { normalize } from "../../Normalizer";
import { COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, IconButton } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import axios from "axios";


const ChangePass = ({ navigation }) => {
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [access, setAccess] = useState("");
  const [loading, setLoading] = useState(false);
  const changePass = async() => {
    var condition = false;
    if (oldPass != "" && newPass != "" && confirmPass != "") {
      condition = true;
    }
    if (condition) {
      try{
      const token = await AsyncStorage.getItem("accesstoken")  
      setAccess(JSON.parse(token));
        console.log(access);
        //api call
        const temp = JSON.parse(token);
        const res = await axios
          .post("http://10.10.22.24:8000/api/user/changepassword/",
          {
            password: newPass,
            password2: confirmPass,
          }, {
            headers: { "Authorization": `Bearer ${temp}` },
          })
          setAlert(true);
          setAlertMessage("Password Changed Successfully");
          //navigation.navigate("PProfile");
        }
      catch(err){
        console.log(err);
      }
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

  if (loading) {
    return LoadingIndicatorView();
  } else
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          marginTop: getStatusBarHeight(),
        }}
      >
        {alert ? <Alert message={alertMessage} setAlert={alerting} /> : null}
        <View>
          <IconButton
            icon="chevron-left"
            color={COLORS.white}
            onPress={() => {
              navigation.navigate("PProfile");
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
              Change Password
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
            <View
              style={[
                styles.inputView,
                { paddingRight: 20 },
                oldPass ? { backgroundColor: "grey" } : null,
              ]}
            >
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="OLD Password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={showPassword}
                onChangeText={(oldPass) => setoldPass(oldPass)}
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
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="New Password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={showPassword}
                onChangeText={(newPass) => setnewPass(newPass)}
              />
            </View>
            <View
              style={[
                styles.inputView,
                confirmPass ? { backgroundColor: "grey" } : null,
              ]}
            >
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="Confirm Password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={showPassword}
                onChangeText={(confirmPass) => setconfirmPass(confirmPass)}
              />
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                changePass();
                //navigation.navigate("PProfile");
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
export default ChangePass;
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

  TextInput: {
    width: "100%",
    height: normalize(50),
    paddingLeft: 20,
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
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
