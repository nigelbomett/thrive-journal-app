import {StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner, Input,YStack,H4, SizableText, Text } from 'tamagui';
import { RootStackParamList } from '../types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import api from '../utils/api';
import {sendAlert} from '../utils/ui';


type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList,'Register'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
}


const RegisterScreen : React.FC<Props> = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword   ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [opacity, setOpacity] = useState(0.4)
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
  

    const handleRegister = async () => {             
        try {
            const response = await api.post('/auth/register', { username, email, password });
            navigation.navigate('Login');
        } catch (error: any) {
            const errorMessage = error.response.data.error|| 'Kindly confirm your details again'
            sendAlert('❌ Something went wrong',errorMessage);
        }
    };

    useEffect(() => {
        validateForm();
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status,username,email,password,confirmPassword])

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    if(username &&
        validateEmail(email) &&
        password &&
        confirmPassword &&
        password === confirmPassword
    ){
        setIsButtonDisabled(false);
        setOpacity(1);
    } else{
        setIsButtonDisabled(true);
        setOpacity(0.4);
    }
  };

  return (
      <View style={styles.container}>
        <YStack
              gap="$10">
    <Form
          borderWidth={1}
          borderRadius="$4"
          backgroundColor="#E1D7CB"
          borderColor="#3D3C39"
          padding="$4"
          marginTop="$15"
          onSubmit={() => setStatus('submitting')
          }
    >            
          <YStack
              minHeight={250}
              gap ="$2"
              margin="$5"
              padding="$2"
                minWidth={250}
          >
              <Input size="$4" borderWidth={2} placeholder="Username" value={username} onChangeText={setUsername}/>
              <Input size="$4" borderWidth={2} placeholder="Email" value={email} onChangeText={setEmail}/>
                      <Input size="$4" borderWidth={2} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} /> 
                      
                      
            <Input size="$4" borderWidth={2} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          </YStack>
          <Form.Trigger asChild disabled={status !== 'off'}>              
                      <Button icon={status === 'submitting' ? () => <Spinner /> : undefined} backgroundColor={'orange'} onPress={handleRegister} disabled={isButtonDisabled} opacity={opacity}>
                    <SizableText fontWeight="800" size="$5" >Create Account</SizableText>
              </Button>
          </Form.Trigger>
    </Form>
          <Button themeInverse size="$3" onPress={() => navigation.navigate('Login')}>
              I already have an account
          </Button>
              
          </YStack>             
      </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
         alignItems:'center',
         display:'flex'
    },
    input:{
        marginBottom:16
    },
    submitButton:{
        marginTop:16
    },


    
})