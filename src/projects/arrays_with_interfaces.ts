export default function getAdultUsers(users: User[]): string[] {
    return users.filter(user => user.age > 18).map(user => user.name);
}

interface User {
     name: string;
     age: number;
}

let users: User[] = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 17},
    {name: "Charlie", age: 22}
];



console.log(getAdultUsers(users));