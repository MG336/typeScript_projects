import { ApiService } from '../src/projects/rest_api_interface';
import { describe, it, expect,vi } from 'vitest';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number
}


describe('ApiService',()=>{
    describe('getPosts', ()=>{
        it('getPosts should return data if the fetch is successful', async () => {
            const mockPosts: Post[] = [
                { id: 1, title: "Test Post 1", body: "This is a test post",userId: 1 },
                { id: 2, title: "Test Post 2", body: "Another test post", userId: 2 },
            ];
    
    
            // Мокируем успешный fetch
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockPosts),
                } as Response)
            );
    
            // Вызов функции
            const apiService = new ApiService();
            const result = await apiService.getPosts("https://jsonplaceholder.typicode.com/posts");
    
            // Проверка, что функция вернула корректные данные
            expect(result).toEqual(mockPosts);
        });
    
        it('should return undefined and log error if response is not ok', async () => {
            global.fetch = vi.fn(()=> {
                Promise.resolve({
                    ok: false,
                    statusText: "Not Found"
                } as Response)
            })
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await  apiService.getPosts("https://jsonplaceholder.typicode.com/posts");
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error fetching posts:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
    
        it('should return undefined and log error if fetch throws an error', async ()=>{
            global.fetch = vi.fn(() =>
                Promise.reject(new Error("Network Error"))
            );
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await apiService.getPosts("https://jsonplaceholder.typicode.com/posts");
    
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error fetching posts:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
    })
    
    
    describe('getPost',()=>{
        it('should return data if the fetch is successful', async ()=>{
            const mockPosts: Post = 
                { id: 1, title: "Test Post 1", body: "This is a test post", userId: 1 }
            ;
    
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockPosts),
                } as Response)
            );
    
            const apiService = new ApiService();
            const result = await apiService.getPost("", 1);
    
            expect(result).toEqual(mockPosts);
    
        })
    
        it('should return undefined and log error if response is not ok', async () => {
            global.fetch = vi.fn(()=> {
                Promise.resolve({
                    ok: false,
                    statusText: "Not Found"
                } as Response)
            })
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await  apiService.getPost("",1);
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error fetching posts:", expect.any(Error));
    
            errorSpy.mockRestore();
        })

        it('should return undefined and log error if fetch throws an error', async ()=>{
            global.fetch = vi.fn(() =>
                Promise.reject(new Error("Network Error"))
            );
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await apiService.getPost("",1);
    
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error fetching posts:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
    
    })

    describe('createPost',()=>{
        const mockPost: Post = {
            id: 10,
            title: "title post",
            body: "body post",
            userId: 106
        }
        it('should return data if the fetch is successful', async ()=>{
    
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockPost),
                } as Response)
            );
    
            const apiService = new ApiService();
            const result = await apiService.createPost("", mockPost);
    
            expect(result).toEqual(mockPost);
    
        })
    
        it('should return undefined and log error if response is not ok', async () => {
            

            global.fetch = vi.fn(()=> {
                Promise.resolve({
                    ok: false,
                    statusText: "Not Found"
                } as Response)
            })
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await  apiService.createPost('',mockPost);
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error create post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })

        it('should return undefined and log error if fetch throws an error', async ()=>{
            
            global.fetch = vi.fn(() =>
                Promise.reject(new Error("Network Error"))
            );
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await apiService.createPost('',mockPost);
    
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error create post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
    
    })

    describe('updatePost',()=>{
        const mockPost: Post = 
        { 
            id: 10,
            title: "title post",
            body: "body post",
            userId: 106
        };

        it('should return data if the fetch is successful', async ()=>{
          
    
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockPost),
                } as Response)
            );
    
            const apiService = new ApiService();
            const result = await apiService.updatePost("",1, mockPost);
    
            expect(result).toEqual(mockPost);
    
        })

        it('should return undefined and log error if response is not ok', async () => {
            global.fetch = vi.fn(()=> {
                Promise.resolve({
                    ok: false,
                    statusText: "Not Found"
                } as Response)
            })
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await  apiService.updatePost('',1,mockPost);
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error update post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })

        it('should return undefined and log error if fetch throws an error', async ()=>{
            global.fetch = vi.fn(() =>
                Promise.reject(new Error("Network Error"))
            );
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await apiService.updatePost('',1,mockPost);
    
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error update post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
    })

    describe('deletePost',()=>{
        it('should return data if the fetch is successful', async ()=>{
    
            global.fetch = vi.fn(() =>
                Promise.resolve({
                    ok: true,
                } as Response)
            );
    
            const apiService = new ApiService();
            const result = await apiService.deletePost("", 1);
    
            expect(result).toEqual(`post 1 has been deleted`);
        })

        it('should return undefined and log error if response is not ok', async () => {
            global.fetch = vi.fn(()=> {
                Promise.resolve({
                    ok: false,
                    statusText: "Not Found"
                } as Response)
            })
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await  apiService.deletePost("", 1);
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error delete post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })

        it('should return undefined and log error if fetch throws an error', async ()=>{
            global.fetch = vi.fn(() =>
                Promise.reject(new Error("Network Error"))
            );
    
            const errorSpy = vi.spyOn(console, 'error');
            const apiService = new ApiService();
            const result = await apiService.deletePost("", 1);
    
            expect(result).toBeUndefined();
    
            expect(errorSpy).toHaveBeenCalledWith("Error delete post:", expect.any(Error));
    
            errorSpy.mockRestore();
        })
        
    })
})
        


        
        






