import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import VoiceSVG from "../../assets/VoiceSVG";
import { Rating } from 'react-native-ratings'
import CustomButton from "../global/CustomButton";
import { useNavigation } from "@react-navigation/native";
import PartsCardModel from "../../models/partsCard";
import { useDispatch, useSelector } from "react-redux";
import { CartDataModel } from "../../models/cartModel";
import cartSlice from "../../store/slices/cartSlice";
import availabilitySlice from "../../store/slices/availabilitySlice";
import actions from "../../store/actions";
import CustomModal from "./CustomModal";
import RequestCreationSuccess from "../../assets/RequestCreationSuccess";
import VoicePlayerPopup from "./VoicePlayerPopup";
import { useEffect, useState } from "react";
import CustomImage from "../global/CustomImage";



function PartsCard({ id, make, model, year, images, price, bid, audioNote, rating, checkAvailability, offeredBy }: PartsCardModel): JSX.Element {
  const dispatch: any = useDispatch()
  const navigation: any = useNavigation()
  const [showVoicePlayer, setShowVoicePlayer] = useState<boolean>(false)
  const { checkingAvailability, checkingAvailabilitySuccess, checkingAvailabilityError } = useSelector((state: any) => state.Availability)
  const { user } = useSelector((state: any) => state.Auth)
  const [width, setWidth] = useState(Dimensions.get('screen').width * 0.83)

  function determineAvailability() {
    dispatch(actions.checkAvailability({ bid: bid.toString(), user: user._id }))
  }

  function hideModal() {
    dispatch(availabilitySlice.actions.resetCheckingState())
    navigation.popToTop()
    navigation.navigate('Home', { screen: 'Home', initial: false })
  }

  function hideVoiceModal() {
    setShowVoicePlayer(false)
  }


  function AddToCart() {
    dispatch(cartSlice.actions.addToCart({
      id,
      bid,
      make,
      model,
      year,
      title: `${make} | ${model} | ${year}`,
      price: price,
      offeredBy,
      images
    }))
  }

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('screen').width * 0.83)
    })
  }, [])

  return <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Request Detail', { id })} style={styles.container}>
    <View style={{ overflow: 'hidden' }}>
      <SliderBox
        ImageComponentStyle={styles.slider}
        ImageComponent={CustomImage}
        LoaderComponent={() => null}
        parentWidth={width}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
        sliderBoxHeight={140}
        images={images}
      />

      <View style={{ position: 'absolute', borderRadius: 20, justifyContent: 'flex-end', bottom: 0, paddingHorizontal: 5, }}>
        <Text style={{
          fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
          color: colors.white,
          fontSize: font.sizes.fourteen,
          marginBottom: 5
        }}>Offered By:{' '}{offeredBy}
        </Text>
      </View>
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.description}>{make} | {year} | {model}</Text>
      {/* <Text style={[styles.description, { marginVertical: 2 }]}><Text style={{ fontFamily: font.fontFamilies({ type: 'Poppins' }).medium }}>Offered By:</Text> {offeredBy}</Text> */}
      <Text style={styles.price}>Rs {price}</Text>
      <View style={[styles.voiceAndBidsContainer, { justifyContent: audioNote ? 'space-between' : 'flex-end', alignItems: 'center' }]}>
        {audioNote && <TouchableOpacity onPress={() => setShowVoicePlayer(true)} style={styles.voiceCard}>
          <VoiceSVG />
        </TouchableOpacity>}
        {!!checkAvailability == false ? <CustomButton
          title="Add to Cart"
          onPress={AddToCart}
          type='primary'
          buttonStyle={{ padding: 10, borderRadius: 5, minWidth: '45%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={false}
          submitting={false} /> : <CustomButton
          title="Check Availability"
          onPress={determineAvailability}
          type='primary'
          buttonStyle={{ padding: 10, borderRadius: 5, minWidth: '45%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={checkingAvailability}
          submitting={checkingAvailability} />}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Rating
          ratingCount={5}
          ratingColor="#EDD011"
          ratingTextColor="red"
          imageSize={20}
          startingValue={rating}
          readonly
          style={{ padding: 0, marginVertical: 5, }}
          onFinishRating={() => { }}
        />
        <Text style={styles.ratingText}> {rating} </Text>
      </View>
      <CustomModal
        visible={checkingAvailabilitySuccess}
        title="Request Sent Successful"
        description="We sent a request to retailer to check the Availability of that part and you will get the response soon in the availability section of app"
        hideModal={() => hideModal()}
        Component={() => <RequestCreationSuccess />}
        showButton
        buttonTitle="Done"
        buttonStyle={{ padding: 10, alignSelf: 'flex-end', width: '100%' }}
        onButtonPress={() => hideModal()}
      />
    </View>
    <VoicePlayerPopup
      visible={showVoicePlayer}
      hideModal={hideVoiceModal}
      audioNote={audioNote}
    />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    padding: 10, shadowColor: "#000",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center', alignContent: 'center'

  },
  slider: {
    borderRadius: 15,
    width: '100%',
  },
  detailContainer: {
    padding: 10
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: '#262626'
  },
  price: {
    color: '#D00606',
    fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
    textAlign: 'right'
  },
  voiceAndBidsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  voiceCard: {
    padding: 10,
    width: '50%',
    shadowColor: "#000",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ratingText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: '#707070',
    fontSize: font.sizes.input,
    marginTop: 3
  }
})
export default PartsCard