import { Alert, Modal, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Fieldset, H2, Input, Label, Paragraph, XStack, YStack } from 'tamagui';

interface InputModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}
const InputModal: React.FC<InputModalProps> = ({ modalVisible, setModalVisible }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <YStack gap="$3">
                    <H2>Forgot Password?</H2>
                    <Paragraph>
                        Type in your email address and we'll send you reset link with instructions
                        to your email right away.
                    </Paragraph>
                    
                    <Fieldset gap="$4" horizontal>
                        <Label justifyContent="flex-end" htmlFor="name">
                            Email
                        </Label>
                        <Input flex={1}  />
                    </Fieldset>
                        <XStack gap="$4" alignSelf="flex-end" marginTop="$4">
                            <Button themeInverse aria-label="Close" onPress={() => setModalVisible(!modalVisible)} width="50%">
                            SEND
                    </Button>
                            <Button theme="active" aria-label="Close" onPress={() => setModalVisible(!modalVisible)} width="50%">
                            CLOSE
                    </Button>
                    </XStack>
                    </YStack>
                </View>
            </View>
           
        </Modal>
    )
}

export default InputModal

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})