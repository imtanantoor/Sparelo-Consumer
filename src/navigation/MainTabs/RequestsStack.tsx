import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RequestsList from "../../screens/MainTab/Requests/RequestsList"
import QuotationsTabs from "../QuotationsTabs"
import RequestSummary from "../../screens/MainTab/Requests/RequestSummary"
import font from "../../constants/fonts"
import SendQuotation from "../../screens/MainTab/Home/SendQuotation"
import RequestDetail from "../../screens/MainTab/Requests/RequestDetail"

const Stack = createNativeStackNavigator()

function RequestsStack(): JSX.Element {
  return <Stack.Navigator screenOptions={{
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#3C3A35',
      fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold
    },
    headerBackVisible: false,
  }} initialRouteName="Requests" >
    <Stack.Screen name="Requests" component={RequestsList} />
    <Stack.Screen name="Request Detail" options={{ headerBackVisible: true }} component={RequestDetail} />
    <Stack.Screen name="Send Quotation" component={SendQuotation} />
    <Stack.Screen name="Quotations" component={QuotationsTabs} />
  </Stack.Navigator>
}

export default RequestsStack