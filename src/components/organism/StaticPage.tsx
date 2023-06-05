import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import font from '../../constants/fonts';
import CustomButton from '../global/CustomButton';
import StepsIndicators from '../molecular/StepsIndicators';

interface StaticPageProps extends PageButtonProps {
  SVG: () => JSX.Element
  title: string
  subTitle: string
  showIndicators: boolean
  step1Type?: 'Active' | 'Inactive'
  step2Type?: 'Active' | 'Inactive'
}

interface PageButtonProps {
  type: 'general' | 'onboarding'
  mainButtonPress: (props?: any) => any
  secondaryButtonPress?: (props?: any) => any
  mainBtnTitle: string
}

function PageButtons({ type, mainBtnTitle, mainButtonPress, secondaryButtonPress }: PageButtonProps): JSX.Element {
  if (type === 'onboarding')
    return <View style={styles.buttonsContainer}>
      <CustomButton
        title="Skip"
        type='transparent'
        submitting={false}
        onPress={mainButtonPress}
        disabled={false} />
      <CustomButton
        title="Next"
        type='transparent'
        submitting={false}
        onPress={secondaryButtonPress ? secondaryButtonPress : () => { }}
        disabled={false} />
    </View>

  return <View style={[styles.buttonsContainer, { flexDirection: 'column' }]}>
    <CustomButton
      title={mainBtnTitle}
      type='primary'
      submitting={false}
      buttonStyle={{ marginHorizontal: 20, alignSelf: 'stretch' }}
      onPress={mainButtonPress}
      disabled={false} />
  </View>
}

function StaticPage({ SVG, title, showIndicators, subTitle, mainBtnTitle, step1Type, step2Type, type, mainButtonPress, secondaryButtonPress }: StaticPageProps): JSX.Element {
  return <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.container}>
      <SVG />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{subTitle}</Text>
        {showIndicators && <StepsIndicators step1Type={step1Type} step2Type={step2Type} />}
      </View>
      <PageButtons
        type={type}
        mainButtonPress={mainButtonPress}
        secondaryButtonPress={secondaryButtonPress}
        mainBtnTitle={mainBtnTitle}
      />
    </ScrollView>
  </SafeAreaView>
}

export default StaticPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: colors.white,
  },
  title: {
    color: colors.textPrimary,
    fontSize: font.sizes.nineteen,
    fontFamily: font.fontFamilies({ type: 'Inter' }).regular,
    textAlign: 'center'
  },
  content: {
    fontFamily: font.fontFamilies({ type: 'Poppins' }).regular,
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 25,
    fontSize: font.sizes.normal,
    textAlign: 'center'
  },
  contentContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})