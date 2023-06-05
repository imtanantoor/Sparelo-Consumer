import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import RequestCardProps from "../../models/requestCard";

function RequestsCard({ imageBackground, make, model, year, category, buttonDisabled, buttonTitle, onButtonPress }: RequestCardProps): JSX.Element {
  return <TouchableOpacity style={styles.container} activeOpacity={0.9}>
    <ImageBackground
      source={{ uri: imageBackground }}
      style={styles.imageContainer}
      imageStyle={{ borderRadius: 10 }}
    >

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>{category}</Text>
        <View style={styles.descriptionContainer}>
          <View style={{ minWidth: '20%', borderRightColor: 'rgba(255,255,255,0.4)', borderRightWidth: 2, marginRight: 10 }}>
            <Text style={styles.description}>{make}</Text>
          </View>
          <View style={{ minWidth: '20%', borderRightColor: 'rgba(255,255,255,0.4)', borderRightWidth: 2, marginRight: 10 }}>
            <Text style={styles.description}>{year}</Text>
          </View>
          <View style={{ minWidth: '20%' }}>
            <Text style={styles.description}>{model}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
    <CustomButton
      submitting={false}
      disabled={buttonDisabled}
      title={buttonTitle}
      onPress={onButtonPress}
      type='primary'
      buttonStyle={{ padding: 10, alignSelf: 'flex-end', marginBottom: 0, borderRadius: 6 }}
    />
  </TouchableOpacity>
}

export default RequestsCard;

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
  imageContainer: {
    height: 140,
    borderRadius: 10,
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 10,
    justifyContent: 'flex-end',
    padding: 10
  },
  heading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.white,
    fontSize: font.sizes.fourteen,
    marginBottom: 5
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.white,
  }
})