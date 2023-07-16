import Modal from "react-native-modal";
import colors from "../../constants/colors";
import VoicePlayer from "./VoicePlayer";
import constants from "../../utils/constants";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PlayIcon from "../../assets/icons/PlayIcon";
import PauseIcon from "../../assets/icons/PauseIcon";
import StopIcon from "../../assets/icons/StopIcon";
import { useEffect, useState } from "react";
import AudioServices from "../../Services/AudioServices";
import ToastService from "../../Services/ToastService";
interface VoicePlayerPopup {
  audioNote: string
  visible: boolean
  hideModal: () => void
}

function VoicePlayerPopup({ visible, audioNote, hideModal }: VoicePlayerPopup) {
  const [playing, setPlaying] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  function HandlePlay() {
    setLoading(true)
    if (playing) {
      AudioServices.PauseAudio()
      setPlaying(false)
      return
    }
    setTimeout(() => {
      AudioServices.PlayAudio(constants.baseURL + audioNote, { 'Accept': 'application/json', })
        .then((data) => {
          setPlaying(true)
          setLoading(false)
        }).catch(error => {
          setLoading(false)
          hideModal()
          ToastService.error('Voice player', JSON.stringify(error))
        })
    }, 500)
  }

  function handleHide() {
    AudioServices.StopAudio()
    setPlaying(false)
    hideModal()
  }

  function StopAudio() {
    AudioServices.StopAudio()
    setPlaying(false)
  }

  return <Modal
    isVisible={visible}
    backdropColor={colors.lightGray}
    onBackButtonPress={handleHide}
    onBackdropPress={handleHide}
    onDismiss={handleHide}
    style={{ flex: 1, height: 500 }}
  >
    <VoicePlayer
      uri={constants.baseURL + audioNote}
      duration="0"
      callBack={setPlaying}
      isPopup={true}
      showActions={false}
      actionContainerStyle={{ flex: 0, marginVertical: 10 }}
    />
    <View style={styles.playerButtonsContainer}>
      <TouchableOpacity onPress={HandlePlay} style={styles.actionButton}>
        {loading ? <ActivityIndicator color={colors.primary} size={'small'} /> : playing ? <PauseIcon fill={colors.primary} /> : <PlayIcon fill={colors.primary} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={StopAudio} style={styles.actionButton}>
        <StopIcon fill={colors.primary} />
      </TouchableOpacity>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  playerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  actionButton: {
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})

export default VoicePlayerPopup