import { View } from 'react-native';
import String from './string';

let guitarStyles = {
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingLeft: 20,
   paddingRight: 20,

   width: '75%',
   height: 500,
   backgroundColor: '#000000',
}

export default function Guitar() {
   return (
      <View style={guitarStyles}>
         <String width={13} material="brass" /> 
         <String width={11} material="brass" />
         <String width={9} material="brass" />
         <String width={5} />
         <String width={4} />
         <String width={3} />
      </View>
   );
}