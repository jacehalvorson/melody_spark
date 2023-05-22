import { View } from 'react-native';


export default function String( props: { width: number, material: string } ) {
   let stringStyles = {
      width: props.width,
      height: '100%',
      backgroundColor: ( props.material === "brass" ) ? '#e1c16e' : '#aaa9ad',
   }

   return (
      <View style={stringStyles}></View>
   );
}