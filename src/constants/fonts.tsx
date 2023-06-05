interface fontType {
  type: 'Inter' | 'Poppins'
}
const fontFamilies = (type: fontType) => ({
  light: `${type.type}-Light`,
  regular: `${type.type}-Regular`,
  semiBold: `${type.type}-SemiBold`,
  medium: `${type.type}-Medium`,
});

const sizes = {
  hero: 30,
  title: 22,
  subtitle: 16,
  codeBoxText: 25,
  fourteen: 14,
  fifteen: 15,
  nineteen: 19,
  input: 17,
  normal: 12,
  ten: 10
}

const font = {
  fontFamilies,
  sizes
}
export default font;
