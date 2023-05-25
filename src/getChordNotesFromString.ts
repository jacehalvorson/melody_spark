import { Note, NoteSymbol, GuitarString, numSymbols } from './music';

export function getChordNotesFromString( chord: string ): Note[] {
   if ( chord.length < 1 || chord.length > 5 ) {
      throw new Error(`Invalid chord: ${chord}`);
   }

   let baseNoteSymbol: NoteSymbol;
   let chordNoteOffsets: number[] = [ 1 ];

   // Find the base note of the chord
   switch ( chord[0] ) {
      case 'A':
         baseNoteSymbol = NoteSymbol.A;
         break;
      case 'A#':
         baseNoteSymbol = NoteSymbol.ASharp;
         break;
      case 'B':
         baseNoteSymbol = NoteSymbol.B;
         break;
      case 'C':
         baseNoteSymbol = NoteSymbol.C;
         break;
      case 'C#':
         baseNoteSymbol = NoteSymbol.CSharp;
         break;
      case 'D':
         baseNoteSymbol = NoteSymbol.D;
         break;
      case 'D#':
         baseNoteSymbol = NoteSymbol.DSharp;
         break;
      case 'E':
         baseNoteSymbol = NoteSymbol.E;
         break;
      case 'F':
         baseNoteSymbol = NoteSymbol.F;
         break;
      case 'F#':
         baseNoteSymbol = NoteSymbol.FSharp;
         break;
      case 'G':
         baseNoteSymbol = NoteSymbol.G;
         break;
      case 'G#':
         baseNoteSymbol = NoteSymbol.GSharp;
         break;
      default:
         throw new Error(`Invalid chord: ${chord}`);
   }

   // Find the chord scale degrees
   if ( chord.length === 1 ) {
      // Major chord ex. 'A'
      chordNoteOffsets = [ 1, 5, 8 ];
   }
   else {
      switch ( chord[1] ) {
         case 'm':
            // Minor chord ex. 'Am'
            chordNoteOffsets = [ 1, 4, 8 ];
            break;
         case '7':
            // Dominant 7th chord ex. 'A7'
            chordNoteOffsets = [ 1, 5, 8, 11 ];
            break;
         default:
            throw new Error(`Invalid chord: ${chord}`);
      }
   }

   // Find the notes of the chord
   const baseNote: Note = new Note( GuitarString.E, baseNoteSymbol % numSymbols );
   const chordNotes = baseNote.getChordNotes( chordNoteOffsets );
   return chordNotes;
}