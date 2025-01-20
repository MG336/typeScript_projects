
interface Route {
    path: string;
    callback: ()=> void            
}

class Router {
    private routes: Route[] = [];
    private currentRoute: string = '';

    constructor(){
        window.onpopstate = ()=>{
            this.navigate(window.location.pathname);
        }
    }
    
    addRoute(path: string, callback: ()=> void){
        this.routes.push({path, callback});
    }
        

    navigate(path: string){
        this.currentRoute = path;
        history.pushState({}, '', path);
        this.render();
    }

    render() {
        const route = this.routes.find(r => r.path === this.currentRoute);
        if(route){
            route.callback();
        } else{
            console.error('Route not found');
        }
    }
    
}

export {Router}