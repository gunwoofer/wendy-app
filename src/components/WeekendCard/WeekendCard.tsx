import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Weekend } from '../../models/weekend';


const WeekendCard = (props: {weekend: Weekend, onPress: any}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => props.onPress(props.weekend)}>
      <Text style={styles.cardTitle}>{props.weekend.name}</Text>
      <Text style={styles.cardTitle}>{props.weekend.id}</Text>
      {/* Add more information from the weekend object */}
      {/* e.g., address, date, participants */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WeekendCard;
