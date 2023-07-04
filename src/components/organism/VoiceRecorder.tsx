import { StyleSheet, TouchableOpacity, View } from "react-native";
import StartStopRecorderButton from "../atomic/StartStopRecorderButton";
import Modal from "react-native-modal";
import colors from "../../constants/colors";
import { useState } from "react";
import RandomBars from "../atomic/RandomBars";
import CustomButton from "../global/CustomButton";
import CheckMark from "../../assets/icons/CheckMark";
import ButtonWithIcon from "../atomic/ButtonWithIcon";
import UpArrow from "../../assets/icons/UpArrow";
import AudioServices from "../../Services/AudioServices";
import ToastService from "../../Services/ToastService";

interface VoiceRecorderModalProps {
  visible: boolean
  hideModal: () => void
  onSave: () => void
  onClose: () => void
}

function VoiceRecorderModal({ visible, hideModal, onClose, onSave }: VoiceRecorderModalProps) {

  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={styles.popUp}>
      <RandomBars barColor={colors.red} mode='recorder' />
      <View style={styles.buttonsContainer}>
        <ButtonWithIcon
          style={styles.upArrowButton}
          Icon={() => <UpArrow />}
          onPress={onClose}
        />
        <ButtonWithIcon
          style={styles.checkButton}
          Icon={() => <CheckMark />}
          onPress={onSave}
        />
      </View>

    </View>
  </Modal>
}

interface VoiceRecorderProps {
  setVoiceNote: (note: string) => void
  disabled: boolean
}

function VoiceRecorder({ disabled, setVoiceNote }: VoiceRecorderProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)

  function hideModal() {
    setModalVisible(false)
  }

  function handleStart() {
    if (disabled) return ToastService.error('Recorder', 'Only one note is allowed')
    AudioServices.StartRecording().then(() => {
      setModalVisible(true)
    })
  }

  function handleSave() {
    AudioServices.StopRecording().then((result) => setVoiceNote(result))
    hideModal()
  }


  return <View style={styles.container}>
    <StartStopRecorderButton
      startRecording={handleStart}
      text="Record a voice note"
    />
    <VoiceRecorderModal
      visible={modalVisible}
      hideModal={hideModal}
      onSave={handleSave}
      onClose={hideModal}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  popUp: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkButton: {
    height: 37,
    width: 37,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', borderRadius: 37 / 2,
    marginHorizontal: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  upArrowButton: {
    height: 37,
    width: 37,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center', alignItems: 'center', borderRadius: 37 / 2,
  }
})

export default VoiceRecorder