import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    content: {
        padding:150
    },
    container: {
      padding:15,
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      justifyContent: 'flex-end'
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 24,
      resizeMode: 'cover',
      borderRadius: 8,
    },
    input: {
      width: '100%',
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    saveButton: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      borderRadius: 8,
      backgroundColor: '#007bff',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    tabs: {
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
  });