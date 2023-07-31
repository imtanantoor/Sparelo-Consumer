import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageErrorEventData, ImageProps, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

interface CustomImageProps extends ImageProps {
  imageUrl: string
  isStatic?: boolean
}

function CustomImage({ imageUrl, source, isStatic, ...props }: CustomImageProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(isStatic ? false : true)
  const [image, setImage] = useState(imageUrl)
  const [error, setError] = useState<boolean>(false)
  const myProps: any = { ...props }

  function handleLoadEnd() {
    setLoading(false)
  }

  function onError(error: NativeSyntheticEvent<ImageErrorEventData>) {
    setError(true)
    setLoading(false)
  }

  useEffect(() => {
    setError(false)
  }, [imageUrl])

  return <View style={{ justifyContent: 'center' }}>
    <View {...props}>
      {loading && <View style={[styles.loadingIndicatorStyle, { height: myProps?.style?.height ? myProps?.style?.height : styles.loadingIndicatorStyle.height, borderRadius: myProps?.style?.borderRadius ? myProps.style.borderRadius : 15 }]}>
        <ActivityIndicator
          size={'small'}
          color={colors.white}
        />
      </View>}
      <Image
        {...props}
        // onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={onError}
        // source={isStatic ? source : error ? require('../../assets/ImagePlaceholder.png') : require('../../assets/ImagePlaceholder.png')}
        source={isStatic ? source : error ? require('../../assets/ImagePlaceholder.png') : { uri: imageUrl ? imageUrl : source?.uri }}
        style={[myProps?.style, { width: '100%', marginRight: 0 }]}
      />
    </View>
  </View>
}
const styles = StyleSheet.create({
  loadingIndicatorStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: '100%',
    width: '100%'
  }
})
export default CustomImage