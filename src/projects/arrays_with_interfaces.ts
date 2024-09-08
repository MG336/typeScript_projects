interface User {
     name: string;
     age: number;
}

let users: User[] = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 17},
    {name: "Charlie", age: 22}
];

function getAdultUsers(users: User[]): string[] {
    return users.filter(user => user.age > 18).map(user => user.name);
}


console.log(getAdultUsers(users));