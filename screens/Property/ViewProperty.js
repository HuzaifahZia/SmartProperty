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
import { FlatList } from "react-native-gesture-handler";
import { normalize } from "../../Normalizer";
import { COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, IconButton } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const ViewProperty = ({ route, navigation }) => {
  const { item } = route.params;
  const [alert, setAlert] = useState(false);
  const [Type, setType] = useState();
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        marginTop: getStatusBarHeight(),
      }}
    >
      <View>
        <View
          style={{
            marginTop: normalize(20),
            flex: 1,
            width: "100%",
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: item.imgUrl }}
            style={styles.image}
          />
          <IconButton
            icon="chevron-left"
            color={COLORS.background}
            style={styles.backicon}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          {/* <slider /> */}
        </View>
        <View>
          <View>
            <Text
              style={{
                fontSize: normalize(23),
                fontWeight: "bold",
                color: COLORS.white,
                marginHorizontal: normalize(20),
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", marginHorizontal: normalize(15) }}
          >
            <Icon
              name={"map-marker"}
              color={COLORS.lightGray2}
              size={normalize(26)}
            />
            <Text
              style={{
                fontSize: normalize(20),
                color: COLORS.lightGray2,
                marginLeft: normalize(2),
              }}
            >
              Lahore,Punjab
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: normalize(20),
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <Icon
                name={"bed-empty"}
                color={COLORS.white}
                size={normalize(30)}
              />
              <Text style={styles.iconInfo}>3</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon name={"shower"} color={COLORS.white} size={normalize(30)} />
              <Text style={styles.iconInfo}>2</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name={"arrow-expand"}
                color={COLORS.white}
                size={normalize(30)}
                style={{ marginRight: normalize(9) }}
              />
              <Text style={styles.iconInfo}>22 marla</Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: normalize(20),
              marginTop: normalize(10),
            }}
          >
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: "bold",
                color: COLORS.white,
                marginLeft: normalize(2),
              }}
            >
              Details
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                color: COLORS.white,
                marginLeft: normalize(2),
              }}
            >
              {item.body}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ViewProperty;
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
  backicon: {
    margin: 5,
    position: "absolute",
    top: 10,
    left: 15,
    width: 30,
    height: 30,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#43494F",
    borderRadius: normalize(10),
    alignSelf: "baseline",
    justifyContent: "space-evenly",
  },
  iconInfo: {
    fontSize: normalize(18),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    color: "white",
  },
  image: {
    borderRadius: normalize(30),
    width: SCREEN_WIDTH - normalize(30),
    marginHorizontal: normalize(15),
    height: normalize(400),
    marginBottom: normalize(20),
    justifyContent: "center",
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
