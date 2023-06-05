import { FlatList, StyleSheet, Text, View } from "react-native";
import CartCard, { CartCardProps } from "../global/CartCard";
import colors from "../../constants/colors";
import font from "../../constants/fonts";
import { useSelector } from "react-redux";
import ListEmptyComponent from "../global/ListEmptyComponent";

function renderItem({ item }: { item: CartCardProps }) {
  return <CartCard
    {...item}
  />
}

function CartList(): JSX.Element {
  const { data } = useSelector((state: any) => state.Cart)

  return <FlatList
    ListEmptyComponent={() => <ListEmptyComponent
      error={false}
      fetching={false}
      emptyText="Cart is empty"
      hideButton
      onPress={() => { }}
    />}
    style={styles.container}
    contentContainerStyle={{ justifyContent: 'space-between', padding: 0, margin: 0 }}
    data={data}
    renderItem={renderItem}
  />
}

export default CartList

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    backgroundColor: colors.white,
    padding: 0,
    margin: 0
  },
  listFooter: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 10,
    borderTopColor: 'rgba(216, 216, 216, 0.3)',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceHeading: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: 'rgba(38, 38, 38, 0.5)',
    fontSize: font.sizes.fourteen
  },
  price: {
    color: colors.red,
    fontFamily: font.fontFamilies({ type: 'Poppins' }).semiBold,
    fontSize: 20
  }
})