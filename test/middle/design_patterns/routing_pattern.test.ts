import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {Router} from "@patterns/routing_pattern";

describe('Router', () => {
    let router: Router;

    beforeEach(()=>{ 
        router = new Router();
        window.history.pushState({},'');
    });

    it('must add a route and call its callback', ()=>{
        const callback = vi.fn();
        router.addRoute('/test', callback);
        router.navigate('/test');
        expect(callback).toHaveBeenCalled();
    });

    it('It should return an error when trying to navigate a route that does not exist.', ()=> {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}); 
        router.navigate('/non-existent-route');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Route not found');
        consoleErrorSpy.mockRestore();
    })

    it('must correctly handle navigation via the history API', ()=>{
        const callback1 = vi.fn();
        const callback2 = vi.fn();

        router.addRoute('/home', callback1);
        router.addRoute('/about', callback2);

        router.navigate('/home');
        expect(callback1).toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();

        window.history.pushState({},'', '/about');
        router.navigate(window.location.pathname);
        expect(callback2).toHaveBeenCalled();
    })

    it('It should trigger a callback when the Back button is pressed', ()=> {
        const callback = vi.fn();
        router.addRoute('/page1', callback);

        router.navigate('/page1');
        expect(callback).toHaveBeenCalled();

        window.history.pushState({}, '', '/');
        router.navigate(window.location.pathname);

        expect(callback).toHaveBeenCalledTimes(1);
    })
})

        

