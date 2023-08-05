import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './AddWeekendModalStyle';
import { useAuthentication } from '../../../utils/hooks/useAuthentification';
import { Weekend } from '../../../models/weekend';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { SERVER_IP } from '@env';
import { useStoreActions } from '../../../state/hooks';
import * as Haptics from 'expo-haptics';

const AddWeekendModal = () => {
  const setCurrentWeekend = useStoreActions((actions) => actions.setWeekend);

  const { user } = useAuthentication();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('create');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const openModal = (option: any) => {
    setSelectedOption(option);
  };

  const handleCreate = async () => {
    try {
      console.log("create weekend")
      const response = await fetch(SERVER_IP + '/createWeekend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          user_id: user!.uid
        }),
      });
      const weekendCreated: Weekend = await response.json();
      setModalVisible(false);
      setName('')
      setCurrentWeekend(weekendCreated)
      RootNavigation.navigate('Weekend')

    } catch (error) {
      console.error(error);
    }
  };

  const handleJoin = () => {
    // Handle join logic
    console.log('Join:', code);
    setCode('')
    setModalVisible(false);
  };

  return (
    <View>
      <Button onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              setModalVisible(true)}}
        buttonStyle={styles.buttonStyle}
        icon={
            <Ionicons name="add" size={30} color="white" />
        } 
      />
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
          <View style={styles.content}>
            <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.button} onPress={() => openModal('create')}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => openModal('join')}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
            </View>

            {selectedOption === 'create' ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a name"
                  value={name}
                  onChangeText={setName}
                />
                <Button title="Create" onPress={handleCreate} />
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a code"
                  value={code}
                  onChangeText={setCode}
                />
                <Button title="Join" onPress={handleJoin} />
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default AddWeekendModal;



