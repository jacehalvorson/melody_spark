import { GuitarString, maxFretNumber } from "./music";
import Note from "./note";

export default class NoteMap {
   constructor( public notes: Note[] ) {
      this.noteMap = [];
      this.reset( );
   }

   public getNoteMap( ): boolean[][] {
      return this.noteMap;
   }

   public reset( ) {
      this.noteMap = [];
      for ( const guitarString in GuitarString ) {
         if ( isNaN( Number( guitarString ) ) ) {
            continue;
         }

         this.noteMap[ guitarString ] = [];
         for ( let fret = 0; fret <= maxFretNumber; fret++ ) {
            this.noteMap[ guitarString ][ fret ] = false;
         }
      }
   }

   public update( notes: Note[ ] ) {
      for ( const note of notes ) {
         this.noteMap[ note.getString( ) ][ note.getFret( ) ] = true;
      }
   }

   public toString( ): string {
      let noteMapString = '';
      for ( const guitarString in GuitarString ) {
         if ( isNaN( Number( guitarString ) ) ) {
            continue;
         }

         noteMapString += `${GuitarString[ guitarString ]}: `;
         for ( let fret = 0; fret <= maxFretNumber; fret++ ) {
            noteMapString += this.noteMap[ guitarString ][ fret ] ? 'X' : '-';
         }
         noteMapString += '\n';
      }

      return noteMapString;
   }
      
   private noteMap: boolean[][];
}