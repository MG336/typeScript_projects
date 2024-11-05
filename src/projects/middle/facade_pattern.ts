//Implement an API client for interacting with an external API that will encapsulate the complex details 
//of network interaction and provide a simplified interface for use in the application. 
//To achieve this goal, the Facade design pattern will be used.


interface User {
    id: number,
    name: string,
    email: string
}

interface Product {
    id: number;
    title: string;
    price: number
}

interface userData {
    user: User | undefined;
    userProducts: Product[] | undefined;
}

class ApiClient {


    constructor(
        private baseUrl: string
    ) { }
    async getUser(url: string): Promise<User | undefined> {

        const response = await fetch(this.baseUrl + '/' + url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        const date: User = await response.json();
        return date
    }

    async getUserProducts(url: string): Promise<Product[] | undefined> {
        const response = await fetch(this.baseUrl + '/' + url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        const date: Product[] = await response.json();
        return date
    }
}



class ApiFacade {
    private apiClient: ApiClient;

    constructor(baseUrl: string) {
        this.apiClient = new ApiClient(baseUrl)
    }

    async fetchUsers(): Promise<userData | undefined> {
        try {

            const userData: userData = {
                user: await this.apiClient.getUser(''),
                userProducts: await this.apiClient.getUserProducts('')
            };
            return userData
        } catch (err: any) {
            throw new Error(err)
        }
    }
}

export { ApiFacade }


