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

const helpers = {
  checkPermissions,
  requestPermissions,
  randomHeightGenerator,
};

export default helpers;
