import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import Guitar from './src/components/guitar';
import { getOffsetNoteSymbol, getNoteSymbolFromString, NoteSymbol } from './src/music';
import NoteMap from './src/noteMap';
import getNotes from './src/getNotes';

const highlightedNotes = new NoteMap( );
const scaleNotes = new NoteMap( );

function getChordFromKeyAndOffset( key, offset ) {
  let chord = NoteSymbol[ getOffsetNoteSymbol( getNoteSymbolFromString( key ), offset ) ].replace( 'Sharp', '#' );
  if ( offset === 1 || offset === 6 || offset === 8 ) {
    return chord;
  }
  return chord.concat( 'm' );
}

export default function App( ) {
  const [ chord, setChord ] = React.useState( 'A' );
  const [ key, setKey ] = React.useState( 'E' );
  const [ activeChordButton, setActiveChordButton ] = React.useState( -1 );

  React.useEffect( ( ) => {
    scaleNotes.reset( );
    highlightedNotes.reset( );
    scaleNotes.update( getNotes( key.concat( 'scale' ) ) );
  }, [ key ] );
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder='Key'
        maxLength={2}
        onChangeText={ ( value ) => { setKey( value ); } }
      />

      <View style={styles.chordsWrapper}>
        {[ 1, 3, 5, 6, 8, 10, 12 ].map( ( offset, index ) => {
          const chord = getChordFromKeyAndOffset( key, offset );

          return (
            <Pressable
              style={ [ styles.chord, ( activeChordButton === index ) && { backgroundColor: '#909090' } ] }
              onPress={ ( ) => {
                highlightedNotes.reset( );
                if ( activeChordButton === index ) {
                  setActiveChordButton( -1 );
                  setChord( '' );
                }
                else {
                  setActiveChordButton( index );
                  setChord( chord );
                  highlightedNotes.update( getNotes( chord ) );
                }
              }}
            >
              <Text>{ chord }</Text>
            </Pressable>
          );
        })}
      </View>

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

  chordsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: "80%",
    marginBottom: 10,
  },

  chord: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    minWidth: "7%",
    padding: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000",
    color: "#000",
  },
});
