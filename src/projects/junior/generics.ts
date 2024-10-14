export default function identity<T>(arg: T): T {
    return arg
}


//-------------

const number = [1, 2, 3, 4, 5];

function findElement<T>(arg: T, array: T[]): number {
    return array.findIndex(element => element === arg)
}

const index = findElement(2, number);

//-------------

class Stack<T> {
    private items: T[] = [];

    push(element: T) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }
}

const stack = new Stack<number>();
stack.push(1);
const topItem = stack.peek();

//-------------

interface Response<T, U> {
    data: T;
    error: U;
}

const response: Response<{ name: string }, null> = {
    data: { name: 'Alice' },
    error: null
}

function handleResponse<T, U>(response: Response<T, U>): void {
    if (response.error) {
        console.error('Error:', response.error);
    } else {
        console.log('Data:', response.data);
    }
}
handleResponse(response);

//-------------


function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const obj1 = { x: 1, y: 2 };
const obj2 = { y: 3, z: 4 };
const merged = merge(obj1, obj2);


