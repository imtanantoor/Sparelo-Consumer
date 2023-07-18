import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import { useEffect, useRef } from "react";

interface codeBoxProps extends TextInputProps {
  reference?: (data: React.LegacyRef<TextInput>) => void
}

function CodeBox({ reference, ...props }: codeBoxProps): JSX.Element {

  return <View style={styles.container}>
    <TextInput
      placeholder="-"
      ref={(data: any) => {
        if (data) {
          reference?.(data)
        }
      }}
      placeholderTextColor={colors.codeBoxText}
      style={styles.textInput}
      {...props}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderColor: colors.codeBoxBorder,
    borderWidth: 1
  },
  textInput: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: font.sizes.codeBoxText,
    color: colors.codeBoxText
  }
})

export default CodeBox