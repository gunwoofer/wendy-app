import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './HomeStyle'; // Import styles from the styles.js file
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../../utils/hooks/useAuthentification';
import { Weekend } from '../../models/weekend';
import WeekendCard from '../../components/WeekendCard/WeekendCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/userStack';
import { RouteProp } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeProps = {
    navigation: HomeScreenNavigationProp;
    route: RouteProp<RootStackParamList, 'Home'>;
};

const auth = getAuth();

const url = 'http://192.168.0.16:3000'

const HomeScreen = ({route, navigation}: HomeProps) => {
  const { user } = useAuthentication();
  
  const [activeTab, setActiveTab] = useState('weekends');
  const [isModalVisible, setModalVisible] = useState(false);
  const [weekendName, setWeekendName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [myWeekends, setmyWeekends] = useState<Weekend[]>([]);

  useEffect(() => {
    if(user)
      getWeekends().catch(console.error);
  }, [user]);

  const getWeekends = async () => {
    console.log("TEST");
    console.log(user?.email);
    const response = await fetch(url + '/getWeekends', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user!.email }),
    });
    const data = await response.json();
    setmyWeekends(data)
  }

  const handleWeekendPress = () => {
    setActiveTab('weekends');
  };

  const handleProfilePress = () => {
    setActiveTab('profile');
  };

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setWeekendName('');
    setResponseMessage('');
  };

  const handleCardPress = (weekend: Weekend) => {
    navigation.navigate('Weekend', {weekend: weekend});
  };

  const handleCreateWeekend = async () => {
    if (weekendName.length < 3) {
      Alert.alert('Invalid Name', 'The weekend name must be at least 3 characters long.');
      return;
    }

    try {
      const response = await fetch(url + '/createWeekend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: weekendName, creator: user!.email }),
      });

      const data = await response.json();
      setResponseMessage(JSON.stringify(data));
      setModalVisible(false);
      getWeekends();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the weekend.');
    }
  };

  return (
    <View style={styles.container}>
        {/* Profile Content */}
        {activeTab === 'profile' && (
          <View style={styles.profileContainer}>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            <Button title="Logout" onPress={() => signOut(auth)} />
          </View>
        )}

        {/* Response Message */}
        {responseMessage ? (
          <View style={styles.responseContainer}>
            <Text>{responseMessage}</Text>
          </View>
        ) : null}

        {/* weekends list */}
        {activeTab === 'weekends' && myWeekends ? (
        <View style={styles.container}>
          <FlatList
            data={myWeekends}
            renderItem={({ item }) => (
              <WeekendCard weekend={item} onPress={handleCardPress} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        ) : null}
        
        
      {/* Tabs */}
      <View style={styles.content}>
        {/* My Weekends Tab */}
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={handleWeekendPress}
        >
          <Ionicons name="calendar-outline" size={24} color={activeTab === 'weekends' ? '#007AFF' : '#000'} />
          <Text style={[styles.tabText, activeTab === 'weekends' && styles.activeTabText]}>My Weekends</Text>
        </TouchableOpacity>

        {/* Profile Tab */}
        <TouchableOpacity
          style={[styles.tabButton]}
          onPress={handleProfilePress}
        >
          <Ionicons name="person-outline" size={24} color={activeTab === 'profile' ? '#007AFF' : '#000'} />
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* "+" Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPress}
      >
        <Ionicons name="add" size={36} color="#FFF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Weekend</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter weekend name"
              value={weekendName}
              onChangeText={setWeekendName}
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Create"
                onPress={handleCreateWeekend}
                disabled={weekendName.length < 3}
              />
              <Button title="Cancel" onPress={handleCloseModal} color="#FF3B30" />
            </View>
          </View>
        </View>
      </Modal>
    </View>

    
  );
};

export default HomeScreen;
