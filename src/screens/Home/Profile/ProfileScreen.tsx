import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './ProfileScreenStyle';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../../../utils/hooks/useAuthentification';

const auth = getAuth();

const ProfileScreen = () => {
  const { user } = useAuthentication();
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileEmail}>{user?.email}</Text>
      <Button title="Logout" onPress={() => signOut(auth)} />
    </View>
  );
};

export default ProfileScreen;