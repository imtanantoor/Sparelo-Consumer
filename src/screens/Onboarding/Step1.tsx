import Step1SVG from "../../assets/Step1Svg";
import StaticPage from "../../components/organism/StaticPage";

function Step1({ navigation }: any): JSX.Element {
  function handleSkip() {
    console.log('Skip onboarding')
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