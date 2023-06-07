import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import HeaderBack from "../../../components/molecular/HeaderBack";
import { connect } from "react-redux";
import CategoryCardProps from "../../../models/categoryCard";
import CustomImageSelector from "../../../components/global/CustomImageSelector";
import colors from "../../../constants/colors";
import font from "../../../constants/fonts";
import RequestSummaryCategoryCard from "../../../components/global/RequestSummaryCategory";
import CustomButton from "../../../components/global/CustomButton";
import actions from "../../../store/actions";
import CreateRequestPayload from "../../../models/createRequestPayload";
import ToastService from "../../../Services/ToastService";
import CustomModal from "../../../components/organism/CustomModal";
import RequestCreationSuccess from "../../../assets/RequestCreationSuccess";
import constants from "../../../utils/constants";
import requestsSlice from "../../../store/slices/requestsSlice";

interface RequestSummaryProps {
  categories: CategoryCardProps[],
  navigation: any,
  route: any
  creating: boolean,
  creationFailed: boolean,
  creationSuccessful: boolean,
  createRequest: (payload: CreateRequestPayload) => void
  resetCreationState: () => void
}

function RequestSummary({ navigation, creating, creationFailed, creationSuccessful, route, categories, createRequest, resetCreationState }: RequestSummaryProps): JSX.Element {
  const [assets, setAssets] = useState<any>([])
  const [category, setCategory] = useState<any>({})
  const [quantity, setQuantity] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')

  const { category: paramsCategory, model, brand, manufacturingYear, carId } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderBack onPress={navigation.goBack} />,
    })
  }, [])

  useEffect(() => {
    let found = categories.find(cat => cat.id == paramsCategory.id)
    setCategory(found)
  }, [])

  useEffect(() => {
    if (creationFailed) {
      ToastService.error('Create Request', 'Create Request Failed')
      resetCreationState()
    }
    if (creationSuccessful) {
      setModalVisible(true)
      resetCreationState()
      navigation.popToTop()
    }
  }, [creationFailed, creationSuccessful])

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

  function handleModalClose() {
    setModalVisible(false)
    navigation.popToTop()
  }

  function handleButton() {
    navigation.navigate('FindYourParts', { screen: 'Filter' })
  }


  function handleCreateRequest() {
    const payload: CreateRequestPayload = {
      images: assets,
      category: category.id,
      car: carId ? carId : '646577961813d41bd7966fcb',
      user: constants.ownerId,
      itemInPair: quantity === 2 ? true : false,
      quantity: quantity,
      additionalNotes: additionalNotes,
      brand: brand ? brand.id : '',
      model: model ? model.id : '',
      manufacturingYear: manufacturingYear,
      voiceNote: ''
    }
    createRequest(payload)
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView >

      <FlatList
        horizontal
        data={assets}
        contentContainerStyle={{ paddingHorizontal: 20 }}
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

      <RequestSummaryCategoryCard
        title={category.title}
        image={category.image}
        make={model?.name}
        model={brand?.name}
        year={manufacturingYear}
      />

      <View style={styles.itemRequiredCard}>
        <Text>Item required</Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <CustomButton
            title="Single (1)"
            disabled={false}
            submitting={false}
            onPress={() => {
              setQuantity(quantity === 1 ? 0 : 1)
            }}
            buttonStyle={{ backgroundColor: quantity == 0 || quantity == 2 ? '#F5F5F5' : colors.primary, paddingVertical: 10 }}
            titleStyle={{ fontSize: 14, color: quantity === 0 || quantity == 2 ? 'black' : 'white', }}
            type="primary"
          />
          <CustomButton
            title="Pair (2)"
            disabled={false}
            submitting={false}
            onPress={() => {
              setQuantity(quantity === 2 ? 0 : 2)
            }}
            buttonStyle={{ marginHorizontal: 10, backgroundColor: quantity === 0 || quantity === 1 ? '#F5F5F5' : colors.primary, paddingVertical: 10 }}
            titleStyle={{ fontSize: 14, color: quantity === 0 || quantity == 1 ? 'black' : 'white', }}
            type="primary"
          />
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular, marginBottom: 10, }}>
          Add Notes for retailer (<Text style={{ color: colors.red }}>optional</Text>)
        </Text>
        <TextInput
          placeholder="Add notes..."
          multiline
          onChangeText={(value: string) => setAdditionalNotes(value)}
          style={{ borderColor: '#E3E4E6', borderWidth: 1, borderRadius: 10, padding: 20, minHeight: 100 }}
        />
      </View>
      <CustomButton
        title="Send Request"
        disabled={creating || assets.length == 0 || quantity === 0}
        submitting={creating}
        onPress={handleCreateRequest}
        buttonStyle={{ marginVertical: 20, marginHorizontal: 20 }}
        type="primary"
      />
      <CustomModal
        visible={modalVisible}
        title="Request Successful"
        description="We sent a request to retailer and will let you know about the bid response."
        hideModal={handleModalClose}
        Component={() => <RequestCreationSuccess />}
        showButton
        buttonTitle="Back to Home screen"
        buttonStyle={{ padding: 10, alignSelf: 'flex-end', width: '100%' }}
        onButtonPress={handleButton}
      />
    </ScrollView>
  </SafeAreaView>
}

const mapStateToProps = (state: any) => ({
  categories: state.Categories.data,
  creating: state.Requests.creating,
  creationFailed: state.Requests.creationFailed,
  creationSuccessful: state.Requests.creationSuccessful,
})

const mapDispatchToProps = {
  createRequest: actions.createRequest,
  resetCreationState: requestsSlice.actions.resetCreationState
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestSummary)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    margin: 20
  },
  imagesContainer: {
    flexDirection: 'row'
  },
  itemRequiredCard: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    margin: 20,
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    borderRadius: 13
  }
})