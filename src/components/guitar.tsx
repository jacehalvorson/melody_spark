import { StyleSheet, View, Text } from 'react-native';
import Note from '../note';
import { NoteSymbol } from '../music';

const styles = StyleSheet.create({
   guitar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

      width: '55%',
      height: '80%',
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

      display: 'flex',
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
      left: -20,
   },

   noteWrapper: {
      position: 'absolute',
      left: -10,
      height: '100%',
      display: 'flex',
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

function String( props: { fretsDisplayed: Note[] } ) {
   return (
      <>
         <View style={styles.string}>
            {/* Highlighted notes */}
            <View style={styles.noteWrapper}>
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map( ( fretIndex ) => {
                  let additionalStyles = {};
                  if ( !props.fretsDisplayed[ fretIndex ] ) {
                     additionalStyles = { backgroundColor: 'transparent', borderColor: 'transparent' };
                  }
                  return (
                     <View style={Object.assign( {}, styles.note, additionalStyles )}>
                        {( props.fretsDisplayed[ fretIndex ] )
                              ? <Text style={{color: 'white'}}>
                                    {NoteSymbol[ props.fretsDisplayed[ fretIndex ].getSymbol( ) ].replace( 'Sharp', '#' )}
                                 </Text>
                              : <></>
                        }
                     </View>
                  );
               })}
            </View>
         </View>
      </>
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
      <View style={styles.dot}></View>
   );
}

export default function Guitar( props: { notesDisplayed: Note[][] } ) {   
   return (
      <View style={styles.guitar}>
         {/* Fretboard */}
         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map( ( fret ) => {
            return (
               <Fret index={fret} />
            );
         })}

         <View style={styles.stringWrapper}>
            {/* Strings */}
            {[0, 1, 2, 3, 4, 5].map( ( stringIndex ) => {
               return (
                  <String fretsDisplayed={ props.notesDisplayed[ stringIndex ] } />
               )
            })}

         </View>
      </View>
   );
}