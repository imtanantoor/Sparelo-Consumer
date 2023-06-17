import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import helpers from "../../utils/helpers";
import colors from "../../constants/colors";

interface Bar {
  height: number
  id: number
}



function RandomBars({ barColor }: { barColor: string }): JSX.Element {
  const [bars, setBars] = useState<Bar[]>([])
  const flatListRef: any = useRef(null)

  useEffect(() => {
    let temp: Bar[] = []

    const interval = setInterval(() => {
      let item: Bar = {
        height: helpers.randomHeightGenerator(8, 100),
        id: temp.length + 1
      }

      temp.push(item)
      setBars([...bars, ...temp])
      flatListRef?.current?.scrollToEnd({ animated: false })

    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <FlatList
    data={bars}
    ref={flatListRef}
    horizontal
    style={{ height: 50, width: '100%' }}
    renderItem={({ item }) => (<View key={item.id} style={{ backgroundColor: barColor ?? colors.red, height: `${item.height}%`, width: 3, marginHorizontal: 4, alignSelf: 'center' }} />)} />

}

export default RandomBars