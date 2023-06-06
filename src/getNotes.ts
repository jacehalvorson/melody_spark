import { NoteSymbol, GuitarString, numSymbols, getNoteSymbolFromString } from './music';
import Note from './note';

export default function getNotes( chord: string ): Note[] {
   if ( chord.length < 1 ) {
      return [];
   }

   let baseNoteSymbol: NoteSymbol;
   let chordNoteOffsets: number[] = [ 1 ];

   // Find the base note (e.g. A, B, C, etc.)
   baseNoteSymbol = getNoteSymbolFromString( chord[0] )

   // Find the chord scale degrees
   // Check for sharp and flat symbols
   let startOfRestOfString: number;
   if ( chord[1] === '#' ) {
      baseNoteSymbol = ( baseNoteSymbol + 1 ) % numSymbols;
      startOfRestOfString = 2;
   }  
   else if ( chord[1] === 'b' ) {
      baseNoteSymbol = ( baseNoteSymbol + ( numSymbols - 1 ) ) % numSymbols;
      startOfRestOfString = 2;
   }
   else {
      startOfRestOfString = 1;
   }

   // Match on the rest of the chord string for chord types
   switch ( chord.substring( startOfRestOfString ) ) {
      case 'm':
         // Minor chord ex. 'Am'
         chordNoteOffsets = [ 1, 4, 8 ];
         break;
      case '7':
      case 'maj7':
         // Dominant 7th chord ex. 'A7'
         chordNoteOffsets = [ 1, 5, 8, 11 ];
         break;
      case 'm7':
         // Minor 7th chord ex. 'Am7'
         chordNoteOffsets = [ 1, 4, 8, 11 ];
         break;
      case 'sus':
      case 'sus4':
         // Suspended 4th chord ex. 'Asus4'
         chordNoteOffsets = [ 1, 6, 8 ];
         break;
      case 'scale':
         // Pentatonic scale ex. 'Apentatonic'
         chordNoteOffsets = [ 1, 3, 5, 8, 10, 12. ];
         break;
      case '':
         // Major chord ex. 'A'
         chordNoteOffsets = [ 1, 5, 8 ];
         break;
      default:
         return [];
   }

   // Find the notes of the chord
   const baseNote: Note = new Note( GuitarString.E, baseNoteSymbol % numSymbols );
   const chordNotes: Note[] = baseNote.getChordNotes( chordNoteOffsets );
   return chordNotes;
}