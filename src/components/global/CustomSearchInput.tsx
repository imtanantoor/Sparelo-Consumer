import { StyleSheet, TextInputProps, View } from "react-native";
import { TextInput } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon";
import colors from "../../constants/colors";
import font from "../../constants/fonts";

interface SearchInputProps extends TextInputProps { }

function CustomSearchInput({ ...props }: SearchInputProps): JSX.Element {
  return <View style={styles.container}>
    <SearchIcon style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholderTextColor="#B3B3B3"
      {...props}
    />
  </View>
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E3E4E6',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.white
  },
  input: {
    paddingVertical: 15,
    width: '100%',
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular
  },
  icon: {
    marginHorizontal: 15
  }
})
export default CustomSearchInput