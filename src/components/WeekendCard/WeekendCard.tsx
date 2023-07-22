import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Weekend } from '../../models/weekend';


const WeekendCard = (props: {weekend: Weekend, onPress: any}) => {

  const images = [
    require('../../../assets/chalets-mocks/1.jpg'),
    require('../../../assets/chalets-mocks/2.jpg'),
    require('../../../assets/chalets-mocks/3.jpg'),
    require('../../../assets/chalets-mocks/4.jpg'),
    require('../../../assets/chalets-mocks/5.jpg'),
    require('../../../assets/chalets-mocks/6.jpg'),
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => props.onPress(props.weekend)}>
      <Image source={getRandomImage()} style={styles.image} />
      <Text style={styles.name}>{props.weekend.name}</Text>
      <Text style={styles.email}>{props.weekend.participants}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  email: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
export default WeekendCard;
