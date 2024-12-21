interface iProps{
    color?:string;
    backgroundColor?:string;
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
        const element = this.element;
        element.innerText = this.label;
        element.id = this.id;
        const containerElem = document.getElementById(container);
        
        if(containerElem){
            containerElem.appendChild(element);
        }else{
            console.error('container not found');
        }
    }

    public setProps(props: iProps): void {
        const element = this.element;
        element.style.color = props.color ?? 'white';
        element.style.backgroundColor = props.backgroundColor ?? 'black';
    }

}

const button = new Button();
button.setProps({
    color: 'red',
    backgroundColor: 'blue'
});

button.onClick(()=>console.log('clicked'));
button.render('app');











