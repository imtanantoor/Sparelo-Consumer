import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import font from '../../constants/fonts';
import colors from '../../constants/colors';
import OrdersHistoryList from '../../components/organism/OrdersHistoryList';
import dataConstants from '../../constants/dataConstants';
import CancelledOrders from '../../screens/OrdersHistoryTopTabs/CancelledOrders';
import ApprovedOrders from '../../screens/OrdersHistoryTopTabs/ApprovedOrders';
import PendingOrders from '../../screens/OrdersHistoryTopTabs/PendingOrders';

const Tab = createMaterialTopTabNavigator();

function OrdersHistoryTopTabs({ navigation, route }: any) {
  return (
    <Tab.Navigator screenOptions={{
      tabBarContentContainerStyle: {
        paddingTop: 20,
        justifyContent: 'center',
        backgroundColor: colors.white,
        alignItems: 'center'
      },
      tabBarActiveTintColor: colors.bannerText,
      tabBarInactiveTintColor: '#262626',
      tabBarIndicatorStyle: {
        backgroundColor: colors.bannerText,
      },
      tabBarLabelStyle: {
        fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
        textTransform: 'capitalize',
        fontSize: 12
      }
    }}>
      <Tab.Screen name="Cancelled Orders" component={CancelledOrders} />
      <Tab.Screen name="Approved Orders" component={ApprovedOrders} />
      <Tab.Screen name="Pending Orders" component={PendingOrders} />
    </Tab.Navigator>
  );
}

export default OrdersHistoryTopTabs