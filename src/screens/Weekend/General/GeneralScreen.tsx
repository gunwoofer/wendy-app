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

const GeneralScreen = ({ route, navigation }: GeneralProps) => {

  const weekendService = WeekendService.getInstance();
  const currentWeekend = useStoreState(state => state.currentWeekend);
  const setCurrentWeekend = useStoreActions((actions) => actions.setWeekend);

  const [name, setName] = useState(currentWeekend!.name);
  const [address, setAddress] = useState(currentWeekend!.address);
  const [tricountLink, setTricountLink] = useState(currentWeekend!.tricount_link);
  const [reservationLink, setReservationLink] = useState(currentWeekend!.reservation_link);
  const [dateDebut, setDateDebut] = useState(currentWeekend!.date_debut)
  const [dateFin, setDateFin] = useState(currentWeekend!.date_fin)

  const [isDatePickerDebutVisible, setDatePickerDebutVisibility] = useState(false);
  const [isDatePickerFinVisible, setDatePickerFinVisibility] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSnackBarVisible, setSnackBarVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };


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

  const saveReservation = async () => {
    try {
      const weekend: Weekend = await weekendService.setWeekendAPI(currentWeekend!.id, name, address, tricountLink, reservationLink, dateDebut, dateFin)
      setCurrentWeekend(weekend);
      setSnackBarVisible(true);
      toggleEditMode();
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


  // Function to render the input fields
  const renderInputFields = () => {
    return (
      <>
        {/* Nom */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            defaultValue={currentWeekend?.name}
            onChangeText={setName}
          />
        </View>

        {/* Adresse */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            defaultValue={currentWeekend?.address}
            onChangeText={setAddress}
          />
        </View>


        {/* Tricount */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Tricount</Text>
          <TextInput
            style={styles.input}
            placeholder="Tricount Link"
            defaultValue={currentWeekend?.tricount_link}
            onChangeText={setTricountLink}
          />
        </View>


        {/* Reservation */}
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>Reservation</Text>
          <TextInput
            style={styles.input}
            placeholder="Airbnb Link"
            defaultValue={currentWeekend?.reservation_link}
            onChangeText={setReservationLink}
          />
        </View>
      </>
    );
  };

  // Function to render the read-only fields
  const renderReadOnlyFields = () => {
    return (
      <>
        <View style={styles.readOnlyFieldContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.readOnlyText}>{currentWeekend?.name}</Text>
        </View>
        <View style={styles.readOnlyFieldContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.readOnlyText}>{currentWeekend?.address}</Text>
        </View>
        <View style={styles.readOnlyFieldContainer}>
          <Text style={styles.label}>Tricount:</Text>
          <Text style={styles.readOnlyText}>{currentWeekend?.tricount_link}</Text>
        </View>
        <View style={styles.readOnlyFieldContainer}>
          <Text style={styles.label}>Airbnb:</Text>
          <Text style={styles.readOnlyText}>{currentWeekend?.reservation_link}</Text>
        </View>
      </>
    );
  };

  // Function to render the buttons based on the edit mode
  const renderButtons = () => {
    if (editMode) {
      // Show "Save" button in edit mode
      return (
        <TouchableOpacity style={styles.saveButton} onPress={saveReservation}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      );
    } else {
      // Show "Edit" button in read-only mode
      return (
        <TouchableOpacity style={styles.saveButton} onPress={toggleEditMode}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}
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

      <View style={styles.dateContainer}>

        {/* Date de debut */}
        <Text>Du </Text>
        {editMode ?
          <Button title={dateDebut || "DEBUT"} onPress={showDatePickerDebut}></Button>
        : 
          <Text style={styles.dateReadOnly}>{dateDebut || "DEBUT"}</Text>
        }

        <DateTimePickerModal
          isVisible={isDatePickerDebutVisible}
          mode="date"
          onConfirm={handleConfirmDebut}
          onCancel={hideDatePickerDebut}
          timeZoneOffsetInMinutes={0}
        />

        {/* Date de fin */}
        <Text> au </Text>
        {editMode ?
          <Button title={dateFin || "FIN"} onPress={showDatePickerFin} />
        : 
          <Text style={styles.dateReadOnly}>{dateFin || "FIN"}</Text>
        }
        <DateTimePickerModal
          isVisible={isDatePickerFinVisible}
          mode="date"
          onConfirm={handleConfirmFin}
          onCancel={hideDatePickerFin}
          timeZoneOffsetInMinutes={0}
        />
      </View>

      {/* Render the appropriate fields based on the edit mode */}
      {editMode ? renderInputFields() : renderReadOnlyFields()}

      {/* Render the buttons based on the edit mode */}
      {renderButtons()}

      <Snackbar
        visible={isSnackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        duration={2500}
        style={{ backgroundColor: 'green', marginBottom: 100 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="check" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: "white" }}>Weekend updated !</Text>
        </View>
      </Snackbar>
    </ScrollView>
  );
};

export default GeneralScreen;