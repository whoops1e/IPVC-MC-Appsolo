import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { styles } from '../stylesheet/global';
import { TextInput } from './TextInput';
import { Button } from './Button';

const MarkerModal = ({
  visible,
  onCancel,
  onProceed,
  position,
  buttonLoading,
  deletebuttonLoading,
  editing,
  selected,
  onDelete
}) => {
  const [description, setDescription] = useState(selected.description || '');
  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.markerModal}>
        <Text style={styles.markerModalTitle}>{`${editing ? 'Update' : 'New'} marker`}</Text>
        <Text>{`Latitude: ${position.latitude}`}</Text>
        <Text style={{ marginBottom: 20 }}>{`Longitude: ${position.longitude}`}</Text>
        <TextInput
          defaultValue={selected.description}
          onChange={(text) => setDescription(text)}
          title="Description"
        />
        <Button
          loading={buttonLoading}
          title={`${editing ? 'Update' : 'Add'}`}
          onPress={() => onProceed({ description })}
        />
        {editing && <Button loading={deletebuttonLoading} title="Delete" type="red" onPress={onDelete} />}
        <Button type="orange" title="Cancel" onPress={onCancel} />
      </View>
    </Modal>
  );
};

export { MarkerModal };
