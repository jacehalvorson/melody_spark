import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Guitar from './src/components/guitar';
import { GuitarString, Note } from './src/music';

export default function App() {
  const note = new Note( GuitarString.D, 7 ); 

  return (
    <View style={styles.container}>
      <Text>Fretboard:</Text>
      <Guitar />
      <Text>
        {note.getScaleDegreeNotes( 3 ).map( note => note.toString() ).join( '\n' )}
      </Text>
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
});
