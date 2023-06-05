import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

interface StepIndicatorProps {
  type: 'Active' | 'Inactive'
}

function StepIndicator({ type }: StepIndicatorProps): JSX.Element {
  if (type === 'Inactive')
    return <View style={styles.inactiveIndicator} />
  return <View style={styles.indicatorStyle} />
}
const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: colors.primary,
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
  inactiveIndicator: {
    backgroundColor: colors.inactiveStepBg,
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5
  },
})
export default StepIndicator