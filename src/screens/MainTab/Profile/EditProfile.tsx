import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import CustomImage from "../../../components/global/CustomImage";
import CustomTextInput from "../../../components/global/CustomTextInput";
import { connect } from "react-redux";
import constants from "../../../utils/constants";
import CustomImageSelector from "../../../components/global/CustomImageSelector";
import actions from "../../../store/actions";
import authSlice from "../../../store/slices/authSlice";
import ToastService from "../../../Services/ToastService";

interface EditProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
  user: UserModel
  submitting: boolean
  error: boolean
  success: boolean
  updateUser: (data: UpdateUserModel) => void
  resetUpdateUserState: () => void
}

function EditProfile({ navigation, user, submitting, error, success, updateUser, resetUpdateUserState }: EditProfileScreenProps): JSX.Element {
  const [assets, setAssets] = useState<any[]>([])
  const [values, setValues] = useState<any>({
    name: user?.name ? user.name : '',
    contact: user.contact ? user.contact : ''
  })
  const [errors, setErrors] = useState({
    name: '',
    contact: ''
  })
  const [touched, setTouched] = useState({
    errors: false,
    touched: false
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: '',
      title: 'Basic Details',
      headerBackVisible: false,
    })
  }, [])

  function handleUpdateUser() {
    const data: UpdateUserModel = {
      id: user?._id,
      profilePic: assets[0],
      name: values.name
    }
    updateUser(data)
  }

  useEffect(() => {
    if (success) {
      ToastService.success('Update User', 'User profile updated!')
      navigation.goBack()
      resetUpdateUserState()
    }
  }, [success])

  return <SafeAreaView style={styles.parentView}>
    <ScrollView >
      <View style={styles.container}>
        <CustomImageSelector
          assets={assets}
          setAssets={setAssets}
          showInitialImage
          image={user?.profilePic && assets.length == 0 ? constants.baseURL + user?.profilePic : ''}
          multiple={false}
          style={{ alignSelf: 'center' }}
        />
        <CustomTextInput
          placeholder="Enter your name"
          label="Your name"
          fieldName="name"
          errors={errors}
          touched={touched}
          disabled={false}
          required={false}
          value={values.name}
          setTouched={setTouched}
          onChangeText={(text: string) => { setValues({ ...values, name: text }) }}
          onBlur={() => { }}
        />
        <CustomTextInput
          placeholder={values.contact}
          label="Contact"
          fieldName="contact"
          errors={errors}
          touched={touched}
          disabled
          required={false}
          // value={values.contact}
          setTouched={setTouched}
          onChangeText={() => { }}
          onBlur={() => { }}
        />
      </View>
      <CustomButton
        type="primary"
        title="Update"
        submitting={submitting}
        disabled={submitting || values.name === ''}
        buttonStyle={{ marginHorizontal: 20 }}
        onPress={handleUpdateUser}
      />
    </ScrollView>

  </SafeAreaView>
}

const styles = StyleSheet.create({
  parentView: { flex: 1, justifyContent: 'space-between' },
  container: {
    paddingHorizontal: 20,
  }
})

const mapStateToProps = (state: any) => ({
  user: state.Auth.user,
  submitting: state.Auth.updatingUser,
  error: state.Auth.updatingUserError,
  success: state.Auth.updatingUserSuccess
})

const mapDispatchToProps = {
  updateUser: actions.updateUser,
  resetUpdateUserState: authSlice.actions.resetUpdateUserState
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)