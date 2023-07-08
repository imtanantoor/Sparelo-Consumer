import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import AvailabilityIcon from "../assets/icons/AvailabilityIcon";
import CartIcon from "../assets/icons/CartIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import RequestsIcon from "../assets/icons/RequestesIcon";
import colors from "../constants/colors";
import DummyScreen from "../screens/DummyScreen";
import Home from "../screens/MainTab/Home/Home";
import HomeStack from "./MainTabs/HomeStack";
import ProfileStack from "./MainTabs/ProfileStack";
import RequestsList from "../screens/MainTab/Requests/RequestsList";
import AvailabilityTabs from "./QuotationsTabs";
import QuotationsTabs from "./QuotationsTabs";
import RequestsStack from "./MainTabs/RequestsStack";
import CartStack from "./MainTabs/CartStack";
import MyCartBottomTab from "../components/molecular/MyCartBottomTab";
import AvailabilityStack from "./MainTabs/Availability/AvailabilityStack";
import { useSelector } from "react-redux";
import MyOffersTopTabs from "./MyOffersTopTabs/MyOffersTopTabs";

const Tab = createBottomTabNavigator()

function MainTabs(): JSX.Element {
  const { mode } = useSelector((state: any) => state.Auth)

  return <Tab.Navigator
    initialRouteName={mode === 'buyer' ? 'Home' : 'Requests'}
    screenOptions={{
      tabBarActiveTintColor: colors.textActiveTintColor,
      tabBarInactiveTintColor: colors.textInactiveTintColor,
      headerShown: false
    }}
  >
    {mode === 'buyer' && <Tab.Screen name="Home" component={HomeStack}
      options={{
        tabBarLabelStyle: { marginBottom: 5 },
        tabBarIcon({ focused, color }) {
          return <HomeIcon stroke={focused ? colors.activeTabIconColor : color} />
        },
      }} />}
    <Tab.Screen name="Requests" component={RequestsStack} options={{
      tabBarLabelStyle: { marginBottom: 5 },
      tabBarIcon({ focused, color }) {
        return <RequestsIcon stroke={focused ? colors.activeTabIconColor : color} />
      },
    }} />
    <Tab.Screen name="Availability" component={AvailabilityStack} options={{
      tabBarLabelStyle: { marginBottom: 5 },
      tabBarIcon({ focused, color }) {
        return <AvailabilityIcon stroke={focused ? colors.activeTabIconColor : color} />
      },
    }} />
    {mode === 'buyer' ? <Tab.Screen name="My Cart" component={CartStack} options={{
      tabBarLabelStyle: { marginBottom: 5 },
      tabBarIcon({ focused, color }) {
        return <MyCartBottomTab focused={focused} color={color} />
      },
    }} /> : <Tab.Screen name="My Offers"
      component={MyOffersTopTabs}
      options={{
        tabBarLabelStyle: { marginBottom: 5 },
        tabBarIcon({ focused, color }) {
          return <MyCartBottomTab focused={focused} color={color} />
        },
      }}
    />}
    <Tab.Screen name="Profile" component={ProfileStack} options={{
      tabBarLabelStyle: { marginBottom: 5 },
      tabBarIcon({ focused, color }) {
        return <ProfileIcon stroke={focused ? colors.activeTabIconColor : color} />
      },
    }} />
  </Tab.Navigator>
}

export default MainTabs