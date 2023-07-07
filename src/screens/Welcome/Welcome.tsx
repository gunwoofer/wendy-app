import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>

        <Image
            style={styles.logo}
            source={require('../../../assets/logo_transparent1.png')}
        />

        <View style={styles.buttons}>
        <Button title="Sign in" buttonStyle={styles.buttonSignIn} onPress={() => navigation.navigate('Sign In')} />
        <Button title="Sign up" type="outline" buttonStyle={styles.buttonSignUp} onPress={() => navigation.navigate('Sign Up')} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    flex: 1,
  },

  buttonSignIn: {
    marginTop: 10,
    backgroundColor: 'orange'
  },

  buttonSignUp: {
    marginTop: 10,
    backgroundColor: 'blue'
  },

  logo: {
    width:'50%',
    height:'50%'
  }
});

export default WelcomeScreen;