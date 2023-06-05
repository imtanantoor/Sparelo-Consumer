import { StyleSheet, Text, View } from "react-native"
import colors from "../../constants/colors"
import font from "../../constants/fonts"
import FilterSectionItem, { FilterSectionItemProps } from "../molecular/FilterSectionItem"

interface FilterSectionProps {
  sectionTitle: string
  data: FilterSectionItemProps[]
}

function FilterSection({ data, sectionTitle }: FilterSectionProps): JSX.Element {
  return <View>
    <Text style={styles.title}>{sectionTitle}</Text>
    <View style={styles.section}>
      {data && data.length > 0 && data.map((item) => (<FilterSectionItem key={item.title} {...item} />))}
    </View>
  </View>
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.subtitle
  },
  section: {
    marginVertical: 30
  }
})

export default FilterSection