import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { sendAlert } from '../utils/ui';
import { Button, Card, H2, Image, ListItem, Paragraph, ScrollView, Separator, SizableText, XStack, YGroup } from 'tamagui';
import { FontAwesome } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUser();
  },[])
  
  const fetchUser = async () => {
    try {
      const response = await api.get('/user');
      const {username,email,password_hash} = response.data;
      setUsername(username);
      setEmail(email);
      //setPassword(password_hash);
      setPassword('● ● ● ● ● ●');
    } catch (error : any) {
      let errorMessage;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message;
      }
      sendAlert('❌ Something went wrong', errorMessage);
    }
  }

  const updateUser = async () => {
    try {
      await api.put('/user', {username,email,password});
      sendAlert('✔️ Success', 'Profile Updated');
    } catch (error: any) {
      let errorMessage;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message;
      }
      sendAlert('❌ Something went wrong', errorMessage);
    }
  }
  return (
    <ScrollView flex={1}>
    <View style={styles.cardContainer}>
      <Card elevate size="$5" width={350} height={500} marginTop="$12">
        <Card.Header padded alignItems='center'>
          <FontAwesome name={'user-circle-o'} size={150} color={'black'} />
        </Card.Header>
        <YGroup separator={<Separator />} gap="$3">
          <YGroup.Item>
            <XStack paddingLeft="$5" alignItems="center">
              <Paragraph width={80}>Username</Paragraph>
              <Separator alignSelf="stretch" vertical marginHorizontal={15} /> 
                <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
            </XStack>
          </YGroup.Item>
          <YGroup.Item>
            <XStack paddingLeft="$5" alignItems="center">
              <Paragraph width={80}>Email</Paragraph>
              <Separator alignSelf="stretch" vertical marginHorizontal={15} />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </XStack>
          </YGroup.Item>
          <YGroup.Item>
            <XStack paddingLeft="$5" alignItems="center">
              <Paragraph width={80}>Password</Paragraph>
              <Separator alignSelf="stretch" vertical marginHorizontal={15} />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />
            </XStack>
          </YGroup.Item>
        </YGroup>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$5" backgroundColor='#E67E33' elevate onPress={updateUser}> 
            <FontAwesome name={'save'} size={25} color={'white'} />
            <SizableText size="$6" color={'whitesmoke'}>Update
            </SizableText>
          </Button>
        </Card.Footer>
        <Card.Background>
          
        </Card.Background>
      </Card>
    </View>
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    paddingBottom:60
  },
})