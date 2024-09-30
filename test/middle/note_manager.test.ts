import { NoteManager } from '../../src/projects/middle/note_manager';
import { describe, it, expect,vi,beforeEach } from 'vitest';


describe('NoteManager',()=>{
    let noteManager: NoteManager;
    
    beforeEach(()=>{
        noteManager = new NoteManager();
    })


    describe('addNote',()=>{ 
        it('should add a note',()=>{
            const note = noteManager.addNote('Title','Content');
            expect(note).toMatchObject({ title: 'Title', content: 'Content' });
            expect(note.id).toBe(0);
            expect(noteManager.getNote.length).toBe(1);
        })

        it('should throw an error when adding a note with an empty title',()=>{
            const noteManager = new NoteManager();
            expect(()=> noteManager.addNote('', 'Content')).toThrow('The title of the note cannot be empty');
            expect(noteManager.getNotes().length).toBe(0);
        })
    })
    describe('editNote',()=>{
        it('should edit a note',()=>{
            const note = noteManager.addNote('Initial Title', 'Initial Content');
            const editedNote = noteManager.editNote(note.id, 'Edited Title', 'Edited Content');

            expect(editedNote).toMatchObject({ title: 'Edited Title', content: 'Edited Content' });
            expect(noteManager.getNote(note.id)).toMatchObject({ title: 'Edited Title', content: 'Edited Content' });
        })
        it('should return undefined when editing a non-existing note', ()=>{
            const result = noteManager.editNote(999, 'Non-existent', 'Content');
            expect(result).toBeUndefined();
        })
    })
    
    describe('deleteNote',()=>{
        it('should delete a note',()=>{
            const note = noteManager.addNote('To Delete', 'Content');
            const deleted = noteManager.deleteNote(note.id);
    
            expect(deleted).toBe(true);
            expect(noteManager.getNote(note.id)).toBeUndefined();
            expect(noteManager.getNotes().length).toBe(0);
        })
        it('should return false when deleting a non-existing note',()=>{
            const deleted = noteManager.deleteNote(999);
            expect(deleted).toBe(false);
        })
    })
    describe('getNote',()=>{
        it('should get a note by id',()=>{
            const note = noteManager.addNote('Retrieve Me', 'Content');
            const retrievedNote = noteManager.getNote(note.id);

            expect(retrievedNote).toMatchObject(note);
        })
        it('should return undefined for a non-existing note',()=>{
            const note = noteManager.getNote(999);
            expect(note).toBeUndefined();
        })
    })
    
    describe('getNotes',()=>{
        it('should return all notes', ()=>{
            noteManager.addNote('First Note', 'Content');
            noteManager.addNote('Second Note', 'Different Content');

            const allNotes = noteManager.getNotes();

            expect(allNotes.length).toBe(2);
            expect(allNotes).toEqual(expect.arrayContaining([
                expect.objectContaining({ title: 'First Note' }),
                expect.objectContaining({ title: 'Second Note' }),
              ]));
        })
    })
})