// Задание для Middle TypeScript разработчика: Паттерн проектирования Observer
// Цель задания
// Научиться применять паттерн проектирования Observer для создания механизма подписки и уведомления в приложении на TypeScript. Это задание поможет понять, как эффективно организовать взаимодействие между объектами, используя этот паттерн.

// Задание
// Сценарий: Вы разрабатываете систему уведомлений для приложения, в котором пользователи могут подписываться на различные события, такие как изменения статуса задач, сообщения и обновления данных.

// Требования
// Создание интерфейсов:
// Определите интерфейс Observer, который будет иметь метод update(data: any): void. Этот метод должен вызываться, когда происходит событие, на которое подписался наблюдатель.
// Определите интерфейс Subject, который будет содержать методы для управления подписчиками:
// subscribe(observer: Observer): void - добавляет нового наблюдателя.
// unsubscribe(observer: Observer): void - удаляет наблюдателя.
// notify(data: any): void - уведомляет всех подписанных наблюдателей о произошедшем событии.
// Реализация класса Subject:
// Создайте класс NotificationCenter, который реализует интерфейс Subject. Этот класс должен хранить список подписчиков и предоставлять возможность добавлять, удалять и уведомлять их.
// Реализация класса Observer:
// Создайте класс User, который реализует интерфейс Observer. Этот класс будет моделировать пользователя, который может получать уведомления. Метод update должен выводить сообщение в консоль, показывающее, что пользователь получил уведомление. Например: User {id} received notification: {data}.
// Пример использования:
// Напишите код, который демонстрирует использование системы уведомлений. Создайте несколько пользователей и подписывайте их на NotificationCenter. Затем добавьте метод в NotificationCenter, который будет инициировать некоторые события. При срабатывании этого метода уведомляйте всех подписчиков и отображайте, что каждый пользователь получил уведомление.
// Дополнительные требования (по желанию):
// Реализуйте возможность подписки пользователей на разные типы уведомлений. Для этого модифицируйте интерфейс Observer так, чтобы в методе update можно было указать тип уведомления.
// Добавьте возможность фильтрации уведомлений по типу для каждого слушателя.



interface iObserver{
    // Этот метод должен вызываться, когда происходит событие, на которое подписался наблюдатель.
    update(date: any):void
}

interface iSubject{
    // методы для управления подписчиками:

    // добавляет нового наблюдателя.
    subscribe(observer: iObserver): void

    // удаляет наблюдателя.
    unsubscribe(observer: iObserver): void

    // уведомляет всех подписанных наблюдателей о произошедшем событии.
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
        console.log(`${this.name} получил данные: ${date}`);
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