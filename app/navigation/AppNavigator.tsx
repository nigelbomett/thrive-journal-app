import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import React from "react";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//pages to be viewed once authorized
const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
);

//Pages to be redirected for authentication
const AuthNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen as React.FC} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen as React.FC} />
            <Stack.Screen name="Login" component={LoginScreen}/>
            
        </Stack.Navigator>
    </NavigationContainer>
);

export {AppNavigator,AuthNavigator};