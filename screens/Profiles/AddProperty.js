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

const AddProperty = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [alert, setAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [radixId, setRadixId] = useState("0");
  const [radixPwd, setRadixPwd] = useState("0");
  const [Type, setType] = useState();
  const TypeList = [
    { label: "Residential", value: "Residential" },
    { label: "Plot", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
  ];

  const addProperty = () => {
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
              Add Property
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
            <View style={styles.twoView}>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Sale/Rent"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Zipcode"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
            </View>
            <View style={styles.twoView}>
              <View style={styles.twoinputView}>
                {/* <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Type"
                  placeholderTextColor="#FFFFFF"
                /> */}
                <Picker
                  item={Type}
                  items={TypeList}
                  style={{
                    height: normalize(50),
                    paddingLeft: 20,
                    justifyContent: "center",
                    width: "100%",
                  }}
                  textInputStyle={{
                    height: normalize(50),
                    fontFamily: "OpenSansCondensedBold",
                    color: "#FFFFFF",
                    fontSize: normalize(14),
                    justifyContent: "center",
                  }}
                  onItemChange={setType}
                  title="Property Type"
                  placeholder="Type"
                  isNullable={false}
                  mode="dropdown"
                />
              </View>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Sub-Type"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="Address"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            <View style={styles.twoView}>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="City"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Society"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
            </View>
            <View style={styles.twoView}>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Size"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
              <View style={styles.twoinputView}>
                <TextInput
                  style={[styles.TextInput, { width: "100%" }]}
                  placeholder="Price"
                  placeholderTextColor="#FFFFFF"
                />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="Description"
                placeholderTextColor="#FFFFFF"
              />
            </View>
            {/* <View
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
                style={[styles.TextInput, { width: "100%" }]}
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
                confirmPass ? { backgroundColor: "grey" } : null,
              ]}
            >
              <TextInput
                style={[styles.TextInput, { width: "100%" }]}
                placeholder="Confirm Password"
                placeholderTextColor="#FFFFFF"
                onChangeText={(confirmPass) => setconfirmPass(confirmPass)}
              />
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              <Text style={styles.loginText}>Confirm</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <StatusBar backgroundColor={COLORS.background} />
      </SafeAreaView>
    );
};
export default AddProperty;
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
