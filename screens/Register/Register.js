import React, {useEffect, useState } from "react";
import { View, Image, TextInput, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView, SafeAreaView,} from "react-native";
import { COLORS } from "../../constants";
import styles from "./styles";
import { normalize } from "../../Normalizer";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import * as theme from "../../components/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Register_Translation from "./Register_Translation";
import DatePicker from "react-native-datepicker";
import { LogBox } from 'react-native';


const { width, height } = Dimensions.get("window");
const Register = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [DOB, setDOB] = useState("09-10-2021");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const register = () => {
    var form = new FormData();
    var user = "0";

    var condition = false;
    if (user == "0") {
      condition =
        name != "" &&
        lastName != "" &&
        cnic != "" &&
        phonenumber != "" &&
        email != "" &&
        password != "";
    }
    console.log(condition);
    if (condition) {
      fetch("http://127.0.0.1:8000/api/user/register/", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phonenumber,
          cnic: cnic,
          password: password,
          password2: password,
        }),
      })
        .then((res) => {
          navigation.navigate("MainLayout");
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error, "register");
          setAlert(true);
          setAlertMessage(error);
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
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {alert ? <Alert message={alertMessage} setAlert={alerting} /> : null}
        <View style={styles.circle}>
          <Image
            style={styles.avatar}
            source={require("../../assets/myamonn-icons/use.png")}
          />
        </View>
        <View style={styles.body}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.logoView}>
              <Text style={styles.logo}>SMART PROPERTY</Text>
            </View>

            <View style={styles.regForm}>
              <View style={styles.twoInputView}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={"Name"}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(name) => setName(name)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={"Last Name"}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(lastname) => setLastName(lastname)}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.inputView,
                  { width: normalize(338), alignSelf: "center" },
                ]}
              >
                <TextInput
                  style={styles.TextInput}
                  keyboardType="numeric"
                  placeholder={"CNIC"}
                  placeholderTextColor={COLORS.text}
                  onChangeText={(cnic) => setCnic(cnic)}
                  maxLength={13}
                />
              </View>
              <View style={styles.twoInputView}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={"Phone No"}
                    keyboardType="numeric"
                    maxLength={13}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(phonenumber) => setphonenumber(phonenumber)}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={"Email"}
                    placeholderTextColor={COLORS.text}
                    onChangeText={(email) => setEmail(email)}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.inputView,
                  { width: normalize(338), alignSelf: "center" },
                ]}
              >
                <DatePicker
                  style={styles.TextInput}
                  date={DOB}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  minDate="01-01-1900"
                  maxDate="01-01-2000"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      marginTop: normalize(-4),
                      alignItems: "flex-start",
                      borderWidth: 0,
                    },
                    placeholderText: {
                      fontSize: normalize(14),
                      color: COLORS.text,
                    },
                    dateText: {
                      fontSize: normalize(14),
                      color: COLORS.text,
                    },
                  }}
                  onDateChange={(DOB) => {
                    setDOB(DOB);
                  }}
                />
              </View>
              <View
                style={[
                  styles.inputView,
                  { width: normalize(338), alignSelf: "center" },
                ]}
              >
                <TextInput
                  style={styles.TextInput}
                  secureTextEntry={true}
                  placeholder={"Password"}
                  placeholderTextColor={COLORS.text}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
              <View style={styles.twoInputView}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              register();
            }}
          >
            <Text style={styles.loginText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};

export default Register;
