import { GuitarString, maxFretNumber } from "./music";
import Note from "./note";

export default class noteList {
   constructor( public notes: Note[] ) {
      this.noteMap = [];
      this.reset( );
   }

   public getNoteMap( ): boolean[][] {
      return this.noteMap;
   }

   public reset( ) {
      this.noteMap = [];
      for ( const string in GuitarString ) {
         this.noteMap[ string ] = [];
         for ( let fret = 0; fret < maxFretNumber; fret++ ) {
            this.noteMap[ string ][ fret ] = false;
         }
      }
   }

   public update( notes: Note[ ] ) {
      this.reset( );
      for ( const note of notes ) {
         this.noteMap[ note.getString( ) ][ note.getFret( ) ] = true;
      }
   }
      
   private noteMap: boolean[][];
}