import { FlatList, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../constants/colors";
import { useEffect, useState } from "react";
import CustomImageSelector from "../../../components/global/CustomImageSelector";
import font from "../../../constants/fonts";
import CustomButton from "../../../components/global/CustomButton";
import VoicePlayer from "../../../components/organism/VoicePlayer";
import VoiceRecorder from "../../../components/organism/VoiceRecorder";
import AudioServices from "../../../Services/AudioServices";
import actions from "../../../store/actions";
import { connect } from "react-redux";
import CustomTextInput from "../../../components/global/CustomTextInput";
import CreateQuotationModel from "../../../models/createQuotationModel";
import partsSlice from "../../../store/slices/partsSlice";
import ManufacturerListModal from "../../../components/organism/ManufacturerListModal";
import MultipleImagesList from "../../../components/organism/MultipleImagesList";
interface SendQuotationProps {
  fetching: boolean;
  error: boolean;
  data: { id: string, name: string }[];
  creatingQuotation: boolean;
  creatingQuotationSuccess: boolean;
  creatingQuotationFailure: boolean;
  user: any;
  fetchManufacturers: () => void;
  createQuotation: (data: CreateQuotationModel) => void
  resetCreateQuotationState: () => void;
  route: any
  navigation: any
}

function SendQuotation({ fetching, data, error, user, creatingQuotation, creatingQuotationFailure, creatingQuotationSuccess, route, navigation, fetchManufacturers, createQuotation, resetCreateQuotationState }: SendQuotationProps) {
  const [assets, setAssets] = useState<any>([])
  const [isNew, setIsNew] = useState<boolean>(true)
  const [voiceNote, setVoiceNote] = useState<any>(null)
  const [values, setValues] = useState({ price: '' })
  const [visible, setVisible] = useState<boolean>(false)
  const [manufacturer, setManufacturer] = useState<any>(null)
  const [touched, setTouched] = useState({
    price: false
  })
  const [errors, setErrors] = useState({
    price: ''
  })

  function handleBlur(fieldName: string, required: boolean) {
    type ObjectKey = keyof typeof values
    const myKey = fieldName as ObjectKey

    return () => {
      let priceRegex = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/

      if (priceRegex.test(values[myKey]) === false) {
        return setErrors({ ...errors, [fieldName]: 'Price must only be numbers' })
      } else if (Number(values[myKey]) <= 0) {
        setErrors({ ...errors, [fieldName]: 'Price cannot be less than or equal to 0' })
      } else if (values[myKey] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      } else {
        setErrors({ ...errors, [fieldName]: '' })
      }
    }
  }
  function handleAssets(asset: any[], index: number) {
    let temp = [...assets]
    let imageData = asset[0]

    // When no image is present
    if (temp.length == 0) {
      setAssets(asset)
      return
    }

    // Replace image
    if (index !== -1) {
      temp[index] = imageData
      return setAssets(temp)
    }

    // Image Selector default button assets
    if (index === -1) {
      asset.map((asset) => temp.push(asset))
      setAssets(temp)
      return
    }
  }
  function handleDelete(index: number) {
    setAssets(assets.filter((item: any, currIndex: number) => currIndex !== index))
  }

  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })
    let priceRegex = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/

    if (priceRegex.test(value) === false) {
      return setErrors({ ...errors, [fieldName]: 'Price must only be numbers' })
    }

    if (Number(value) <= 0) {
      return setErrors({ ...errors, [fieldName]: 'Price cannot be less than or equal to 0' })
    }

    if (value !== '')
      setErrors({ ...errors, [fieldName]: '' })
  }

  function showModal() {
    setVisible(true)
  }

  function hideModal() {
    setVisible(false)
  }

  useEffect(() => {
    if (!fetching)
      fetchManufacturers()
  }, [])

  useEffect(() => {
    if (creatingQuotationSuccess) {
      resetCreateQuotationState()
      navigation.goBack()
    }
  }, [creatingQuotation])

  function handleCreateQuotation() {
    const data: CreateQuotationModel = {
      price: values.price,
      isNew: isNew,
      request: route.params.requestId,
      user: user._id,
      manufacturer: manufacturer?._id,
      voiceNote: voiceNote?.uri ? voiceNote.uri : '',
      images: assets
    }
    createQuotation(data)
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView>
      <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular, marginHorizontal: 20, marginTop: 20, }}>Images are required</Text>
      <MultipleImagesList
        assets={assets}
        handleAssets={handleAssets}
        handleDelete={handleDelete}
        // contentContainerStyle={{ paddingHorizontal: Platform.OS === 'ios' ? 20 : 0 }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
      <View>
        <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular, marginHorizontal: 20, }}>Is your spare part</Text>

        <View style={styles.buttonsContainer}>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            <CustomButton
              title="New"
              type="transparent"
              onPress={() => { setIsNew(true) }}
              submitting={false}
              disabled={false}
              // buttonStyle={{ padding: 0, marginRight: 20 }}
              buttonStyle={{ backgroundColor: !isNew ? '#F5F5F5' : colors.primary, paddingVertical: 10, marginRight: 20 }}
              titleStyle={{ color: isNew ? colors.white : '#262626', fontSize: font.sizes.normal }}
            />
            <CustomButton
              title="Used"
              type="transparent"
              onPress={() => { setIsNew(false) }}
              submitting={false}
              disabled={false}
              buttonStyle={{ backgroundColor: isNew ? '#F5F5F5' : colors.primary, paddingVertical: 10, }}
              titleStyle={{ color: isNew ? '#262626' : colors.white, fontSize: font.sizes.normal }}
            />
          </View>

        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <CustomTextInput
          touched={touched}
          errors={errors}
          fieldName="price"
          disabled={false}
          label="Choose Price"
          value={values.price}
          keyboardType='number-pad'
          placeholder="Price"
          onBlur={() => { handleBlur('price', true) }}
          onChangeText={(text: string) => handleChange(text, 'price')}
          setTouched={setTouched}
          required
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.label}>Company</Text>
        <CustomButton
          disabled={data.length == 0 || fetching}
          type='transparent'
          submitting={fetching}
          title={manufacturer ? manufacturer.name : "Select Manufacturer"}
          buttonStyle={{ paddingHorizontal: 0, borderRadius: 0, margin: 0, justifyContent: 'flex-start', borderBottomWidth: 1, borderBottomColor: '#03014C' }}
          titleStyle={{ textAlign: 'left', fontSize: font.sizes.input, fontFamily: font.fontFamilies({ type: 'Poppins' }).regular, color: manufacturer ? colors.textPrimary : colors.placeHolderColor }}
          onPress={showModal}
        />
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular }}>
          Add Voice note for retailer (<Text style={{ color: colors.red }}>optional</Text>)
        </Text>
        {!!voiceNote && <VoicePlayer
          key={voiceNote.uri}
          duration={voiceNote.timeInString}
          uri={voiceNote.uri}
          showActions
          deleteNote={() => setVoiceNote(null)}
        />}

        <VoiceRecorder
          disabled={!!voiceNote}
          setVoiceNote={(note: string) => {
            setVoiceNote({ uri: note, ...AudioServices.getDuration() })
          }} />
      </View>

    </ScrollView>
    <CustomButton
      title="Submit"
      disabled={creatingQuotation || assets.length == 0 || values.price == '' || manufacturer == null || Object.values(errors).some((value) => value !== '')}
      submitting={creatingQuotation}
      onPress={handleCreateQuotation}
      buttonStyle={{ marginVertical: 20, marginHorizontal: 20 }}
      type="primary"
    />
    <ManufacturerListModal
      visible={visible}
      manufacturer={manufacturer}
      hideModal={hideModal}
      setManufacturer={setManufacturer}
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.normal,
    color: '#7F7F7F'
  },
  label: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.primary,
    fontSize: font.sizes.normal,
    textTransform: 'capitalize'
  },
  // itemRequiredCard: {
  //   backgroundColor: colors.white,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   margin: 20,
  //   shadowOpacity: 0.20,
  //   shadowRadius: 1.41,
  //   elevation: 2,
  //   padding: 10,
  //   borderRadius: 13
  // }
  buttonsContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#03014C',
    marginHorizontal: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginVertical: 20,
    // padding: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 13
  }
})

const mapStateToProps = (state: any) => ({
  fetching: state.Manufacturers.fetching,
  data: state.Manufacturers.data,
  error: state.Manufacturers.error,
  creatingQuotation: state.Parts.creatingQuotation,
  creatingQuotationSuccess: state.Parts.creatingQuotationSuccess,
  creatingQuotationFailure: state.Parts.creatingQuotationFailure,
  user: state.Auth.user
})

const mapDispatchToProps = {
  fetchManufacturers: actions.fetchAllManufacturers,
  createQuotation: actions.sendQuotation,
  resetCreateQuotationState: partsSlice.actions.resetCreateQuotationState
}

export default connect(mapStateToProps, mapDispatchToProps)(SendQuotation)