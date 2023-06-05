import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ResetSuccessSVG from "../../assets/ResetSuccessSVG";
import StaticPage from "../../components/organism/StaticPage";

function ResetSuccess({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  function handleSignIn() {
    navigation.navigate('Sign In')
  }
  return <StaticPage
    title="Password Reset Successful"
    subTitle="You have successfully reset your password. Please continue to Sign in."
    SVG={() => <ResetSuccessSVG style={{ alignSelf: 'center' }} />}
    type="general"
    mainButtonPress={handleSignIn}
    showIndicators={false}
    mainBtnTitle="Sign In"
  />
}

export default ResetSuccess