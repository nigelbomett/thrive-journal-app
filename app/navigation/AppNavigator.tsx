import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import React from "react";
import JournalEntryScreen from "../screens/JournalEntryScreen";
import SummaryScreen from "../screens/SummaryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Ionicons from '@expo/vector-icons/Ionicons';


type IconName = 'home' | 'home-outline' | 'settings' | 'settings-outline' | 'stats-chart' | 'stats-chart-outline' | 'person-circle' | 'person-circle-outline';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Journal" component={HomeScreen}/>
        <Stack.Screen name="JournalEntry" component={JournalEntryScreen}/>
    </Stack.Navigator>
);

//pages to be viewed once authorized
const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                   
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    }
                    else if(route.name === 'Summary') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    }
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName as IconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#E67E33',
                tabBarInactiveTintColor: '#3D3C39',
            })}
        
        >
            <Tab.Screen name="Home" component={HomeStack}/>
            <Tab.Screen name="Summary" component={SummaryScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
);

//Pages to be redirected for authentication
const AuthNavigator: React.FC = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen as React.FC} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen as React.FC} />
            <Stack.Screen name="Login" component={LoginScreen as React.FC}/>
            
        </Stack.Navigator>
    </NavigationContainer>
);

export {AppNavigator,AuthNavigator};