import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { AppNavigator, AuthNavigator } from './app/navigation/AppNavigator';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  //redirect to either home page or login/register based on authentication
  return isAuthenticated ? <AppNavigator/> : <AuthNavigator/>
};

export default App;