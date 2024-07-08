import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import JournalEntryForm from '../components/JournalEntryForm'
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import withAuth from '../components/Auth';

//Define stack parameter
type RootStackParamList = {
  Entry: { entryId: number };
};

//Define route and navigation props for the entry screen
type EntryScreenRouteProp = RouteProp<RootStackParamList, 'Entry'>;
type EntryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Entry'>;

interface JournalScreenProps {
  route: EntryScreenRouteProp
  navigation: EntryScreenNavigationProp;
}



const JournalEntryScreen: React.FC<JournalScreenProps> = ({route,navigation}) => {
  const {entryId} = route.params || {};
  return (
      <JournalEntryForm entryId={entryId} onSave={() => navigation.goBack()}/>
  )
}

export default withAuth(JournalEntryScreen)

const styles = StyleSheet.create({})