
interface Note {
  title: string,
  id: number,
  content: string,
}


class NoteManager {
  private notes: Note[] = [];
  private idCounter: number = 0;

  addNote(title: string, content: string): Note {
    if (!title) {
      throw new Error("The title of the note cannot be empty")
    }

    const newNote: Note = { id: this.idCounter++, title, content };

    this.notes.push(newNote);

    return newNote;
  }

  editNote(id: number, title: string, content: string): Note | undefined {
    if (id == null) return undefined;
    const note = this.notes.find(note => note.id === id);
    if (!note) return undefined;
    note.title = title;
    note.content = content;
    return note;
  }

  deleteNote(id: number): boolean {
    if (id == null) return false;
    const index = this.notes.findIndex(note => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      return true;
    }
    return false;
  }

  getNote(id: number): Note | undefined {
    if (id == null) return undefined;
    const note = this.notes.find(note => note.id === id);
    return note
  }

  getNotes(): Note[] {
    return this.notes
  }
}


const myNotes = new NoteManager();



console.log('addNote', myNotes.addNote('title', 'content'));
console.log('editNote', myNotes.editNote(0, 'title2', 'content2'));
console.log('deleteNote', myNotes.deleteNote(123));
console.log('getNote', myNotes.getNote(0));
console.log('getNotes', myNotes.getNotes());


export {NoteManager}