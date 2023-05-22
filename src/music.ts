const numSymbols = 12; // Number of symbols in an octave (12 notes in a chromatic scale)
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
   E = NoteSymbol.E,
   A = NoteSymbol.A,
   D = NoteSymbol.D,
   G = (numSymbols * 1) + NoteSymbol.G,
   B = (numSymbols * 1) + NoteSymbol.B,
   e = (numSymbols * 2) + NoteSymbol.E,
}

// Note indexes are identifiers for a note with a specific octave and symbol/offset.
// Ex. the second fret on the G string is an A in octave 1, so it's note index
// is (numSymbols * 1) + NoteSymbol.A = (12 * 1) + 5 = 17
const minNoteIndex = 0; // open low E string
const maxNoteIndex = (numSymbols * 3) + NoteSymbol.D; // D on the 22nd fret of the high E string

export class Note {
   constructor(public stringLetter: string, public fretNumber: number) {
      // Set the private string variable
      switch ( stringLetter ) {
         case 'E':
            this.string = GuitarString.E;
            break;
         case 'A':
            this.string = GuitarString.A;
            break;
         case 'D':
            this.string = GuitarString.D;
            break;
         case 'G':
            this.string = GuitarString.G;
            break;
         case 'B':
            this.string = GuitarString.B;
            break;
         case 'e':
            this.string = GuitarString.e;
            break;
         default:
            throw new Error(`Invalid string letter: ${stringLetter}`);
      }

      // Set the private fret variable
      this.fret = fretNumber;

      // Set the private index variable
      const noteIndex = this.string + this.fret;
      if ( noteIndex >= minNoteIndex && noteIndex <= maxNoteIndex ) {
         this.index = noteIndex;
      }
      else {
         throw new Error(`Note index ${noteIndex} is out of range. Must be between ${minNoteIndex} and ${maxNoteIndex}`);
      }
   }

   public getOffsetNotes( baseNote: Note, relativeNoteNumber: number ): Note[] {
      if ( relativeNoteNumber < 0 || relativeNoteNumber > 7 ) {
         throw new Error(`Invalid relative note number: ${relativeNoteNumber}`);
      }

      const offsetNotes: Note[] = [];
      let baseNoteIndex: number = baseNote.index;
      let currentRelativeNoteNumber: number = 0;

      // Find the offset note based on the relative note number
      // TODO needs rework
      while ( currentRelativeNoteNumber < relativeNoteNumber ) {
         if ( currentRelativeNoteNumber === 3 || currentRelativeNoteNumber === 7 ) {
            baseNoteIndex += 1;
         }
         else {
            baseNoteIndex += 2;
         }
         currentRelativeNoteNumber += 1;
      }

         

      return offsetNotes;
   }

   public string: GuitarString;
   public fret: number;
   public index: number;
}