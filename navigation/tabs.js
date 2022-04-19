import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabIcon } from "../components";
import { Home, Portfolio, Market } from "../screens";
import Wallet from "../screens/MetaMask/Wallet";
import PProfile from "../screens/Profiles/profile";
import { COLORS, icons } from "../constants";
import ChangePass from "../screens/Profiles/ChangePass";
import AddProperty from "../screens/Profiles/AddProperty";
import EditProfile from "../screens/Profiles/EditProfile";
import ViewProperty from "../screens/Property/ViewProperty";
import Login from "../screens/Login/Login";
import { normalize } from "../Normalizer";
import { Button, IconButton, Card, List } from "react-native-paper";

const stack = createStackNavigator();
function Profile() {
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"PProfile"}
      >
        <stack.Screen name="PProfile" component={PProfile} />
        <stack.Screen name="AddProperty" component={AddProperty} />
        <stack.Screen name="ChangePass" component={ChangePass} />
        <stack.Screen name="EditProfile" component={EditProfile} />
        <stack.Screen name="Portfolio" component={Portfolio} />
        <stack.Screen name="Login" component={Login} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const Homestack = createStackNavigator();
function HOme() {
  return (
    <NavigationContainer independent={true}>
      <Homestack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <Homestack.Screen name="Home" component={Home} />
        <Homestack.Screen name="ViewProperty" component={ViewProperty} />
      </Homestack.Navigator>
    </NavigationContainer>
  );
}


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: COLORS.background,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HOme}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.home} label="Home" />;
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.trade} label="Wallet" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.chat} label="Chats" />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon focused={focused} icon={icons.profile} label="Profile" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
