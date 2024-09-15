// Создайте класс ApiService, который будет взаимодействовать с REST API (например, с публичным API, таким как JSONPlaceholder). Этот класс должен поддерживать основные операции: получение, создание, обновление и удаление данных.

// Требования:
// Создание интерфейса:
// Создайте интерфейс Post, который будет содержать свойства:
// id: number
// title: string
// body: string
// userId: number
// Класс ApiService:
// Реализуйте класс ApiService с методом:
// getPosts(): Promise<Post[]> — получает список постов из API.
// getPost(id: number): Promise<Post> — получает пост по ID.
// createPost(post: Post): Promise<Post> — создает новый пост.
// updatePost(post: Post): Promise<Post> — обновляет существующий пост.
// deletePost(id: number): Promise<void> — удаляет пост по ID.

// Обработка ошибок:
// Реализуйте базовую обработку ошибок для каждого метода, выбрасывая ошибки с подробным описанием, если возникла проблема с запросом.
// Тестирование:
// Напишите простые тесты для методов класса ApiService с использованием библиотеки для тестирования, например, Jest. Проверьте успешные и неуспешные случаи для каждого метода.
// Дополнительно (опционально):
// Реализуйте кэширование результатов. Например, если метод getPosts() был вызван, то при последующих вызовах в течение некоторого времени возвращайте закэшированные данные.
// Используйте TypeScript для определения типов для всех переменных и параметров.
// Ожидаемый результат:
// На выходе вы должны получить полностью работающий класс ApiService, который обеспечит взаимодействие с REST API, а также тесты, демонстрирующие корректную работу каждого метода.


interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}

class ApiService {

    async getPosts(url: string): Promise<Post[] | undefined> {
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            
            const data: Post[] = await response.json();
            return data 
            
        }catch(err){
            console.error("Error fetching posts:", err);
            return undefined;
            
        }
    } 

    async getPost(url:string, id:number): Promise<Post | undefined>{
        try{
            const response = await fetch(url+id);
            if(!response.ok){
                throw new Error(`Network response was not ok: ${response.statusText}`)
            }

            const data: Post = await response.json();
            return data
        }catch(err){
            console.error("Error fetching posts:", err);
            return undefined;
        }
    }

    async createPost(url:string, post: Post): Promise<Post | undefined>{
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        }
        try{
            const response = await fetch(url, options);
            if(!response.ok){
                throw new Error(`Failed to create post: ${response.statusText}`)
            }
            const data: Post = await response.json();
            return data;
        }catch(err){
            console.error("Error create post:", err);
            return undefined;
        }
    }

    async updatePost(url:string, post:Post): Promise<Post | undefined>{
        const options = {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        }
        try{
            const response = await fetch(url, options);
            if(!response.ok){
                throw new Error(`Failed to update post: ${response.statusText}`)
            }
            const data: Post = await response.json();
            return data;
        }catch(err){
            console.error("Error update post:", err);
            return undefined;
        }
    }

    async deletePost(url:string, id:number): Promise<string | undefined> {
       const options = { 
            method:'DELETE'
        }

        try{
            const response = await fetch(url + '/' + id, options);
            if(!response.ok){
                throw new Error(`Failed to update post: ${response.statusText}`)
            }
            return `post ${id} has been deleted`;
            
        }catch(err){
            console.error("Error delete post:", err);
            return undefined;
        }
    }
}


const connect = new ApiService();

const posts = await connect.getPosts('https://jsonplaceholder.typicode.com/posts');
const post = await connect.getPost("https://jsonplaceholder.typicode.com/posts/", 1);

const testPost: Post = {
    id:10,
    title:"title post",
    body:"body post",
    userId:106
}

const createPost = await connect.createPost(`https://jsonplaceholder.typicode.com/posts`, testPost);
const updatePost = await connect.updatePost(`https://jsonplaceholder.typicode.com/posts/1`, testPost);
const deletePost = await connect.deletePost(`https://jsonplaceholder.typicode.com/posts`, 2);

console.log(posts);
console.log(post);
console.log(createPost);
console.log(updatePost);
console.log(deletePost);