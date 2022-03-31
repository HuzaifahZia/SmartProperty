import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, Text, TouchableHighlight, ActivityIndicator, TextInput, TouchableOpacity, Image, ScrollView,} from "react-native";
import { normalize } from "../Normalizer";
import { StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS } from "../constants";

const Profile = ({ navigation }) => {
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
          <Image
            source={require("../assets/myamonn-icons/use.png")}
            style={{ height: normalize(100), width: normalize(100) }}
          />
          <View style={styles.profileDescription}>
            <Text style={styles.username}>Huzaifa</Text>
            <Text style={styles.userType}>USER TYPE</Text>
          </View>
          {edit == "personal" ? (
            <TouchableOpacity
              onPress={() => setEdit("")}
              style={styles.formBody}
            >
              <View style={styles.regForm}>
                <Text style={[styles.editButtonText, { marginBottom: 10 }]}>
                  PERSONAL INFORMATION
                </Text>
                <View style={styles.twoInputView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="NAME"
                      placeholderTextColor={"white"}
                      value={name}
                      onChangeText={(name) => setName(name)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor={"white"}
                      placeholder={"LAST NAME"}
                      value={lastName}
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
                    editable={false}
                    style={styles.TextInput}
                    placeholder="EMAIL"
                    placeholderTextColor={"white"}
                    value={email}
                    onChangeText={(email) => setEmail(email)}
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
                    placeholder="ADDRESS"
                    placeholderTextColor={"white"}
                    value={address}
                    onChangeText={(address) => setAddress(address)}
                  />
                </View>
                <View style={styles.twoInputView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="PHONE NUMBER"
                      placeholderTextColor={"white"}
                      value={phonenumber}
                      onChangeText={(phonenumber) =>
                        setphonenumber(phonenumber)
                      }
                    />
                  </View>
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setEdit("");
                    }}
                    style={{
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      width: normalize(63),
                      height: normalize(40, 735),
                      borderRadius: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "OpenSansCondensedBold",
                        fontSize: normalize(14),
                      }}
                    >
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit("personal");
              }}
            >
              <Text style={styles.editButtonText}>PERSONAL INFORMATION</Text>
            </TouchableOpacity>
          )}
          {edit == "password" ? (
            <TouchableOpacity
              onPress={() => setEdit("")}
              style={styles.formBody}
            >
              <View style={styles.regForm}>
                <Text style={[styles.editButtonText, { marginBottom: 10 }]}>
                  CHANGE PASSWORD
                </Text>

                <View
                  style={[
                    styles.inputView,
                    { width: normalize(338), alignSelf: "center" },
                  ]}
                >
                  <TextInput
                    secureTextEntry={true}
                    style={styles.TextInput}
                    placeholder="ACTUAL PASSWORD"
                    placeholderTextColor={"white"}
                    onChangeText={(oldpassword) => setOldPassword(oldpassword)}
                  />
                </View>
                <View
                  style={[
                    styles.inputView,
                    { width: normalize(338), alignSelf: "center" },
                  ]}
                >
                  <TextInput
                    secureTextEntry={true}
                    style={styles.TextInput}
                    placeholder="NEW PASSWORD"
                    placeholderTextColor={"white"}
                    onChangeText={(newpassword) => setNewPassword(newpassword)}
                  />
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setEdit("");
                    }}
                    style={{
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      width: normalize(63),
                      height: normalize(40, 735),
                      borderRadius: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "OpenSansCondensedBold",
                        fontSize: normalize(14),
                      }}
                    >
                      SAVE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEdit("password")}
            >
              <Text style={styles.editButtonText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
          )}

          {edit == "property" ? (
            <TouchableOpacity
              onPress={() => setEdit("")}
              style={styles.formBody1}
            >
              <View style={styles.regForm}>
                <Text style={[styles.editButtonText, { marginBottom: 10 }]}>
                  ADD PROPERTY
                </Text>
                <View style={styles.twoInputView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Purpose"
                      placeholderTextColor={"white"}
                      value={Purpose}
                      onChangeText={(Purpose) => setpurpose(Purpose)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor={"white"}
                      placeholder={"Property Type"}
                      value={PropertyType}
                      onChangeText={(PropertyType) => setProperty(PropertyType)}
                    />
                  </View>
                </View>
                <View style={styles.twoInputView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="City"
                      placeholderTextColor={"white"}
                      value={City}
                      onChangeText={(City) => setcity(city)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor={"white"}
                      placeholder={"Zip Code"}
                      value={ZipCode}
                      onChangeText={(ZipCode) => setzipcode(ZipCode)}
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
                    editable={false}
                    style={styles.TextInput}
                    placeholder="Location"
                    placeholderTextColor={"white"}
                    value={Location}
                    onChangeText={(Location) => setlocation(Location)}
                  />
                </View>
                <View
                  style={[
                    styles.inputView,
                    { width: normalize(338), alignSelf: "center" },
                  ]}
                >
                  <TextInput
                    editable={false}
                    style={styles.TextInput}
                    placeholder="Property Title"
                    placeholderTextColor={"white"}
                    value={PropertyTitle}
                    onChangeText={(PropertyTitle) =>
                      setpropertytitle(PropertyTitle)
                    }
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
                    placeholder="Description"
                    placeholderTextColor={"white"}
                    value={Description}
                    onChangeText={(Description) => setdescription(Description)}
                  />
                </View>
                <View style={styles.twoInputView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Land Area"
                      placeholderTextColor={"white"}
                      value={LandArea}
                      onChangeText={(LandArea) => setlandarea(LandArea)}
                    />
                  </View>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholderTextColor={"white"}
                      placeholder={"Unit"}
                      value={Unit}
                      onChangeText={(Unit) => setunit(Unit)}
                    />
                  </View>
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setEdit("");
                    }}
                    style={{
                      backgroundColor: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      width: normalize(63),
                      height: normalize(40, 735),
                      borderRadius: 25,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "OpenSansCondensedBold",
                        fontSize: normalize(14),
                      }}
                    >
                      ADD
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEdit("property");
              }}
            >
              <Text style={styles.editButtonText}>ADD PROPERTY</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            navigation.navigate("Login", { action: "logout" });
          }}
        >
          <Text style={styles.loginText}>{"Logout"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
    alignItems: "center",
    height: normalize(700, 735),
    marginTop: normalize(100),
  },
  loginBtn: {
    width: normalize(121),
    borderRadius: normalize(10),
    backgroundColor: COLORS.purple,
    height: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(40),
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
