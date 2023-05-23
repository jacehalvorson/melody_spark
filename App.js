import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Guitar from './src/components/guitar';
import { GuitarString, Note } from './src/music';

export default function App() {
  const [ chord, setChord ] = React.useState( 'Em' );
  const note = new Note( GuitarString.D, 7 );

  return (
    <View style={styles.container}>
      <Text>Backing track chord: {chord}</Text>
      <TextInput
        style={styles.input}
        placeholder='Em'
        maxLength='2'
        onChangeText={ ( value ) => setChord( value ) } />
      <Guitar />
      <Text>
        {/* {note.getChordNotes( [1, 3, 5] ).map( note => note.toString() ).join( '\n' )} */}
      </Text>
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
