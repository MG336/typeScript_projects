interface User {
    name: string;
    age: number;
    isAdmin?:boolean;
}

let user: User = {name:"John", age: 30};
console.log(user);

export {user};