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
const minNoteIndex = 0; // open low E string
const maxNoteIndex = (numSymbols * 3) + NoteSymbol.D; // D on the 22nd fret of the high E string

// Bounds on fret numbers are based on my guitar
const minFretNumber = 0; // open string
const maxFretNumber = 22; // 22nd fret

/* ---------------------- Helper functions ------------------------ */
function getOpenStringNoteSymbol( string: GuitarString ): NoteSymbol {
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

function getOpenStringNoteIndex( string: GuitarString ): number {
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


/* ---------------------- Classes ------------------------ */
export class Note {
   constructor( public guitarString: GuitarString, public fretNumber: number ) {
      // Set the private string variable
      this.string = guitarString

      // Set the private fret variable
      if ( fretNumber < minFretNumber || fretNumber > maxFretNumber ) {
         throw new Error(`Invalid fret number: ${fretNumber}`);
      }
      this.fret = fretNumber;

      // Set the private symbol variable
      const stringOpenNoteSymbol = getOpenStringNoteSymbol( this.string );
      this.symbol = ( stringOpenNoteSymbol + this.fret ) % numSymbols;

      // Set the private index variable
      const noteIndex = getOpenStringNoteIndex( this.string ) + this.fret;
      if ( noteIndex >= minNoteIndex && noteIndex <= maxNoteIndex ) {
         this.index = noteIndex;
      }
      else {
         throw new Error(`Note index ${noteIndex} is out of range. Must be between ${minNoteIndex} and ${maxNoteIndex}`);
      }
   }

   public getNoteIndex( ): number {
      return this.index;
   }

   public getString( ): GuitarString {
      return this.string;
   }

   public getFret( ): number {
      return this.fret;
   }

   public getSymbol( ): NoteSymbol {
      return this.symbol;
   }

   public toString( ): string {
      return `Note: ${NoteSymbol[ this.symbol ]} at Fret ${this.fret} on string ${GuitarString[this.string]} (index ${this.index})`;
   }

   // Returns a list of notes that are a given scale degree of this note.
   // Ex. The 5th of an open E string is a B, so this would return a list
   // of every B on the fretboard.
   public getScaleDegreeNotes( noteOffset: number ): Note[] {
      let scaleDegreeNotes: Note[] = [];

      // Find the note symbol of the scale degree
      const targetNoteSymbol = ( this.symbol + noteOffset - 1 ) % numSymbols;

      // Check each string for notes with the target symbol
      for ( const guitarString in GuitarString ) {
         const guitarStringIndex = Number( guitarString );
         if ( isNaN( guitarStringIndex ) ) {
            continue;
         }

         const openStringNoteSymbol = getOpenStringNoteSymbol( guitarStringIndex );

         let targetFret = ( targetNoteSymbol - openStringNoteSymbol ) % numSymbols;
         if ( targetFret < 0 ) {
            targetFret += numSymbols;
         }
         scaleDegreeNotes.push( new Note( guitarStringIndex, targetFret ) );
         if ( targetFret + numSymbols <= maxFretNumber ) {
            scaleDegreeNotes.push( new Note( guitarStringIndex, targetFret+numSymbols ) );
         }
      }
      
      return scaleDegreeNotes;
   }

   // Returns a list of notes that are a given chord of this note.
   // Ex. An E major chord (relative notes 1, 5, 8) finds all E, 
   // G#, and B notes on the fretboard.
   // Ex. An E minor chord would find relative notes 1, 4, and 8.
   public getChordNotes( chord: number[] ): Note[] {
      let chordNotes: Note[] = [];

      chord.forEach( relativeNote => {
         chordNotes = chordNotes.concat( this.getScaleDegreeNotes( relativeNote ) );
      });

      return chordNotes;
   }

   private string: GuitarString;
   private fret: number;
   private symbol: NoteSymbol;
   private index: number;
}