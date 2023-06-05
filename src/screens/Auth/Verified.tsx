import VerifySuccessSVG from "../../assets/VerifySuccessSVG";
import StaticPage from "../../components/organism/StaticPage";

function Verified({ navigation }: any): JSX.Element {

  return <StaticPage
    SVG={() => <VerifySuccessSVG style={{ alignSelf: 'center' }} />}
    title="Verification Successful"
    subTitle="Your mobile contact number has successfully verified. You can proceed to you Home."
    type="general"
    mainButtonPress={() => {
      navigation.navigate('MainTabs', { screen: 'Home' })
    }}
    showIndicators={false}
    mainBtnTitle="Proceed"
  />
}
export default Verified