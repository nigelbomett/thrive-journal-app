import { FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { sendAlert } from '../utils/ui';
import { Button, SizableText, XGroup } from 'tamagui';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from "@expo/vector-icons";

interface EntryFormProps {
    entryId?: number;
    onSave: () => void;
}

type AntIcon = 'delete' | 'arrowright';

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
        { label: 'Personal', value: 'user-secret' },
        { label: 'Travel', value: 'plane' },
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

