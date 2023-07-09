import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import helpers from "../../utils/helpers";
import colors from "../../constants/colors";

interface Bar {
  height: number
  id: number
}



function RandomBars({ barColor, mode, isPopup = false, onSeek }: { barColor: string, mode: 'player' | 'recorder', isPopup?: boolean, onSeek?: (position: number) => void }): JSX.Element {
  const [bars, setBars] = useState<Bar[]>([])
  const flatListRef: any = useRef(null)

  useEffect(() => {
    let temp: Bar[] = []
    let interval: any = null

    if (mode === 'recorder') {

      let item: Bar = {
        height: helpers.randomHeightGenerator(8, 100),
        id: temp.length + 1
      }
      temp.push(item);

      interval = setInterval(() => {
        let item: Bar = {
          height: helpers.randomHeightGenerator(8, 100),
          id: temp.length + 1
        }

        temp.push(item)
        setBars([...bars, ...temp])
        flatListRef?.current?.scrollToEnd({ animated: false })

      }, 500)
    }

    if (mode === 'player') {
      if (isPopup)
        setBars(Array.from({ length: ((Dimensions.get('screen').width / 12)) * 1 }).map((item: any, index: number) => ({ id: index + 1, height: helpers.randomHeightGenerator(8, 100) })))
      else
        setBars(Array.from({ length: (Dimensions.get('screen').width / 12) * 0.8 }).map((item: any, index: number) => ({ id: index + 1, height: helpers.randomHeightGenerator(8, 100) })))
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <FlatList
    data={bars}
    ref={flatListRef}
    onTouchMove={(event) => {
      if (onSeek)
        onSeek(event.nativeEvent.locationX)
    }}
    scrollEnabled={mode === 'recorder'}
    horizontal
    style={{ height: 50, width: '100%', }}
    renderItem={({ item }) => (<View key={item.id} style={{ backgroundColor: barColor ?? colors.red, height: `${item.height}%`, width: 3, marginHorizontal: 4, alignSelf: 'center' }} />)} />

}

export default RandomBars