import { StyleSheet } from 'react-native';


// export const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F5F5F5',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//     },
//     content: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       width: '100%',
//       paddingHorizontal: 40,
//       paddingVertical: 8,
//       backgroundColor: '#FFF',
//       elevation: 2,
//     },
//     tabButton: {
//       alignItems: 'center',
//     },
//     tabText: {
//       fontSize: 12,
//       marginTop: 4,
//     },
//     activeTabText: {
//       color: '#007AFF',
//     },
//     addButton: {
//       position: 'absolute',
//       bottom: 16,
//       alignSelf: 'center',
//       backgroundColor: '#007AFF',
//       borderRadius: 100,
//       padding: 16,
//       elevation: 4,
//     },
//     modalContainer: {
//       flex: 1,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalContent: {
//       backgroundColor: '#FFF',
//       padding: 20,
//       borderRadius: 8,
//       width: '80%',
//     },
//     modalTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 16,
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#CCC',
//       borderRadius: 4,
//       padding: 8,
//       marginBottom: 16,
//     },
//     modalButtonContainer: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
//     responseContainer: {
//         bottom: '30%'
//     },
//     profileContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//     profileEmail: {
//     fontSize: 16,
//     marginBottom: 16,
//     },
//   });

export const styles = StyleSheet.create({
    content: {
        padding:150
    },
    container: {
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