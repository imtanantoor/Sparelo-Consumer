import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../constants/colors";
import { useState } from "react";
import CustomImageSelector from "../../../components/global/CustomImageSelector";
import font from "../../../constants/fonts";
import CustomButton from "../../../components/global/CustomButton";
import VoicePlayer from "../../../components/organism/VoicePlayer";
import VoiceRecorder from "../../../components/organism/VoiceRecorder";
import AudioServices from "../../../Services/AudioServices";

function SendQuotation() {
  const [assets, setAssets] = useState<any>([])
  const [isNew, setIsNew] = useState<boolean>(true)
  const [voiceNote, setVoiceNote] = useState<any>(null)


  function handleAssets(asset: any[], index: number, assets: any[]) {

    if (assets.length == 0) {
      setAssets(asset)
      return
    }

    if (!!assets[index]?.uri && index !== -1) {
      let imageData = asset[0]

      setAssets(assets.map((item: any, currIndex: number) => {
        if (index === currIndex) {
          return {
            ...item,
            ...imageData
          }
        }
        return item
      }))

    }

    if (asset && asset[0]?.uri) {
      let temp = assets.map((item: any) => item)
      let imageData = asset[0]
      temp.push(imageData)
      setAssets(temp)
      return
    }
  }

  return <SafeAreaView style={styles.container}>
    <ScrollView style={styles.contentContainer}>
      <FlatList
        horizontal
        data={assets}
        // contentContainerStyle={{ paddingHorizontal: 20 }}
        ListHeaderComponent={assets.length < 3 ? <CustomImageSelector
          assets={[]}
          style={{ marginRight: 20 }}
          setAssets={(asset) => handleAssets(asset, -1, assets)}
          multiple={true}
          image={''}
        /> : null}
        ItemSeparatorComponent={() => <View style={{ paddingRight: 20 }} />}
        renderItem={({ item, index }) => {
          return <CustomImageSelector
            assets={assets}
            setAssets={(asset) => handleAssets(asset, index, assets)}
            multiple={true}
            image={item?.uri ? item.uri : ''}
          />
        }}
      />
      <Text style={styles.text}>Is your spare part</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="New"
          type="transparent"
          onPress={() => { setIsNew(true) }}
          submitting={false}
          disabled={false}
          buttonStyle={{ padding: 0, marginRight: 20 }}
          titleStyle={{ color: isNew ? colors.bannerText : '#262626', fontSize: font.sizes.normal }}
        />
        <CustomButton
          title="Used"
          type="transparent"
          onPress={() => { setIsNew(false) }}
          submitting={false}
          disabled={false}
          buttonStyle={{ padding: 0, marginRight: 20 }}
          titleStyle={{ color: isNew ? '#262626' : colors.bannerText, fontSize: font.sizes.normal }}
        />
      </View>
      <View>
        {!!voiceNote && <VoicePlayer
          key={voiceNote.uri}
          duration={voiceNote.timeInString}
          uri={voiceNote.uri}
          showActions
          deleteNote={() => setVoiceNote(null)}
        />}

        <VoiceRecorder
          disabled={!!voiceNote}
          setVoiceNote={(note: string) => {
            setVoiceNote({ uri: note, ...AudioServices.getDuration() })
          }} />
      </View>

    </ScrollView>
    <CustomButton
      title="Submit"
      disabled={false}
      submitting={false}
      onPress={() => { }}
      buttonStyle={{ marginVertical: 20, marginHorizontal: 20 }}
      type="primary"
    />
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    fontSize: font.sizes.normal,
    color: '#7F7F7F'
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#03014C'
  }
})

export default SendQuotation