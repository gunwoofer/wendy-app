import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
  TouchableWithoutFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";
import { styles } from "./TransportScreenStyle";
import { Car } from "../../../models/car";

const mockCars: Car[] = [
  {
    id: 1,
    name: "Voiture de Valentin",
    matricule: "123",
    max_person: 5,
    start_address: "12 rue du gord",
    start_hour: "12:00",
    passagers: [],
  },
  {
    id: 2,
    name: "Voiture de Ben",
    matricule: "123",
    max_person: 7,
    start_address: "12 rue du gord",
    start_hour: "12:00",
    passagers: [],
  },
  {
    id: 3,
    name: "Voiture de Quentin",
    matricule: "123",
    max_person: 5,
    start_address: "12 rue du gord",
    start_hour: "12:00",
    passagers: [],
  },
];

const CarItem = ({ car }: { car: Car }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.name}>{car.name}</Text>
    <Text style={styles.detail}>Matricule: {car.matricule}</Text>
    <Text style={styles.detail}>Max Persons: {car.max_person}</Text>
    <Text style={styles.detail}>Start Address: {car.start_address}</Text>
    <Text style={styles.detail}>Start Hour: {car.start_hour}</Text>
  </View>
);

const TransportScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    maxPassengers: "",
    startDate: "",
    startAddress: "",
    isDriver: false,
  });

  const handleAddCar = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(form);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <FlatList
        data={mockCars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CarItem car={item} />}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddCar}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add Car</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Maximum Passengers"
                  keyboardType="numeric"
                  value={form.maxPassengers}
                  onChangeText={(text) =>
                    setForm({ ...form, maxPassengers: text })
                  }
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Starting Date"
                  value={form.startDate}
                  onChangeText={(text) => setForm({ ...form, startDate: text })}
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Departure Address"
                  value={form.startAddress}
                  onChangeText={(text) =>
                    setForm({ ...form, startAddress: text })
                  }
                  placeholderTextColor="#999"
                />
                <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>I am the driver</Text>
                  <Switch
                    value={form.isDriver}
                    onValueChange={(value) =>
                      setForm({ ...form, isDriver: value })
                    }
                  />
                </View>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default TransportScreen;
