import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import font from '../../constants/fonts';
import colors from '../../constants/colors';
import DummyScreen from '../../screens/DummyScreen';
import CancelledQuotationsTab from '../../screens/MainTab/Home/MyOffersTopTabs/CancelledQuotationsTab';
import ApprovedQuotationsTab from '../../screens/MainTab/Home/MyOffersTopTabs/ApprovedQuotationsTab';
import PendingQuotationsTab from '../../screens/MainTab/Home/MyOffersTopTabs/PendingQuotationsTab';

const Tab = createMaterialTopTabNavigator();

function MyOffersTopTabs({ navigation, route }: any) {
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
      <Tab.Screen name="Cancelled Quotations" component={CancelledQuotationsTab} />
      <Tab.Screen name="Approved Quotations" component={ApprovedQuotationsTab} />
      <Tab.Screen name="Pending Quotations" component={PendingQuotationsTab} />
    </Tab.Navigator>
  );
}

export default MyOffersTopTabs