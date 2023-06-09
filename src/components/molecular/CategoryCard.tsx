import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import EngineIcon from "../../assets/icons/EngineIcon";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CategoryCardProps from "../../models/categoryCard";
import CustomImage from "../global/CustomImage";

function CategoryCard({ title, image, onPress, style }: CategoryCardProps): JSX.Element {
  return <TouchableOpacity activeOpacity={0.8} style={[styles.container, { ...style }]} onPress={onPress}>
    <CustomImage
      source={{ uri: image }}
      imageUrl={image}
      style={styles.circle}
      isStatic={false}
    />
    {/* <View style={styles.circle}>
      {Icon}
    </View> */}
    <Text style={styles.categoryName}>{title}</Text>
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 110,
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
  circle: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    backgroundColor: colors.circleGray,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 100,
    width: 150
  },
  categoryName: {
    textAlign: 'center',
    fontSize: 8,
    color: colors.lightGray,
    marginVertical: 7,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular
  },
})

export default CategoryCard