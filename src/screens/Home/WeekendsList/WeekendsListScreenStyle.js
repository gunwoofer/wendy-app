import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 40,
      paddingVertical: 8,
      backgroundColor: '#FFF',
      elevation: 2,
    },
    tabButton: {
      alignItems: 'center',
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
    },
    activeTabText: {
      color: '#007AFF',
    },
    addButton: {
      position: 'absolute',
      bottom: 16,
      alignSelf: 'center',
      backgroundColor: '#007AFF',
      borderRadius: 100,
      padding: 16,
      elevation: 4,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFF',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    responseContainer: {
        bottom: '30%'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    profileEmail: {
    fontSize: 16,
    marginBottom: 16,
    },
  });