import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomImage from "./CustomImage";
import { Fragment, useEffect, useState } from "react";
import CustomModal from "../organism/CustomModal";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePlus from "../../assets/icons/ImagePlus";
import ToastService from "../../Services/ToastService";

const ImageOptions: any = {
  mediaType: 'photo',
  selectionLimit: 1,
  // includeBase64: true,
  // noData: true,
  // quality: 1.0,
  // maxWidth: 500,
  // maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
  // storageOptions: {
  //   skipBackup: true,
  //   path: 'images',
  // },
};

function ShowImage({ assets, multiple, imageUrl }: { assets: any[], multiple: boolean, imageUrl: string }) {

  return <Fragment>
    {assets.length == 0 ? <CustomImage
      imageUrl={''}
      source={multiple ? require(`../../assets/MultipleImagePlaceholder.png`) : require(`../../assets/ImagePlaceholder.png`)}
      isStatic
      style={{ height: '100%', width: '100%', resizeMode: 'contain', }}
    /> : <CustomImage
      imageUrl={imageUrl}
      source={{ uri: imageUrl }}
      isStatic={false}
      style={{ height: '100%', width: '100%', resizeMode: 'contain', }}
    />}
  </Fragment>
}

function CustomImageSelector({ assets, multiple, image, style, setAssets }: { assets: any[], setAssets: (assets: []) => void, multiple: boolean, image: string, style?: any }) {
  const [imageUrl, setImageUrl] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  function hideModal() {
    setModalVisible(false)
  }

  function openModal() {
    setModalVisible(true)
  }

  async function OpenCamera() {
    try {
      const response: any = await launchCamera(ImageOptions)
      if (response.assets) {
        setAssets(response.assets)
        setImageUrl(response.assets[0].uri)
      }
      setModalVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  async function SelectFromGallery() {
    try {
      const response: any = await launchImageLibrary(ImageOptions)
      console.log({ response })
      if (response.assets) {
        setAssets(response.assets)
        setImageUrl(response?.assets[0]?.uri)
      }
      setModalVisible(false)

    } catch (error: any) {
      ToastService.error('Image Picker', error.message ? error.message : 'Something went wrong')
      setModalVisible(false)
    }
  }

  useEffect(() => {
    if (assets.length === 0) {
      setImageUrl('')
    }
  }, [assets.length])

  return <TouchableOpacity style={[styles.uploadImage, { width: multiple ? 200 : '50%', ...style }]} onPress={openModal}>
    <View style={{ height: '100%', width: '100%' }}>
      <ShowImage
        assets={assets}
        imageUrl={multiple ? image : imageUrl}
        multiple={multiple}
      />
      {multiple ? null : <TouchableOpacity onPress={openModal} style={{
        height: 26,
        width: 26,
        top: -15,
        right: 15,
        padding: 0,
        margin: 0,
        // backgroundColor: colors.primary,
        borderRadius: 15,
        alignSelf: 'flex-end',
      }}>
        <ImagePlus />
      </TouchableOpacity>}
      <CustomModal
        visible={modalVisible}
        buttonTitle="Park the Car"
        showButton
        hideModal={hideModal}
        title="Upload Image"
        description={'Please select one option'}
        Component={() => null}
        buttons={[
          {
            title: 'Open Camera',
            onPress: OpenCamera,
            disabled: false,
            submitting: false,
            type: 'primary',
            buttonStyle: {
              padding: 10,
              marginVertical: 0,
              width: '80%',
            }
          },
          {
            title: 'Open Gallery',
            onPress: SelectFromGallery,
            disabled: false,
            submitting: false,
            type: 'primary',
            buttonStyle: {
              padding: 10,
              width: '80%',
            }
          },
        ]}
        onButtonPress={() => { }}
      />
    </View>
  </TouchableOpacity>
}

export default CustomImageSelector;

const styles = StyleSheet.create({
  uploadImage: {
    borderWidth: 1,
    borderColor: '#D7D7D9',
    width: '50%',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 10,
    height: 119,
    marginVertical: 30
  }
})