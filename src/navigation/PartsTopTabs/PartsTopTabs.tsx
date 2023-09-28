import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import font from '../../constants/fonts';
import colors from '../../constants/colors';
import SearchPartsTab from '../../screens/PartsTopTabs/SearchPartsTab';

const Tab = createMaterialTopTabNavigator();

function PartsTopTabs({ navigation, route }: any) {
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
      <Tab.Screen
        name="New" initialParams={{ ...route.params, type: 'new' }} component={SearchPartsTab} />
      <Tab.Screen
        name="Used" initialParams={{ ...route.params, type: 'old' }} component={SearchPartsTab} />
    </Tab.Navigator>
  );
}

export default PartsTopTabs