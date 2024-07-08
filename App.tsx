import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './app/tamagui.config';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RootNavigator } from './app/navigation/AppNavigator';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {

    if (loaded) {
      const checkAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      };
      checkAuth();
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }

  //redirect to either home page or login/register based on authentication
  /* if(isAuthenticated){
    return (
      <TamaguiProvider config={tamaguiConfig}><AppNavigator/></TamaguiProvider>
    );
  }else{
    return (
      <TamaguiProvider config={tamaguiConfig}><AuthNavigator /></TamaguiProvider>
    );
  } */
  return (<TamaguiProvider config={tamaguiConfig}><RootNavigator /></TamaguiProvider>);
}
