import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../../../constants/colors';
import font from '../../../constants/fonts';
import NewParts from '../../../screens/PartsTopTabs/NewParts';
import OldParts from '../../../screens/PartsTopTabs/OldParts';

const Tab = createMaterialTopTabNavigator();

function ResultBidsTabs({ navigation, route }: any) {
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
      <Tab.Screen name="New" initialParams={{ ...route.params }} component={NewParts} />
      <Tab.Screen name="Used" initialParams={{ ...route.params }} component={OldParts} />
    </Tab.Navigator>
  );
}

export default ResultBidsTabs