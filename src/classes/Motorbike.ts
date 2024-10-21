// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  // Declare properties of the Motorbike class
  override vin!: string;
  color!: string;
  override make!: string;
  override model!: string;
  override year!: number;
  override weight!: number;
  override topSpeed!: number;
  wheels!: Wheel[];

  // Constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    // Call the constructor of the parent class, Vehicle
    super(vin, make, model, year, weight, topSpeed);

    // Initialize the properties of the Motorbike class
    this.color = color;

    // Check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
    this.wheels = wheels.length === 2 ? wheels : [new Wheel(), new Wheel()];
  }

  // Implement the wheelie method
  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  // Override the printDetails method from the Vehicle class
  override  printDetails(): void {
    // Call the printDetails method of the parent class
    super.printDetails();

    // Log the details of the Motorbike
    console.log(`Details: 
      VIN: ${this.vin}
      Make: ${this.make}
      Model: ${this.model}
      Year: ${this.year}
      Weight: ${this.weight} lbs
      Top Speed: ${this.topSpeed} MPH
      Color: ${this.color}
      Wheels: ${this.wheels.length} wheels`);
  }
}

// Export the Motorbike class as the default export
export default Motorbike;