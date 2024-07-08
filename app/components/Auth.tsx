import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "tamagui";
import { sendAlert } from "../utils/ui";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return(props: P) => {
        const [loading, setLoading] = useState(true);
        const [authorized, setAuthorized] = useState(false);
        const navigation = useNavigation();

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const token = await AsyncStorage.getItem('token');
                    console.log(token);
                    if (!token) {
                        navigation.dispatch(StackActions.replace('Login'));
                    } else {
                        setAuthorized(true);
                    }
                } catch (error) {
                    console.error(error);
                    navigation.dispatch(StackActions.replace('Login'));
                } finally {
                    setLoading(false);
                }
            };

            checkAuth();
        }, [navigation]);

        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if (!authorized) {
            return sendAlert('🔒 Not Authorized', 'Kindly Sign in')
        }

        return <WrappedComponent {...props}/>
    }
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default withAuth;