import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";
import { View } from "react-native";
import font from "../../constants/fonts";

interface StartStopRecorderProps {
  startRecording: (props: any) => void
  text: string
}

function StartStopRecorderButton({ startRecording, text }: StartStopRecorderProps): JSX.Element {
  return <View style={styles.container}>
    <Pressable onPressIn={startRecording} style={styles.button} />
    <Text style={styles.text}>{text}</Text>
  </View>
}

export default StartStopRecorderButton

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 13,
    borderRadius: 13
  },
  button: {
    height: 37,
    width: 37,
    borderRadius: 37 / 2,
    backgroundColor: colors.red
  },
  text: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    marginHorizontal: 20,
    fontSize: font.sizes.fifteen
  }
})