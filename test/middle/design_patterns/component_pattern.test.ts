import { Callback } from './../../../node_modules/tough-cookie/dist/utils.d';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Button } from "@patterns/component_pattern.ts";

describe('Button', () => {
    let button: Button;
    let container: HTMLDivElement;

    beforeEach(()=> {
        //Настройка эллемента который будте использоватьсь в качестве контейнера

        container = document.createElement('div');
        container.id = 'app';
        document.body.appendChild(container);
        
        button = new Button('button text','button1');
        
        button.setProps({
            color: 'red',
            backgroundColor: 'blue'
        });
        
        button.render('app');
    });
        

    afterEach(()=> {
        document.body.removeChild(container);
    });

    it('should be created', () => {
        // Проверяем, что кнопка была добавлена в контейнер
        expect(container.querySelector('.button')).not.toBeNull();
        expect(document.getElementById('button1')).not.toBeNull();
    });

    it('должен иметь правильный текст',()=>{
        const buttonElement = container.querySelector('.button') as HTMLButtonElement;

        expect(buttonElement.textContent).toBe('button text');
    });

    it('должен вызывать callback при клике',()=>{
        const callback = vi.fn();
        button.onClick(callback);


        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        buttonElement.click();

        expect(callback).toHaveBeenCalled();
    })

    it('должен иметь правильный стиль', ()=>{
        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        expect(buttonElement.style.color).toBe('red');
    })
})




