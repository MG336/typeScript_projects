export default function identity<T>(arg: T): T {
    return arg
}

console.log(identity<string>("Hello"));
console.log(identity<number>(1));

