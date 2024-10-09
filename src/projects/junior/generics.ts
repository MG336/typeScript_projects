export default function identity<T>(arg: T): T {
    return arg
}


//-------------

const number = [1, 2, 3, 4, 5];

function findElement<T>(arg:T, array:T[]): number{
    return array.findIndex(element => element === arg)
}

const index = findElement(2, number);

//-------------

class Stack<T>{
    private items:T[] = [];

    push(element:T) {
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

interface Response <T, U>{
     data:T;
     error: U;
}

function returnResponse<T, U>(data:T, error:U): string{
    
}

