import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Guitar from './src/components/guitar';
import { GuitarString } from './src/music';
import Note from './src/note';
import NoteMap from './src/noteMap';
import { getChordNotesFromString } from './src/getChordNotesFromString';

export default function App() {
  const [ chord, setChord ] = React.useState( 'Em' );
  let highlightedNotes = new NoteMap( );
  highlightedNotes.update( getChordNotesFromString( chord ) );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Em'
        maxLength={5}
        onChangeText={ ( value ) => { setChord( value ); highlightedNotes.reset( ) } } />
      <Guitar notesDisplayed={highlightedNotes.getNoteMap( )} />
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
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
