import Geolocation from '@react-native-community/geolocation';
import MapPosition from '../models/mapPosition';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ToastService from './ToastService';

class LocationServices {
  private position: MapPosition = {
    latitude: 34.0151,
    longitude: 71.5249,
    addressText: '',
  };
  error: any = null;

  constructor() {}

  public getAddressFromCoords({
    latitude,
    longitude,
  }: MapPosition): Promise<string> {
    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          'AIzaSyAjGrrnirfZx2g_t88ZkW8hCt3rrv9wWEg',
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getCurrentLocation(): {
    position: MapPosition;
    error: any;
  } {
    Geolocation.getCurrentPosition(
      position => {
        if (position) {
          this.position.latitude = position?.coords?.latitude ?? 34.0151;
          this.position.longitude = position?.coords?.longitude ?? 71.5249;
        }
        this.getAddressFromCoords({
          latitude: this.position.latitude,
          longitude: this.position.longitude,
        })
          .then((value: any) => {
            if (value) this.position.addressText = value;
          })
          .catch(error => {
            console.log({error});
          });
      },
      error => {
        if (error) this.error = error;
      },
      {enableHighAccuracy: true, timeout: 500},
    );

    return {
      position: this.position,
      error: this.error,
    };
  }
}

export default new LocationServices();
