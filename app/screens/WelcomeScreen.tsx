import { StyleSheet,View, ImageBackground } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { RouteProp } from '@react-navigation/native';
import {Button, YStack,SizableText} from 'tamagui'
import { StackNavigationProp } from '@react-navigation/stack';


type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
type  WelcomeScreenRouteProp = RouteProp<RootStackParamList, 'Welcome'>;

type Props = {
    navigation: WelcomeScreenNavigationProp;
    route: WelcomeScreenRouteProp;
};

const WelcomeScreen: React.FC<Props> = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <ImageBackground source={require('../assets/journal_background_thrive_2.png')} style={styles.backgroundImage}>
        <YStack style={styles.buttonsContainer}>
          <Button
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
            size="$5"
            backgroundColor={'orange'}
          >
            <SizableText fontWeight="800" size="$5">Get Started</SizableText>
          </Button>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
            size="$5"
          >
            <SizableText fontWeight="800" size="$5">I have an Account</SizableText>
          </Button>
        </YStack>
    </ImageBackground>
    </View>
    
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    backgroundImage:{
      flex: 1,
      justifyContent: 'flex-end',
      
    },
    buttonsContainer: {
      flexDirection: 'column',
      justifyContent:'space-between',
      paddingBottom:50,
      height:160,
      padding:20
    },
    registerButton: {
      marginBottom:10
    },
    loginButton: {
      backgroundColor: '#E2D8CC',
      marginBottom: 10
  }
})