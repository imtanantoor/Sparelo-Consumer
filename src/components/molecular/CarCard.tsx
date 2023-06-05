import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CarCardProps from "../../models/carCard";
import CustomImage from "../global/CustomImage";

function CarCard({ imageUrl, carName, carMake, outOfStock, selected, onPress }: CarCardProps): JSX.Element {
  return <TouchableOpacity activeOpacity={0.9} style={[styles.container, { backgroundColor: selected ? colors.primary : styles.container.backgroundColor }]} onPress={onPress}>
    <View>
      <CustomImage
        source={{ uri: imageUrl }}
        imageUrl={imageUrl}
        isStatic={false}
        style={styles.imageStyle}
      />
      {/* <Image
        source={{ uri: imageUrl }}
        style={styles.imageStyle}
      /> */}
      <Text style={[styles.carName, { color: selected ? colors.white : styles.carName.color }]}>{carName}</Text>
    </View>
    <Text style={[styles.carMake, { color: selected ? colors.white : styles.carMake.color }]}>{carMake}</Text>
    {outOfStock && <Text style={[styles.outOfStockText, { color: selected ? colors.white : styles.outOfStockText.color }]}>Request Parts</Text>}
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    minHeight: 200,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    marginVertical: 5,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imageStyle: {
    height: 100,
    width: 150
  },
  carName: {
    textAlign: 'center',
    fontSize: font.sizes.input,
    color: colors.lightGray,
    marginVertical: 7,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular
  },
  carMake: {
    textAlign: 'center',
    color: colors.lightGray,
    fontSize: font.sizes.normal,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular
  },
  outOfStockText: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    textAlign: 'center',
    fontSize: font.sizes.normal,
    marginTop: 12,
    justifyContent: 'flex-end'
  }
})

export default CarCard