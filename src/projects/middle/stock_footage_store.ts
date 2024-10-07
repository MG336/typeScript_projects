// Классы:
// Media: базовый класс, представляющий мультимедийный контент (футажи). Содержит свойства title (название), duration (длительность в секундах для видео, для изображений - 0), type (строка, указывающая тип контента: "image" или "video"), price (цена) и isAvailable (доступность).
// Image: наследник класса Media, для представления изображений с дополнительным свойством resolution (разрешение изображения).
// Video: наследник класса Media, для представления видео с дополнительным свойством resolution (разрешение видео) и frameRate (частота кадров).
// User: класс, представляющий пользователя магазина, содержит свойства username (имя пользователя), userId (идентификатор пользователя) и метод displayInfo() для вывода информации о пользователе.
// Store: класс, представляющий магазин, должен включать методы для:
// Добавления мультимедийного контента (addMedia(media: Media): void)
// Регистрации пользователей (registerUser(user: User): void)
// Покупки контента (purchaseMedia(userId: string, mediaTitle: string): void)
// Просмотра доступного контента (viewAvailableMedia(): Media[])

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


// Store: класс, представляющий магазин, должен включать методы для:
// Добавления мультимедийного контента (addMedia(media: Media): void)
// Регистрации пользователей (registerUser(user: User): void)
// Покупки контента (purchaseMedia(userId: string, mediaTitle: string): void)
// Просмотра доступного контента (viewAvailableMedia(): Media[])

// Методы:
// В классе Media должен быть метод displayInfo(), который выводит информацию о мультимедийном контенте (тип, название, длительность, цена, доступность).
// В классе Store должен быть метод для проверки доступности контента перед покупкой и обновления статуса доступности после покупки.
// Пример использования


class Store {
    constructor(
        public users: User[] = [],
        public media: Media[] = []
    ){}
    
    addMedia(media: Media):void{
        if(this.media.find(item=>item.mediaId === media.mediaId)){
            throw new Error('media already exists111');
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
        // const media = this.media.find(media => media.mediaId === mediaId);
        const media = this.checkMedeiaAvailable(mediaId);

        if(!user){
            throw new Error('User not found');
        }

        if(user.purchasedMedia.includes(media)){
            throw new Error('Media already purchased');
        }

        user?.purchasedMedia.push(media);
    }

    checkMedeiaAvailable(mediaId: string) :Media {
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


debugger


