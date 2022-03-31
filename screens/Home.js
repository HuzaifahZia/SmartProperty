import React from "react";
import { View, Text, FlatList } from "react-native";
import Slider from "../components/Carousel";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Dimensions, StatusBar, Platform, TouchableHighlight, TouchableOpacity, Image,} from "react-native";
import { normalize } from "../Normalizer";
import { Searchbar, Modal, Portal, Avatar, Button, Card, Title, Paragraph,} from "react-native-paper";
import data from "../components/data";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MainLayout } from "./MainLayout";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const numColums = 2;
// item size
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const ITEM_HEIGHT = normalize(150);
const ITEM_MARGIN = normalize(20);
const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [visible, setVisible] = React.useState(false);
  const [starCount, setStarCount] = React.useState(2.5);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    justifyContent: "space-between",
    backgroundColor: "white",
    margin: normalize(20),
    height: height - normalize(50),
  };
  const onStarRatingPress = (rating) => {
    setStarCount(rating);
  };
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        backgroundColor: "white",

        marginTop: getStatusBarHeight(),
        paddingBottom: normalize(120),
      }}
    >
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TouchableOpacity
            onPress={() => {
              hideModal();
            }}
            style={{
              alignSelf: "flex-start",
              top: normalize(-8),
              left: normalize(-8),
            }}
          >
            <Icon name={"close-circle"} color={"black"} size={normalize(30)} />
          </TouchableOpacity>

          <Card
            style={{
              margin: normalize(5),
              borderRadius: normalize(30),
            }}
          >
            <Card.Cover
              style={{
                resizeMode: "contain",
                borderTopEndRadius: normalize(30),
                borderTopStartRadius: normalize(30),
                borderRadius: normalize(30),
              }}
              source={{ uri: "https://picsum.photos/700" }}
            />
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>
                Description: 4 Rooms | 5 Bathrooms | 1 Drawing Room | 2 Kitchens
              </Paragraph>
            </Card.Content>
          </Card>
          <View
            style={{
              paddingLeft: normalize(20),
              width: normalize(260),
            }}
          >
            <Title>Ratings</Title>
            <StarRating
              disabled={false}
              emptyStar={"ios-star-outline"}
              fullStar={"ios-star"}
              halfStar={"ios-star-half"}
              iconSet={"Ionicons"}
              maxStars={5}
              rating={starCount}
              selectedStar={(rating) => onStarRatingPress(rating)}
              fullStarColor={"black"}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Title
              style={{
                paddingLeft: normalize(20),
              }}
            >
              Related
            </Title>
            <FlatList
              horizontal
              data={data.filter((item) => item.title.includes(searchQuery))}
              style={styles.container}
              contentContainerStyle={{
                height: 200,
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={() => {
                      showModal();
                    }}
                  >
                    <View
                      style={[styles.pcontainer, { marginLeft: normalize(10) }]}
                    >
                      <Image
                        style={styles.photo}
                        source={{ uri: item.imgUrl }}
                      />
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </TouchableHighlight>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              numColumns={1}
              key={"1"}
            />
          </View>
        </Modal>
      </Portal>
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
      {searchQuery == "" ? <Slider /> : null}

      <FlatList
        data={data.filter((item) => item.title.includes(searchQuery))}
        style={styles.container}
        renderItem={({ item, index }) => {
          return (
            <TouchableHighlight
              underlayColor="none"
              onPress={() => {
                showModal();
              }}
            >
              <View style={styles.pcontainer}>
                <Image style={styles.photo} source={{ uri: item.imgUrl }} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableHighlight>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        key={"1"}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: normalize(30),
  },
  pcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: ITEM_MARGIN,
    marginTop: normalize(5),
    width: (SCREEN_WIDTH - (numColums + 1) * ITEM_MARGIN) / numColums,
    height: ITEM_HEIGHT + normalize(0),
    borderRadius: normalize(30),
  },

  photo: {
    height: normalize(147),
    width: normalize(147),
    borderRadius: normalize(30),
  },
  title: {
    // flex: 1,
    fontSize: normalize(14),
    fontFamily: "OpenSansCondensedLight",
    textAlign: "left",
    color: "#333333",
    marginTop: 5,
  },
});
