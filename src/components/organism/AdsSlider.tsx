import { Fragment, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from "../../constants/colors";


export interface Slide {
  imageUrl: string
}

interface Slides {
  data: Slide[]
}

function AdsSlider({ data }: Slides): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  function handleSnapToItem(index: number) {
    setActiveIndex(index)
  }

  return <View style={{ height: 250, marginVertical: 30, }}>
    <Carousel
      data={data}
      onSnapToItem={handleSnapToItem}
      renderItem={({ item }) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.container}>
          <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: '100%', ...styles.container }} />
        </TouchableOpacity>
      )}
      sliderWidth={Dimensions.get('screen').width}
      scrollEnabled
      itemHeight={240}
      sliderHeight={250}
      contentContainerStyle={{ paddingHorizontal: 20 }}
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

export default AdsSlider