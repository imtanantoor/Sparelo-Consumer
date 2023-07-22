import { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import { SliderBox } from "react-native-image-slider-box";
import CustomImage from "../global/CustomImage";


interface ImagesModalProps {
  visible: boolean
  images: string[]
  hideModal: () => any
}

function ImagesModal({ visible, images, hideModal }: ImagesModalProps): JSX.Element {
  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    {/* <View style={styles.popUp}> */}
    <SliderBox
      ImageComponentStyle={styles.slider}
      ImageComponent={CustomImage}
      LoaderComponent={() => null}
      parentWidth={Dimensions.get('screen').width * 0.9}
      paginationBoxStyle={{
        position: "absolute",
        bottom: 0,
        right: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        padding: 10
      }}
      images={images} />
    {/* </View> */}
  </Modal >
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
  slider: {
    borderRadius: 15,
    width: '100%',
    backgroundColor: 'white',
  },

})

export default ImagesModal