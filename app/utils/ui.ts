import {Alert} from 'react-native';

//Displays an alert with a given title and message
export const sendAlert = (title: string,message:string) => {
    Alert.alert(title,message, [
        {text: 'OK'},
    ]);
};