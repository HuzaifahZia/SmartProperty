import React from "react";
import { View, Text, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FONTS, COLORS, icons } from "../constants";

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: 60,
          borderRadius: 20,
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: Colors.black,
            ...iconStyle,
          }}
        />

        <Text style={{ color: COLORS.black, ...FONTS.h4 }}>Wallet</Text>
      </View>
    );
  } else {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.purple : COLORS.white,
            ...iconStyle,
          }}
          onPress={() => {}}
        ></Image>
        <Text
          style={{
            color: focused ? COLORS.purple : COLORS.white,
            ...FONTS.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Tab</Text>
    </View>
  );
};
export default TabIcon;