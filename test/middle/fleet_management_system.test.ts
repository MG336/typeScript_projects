import {Driver, Vehicle, Trip, FleetManager} from '../../src/projects/middle/fleet_management_system';
import { describe, it, expect,vi,beforeEach } from 'vitest';


describe('fleetManager',()=>{
    let fleetManager, vehicle1, driver1;
    
    beforeEach(() => {
        fleetManager = new FleetManager();
        vehicle1 = new Vehicle('vehicle1', 'm1', 2024, 1);
        driver1 = new Driver('driver1', 1, 2);
    });
    
    describe('addVehicle', () => {
        it('Should add a car to the transportation system', () => {
            fleetManager.addVehicle(vehicle1);
            expect(fleetManager.vehicles.has(vehicle1.licensePlate)).toBeTruthy();
        });
    
        it('Should throw an error if the vehicle is already added', () => {
            fleetManager.addVehicle(vehicle1);
            expect(() => fleetManager.addVehicle(vehicle1)).toThrowError();
        });
    });
    
    describe('removeVehicle', () => {
        it('Should remove a vehicle', () => {
            fleetManager.addVehicle(vehicle1);
            fleetManager.removeVehicle(vehicle1.licensePlate);
            const result = fleetManager.vehicles.has(vehicle1.licensePlate);
            expect(result).toBeFalsy();
        });
    });
    
    describe('getVehicle', () => {
        it('Should return a vehicle by its license plate number', () => {
            fleetManager.addVehicle(vehicle1);
            expect(fleetManager.getVehicle(vehicle1.licensePlate)).toEqual(vehicle1);
        });
    });
    
    describe('addDriver', () => {
        it('Should add a driver', () => {
            fleetManager.addDriver(driver1);
            const result = fleetManager.drivers.has(driver1.licenseNumber);
            expect(result).toBeTruthy();
        });
    
        it('Should throw an error if the driver is already added', () => {
            fleetManager.addDriver(driver1);
            expect(() => fleetManager.addDriver(driver1)).toThrowError();
        });
    });
    
    describe('removeDriver', () => {
        it('Should remove a driver', () => {
            fleetManager.addDriver(driver1);
            fleetManager.removeDriver(driver1.licenseNumber);
            const result = fleetManager.drivers.has(driver1.licenseNumber);
            expect(result).toBeFalsy();
        });
    });

    describe('addTrip', () => {
        it('Should add a trip', () => {
            fleetManager.addDriver(driver1);
            fleetManager.addVehicle(vehicle1);
            fleetManager.addTrip(1, 1, 'a', 'b', 40, 1);
            expect(fleetManager.trips.size).toBe(1);
        });
    
        it('Should throw an error if the driver is not available', () => {
            fleetManager.addVehicle(vehicle1);
            expect(() => fleetManager.addTrip(1, 1, 'a', 'b', 40, 1)).toThrowError();
        });
    
        it('Should throw an error if the vehicle is not available', () => {
            fleetManager.addDriver(driver1);
            expect(() => fleetManager.addTrip(1, 1, 'a', 'b', 40, 1)).toThrowError();
        });
    });
    
    describe('removeTrip', () => {
        it('Should remove a trip', () => {
            fleetManager.addDriver(driver1);
            fleetManager.addVehicle(vehicle1);
            fleetManager.addTrip(1, 1, 'a', 'b', 40, 1, 101);
    
            expect(fleetManager.trips.size).toBe(1);
    
            fleetManager.removeTrip(101);
            expect(fleetManager.trips.size).toBe(0);
        });
    });
    
    describe('getTrip', () => {
        it('Should return a trip by its ID', () => {
            fleetManager.addDriver(driver1);
            fleetManager.addVehicle(vehicle1);
            fleetManager.addTrip(1, 1, 'a', 'b', 40, 1, 101);
            expect(fleetManager.getTrip(101)).toEqual(fleetManager.trips.get(101));
        });
    });
    
    describe('getTrips', () => {
        it('Should return all trips', () => {
            const vehicle2 = new Vehicle('vehicle2', 'm1', 2024, 2);
            const driver2 = new Driver('driver2', 2, 2);
    
            fleetManager.addDriver(driver1);
            fleetManager.addVehicle(vehicle1);
    
            fleetManager.addDriver(driver2);
            fleetManager.addVehicle(vehicle2);
    
            fleetManager.addTrip(1, 1, 'a', 'b', 40, 1, 101);
            fleetManager.addTrip(2, 2, 'a', 'b', 40, 1, 102);
    
            expect(fleetManager.getTrips().length).toBe(2);
        });
    });
})
