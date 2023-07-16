import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import CustomForm from "../../components/organism/CustomForm";
import colors from "../../constants/colors";
import { connect } from "react-redux";
import actions from "../../store/actions";
import authSlice from "../../store/slices/authSlice";

interface ChangePasswordProps {
  navigation: NativeStackScreenProps<any>
  changingPassword: boolean;
  changingPasswordError: boolean;
  changingPasswordSuccess: boolean;
  user: UserModel;
  changePassword: (data: ChangePasswordModel) => void
  resetChangingPasswordState: () => void
  logout: () => void
}

function ChangePassword({ navigation, user, changingPassword, changingPasswordError, changingPasswordSuccess, changePassword, resetChangingPasswordState, logout }: ChangePasswordProps): JSX.Element {
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
    if (values.password !== values.resetPassword) {
      return setErrors({ ...errors, resetPassword: 'Passwords do not match' })
    }

    const data: ChangePasswordModel = {
      contact: user.contact,
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

  useEffect(() => {
    if (changingPasswordSuccess)
      logout()
  }, [changingPasswordSuccess])

  return <SafeAreaView style={styles.container}>
    <CustomForm
      title="Change Password"
      subtitle="You are now able to change your password."
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        {
          label: 'Password',
          placeholder: 'Enter your new password',
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

export default connect(mapStateTopProps, mapDispatchToProps)(ChangePassword)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})