import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Weekend } from '../../models/weekend';
import { SERVER_IP } from '@env';


const WeekendCard = (props: {weekend: Weekend, onPress: any}) => {

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if(props.weekend)
      fetchImage().catch(console.error);
  }, [props.weekend]);

  const fetchImage = async () => {
    try {
      const response = await fetch(SERVER_IP + '/get_image/' + props.weekend.id);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    } catch (error) {
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => props.onPress(props.weekend)}>
      <Image source={{uri: imageUrl}} style={styles.image} />
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
