import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
   guitar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

      width: '75%',
      height: '80%',
      backgroundColor: '#000000',
   },

   fret: {
      width: '100%',
      height: 50,
      borderBottomWidth: 3,
      borderColor: '#929194',
      borderRadius: 2,

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

   stringWrapper: {
      position: 'absolute',
      flex: 1,

      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '85%',
      height: '100%',
   },
});

function String( props: { width: number } ) {
   let stringStyles = {
      width: props.width,
      height: '100%',
      backgroundColor: ( props.width > 3 ) ? '#bfa561' : '#aaa9ad',

      borderWidth: 1,
      borderColor: '#000000',
   }

   return (
      <View style={stringStyles}></View>
   );
}

function Fret( props: { index: number } ) {
   

   return (
      <View style={styles.fret}>
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

export default function Guitar( ) {   
   return (
      <View style={styles.guitar}>
         {/* Fretboard */}
         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map( ( fret ) => {
            return (
               <Fret index={fret} />
            );
         })}

         {/* Strings */}
         <View style={styles.stringWrapper}>
            {[1, 2, 3, 4, 5, 6].map( ( stringNumber ) => {
               return (
                  <String width={ 8 } />
               )
            })}
         </View>
      </View>
   );
}