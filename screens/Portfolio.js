import { COLORS } from "../constants";
import React, { useEffect, useRef, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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

const Portfolio = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [PropertyData, setPropertyData] = React.useState([]);
  const [starCount, setStarCount] = React.useState(2.5);
    const getproperty = useEffect(() => {
      axios
        .get("http://10.10.22.24:8000/api/property/")
        .then((res) => {
          console.log(res.data, "res");
          setPropertyData(res.data);
          //console.log(PropertyData);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, []);
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
      }}
      contentContainerStyle={{
        backgroundColor: COLORS.background,

        marginTop: getStatusBarHeight(),
        paddingBottom: normalize(120),
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
        data={PropertyData.filter((item) =>
          item.PropertyTitle.includes(searchQuery)
        )}
        style={styles.container}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight underlayColor="none">
              <View style={styles.pcontainer}>
                <Image style={styles.photo} source={{ uri: item.imgUrl1 }} />
                <Text style={styles.price}>PKR {item.Price}</Text>
                <Text style={styles.title}>{item.PropertyTitle}</Text>
                <View style={styles.detailContainer}>
                  <View style={styles.iconContainer}>
                    <Icon
                      name={"bed-empty"}
                      color={COLORS.white}
                      style={{ marginRight: normalize(10) }}
                      size={normalize(20)}
                    />
                    <Text style={styles.iconInfo}>{item.BedRooms}</Text>
                    <Icon
                      name={"shower"}
                      color={COLORS.white}
                      size={normalize(20)}
                    />
                    <Text style={styles.iconInfo}>{item.BathRooms}</Text>
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
                      size={normalize(20)}
                      style={{ marginRight: normalize(4) }}
                    />
                    <Text style={styles.iconInfo}>22 marla</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: "space-evenly" }}
        key={"1"}
      />
    </ScrollView>
  );
};

export default Portfolio;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: normalize(5),
  },
  pcontainer: {
    flex: 1,
    paddingBottom: normalize(5),
    backgroundColor: "#2F353C",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: normalize(15),
    width: (SCREEN_WIDTH - (numColums + 1) * CARD_MARGIN) / numColums,
    borderRadius: normalize(15),
    paddingHorizontal: normalize(10),
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
    marginHorizontal: normalize(7),
    marginTop: normalize(5),
    alignSelf: "baseline",
  },
  photo: {
    marginTop: normalize(15),
    height: normalize(147),
    width: normalize(157),
    borderRadius: normalize(15),
  },
  title: {
    // flex: 1,
    fontSize: normalize(15),
    marginLeft: normalize(10),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#D4D4D4",
  },
  price: {
    // flex: 1,
    fontSize: normalize(14),
    marginLeft: normalize(10),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "right",
    alignSelf: "flex-start",
    color: "white",
  },
  iconInfo: {
    fontSize: normalize(14),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    color: "white",
  },
});
