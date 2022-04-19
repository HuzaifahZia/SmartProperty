import { COLORS } from "../constants";
import React from "react";
import { View, Text, FlatList } from "react-native";
import Slider from "../components/Carousel";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ScrollView } from "react-native-gesture-handler";
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { normalize } from "../Normalizer";
import {
  Searchbar,
  Modal,
  Portal,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import data from "../components/data";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MainLayout } from "./MainLayout";
//
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const numColums = 2;
// item size
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const ITEM_HEIGHT = normalize(150);
const ITEM_MARGIN = normalize(35);
const CARD_MARGIN = normalize(25);

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [visible, setVisible] = React.useState(false);
  const [starCount, setStarCount] = React.useState(2.5);

  const containerStyle = {
    justifyContent: "space-between",
    backgroundColor: COLORS.background,
    margin: normalize(20),
    height: height - normalize(50),
  };
  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.background,
        width: SCREEN_WIDTH,
      }}
      contentContainerStyle={{
        backgroundColor: COLORS.background,
        alignItems: "center",
        marginTop: getStatusBarHeight(),
        paddingBottom: normalize(120),
        width: SCREEN_WIDTH,
      }}
    >
      <Searchbar
        style={{
          borderRadius: normalize(30),
          marginHorizontal: normalize(30),
          marginTop: normalize(20),
          marginBottom: normalize(20),
          width: SCREEN_WIDTH - normalize(60),
        }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        data={data.filter((item) => item.title.includes(searchQuery))}
        style={styles.container}
        renderItem={({ item, index }) => {
          return (
            <View>
              <View style={styles.pcontainer}>
                <Image style={styles.photo} source={{ uri: item.imgUrl }} />
                <Text style={styles.price}>PKR 4 crore</Text>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.detailContainer}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={"bed-empty"}
                      color={COLORS.white}
                      style={{ marginRight: normalize(10) }}
                      size={normalize(30)}
                    />
                    <Text style={styles.iconInfo}>3</Text>
                    <Icon
                      name={"shower"}
                      color={COLORS.white}
                      size={normalize(30)}
                    />
                    <Text style={styles.iconInfo}>2</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      alignSelf: "baseline",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Icon
                      name={"arrow-expand"}
                      color={COLORS.white}
                      size={normalize(30)}
                      style={{ marginRight: normalize(9) }}
                    />
                    <Text style={styles.iconInfo}>22 marla</Text>
                  </View>
                </View>
              </View>
              <TouchableHighlight
                style={styles.chat}
                onPress={() => {
                  navigation.navigate("ViewProperty", {item:item});
                }}
              >
                <Text style={styles.chattxt}>Buy</Text>
              </TouchableHighlight>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(5),
  },
  pcontainer: {
    flex: 1,
    paddingBottom: normalize(15),
    backgroundColor: "#2F353C",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    marginTop: normalize(15),
    width: SCREEN_WIDTH - normalize(30),
    borderRadius: normalize(35),
    paddingHorizontal: normalize(10),
  },
  chat: {
    flex: 1,
    backgroundColor: "#28a745",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    marginTop: normalize(15),
    width: SCREEN_WIDTH - normalize(30),
    borderRadius: normalize(35),
    paddingVertical: normalize(10),
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
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: normalize(15),
    marginTop: normalize(5),
    alignSelf: "baseline",
  },
  photo: {
    marginTop: normalize(10),
    height: normalize(400),
    width: "100%",
    borderRadius: normalize(35),
  },
  title: {
    // flex: 1,
    fontSize: normalize(18),
    marginLeft: normalize(20),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "right",
    alignSelf: "flex-start",
    color: "#D4D4D4",
  },
  price: {
    // flex: 1,
    fontSize: normalize(22),
    marginLeft: normalize(20),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "right",
    alignSelf: "flex-start",
    color: "white",
  },
  iconInfo: {
    fontSize: normalize(18),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    color: "white",
  },
  chattxt: {
    fontSize: normalize(26),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    color: "white",
  },
});
