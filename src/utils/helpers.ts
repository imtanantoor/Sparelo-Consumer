import {
  checkMultiple,
  Permission,
  requestMultiple,
} from 'react-native-permissions';

async function checkPermissions(permissions: Permission[]) {
  let requestPermissionsArray: Permission[] = [];
  try {
    const statuses: any = await checkMultiple(permissions);
    return statuses;
    // Object.keys(statuses).forEach(key => {
    //   if (statuses[key] === 'denied') {
    //     let found = permissions.find(item => item === key)
    //     if (found)
    //       requestPermissionsArray.push(found)
    //   }
    // })

    // if (requestPermissionsArray.length > 0)
    //   requestPermissions(requestPermissionsArray)
  } catch (error) {
    console.log(error);
  }
}

async function requestPermissions(permissions: Permission[]) {
  try {
    const statuses = await requestMultiple(permissions);
    console.log(statuses);
  } catch (error) {
    console.log(error);
  }
}

const randomHeightGenerator = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

function handleOTPNumber(mobileNo: string) {
  let first3 = mobileNo.slice(0, 3);
  let finalNumber = '';

  if (first3.includes('+92')) {
    finalNumber = mobileNo;
  } else if (first3.includes('92')) {
    finalNumber = '+' + mobileNo;
  } else {
    finalNumber = '+92' + mobileNo.replace('0', '');
  }

  return finalNumber;
}

function handleSignInNumber(mobileNo: string) {
  let first3 = mobileNo.slice(0, 3);
  let finalNumber = '';

  if (first3.includes('+92')) {
    finalNumber = mobileNo.replace('+92', '0');
  } else if (first3.includes('92')) {
    finalNumber = mobileNo.replace('+92', '0');
  } else {
    finalNumber = mobileNo;
  }

  return finalNumber;
}

const helpers = {
  checkPermissions,
  requestPermissions,
  randomHeightGenerator,
  handleOTPNumber,
  handleSignInNumber,
};

export default helpers;
