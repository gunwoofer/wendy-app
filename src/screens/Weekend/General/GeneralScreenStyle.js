import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    container: {
      padding:5,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 24,
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
      justifyContent: 'flex-end',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    readOnlyFieldContainer: {
      flexDirection: 'row',
      alignItems: 'left',
      marginBottom: 10,
      fontSize: "50em"
    },
    label: {
      fontWeight: 'bold',
      marginRight: 10,
      width: 100, // Adjust the width based on your preference
      fontSize: 17
    },
    inputFieldContainer: {
      width: '100%'
    },
    readOnlyText: {
      fontSize: 17, // Change the font size here
    },
    dateReadOnly: {
      fontWeight: 'bold',
      color: 'blue',
      fontSize: 15,
    },
    dateContainer: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      marginBottom: 10 
    },
    editIcon: {
      position: 'absolute',
      top: 10,
      right: 10
    }
  });