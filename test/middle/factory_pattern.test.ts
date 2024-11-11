import { VehicleFactory, Car, Bike} from "../../src/projects/middle/factory_pattern";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe ('VehicleFactory',()=>{

    const carBmw = new Car('bmw',120,'blue','e123',true,true);
    const carFerrari = new Car('ferrari',200,'yellow','w123',true,false);
    const bike = new Bike('yamaha',300,'red','s123');

    it('the factory must return the object',()=>{
        const vehicleFactory = new VehicleFactory();
        const carBmwResult = vehicleFactory.createVehicle('car_bmw');
        const carFerrariResult = vehicleFactory.createVehicle('car_ferrari');
        const bikeResult = vehicleFactory.createVehicle('bike_yamaha');

        expect(carBmwResult).toEqual(carBmw);
        expect(carFerrariResult).toEqual(carFerrari);
        expect(bikeResult).toEqual(bike);
    })
    
    it('the factory should return undefined if the object does not exist', ()=>{
        const vehicleFactory = new VehicleFactory();
        const carBmwResult = vehicleFactory.createVehicle('testCar');
        expect(carBmwResult).toBeUndefined();
    })
        
})