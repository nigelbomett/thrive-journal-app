import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import {formatDateTime, sendAlert} from '../utils/ui';
import JournalEntryList from '../components/JournalEntryList';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Button, Card, Group, H2, Image, Paragraph, ScrollView, Separator, SizableText, View, XStack, YStack } from 'tamagui';
import withAuth from '../components/Auth';
interface HomeScreenProps{
  navigation: NavigationProp<ParamListBase>
}


const HomeScreen:React.FC<HomeScreenProps> = ({navigation}) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  },[entries]);
  
  const fetchEntries = async () => {
    try {
      const response = await api.get('/entry');
      setEntries(response.data);
    } catch (error: any) {
      let errorMessage;
      if (error.response?.data) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message;
      }
      sendAlert('❌ Something went wrong', errorMessage);
    }
  }
  
  const deleteEntry = async(id:number) => {
    try {
      await api.delete(`/entry/${id}`);
      fetchEntries();
    } catch (error :any) {
      let errorMessage;
      if (error.response?.data) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message;
      }
      sendAlert('❌ Something went wrong', errorMessage);
    }
  }


  return (
    <View style={styles.cardContainer}>
      {entries.length === 0 ? (
        <Card elevate size="$5" width={250} height={300} marginTop="$18">
        <Card.Header padded>
          <H2>Journal</H2>
          <Paragraph theme="alt2">Let's help you write your first entry!</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button borderRadius="$5" backgroundColor='#E67E33' elevate onPress={() => navigation.navigate('Journal Entry')}>
            <FontAwesome name={'edit'} size={25} color={'white'} />
            <SizableText size="$6" color={'whitesmoke'}>Write
              </SizableText>
              </Button>
        </Card.Footer>
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={require('../assets/writeyourfirst2.png')}

          />
        </Card.Background>
      </Card> ) : (

     <View style={styles.entriesList}>
      <JournalEntryList entries={entries} onEdit={(id) => navigation.navigate('Journal Entry', { entryId: id })} onDelete={deleteEntry} />
            <Button onPress={() => navigation.navigate('Journal Entry')} marginTop="$2" backgroundColor={'orange'}><SizableText size="$6">Add New Entry</SizableText></Button>
      </View>
      )}
    </View>
   
  )
}

export default withAuth(HomeScreen);

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  entriesList:{
    padding:10
  }
})