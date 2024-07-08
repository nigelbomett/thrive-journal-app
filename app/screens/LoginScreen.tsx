
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { XStack } from 'tamagui'
import { Unspaced } from 'tamagui'
import { Adapt, Dialog, Fieldset, Input, Label, Sheet, Spinner } from 'tamagui'
import { SizableText } from 'tamagui'
import { Button, ListItem, Separator, YGroup } from 'tamagui'
import { Form, View, YStack } from 'tamagui'
import InputModal from '../components/InputModal'
import api from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../types/types'
import { sendAlert } from '../utils/ui'

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
    route: LoginScreenRouteProp;
}

const LoginScreen:React.FC<Props> = ({navigation}) => {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [opacity, setOpacity] = useState(0.4)

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', {email,password});
            console.log(response.data.token);
            //save JwT token to storage and redirect to home page
            await AsyncStorage.setItem('token',response.data.token);
            /* navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            }); */
            navigation.navigate('HomeTab');
        } catch (error: any) {
            let errorMessage;
            if (error.response?.data){
                errorMessage = error.response.data
            }else{
                errorMessage = error.message;
            }
            //const errorMessage = error.response.data || 'Kindly confirm your details again'
             
            sendAlert('❌ Something went wrong', errorMessage);
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
    }, [status,email,password]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    const validateForm = () => {
        if (validateEmail(email) &&
            password
        ) {
            setIsButtonDisabled(false);
            setOpacity(1);
        } else {
            setIsButtonDisabled(true);
            setOpacity(0.4);
        }
    };

  return (
      <View style={styles.container}>
          <YStack
              gap="$4">
              <Form
                  onSubmit={() => setStatus('submitting')
                  }
                  gap="$8"
              >
                  <YStack>
                      <YGroup separator={<Separator />}
                          marginTop="$20"
                      >
                          <YGroup.Item>
                              <ListItem size="$2"><Input size="$5" borderWidth={0} minWidth={280} placeholder="Email" value={email} onChangeText={setEmail} /></ListItem>
                          </YGroup.Item>
                          <YGroup.Item>
                              <ListItem size="$2"><Input size="$5" borderWidth={0} minWidth={280} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} /></ListItem>
                          </YGroup.Item>
                      </YGroup>
                  </YStack>
                  <Form.Trigger asChild disabled={status !== 'off'}>

                      <Button icon={status === 'submitting' ? () => <Spinner /> : undefined} backgroundColor={'orange'} onPress={handleLogin} disabled={isButtonDisabled} opacity={opacity}>
                          <SizableText fontWeight="800" size="$5">Sign In</SizableText>
                      </Button>
                  </Form.Trigger>
              </Form>
              <Button variant="outlined" size="$3" borderWidth={0} width={150} onPress={() => setModalVisible(true)}>
                  <SizableText size="$4">forgot password?</SizableText>
              </Button>
              <InputModal  modalVisible={modalVisible} setModalVisible={setModalVisible} />
          </YStack>
      </View>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex'
    },
})