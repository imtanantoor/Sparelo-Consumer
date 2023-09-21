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

  private async handleGeolocation(): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      let currentPosition: MapPosition = {
        latitude: 34.0151,
        longitude: 71.5249,
        addressText: '',
      };
      Geolocation.getCurrentPosition(
        position => {
          if (position) {
            currentPosition.latitude = position?.coords?.latitude ?? 34.0151;
            currentPosition.longitude = position?.coords?.longitude ?? 71.5249;
          }
          this.getAddressFromCoords({
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
          })
            .then((value: any) => {
              if (value) currentPosition.addressText = value;
              return resolve(currentPosition);
            })
            .catch(error => {
              return reject(error);
            });
        },
        error => reject(error),
        {enableHighAccuracy: true, timeout: 500},
      );
    });
  }

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

  public async getCurrentLocation(): Promise<{
    position: MapPosition;
    error: any;
  }> {
    this.error = null;
    try {
      const response = await this.handleGeolocation();
      this.position = response;

      return {
        position: this.position,
        error: this.error,
      };
    } catch (error: any) {
      this.error = error.message;
      return {
        position: this.position,
        error: this.error,
      };
    }
  }
}

export default new LocationServices();
