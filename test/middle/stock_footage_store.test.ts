import { ApiService } from '../../src/projects/middle/rest_api';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Store, User, Image, Video } from '../../src/projects/middle/stock_footage_store';

const video1 = new Video('video1', 'video', 10, true, '1920x1080', '1', 24, 60);
const image1 = new Image('img1', 'image', 5, true, '1920x1080', '2');
const user1 = new User('user', '1');
let store: Store;

beforeEach(() => {
    store = new Store();
});

describe('addMedia', () => {
    it('should add media', () => {
        store.addMedia(video1);
        store.addMedia(image1);
        
        expect(store.media.length).toBe(2);
    });

    it('should throw an error if the media has already been added', () => {
        store.addMedia(video1);
        expect(() => store.addMedia(video1)).toThrow('media already exists');
    })
});

describe('addUser', () => {
    it('should add a user', () => {
        store.addUser(user1);
        expect(store.users.length).toBe(1);
    })

    it('should throw an error if the user has already been added', () => {
        store.addUser(user1);
        expect(() => store.addUser(user1)).toThrow('user already exists');
    })
})

describe('checkMediaAvailable', () => {
    it('should return the media', () => {
        store.addMedia(video1);
        // const media = store.media[0].isAvailable;
        const media = store.checkMediaAvailable('1');
        
        // expect(store.media[0].isAvailable).toBeTruthy;
        expect(media).toEqual(video1);
    })
    it('should throw an error if the media is not available or not found', () => {
        
        const image = new Image('img1', 'image', 5, false, '1920x1080', '2');
        store.addMedia(image);
        expect(() => store.checkMediaAvailable('2')).toThrow('Media is not available');
        expect(() => store.checkMediaAvailable('1')).toThrow('Media not found');
    })
})


describe('purchaseMedia', () => {
    it('should add the media to the purchasedMedia list of the user', () => {
        store.addMedia(video1);
        store.addUser(user1);

        store.purchaseMedia('1', '1');
        expect(store.users[0].purchasedMedia.length).toBe(1);
    })
    it('should throw an error if the media has already been purchased by the user or the media is not found', () => {
        store.addMedia(image1);
        store.addUser(user1);
        store.purchaseMedia('1', '2');
        expect(() => store.purchaseMedia('1', '2')).toThrow('Media already purchased');
        expect(() => store.purchaseMedia('1', '3')).toThrow('Media not found');
    })
})

describe('viewAvailableMedia', () => {
    it('should return all available media', () => {
        store.addMedia(image1);
        store.addMedia(video1);
        const image = new Image('img1', 'image', 5, false, '1920x1080', '3');
        store.addMedia(image);

        expect(store.viewAvailableMedia().length).toBe(2);
    })
})

describe('viewUsers', () => {
    it('should return all users', () => {
        store.addUser(user1);
        expect(store.viewUsers().length).toBe(1);
    })

})