import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View, } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomHeader from "../../components/global/CustomHeader";
import HeaderLeft from "../../components/global/HeaderLeft";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import auth from '@react-native-firebase/auth';

function SignIn({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState<any>({
    contact: '+92',
    password: ''
  })
  const [touched, setTouched] = useState({
    contact: false,
    password: false
  })
  const [errors, setErrors] = useState({
    contact: '',
    password: ''
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [confirm, setConfirm] = useState(null)

  async function handleSignIn() {
    setSubmitting(true)
    try {
      const confirmation = await auth().signInWithPhoneNumber(values.contact);
      setConfirm(confirm)
      navigation.navigate("Verification", { confirmation, contact: values.contact })

      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }
  function handleBlur(fieldName: string, required: boolean) {
    return () => {
      if (values[fieldName] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      }
    }
  }
  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    if (value !== '')
      setErrors({ ...errors, [fieldName]: '' })
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: '',
      // headerTransparent: true,
      headerBackVisible: false,
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <CustomButton
        type="transparent"
        title="Sign Up"
        onPress={() => { navigation.navigate('Sign Up') }}
        disabled={false}
        buttonStyle={{ marginVertical: 0 }}
        titleStyle={{ color: colors.red }}
        submitting={false} />,
      header: CustomHeader
    })
  }, [])

  function onAuthStateChanged(user: any) {
    if (user) {
      console.log({ user })
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <SafeAreaView style={styles.container}>
    <CustomForm
      title="Sign In"
      subtitle="Enter to continue and explore within"
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        { label: 'Contact', placeholder: 'Enter contact', required: true, disabled: false, fieldName: 'contact', value: values.contact },
        {
          label: 'Password', placeholder: 'Enter your password', required: true, disabled: false, fieldName: 'password', value: values.password,
          props: {
            secureTextEntry: true
          }
        },
      ]}
      errors={errors}
      touched={touched}
      setTouched={setTouched}
      submitAction={{
        title: 'Sign In',
        submitting: submitting,
        type: 'primary',
        disabled: submitting || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSignIn
      }}
      fieldsContainerStyle={{ marginTop: 20, marginBottom: 0 }}
      secondaryAction={{
        title: 'Forgot Password?',
        type: 'transparent',
        submitting: false,
        disabled: false,
        titleStyle: { fontSize: font.sizes.normal, color: colors.red },
        buttonStyle: { marginVertical: 0, padding: 0, paddingBottom: 20 },
        onPress: () => {
          navigation.navigate('Forgot Password')
        }
      }}
    />

  </SafeAreaView>
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})