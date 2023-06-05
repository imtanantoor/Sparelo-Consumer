import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import CustomButton, { CustomButtonProps } from "../global/CustomButton";

interface CustomModalProps {
  visible: boolean
  Component: any
  title: string
  description: string
  showButton: boolean
  buttonTitle?: string
  buttonStyle?: any
  buttons?: CustomButtonProps[],
  onButtonPress?: (props?: any) => any
  hideModal: () => any
}

function CustomModal({ visible, Component, title, description, showButton, buttonStyle, buttonTitle, buttons, onButtonPress, hideModal }: CustomModalProps): JSX.Element {
  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={styles.popUp}>
      <Component />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {showButton && !!buttons == false && <CustomButton
        title={buttonTitle ?? ''}
        type="primary"
        onPress={onButtonPress ? onButtonPress : () => { }}
        buttonStyle={{ marginTop: 0, ...buttonStyle }}
        disabled={false}
        submitting={false}
      />}
      {!!buttons && buttons.length > 0 && buttons.map((button: CustomButtonProps) => <CustomButton key={button.title} {...button} />)}
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  popUp: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.title,
    marginVertical: 24
  },
  description: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 24
  },
})

export default CustomModal