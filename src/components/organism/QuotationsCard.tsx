import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import VoiceSVG from "../../assets/VoiceSVG";
import { Rating } from 'react-native-ratings'
import CustomButton from "../global/CustomButton";
import VoicePlayerPopup from "./VoicePlayerPopup";
import { useEffect, useState } from "react";
import QuotationsCardModel from "../../models/QuotationsCardModel";
import CustomImage from "../global/CustomImage";
import FastImage from "react-native-fast-image";


function QuotationsCard({ id, make, model, year, images, price, bid, audioNote, rating, offeredBy, showDeleteButton, deletingQuotation, onDeletePress }: QuotationsCardModel): JSX.Element {
  const [showVoicePlayer, setShowVoicePlayer] = useState<boolean>(false)
  // const [width, setWidth] = useState(Dimensions.get('screen').width * 1)
  const [width, setWidth] = useState(Dimensions.get('screen').width * 0.83)



  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('screen').width * 1)
    })
  }, [])

  function hideVoiceModal() {
    setShowVoicePlayer(false)
  }

  return <TouchableOpacity activeOpacity={0.9} style={styles.container}>
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
      {showDeleteButton && <CustomButton
        disabled={deletingQuotation ? deletingQuotation : false}
        submitting={deletingQuotation ? deletingQuotation : false}
        onPress={onDeletePress ? onDeletePress : () => { }}
        title="Delete"
        buttonStyle={{ padding: 5, backgroundColor: colors.red, alignSelf: 'flex-end', position: 'absolute', right: 10 }}
        type="primary"
      />}
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.description}>{make} | {year} | {model}</Text>
      <Text style={styles.price}>Rs {price}</Text>
      <View style={styles.voiceAndBidsContainer}>
        {audioNote && <TouchableOpacity onPress={() => setShowVoicePlayer(true)} style={styles.voiceCard}>
          <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
            <VoiceSVG />
            <VoiceSVG />
            <VoiceSVG width={45} />
          </View>
        </TouchableOpacity>}
      </View>

      {rating !== 0 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Rating
          ratingCount={rating}
          ratingColor="#EDD011"
          ratingTextColor="red"
          imageSize={20}
          startingValue={rating}
          readonly
          style={{ padding: 0, marginVertical: 5, }}
          onFinishRating={() => { }}
        />
        <Text style={styles.ratingText}> {rating} </Text>
      </View>}
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
    // width: '80%',
    // marginRight: 60
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
  voiceAndBidsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center'
  },
  voiceCard: {
    padding: 10,
    width: '100%',
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
export default QuotationsCard