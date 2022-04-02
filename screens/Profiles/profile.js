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
import { COLORS } from "../../constants";
import { Button, IconButton, Card, List } from "react-native-paper";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const profile = ({ navigation }) => {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setusername] = useState("");
  const [Purpose, setpurpose] = useState("");
  const [PropertyType, setpropertytype] = useState("");
  const [PropertySubType, setpropertysubtype] = useState("");
  const [City, setcity] = useState("");
  const [Location, setlocation] = useState("");
  const [ZipCode, setzipcode] = useState("");
  const [PropertyTitle, setpropertytitle] = useState("");
  const [Description, setdescription] = useState("");
  const [Price, setprice] = useState("");
  const [LandArea, setlandarea] = useState("");
  const [Unit, setunit] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token != null) {
        console.log("token", token);
        getCurrentUser(token);
      }
    });
  });

  const { width, height } = Dimensions.get("window");
  const SCREEN_WIDTH = width < height ? width : height;
  const ITEM_HEIGHT = normalize(150);
  const ITEM_MARGIN = normalize(35);
  const CARD_MARGIN = normalize(25);

  const getCurrentUser = (userToken) => {
    console.log(userToken, "token in get user");
    axios
      .get("http://192.168.137.44:8000/current-user/", {
        headers: { Authorization: `Token ${userToken}` },
      })
      .then(function (response) {
        setRole(response.data.usertype);
        //   AsyncStorage.setItem('userRole',JSON.stringify(response.data.usertype));
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch(function (error) {
        console.log(error, "getuser");
      })
      .then(function () {
        // always executed
      });
  };

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
                <Text style={styles.username}>Huzaifa</Text>
                <Text style={styles.userType}>USER TYPE</Text>
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
                        style={[
                          styles.lstItem,
                          { marginBottom: normalize(-40) },
                        ]}
                        right={() => (
                          <TouchableOpacity
                            onPress={() => {navigation.navigate("EditProfile")}}
                          >
                            <List.Icon
                              icon="pencil"
                              color="white"
                              style={{
                                backgroundColor: COLORS.background,
                                borderRadius: normalize(100),
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      />
                      <List.Item
                        style={styles.lstItem}
                        titleStyle={{ color: "white" }}
                        title="Full-Name"
                        left={() => (
                          <List.Icon icon="skull-outline" color="white" />
                        )}
                      />
                      <List.Item
                        style={styles.lstItem}
                        titleStyle={{ color: "white" }}
                        title="Contact email"
                        left={() => (
                          <List.Icon icon="email-outline" color="white" />
                        )}
                      />
                      <List.Item
                        style={styles.lstItem}
                        titleStyle={{ color: "white" }}
                        title="Number"
                        left={() => <List.Icon icon="phone" color="white" />}
                      />
                      <List.Item
                        style={styles.lstItem}
                        titleStyle={{ color: "white" }}
                        title="Address"
                        left={() => <List.Icon color="white" icon="home" />}
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
                    <Button
                      mode="outlined"
                      color={COLORS.background}
                      style={{
                        borderColor: COLORS.white,
                        height: normalize(20),
                      }}
                      labelStyle={{ color: "white" }}
                      onPress={() => console.log("Pressed")}
                    >
                      Press me
                    </Button>
                    <IconButton
                      icon="key-variant"
                      color="white"
                      onPress={() => {navigation.navigate("ChangePass")}}
                      size={25}
                      style={{ borderColor: "white", borderWidth: 1 }}
                    />
                    <IconButton
                      icon="upload"
                      color="white"
                      size={25}
                      onPress={() => {
                        navigation.navigate("AddProperty");
                      }}
                      style={{
                        borderColor: "white",
                        borderWidth: 1,
                        marginLeft: normalize(20),
                      }}
                    />
                    <IconButton
                      icon="dots-horizontal"
                      color="white"
                      onPress={() => console.log("About Pressed")}
                      size={25}
                      style={{
                        borderColor: "white",
                        borderWidth: 1,
                        marginLeft: normalize(20),
                      }}
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
            {/* <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit("personal");
              }}
            >
              <Text style={styles.editButtonText}>PERSONAL INFORMATION</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEdit("password")}
            >
              <Text style={styles.editButtonText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit("property");
              }}
            >
              <Text style={styles.editButtonText}>ADD PROPERTY</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit("property");
              }}
            >
              <Text style={styles.editButtonText}>ABOUT</Text>
            </TouchableOpacity> */}

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

export default profile;
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
