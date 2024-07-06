
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { XStack } from 'tamagui'
import { Unspaced } from 'tamagui'
import { Adapt, Dialog, Fieldset, Input, Label, Sheet, Spinner } from 'tamagui'
import { SizableText } from 'tamagui'
import { Button, ListItem, Separator, YGroup } from 'tamagui'
import { Form, View, YStack } from 'tamagui'

const LoginScreen = () => {
    const [status, setStatus] = useState<'off' | 'submitting' | 'submitted'>('off')

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
              <Dialog modal>
                  <Dialog.Trigger asChild>
                      <Button variant="outlined" size="$3" borderWidth={0} width={140}>
                          forgot password?
                      </Button>
                  </Dialog.Trigger>
                  <Adapt when="sm" platform="touch">
                      <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                          <Sheet.Frame padding="$4" gap="$4">
                              <Adapt.Contents />
                          </Sheet.Frame>
                          <Sheet.Overlay
                              animation="lazy"
                              enterStyle={{ opacity: 0 }}
                              exitStyle={{ opacity: 0 }}
                          />
                      </Sheet>
                  </Adapt>
                  <Dialog.Portal >
                      <Dialog.Overlay
                          key="overlay"
                          animation="slow"
                          opacity={0.5}
                          enterStyle={{ opacity: 0 }}
                          exitStyle={{ opacity: 0 }}
                      />
                      <Dialog.Content
                          bordered
                          elevate
                          key="content"
                          animateOnly={['transform', 'opacity']}
                          animation={[
                              'quicker',
                              {
                                  opacity: {
                                      overshootClamping: true,
                                  },
                              },
                          ]}
                          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                          gap="$4"
                      >
                          <Dialog.Title>Forgot Password?</Dialog.Title>
                          <Dialog.Description>
                              Type in your email address and we'll send you reset link with instructions
                              to your email right away.
                          </Dialog.Description>
                          <Fieldset gap="$4" horizontal>
                              <Label justifyContent="flex-end" htmlFor="name">
                                  Email
                              </Label>
                              <Input flex={1} id="email" />
                          </Fieldset>
                          <XStack alignSelf="flex-end" gap="$4">

                              <Dialog.Close displayWhenAdapted asChild>
                                  <Button theme="active" aria-label="Close">
                                      SEND
                                  </Button>
                              </Dialog.Close>
                          </XStack>
                          <Unspaced>

                              <Dialog.Close>
                                  <Button theme="active" aria-label="Close">
                                      Close
                                  </Button>
                              </Dialog.Close>
                          </Unspaced>
                      </Dialog.Content>
                  </Dialog.Portal>
              </Dialog>
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