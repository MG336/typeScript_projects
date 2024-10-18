// A system for managing a company's fleet of vehicles 
// that will allow you to track information about vehicles, drivers, and trips.


class Vehicle {
    constructor(
        public make:string,
        public model: string,
        public year: number,
        public licensePlate: number,
        public available: boolean = true
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
        public drivingExperience: number,
        public available: boolean = true
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
        public duration: number,
        public tripId:number
    ){}
    addVehicle(vehicle: Vehicle): void{
        this.vehicle = vehicle
    }
    registerDriver(driver: Driver): void{
        this.driver = driver
    }
    
}

class FleetManager{

    public vehicles: Map<number, Vehicle>;
    public drivers: Map<number, Driver>;
    public trips: Map<number, Trip>;

    constructor(){
        this.vehicles = new Map<number, Vehicle>
        this.drivers = new Map<number, Driver>
        this.trips = new Map<number, Trip>
    }

    //Vehicles ----------------------------
    addVehicle(vehicle: Vehicle) :void{
        if(this.vehicles.has(vehicle.licensePlate)){
            throw new Error(`Vehicle with license plate ${vehicle.licensePlate} already exists.`);
        }
        this.vehicles.set(vehicle.licensePlate, vehicle);
    }
    removeVehicle(licensePlate: number): boolean{
        return this.vehicles.delete(licensePlate)
    }

    getVehicle(licensePlate: number): Vehicle | undefined{
        return this.vehicles.get(licensePlate);
    }




    //Drivers -------------------------------
    addDriver(driver: Driver): void{
        if(this.drivers.has(driver.licenseNumber)){
            throw new Error(`Driver with license Number ${driver.licenseNumber} already exists.`);
        }
        
        this.drivers.set(driver.licenseNumber, driver);
    }
    removeDriver(licenseNumber: number): boolean {
        return this.drivers.delete(licenseNumber)
    }

    getDriver(licenseNumber: number): Driver | undefined {
        return this.drivers.get(licenseNumber)
    }


    //Trips ----------------------------
    addTrip(
        vehicleLicensePlate: number,
        driverLicenseNumber: number,
        startLocation: string,
        endLocation: string,
        distance: number,
        duration: number,
        tripId: number = Date.now()
    ){
        const driver = this.getDriver(driverLicenseNumber);
        if(!driver || !driver.available){
            throw new Error(`Driver with license Number ${driverLicenseNumber} not available.`);
        }
        
        const vehicle = this.getVehicle(vehicleLicensePlate);
        if(!vehicle || !vehicle.available){
            throw new Error(`Vehicle with License Plate ${vehicleLicensePlate} not available.`);
        }

        driver.available = false;
        vehicle.available = false;

        const trip = new Trip(vehicle,driver,startLocation,endLocation,distance,duration,tripId);
        this.trips.set(tripId, trip);

    }
    
    removeTrip(tripId: number): boolean{
        return this.trips.delete(tripId);
    }

    getTrip(tripId: number): Trip | undefined {
        return this.trips.get(tripId);
    }

    getTrips(): Trip[]{
        const trips = Array.from(this.trips.values())
        return trips
    }
    
}

const driver1 = new Driver('driver1', 1, 2,);
const vehicle1 = new Vehicle('vehicle1', 'm1', 2024, 1);
const fleetManager = new FleetManager();

fleetManager.addDriver(driver1);
fleetManager.addVehicle(vehicle1);
fleetManager.addTrip(1,1,'a','b',40,1);

export {Driver, Vehicle, Trip, FleetManager}




