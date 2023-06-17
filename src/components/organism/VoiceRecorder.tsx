import { StyleSheet, TouchableOpacity, View } from "react-native";
import StartStopRecorderButton from "../atomic/StartStopRecorderButton";
import Modal from "react-native-modal";
import colors from "../../constants/colors";
import { useState } from "react";
import RandomBars from "../atomic/RandomBars";
import CustomButton from "../global/CustomButton";
import CheckMark from "../../assets/icons/CheckMark";
import ButtonWithIcon from "../atomic/ButtonWithIcon";

interface VoiceRecorderModalProps {
  visible: boolean
  hideModal: () => void
}

function VoiceRecorderModal({ visible, hideModal }: VoiceRecorderModalProps) {
  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={hideModal}
    onBackdropPress={hideModal}
    onDismiss={hideModal}
  >
    <View style={styles.popUp}>
      <RandomBars barColor={colors.red} />
      <View style={styles.buttonsContainer}>
        <ButtonWithIcon
          style={styles.checkButton}
          Icon={() => <CheckMark />}
        />
        <ButtonWithIcon
          style={styles.checkButton}
          Icon={() => <CheckMark />}
        />
      </View>

    </View>
  </Modal>
}

function VoiceRecorder(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(true)

  function hideModal() {
    setModalVisible(false)
  }

  return <View style={styles.container}>
    <StartStopRecorderButton
      startRecording={() => { setModalVisible(true) }}
      stopRecording={() => { }}
      text="Record a voice note"
    />
    <VoiceRecorderModal
      visible={modalVisible}
      hideModal={hideModal}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
    marginHorizontal: 5
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10
  }
})

export default VoiceRecorder