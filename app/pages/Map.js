import React, { useEffect, useState, useRef } from 'react';
import { Text, Alert, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { currentPosition, watchPosition, clearPositionWatch } from '../services/geolocation';
import { getMarkers, newMarker, editMarker, deleteMarker } from '../services/api';
import { Button, MarkerModal } from '../components';

const formatDate = (date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  let hours = `${d.getHours()}`;
  let minutes = `${d.getMinutes()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  if (hours.length < 2) hours = `0${hours}`;
  if (minutes.length < 2) minutes = `0${minutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const DEFAULT_LOCATION = {
  latitude: 41.693447,
  longitude: -8.846955,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1
};

export default function Map({
  route: {
    params: { user }
  }
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [deletebuttonLoading, setDeletebuttonLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_LOCATION);
  const [initialPosition, setInitialPosition] = useState(DEFAULT_LOCATION);

  const mapRef = useRef();

  const onNewPosition = (position) => {
    const latitude = parseFloat(position.coords.latitude);
    const longitude = parseFloat(position.coords.longitude);

    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    };
    if (mapRef.current) {
      mapRef.current.animateToRegion(region);
    }
    setInitialPosition(region);
    setMarkerPosition(region);
  };

  const onError = ({ message }) => {
    Alert.alert('Error', message);
  };

  useEffect(() => {
    currentPosition(onNewPosition, onError);
    const watchId = watchPosition(onNewPosition, onError);
    return () => {
      clearPositionWatch(watchId);
    };
  }, []);

  useEffect(() => {
    getMarkers().then(({ data, error, message }) => {
      if (error) {
        onError({ message });
      } else {
        setMarkers(data);
      }
    });
  }, []);

  // user: { type: String, required: true },
  // location: { type: Object, required: true },
  // photo: String,
  // description: String

  const onEditMarker = async (extraData) => {
    const { _id } = selected;
    if (_id) {
      if (!modalVisible) {
        setModalVisible(true);
      } else {
        try {
          setButtonLoading(true);
          const { error, message } = await editMarker(user.token, { newData: extraData, _id });
          if (error) {
            onError({ message });
          } else {
            const newMarkers = [...markers];
            const markerIndex = newMarkers.findIndex((marker) => marker._id === _id);
            newMarkers[markerIndex] = { ...newMarkers[markerIndex], ...extraData };
            setMarkers(newMarkers);
            setModalVisible(false);
            Alert.alert('Successfully updated');
          }
        } catch ({ message }) {
          onError({ message });
        } finally {
          setButtonLoading(false);
        }
      }
    } else {
      onError({ message: 'Missing location' });
    }
  };

  const onDeleteMarker = async () => {
    const { _id } = selected;
    if (_id) {
      if (!modalVisible) {
        setModalVisible(true);
      } else {
        try {
          setDeletebuttonLoading(true);
          const { error, message } = await deleteMarker(user.token, _id);
          if (error) {
            onError({ message });
          } else {
            const newMarkers = [...markers].filter((marker) => marker._id !== _id);
            setMarkers(newMarkers);
            setSelected({});
            setModalVisible(false);
            Alert.alert('Successfully deleted');
          }
        } catch ({ message }) {
          onError({ message });
        } finally {
          setDeletebuttonLoading(false);
        }
      }
    } else {
      onError({ message: 'Missing location' });
    }
  };

  const addNewMarker = async (extraData) => {
    const { latitude, longitude } = initialPosition;
    if (latitude && longitude) {
      if (!modalVisible) {
        setModalVisible(true);
      } else {
        try {
          setButtonLoading(true);
          const data = { location: { latitude, longitude } };
          if (extraData.description && extraData.description.length) {
            data.description = extraData.description;
          }
          const { data: resData, error, message } = await newMarker(user.token, data);
          if (error) {
            onError({ message });
          } else {
            setMarkers([...markers, resData]);
            setModalVisible(false);
            Alert.alert('Successfully inserted');
          }
        } catch ({ message }) {
          onError({ message });
        } finally {
          setButtonLoading(false);
        }
      }
    } else {
      onError({ message: 'Missing location' });
    }
  };

  const editing = user.uid === selected.user && modalVisible;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onPress={() => setSelected({})}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={DEFAULT_LOCATION}>
        <Marker onPress={() => setSelected({})} coordinate={markerPosition} />
        {markers.map((marker) => {
          const { _id, description } = marker;
          return (
            <Marker onPress={() => setSelected(marker)} key={_id} coordinate={marker.location}>
              <Callout>
                <Text>{`Sukurta: ${formatDate(marker.createdAt)}`}</Text>
                <Text>{`Atnaujinta: ${formatDate(marker.updatedAt)}`}</Text>
                {description && description.lenght ? <Text>{description}</Text> : null}
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      {selected.user === user.uid ? (
        <Button type="floating_orange" onPress={() => onEditMarker()} title="✎" />
      ) : (
        <Button type="floating" onPress={() => addNewMarker()} title="✚" />
      )}
      <MarkerModal
        buttonLoading={buttonLoading}
        editing={editing}
        selected={selected}
        position={initialPosition}
        onCancel={() => setModalVisible(false)}
        onProceed={editing ? (data) => onEditMarker(data) : (data) => addNewMarker(data)}
        onDelete={onDeleteMarker}
        deletebuttonLoading={deletebuttonLoading}
        visible={modalVisible}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
