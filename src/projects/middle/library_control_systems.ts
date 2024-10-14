// Задача: Создание системы управления библиотекой
// Описание: Вам необходимо разработать систему для управления библиотекой, которая будет использовать основы ООП, включая наследование, полиморфизм и инкапсуляцию.

// Требования:
// Классы:
// Создайте базовый класс Item, который будет представлять любой элемент библиотеки (книги, журналы и т.д.). У класса должны быть следующие свойства:
// title: string
// author: string
// isAvailable: boolean
// Создайте два производных класса: Book и Magazine, которые будут расширять класс Item. У класса Book должно быть дополнительное свойство:
// pagesCount: number
// У класса Magazine должно быть дополнительное свойство:
// issueNumber: number

// Методы:
// В классе Item создайте метод checkOut(), который будет отмечать элемент как недоступный (изменяет isAvailable на false), если он доступен. Если элемент уже недоступен, метод должен выбрасывать ошибку.
// В классе Item создайте метод return(), который будет отмечать элемент как доступный (изменяет isAvailable на true).
// В классах Book и Magazine переопределите метод toString(), который будет возвращать строку с полной информацией о элементе (заголовок, автор, доступность, и дополнительные сведения, специфичные для книги или журнала).
// Класс Library:
// Создайте класс Library, который будет содержать массив элементов (Item[]).
// Реализуйте методы для добавления элементов в библиотеку (addItem(item: Item)), поиска элемента по заголовку (findItemByTitle(title: string): Item | undefined) и получения списка всех доступных элементов (getAvailableItems(): Item[]).

class Item {
    constructor(
        public title: string,
        public author: string,
        public isAvailable: boolean = true,
    ) { }

    checkOut(): void {
        if (!this.isAvailable) {
            throw new Error("Item is not available")
        } else {
            this.isAvailable = false;
        }
    }

    return(): void {
        if (this.isAvailable) {
            throw new Error("Item is available")
        } else {
            this.isAvailable = true;
        }
    }

    toString(): string {
        return `Title: ${this.title}\nAuthor: ${this.author}\nIs available: ${this.isAvailable}`;
    }


}

class Book extends Item {
    constructor(
        title: string,
        author: string,
        isAvailable: boolean,
        private pagesCount: number,
    ) {
        super(title, author, isAvailable)
    }

    toString(): string {
        return `${super.toString()}\nPages count: ${this.pagesCount}`
    }
}

class Magazine extends Item {
    constructor(
        title: string,
        author: string,
        isAvailable: boolean,
        private issueNumber: number,
    ) {
        super(title, author, isAvailable)
    }

    toString(): string {
        return `${super.toString()}\nPages count: ${this.issueNumber}`
    }
}


class Library {


    private items: Item[] = [];

    addItem(item: Item): boolean {

        if (!item) {

            throw new Error("Item is null");
        } else {
            this.items.push(item);
            return true;
        }
    }

    getAvailableItems(): Item[] {
        return this.items.filter(item => item.isAvailable);
    }

    findItemByTitle(title: string): Item {
        const item = this.items.find(item => item.title === title);
        if (!item) {
            throw new Error("Item not found");
        }
        return item;
    }
}




const library = new Library();

const book1 = new Book('book1', 'author1', true, 100);
const magazine1 = new Magazine('magazine1', 'author1', true, 10);

library.addItem(book1);
library.addItem(magazine1);
console.log(library.getAvailableItems());
console.log(library.findItemByTitle('book1'));
console.log(book1.toString())


export { Library, Magazine, Book, Item };