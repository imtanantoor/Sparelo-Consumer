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



interface BidDetailProps {
  route: any;
  fetching: boolean;
  error: boolean;
  success: boolean;
  bidDetail: any;
  fetchBidDetail: (id: number) => void
}

function TitleAndValue({ title, value }: { title: string, value: string }): JSX.Element {
  return <View style={{ marginBottom: 10 }}>
    <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).semiBold, fontSize: font.sizes.subtitle }}>{title}</Text>
    <Text style={{ fontFamily: font.fontFamilies({ type: 'Inter' }).regular, fontSize: font.sizes.fourteen }}>{!!value ? value : 'Not Provided'}</Text>
  </View>
}

function BidDetail({ route, bidDetail, fetching, fetchBidDetail }: BidDetailProps): JSX.Element {
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
    fetchBidDetail(route?.params?.id)
  }, [])

  if (fetching) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={colors.primary} size={'large'} />
    </View>
  }

  if (bidDetail)
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
        images={bidDetail?.images}
      />
      <View style={styles.detailContainer}>
        <TitleAndValue
          title="Brand"
          value={bidDetail?.request?.brand?.name}
        />
        <TitleAndValue
          title="Make"
          value={bidDetail?.request?.model?.name}
        />
        <TitleAndValue
          title="Manufacturing Year"
          value={bidDetail?.request?.manufacturingYear}
        />
        {/* <TitleAndValue
          title="Additional Notes"
          value={bidDetail?.request?.additionalNotes}
        /> */}
        <View>
          <TitleAndValue
            title="Offered By"
            value={bidDetail?.user?.name}
          />
          {bidDetail?.user?.rating !== 0 && <Rating
            ratingCount={5}
            startingValue={bidDetail?.user?.rating}
            ratingColor="#EDD011"
            ratingTextColor="red"
            imageSize={15}
            readonly
            style={{ padding: 0, marginVertical: 5, justifyContent: 'flex-start', alignItems: 'flex-start' }}
            onFinishRating={() => { }}
          />}
        </View>

        {bidDetail?.voiceNote && <TouchableOpacity onPress={() => setShowVoicePlayer(true)} style={styles.voiceCard}>
          <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
            <VoiceSVG />
            <VoiceSVG />
            <VoiceSVG width={45} />
          </View>
        </TouchableOpacity>}
        <VoicePlayerPopup
          visible={showVoicePlayer}
          hideModal={hideVoiceModal}
          audioNote={bidDetail?.voiceNote}
        />
      </View>
      <Modal visible={popUpVisible} onDismiss={() => setPopUpVisible(false)} transparent >
        <ImageViewer
          enableSwipeDown
          index={initialImage}
          onSwipeDown={() => setPopUpVisible(false)}
          loadingRender={() => <ActivityIndicator />}
          imageUrls={bidDetail.images.map((image: string) => ({ url: image, props: { height: 200, width: Dimensions.get('window').width } }))} />
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
  fetching: state.Parts.fetchingBidDetail,
  error: state.Parts.fetchingBidDetailError,
  success: state.Parts.fetchingBidDetailSuccess,
  bidDetail: state.Parts.bidDetail,
})

const mapDispatchToProps = {
  fetchBidDetail: actions.fetchBidDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(BidDetail)