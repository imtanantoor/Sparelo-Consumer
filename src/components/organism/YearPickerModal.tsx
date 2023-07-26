import { useEffect, useState } from "react";
import colors from "../../constants/colors"
import Modal from "react-native-modal";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import font from "../../constants/fonts";


interface YearPickerModalProps {
  visible: boolean
  hideModal: () => void
  selectedYear: number
  setYear: (year: number) => void
}

function YearPickerModal({ visible, hideModal, selectedYear, setYear }: YearPickerModalProps): JSX.Element {
  const [years, setYears] = useState<number[]>([])
  const date = new Date()

  useEffect(() => {
    let temp = []
    for (let i = 1970; i <= date.getFullYear(); i++) {
      temp.push(i)
    }
    setYears(temp.sort((a, b) => b - a))
  }, [])

  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <FlatList
      data={years}
      style={{ maxHeight: '50%' }}
      contentContainerStyle={{ backgroundColor: colors.white }}
      renderItem={({ item }) => <TouchableOpacity
        style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%', padding: 10, borderBottomColor: colors.lightGray, borderBottomWidth: 1 }}
        onPress={() => setYear(item)}>
        <Text style={{
          fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
          fontSize: font.sizes.fourteen
        }} >{item}</Text>
        <View style={{ backgroundColor: colors.white, height: 15, width: 15, borderRadius: 10, borderColor: colors.lightGray, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }} >
          {selectedYear === item && <View style={{ backgroundColor: colors.primary, height: 10, width: 10, borderRadius: 10 }} />}
        </View>
      </TouchableOpacity>}
    />

  </Modal>
}

export default YearPickerModal