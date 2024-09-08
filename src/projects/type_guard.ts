
function processInput(input: {name: string, age: number} | string): void {
    if(typeof input === 'string'){
        console.log(input.toUpperCase());
    }else{
        console.log(`Name: ${input.name}, Age: ${input.age}`);
    }
}

processInput({name: "Alice", age: 30});
processInput("hello");