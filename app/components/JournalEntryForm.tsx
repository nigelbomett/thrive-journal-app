import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { sendAlert } from '../utils/ui';
import { Button, SizableText, XGroup } from 'tamagui';
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
            const payload = {title,content,category};
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

            <XGroup size="$3" $gtSm={{ size: '$5' }} gap="$5">
                <XGroup.Item>
                    <Button onPress={handleDelete} marginTop="$2" backgroundColor={'red'} width="45%">
                        <SizableText size="$4">Delete</SizableText>
                    </Button>                   
                </XGroup.Item>
                <XGroup.Item>
                    <Button onPress={handleSave} marginTop="$2" backgroundColor={'orange'} width="45%">
                        <SizableText size="$4">Save</SizableText>
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
    dropdown: {
        borderColor: '#ccc'
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

