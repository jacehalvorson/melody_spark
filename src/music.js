"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.getOpenStringNoteIndex = exports.getOpenStringNoteSymbol = exports.GuitarString = exports.NoteSymbol = void 0;
/* ---------------------- Types ------------------------ */
var numSymbols = 12; // Number of symbols in an octave (12 notes in a chromatic scale)
var NoteSymbol;
(function (NoteSymbol) {
    NoteSymbol[NoteSymbol["E"] = 0] = "E";
    NoteSymbol[NoteSymbol["F"] = 1] = "F";
    NoteSymbol[NoteSymbol["FSharp"] = 2] = "FSharp";
    NoteSymbol[NoteSymbol["G"] = 3] = "G";
    NoteSymbol[NoteSymbol["GSharp"] = 4] = "GSharp";
    NoteSymbol[NoteSymbol["A"] = 5] = "A";
    NoteSymbol[NoteSymbol["ASharp"] = 6] = "ASharp";
    NoteSymbol[NoteSymbol["B"] = 7] = "B";
    NoteSymbol[NoteSymbol["C"] = 8] = "C";
    NoteSymbol[NoteSymbol["CSharp"] = 9] = "CSharp";
    NoteSymbol[NoteSymbol["D"] = 10] = "D";
    NoteSymbol[NoteSymbol["DSharp"] = 11] = "DSharp";
})(NoteSymbol = exports.NoteSymbol || (exports.NoteSymbol = {}));
var GuitarString;
(function (GuitarString) {
    GuitarString[GuitarString["E"] = 0] = "E";
    GuitarString[GuitarString["A"] = 1] = "A";
    GuitarString[GuitarString["D"] = 2] = "D";
    GuitarString[GuitarString["G"] = 3] = "G";
    GuitarString[GuitarString["B"] = 4] = "B";
    GuitarString[GuitarString["e"] = 5] = "e";
})(GuitarString = exports.GuitarString || (exports.GuitarString = {}));
/* ---------------------- Constants ------------------------ */
// Note indexes are identifiers for a note with a specific octave and symbol/offset.
// Ex. the second fret on the G string is an A in octave 1, so it's note index
// is (numSymbols * 1) + NoteSymbol.A = (12 * 1) + 5 = 17
var minNoteIndex = 0; // open low E string
var maxNoteIndex = (numSymbols * 3) + NoteSymbol.D; // D on the 22nd fret of the high E string
// Bounds on fret numbers are based on my guitar
var minFretNumber = 0; // open string
var maxFretNumber = 22; // 22nd fret
/* ---------------------- Helper functions ------------------------ */
function getOpenStringNoteSymbol(string) {
    switch (string) {
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
            throw new Error("Invalid string: ".concat(string));
    }
}
exports.getOpenStringNoteSymbol = getOpenStringNoteSymbol;
function getOpenStringNoteIndex(string) {
    switch (string) {
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
            throw new Error("Invalid string: ".concat(string));
    }
}
exports.getOpenStringNoteIndex = getOpenStringNoteIndex;
function getNoteOffsetFromScaleDegree(scaleDegree) {
    switch (scaleDegree) {
        case 1:
            return 0;
        case 2:
            return 2;
        case 3:
            return 4;
        case 4:
            return 5;
        case 5:
            return 7;
        case 6:
            return 9;
        case 7:
            return 11;
        default:
            throw new Error("Invalid scale degree: ".concat(scaleDegree));
    }
}
var Note = /** @class */ (function () {
    function Note(guitarString, fretNumber) {
        this.guitarString = guitarString;
        this.fretNumber = fretNumber;
        // Set the private string variable
        this.string = guitarString;
        // Set the private fret variable
        if (fretNumber < minFretNumber || fretNumber > maxFretNumber) {
            throw new Error("Invalid fret number: ".concat(fretNumber));
        }
        this.fret = fretNumber;
        // Set the private symbol variable
        var stringOpenNoteSymbol = getOpenStringNoteSymbol(this.string);
        this.symbol = (stringOpenNoteSymbol + this.fret) % numSymbols;
        // Set the private index variable
        var noteIndex = getOpenStringNoteIndex(this.string) + this.fret;
        if (noteIndex >= minNoteIndex && noteIndex <= maxNoteIndex) {
            this.index = noteIndex;
        }
        else {
            throw new Error("Note index ".concat(noteIndex, " is out of range. Must be between ").concat(minNoteIndex, " and ").concat(maxNoteIndex));
        }
    }
    Note.prototype.getNoteIndex = function () {
        return this.index;
    };
    Note.prototype.getString = function () {
        return this.string;
    };
    Note.prototype.getFret = function () {
        return this.fret;
    };
    Note.prototype.getSymbol = function () {
        return this.symbol;
    };
    // Returns a list of notes that are a given scale degree of this note.
    // Ex. The 5th of an open E string is a B, so this would return a list
    // of every B on the fretboard.
    Note.prototype.getScaleDegreeNotes = function (scaleDegree) {
        var scaleDegreeNotes = [];
        // Find the note symbol of the scale degree
        var noteOffset = getNoteOffsetFromScaleDegree(scaleDegree);
        var targetNoteSymbol = (this.symbol + noteOffset) % numSymbols;
        // Check each string for notes with the target symbol
        for (var guitarString in GuitarString) {
            var guitarStringIndex = Number(guitarString);
            if (isNaN(guitarStringIndex)) {
                continue;
            }
            var openStringNoteSymbol = getOpenStringNoteSymbol(guitarStringIndex);
            var targetFret = (targetNoteSymbol - openStringNoteSymbol) % numSymbols;
            if (targetFret < 0) {
                targetFret += numSymbols;
            }
            scaleDegreeNotes.push(new Note(guitarStringIndex, targetFret));
        }
        return scaleDegreeNotes;
    };
    Note.prototype.print = function () {
        console.log("Note: ".concat(NoteSymbol[this.symbol], " at Fret ").concat(this.fret, " on string ").concat(GuitarString[this.string], " (index ").concat(this.index, ")"));
    };
    return Note;
}());
exports.Note = Note;
var exampleNote = new Note(GuitarString.D, 14);
exampleNote.print();
var exampleScaleDegreeNotes = exampleNote.getScaleDegreeNotes(5);
exampleScaleDegreeNotes.forEach(function (note) { return note.print(); });
