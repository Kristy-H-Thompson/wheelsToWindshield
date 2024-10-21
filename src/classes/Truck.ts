// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

// The Truck class extends the Vehicle class and implements the AbleToTow interface
class Truck extends Vehicle implements AbleToTow {
  // Declare properties of the Truck class
  override vin!: string;
  color!: string;
  override make!: string;
  override model!: string;
  override year!: number;
  override weight!: number;
  override topSpeed!: number;
  wheels!: Wheel[];
  towingCapacity!: number;

  // Create a constructor that accepts the properties of the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    towingCapacity: number,
    wheels: Wheel[] = []
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, make, model, year, weight, topSpeed); // Corrected: removed color

    // Initialize the properties of the Truck class
    this.color = color; // Initialize color here
    this.towingCapacity = towingCapacity;

    // Check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    if (wheels.length !== 4) {
      this.wheels = Array(4).fill(null).map(() => new Wheel(16, 'Default Brand')); // Assuming default diameter of 16 and brand
    } else {
      this.wheels = wheels;
    }
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    const { make, model, weight } = vehicle;

    if (weight <= this.towingCapacity) {
      console.log(`Towing vehicle: ${make} ${model}`);
    } else {
      console.log(`The vehicle ${make} ${model} is too heavy to be towed.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log(`Wheels: ${this.wheels.map(wheel => `Diameter: ${wheel.diameter}, Brand: ${wheel.tireBrand}`).join(', ')}`);
  }
}

// Export the Truck class as the default export
export default Truck;