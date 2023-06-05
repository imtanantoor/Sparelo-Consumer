import { View } from "react-native";
import { Image, StyleSheet, Text, Touchable, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

function BrandCard({ style, onPress, title, imageUrl }: any): JSX.Element {
  return <TouchableOpacity activeOpacity={0.8} style={style} onPress={onPress}>
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.imageStyle}
      />
    </View>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: 10,
    shadowColor: "#000",
    borderColor: '#DBE8F0',
    borderWidth: 1,
    marginVertical: 5,
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
    height: '80%',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    fontSize: font.sizes.fourteen,
    color: '#1E2022',
    marginVertical: 7,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular
  },
})
export default BrandCard