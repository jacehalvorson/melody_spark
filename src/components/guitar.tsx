import { StyleSheet, View, Text } from 'react-native';
import { GuitarString, Note } from '../music';

const styles = StyleSheet.create({
   guitar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

      width: '75%',
      height: 500,
      backgroundColor: '#000000',
   },

   fret: {
      width: '100%',
      height: '10%',
      borderBottomWidth: 3,
      borderColor: '#aaa9ad',
      borderRadius: 2,

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },

   dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ffffff',
   },
});

function String( props: { width: number } ) {
   let stringStyles = {
      width: props.width,
      height: '100%',
      backgroundColor: ( props.width > 7 ) ? '#e1c16e' : '#aaa9ad',
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
         {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map( ( index ) => {
               return (
                  <Fret index={index} />
               );
            })
         }
         {/* <String width={13} /> 
         <String width={11} />
         <String width={9} />
         <String width={5} />
         <String width={4} />
         <String width={3} /> */}
      </View>
   );
}