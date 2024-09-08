function processId(id: string | number): void{
    if (typeof id === 'string') {
        console.log(id.toUpperCase());
    } else {
        console.log(id * 2);
    }
}

processId(5);
processId('abc');
