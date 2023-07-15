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
import ToastService from "../../Services/ToastService";
import constants from "../../utils/constants";
import actions from "../../store/actions";
import { connect } from "react-redux";

interface SignInProps {
  navigation: any
  submitting: boolean;
  loginSuccess: boolean;
  loginError: boolean;
  login: (data: LoginPayloadModel) => void
}

function SignIn({ navigation, submitting, loginSuccess, loginError, login }: SignInProps): JSX.Element {
  const [values, setValues] = useState<LoginPayloadModel>({
    contact: '',
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

  function handleSignIn() {
    login(values)
  }

  function handleBlur(fieldName: string, required: boolean) {
    type ObjectKey = keyof typeof values
    const myKey = fieldName as ObjectKey

    return () => {
      // let phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,13})([+(\d]{1})/gm;
      let phoneNumberRegex = /^(?:\+92|92|0)\d{10}$/;

      if (fieldName === 'contact' && !phoneNumberRegex.test(values.contact)) {
        return setErrors({ ...errors, contact: `${fieldName} is invalid!` })
      }

      // if (fieldName === 'password' && values[fieldName].length < 8) {
      //   return setErrors({ ...errors, [fieldName]: `${fieldName} must be at least 8 characters long` })
      // }

      if (values[myKey] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      } else {
        setErrors({ ...errors, [fieldName]: '' })
      }
    }
  }

  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    // let phoneNumberRegex = /([+(\d]{1})(([\d+() -.]){5,13})([+(\d]{1})/gm;
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

  return <SafeAreaView style={styles.container}>
    <CustomForm
      title="Sign In"
      subtitle="Enter to continue and explore within"
      handleBlur={(fieldName, required) => handleBlur(fieldName, required)}
      handleChange={(text, fieldName) => handleChange(text, fieldName)}
      fields={[
        {
          label: 'Contact',
          placeholder: 'Enter contact',
          required: true, disabled: false,
          fieldName: 'contact',
          value: values.contact,
          props: {
            keyboardType: 'number-pad'
          }
        },
        {
          label: 'Password', placeholder: 'Enter your password', required: true, disabled: false, fieldName: 'password', value: values.password,
          props: {
            secureTextEntry: true,
            onSubmitEditing: handleSignIn
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

const mapStateToProps = (state: any) => ({
  submitting: state.Auth.loggingIn,
  loginSuccess: state.Auth.loginSuccess,
  loginError: state.Auth.loginError,
})

const mapDispatchToProps = {
  login: actions.loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
    paddingVertical: 20,
    backgroundColor: colors.white
  },
})