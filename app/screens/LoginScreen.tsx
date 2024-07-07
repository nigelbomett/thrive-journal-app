
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { XStack } from 'tamagui'
import { Unspaced } from 'tamagui'
import { Adapt, Dialog, Fieldset, Input, Label, Sheet, Spinner } from 'tamagui'
import { SizableText } from 'tamagui'
import { Button, ListItem, Separator, YGroup } from 'tamagui'
import { Form, View, YStack } from 'tamagui'
import CustomModal from '../components/AlertModal'
import InputModal from '../components/InputModal'

const LoginScreen = () => {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        if (status === 'submitting') {
            const timer = setTimeout(() => setStatus('off'), 2000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [status])

  return (
      <View style={styles.container}>
          <YStack
              gap="$4">
              <Form
                  onSubmit={() => setStatus('submitting')
                  }
                  gap="$8"
              >
                  <YStack>
                      <YGroup separator={<Separator />}
                          marginTop="$20"
                      >
                          <YGroup.Item>
                              <ListItem size="$2"><Input size="$5" borderWidth={0} minWidth={280} placeholder="Email" /></ListItem>
                          </YGroup.Item>
                          <YGroup.Item>
                              <ListItem size="$2"><Input size="$5" borderWidth={0} minWidth={280} placeholder="Password" /></ListItem>
                          </YGroup.Item>
                      </YGroup>
                  </YStack>
                  <Form.Trigger asChild disabled={status !== 'off'}>

                      <Button icon={status === 'submitting' ? () => <Spinner /> : undefined} backgroundColor={'orange'}>
                          <SizableText fontWeight="800" size="$5">Sign In</SizableText>
                      </Button>
                  </Form.Trigger>
              </Form>
              <Button variant="outlined" size="$3" borderWidth={0} width={150} onPress={() => setModalVisible(true)}>
                  <SizableText size="$4">forgot password?</SizableText>
              </Button>
              <InputModal  modalVisible={modalVisible} setModalVisible={setModalVisible} />
          </YStack>
      </View>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex'
    },
})