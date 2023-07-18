import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import helpers from "../../utils/helpers";
import auth from '@react-native-firebase/auth';
import ToastService from "../../Services/ToastService";


function ForgotPassword({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState<any>({
    contact: '',
  })
  const [touched, setTouched] = useState({
    contact: false,
  })
  const [errors, setErrors] = useState({
    contact: '',
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<any>(null)

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const confirmation = await auth().signInWithPhoneNumber(helpers.handleOTPNumber(values.contact), true);
      setConfirm(confirm)
      navigation.navigate("Verification", {
        confirmation,
        contact: helpers.handleOTPNumber(values.contact),
        signUpValues: { ...values },
        isForget: true
      })

      setSubmitting(false)
    } catch (error: any) {
      ToastService.error('Sign Up ', error?.message)
      setSubmitting(false)
    }
  }

  function handleBlur(fieldName: string, required: boolean) {
    return () => {
      let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;

      if (fieldName === 'contact' && !phoneNumberRegex.test(values.contact)) {
        return setErrors({ ...errors, contact: `${fieldName} is invalid!` })
      }
      if (values[fieldName] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      } else {
        setErrors({ ...errors, [fieldName]: '' })
      }
    }
  }
  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;

    if (fieldName === 'contact' && !phoneNumberRegex.test(value)) {
      return setErrors({ ...errors, contact: `${fieldName} is invalid!` })
    } else {
      setErrors({ ...errors, [fieldName]: '' })
    }
    if (value !== '')
      setErrors({ ...errors, [fieldName]: '' })
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: '',
      headerTransparent: true,
      headerBackVisible: false,
      headerRight: () => <CustomButton
        type="transparent"
        title="Sign Up"
        onPress={() => { }}
        disabled={true}
        buttonStyle={{ marginVertical: 0 }}
        titleStyle={{ color: 'transparent' }}
        submitting={false} />
    })
  }, [])

  return <SafeAreaView style={styles.container}>
    <CustomForm
      title="Forgot Password"
      subtitle="Enter your registered contact below to receive your password reset link."
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        {
          label: 'Contact',
          placeholder: 'Enter contact',
          required: true,
          disabled: false,
          fieldName: 'contact',
          props: {
            onSubmitEditing: handleSubmit,
            keyboardType: 'phone-pad'
          }
        },
      ]}
      errors={errors}
      touched={touched}
      setTouched={setTouched}
      submitAction={{
        title: 'Next',
        submitting: submitting,
        type: 'primary',
        disabled: submitting || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSubmit
      }}
      fieldsContainerStyle={{ marginTop: 20, marginBottom: 0 }}
    />

  </SafeAreaView>
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})