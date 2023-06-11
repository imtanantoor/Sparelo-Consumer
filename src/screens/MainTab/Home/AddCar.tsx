import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FilterSection from "../../../components/organism/FilterSection";
import font from "../../../constants/fonts";
import CustomImageSelector from "../../../components/global/CustomImageSelector";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from "../../../components/global/CustomButton";
import actions from "../../../store/actions";
import { connect } from "react-redux";
import AddCarModel from "../../../models/addCarModel";
import constants from "../../../utils/constants";
import ToastService from "../../../Services/ToastService";
import carSlice from "../../../store/slices/carsSlice";

interface AddCarProps {
  navigation: any
  submitting: boolean
  error: boolean
  success: boolean
  user: UserModel
  addCar: (data: AddCarModel) => void
  resetCreationState: () => void
}

function AddCar({ navigation, submitting, error, success, user, addCar, resetCreationState }: AddCarProps): JSX.Element {
  const initialState = {
    brand: {
      id: '',
      name: '',
    },
    manufacturingYear: '',
    model: {
      id: '',
      name: '',
    },
    category: {
      id: '',
      name: '',
    }
  }
  const [values, setValues] = useState(initialState)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateTImePickerVisible, setDateTimePickerVisible] = useState(false)
  const [images, setImages] = useState<any>([])
  const toast = ToastService

  function openDatePicker() {
    setDateTimePickerVisible(true)
  }

  function hideDatePicker() {
    setDateTimePickerVisible(false)
  }

  function handleConfirm(date: any) {
    let rawDate = new Date(date)
    let year = rawDate.getFullYear().toString()

    setValues({ ...values, manufacturingYear: year })
    setSelectedDate(date)
    hideDatePicker()
  }

  async function handleAddCar() {
    const data: AddCarModel = {
      manufacturingYear: values.manufacturingYear,
      brand: values.brand.id,
      model: values.model.id,
      images: images,
      owner: user._id
    }

    addCar(data)
  }

  function resetStates() {
    resetCreationState()
    setValues(initialState)
    setImages([])
    setSelectedDate(new Date())
  }

  useEffect(() => {
    if (success) {
      toast.success('Add Car', 'Car added successfully')
      resetStates()
    }

    if (error) {
      resetCreationState()
    }
  }, [success, error])

  return <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View>
        <View style={styles.uploadSection}>
          <Text style={styles.title}>Add Car</Text>
          <CustomImageSelector multiple={false} image="" assets={images} setAssets={setImages} />
        </View>
        <FilterSection
          sectionTitle="Specifying your car!"
          data={[
            {
              title: "Select Brand",
              value: values.brand.name,
              onPress: () => {
                navigation.navigate('FindYourParts', { screen: 'Search', params: { title: 'Brand', values, setValues } })
              }
            },
            {
              title: "Specify production year",
              value: values.manufacturingYear,
              onPress: openDatePicker
            },
            {
              title: "Model",
              value: values.model.name,
              onPress: () => {
                if (values?.brand?.id)
                  navigation.navigate('FindYourParts', { screen: 'Search', params: { title: 'Model', values, setValues } })
                else
                  ToastService.warning('Search Model', 'Please select brand first')
              }
            },
          ]}
        />
      </View>
      <CustomButton
        title="Add Car"
        submitting={submitting}
        disabled={values.brand.name == '' || values.manufacturingYear === '' || values.model.name === ''}
        type='primary'
        onPress={handleAddCar}
      />
      <DateTimePickerModal
        isVisible={dateTImePickerVisible}
        mode="date"
        date={selectedDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between'
  },
  uploadSection: {},
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.fourteen,
    color: '#3C3A35',
    textAlign: 'center',
  },

})

const mapStateToProps = (state: any) => ({
  submitting: state.Cars.addingCar,
  error: state.Cars.addingCarError,
  success: state.Cars.addCarSuccess,
  user: state.Auth.user
})

const mapDispatchToProps = {
  addCar: actions.addCar,
  resetCreationState: carSlice.actions.resetCreationState,

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)