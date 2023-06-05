import { StyleSheet, View, Text } from "react-native"
import Adjustments from "../../assets/icons/Adjustments"
import colors from "../../constants/colors"
import font from "../../constants/fonts"
import CustomButton, { CustomButtonProps } from "../global/CustomButton"

interface SectionProps extends CustomButtonProps {
  sectionDescription: string
}

function Section({ sectionDescription, title, type, submitting, disabled, Icon, onPress }: SectionProps): JSX.Element {
  return <View style={styles.sectionContainer}>
    <Text style={styles.sectionDescription}>{sectionDescription}</Text>
    <CustomButton
      title={title}
      disabled={disabled}
      type={type}
      submitting={submitting}
      Icon={Icon}
      buttonStyle={{ paddingVertical: 10, marginTop: 16 }}
      onPress={onPress}
    />
  </View>
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: colors.grayBg,
    padding: 16,
    marginVertical: 20,
    borderRadius: 8
  },
  sectionDescription: {
    fontSize: font.sizes.fourteen,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.sectionDescriptionText
  }
})
export default Section