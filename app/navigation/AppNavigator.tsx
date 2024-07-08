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
import { Button, SizableText, Text, XStack } from "tamagui";


type IconName = 'home' | 'home-outline' | 'settings' | 'settings-outline' | 'stats-chart' | 'stats-chart-outline' | 'person-circle' | 'person-circle-outline';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Journal" component={HomeScreen}
            options={({navigation}) => ({
                headerRight: () => (
                    <XStack
                        gap="$5"
                        padding="$2"
                    >
                        <SizableText size="$8" ><Ionicons name="person-outline" size={24} color="black" /></SizableText>
                        <SizableText size="$8"> 1 <Ionicons name="flame" size={24} color="red"/></SizableText>
                    </XStack>
                )
            })}
        />
        <Stack.Screen name="Journal Entry" component={JournalEntryScreen as React.FC}/>
    </Stack.Navigator>
);

//pages to be viewed once authorized
const AppNavigator = () => (
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
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }}/>
            <Tab.Screen name="Summary" component={SummaryScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
);



//Pages to be redirected for authentication
const AuthNavigator: React.FC = () => (
    
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen as React.FC} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen as React.FC} />
            <Stack.Screen name="Login" component={LoginScreen as React.FC}/>
            <Stack.Screen name="HomeTab" component={AppNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
        
    
);

const RootNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Main" component={AuthNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
);

export {RootNavigator};