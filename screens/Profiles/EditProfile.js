import React from "react";
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
const { width, height } = Dimensions.get("window");
import { FlatList } from "react-native-gesture-handler";
import { normalize } from "../../Normalizer";
import { COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert/Alert";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "react-native-paper";

export default function EditProfile() {
  return <View style={{ flex: 1, backgroundColor: COLORS.background }}></View>;
}
