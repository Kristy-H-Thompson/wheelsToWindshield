/* 
------------------------------------------------------------------------------------------------------------

    IMPORTING CLASSES FROM OTHER FILES

------------------------------------------------------------------------------------------------------------ 
*/
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';


/* 
------------------------------------------------------------------------------------------------------------

    CREATE CAR CLASS

------------------------------------------------------------------------------------------------------------ 
*/

// Car class that extends Vehicle class
class Car extends Vehicle {
  // Declare properties of the Car class
  override vin!: string;
  color!: string;
  override make!: string;
  override model!: string;
  override year!: number;
  override weight!: number;
  override topSpeed!: number;
  wheels: Wheel[];

  // Constructor for the Car class
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

    // Initialize properties of the Car class
    this.color = color;

    // Check if the wheels array has 4 elements
    // If not, create 4 new Wheel objects
    // Otherwise, use the provided wheels array
    if (wheels.length !== 4) {
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    // Call the printDetails method of the parent class, Vehicle
    super.printDetails();

    // Print details of the Car class
    console.log(`Color: ${this.color}`);

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`
      );
    });
  }
}

// Export the Car class as the default export
export default Car;