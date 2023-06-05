import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native";
import CustomButton from "../../../components/global/CustomButton";
import CustomImage from "../../../components/global/CustomImage";
import CustomTextInput from "../../../components/global/CustomTextInput";
import HeaderBack from "../../../components/molecular/HeaderBack";

function EditProfile({ navigation }: NativeStackScreenProps<any>): JSX.Element {
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

  return <SafeAreaView style={styles.parentView}>
    <View style={styles.container}>
      <CustomImage
        source={{ uri: '' }}
        imageUrl={'https://images.unsplash.com/photo-1597810743069-cf40e2452aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80'}
        style={{ height: 75, width: 75, alignSelf: 'center', marginVertical: 30 }}
      />
      <CustomTextInput
        placeholder="Enter your name"
        label="Your name"
        fieldName="name"
        errors={errors}
        touched={touched}
        disabled={false}
        required={false}
        setTouched={setTouched}
        onChangeText={() => { }}
        onBlur={() => { }}
      />
      <CustomTextInput
        placeholder="03219044503"
        label="Contact"
        fieldName="contact"
        errors={errors}
        touched={touched}
        disabled
        required={false}
        setTouched={setTouched}
        onChangeText={() => { }}
        onBlur={() => { }}
      />
    </View>
    <CustomButton
      type="primary"
      title="Update"
      submitting={false}
      disabled={false}
      buttonStyle={{ marginHorizontal: 20 }}
      onPress={() => { }}
    />

  </SafeAreaView>
}

const styles = StyleSheet.create({
  parentView: { flex: 1, justifyContent: 'space-between' },
  container: {
    paddingHorizontal: 20,
  }
})
export default EditProfile