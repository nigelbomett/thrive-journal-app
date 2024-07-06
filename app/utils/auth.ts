import AsyncStorage from "@react-native-async-storage/async-storage";



//save JwT token in storage
export const setToken = async(token:string) => {
    await AsyncStorage.setItem('token',token);
};

//retrieve JwT token from storage
export const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

//remove JwT token
export const removeToken = async() => {
    await AsyncStorage.removeItem('token');
};