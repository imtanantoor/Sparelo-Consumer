import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ButtonProps } from 'react-native';
import colors from '../../constants/colors';
import font from '../../constants/fonts';

export interface CustomButtonProps extends ButtonProps {
  title: string
  submitting: boolean
  disabled: boolean
  buttonStyle?: any
  type: 'primary' | 'transparent' | 'menu'
  titleStyle?: any
  Icon?: () => JSX.Element
  onPress: (props?: any) => any
}

function CustomButton({ title, onPress, disabled, submitting, titleStyle, buttonStyle, type, Icon, ...props }: CustomButtonProps): JSX.Element {
  if (type === 'menu')
    return <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={disabled} style={[styles.menuButton, { ...buttonStyle }]} {...props}>
      {submitting && <ActivityIndicator color={colors.white} />}
      {Icon && <Icon />}
      <Text style={[styles.menuButtonTitle, { ...titleStyle }]}>{title}</Text>
    </TouchableOpacity>
  if (type === 'transparent')
    return <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={disabled} style={[styles.transparentContainer, { ...buttonStyle }]} {...props}>
      {submitting && <ActivityIndicator color={colors.white} />}
      {Icon && <Icon />}
      <Text style={[styles.transparentBtnTitle, { ...titleStyle }]}>{title}</Text>
    </TouchableOpacity>
  return <TouchableOpacity activeOpacity={0.9} onPress={onPress} disabled={disabled} style={[styles.container, { backgroundColor: disabled ? colors.disabledButton : colors.primary, ...buttonStyle }]} {...props}>
    {submitting && <ActivityIndicator color={colors.white} />}
    {Icon && <Icon />}
    <Text style={[styles.title, { ...titleStyle }]}>{title}</Text>
  </TouchableOpacity>
}

export default CustomButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10
  },
  transparentContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10
  },
  menuButton: {
    borderColor: '#E3E4E6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5
  },
  menuButtonTitle: {
    color: colors.lightGray,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.fourteen
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.white,
    paddingHorizontal: 10,
    fontSize: font.sizes.subtitle,
    textAlign: 'center'
  },
  transparentBtnTitle: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.lightGray,
    paddingHorizontal: 10,
    fontSize: font.sizes.input,
    textAlign: 'center'
  }
})