import { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import CustomButton from "../../../../components/global/CustomButton";
import HeaderBack from "../../../../components/molecular/HeaderBack";
import FilterSection from "../../../../components/organism/FilterSection";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ToastService from "../../../../Services/ToastService";

function FilterScreen({ navigation, route }: NativeStackScreenProps<any>): JSX.Element {
  const [values, setValues] = useState({
    brand: {
      id: route?.params?.brandId ? route?.params?.brandId : '',
      name: route?.params?.brandName ? route?.params?.brandName : '',
    },
    manufacturingYear: route?.params?.manufacturingYear ? route?.params?.manufacturingYear : '',
    model: {
      id: route?.params?.modelId ? route?.params?.modelId : '',
      name: route?.params?.modelName ? route?.params?.modelName : '',
    },
    category: {
      id: route?.params?.categoryId ? route?.params?.categoryId : '',
      name: route?.params?.categoryName ? route?.params?.categoryName : '',
    }
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateTImePickerVisible, setDateTimePickerVisible] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBack onPress={navigation.goBack} />
    })
  }, [])

  function openDatePicker() {
    // if (route?.params?.buttonsDisabled) return
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

  useEffect(() => {
    setValues({ ...values, model: { id: '', name: '' } })
  }, [values?.brand?.id])

  return <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <FilterSection
        sectionTitle="Specifying your car!"
        data={[
          {
            title: "Select Brand",
            value: values.brand.name,
            onPress: () => {
              // if (route?.params?.buttonsDisabled) return
              navigation.navigate('Search', { title: 'Brand', values, setValues })
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
              // if (route?.params?.buttonsDisabled) return
              if (values?.brand?.id)
                navigation.navigate('Search', { title: 'Model', values, setValues })
              else
                ToastService.warning('Search Model', 'Please select brand first')
            }
          },
        ]}
      />
      <FilterSection
        sectionTitle="Choose Category"
        data={[
          {
            title: "Select Category",
            value: values.category.name,
            onPress: () => {
              // if (route?.params?.buttonsDisabled) return
              navigation.navigate('Search', { title: 'Category', values, setValues })
            }
          },
        ]}
      />
    </ScrollView>
    <CustomButton
      title="Search Parts"
      disabled={values.brand.id === '' || values.category.id === '' || values.manufacturingYear == '' || values.model.id === ''}
      submitting={false}
      type='primary'
      buttonStyle={{ marginHorizontal: 20 }}
      onPress={() => {
        navigation.navigate('Search Parts', {
          brand: values.brand,
          manufacturingYear: values.manufacturingYear,
          model: values.model,
          category: values.category,
          carId: route?.params?.carId ? route?.params?.carId : ''
        })
      }}
    />
    <DateTimePickerModal
      isVisible={dateTImePickerVisible}
      mode="date"
      date={selectedDate}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default FilterScreen