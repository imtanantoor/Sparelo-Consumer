import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import { Rating } from 'react-native-ratings'
import CustomButton from "../global/CustomButton";
import { useDispatch } from "react-redux";
import { CartDataModel } from "../../models/cartModel";
import cartSlice from "../../store/slices/cartSlice";
import AvailabilityCardModel from "../../models/AvailabilityCardsModel";
import { Fragment, useEffect, useState } from "react";
import VoiceSVG from "../../assets/VoiceSVG";
import VoicePlayerPopup from "./VoicePlayerPopup";
import CustomImage from "../global/CustomImage";
import FastImage from "react-native-fast-image";

interface AvailabilityCardProps extends AvailabilityCardModel {
  type: 'results' | 'availability'
  buttonTitle: string
  mode: 'buyer' | 'vendor';
  onButtonPress: (props?: any) => void
  handleAvailabilityStatus?: ({ id, isAvailable }: { id: string, isAvailable: boolean }) => void
  submitting?: boolean
}

interface StatusAndButtonProps {
  isVendor: boolean,
  available: boolean
  availibilityStatus: string
  onAddToCart: (props?: any) => void
  handleAvailabilityStatus: (isAvailable: boolean) => void
  submitting: boolean
}

function StatusAndButtons({ isVendor, available, availibilityStatus, submitting, onAddToCart, handleAvailabilityStatus }: StatusAndButtonProps) {
  if (isVendor) return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <CustomButton
      title="Not Available"
      onPress={() => handleAvailabilityStatus(false)}
      type='primary'
      buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%', backgroundColor: colors.white, borderColor: colors.red, borderWidth: 1 }}
      titleStyle={{ fontSize: 12, color: colors.red }}
      disabled={submitting}
      submitting={submitting} />
    <CustomButton
      title="Available"
      onPress={() => handleAvailabilityStatus(true)}
      type='primary'
      buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '48%' }}
      titleStyle={{ fontSize: 12 }}
      disabled={submitting}
      submitting={submitting} />
  </View>

  return <View style={styles.voiceAndBidsContainer}>
    <Text style={{
      fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
      textTransform: 'uppercase',
      color: available ? '#414141' : colors.red
    }}>
      {availibilityStatus === 'CHECKED' && available ? 'Available' : availibilityStatus === 'CHECKED' && !available ? 'Unavailable' : availibilityStatus}
    </Text>
    {available && <CustomButton
      title="Add to Cart"
      onPress={onAddToCart}
      type='primary'
      buttonStyle={{ padding: 10, marginBottom: 0, borderRadius: 5, minWidth: '45%' }}
      titleStyle={{ fontSize: 12 }}
      disabled={false}
      submitting={false} />
    }
  </View>
}

function AvailabilityCard({ id, make, model, year, images, price, bid, rating, available, type, buttonTitle, audioNote, availabilityId, availibilityStatus, mode, offeredBy, submitting = false, handleAvailabilityStatus, onButtonPress }: AvailabilityCardProps): JSX.Element {

  const dispatch = useDispatch()
  const [width, setWidth] = useState(Dimensions.get('screen').width * 0.83)
  const [showVoicePlayer, setShowVoicePlayer] = useState<boolean>(false)
  function hideVoiceModal() {
    setShowVoicePlayer(false)
  }

  function AddToCart({ item }: { item: CartDataModel }) {
    return () => dispatch(cartSlice.actions.addToCart(item))
  }

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('screen').width * 0.83)
    })

  }, [])

  return <TouchableOpacity activeOpacity={0.9} style={styles.container}>
    <View style={{ overflow: 'hidden' }}>
      <SliderBox
        ImageComponentStyle={styles.slider}
        ImageComponent={CustomImage}
        // resizeMode={FastImage.resizeMode.contain}
        LoaderComponent={() => null}
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
        parentWidth={width}
        // parentWidth={Dimensions.get('screen').width * 0.85}
        images={images}
      />
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.description}>{make} | {model} | {year} </Text>
      {type !== 'results' ? <Fragment>
        <Text style={styles.price}>Rs {price}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Rating
            ratingCount={5}
            ratingColor="#EDD011"
            ratingTextColor="red"
            imageSize={20}
            startingValue={3.5}
            readonly
            style={{ padding: 0, marginVertical: 5, }}
            onFinishRating={() => { }}
          />
          <Text style={styles.ratingText}> {rating} </Text>
        </View>
        <StatusAndButtons
          isVendor={mode == 'vendor'}
          available={available}
          availibilityStatus={availibilityStatus}
          onAddToCart={AddToCart({
            item: {
              id,
              bid,
              make,
              model,
              year,
              title: `${make} | ${model} | ${year}`,
              price: price,
              offeredBy,
              images
            }
          })}
          submitting={submitting}
          handleAvailabilityStatus={(isAvailable) => {
            if (handleAvailabilityStatus) {
              handleAvailabilityStatus({ id: availabilityId?.toString(), isAvailable })
            }
          }}
        />
      </Fragment> : <View style={styles.voiceAndBidsContainer}>
        {audioNote && <TouchableOpacity onPress={() => setShowVoicePlayer(true)} style={styles.voiceCard}>
          <VoiceSVG />
        </TouchableOpacity>}
        <CustomButton
          title={buttonTitle}
          disabled={false}
          submitting={false}
          type="primary"
          onPress={onButtonPress}
          buttonStyle={{ padding: 12, borderRadius: 5, minWidth: '45%' }}
          titleStyle={{ fontSize: 12 }}
        />
      </View>}

    </View>
    {audioNote && <VoicePlayerPopup
      visible={showVoicePlayer}
      hideModal={hideVoiceModal}
      audioNote={audioNote}
    />}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowColor: "#000",
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
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: '#262626'
  },
  price: {
    color: '#D00606',
    fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
    textAlign: 'right'
  },
  voiceAndBidsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center'
  },
  ratingText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: '#707070',
    fontSize: font.sizes.input,
    marginTop: 3
  }
})
export default AvailabilityCard