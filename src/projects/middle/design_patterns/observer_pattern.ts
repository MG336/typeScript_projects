// Write an Observer Design Pattern


interface iObserver{
    // This method should be called when an event occurs that the observer subscribed to.
    update(date: any):void
}

interface iSubject{
    // methods for managing subscribers:

    // adds a new observer.
    subscribe(observer: iObserver): void

    // removes the observer.
    unsubscribe(observer: iObserver): void

    // notifies all subscribed observers of the event that has occurred.
    notify(data: any): void
}



class NotificationCenter implements iSubject{
    private observers: iObserver[] = [];

    subscribe(observer: iObserver): void {
        this.observers.push(observer);
    }

    unsubscribe(observer: iObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data: any): void {
        this.observers.forEach(obs => obs.update(data));
    }
}

class User implements iObserver {

    constructor(
        private name:string
    ){}

    update(date: any): void {
        console.log(`${this.name} received data: ${date}`);
    }
    
}

const notificationCenter = new NotificationCenter();
const user1 = new User('user1');
const user2 = new User('user2');
const user3 = new User('user3');

notificationCenter.subscribe(user1);
notificationCenter.subscribe(user2);
notificationCenter.subscribe(user3);

notificationCenter.notify('update');

export{ NotificationCenter, User };