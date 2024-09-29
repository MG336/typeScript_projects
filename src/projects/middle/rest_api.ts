interface Post {
    id: number,
    title: string,
    body: string,
    userId: number
}

class ApiService {

    async getPosts(url: string): Promise<Post[] | undefined> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data: Post[] = await response.json();
            return data

        } catch (err) {
            console.error("Error fetching posts:", err);
            return undefined;

        }
    }

    async getPost(url: string, id: number): Promise<Post | undefined> {
        try {
            const response = await fetch(url + id);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`)
            }

            const data: Post = await response.json();
            return data
        } catch (err) {
            console.error("Error fetching posts:", err);
            return undefined;
        }
    }

    async createPost(url: string, post: Post): Promise<Post | undefined> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        }
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Failed to create post: ${response.statusText}`)
            }
            const data: Post = await response.json();
            return data;
        } catch (err) {
            console.error("Error create post:", err);
            return undefined;
        }
    }

    async updatePost(url: string, id: number, post: Post): Promise<Post | undefined> {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(post)
        }
        try {
            const response = await fetch(url + '/' + id, options);
            if (!response.ok) {
                throw new Error(`Failed to update post: ${response.statusText}`)
            }
            const data: Post = await response.json();
            return data;
        } catch (err) {
            console.error("Error update post:", err);
            return undefined;
        }
    }

    async deletePost(url: string, id: number): Promise<string | undefined> {
        const options = {
            method: 'DELETE'
        }

        try {
            const response = await fetch(url + '/' + id, options);
            if (!response.ok) {
                throw new Error(`Failed to deleted post: ${response.statusText}`)
            }
            return `post ${id} has been deleted`;

        } catch (err) {
            console.error("Error delete post:", err);
            return undefined;
        }
    }

}


const connect = new ApiService();

const posts = await connect.getPosts('https://jsonplaceholder.typicode.com/posts');
const post = await connect.getPost("https://jsonplaceholder.typicode.com/posts/", 1);

const testPost: Post = {
    id: 10,
    title: "title post",
    body: "body post",
    userId: 106
}

const createPost = await connect.createPost(`https://jsonplaceholder.typicode.com/posts`, testPost);
const updatePost = await connect.updatePost(`https://jsonplaceholder.typicode.com/posts`, 1, testPost);
const deletePost = await connect.deletePost(`https://jsonplaceholder.typicode.com/posts`, 2);

console.log(posts?.slice(0,3));
console.log(post);
console.log(createPost);
console.log(updatePost);
console.log(deletePost);


export { 
    ApiService
}