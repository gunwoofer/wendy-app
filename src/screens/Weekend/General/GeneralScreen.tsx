import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, ImageStyle } from 'react-native';
import { styles } from './GeneralScreenStyle';
import { WeekendStackParamList } from '../WeekendScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

type GeneralScreenNavigationProp = StackNavigationProp<WeekendStackParamList, 'General'>;
type GeneralProps = {
    navigation: GeneralScreenNavigationProp;
    route: RouteProp<WeekendStackParamList, 'General'>;
};

const GeneralScreen = ({route, navigation}: GeneralProps) => {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [tricountLink, setTricountLink] = useState('');
  const [airbnbLink, setAirbnbLink] = useState('');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const saveReservation = () => {
    // Implement your save logic here
    // You can use the values of name, date, address, tricountLink, airbnbLink
  };


  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style = {styles.container}>
        <Image 
            style={styles.image as ImageStyle}
            source={require('../../../../assets/chalets-mocks/3.jpg')}
          />

        {/* <Button onPress={showDatepicker} title="Show time picker!" /> */}
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.input}> {date.toLocaleString()} </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          value ={route.params.weekend.name}
          onChangeText={setName}
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