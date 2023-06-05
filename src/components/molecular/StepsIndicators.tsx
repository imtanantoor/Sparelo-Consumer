import { StyleSheet, View } from "react-native"
import StepIndicator from "../atomic/StepIndicator"

interface indicatorsProps {
  step1Type?: 'Active' | 'Inactive'
  step2Type?: 'Active' | 'Inactive'
}

function StepsIndicators({ step1Type, step2Type }: indicatorsProps): JSX.Element {
  return <View style={styles.stepsContainer}>
    <StepIndicator type={step1Type ?? 'Active'} />
    <StepIndicator type={step2Type ?? 'Inactive'} />
  </View>
}

export default StepsIndicators

const styles = StyleSheet.create({
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
})