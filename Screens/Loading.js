import React from 'react';
import { StyleSheet,View} from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
export default function Loading() {
    return (
      <View style={styles.container}>
       <MaterialCommunityIcons name="popcorn" size={100} color="white" />
      </View>
    );
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: "center"
    },
    text: {
        color:'#2E2E2E',
        fontSize:35,
    }
  });