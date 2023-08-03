import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import RandomBars from "../atomic/RandomBars";
import font from "../../constants/fonts";
import CustomButton from "../global/CustomButton";
import AudioServices from "../../Services/AudioServices";
import { useEffect, useState } from "react";
import PlayIcon from "../../assets/icons/PlayIcon";
import PauseIcon from "../../assets/icons/PauseIcon";

interface VoicePlayerProps {
  duration: string
  showActions: boolean
  uri: string
  deleteNote?: () => void
  actionContainerStyle?: any
  isPopup?: boolean
  callBack?: (value: boolean) => void
}

function VoicePlayer({ duration, uri, showActions, actionContainerStyle, isPopup, callBack, deleteNote = () => { } }: VoicePlayerProps): JSX.Element {
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    AudioServices.handlePlayBack(({ currentPosition, duration }) => {
      if (currentPosition === duration) {
        setPlaying(false)
        AudioServices.StopAudio()
        if (callBack) {
          callBack(false)
        }
      }
    })
  }, [])

  function HandlePlay() {
    if (playing) {
      AudioServices.PauseAudio()
      setPlaying(false)
      return
    }
    AudioServices.PlayAudio(uri).then((data) => {
      setPlaying(true)
    })
  }

  return <View style={{ marginTop: 20, }}>
    <View style={styles.container}>
      <View style={[styles.actionsContainer, actionContainerStyle]}>
        {isPopup ? null : <TouchableOpacity style={{ marginRight: playing ? 14 : 10 }} onPress={HandlePlay}>
          {playing ? <PauseIcon
            fill={colors.primary} /> :
            <PlayIcon
              fill={colors.primary}
            />}
        </TouchableOpacity>}
        <RandomBars
          onSeek={(position) => {
            console.log({ position })
          }}
          isPopup={isPopup}
          barColor={colors.primary}
          mode='player'
        />
      </View>
      {showActions && <View style={styles.actionsContainer}>
        <Text style={styles.duration}>{duration}</Text>
        <CustomButton
          title="Delete Note"
          onPress={() => {
            AudioServices.StopAudio()
            setPlaying(false)
            deleteNote()
          }}
          disabled={false}
          submitting={false}
          type='transparent'
          buttonStyle={{ paddingVertical: 0 }}
          titleStyle={{ fontSize: 12, color: colors.red }}
        />
      </View>}
    </View>
  </View>
}

export default VoicePlayer

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 13,
    borderRadius: 13,
  },
  duration: {
    color: '#BFBFBF',
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.ten + 1
  },
  actionsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  }
})