import Step2SVG from "../../assets/Step2Svg";
import StaticPage from "../../components/organism/StaticPage";

function Step2({ navigation }: any): JSX.Element {
  function handleGetStarted() {
    navigation.navigate('Auth', { screen: 'Sign In' })
  }
  return <StaticPage
    SVG={() => <Step2SVG style={{ alignSelf: 'center' }} />}
    title="Get best price bidding"
    subTitle="List your requirements and get best price bidding form the dealers."
    showIndicators
    step1Type="Inactive"
    step2Type="Active"
    type='general'
    mainButtonPress={handleGetStarted}
    mainBtnTitle="Get Started"
  />
}

export default Step2