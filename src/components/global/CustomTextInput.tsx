import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

export interface CustomInputProps extends TextInputProps {
  label: string
  fieldName: string
  placeholder: string
  required: boolean
  disabled: boolean
  touched: any
  errors: any
  containerStyle?: any
  inputStyle?: any
  onBlur: any
  setTouched: (props: any) => any
}

function CustomTextInput({ label, placeholder, containerStyle, required, onBlur, setTouched, fieldName, disabled, touched, errors, inputStyle, ...rest }: CustomInputProps): JSX.Element {
  function handleOnBlur() {
    setTouched({ ...touched, [fieldName]: true })
    onBlur && onBlur()
  }
  return <View style={[styles.container, { ...containerStyle, }]}>
    <Text style={[styles.label, { color: disabled ? colors.disabledInput : styles.label.color }]}>{label}{required && <Text style={styles.requiredText}> *</Text>}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.placeHolderColor}
      style={[styles.textInput, { borderBottomColor: errors[fieldName] && touched[fieldName] ? colors.red : disabled ? colors.disabledBorderColor : styles.textInput.borderBottomColor, ...inputStyle }]}
      onBlur={handleOnBlur}
      {...rest}
    />
    {touched[fieldName] && errors[fieldName] && <Text style={styles.fieldError}>{errors[fieldName]}</Text>}
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 15
  },
  label: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.primary,
    fontSize: font.sizes.normal,
    textTransform: 'capitalize'
  },
  textInput: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.textPrimary,
    fontSize: font.sizes.input,
    paddingVertical: 5,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    marginTop: 10
  },
  requiredText: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.red,
    fontSize: font.sizes.normal
  },
  fieldError: {
    fontSize: font.sizes.normal,
    color: colors.red,
    marginVertical: 5
  }
})

export default CustomTextInput