import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { formatDateTime, sendAlert } from '../utils/ui';
import { Button, ScrollView, SizableText } from 'tamagui';
import DatePicker from '@react-native-community/datetimepicker'
import { JournalEntry } from '../types/types';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import JournalEntryList from '../components/JournalEntryList';
import withAuth from '../components/Auth';
import { AntDesign } from "@expo/vector-icons";

interface SummaryScreenProps {
  navigation: NavigationProp<ParamListBase>
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ navigation }) => {
  const [summary, setSummary] = useState<{totalEntries:number;entries:JournalEntry[]} | null>(null);
  const [date,setDate] = useState(new Date());
  const [showDatePicker,setShowDatePicker] = useState(false);
  const [period,setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const fetchSummary = async () => {
    try {
      const response = await api.get('/entry/summary', {
        params:{
          period,
          date: date.toISOString().split('T')[0]
        },
      });
      setSummary(response.data);
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

  const deleteEntry = async (id: number) => {
    try {
      await api.delete(`/entry/${id}`);
      fetchSummary();
    } catch (error: any) {
      let errorMessage;
      if (error.response?.data) {
        errorMessage = error.response.data.error
      } else {
        errorMessage = error.message;
      }
      sendAlert('❌ Something went wrong', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => setShowDatePicker(true)} backgroundColor={'white'}>
        <AntDesign name={'calendar'} size={20} color={'#E67E33'} />
        <SizableText size="$7">{date.toDateString()}</SizableText>
      </Button>
      {showDatePicker && (
        <DatePicker
          value={date}
          mode='date'
          display='default'
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <View style={styles.periodButtons}>
        <Button onPress={() => setPeriod('daily')} backgroundColor={'#E1D7CB'} width="30%"><SizableText size="$4">Daily</SizableText></Button>
        <Button onPress={() => setPeriod('weekly')} backgroundColor={'#E1D7CB'} width="30%"><SizableText size="$4">Weekly</SizableText></Button>
        <Button onPress={() => setPeriod('monthly')} backgroundColor={'#E1D7CB'} width="30%"><SizableText size="$4">Monthly</SizableText></Button>
      </View>
      <Button onPress={fetchSummary} backgroundColor={'#E1D7CB'}><SizableText size="$5">Fetch Summary</SizableText></Button>
      <View>
      <SizableText size="$4" paddingTop="$3">Selected period: {period}</SizableText>
      </View>
      {summary && (
          <SizableText size="$8" paddingTop="$3">Total Entries: {summary.totalEntries}</SizableText>
        )
      }
      {summary && (
        <JournalEntryList entries={summary.entries} onEdit={(id) => navigation.navigate('Journal Entry', { entryId: id })} onDelete={deleteEntry}
        />
      )}    
    </View>
  )
}

export default withAuth(SummaryScreen)

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
  },
  periodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  entry: {
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})