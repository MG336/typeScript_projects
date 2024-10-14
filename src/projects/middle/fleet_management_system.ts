// A system for managing a company's fleet of vehicles 
// that will allow you to track information about vehicles, drivers, and trips.


class Vehicle {
    constructor(
        public make:string,
        public model: string,
        public year: number,
        public licensePlate: number,
    ){}

    displayInfo():{make: string, model: string, year: number; licensePlate: number}{
        return {
            make: this.make,
            model: this.model,
            year: this.year,
            licensePlate: this.licensePlate
        }
    }
}
    
class Driver {
    constructor(
        public name: string,
        public licenseNumber: number,
        public drivingExperience: number
    ){}
    displayInfo():{name:string, licenseNumber: number, drivingExperience: number}{
        return {
            name: this.name,
            licenseNumber: this.licenseNumber,
            drivingExperience: this.drivingExperience
        }
    }
}

class Trip {
    constructor(
        public vehicle:Vehicle,
        public driver:Driver,
        public startLocation: string,
        public endLocation: string,
        public distance: number,
        public duration: number
    ){}
    addVehicle(vehicle: Vehicle): void{
        this.vehicle = vehicle
    }
    registerDriver(driver: Driver): void{
        this.driver = driver
    }
    
}

class FleetManager{
    public trips: Trip[] = [];
    public drivers: Driver[] = [];
    // public vehicles: Vehicle[] = [];
    public vehicles: Map<number, Vehicle>;

    constructor(){
        this.vehicles = new Map<number, Vehicle>
    }


    // addVehicle(vehicle: Vehicle) :void{
    //     if(this.vehicles.find(vehicle => vehicle.licensePlate === vehicle.licensePlate)){
    //         throw new Error('A vehicle with this licensePlate already exists')
    //     }
    //     this.vehicles.push(vehicle);
    // }
    addVehicle(vehicle: Vehicle) :void{
        if(this.vehicles.has(vehicle.licensePlate)){
            throw new Error('Vehicle with license plate ${vehicle.licensePlate} already exists.');
        }
        this.vehicles.set(vehicle.licensePlate, vehicle);
    }

    removeVehicle(licensePlate: number): boolean{
        return this.vehicles.delete(licensePlate)
    }

    getVehicle(licensePlate: number): Vehicle | undefined{
        return this.vehicles.get(licensePlate);
    }

    

    registerDriver(driver: Driver):void{
        if(this.drivers.find(driver => driver.licenseNumber === driver.licenseNumber)){
            throw new Error('A driver with this name already exists')
        }
        this.drivers.push(driver);
    }

}