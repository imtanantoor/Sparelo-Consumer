import Modal from "react-native-modal";
import colors from "../../constants/colors";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

type ManufacturerItem = { _id: string, name: string }

interface ManufacturerListModalProps {
  visible: boolean
  manufacturer: ManufacturerItem
  hideModal: () => void
  setManufacturer: (item: ManufacturerItem) => void
  data: ManufacturerItem[];
}

function ManufacturerListModal({ visible, manufacturer, data, setManufacturer, hideModal }: ManufacturerListModalProps) {

  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={{ backgroundColor: 'white', flex: 1, maxHeight: Dimensions.get('screen').height * 0.3, borderRadius: 10 }}>
      <FlatList
        data={data}
        style={{ flex: 1 }}
        contentContainerStyle={{}}
        renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
          setManufacturer(item)
          hideModal()
        }} style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: colors.lightGray, borderBottomWidth: index + 1 !== data.length ? 1 : 0 }}>
          <Text>{item.name}</Text>
          {manufacturer?._id === item._id ? <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
        </TouchableOpacity>}
      />
    </View>

  </Modal >
}

const mapStateToProps = (state: any) => ({
  fetching: state.Manufacturers.fetching,
  data: state.Manufacturers.data,
  error: state.Manufacturers.error,
})

export default connect(mapStateToProps, null)(ManufacturerListModal)