import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Fragment, createRef, useEffect, useLayoutEffect, useRef, useState } from "react"
import { StyleSheet, SafeAreaView, Platform, Text, ScrollView, View, TouchableOpacity, TextInput } from "react-native"
import CodeBox from "../../components/atomic/CodeBox"
import CustomButton from "../../components/global/CustomButton"
import colors from "../../constants/colors"
import font from "../../constants/fonts"
import auth from '@react-native-firebase/auth';
import ToastService from "../../Services/ToastService"


function CodeRefresh({ onResend, reset }: any): JSX.Element {
  const [seconds, setSeconds] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  useEffect(() => {
    let seconds = 60
    const interval = setInterval(() => {
      if (seconds > 0) {
        seconds = seconds - 1
        setSeconds(seconds)
        if (buttonDisabled == false)
          setButtonDisabled(true)
      } else {
        seconds = 60
        setSeconds(60)
        setButtonDisabled(false)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [reset])

  function handleResend() {
    onResend()
  }

  return <Fragment>
    <Text style={styles.expiresText}>Code expires in: <Text style={{ color: colors.red }}>{seconds}</Text></Text>
    <View style={styles.codeRefreshContainer}>
      <Text style={styles.expiresText}>Didn’t receive code?
      </Text>
      <TouchableOpacity disabled={buttonDisabled} onPress={handleResend} style={styles.resendButton}>
        <Text style={styles.resendCode}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  </Fragment>
}

function Verification({ navigation, route }: NativeStackScreenProps<any>): JSX.Element {
  const codeLength = 6
  const [code, setCode] = useState<string>('')
  const { confirmation, contact, signUpValues }: any = route?.params;
  const [submitting, setSubmitting] = useState(false)
  const [confirm, setConfirm] = useState(confirmation)
  const inputRef: any = createRef<any>()
  useLayoutEffect(() => {

    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: '',
      headerTransparent: true,
      headerBackVisible: false,
      headerRight: () => <CustomButton
        type="transparent"
        title=""
        onPress={() => { }}
        disabled={true}
        buttonStyle={{ marginVertical: 0 }}
        titleStyle={{ color: 'transparent' }}
        submitting={false} />
    })
  }, [])

  function handleCodeChange(text: string, index: number) {
    let nexRefInputRef = inputRef?.current?.[`ref${index + 1}`]

    if (text === '') return setCode(code.replace(code[index], ''))
    if (text.length == 1) {
      setCode(code + text)
    }
    if (nexRefInputRef && index !== 5) {
      nexRefInputRef?.focus()
    }
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const result = await confirm.confirm(code);
      setSubmitting(false)
      navigation.navigate('Verified', { signUpValues })
    } catch (error: any) {
      ToastService.error('Verification Error', error?.message ? error.message : 'Verification failed')
      setSubmitting(false)
    }

  }

  async function resendCode() {
    setCode('')
    try {
      const confirmation = await auth().signInWithPhoneNumber(contact, true)
      setConfirm(confirmation)
    } catch (error: any) {
      ToastService.error('OTP Error', error?.nativeErrorMessage ? error.nativeErrorMessage : error?.message ? error.message : '')
    }
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subTitle}>Please enter verification code, we sent
        it to number {route?.params?.contact}
      </Text>
      <View style={styles.fieldsContainer}>
        <View style={styles.boxesContainer}>
          {
            Array(codeLength)
              .fill(0)
              .map((item: any, index: number) => (
                <CodeBox
                  key={index + 1}
                  value={code[index]}
                  maxLength={1}
                  reference={(data: React.LegacyRef<TextInput>) => {
                    inputRef.current = { ...inputRef.current, [`ref${index}`]: data }
                  }}
                  returnKeyType={index !== 5 ? 'next' : 'done'}
                  blurOnSubmit={index == 5}
                  onChangeText={(text: string) => handleCodeChange(text, index)}
                />
              ))
          }
        </View>
        <CodeRefresh
          onResend={resendCode}
          reset={code.length === 0}
        />
      </View>
      <CustomButton
        type={'primary'}
        title={'Verify'}
        disabled={code.length < 6}
        submitting={submitting}
        onPress={handleSubmit}
      />
    </ScrollView>
  </SafeAreaView>
}

export default Verification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20
  },
  fieldsContainer: {
    marginVertical: 20,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 37
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.hero,
    color: colors.textPrimary,
    marginVertical: 11
  },
  subTitle: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.subtitle,
    color: colors.textSecondary
  },
  expiresText: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
    color: '#636C84',
  },
  codeRefreshContainer: { alignItems: 'center', flexDirection: 'row' },
  resendCode: {
    color: colors.primary,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
  },
  resendButton: {
    padding: 5
  }
})