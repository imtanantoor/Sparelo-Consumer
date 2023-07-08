import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import font from '../../constants/fonts';
import colors from '../../constants/colors';
import DummyScreen from '../../screens/DummyScreen';

const Tab = createMaterialTopTabNavigator();

function MyOffersTopTabs({ navigation, route }: any) {
  return (
    <Tab.Navigator screenOptions={{
      tabBarContentContainerStyle: {
        paddingTop: 20,
        justifyContent: 'center',
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
      <Tab.Screen name="Approved Orders" component={DummyScreen} />
      <Tab.Screen name="Pending Quotations" component={DummyScreen} />
    </Tab.Navigator>
  );
}

export default MyOffersTopTabs