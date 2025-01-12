import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Button,  Card} from "@patterns/component_pattern.ts";

describe('Button', () => {
    let button: Button;
    let container: HTMLDivElement;

    beforeEach(()=> {
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

    it('must have the correct text',()=>{
        const buttonElement = container.querySelector('.button') as HTMLButtonElement;

        expect(buttonElement.textContent).toBe('button text');
    });

    it('it should call a callback when clicked',()=>{
        const callback = vi.fn();
        button.onClick(callback);


        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        buttonElement.click();

        expect(callback).toHaveBeenCalled();
    })

    it('must have the right style', ()=>{
        const buttonElement = container.querySelector('button') as HTMLButtonElement;
        expect(buttonElement.style.color).toBe('red');
    })
})


describe('Card',()=>{
    let card: Card;
    let container: HTMLDivElement;
   
    beforeEach(()=> {
        container = document.createElement('div');
        container.id = 'app';
        document.body.appendChild(container);

        card = new Card('testId');
        card.setProps({
            titleColor:'red',
            subTitleColor: 'green',
        
            titleText:'title_1',
            subTitleText: 'subtitle_1'
        })
    }); 

    afterEach(()=> {
        document.body.removeChild(container);
    });

    it('should be created', () => {
        card.render('app');
        expect(container.querySelector('.card')).not.toBeNull();
        expect(document.getElementById('testId')).not.toBeNull();

    })

    it('should have correct text', ()=>{
        card.render('app');
        const cardElement = container.querySelector('.card') as HTMLDivElement;
        const h3 = cardElement.querySelector('h3') as HTMLHeadingElement;
        const p = cardElement.querySelector('p') as HTMLParagraphElement;
        
        expect(cardElement).not.toBeNull();
        expect(h3).not.toBeNull();


        expect(h3.textContent).toBe('title_1');
        expect(h3.style.color).toBe('red');
        expect(p.style.color).toBe('green');
        expect(p.textContent).toBe('subtitle_1');

    })

})

