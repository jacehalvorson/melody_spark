/* ---------------------- Types ------------------------ */
export const numSymbols = 12; // Number of symbols in an octave (12 notes in a chromatic scale)
export enum NoteSymbol {
   E, // 0
   F,
   FSharp,
   G,
   GSharp,
   A,
   ASharp,
   B,
   C,
   CSharp,
   D,
   DSharp, // 11 (numSymbols - 1)
}

export enum GuitarString {
   E,
   A,
   D,
   G,
   B,
   e,
}

/* ---------------------- Constants ------------------------ */
// Note indexes are identifiers for a note with a specific octave and symbol/offset.
// Ex. the second fret on the G string is an A in octave 1, so it's note index
// is (numSymbols * 1) + NoteSymbol.A = (12 * 1) + 5 = 17
export const minNoteIndex = 0; // open low E string
export const maxNoteIndex = (numSymbols * 3) + NoteSymbol.D; // D on the 22nd fret of the high E string

// Bounds on fret numbers are based on my guitar
export const minFretNumber = 0; // open string
export const maxFretNumber = 22; // 22nd fret

/* ---------------------- Helper functions ------------------------ */
export function getOpenStringNoteSymbol( string: GuitarString ): NoteSymbol {
   switch ( string ) {
      case GuitarString.E:
         return NoteSymbol.E;
      case GuitarString.A:
         return NoteSymbol.A;
      case GuitarString.D:
         return NoteSymbol.D;
      case GuitarString.G:
         return NoteSymbol.G;
      case GuitarString.B:
         return NoteSymbol.B;
      case GuitarString.e:
         return NoteSymbol.E;
      default:
         throw new Error(`Invalid string: ${string}`);
   }
}

export function getOpenStringNoteIndex( string: GuitarString ): number {
   switch ( string ) {
      case GuitarString.E:
         return 0;
      case GuitarString.A:
         return 5;
      case GuitarString.D:
         return 10;
      case GuitarString.G:
         return 15;
      case GuitarString.B:
         return 19;
      case GuitarString.e:
         return 24;
      default:
         throw new Error(`Invalid string: ${string}`);
   }
}

export function getOffsetNoteSymbol( baseNote: NoteSymbol, noteOffset: number ): NoteSymbol {
   return ( baseNote + noteOffset - 1 ) % numSymbols;
}

export function getNoteSymbolFromString( chordString: string ): ( NoteSymbol | null ) {
   let noteSymbol: ( NoteSymbol | null ) = NoteSymbol.E;
   
   switch ( chordString ) {
      case 'A':
         noteSymbol = NoteSymbol.A;
         break;
      case 'B':
         noteSymbol = NoteSymbol.B;
         break;
      case 'C':
         noteSymbol = NoteSymbol.C;
         break;
      case 'D':
         noteSymbol = NoteSymbol.D;
         break;
      case 'E':
         noteSymbol = NoteSymbol.E;
         break;
      case 'F':
         noteSymbol = NoteSymbol.F;
         break;
      case 'G':
         noteSymbol = NoteSymbol.G;
         break;
      default:
         // Indication of an invalid string note
         noteSymbol = null;
   }

   return noteSymbol;
}