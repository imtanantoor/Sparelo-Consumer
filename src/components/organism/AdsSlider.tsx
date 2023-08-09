import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from "../../constants/colors";
import { connect } from "react-redux";
import actions from "../../store/actions";
import CustomImage from "../global/CustomImage";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import FastImage from "react-native-fast-image";


export interface Slide {
  imageUrl: string
}

interface Slides {
  data: Slide[]
  fetching: boolean,
  error: boolean
  fetchAds: () => void
}

function AdsSlider({ data, fetching, error, fetchAds }: Slides): JSX.Element | null {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  function handleSnapToItem(index: number) {
    setActiveIndex(index)
  }

  useEffect(() => {
    fetchAds()
  }, [])

  if (fetching) return <View style={{ height: 250, marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator color={colors.primary} size={'large'} />
  </View>

  if (error) return <View style={{ height: 250, marginVertical: 30, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{
      fontFamily: font.fontFamilies({ type: 'Poppins' }).medium,
      fontSize: font.sizes.title,
      color: colors.red
    }}>Something went wrong</Text>
    <CustomButton
      title="Refresh"
      type='transparent'
      onPress={fetchAds}
      disabled={fetching}
      submitting={false}
    />
  </View>

  return <View style={{ height: 250, marginVertical: 30, }}>
    <Carousel
      data={data}
      onSnapToItem={handleSnapToItem}
      renderItem={({ item }) => (
        <CustomImage
          source={{ uri: '' }}
          imageUrl={item.imageUrl}
          resizeMode={FastImage.resizeMode.cover}
          style={{ height: '100%', width: '100%', ...styles.container }}
        />
      )}
      sliderWidth={Dimensions.get('screen').width}
      scrollEnabled
      itemHeight={250}
      sliderHeight={250}
      contentContainerStyle={{ paddingHorizontal: 20, backgroundColor: 'red' }}
      itemWidth={Dimensions.get('screen').width - 35}
      horizontal
    />
    {data && data.length > 0 && <Pagination
      dotsLength={data?.length}
      activeDotIndex={activeIndex}
      containerStyle={{ paddingVertical: 13 }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary
      }}
      dotContainerStyle={{ marginHorizontal: 5, marginVertical: 0 }}
      inactiveDotStyle={{
        width: 10,
        height: 10,
      }}
      inactiveDotColor={colors.primary}
      inactiveDotOpacity={0.25}
      inactiveDotScale={1}
    />}
  </View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    // marginVertical: 5,
    shadowRadius: 2.22,
    elevation: 3,
  },
})

const mapStateToProps = (state: any) => ({
  fetching: state.Ads.fetching,
  error: state.Ads.error,
  success: state.Ads.success,
  data: state.Ads.data
})

const mapDispatchToProps = {
  fetchAds: actions.fetchAds
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsSlider)