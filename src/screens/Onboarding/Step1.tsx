import { useDispatch } from "react-redux";
import Step1SVG from "../../assets/Step1Svg";
import StaticPage from "../../components/organism/StaticPage";
import globalConfig from "../../store/slices/globalConfigSlice";

function Step1({ navigation }: any): JSX.Element {
  const dispatch = useDispatch()
  function handleSkip() {
    navigation.navigate('Mode Selection')
    dispatch(globalConfig.actions.hideOnboarding())
  }
  function handleNext() {
    navigation.navigate('step2')
  }
  return <StaticPage
    SVG={() => <Step1SVG style={{ alignSelf: 'center' }} />}
    title={'Search at your fingertips'}
    subTitle="No roaming around the market. your desired spare parts in your finger tips now."
    type="onboarding"
    mainButtonPress={handleSkip}
    secondaryButtonPress={handleNext}
    showIndicators
    mainBtnTitle=""
  />
}

export default Step1