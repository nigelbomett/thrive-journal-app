import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { sendAlert } from '../utils/ui';
import { Button, SizableText, XGroup } from 'tamagui';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from "@expo/vector-icons";
import DatePicker from '@react-native-community/datetimepicker'

interface EntryFormProps {
    entryId?: number;
    onSave: () => void;
}

type AntIcon = 'delete' | 'arrowright' |'calendar';

const JournalEntryForm: React.FC<EntryFormProps> = ({entryId, onSave}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [opacity, setOpacity] = useState(0.4)
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([
        { label: 'Work', value: 'briefcase' },
        { label: 'Personal', value: 'user-secret' },
        { label: 'Travel', value: 'plane' },
    ]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const validateEntry = () => {
        if (title &&
            category &&
            content
        ) {
            setIsButtonDisabled(false);
            setOpacity(1);
        } else {
            setIsButtonDisabled(true);
            setOpacity(0.4);
        }
    };

    useEffect(() => {
        //validateEntry();
        if(entryId){
            fetchEntry();
        }
    }, [entryId]);

    const fetchEntry = async () => {
        try {
            const response = await api.get(`/entry/${entryId}`);
            const {title, content, category} = response.data;
            setTitle(title);
            setContent(content);
            setCategory(category);
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

    const handleSave = async () => {
        try {
            const payload = {title,content,category,date};
            if(entryId){
                await api.put(`/entry/${entryId}`,payload);
            }else{
                await api.post('/entry',payload);
            }

            onSave();
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
            onSave();
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

    const handleDelete = () => {
        if(entryId){
            deleteEntry(entryId);
        }
    }
    type ListItem = { key: string };
    const renderItem: ListRenderItem<ListItem> = ({ item }) => {
        switch (item.key) {
            case 'title':
                return (
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                        
                    />
                );
            case 'content':
                return (
                    <TextInput
                        placeholder="Write your Journal"
                        value={content}
                        onChangeText={setContent}
                        style={[styles.input, styles.contentInput]}
                        multiline
                    />
                );
            case 'category':
                return (
                   <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={categories}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={category}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCategory(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
                );
            case 'date':
                return (
                    <View>
                        <Button onPress={() => setShowDatePicker(true)} marginTop="$4">
                            <AntDesign name={'calendar' as AntIcon} size={20} color={'#E67E33'} />
                            <SizableText size="$4">{date.toDateString()}</SizableText>
                            </Button>
                    {
                    showDatePicker && (
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
                    )
                }
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>

            <FlatList
                data={[
                    { key: 'title' },                   
                    { key: 'category' },
                    { key:  'date' },
                    { key: 'content' }
                ]}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.flatListContent}
            />

            <XGroup size="$4" $gtSm={{ size: '$5' }} gap="$15">
                <XGroup.Item> 
                    <Button width="30%" onPress={handleDelete} chromeless>
                    <AntDesign name={'delete' as AntIcon} size={40} color={'red'}/>
                    </Button>
                </XGroup.Item>
                <XGroup.Item>
                    <Button width="30%" onPress={handleSave} chromeless>
                    <AntDesign name={'arrowright' as AntIcon} size={40} color={'#E67E33'} />
                    </Button>
                </XGroup.Item>
            </XGroup>
        </View>
  )
}

export default JournalEntryForm

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
       
    },
    container: {
        padding:20,
        backgroundColor: '#fff',
        flex:1
    },
    input: {
        marginBottom: 16
    },
    button: {
        marginTop:16
    },
    flatListContent: {
        padding: 10,
        paddingBottom: 80, 
    },
    contentInput: {
        flex: 1, 
        paddingTop:10
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

