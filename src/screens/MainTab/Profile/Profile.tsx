import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import MyProfileCard from "../../../components/global/MyProfileCard";
import colors from "../../../constants/colors";

function Profile({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  return <SafeAreaView>
    <ScrollView style={styles.container}>
      <MyProfileCard
        imageUrl="https://images.unsplash.com/photo-1597810743069-cf40e2452aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80"
        name="Gul Khan"
        contact="03219044503"
        onPress={() => navigation.navigate('Edit Profile')}
        rating={4}
      />
      <CustomButton
        type="menu"
        title="Change password"
        onPress={() => { }}
        disabled={false}
        submitting={false}
      />
      {/* <CustomButton
        type="menu"
        title="My Store"
        onPress={() => { }}
        disabled={false}
        submitting={false}
      /> */}
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
        onPress={() => { navigation.navigate('Auth', { screen: 'Sign In' }) }}
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