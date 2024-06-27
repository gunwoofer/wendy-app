import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
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
  const handleAddCar = () => {
    // Handle the action to add a new car
    console.log("Add Car button pressed");
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
    </View>
  );
};

export default TransportScreen;
