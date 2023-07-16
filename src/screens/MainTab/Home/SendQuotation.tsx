import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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

  function handleAssets(asset: any[], index: number, assets: any[]) {

    if (assets.length == 0) {
      setAssets(asset)
      return
    }

    if (!!assets[index]?.uri && index !== -1) {
      let imageData = asset[0]

      setAssets(assets.map((item: any, currIndex: number) => {
        if (index === currIndex) {
          return {
            ...item,
            ...imageData
          }
        }
        return item
      }))

    }

    if (asset && asset[0]?.uri) {
      let temp = assets.map((item: any) => item)
      let imageData = asset[0]
      temp.push(imageData)
      setAssets(temp)
      return
    }
  }
  function handleBlur(fieldName: string, required: boolean) {
    type ObjectKey = keyof typeof values
    const myKey = fieldName as ObjectKey

    return () => {

      if (values[myKey] === '' && required) {
        setErrors({ ...errors, [fieldName]: `${fieldName} is required!` })
      } else {
        setErrors({ ...errors, [fieldName]: '' })
      }
    }
  }

  function handleChange(value: string, fieldName: string) {
    setValues({ ...values, [fieldName]: value })

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
    console.log({ data })
    createQuotation(data)
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView style={styles.contentContainer}>
      <FlatList
        horizontal
        data={assets}
        // contentContainerStyle={{ paddingHorizontal: 20 }}
        ListHeaderComponent={assets.length < 3 ? <CustomImageSelector
          assets={[]}
          style={{ marginRight: 20 }}
          setAssets={(asset) => handleAssets(asset, -1, assets)}
          multiple={true}
          image={''}
        /> : null}
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        renderItem={({ item, index }) => {
          return <CustomImageSelector
            assets={assets}
            setAssets={(asset) => handleAssets(asset, index, assets)}
            multiple={true}
            image={item?.uri ? item.uri : ''}
          />
        }}
      />
      <Text style={styles.text}>Is your spare part</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="New"
          type="transparent"
          onPress={() => { setIsNew(true) }}
          submitting={false}
          disabled={false}
          buttonStyle={{ padding: 0, marginRight: 20 }}
          titleStyle={{ color: isNew ? colors.bannerText : '#262626', fontSize: font.sizes.normal }}
        />
        <CustomButton
          title="Used"
          type="transparent"
          onPress={() => { setIsNew(false) }}
          submitting={false}
          disabled={false}
          buttonStyle={{ padding: 0, marginRight: 20 }}
          titleStyle={{ color: isNew ? '#262626' : colors.bannerText, fontSize: font.sizes.normal }}
        />

      </View>
      <CustomTextInput
        touched={touched}
        errors={error}
        fieldName="Price"
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
      <View>
        <Text style={{ color: 'rgba(0,0,0,0.5)' }}>Company</Text>
        <CustomButton
          disabled={data.length == 0 || fetching}
          type='transparent'
          submitting={fetching}
          title={manufacturer ? manufacturer.name : "Select Manufacturer"}
          buttonStyle={{ paddingHorizontal: 0, borderRadius: 0, margin: 0, justifyContent: 'flex-start', borderBottomWidth: 1, borderBottomColor: '#03014C' }}
          titleStyle={{ textAlign: 'left', fontSize: font.sizes.fourteen, fontFamily: font.fontFamilies({ type: 'Poppins' }).medium, color: manufacturer ? colors.textPrimary : 'rgba(54, 69, 90, 0.5)' }}
          onPress={showModal}
        />
      </View>
      <View>
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
      disabled={creatingQuotation || assets.length == 0 || values.price == '' || manufacturer == null}
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
  contentContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.normal,
    color: '#7F7F7F'
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#03014C'
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