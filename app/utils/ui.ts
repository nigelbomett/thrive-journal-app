import {Alert} from 'react-native';

//Displays an alert with a given title and message
export const sendAlert = (title: string,message:string) => {
    Alert.alert(title,message, [
        {text: 'OK'},
    ]);
};


export const formatDateTime = (dateTimeString: string): string => {
    const dateObject = new Date(dateTimeString);
    return dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, });
};