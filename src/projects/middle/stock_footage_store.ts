// Stock footage store management system that will allow you to add videos and images, 
// register users, and manage the process of buying and downloading content.

class Media{
    constructor(
        public title:string,
        public type: 'video' | 'image',
        public price:number,
        public isAvailable:boolean,
        public resolution:string,
        public mediaId:string
    ){

    }
}

class Image extends Media{
    constructor(
        title:string,
        type: 'image',
        price:number,
        isAvailable:boolean,
        resolution:string,
        mediaId:string
    ){super(title, type, price, isAvailable, resolution, mediaId)}
}

class Video extends Media{
    constructor(
        title:string,
        type: 'video',
        price:number,
        isAvailable:boolean,
        resolution:string,
        mediaId:string,
        public frameRate:number,
        public duration:number
    ){super(title, type, price, isAvailable, resolution, mediaId)}
}

class User{
    constructor(
        public username:string,
        public userId:string,
        public purchasedMedia:Media[] = []
    ){}

    displayInfo():void{
        console.log(`User: ${this.username}, ID: ${this.userId}`);
    }
}


class Store {
    constructor(
        public users: User[] = [],
        public media: Media[] = []
    ){}
    
    addMedia(media: Media):void{
        if(this.media.find(item=>item.mediaId === media.mediaId)){
            throw new Error('media already exists');
        }   
        this.media.push(media);
    }

    addUser(user: User) :void{
        if(this.users.find(user=>user.userId === user.userId)){
            throw new Error('user already exists');
        }
        this.users.push(user);
    }


    purchaseMedia(userId: string, mediaId: string) :void{
        const user = this.users.find(user => user.userId === userId);
        const media = this.checkMediaAvailable(mediaId);

        if(!user){
            throw new Error('User not found');
        }

        if(user.purchasedMedia.includes(media)){
            throw new Error('Media already purchased');
        }

        user?.purchasedMedia.push(media);
    }

    checkMediaAvailable(mediaId: string) :Media {
        const media = this.media.find(media => media.mediaId === mediaId);
        if(!media){
            throw  new Error('Media not found');
        
        }else if(!media.isAvailable){
            throw new Error('Media is not available');
        
        }else{
            return media
        }
    }   

    viewAvailableMedia():Media[]{
        const availableMedia = this.media.filter(media => media.isAvailable);
        return availableMedia;
    }

    viewUsers() :User[]{
        return this.users
    }
}


const video1 = new Video('video1', 'video', 10, true, '1920x1080', '1', 24, 60);
const image1 = new Image('img1', 'image', 5, true, '1920x1080', '2');

const user1 = new User('user','1');


const store = new Store();
store.addMedia(video1);
store.addMedia(image1);
store.addUser(user1);
store.purchaseMedia('1','1');
store.purchaseMedia('1','2');
const availableMedia = store.viewAvailableMedia();
const users = store.viewUsers();

export {Store, User, Image, Video}

// debugger


