import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, ImageStyle, RefreshControl } from 'react-native';
import { styles } from './GeneralScreenStyle';
import { WeekendStackParamList } from '../WeekendScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useStoreActions, useStoreState } from '../../../state/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import WeekendService from '../../../services/WeekendService';
import { Weekend } from '../../../models/weekend';
import { SERVER_IP } from '@env';
import { Snackbar } from 'react-native-paper';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

type GeneralScreenNavigationProp = StackNavigationProp<WeekendStackParamList, 'General'>;
type GeneralProps = {
    navigation: GeneralScreenNavigationProp;
    route: RouteProp<WeekendStackParamList, 'General'>;
};

const GeneralScreen = ({route, navigation}: GeneralProps) => {

  const weekendService = WeekendService.getInstance();
  const currentWeekend = useStoreState(state => state.currentWeekend);
  const setCurrentWeekend = useStoreActions((actions) => actions.setWeekend);

  const [name, setName] = useState(currentWeekend?.name);
  const [address, setAddress] = useState(currentWeekend?.address);
  const [tricountLink, setTricountLink] = useState(currentWeekend?.tricount_link);
  const [reservationLink, setReservationLink] = useState(currentWeekend?.reservation_link);
  const [dateDebut, setDateDebut] = useState("2023-07-27")
  const [dateFin, setDateFin] = useState("2023-07-28")

  const [isDatePickerDebutVisible, setDatePickerDebutVisibility] = useState(false);
  const [isDatePickerFinVisible, setDatePickerFinVisibility] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSnackBarVisible, setSnackBarVisible] = useState(false);



  const showDatePickerDebut = () => {
    setDatePickerDebutVisibility(true);
  };

  const showDatePickerFin = () => {
    setDatePickerFinVisibility(true);
  };

  const hideDatePickerFin = () => {
    setDatePickerFinVisibility(false);
  };

  const hideDatePickerDebut = () => {
    setDatePickerDebutVisibility(false);
  };

  const handleConfirmDebut = (date: Date) => {
    setDateDebut(date.toISOString().split("T")[0])
    hideDatePickerDebut();
  };

  const handleConfirmFin = (date: Date) => {
    setDateFin(date.toISOString().split("T")[0])
    hideDatePickerFin();
  };

  const saveReservation = async() => {
    // Implement your save logic here
    // You can use the values of name, date, address, tricountLink, airbnbLink
    console.log("SAVING LOG :")
    console.log(name)
    console.log(address)
    console.log(tricountLink)
    console.log(reservationLink)
    console.log(dateDebut)
    console.log(dateFin)
    try {
      const response = await fetch(`${SERVER_IP}/updateWeekend/${currentWeekend?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"name": name, "address": address, "tricount_link": tricountLink, "reservation_link": reservationLink}),
      });
      const data = await response.json();
      setSnackBarVisible(true);
    } catch (error) {
      throw new Error("error updating the weekend");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const updatedWeekend: Weekend = await weekendService.getWeekendByIdAPI(currentWeekend!.id);
    console.log("REFRESHED SUCCESSFULL : ", updatedWeekend);
    setCurrentWeekend(updatedWeekend);
    setIsRefreshing(false);
  };


  return (
    <ScrollView contentContainerStyle = {styles.container} 
    refreshControl={ 
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    }
>
        {/* Image principale */}
        <Image 
            style={styles.image as ImageStyle}
            source={require('../../../../assets/chalets-mocks/3.jpg')}
          />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

          {/* Date de debut */}
          <Text>Du</Text>
          <Button title={dateDebut} onPress={showDatePickerDebut}></Button>

          <DateTimePickerModal
            isVisible={isDatePickerDebutVisible}
            mode="date"
            onConfirm={handleConfirmDebut}
            onCancel={hideDatePickerDebut}
            timeZoneOffsetInMinutes={0}
          />

          {/* Date de fin */}
          <Text>au</Text>
          <Button title={dateFin} onPress={showDatePickerFin} />

          <DateTimePickerModal
            isVisible={isDatePickerFinVisible}
            mode="date"
            onConfirm={handleConfirmFin}
            onCancel={hideDatePickerFin}
            timeZoneOffsetInMinutes={0}
          />
        </View>

        {/* Nom */}
        <TextInput
          style={styles.input}
          defaultValue ={currentWeekend?.name}
          onChangeText={setName}
        />

        {/* Adresse */}
        <TextInput
          style={styles.input}
          placeholder="Address"
          defaultValue={currentWeekend?.address}
          onChangeText={setAddress}
        />

        {/* Tricount */}
        <TextInput
          style={styles.input}
          placeholder="Tricount Link"
          defaultValue={currentWeekend?.tricount_link}
          onChangeText={setTricountLink}
        />

        {/* Reservation */}
        <TextInput
          style={styles.input}
          placeholder="Airbnb Link"
          defaultValue={currentWeekend?.reservation_link}
          onChangeText={setReservationLink}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveReservation}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <Snackbar
          visible={isSnackBarVisible}
          onDismiss={() => setSnackBarVisible(false)}
          duration={2500}
          style={{ backgroundColor: 'green' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="check" size={24} color="white" style={{ marginRight: 10}} />
            <Text style={{color: "white"}}>Weekend updated !</Text>
          </View>
        </Snackbar>
      </ScrollView>
  );
};

export default GeneralScreen;