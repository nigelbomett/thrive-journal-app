import {StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner, Input,YStack,H4, SizableText } from 'tamagui';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';


type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList,'Welcome'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
    route: RegisterScreenRouteProp;
}

const handleRegister = () => {

};


const RegisterScreen : React.FC<Props> = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword   ] = useState('');
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

    useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [status])

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
              <Input size="$4" borderWidth={2} placeholder="Username" />
              <Input size="$4" borderWidth={2} placeholder="Email" />
              <Input size="$4" borderWidth={2} placeholder="Password" />
              <Input size="$4" borderWidth={2} placeholder="Confirm Password" />
          </YStack>
          <Form.Trigger asChild disabled={status !== 'off'}>
              
              <Button icon={status === 'submitting' ? () => <Spinner /> : undefined} backgroundColor={'orange'}>
                          <SizableText fontWeight="800" size="$5">Create Account</SizableText>
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
    }
})