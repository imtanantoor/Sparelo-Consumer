import {Toast} from 'react-native-toast-message/lib/src/Toast';

class ToastService {
  constructor() {}

  success(heading: string, description: string, callback?: () => void) {
    if (callback) {
      callback();
    }
    return Toast.show({
      type: 'success',
      text1: heading,
      text2: description,
    });
  }

  error(heading: string, description: string, callback?: () => void) {
    if (callback) {
      callback();
    }
    return Toast.show({type: 'error', text1: heading, text2: description});
  }

  warning(heading: string, description: string, callback?: () => void) {
    if (callback) {
      callback();
    }
    return Toast.show({type: 'info', text1: heading, text2: description});
  }
}

export default new ToastService();
