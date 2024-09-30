export default async function fetchData(url: string): Promise<void>{
    try{
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    }catch(err){
        console.error("Error fetching data:", err)
    }
}

fetchData("https://jsonplaceholder.typicode.com/todos/1");