import Geolocation from '@react-native-community/geolocation';

export const currentPosition = (succ, err) =>
  Geolocation.getCurrentPosition(succ, err, {
    timeout: 20000,
    maximumAge: 0,
    enableHighAccuracy: true
  });

export const watchPosition = (succ, err) =>
  Geolocation.watchPosition(succ, err, {
    distanceFilter: 1,
    timeout: 20000,
    maximumAge: 0,
    enableHighAccuracy: true
  });

export const clearPositionWatch = (watchId) => Geolocation.clearWatch(watchId);
