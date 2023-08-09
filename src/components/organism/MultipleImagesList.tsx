import { FlatList, View } from "react-native"
import CustomImageSelector from "../global/CustomImageSelector"

interface MultipleImagesListProps {
  assets: any[]
  handleAssets: (asset: any, index: number) => void
  handleDelete: (index: number) => void
  contentContainerStyle?: any
}

function MultipleImagesList({ assets, contentContainerStyle, handleAssets, handleDelete }: MultipleImagesListProps): JSX.Element {
  return <FlatList
    horizontal
    data={assets}
    contentContainerStyle={{ ...contentContainerStyle }}
    ListHeaderComponent={assets.length < 3 ? <CustomImageSelector
      assets={[]}
      style={{ marginRight: 20 }}
      setAssets={(asset) => handleAssets(asset, -1)}
      selectQuantity={3 - assets.length}
      multiple={true}
      image={''}
    /> : null}
    ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
    renderItem={({ item, index }) => {
      return <CustomImageSelector
        assets={assets}
        setAssets={(asset) => handleAssets(asset, index)}
        multiple={true}
        image={item?.uri ? item.uri : ''}
        handleDelete={() => handleDelete(index)}
      />
    }}
  />
}

export default MultipleImagesList