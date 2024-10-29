/* 
------------------------------------------------------------------------------------------------------------

    IMPORTING CLASSES FROM OTHER FILES

------------------------------------------------------------------------------------------------------------ 
*/
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';




/* 
------------------------------------------------------------------------------------------------------------

    CREATE MOTORBIKE CLASS
    // TODO: The Motorbike class should extend the Vehicle class - COMPLETE
    // TODO: Declare properties of the Motorbike class - COMPLETE
    // TODO: The properties should include vin, color, make, model, year, weight, top speed, and wheels - COMPLETE
    // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[])- COMPLETE
    // TODO: Create a constructor that accepts the properties of the Motorbike class - COMPLETE
    // TODO: The constructor should call the constructor of the parent class, Vehicle - COMPLETE
    // TODO: The constructor should initialize the properties of the Motorbike class - COMPLETE
    // TODO: The constructor should check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not - COMPLETE
    // TODO: Implement the wheelie method - COMPLETE
    // TODO: The method should log the message "Motorbike [make] [model] is doing a wheelie!" - COMPLETE
    // TODO: Override the printDetails method from the Vehicle class - COMPLETE
    // TODO: The method should call the printDetails method of the parent class - COMPLETE
    // TODO: The method should log the details of the Motorbike - COMPLETE
    // TODO: The details should include the VIN, make, model, year, weight, top speed, color, and wheels - COMPLETE

------------------------------------------------------------------------------------------------------------ 
*/

// The Motorbike class extends the Vehicle class
class Motorbike extends Vehicle {
  // Declaring properties of the Motorbike class
  // The ! syntax in TypeScript is called the "definite assignment assertion." It tells the TypeScript compiler that you are confident the property will be assigned a value before it is accessed, even if it isn't initialized in the constructor.
  // Reasource used for definite assignment assertion: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
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
    // Reasource used to figue out how to use super https://www.typescriptlang.org/docs/handbook/classes.html
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
  //  the override keyword will assert that the function it describes is present in the parent class. This will help cut down on typos, and can give you a heads up if you were not aware that a function was changed/removed in the parent class.
  // Reasource used to figure out override https://dev.to/lioness100/introducing-typescript-override-keyword-4b36
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