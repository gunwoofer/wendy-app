import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './GeneralScreenStyle';
import { WeekendStackParamList } from '../WeekendScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type GeneralScreenNavigationProp = StackNavigationProp<WeekendStackParamList, 'General'>;
type GeneralProps = {
    navigation: GeneralScreenNavigationProp;
    route: RouteProp<WeekendStackParamList, 'General'>;
};

const GeneralScreen = ({route, navigation}: GeneralProps) => {

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [tricountLink, setTricountLink] = useState('');
  const [airbnbLink, setAirbnbLink] = useState('');
    
  return (
    <View style = {styles.container}>
        <Image
            source={require('../../../../assets/chalet-mock.jpg')}
            style={styles.image}
          />

        <TextInput
          style={styles.input}
          value ={route.params.weekend.name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Tricount Link"
          value={tricountLink}
          onChangeText={setTricountLink}
        />

        <TextInput
          style={styles.input}
          placeholder="Airbnb Link"
          value={airbnbLink}
          onChangeText={setAirbnbLink}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

      </View>
  );
};

export default GeneralScreen;