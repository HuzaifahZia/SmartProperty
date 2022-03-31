import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Tabs from "./navigation/tabs";
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';



const Stack = createStackNavigator();

const App = () => {

    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Login'}
                >
                    <Stack.Screen
                        name="Login"
                        component={Login}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                    />
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App;