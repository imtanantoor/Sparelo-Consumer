import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditProfileIcon from "../../assets/icons/EditProfileIcon";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomImage from "./CustomImage";
import { Rating } from 'react-native-ratings'

interface MyProfileCardProps {
  imageUrl: string
  name: string,
  contact: string
  rating: number
  onPress: (props?: any) => any
}

function MyProfileCard({ imageUrl, name, contact, rating, onPress }: MyProfileCardProps): JSX.Element {

  console.log({ rating: rating.toFixed(0) })

  return <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
    <View style={styles.imageAndInfoContainer}>
      <CustomImage
        source={{ uri: '' }}
        imageUrl={imageUrl}
        style={{ height: 50, width: 50, }}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.contact}>{contact}</Text>
        <Rating
          ratingCount={5}
          startingValue={rating}
          ratingColor="#EDD011"
          ratingTextColor="red"
          imageSize={15}
          readonly
          style={{ padding: 0, marginVertical: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}
          onFinishRating={() => { }}
        />
      </View>
    </View>
    <EditProfileIcon />
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#E6E6E6',
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1,
    elevation: 1,
  },
  imageAndInfoContainer: {
    flexDirection: 'row'
  },
  detailContainer: {
    marginHorizontal: 10
  },
  name: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.lightGray,
    fontSize: font.sizes.subtitle
  },
  contact: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.lightGray,
    fontSize: font.sizes.ten
  },
})

export default MyProfileCard