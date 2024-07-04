import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";



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
const AuthNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen}/>
            
        </Stack.Navigator>
    </NavigationContainer>
);

export {AppNavigator,AuthNavigator};