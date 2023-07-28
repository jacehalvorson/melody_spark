import React from "react";
import { Text } from "react-native";
import { Audio } from "expo-av";

function getIntervalLengthFromBPM( bpm: number ) {
   const MILLISECONDS_PER_MINUTE = 60000;
   return ( MILLISECONDS_PER_MINUTE / bpm );
}

export default function BackingTrack() {
   const [ tempo, setTempo ] = React.useState( 60 );
   const metronomeClick = require( "../../assets/audio/metronome.mp3" );
   const metronomeRef = React.useRef<Audio.Sound | null>( null );

   // Initialize audio
   React.useEffect( ( ) => {
      const loadAudio = async () => {
         try {
           const { sound } = await Audio.Sound.createAsync( metronomeClick );
           metronomeRef.current = sound;
           console.log( 'Audio loaded successfully' );
         } catch ( error ) {
           console.log( 'Error loading audio: ', error );
         }
      };

      loadAudio();

      return ( ) => {
         // Clean up audio when component unmounts
         if ( metronomeRef.current ) {
            metronomeRef.current.unloadAsync( );
         }
      }
   }, [ ] );

   const playMetronomeClick = async ( ) => {
      if ( metronomeRef.current ) {
         await metronomeRef.current.stopAsync( );
         await metronomeRef.current.replayAsync( );
      }
   }

   // Start the backing track loop
   React.useEffect( ( ) => {
      const intervalLength = getIntervalLengthFromBPM( tempo );
      const interval = setInterval( async ( ) => {
         await playMetronomeClick( );
         console.log( `Interval ${intervalLength}ms` );
      }, intervalLength );

      // Clean up interval when component unmounts
      return ( ) => clearInterval( interval );
   }, [ tempo ] );

   return <Text>{tempo} BPM</Text>;
}