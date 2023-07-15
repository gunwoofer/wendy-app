import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './GuestScreenStyle';

const GuestsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Guests</Text>
    </View>
  );
};

export default GuestsScreen;