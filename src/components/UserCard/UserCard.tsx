import React from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';


const UserCard = (props: {user: string}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{props.user}</Text>
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

export default UserCard;
