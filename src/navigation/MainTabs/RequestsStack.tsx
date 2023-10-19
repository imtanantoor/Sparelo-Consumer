import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RequestsList from "../../screens/MainTab/Requests/RequestsList"
import QuotationsTabs from "../QuotationsTabs"
import RequestSummary from "../../screens/MainTab/Requests/RequestSummary"
import font from "../../constants/fonts"
import SendQuotation from "../../screens/MainTab/Home/SendQuotation"
import RequestDetail from "../../screens/MainTab/Requests/RequestDetail"
import BidDetail from "../../screens/MainTab/Requests/BidDetail"
import HeaderBack from "../../components/molecular/HeaderBack"
import { useNavigation } from "@react-navigation/native"
import constants from "../../utils/constants"

const Stack = createNativeStackNavigator()
function CustomHeaderLeft(props: any): JSX.Element {
  const navigation = useNavigation()

  return <HeaderBack onPress={navigation.goBack} />
}


function RequestsStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      // color: '#3C3A35',
      ...constants.headerTitleStyle,
      // fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold
    },
    headerBackVisible: false,
    headerShadowVisible: false
  }} initialRouteName="Requests" >
    <Stack.Screen name="Requests" component={RequestsList} />
    <Stack.Screen name="Request Detail" options={{
      headerLeft: CustomHeaderLeft
    }} component={RequestDetail} />
    <Stack.Screen name="Bid Detail" options={{
      headerLeft: CustomHeaderLeft
    }} component={BidDetail} />
    <Stack.Screen name="Send Quotation" component={SendQuotation} />
    <Stack.Screen name="Quotations" component={QuotationsTabs} />
  </Stack.Navigator>
}

export default RequestsStack