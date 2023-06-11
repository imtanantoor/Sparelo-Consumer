import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import MyProfileCard from "../../../components/global/MyProfileCard";
import colors from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../../store/slices/authSlice";

function Profile({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const dispatch = useDispatch()
  const { user, mode } = useSelector((state: any) => state.Auth)

  function handleSignOut() {
    dispatch(authSlice.actions.logout())
  }

  return <SafeAreaView>
    <ScrollView style={styles.container}>
      <MyProfileCard
        imageUrl="https://images.unsplash.com/photo-1597810743069-cf40e2452aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80"
        name={user.name}
        contact={user.contact}
        onPress={() => navigation.navigate('Edit Profile')}
        rating={user.rating}
      />
      <CustomButton
        type="menu"
        title="Change password"
        onPress={() => { }}
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
        onPress={() => { }}
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