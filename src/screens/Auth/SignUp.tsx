import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomHeader from "../../components/global/CustomHeader";
import HeaderLeft from "../../components/global/HeaderLeft";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

function SignUp({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState<any>({
    fullName: '',
    contact: '',
    password: ''
  })
  const [touched, setTouched] = useState({
    fullName: false,
    contact: false,
    password: false
  })
  const [errors, setErrors] = useState({
    fullName: '',
    contact: '',
    password: ''
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  function handleSignIn() {
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      navigation.navigate('Verification', { contact: values.contact })
    }, 2000)
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
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <CustomButton
        type="transparent"
        title="Sign In"
        onPress={() => { navigation.navigate('Sign In') }}
        disabled={false}
        buttonStyle={{ marginVertical: 0 }}
        titleStyle={{ color: colors.red }}
        submitting={false} />,
      header: CustomHeader
    })
  }, [])

  return <SafeAreaView style={styles.container}>
    <CustomForm
      title="Hello"
      subtitle="Let’s Learn More About Plants"
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        { label: 'Full Name', placeholder: 'Enter your full name', required: true, disabled: false, fieldName: 'fullName' },
        { label: 'Contact', placeholder: 'Enter contact', required: true, disabled: false, fieldName: 'contact' },
        { label: 'Password', placeholder: 'Enter your password', required: true, disabled: false, props: { secureTextEntry: true }, fieldName: 'password' },
      ]}
      errors={errors}
      touched={touched}
      setTouched={setTouched}
      submitAction={{
        title: 'Sign Up',
        submitting: submitting,
        type: 'primary',
        disabled: submitting || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSignIn
      }}
    >
      <Text style={styles.disclaimerText}>By clicking Sign Up, you agree to our <Text style={styles.link}>Terms & Conditions</Text> and that you have read our <Text style={styles.link}>Privacy Policy.</Text></Text>
    </CustomForm>

  </SafeAreaView>
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  disclaimerText: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.darkGray,
    marginTop: 10
  },
  link: {
    color: colors.primary
  }
})