import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Note from '../note';
import { NoteSymbol } from '../music';
import NoteMap from '../noteMap';

const styles = StyleSheet.create({
   guitarContainer: {
      width: '65%',
      height: '80%',
      overflow: 'scroll',
   },
   
   guitar: {
      position: 'relative',
      flexGrow: 1,
      height: '200%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: '#000000',
      borderTopColor: '#ffffff',
      borderTopWidth: 3,
      borderRadius: 10,
   },

   fret: {
      position: 'relative',
      width: '100%',
      flex: 1,
      borderBottomWidth: 3,
      borderColor: '#c2c1c4',
      borderRadius: 4,
   },

   dotWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },

   dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#ffffff',
   },

   fretNumber: {
      position: 'absolute',
      top: '30%',
      left: -10,
   },

   noteWrapper: {
      position: 'absolute',
      left: -10,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
   },

   note: {
      position: 'relative',
      backgroundColor: '#627ABF',
      width: 25,
      height: 25,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#000000',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
   },

   stringWrapper: {
      position: 'absolute',
      flex: 1,

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '93%',
      height: '100%',
   },

   string: {
      width: 7,
      height: '100%',
      backgroundColor: '#bfa561',

      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 3,
   },
});

function String( props: { fretsHighlighted: (Note|null)[], scaleFrets: (Note|null)[] } ) {
   return (
      <View style={styles.string}>
         {/* Highlighted notes */}
         <View style={styles.noteWrapper}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map( ( fretIndex, index ) => {
               const highlightedFret = props.fretsHighlighted[ fretIndex ];
               const scaleFret = props.scaleFrets[ fretIndex ];
               let additionalStyles = {};
               let symbol = '';
               
               if ( highlightedFret !== null ) {
                  symbol = NoteSymbol[ highlightedFret.getSymbol( ) ].replace( 'Sharp', '#' );
                  additionalStyles = { opacity: 1 };
               }
               else if ( scaleFret !== null ) {
                  symbol = NoteSymbol[ scaleFret.getSymbol( ) ].replace( 'Sharp', '#' );
                  additionalStyles = { opacity: 0.5 };
               }
               else {
                  additionalStyles = { opacity: 0 };
               }

               return (
                  <View key={ index } style={Object.assign( {}, styles.note, additionalStyles )}>
                     <Text style={{color: 'white'}}>
                        {symbol}
                     </Text>
                  </View>
               );
            })}
         </View>
      </View>
   );
}

function Fret( props: { index: number } ) {
   return (
      <View style={styles.fret}>
         {/* Fret number displayed to the left of fret*/}
         <Text style={styles.fretNumber}>{props.index}</Text>

         {/* Dot in the middle of certain frets for reference while playing */}
         { ( [3, 5, 7, 9, 12, 15, 17, 19].includes( props.index ) )
            ? <Dot />
            : <></>
         }  
      </View>
   );
}

function Dot( ) {
   return (
      <View style={styles.dotWrapper}>
         <View style={styles.dot} />
      </View>
   );
}

export default function Guitar( props: { notesDisplayed: (Note|null)[][], scaleNotes: (Note|null)[][] } ) {
   return (
      <View style={styles.guitarContainer}>
         <ScrollView contentContainerStyle={styles.guitar}>
            {/* Fretboard */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map( ( fret, index ) => {
               return (
                  <Fret key={ index } index={fret} />
               );
            })}



            <View style={styles.stringWrapper}>
               {/* Strings */}
               {[0, 1, 2, 3, 4, 5].map( ( stringIndex, index ) => {
                  return (
                     <String key={ index }
                              fretsHighlighted={ props.notesDisplayed[ stringIndex ] }
                              scaleFrets={ props.scaleNotes[ stringIndex ] } />
                  )
               })}

            </View>
         </ScrollView>
      </View>
   );
}