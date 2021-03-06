import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { normalize } from "../../Normalizer";
import { StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, icons } from "../../constants";
import { Button, IconButton, Card, List } from "react-native-paper";


const PProfile = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [data, setData] = useState([]);
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Cnic, setCnic] = useState("");
  const [access, setAccess] = useState("");
  let Data ;
  useEffect((Data) => {
    async function fetchMyAPI() {
      try{
      const token = await AsyncStorage.getItem("accesstoken")  
      setAccess(JSON.parse(token));
        console.log(access);
        //api call
        const temp = JSON.parse(token);
        const res = await axios
          .get("http://10.10.22.24:8000/api/user/profile/", {
            headers: { "Authorization": `Bearer ${temp}` },
          })
          console.log (res.data);
          setEmail(res.data.email);
          setName(res.data.name);
          setPhone(res.data.phone);
          setCnic(res.data.cnic);
          Data = res.Data;
          }
      catch(err){
        console.log(err);
      }
    }
    fetchMyAPI();
  }, []);

  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <View style={styles.container}>
              <View style={styles.body}>
                <View style={{ flex: 1 }}>
                  <View style={styles.body}>
                    <Image
                      source={require("../../assets/myamonn-icons/use.png")}
                      style={{ height: normalize(100), width: normalize(100) }}
                    />
                    <View style={styles.profileDescription}>
                      <Text style={styles.username}>{Name}</Text>
                    </View>
                  </View>

                  <View>
                    <Card
                      style={{
                        borderRadius: normalize(30),
                        resizemode: "contain",
                        backgroundColor: "#2F353C",
                        justifyContent: "flex-start",
                        width: SCREEN_WIDTH - normalize(40),
                        flex: 1,
                        marginTop: normalize(20),
                      }}
                    >
                      <Card.Content>
                        <View>
                          <List.Section>
                            <List.Item
                              style={styles.lstItem}
                              titleStyle={{ color: "white" }}
                              title={Name}
                              left={() => (
                                <List.Icon icon="skull-outline" color="white" />
                              )}
                            />
                            <List.Item
                              style={styles.lstItem}
                              titleStyle={{ color: "white" }}
                              title={Email}
                              left={() => (
                                <List.Icon icon="email-outline" color="white" />
                              )}
                            />
                            <List.Item
                              style={styles.lstItem}
                              titleStyle={{ color: "white" }}
                              title={Phone}
                              left={() => (
                                <List.Icon icon="phone" color="white" />
                              )}
                            />
                            <List.Item
                              style={styles.lstItem}
                              titleStyle={{ color: "white" }}
                              title={Cnic}
                              left={() => (
                                <List.Icon
                                  color="white"
                                  icon="badge-account-outline"
                                />
                              )}
                            />
                          </List.Section>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            icon={icons.briefcase}
                            color="white"
                            onPress={() => {
                              navigation.navigate("Portfolio");
                            }}
                            size={25}
                            style={{ borderColor: "white", borderWidth: 1 }}
                          />
                          <IconButton
                            icon="key-variant"
                            color="white"
                            onPress={() => {
                              navigation.navigate("ChangePass");
                            }}
                            size={25}
                            style={styles.Optionbtn}
                          />
                          <IconButton
                            icon="upload"
                            color="white"
                            size={25}
                            onPress={() => {
                              navigation.navigate("AddProperty");
                            }}
                            style={styles.Optionbtn}
                          />
                          <IconButton
                            icon="pencil"
                            color="white"
                            onPress={() => {
                              navigation.navigate("EditProfile");
                            }}
                            size={25}
                            style={styles.Optionbtn}
                          />
                        </View>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: normalize(50),
                  }}
                >
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => {
                      navigation.navigate("Login", { action: "logout" });
                    }}
                  >
                    <Text style={styles.loginText}>{"Logout"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>      
    </ScrollView>
  );
};

export default PProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    alignItems: "center",
    height: normalize(700, 735),
    marginTop: normalize(100),
  },
  lstItem: {
    marginTop: normalize(-30),
    marginLeft: normalize(-20),
  },
  loginBtn: {
    width: normalize(121),
    borderRadius: normalize(10),
    backgroundColor: COLORS.purple,
    height: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(25),
    marginBottom: normalize(50),
  },
  loginText: {
    fontFamily: "OpenSansCondensedBold",
    color: COLORS.white,
    fontSize: normalize(14),
  },

  profileDescription: {
    height: normalize(40, 735),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  username: {
    color: COLORS.white,
    fontFamily: "OpenSansCondensedBold",
    fontSize: normalize(16),
  },
  userType: {
    color: COLORS.white,
    fontFamily: "OpenSansCondensedLight",
    fontSize: normalize(14),
  },
  Optionbtn: {
    borderColor: "white",
    borderWidth: 1,
    marginLeft: normalize(20),
  },
  body: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  editButton: {
    elevation: 20,
    flexDirection: "row",
    backgroundColor: COLORS.purple,
    height: normalize(46, 735),
    width: normalize(376),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: normalize(19),
    borderRadius: 10,
    marginTop: normalize(25, 735),
  },
  editButtonText: {
    color: COLORS.white,
    fontFamily: "OpenSansCondensedBold",
    fontSize: normalize(16),
  },
  contact: {
    color: "black",
    fontFamily: "OpenSansCondensedBold",
    fontSize: normalize(13),
    textAlign: "center",
  },
  formBody: {
    elevation: 30,
    width: normalize(376),
    height: normalize(300, 735),
    marginTop: normalize(25, 735),
    borderRadius: 41,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  formBody1: {
    elevation: 30,
    width: normalize(376),
    height: normalize(400, 735),
    marginTop: normalize(25, 735),
    borderRadius: 41,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  regForm: {
    width: normalize(338),
  },
  inputView: {
    backgroundColor: "grey",
    borderRadius: normalize(30),
    height: normalize(40),
    width: normalize(164),
    justifyContent: "center",
    marginBottom: normalize(10, 735),
  },
  TextInput: {
    width: "100%",
    height: "100%",
    paddingLeft: normalize(20),
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
  },
  twoInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityIndicatorStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
