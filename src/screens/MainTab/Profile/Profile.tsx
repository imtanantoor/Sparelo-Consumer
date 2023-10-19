import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import MyProfileCard from "../../../components/global/MyProfileCard";
import colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../../store/slices/authSlice";
import constants from "../../../utils/constants";
import cartSlice from "../../../store/slices/cartSlice";
import availabilitySlice from "../../../store/slices/availabilitySlice";
import partsSlice from "../../../store/slices/partsSlice";
import requestsSlice from "../../../store/slices/requestsSlice";
import MyStoreIcon from "../../../assets/icons/MyStoreIcon";
import ChangePasswordIcon from "../../../assets/icons/ChangePasswordIcon";
import OrderHistoryIcon from "../../../assets/icons/OrderHistoryIcon";
import MyGarageIcon from "../../../assets/icons/MyGarageIcon";

function Profile({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const dispatch = useDispatch()
  const { user, mode } = useSelector((state: any) => state.Auth)

  function handleSignOut() {
    dispatch(partsSlice.actions.resetPartsState())
    dispatch(requestsSlice.actions.resetRequests())
    dispatch(availabilitySlice.actions.resetAvailabilityState())
    dispatch(cartSlice.actions.reset())
    dispatch(authSlice.actions.logout())
  }

  return <SafeAreaView>
    <ScrollView style={styles.container}>
      <MyProfileCard
        imageUrl={user?.profilePic ? user?.profilePic : ''}
        name={user.name}
        contact={user.contact}
        onPress={() => navigation.navigate('Edit Profile')}
        rating={user.rating}
      />
      <CustomButton
        type="menu"
        title="Change password"
        Icon={() => <ChangePasswordIcon />}
        onPress={() => {
          navigation.navigate('Change Password')
        }}
        disabled={false}
        submitting={false}
        buttonStyle={{ flexDirection: 'row' }}
        titleStyle={{ marginLeft: 20 }}
      />
      {mode === 'buyer' && <CustomButton
        type="menu"
        title="My Garage"
        Icon={() => <MyGarageIcon />}
        onPress={() => {
          navigation.navigate('My Garage')
        }}
        disabled={false}
        submitting={false}
        buttonStyle={{ flexDirection: 'row' }}
        titleStyle={{ marginLeft: 20 }}
      />}
      {mode === 'vendor' && <CustomButton
        type="menu"
        title="My Store"
        Icon={() => <MyStoreIcon />}
        onPress={() => {
          navigation.navigate('Shop Details', { isProfileStack: true })
        }}
        disabled={false}
        submitting={false}
        buttonStyle={{ flexDirection: 'row' }}
        titleStyle={{ marginLeft: 20 }}
      />}
      <CustomButton
        type="menu"
        title="Order History"
        onPress={() => {
          navigation.navigate('Order History')
        }}
        disabled={false}
        Icon={() => <OrderHistoryIcon />}

        submitting={false}
        buttonStyle={{ flexDirection: 'row' }}
        titleStyle={{ marginLeft: 20 }}
      />
      <CustomButton
        type='primary'
        title="Sign Out"
        onPress={handleSignOut}
        disabled={false}
        submitting={false}
        buttonStyle={{ backgroundColor: colors.red }}
      />
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})

export default Profile