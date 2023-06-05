import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewParts from '../screens/PartsTopTabs/NewParts';
import colors from '../constants/colors';
import font from '../constants/fonts';
import AllParts from '../screens/PartsTopTabs/AllParts';
import OldParts from '../screens/PartsTopTabs/OldParts';

const Tab = createMaterialTopTabNavigator();

function QuotationsTabs({ navigation, route }: any) {
  return (
    <Tab.Navigator screenOptions={{
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
      <Tab.Screen name="All Parts" initialParams={{ ...route.params }} component={AllParts} />
      <Tab.Screen name="New Parts" initialParams={{ ...route.params }} component={NewParts} />
      <Tab.Screen name="Old Parts" initialParams={{ ...route.params }} component={OldParts} />
    </Tab.Navigator>
  );
}

export default QuotationsTabs