import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, Animated, ImageBackground,} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as theme from "../../components/Theme";
import axios from "axios";
import Alert from "../../components/Alert/Alert";
import { CommonActions } from "@react-navigation/native";
import { normalize } from "../../Normalizer";
import OTPTextView from "react-native-otp-textinput";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {useFonts} from 'expo-font';
// import cred from "../../../cred";
// const cheerio = require('cheerio');
// import Data from "../Data";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - (windowHeight + getStatusBarHeight());
const height = windowHeight - navbarHeight;
const width = Dimensions.get("window").width;
const iosHeight = Dimensions.get("window").height;
const Login = ({ navigation, route }) => {
  const { action } = route.params ?? "N/a";
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [alert, setAlert] = useState(false);
  const [otp, setOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [timer, setTimer] = useState(true);
  const [cToken, setCToken] = useState("");
  const [getPassword, setGetPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");


  const getCurrentUser = (userToken) => {
    console.log(userToken, "token in get user");
    axios
      .get("http://192.168.137.44:8000/current-user", {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        setRole(response.data.usertype);
        AsyncStorage.setItem(
          "userRole",
          JSON.stringify(response.data.usertype)
        );
        navigation.navigate("MainLayout");
      })
      .catch(function (error) {
        console.log(error, "getuser");
      })
  };

  const handleLogin = () => {
    if (email == "" || password == "") {

      setAlert(true);
      setAlertMessage("PLEASE ENTER EMAIL AND PASSWORD");
    } else {
      console.log(email, password, "email and password");
      axios
        .post("http://10.10.22.24:8000/api/user/login/", {
          email: email.toLowerCase(),
          password: password,
        })
        .then((res) => {
          console.log(res.data.token.access);
          AsyncStorage.setItem( "accesstoken", res.data.token.access);
          AsyncStorage.setItem( "refreshtoken", res.data.token.refresh);
          setToken(res.data.token);
          navigation.navigate("MainLayout");
        })
        .catch((err) => {
          setAlert(true);
          //setAlertMessage("request failed");
          setAlertMessage(err.response.data.errors.non_field_errors);
        });
    }
  };
  const handleLogout = () => {
    fetch("http://192.168.137.44:8000/auth/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    }).then(() => {
      AsyncStorage.removeItem("userRole");
      AsyncStorage.removeItem("token");
      setRole(null);
      setToken(null);
      setEmail("");
      setPassword("");
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "Login" }, { name: "Login" }],
        })
      );
    });
  };
  const getOtp = () => {
    axios(`http://192.168.137.44:8000${email}`, {
      method: "GET",
    })
      .then((responce) => {
        console.log(responce);
        setOtp(true);
      })
      .catch((error) => {
        setAlert(true);
        setAlertMessage("THERE MAY BE SOME PROBLEM");
      });
  };
  const verifyOtp = () => {
    console.log({ otp: otpCode });
    axios(`http://192.168.137.44:8000/${email}/`, {
      method: "POST",
      data: { otp: otpCode },
    })
      .then(function (response) {
        console.log(response);
        if (response.status == 200) {
          setOtp(false);
          setForgotPassword(false);
          setCToken(response.data);
          console.log(response.data);
          setGetPassword(true);
        }
      })
      .catch(function (error) {
        setTimer(false);
        setAlert(true);
        setAlertMessage("THERE MAY BE SOME PROBLEM");
        console.log(error);
      });
  };
  const handlePassword = () => {
    console.log({ pwd: password });
    console.log({ token: cToken });
    var form = new FormData();
    form.append("new_password", password);
    console.log(`Token ${token}`, "I am in change password");
    fetch("http://192.168.137.44:8000/reset/", {
      method: "PUT",
      headers: {
        Authorization: `Token ${cToken}`,
      },
      body: form,
    }).then((r) =>
      r.json().then((data) => {
        if (data.code == 200) {
          setAlert(true);
          setAlertMessage("Success");
          setGetPassword(false);
        } else {
          setAlert(true);
          setAlertMessage("ERROR");
        }
        console.log(data);
      })
    );
  };

  useEffect(() => {
    console.log(action, token);
    if (action == "logout") {
      handleLogout();
    } else {
      AsyncStorage.getItem("userRole")
        .then((role) => {
          if (role != null) {
            console.log("role", role);
            setRole(role);
          }
        })
        .catch((err) => {
          alert(err);
        });
      AsyncStorage.getItem("token")
        .then((token) => {
          if (token != null) {
            console.log("token", token);
            setToken(token);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [route]);
  useEffect(() => {
    console.log("token", token, "role", role);
    if (role || token) {
      navigation.navigate("MainLayout");
    }
  }, [role, token]);
  const alerting = () => {
    setAlert(false);
    setAlertMessage("");
  };
 if (getPassword) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#151B22" }}>
        {alert ? <Alert message={alertMessage} setAlert={alerting} /> : null}

        <View style={styles.container}>
          <Image
            style={styles.avatar}
            source={require("../../assets/myamonn-icons/use.png")}
          />
          <Text style={styles.logo}>SMART PROPERTY</Text>
          <View
            style={[
              styles.inputView,
              { paddingRight: 20 },
              password ? { backgroundColor: "grey" } : null,
            ]}
          >
            <TextInput
              style={[styles.TextInput, { width: "90%" }]}
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={showPassword}
              onChangeText={(password) => setPassword(password)}
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
              confirmPassword ? { backgroundColor: "grey" } : null,
            ]}
          >
            <TextInput
              style={[styles.TextInput, { width: "90%" }]}
              placeholder="Confirm Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={showPassword}
              onChangeText={(password) => setconfirmPassword(password)}
            />
            <Icon
              onPress={() => setShowPassword((prev) => !prev)}
              name={showPassword ? "eye-off" : "eye"}
              color={"white"}
              size={normalize(18)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              if (password == confirmPassword && password.length >= 6) {
                handlePassword();
              } else {
                setAlertMessage("Both feilds should match & atleast 6 chars");
                setAlert(true);
              }
            }}
          >
            <Text style={styles.loginText}>{"Confirm"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else
    return (
      <ScrollView style={{ flex: 1 }}>
        {alert ? <Alert message={alertMessage} setAlert={alerting} /> : null}
        <View style={styles.container}>
          {otp || forgotPassword ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                marginLeft: normalize(20),
                bottom: normalize(40),
              }}
              onPress={() => {
                setOtp(false);
                setForgotPassword(false);
              }}
            >
              <Icon name={"chevron-left"} color={"#fff"} size={normalize(25)} />
            </TouchableOpacity>
          ) : null}

          <Image
            style={styles.avatar}
            source={require("../../assets/myamonn-icons/use.png")}
          />
          <Text style={styles.logo}>SMART PROPERTY</Text>
          {role == null && token == null && otp == false ? (
            <View
              style={[
                styles.inputView,
                email ? { backgroundColor: "grey" } : null,
              ]}
            >
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#FFFFFF"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          ) : (
            [
              !role && !token ? (
                <OTPTextView
                  handleTextChange={(e) => {
                    setOtpCode(e);
                    console.log(e);
                  }}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.roundedTextInput}
                  inputCount={4}
                  inputCellLength={1}
                  tintColor="#615ae8"
                />
              ) : null,
            ]
          )}
          {role == null && token == null && forgotPassword == false ? (
            <View
              style={[
                styles.inputView,
                { paddingRight: 20 },
                password ? { backgroundColor: "grey" } : null,
              ]}
            >
              <TextInput
                style={[styles.TextInput, { width: "90%" }]}
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                secureTextEntry={showPassword}
                onChangeText={(password) => setPassword(password)}
              />
              <Icon
                onPress={() => setShowPassword((prev) => !prev)}
                name={showPassword ? "eye-off" : "eye"}
                color={"white"}
                size={normalize(18)}
              />
            </View>
          ) : null}
          {otp
            ? [
                timer ? (
                  <CountdownCircleTimer
                    isPlaying
                    onComplete={() => {
                      // do your stuff here
                      setTimer(false);
                      // return [true, 1500] // repeat animation in 1.5 seconds
                    }}
                    duration={59}
                    colors={[
                      ["#D90000", 0.4],
                      ["#F7B801", 0.4],
                      ["#A30000", 0.2],
                    ]}
                    size={normalize(50)}
                    strokeWidth={normalize(4)}
                  >
                    {({ remainingTime, animatedColor }) => (
                      <Animated.Text style={{ color: animatedColor }}>
                        {remainingTime}
                      </Animated.Text>
                    )}
                  </CountdownCircleTimer>
                ) : (
                  <Text
                    onPress={() => {
                      getOtp();
                      setTimer(true);
                    }}
                    style={{
                      fontFamily: "OpenSansCondensedBold",
                      color: "#615ae8",
                      fontSize: normalize(14),
                      height: normalize(30),
                      textDecorationLine: "underline",
                    }}
                  >
                    Resend_otp
                  </Text>
                ),
              ]
            : null}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              if (role == null && token == null && forgotPassword == false) {
                handleLogin();
              } else if (forgotPassword && otp == false) {
                getOtp();
              } else if (forgotPassword && otp) {
                verifyOtp();
              } else {
                navigation.navigate("MainLayout");
              }
            }}
          >
            <Text style={styles.loginText}>
              {forgotPassword ? "NEXT" : "LOGIN"}
            </Text>
          </TouchableOpacity>
          {role == null && token == null && forgotPassword == false ? (
            <TouchableOpacity
              onPress={() => {
                setForgotPassword((prev) => !prev);
              }}
            >
              <Text style={styles.Registration_button}>
                Forgot Your Password?
              </Text>
            </TouchableOpacity>
          ) : null}

          {role == null && token == null ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.Registration_button}>Register</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    );
};

export default Login;
