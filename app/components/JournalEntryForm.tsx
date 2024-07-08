import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { sendAlert } from '../utils/ui';
import { Button, Card, ScrollView, SizableText } from 'tamagui';
import DropDownPicker from 'react-native-dropdown-picker';

interface EntryFormProps {
    entryId?: number;
    onSave: () => void;
}


const JournalEntryForm: React.FC<EntryFormProps> = ({entryId, onSave}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [opacity, setOpacity] = useState(0.4)
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([
        { label: 'Work', value: 'briefcase' },
        { label: 'Personal', value: 'barcode' },
        { label: 'Travel', value: 'airplane' },
    ]);

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
        validateEntry();
        if(entryId){
            fetchEntry();
        }
    }, [entryId, title,category,content]);

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
            const payload = {title,content,category};
            if(entryId){
                await api.put(`/entry/${entryId}`);
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
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={categories}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setCategories}
                        style={styles.dropdown}
                        containerStyle={{ height: 50, marginBottom: 10 }}
                    />
                );
            case 'date':
                return (
                    <TextInput
                        placeholder="Date"
                        value={date}
                        onChangeText={setDate}
                        style={styles.input}
                    />
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
                    { key: 'content' },
                ]}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.flatListContent}
            />

        <View>
                <Button onPress={handleSave} marginTop="$5" backgroundColor={'orange'} disabled={isButtonDisabled} opacity={opacity}>
            <SizableText size="$4">Save</SizableText>
        </Button>
        </View>
        </View>
  )
}

export default JournalEntryForm

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center',
       
    },
    dropdown: {
        borderColor: '#ccc',
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
})

