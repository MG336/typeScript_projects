// Task: Implementation of the Factory pattern for creating various types of vehicles


interface IVehicle {
    drive(): void;
    stop(): void;
}

class Vehicle implements IVehicle {
    constructor(
        protected model:string,
        protected speed:number,
        protected color:string,
        protected engine:string
    ){}

    drive(){
        console.log('drive');
    }
    
    stop(){
        console.log('stop');
    }

}

class Car extends Vehicle {
    constructor(
        model:string,
        speed:number,
        color:string,
        engine:string,
        private conditioner:boolean,
        private trunk:boolean 
    ){
        super(model, speed, color, engine)
    }
    getDetails() {
        return `Model: ${this.model}, Speed: ${this.speed}, 
        Color: ${this.color}, Engine: ${this.engine},
        Conditioner: ${this.conditioner}, Trunk: ${this.trunk}`;
    }
}

class Bike extends Vehicle {
    constructor(
        model:string,
        speed:number,
        color:string,
        engine:string
    ){
        super(model, speed, color, engine)
    }
    getDetails() {
        return `Model: ${this.model}, Speed: ${this.speed}, 
        Color: ${this.color}, Engine: ${this.engine}`;
    }
}

class VehicleFactory {
    createVehicle(type:string): Car | Bike | undefined {
         
        switch(type){
            case "car_bmw":
                return new Car('bmw',120,'blue','e123',true,true);
            case "car_ferrari":
                return new Car('ferrari',200,'yellow','w123',true,false);
            case "bike_yamaha":
                return new Bike('yamaha',300,'red','s123');
            default:
                return undefined
         }

    }
}
    


const vehicleFactory = new VehicleFactory();
const carBmw = vehicleFactory.createVehicle('car_bmw');
carBmw?.getDetails();

export {VehicleFactory, Car, Bike}




