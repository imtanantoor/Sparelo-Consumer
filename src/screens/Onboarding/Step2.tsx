import { useDispatch } from "react-redux";
import Step2SVG from "../../assets/Step2Svg";
import StaticPage from "../../components/organism/StaticPage";
import globalConfig from "../../store/slices/globalConfigSlice";

function Step2({ navigation }: any): JSX.Element {
  const dispatch = useDispatch()
  function handleGetStarted() {
    navigation.navigate('Mode Selection')
    dispatch(globalConfig.actions.hideOnboarding())
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