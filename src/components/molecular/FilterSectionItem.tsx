import { StyleSheet, Text, TouchableOpacity } from "react-native"
import colors from "../../constants/colors"
import font from "../../constants/fonts"

export interface FilterSectionItemProps {
  title: string
  value?: string
  onPress: (props?: any) => any
}

function FilterSectionItem({ title, value, onPress }: FilterSectionItemProps): JSX.Element {
  return <TouchableOpacity activeOpacity={0.3} style={styles.container} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>{value}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E3E4E6',
    borderBottomWidth: 1
  },
  title: {
    color: colors.lightGray,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
    letterSpacing: 1
  },
  value: {
    color: colors.primary,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    fontSize: font.sizes.normal,
    letterSpacing: 1
  },
})

export default FilterSectionItem