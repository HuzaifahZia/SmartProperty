import React from "react";
import { View, Text, FlatList } from "react-native";
import Slider from "../../components/Carousel";
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
import { normalize } from "../../Normalizer";
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
import data from "../../components/data";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MainLayout } from "../MainLayout";
import { COLORS } from "../../constants";

export default function Wallet() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}></View>
  );
}
