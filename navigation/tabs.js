import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabIcon } from "../components";
import { Home, Portfolio, Market} from "../screens";
import profile from "../screens/Profiles/profile";
import { COLORS, icons } from "../constants";
import ChangePass from "../screens/Profiles/ChangePass";
import AddProperty from "../screens/Profiles/AddProperty";
import EditProfile from "../screens/Profiles/EditProfile";
import { normalize } from "../Normalizer";
import { Button, IconButton, Card, List } from "react-native-paper";

const stack = createStackNavigator();
function Profile() { 
  return(
  <NavigationContainer independent={true}>
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"profile"}
    >
      <stack.Screen name="profile" component={profile} />
      <stack.Screen name="AddProperty" component={AddProperty} />
      <stack.Screen name="ChangePass" component={ChangePass} />
      <stack.Screen name="EditProfile" component={EditProfile}/>
    </stack.Navigator>
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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return <TabIcon focused={focused} icon={icons.home} label="Home" />;
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                label="Portfolio"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={icons.trade}
                label="Wallet"
              />
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
