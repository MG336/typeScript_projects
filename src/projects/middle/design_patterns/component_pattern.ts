interface iProps{
    color?:string;
    backgroundColor?:string;
}

interface iCardProps extends iProps{
    
    titleText: string,
    subTitleText: string,

    titleColor?: string,
    subTitleColor?: string
}

interface Component {
    render(container:string):void
    setProps(props: iProps): void
}


class Button implements Component{

    constructor(
        private label: string = 'text',
        private element: HTMLElement = document.createElement('button'),
        private id:string = 'button'

    ){}

    public onClick(event:Function):void {
        const element = this.element;
        element.addEventListener('click', ()=>{
            event();
        })
    }

    public render(container:string){
        const containerElem = document.getElementById(container);
        
        if(containerElem){
            containerElem.appendChild(this.element);
        }else{
            console.error('container not found');
        }
    }

    public setProps(props: iProps): void {
        const element = this.element;
        element.classList.add('button');
        element.textContent = this.label;
        element.id = this.id;
        element.style.color = props.color || 'white';
        element.style.backgroundColor = props.backgroundColor || 'black';
    }
}

class Card implements Component{
    constructor(
        private element: HTMLElement = document.createElement('div'),
        private id:string = 'card1'
    ){}

    public setProps(props: iCardProps): void {
        let element: HTMLElement = this.element;
        element.classList.add('card');
        element.id = this.id;

        let div: HTMLElement = document.createElement('div');
        let title: HTMLElement = document.createElement('H3');
        let subTitle: HTMLElement = document.createElement('p');

        title.textContent = props.titleText;
        subTitle.textContent = props.subTitleText;
        title.style.color = props.titleColor || 'black';
        subTitle.style.color = props.subTitleColor || 'black';

        div.appendChild(title);
        div.appendChild(subTitle);
        
        element.appendChild(div);
    }

    public render(container: string): void {
        const containerElem = document.getElementById(container);
        
        if(containerElem){
            containerElem.appendChild(this.element);
        }else{
            console.error('container not found');
        }
    }
}

        

    
const button = new Button();

button.setProps({
    color: 'red',
    backgroundColor: 'blue'
});

button.onClick(()=>console.log('clicked'));
button.render('app');


const card = new Card();

card.setProps({
    titleColor:'red',
    subTitleColor: 'green',

    titleText:'title_1',
    subTitleText: 'subtitle_1'
})

card.render('app');


        














