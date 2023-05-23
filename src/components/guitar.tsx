import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
   guitar: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,

      width: '75%',
      height: 500,
      backgroundColor: '#000000',
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

export default function Guitar() {
   return (
      <View style={styles.guitar}>
         <String width={13} /> 
         <String width={11} />
         <String width={9} />
         <String width={5} />
         <String width={4} />
         <String width={3} />
      </View>
   );
}