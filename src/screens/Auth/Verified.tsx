import { connect } from "react-redux";
import VerifySuccessSVG from "../../assets/VerifySuccessSVG";
import StaticPage from "../../components/organism/StaticPage";
import actions from "../../store/actions";
import auth from '@react-native-firebase/auth';
import { useEffect } from "react";
import authSlice from "../../store/slices/authSlice";
import ToastService from "../../Services/ToastService";


interface VerifiedStateProps {
  registering: boolean;
  registerError: boolean;
  registerSuccess: boolean;
  mode: 'buyer' | 'vendor';
  navigation: any
  route: any
  signUpUser: (data: SignUpUserModel) => void
  clearRegisteringState: () => void
}

function Verified({ navigation, route, registering, registerError, registerSuccess, signUpUser, clearRegisteringState }: VerifiedStateProps): JSX.Element {
  const { signUpValues, isForget } = route.params;

  function handleSignUp() {
    if (isForget) {
      return navigation.navigate('Reset Password', { signUpValues })
    }
    const data: SignUpUserModel = {
      ...signUpValues,
      contact: signUpValues.contact.replace('+92', '0'),
      firebaseUid: auth().currentUser?.uid
    }
    signUpUser(data)
  }

  useEffect(() => {
    if (registerSuccess) {
      navigation.popToTop()
      ToastService.success('Sign up', 'user signed up successfully')
    }

    if (registerError) {
      clearRegisteringState()
    }

  }, [registerSuccess, registerError])

  return <StaticPage
    SVG={() => <VerifySuccessSVG style={{ alignSelf: 'center' }} />}
    title="Verification Successful"
    subTitle="Your mobile contact number has successfully verified. You can proceed to you Home."
    type="general"
    mainButtonPress={handleSignUp}
    showIndicators={false}
    mainBtnTitle="Proceed"
    mainButtonDisabled={registering}
    mainButtonSubmitting={registering}
  />
}

const mapStateToProps = (state: any) => ({
  registering: state.Auth.registering,
  registerError: state.Auth.registerError,
  registerSuccess: state.Auth.registerSuccess,
  mode: state.Auth.mode
})

const mapDispatchToProps = {
  signUpUser: actions.signUpUser,
  clearRegisteringState: authSlice.actions.clearRegisteringState
}

export default connect(mapStateToProps, mapDispatchToProps)(Verified)