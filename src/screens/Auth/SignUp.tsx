import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomHeader from "../../components/global/CustomHeader";
import HeaderLeft from "../../components/global/HeaderLeft";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import auth from '@react-native-firebase/auth';
import constants from "../../utils/constants";
import ToastService from "../../Services/ToastService";


function SignUp({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState<any>({
    name: '',
    contact: '',
    password: ''
  })
  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    password: false
  })
  const [errors, setErrors] = useState({
    name: '',
    contact: '',
    password: ''
  })
  const [confirm, setConfirm] = useState<any>(null);
  const [submitting, setSubmitting] = useState<boolean>(false)

  async function handleSignUp() {
    setSubmitting(true)
    try {
      const confirmation = await auth().signInWithPhoneNumber(values.contact, true);
      setConfirm(confirm)
      navigation.navigate("Verification", {
        confirmation,
        contact: values.contact,
        signUpValues: { ...values }
      })

      setSubmitting(false)
    } catch (error: any) {
      ToastService.error('Sign Up ', error?.message)
      setSubmitting(false)
    }
  }

  function handleBlur(fieldName: string, required: boolean) {
    return () => {
      // let phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,13})([+(\d]{1})/gm;
      let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;


      if (fieldName === 'contact' && !phoneNumberRegex.test(values.contact)) {
        return setErrors({ ...errors, contact: `${fieldName} is invalid!` })
      } else {
        setErrors({ ...errors, contact: '' })
      }

      if (fieldName === 'password' && values[fieldName].length < 8) {
        return setErrors({ ...errors, [fieldName]: `${fieldName} must be at least 8 characters long` })
      }

      if (values[fieldName] === '' && required) {
        return setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      }

      setErrors({ ...errors, [fieldName]: '' })
    }
  }

  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    // let phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,13})([+(\d]{1})/gm;
    let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;

    if (fieldName === 'contact' && !phoneNumberRegex.test(value)) {
      return setErrors({ ...errors, contact: `${fieldName} is invalid!` })
    }

    if (fieldName === 'password' && value.length < 8) {
      return setErrors({ ...errors, [fieldName]: `${fieldName} must be at least 8 characters long` })
    }

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
        {
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true, disabled: false, fieldName: 'name',
          value: values.name
        },
        {
          label: 'Contact',
          placeholder: 'Enter contact',
          required: true, disabled: false, fieldName: 'contact',
          props: {
            keyboardType: 'number-pad'
          },
          value: values.contact
        },
        {
          label: 'Password',
          placeholder: 'Enter your password',
          required: true, disabled: false,
          props: { secureTextEntry: true }, fieldName: 'password',
          value: values.password
        },
      ]}
      errors={errors}
      touched={touched}
      setTouched={setTouched}
      submitAction={{
        title: 'Sign Up',
        submitting: submitting,
        type: 'primary',
        disabled: submitting || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSignUp
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