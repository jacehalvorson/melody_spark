import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Guitar from './src/components/guitar';
import { GuitarString } from './src/music';
import Note from './src/note';
import NoteMap from './src/noteMap';
import getNotes from './src/getChordNotesFromString';

const highlightedNotes = new NoteMap( );
const scaleNotes = new NoteMap( );

export default function App( ) {
  const [ chord, setChord ] = React.useState( 'A' );
  const [ key, setKey ] = React.useState( 'E' );

  highlightedNotes.update( getNotes( chord ) );
  scaleNotes.update( getNotes( 'Epentatonic' ) );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Em'
        maxLength={5}
        onChangeText={ ( value ) => { setChord( value ); highlightedNotes.reset( ); scaleNotes.reset( ) } } />
        <Guitar notesDisplayed={highlightedNotes.getNoteMap( )}
                scaleNotes={scaleNotes.getNoteMap( )} />
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
