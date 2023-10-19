import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from "react-native";
import Logo from "../../../assets/Logo";
import colors from "../../../constants/colors";
import font from "../../../constants/fonts";
import Section from "../../../components/organism/Section";
import Adjustments from "../../../assets/icons/Adjustments";
import GarageList from "../../../components/organism/GarageList";
import { Fragment, useEffect, useState } from "react";
import AdsSlider from "../../../components/organism/AdsSlider";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CartButton from "../../../components/global/CartButton";
import CustomModal from "../../../components/organism/CustomModal";
import AddToGarageSVG from "../../../assets/AddToGarageSVG";
import HeaderLeft from "../../../components/global/HeaderLeft";
import CustomHeader from "../../../components/global/CustomHeader";

function Home({ navigation }: NativeStackScreenProps<any>): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      // headerTransparent: true,
      headerShadowVisible: false,
      headerTitle: '',
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <CartButton navigation={navigation} />,
      header: CustomHeader,
    })

  }, [])

  function hideModal() {
    setModalVisible(false)
  }

  function addCar() {
    navigation.navigate('Add Car')
    hideModal()
  }

  return <Fragment >
    <CustomModal
      visible={modalVisible}
      buttonTitle="Park the Car"
      showButton
      hideModal={hideModal}
      title="Add to your garage."
      description={'Would you like to add this car to your personalised garage to better search your spare parts easily?'}
      Component={AddToGarageSVG}
      onButtonPress={addCar}
    />
    <ScrollView
      // refreshControl={<RefreshControl refreshing={false} onRefresh={() => console.log('refreshing')} />}
      nestedScrollEnabled >
      <View style={{ paddingHorizontal: 20 }}>
        <Section
          sectionDescription="Find your part by selecting the vehicle make, model, year and category or by submitting a new request."
          title="Find Your Parts"
          submitting={false}
          disabled={false}
          type="primary"
          Icon={() => <Adjustments style={{ marginRight: 13 }} />}
          onPress={() => { navigation.navigate('FindYourParts', { screen: 'Filter' }) }}
        />
      </View>
      <GarageList
        title="Your Garage"
        sectionActionPress={() => { setModalVisible(true) }}
        addToGaragePress={() => { setModalVisible(true) }}
        verticalList={false}
      />
      <AdsSlider />
    </ScrollView>
  </Fragment>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerTitle: {
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    color: colors.bannerText,
    fontSize: font.sizes.title,
    marginHorizontal: 20
  },
})
export default Home