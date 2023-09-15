import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import MyProfileCard from "../../../components/global/MyProfileCard";
import colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../../store/slices/authSlice";
import constants from "../../../utils/constants";
import cartSlice from "../../../store/slices/cartSlice";

function Profile({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const dispatch = useDispatch()
  const { user, mode } = useSelector((state: any) => state.Auth)

  function handleSignOut() {
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
        onPress={() => {
          navigation.navigate('Change Password')
        }}
        disabled={false}
        submitting={false}
      />
      {mode === 'vendor' && <CustomButton
        type="menu"
        title="My Store"
        onPress={() => {
          navigation.navigate('Shop Details', { isProfileStack: true })
        }}
        disabled={false}
        submitting={false}
      />}
      <CustomButton
        type="menu"
        title="Order History"
        onPress={() => {
          navigation.navigate('Order History')
        }}
        disabled={false}
        submitting={false}
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