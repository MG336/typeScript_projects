import { Library, Magazine, Book, Item } from '../../src/projects/middle/library_control_systems';
import { describe, it, expect,vi,beforeEach } from 'vitest';


describe('Library', ()=>{
    let library: Library;
    let book1: Item = new Book('book1', 'author1', true, 100);
    let book2: Item = new Book('book2', 'author2', true, 100);
    let magazine1: Item = new Magazine('magazine1', 'author1', true, 10);

    beforeEach(()=>{
        library = new Library();
    })

    describe('addItem',()=>{
        it('should add an item the library',()=>{

            expect(library.addItem(book1)).toBe(true);
           expect(library.getAvailableItems().length).toBe(1);
           expect(library.getAvailableItems()[0]).toEqual(book1);
       })

       it('should throw an error when trying to add a null item', ()=>{
            expect(() => library.addItem(null).toThrowError());
       })

       it('should add multiple items and check availability', ()=>{
            library.addItem(book1);
            library.addItem(book2);

            expect(library.getAvailableItems().length).toBe(2);
       })
    })
   
    describe('getAvailableItems',()=>{
        it('should return multiple items', ()=>{
            library.addItem(book1);
            library.addItem(magazine1);
            expect(library.getAvailableItems().length).toBe(2);
        })
    })

    describe('findItemByTitle', ()=>{
        it('should return an item', ()=>{
            library.addItem(book1);
            expect(library.findItemByTitle('book1')).toEqual(book1);
        })
        it('should throw an error when object not found', ()=>{
            expect(() => library.findItemByTitle('book1').toThrowError());
        })
    })
})




