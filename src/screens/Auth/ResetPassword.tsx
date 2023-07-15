import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";


function ResetPassword({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState<any>({
    password: '',
    resetPassword: ''
  })
  const [touched, setTouched] = useState({
    password: false,
    resetPassword: false
  })
  const [errors, setErrors] = useState({
    password: '',
    resetPassword: ''
  })
  const [submitting, setSubmitting] = useState<boolean>(false)

  function handleSubmit() {
    // setSubmitting(true)
    // setTimeout(() => {
    //   setSubmitting(false)
    //   navigation.navigate('Reset Success')
    // }, 1000)
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

    if (value === '') {
      return setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
    }

    if (value.length < 8) {
      return setErrors({ ...errors, [fieldName]: `${fieldName} must be at least 8 characters long` })
    }

    if (fieldName === 'resetPassword') {
      return values.password !== value ? setErrors({ ...errors, [fieldName]: 'Passwords do not match' }) : setErrors({ ...errors, [fieldName]: '' })
    }

    if (value !== '')
      return setErrors({ ...errors, [fieldName]: '' })
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
      title="Reset Password"
      subtitle="You are now able to reset your password to recover your account. "
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        {
          label: 'Password',
          placeholder: 'Enter your password',
          required: true,
          disabled: false,
          fieldName: 'password',
          value: values.password,
          props: {
            secureTextEntry: true
          }
        },
        {
          label: 'Verify password',
          value: values.resetPassword,
          placeholder: 'Re-enter your password',
          required: true,
          disabled: false,
          fieldName: 'resetPassword',
          props: {
            secureTextEntry: true
          }
        },
      ]}
      errors={errors}
      touched={touched}
      setTouched={setTouched}
      submitAction={{
        title: 'Send Password',
        submitting: submitting,
        type: 'primary',
        disabled: submitting || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSubmit
      }}
      fieldsContainerStyle={{ marginTop: 20, marginBottom: 0 }}
    />

  </SafeAreaView>
}

export default ResetPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})