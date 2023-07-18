import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/global/CustomButton";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import { connect } from "react-redux";
import actions from "../../store/actions";
import authSlice from "../../store/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import ToastService from "../../Services/ToastService";

interface ResetPasswordProps {
  navigation: any
  route: any
  changingPassword: boolean;
  changingPasswordError: boolean;
  changingPasswordSuccess: boolean;
  changePassword: (data: ChangePasswordModel) => void
  resetChangingPasswordState: () => void
  logout: () => void
}


function ResetPassword({ navigation, route, changingPassword, changingPasswordError, changingPasswordSuccess, resetChangingPasswordState, logout, changePassword }: ResetPasswordProps): JSX.Element {
  const { signUpValues } = route?.params;
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

  function handleSubmit() {
    if (values.password !== values.resetPassword) {
      return setErrors({ ...errors, resetPassword: 'Passwords do not match' })
    }

    const data: ChangePasswordModel = {
      contact: signUpValues.contact,
      newPassword: values.password
    }

    changePassword(data)
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
        disabled={false}
        buttonStyle={{ marginVertical: 0 }}
        titleStyle={{ color: 'transparent' }}
        submitting={false} />
    })
  }, [])

  useEffect(() => {
    if (changingPasswordSuccess) {
      navigation.popToTop()
      ToastService.success('Reset Password', 'Password reset successfully')
    }
  }, [changingPasswordSuccess])

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
        submitting: changingPassword,
        type: 'primary',
        disabled: changingPassword || Object.values(errors).some((value) => value !== '') || Object.values(values).some((value) => value == ''),
        onPress: handleSubmit
      }}
      fieldsContainerStyle={{ marginTop: 20, marginBottom: 0 }}
    />

  </SafeAreaView>
}

const mapStateTopProps = (state: any) => ({
  changingPassword: state.Auth.changingPassword,
  changingPasswordSuccess: state.Auth.changingPasswordSuccess,
  changingPasswordError: state.Auth.changingPasswordError,
  user: state.Auth.user
})

const mapDispatchToProps = {
  changePassword: actions.changePassword,
  resetChangingPasswordState: authSlice.actions.resetChangingPasswordState,
  logout: authSlice.actions.logout,
}

export default connect(mapStateTopProps, mapDispatchToProps)(ResetPassword)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})