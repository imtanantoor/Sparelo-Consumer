import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, Modal, TouchableOpacity, View } from "react-native";
import colors from "../../../constants/colors";
import actions from "../../../store/actions";
import { connect } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import CustomImage from "../../../components/global/CustomImage";
import FastImage from "react-native-fast-image";
import VoicePlayerPopup from "../../../components/organism/VoicePlayerPopup";
import VoiceSVG from "../../../assets/VoiceSVG";
import font from "../../../constants/fonts";
import ImageViewer from 'react-native-image-zoom-viewer';
import { Rating } from 'react-native-ratings'
import ToastService from "../../../Services/ToastService";
// import { Modal } from 'react-native';



interface RequestDetailProps {
  route: any;
  fetching: boolean;
  error: boolean;
  success: boolean;
  requestDetail: any;
  fetchRequestDetail: (id: number) => void
}

function TitleAndValue({ title, value }: { title: string, value: string }): JSX.Element {
  return <View style={{ marginBottom: 10 }}>
    <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold, fontSize: font.sizes.subtitle }}>{title}</Text>
    <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular, fontSize: font.sizes.fourteen }}>{!!value ? value : 'Not Provided'}</Text>
  </View>
}

function RequestDetail({ route, requestDetail, fetching, fetchRequestDetail }: RequestDetailProps): JSX.Element {
  const [width, setWidth] = useState(Dimensions.get('screen').width * 1)
  const [showVoicePlayer, setShowVoicePlayer] = useState<boolean>(false)
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false)
  const [initialImage, setInitialImage] = useState(0)

  function hideVoiceModal() {
    setShowVoicePlayer(false)
  }

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('screen').width * 1)
    })
    fetchRequestDetail(route?.params?.id)
  }, [])

  if (fetching) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={colors.primary} size={'large'} />
    </View>
  }

  if (requestDetail)
    return <ScrollView style={styles.container}>
      <SliderBox
        onCurrentImagePressed={(index: any) => {
          setInitialImage(index)
          ToastService.warning('Note', 'Please swipe down to close full screen')
          setTimeout(() => {
            setPopUpVisible(true)
          }, 500)
        }}
        ImageComponentStyle={styles.slider}
        ImageComponent={CustomImage}
        LoaderComponent={() => null}
        paginationBoxStyle={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: 0,
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          paddingVertical: 10
        }}
        sliderBoxHeight={200}
        parentWidth={width - 40}
        // parentWidth={Dimensions.get('screen').width * 0.85}
        images={requestDetail?.images}
      />
      <View style={styles.detailContainer}>
        <TitleAndValue
          title="Brand"
          value={requestDetail?.brand?.name}
        />
        <TitleAndValue
          title="Make"
          value={requestDetail?.model?.name}
        />
        <TitleAndValue
          title="Manufacturing Year"
          value={requestDetail?.manufacturingYear}
        />
        <TitleAndValue
          title="Additional Notes"
          value={requestDetail?.additionalNotes}
        />
        <View>
          <TitleAndValue
            title="Requested By"
            value={requestDetail?.user?.name}
          />
          {requestDetail?.user?.rating !== 0 && <Rating
            ratingCount={requestDetail?.user?.rating}
            ratingColor="#EDD011"
            ratingTextColor="red"
            imageSize={15}
            readonly
            style={{ padding: 0, marginVertical: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}
            onFinishRating={() => { }}
          />}
        </View>

        {requestDetail?.voiceNote && <TouchableOpacity onPress={() => setShowVoicePlayer(true)} style={styles.voiceCard}>
          <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
            <VoiceSVG />
            <VoiceSVG />
            <VoiceSVG width={45} />
          </View>
        </TouchableOpacity>}
        <VoicePlayerPopup
          visible={showVoicePlayer}
          hideModal={hideVoiceModal}
          audioNote={requestDetail?.voiceNote}
        />
      </View>
      <Modal visible={popUpVisible} onDismiss={() => setPopUpVisible(false)} transparent >
        <ImageViewer
          enableSwipeDown
          index={initialImage}
          onSwipeDown={() => setPopUpVisible(false)}
          loadingRender={() => <ActivityIndicator />}
          imageUrls={requestDetail.images.map((image: string) => ({ url: image, props: { height: 200, width: Dimensions.get('window').width } }))} />
      </Modal>
    </ScrollView>

  return <Fragment></Fragment>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  slider: {
    borderRadius: 15,
    width: '100%',
  },
  detailContainer: {
    marginVertical: 20,
  },
  voiceCard: {
    padding: 10,
    // width: '100%',
    marginHorizontal: 2,
    marginVertical: 10,
    shadowColor: "#000",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
})

const mapStateToProps = (state: any) => ({
  fetching: state.Requests.fetchingRequestDetail,
  error: state.Requests.fetchingRequestDetailError,
  success: state.Requests.fetchingRequestDetailSuccess,
  requestDetail: state.Requests.requestDetail,
})

const mapDispatchToProps = {
  fetchRequestDetail: actions.fetchRequestDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetail)