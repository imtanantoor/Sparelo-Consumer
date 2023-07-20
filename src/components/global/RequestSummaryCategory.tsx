import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import CustomImage from "./CustomImage";
import font from "../../constants/fonts";
import CustomButton from "./CustomButton";

export interface RequestSummaryCategoryCardProps {
  title: string
  make: string
  model: string
  year: string
  image: string
}

function RequestSummaryCategoryCard({ title, make, model, year, image, }: RequestSummaryCategoryCardProps): JSX.Element {
  return <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={{ width: '20%' }}>
        <View style={styles.imageContainer}>
          <CustomImage
            imageUrl={image}
            source={{ uri: image }}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionContainer}>
          <View style={{ minWidth: '20%', borderRightColor: 'rgba(0,0,0,0.4)', borderRightWidth: 1, paddingRight: 10 }}>
            <Text style={styles.description}>{make}</Text>
          </View>
          <View style={{ minWidth: '20%', borderRightColor: 'rgba(0,0,0,0.4)', borderRightWidth: 1, paddingHorizontal: 10, marginRight: 10 }}>
            <Text style={styles.description}>{year}</Text>
          </View>
          <View style={{ minWidth: '20%' }}>
            <Text style={styles.description}>{model}</Text>
          </View>
        </View>
      </View>
    </View>
  </View >
}

export default RequestSummaryCategoryCard

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
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  contentContainer: {
    flexDirection: 'row',
  },
  imageContainer: { height: 55, width: 55 },
  detailContainer: {
    paddingHorizontal: 20,
    width: '80%'
  },
  title: {
    color: colors.lightGray,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.fifteen,
    marginBottom: 10
  },
  offeredByText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.normal
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginTop: 12,
    // borderBottomColor: '#EAEBED',
    // paddingBottom: 17,
    // borderBottomWidth: 1,
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.lightGray,
  },
  priceAndImagesButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  priceHeading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: 'rgba(38, 38, 38, 0.5)'
  },
  price: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
  }
})