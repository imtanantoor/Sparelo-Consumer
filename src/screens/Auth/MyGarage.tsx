import { Fragment, useState } from "react"
import GarageList from "../../components/organism/GarageList"
import CustomModal from "../../components/organism/CustomModal"
import { useNavigation } from "@react-navigation/native"
import AddToGarageSVG from "../../assets/AddToGarageSVG"

function MyGarage(): JSX.Element {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const navigation: any = useNavigation();

  function hideModal() {
    setModalVisible(false)
  }

  function addCar() {
    navigation.navigate('Add Car')
    hideModal()
  }

  return <Fragment>
    <GarageList
      title=""
      verticalList
      sectionActionPress={() => { setModalVisible(true) }}
      addToGaragePress={() => { setModalVisible(true) }}
    />
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
  </Fragment>
}

export default MyGarage