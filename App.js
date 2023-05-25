import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Guitar from './src/components/guitar';
import { GuitarString } from './src/music';
import Note from './src/note';
import { getChordNotesFromString } from './src/getChordNotesFromString';

export default function App() {
  const [ chord, setChord ] = React.useState( 'Em' );

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder='Em'
        maxLength={2}
        onChangeText={ ( value ) => setChord( value ) } /> */}
      <Guitar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
