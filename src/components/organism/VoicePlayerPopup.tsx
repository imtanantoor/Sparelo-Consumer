import Modal from "react-native-modal";
import colors from "../../constants/colors";
import VoicePlayer from "./VoicePlayer";
import constants from "../../utils/constants";
interface VoicePlayerPopup {
  audioNote: string
  visible: boolean
  hideModal: () => void
}

function VoicePlayerPopup({ visible, audioNote, hideModal }: VoicePlayerPopup) {
  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
    style={{ flex: 1, height: 500 }}
  >
    <VoicePlayer
      uri={constants.baseURL + audioNote}
      duration="0"
      showActions={false}
      actionContainerStyle={{ flex: 0, marginVertical: 10 }}
    />
  </Modal>
}

export default VoicePlayerPopup