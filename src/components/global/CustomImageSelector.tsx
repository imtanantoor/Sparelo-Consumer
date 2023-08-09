import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomImage from "./CustomImage";
import { Fragment, useEffect, useState } from "react";
import CustomModal from "../organism/CustomModal";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePlus from "../../assets/icons/ImagePlus";
import ToastService from "../../Services/ToastService";
import CustomButton from "./CustomButton";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

const ImageOptions: any = {
  mediaType: 'photo',
  selectionLimit: 1,
  storageOptions: {
    skipBackup: true,
    path: 'images',
    cameraRoll: true,
    waitUntilSaved: true,
  },
};

interface CustomImageProps {
  assets: any[],
  setAssets: (assets: []) => void,
  multiple: boolean,
  image: string,
  showInitialImage?: boolean,
  style?: any
  handleDelete?: () => void
  selectQuantity?: number
}

function ShowImage({ assets, multiple, imageUrl, showInitialImage, handleDelete }: { assets: any[], multiple: boolean, imageUrl: string, showInitialImage?: boolean, handleDelete?: () => void }) {

  return <Fragment>
    {assets.length == 0 && !showInitialImage ? <CustomImage
      imageUrl={''}
      source={multiple ? require(`../../assets/MultipleImagePlaceholder.png`) : require(`../../assets/ImagePlaceholder.png`)}
      isStatic
      resizeMode="contain"
      style={{ height: '100%', width: '100%', }}
    /> : <View>
      {handleDelete && <CustomButton
        disabled={false}
        submitting={false}
        onPress={handleDelete}
        title="Delete"
        buttonStyle={{
          padding: 5,
          backgroundColor:
            colors.red,
          alignSelf: 'flex-end',
          position: 'absolute',
          zIndex: 999,
          margin: 0,
          right: 10
        }}
        titleStyle={{ fontSize: font.sizes.normal }}
        type="primary"
      />}
      <CustomImage
        imageUrl={imageUrl}
        source={{ uri: imageUrl }}
        isStatic={false}
        resizeMode="contain"
        style={{ height: '100%', width: '100%', }}
      />
    </View>}
  </Fragment>
}

function CustomImageSelector({ assets, multiple, image, style, showInitialImage, selectQuantity, setAssets, handleDelete }: CustomImageProps) {
  const [imageUrl, setImageUrl] = useState(image ? image : '')
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
      const response: any = await launchImageLibrary({ ...ImageOptions, selectionLimit: selectQuantity ? selectQuantity : 1 })
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
    // if (image) {
    //   setImageUrl(image)
    // }
    // if (assets.length === 0) {
    //   setImageUrl('')
    // }
  }, [])

  return <TouchableOpacity style={[styles.uploadImage, { width: multiple ? 200 : '50%', ...style }]} onPress={openModal}>
    <View style={{ height: '100%', width: '100%' }}>
      <ShowImage
        assets={assets}
        imageUrl={multiple ? image : imageUrl}
        multiple={multiple}
        showInitialImage={showInitialImage}
        handleDelete={handleDelete}
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