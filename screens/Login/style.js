import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - (windowHeight + getStatusBarHeight());
const height = windowHeight - navbarHeight;
const width = Dimensions.get("window").width;
const iosHeight = Dimensions.get("window").height;
import { normalize } from "../../Normalizer";
import { RFValue } from "react-native-responsive-fontsize";
import * as theme from "../../components/Theme";
// import { normalize } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-status-bar-height";

const styles = StyleSheet.create({
  // safeContainer:{
  //     flex:1,
  //     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  //     justifyContent:"center",
  // },
  container: {
    flex: 1,
    backgroundColor: "#151B22",
    alignItems: "center",
    justifyContent: "center",
    height: iosHeight + getStatusBarHeight() + normalize(100),
    // ...Platform.select({
    //   ios: {
    //       height: (iosHeight-getStatusBarHeight())-normalize(20)
    //   },
    //   android: {
    //    height:height-normalize(20)
    //   },
    // }),
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  avatar: {
    marginBottom: normalize(20),
    width: normalize(100),
    height: normalize(100),
  },
  logo: {
    marginBottom: normalize(30),
    width: normalize(150),
    height: normalize(25),
    color: "#fff",
    fontFamily: "OpenSansCondensedBold",
    fontWeight: "bold",
    fontSize: normalize(17),
    textDecorationLine: "underline",
  },

  inputView: {
    flexDirection: "row",
    backgroundColor: "#151B22",
    borderRadius: normalize(30),
    borderWidth: normalize(3),
    borderColor: "#FFF",
    width: "70%",
    height: normalize(45),
    marginBottom: normalize(20),
    justifyContent: "space-around",
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
    width: normalize(121),
    borderRadius: normalize(25),
    backgroundColor: "#615ae8",
    height: normalize(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: normalize(40),
  },
  loginText: {
    fontFamily: "OpenSansCondensedBold",
    color: "#FFFFFF",
    fontSize: normalize(14),
  },
  profileDescription: {
    height: RFValue(40, 735),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  username: {
    color: theme.red,
    fontFamily: "OpenSansCondensedBold",
    fontSize: normalize(16),
  },
  userType: {
    color: theme.red,
    fontFamily: "OpenSansCondensedLight",
    fontSize: normalize(14),
  },
  userInfoSection: {
    alignItems: "center",
  },
  activityIndicatorStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
export default styles;