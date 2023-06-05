import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import VoiceSVG from "../../assets/VoiceSVG";
import { Rating } from 'react-native-ratings'
import CustomButton from "../global/CustomButton";
import { useNavigation } from "@react-navigation/native";
import PartsCardModel from "../../models/partsCard";
import { useDispatch } from "react-redux";
import { CartDataModel } from "../../models/cartModel";
import cartSlice from "../../store/slices/cartSlice";


function PartsCard({ id, make, model, year, images, price, bid, audioNote, rating }: PartsCardModel): JSX.Element {
  const dispatch = useDispatch()

  function AddToCart() {
    dispatch(cartSlice.actions.addToCart({
      id,
      bid,
      make,
      model,
      year,
      title: `${make} | ${model} | ${year}`,
      price: price,
      offeredBy: '',
      images
    }))
  }

  return <TouchableOpacity activeOpacity={0.9} style={styles.container}>
    <View>
      <SliderBox
        ImageComponentStyle={styles.slider}
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
        images={images} />
    </View>
    <View style={styles.detailContainer}>
      <Text style={styles.description}>{make} | {year} | {model}</Text>
      <Text style={styles.price}>Rs {price}</Text>
      <View style={styles.voiceAndBidsContainer}>
        <View style={styles.voiceCard}>
          <VoiceSVG />
        </View>
        <CustomButton
          title="Add to Cart"
          onPress={AddToCart}
          type='primary'
          buttonStyle={{ padding: 10, borderRadius: 5, minWidth: '45%' }}
          titleStyle={{ fontSize: 12 }}
          disabled={false}
          submitting={false} />
      </View>
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
    </View>
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
  slider: { borderRadius: 15, width: '80%', marginRight: 60 },
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