import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './app/tamagui.config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RootNavigator } from './app/navigation/AppNavigator';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //load fonts for tamagui ui-library
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {

    if (loaded) {
      const checkAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        
        //use token as a boolean value to set authentication
        setIsAuthenticated(!!token);
      };
      checkAuth();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (<TamaguiProvider config={tamaguiConfig}><RootNavigator /></TamaguiProvider>);
}
