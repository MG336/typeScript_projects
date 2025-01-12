class Router {
    private routes: Router[] = [];
    private currentRoute: string = '';

    constructor(){
        
    }
    
    addRoute(path, callback){
        this.routes.push({path,callback});
    }

    navigate(path){
        this.routes.forEach(route => {
            if(route.path === path){
                route.callback();
            }
        });
    }
    
}