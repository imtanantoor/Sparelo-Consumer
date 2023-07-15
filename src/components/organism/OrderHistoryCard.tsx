import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import CustomImage from "../global/CustomImage";
import OrderHistoryCardProps from "../../models/orderHistoryCardProps";
import font from "../../constants/fonts";

function OrderHistoryCard({ images, make, model, year, category, requestedBy }: OrderHistoryCardProps) {
  return <View style={styles.container}>
    <CustomImage
      imageUrl={images?.[0] ? images[0] : ''}
      source={{ uri: '' }}
      style={{ height: 55, width: 55 }}
    />
    <View style={styles.rightSection}>
      <Text style={styles.heading}>{category}</Text>
      <View>
        <Text style={styles.description}>{make ? `${make} |` : ''} {model ? `${model} |` : ''} {year ? `${year} |` : ''}</Text>
      </View>
    </View>
  </View>
}

export default OrderHistoryCard

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
    flexDirection: 'row'
  },
  rightSection: {
    paddingHorizontal: 20,
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: '#262626'
  },
  heading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.fourteen,
    marginBottom: 5
  },
})