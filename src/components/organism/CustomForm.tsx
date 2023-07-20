import { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInputProps, View } from "react-native";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import CustomTextInput, { CustomInputProps } from "../global/CustomTextInput";


interface ActionButtonProps {
  title: string,
  type: 'transparent' | 'primary'
  onPress: (props?: any) => any
  disabled: boolean
  submitting: boolean
  titleStyle?: any
  buttonStyle?: any
}

interface field {
  label: string
  fieldName: string
  placeholder: string
  required: boolean
  disabled: boolean
  props?: TextInputProps
  inputStyle?: any
  value?: any,
}

interface FormProps {
  title: string
  subtitle: string
  touched: any
  errors: any
  handleBlur: (fieldName: string, required: boolean) => any
  handleChange: (text: string, fieldName: string) => any
  setTouched: (props: any) => any
  fields: field[]
  submitAction: ActionButtonProps
  secondaryAction?: ActionButtonProps
  children?: any
  fieldsContainerStyle?: any
}

function CustomForm({ title, subtitle, fields, touched, errors, setTouched, handleBlur, handleChange, submitAction, secondaryAction, fieldsContainerStyle, children }: FormProps): JSX.Element {
  return <ScrollView
    contentContainerStyle={styles.contentContainer}
    keyboardShouldPersistTaps="always">
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subTitle}>{subtitle}</Text>
    <View style={[styles.fieldsContainer, { ...fieldsContainerStyle }]}>
      {fields && fields.length > 0 && fields.map((field: field) => (<CustomTextInput
        key={field.fieldName}
        label={field.label}
        placeholder={field.placeholder}
        disabled={field.disabled}
        required={field.required}
        touched={touched}
        setTouched={setTouched}
        value={field.value}
        fieldName={field.fieldName}
        errors={errors}
        onBlur={handleBlur(field.fieldName, field.required)}
        inputStyle={field.inputStyle}
        onChangeText={(text: string) => handleChange(text, field.fieldName)}
        {...field.props}
      />
      ))}
      {secondaryAction && <CustomButton
        type={secondaryAction.type}
        title={secondaryAction.title}
        titleStyle={secondaryAction.titleStyle}
        buttonStyle={secondaryAction.buttonStyle}
        disabled={secondaryAction.disabled}
        submitting={secondaryAction.submitting}
        onPress={secondaryAction.onPress}
      />}
      {children}
    </View>
    <CustomButton
      type={submitAction.type}
      title={submitAction.title}
      disabled={submitAction.disabled}
      submitting={submitAction.submitting}
      onPress={submitAction.onPress}
    />
  </ScrollView>
}

export default CustomForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  contentContainer: {
    // flex: 1,
    // flexGrow: 1,
    backgroundColor: colors.white,
    marginHorizontal: 20
  },
  fieldsContainer: {
    marginVertical: 20
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.hero,
    color: colors.textPrimary,
    marginVertical: 11
  },
  subTitle: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.subtitle,
    color: colors.textSecondary
  }
})