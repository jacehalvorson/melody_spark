const numSymbols = 12;


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

// Note indexes are identifiers for a note with a specific octave and symbol/offset.
// Ex. the second fret on the G string is an A in octave 1, so it's note index
// is (numSymbols * 1) + NoteSymbol.A = (12 * 1) + 5 = 17
const minNoteIndex = 0; // Defined by the lowest note a guitar can play (open low E string)
const maxNoteIndex = (numSymbols * 3) + NoteSymbol.D; // Defined by the highest note my guitar can play (D on the 22nd fret of the high E string)

export class Note {
   constructor(public symbol: NoteSymbol, public octave: number) {
      const noteIndex = (octave * numSymbols) + symbol;
      if ( noteIndex < minNoteIndex || noteIndex > maxNoteIndex ) {
         throw new Error(`Note index ${noteIndex} is out of range. Must be between ${minNoteIndex} and ${maxNoteIndex}`);
      }
      else {
         this.index = noteIndex;
      }
   }

   public index: number;
}