import { FlatList, View } from "react-native"
import CustomImageSelector from "../global/CustomImageSelector"

function MultipleImageSelector({ assets, handleAssets, contentContainerStyle }: { assets: any[], handleAssets: (asset: any, index: number, assets: any[]) => void, contentContainerStyle?: any }) {
  return <FlatList
    horizontal
    data={assets}
    contentContainerStyle={{ paddingHorizontal: 20, ...contentContainerStyle }}
    ListHeaderComponent={assets.length < 3 ? <CustomImageSelector
      assets={[]}
      style={{ marginRight: 20 }}
      setAssets={(asset) => handleAssets(asset, -1, assets)}
      multiple={true}
      image={''}
    /> : null}
    ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
    renderItem={({ item, index }) => {
      return <CustomImageSelector
        assets={assets}
        setAssets={(asset) => handleAssets(asset, index, assets)}
        multiple={true}
        image={item?.uri ? item.uri : ''}
      />
    }}
  />
}

export default MultipleImageSelector