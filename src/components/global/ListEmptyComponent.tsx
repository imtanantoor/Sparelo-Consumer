import { ActivityIndicator, Dimensions, Text, View } from "react-native"
import colors from "../../constants/colors"
import CustomButton from "./CustomButton"
import font from "../../constants/fonts"

function ListEmptyComponent({
  fetching,
  error,
  emptyText,
  hideButton,
  height,
  width,
  onPress }: { fetching: boolean, emptyText?: string, hideButton?: boolean, height?: any, width?: any, error: boolean, onPress: (props?: any) => any }) {
  if (fetching)
    return <View style={{ flex: 1, height: height ? height : Dimensions.get('window').height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color={colors.primary} />
    </View>

  if (error)
    return <View style={{ flex: 1, height: height ? height : Dimensions.get('window').height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{
        fontFamily: font.fontFamilies({ type: 'Poppins' }).medium,
        fontSize: font.sizes.title,
        color: colors.red
      }}>Something went wrong</Text>
      {hideButton ? null : <CustomButton
        title="Refresh"
        type='transparent'
        onPress={onPress}
        disabled={fetching}
        submitting={false}
      />}
    </View>
  return <View style={{ flex: 1, height: height ? height : Dimensions.get('window').height * 0.85, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{
      fontFamily: font.fontFamilies({ type: 'Poppins' }).medium,
      fontSize: font.sizes.title,
      color: colors.primary
    }}>{emptyText ? emptyText : 'No Data Found'}</Text>
    {hideButton ? null : <CustomButton
      title="Refresh"
      type='transparent'
      onPress={onPress}
      disabled={fetching}
      submitting={false}
    />}
  </View>
}

export default ListEmptyComponent