import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import Guitar from './src/components/guitar';
import BackingTrack from './src/components/backingTrack';
import { getOffsetNoteSymbol, getNoteSymbolFromString, NoteSymbol } from './src/music';
import NoteMap from './src/noteMap';
import getNotes from './src/getNotes';

const highlightedNotes = new NoteMap( );
const scaleNotes = new NoteMap( );

function getChordFromKeyAndOffset( key, offset ) {
  let chord = NoteSymbol[ getOffsetNoteSymbol( getNoteSymbolFromString( key ), offset ) ].replace( 'Sharp', '#' );

  // Add an 'm' if necessary
  chord = ( ( offset === 1 || offset === 6 || offset === 8 )
                ? chord // Major
                : chord.concat( 'm' ) ); // Minor

  return chord;
}

export default function App( ) {
  const [ chord, setChord ] = React.useState( 'A' );
  const [ key, setKey ] = React.useState( 'E' );
  const [ activeChordButton, setActiveChordButton ] = React.useState( -1 );
  const [ scaleNoteMap, setScaleNoteMap ] = React.useState( scaleNotes.getNoteMap( ) );
  const [ highlightedNoteMap, setHighlightedNoteMap ] = React.useState( highlightedNotes.getNoteMap( ) );

  // Triggered when user changes key, slight delay to allow typing fully
  React.useEffect( ( ) => {
    const timeoutId = setTimeout( ( ) => {
      setActiveChordButton( -1 );

      scaleNotes.reset( );
      scaleNotes.update( getNotes( `${key}scale` ) );
      setScaleNoteMap( scaleNotes.getNoteMap( ) );
    }, 500 );

    return ( ) => clearTimeout( timeoutId );
  }, [ key ] );
  
  // Triggered any time a chord changes
  React.useEffect( ( ) => {
    const offsetArray = [ 1, 3, 5, 6, 8, 10, 12 ];
    console.log( `Active chord button ${activeChordButton}` );

    highlightedNotes.reset( );
    if ( activeChordButton != -1 ) {
      const newChord = getChordFromKeyAndOffset( key, offsetArray[ activeChordButton ] );
      setChord( newChord );
      highlightedNotes.update( getNotes( newChord ) );
    }

    setHighlightedNoteMap( highlightedNotes.getNoteMap( ) );
  }, [ activeChordButton ] );
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder='Key'
        maxLength={2}
        onChangeText={ ( value ) => {
          if ( getNoteSymbolFromString( value ) !== null ) {
            setKey( value );
          }
        }}
      />
      <View style={styles.chordsWrapper}>
        {[ 1, 3, 5, 6, 8, 10, 12 ].map( ( offset, index ) => {
          const chord = getChordFromKeyAndOffset( key, offset );

          return (
            <Pressable
              key={ index }
              style={ [ styles.chord, ( activeChordButton === index ) && { backgroundColor: '#909090' } ] }
              onPress={ ( ) => {
                if ( activeChordButton === index ) {
                  setActiveChordButton( -1 );
                }
                else {
                  setActiveChordButton( index );
                }
              }}
            >
              <Text>{ chord }</Text>
            </Pressable>
          );
        })}
      </View>
      <BackingTrack />
      <Guitar notesDisplayed={highlightedNoteMap}
              scaleNotes={scaleNoteMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  input: {
    borderColor: "gray",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginTop: 50,
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
