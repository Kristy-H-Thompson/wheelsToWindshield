/* 
------------------------------------------------------------------------------------------------------------

    IMPORTING CLASSES FROM OTHER FILES

------------------------------------------------------------------------------------------------------------ 
*/
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";




/* 
------------------------------------------------------------------------------------------------------------

  DEFINING THE CLI CLASS
  // TODO: update the vehicles property to accept Truck and Motorbike objects as well - COMPLETE
  // TODO: You will need to use the Union operator to define additional types for the array - COMPLETE
  // TODO: See the AbleToTow interface for an example of how to use the Union operator - COMPLETE
  // TODO: Update the constructor to accept Truck and Motorbike objects as well - COMPLETE

------------------------------------------------------------------------------------------------------------ 
*/

// Define the Cli class
class Cli {

// The vehicles property accepts car, truck and motorbike objects
// I acomplished this by using the Union operator 
vehicles: (Car | Truck | Motorbike)[];
selectedVehicleVin: string | undefined;
exit: boolean = false;

// This constructor accepts car, truck and motorbike objects as well
constructor(vehicles: (Car | Truck | Motorbike)[]) {
  this.vehicles = vehicles;
}

// Static method to generate a VIN using Math.random
static generateVin(): string {
  // return a random string
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Method to choose a vehicle from existing vehicles
chooseVehicle(): void {
  inquirer
  .prompt([
    {
    type: 'list',
    name: 'selectedVehicleVin',
    message: 'Select a vehicle to perform an action on',
    choices: this.vehicles.map((vehicle) => ({
    name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
    value: vehicle.vin,
    })),
    },
  ])
  .then((answers) => {
    this.selectedVehicleVin = answers.selectedVehicleVin;
    this.performActions();
  });
}


/* 
------------------------------------------------------------------------------------------------------------

  METHOD TO CREATE A VEHICLE
  // TODO: Update the choices array to include Truck and Motorbike - COMPLETE
  // TODO: add statements to create a truck or motorbike if the user selects the respective vehicle type - COMPLETE

------------------------------------------------------------------------------------------------------------ 
*/

  // Method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        switch (answers.vehicleType) {
          case 'Car':
            this.createCar();
            break;
          case 'Truck':
            this.createTruck();
            break;
          case 'Motorbike':
            this.createMotorbike();
            break;
        }
      });
  }

  // Method to create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // Method to create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // Method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
        { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
        { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
        { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(answers.frontWheelDiameter, answers.frontWheelBrand), new Wheel(answers.rearWheelDiameter, answers.rearWheelBrand)]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // Method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        const selectedVehicle = answers.vehicleToTow;
        if (selectedVehicle.vin === truck.vin) {
          console.log("A truck cannot tow itself.");
          this.performActions(); // Allow the user to select another action
        } else {
          truck.tow(selectedVehicle);
          console.log(`Towed vehicle: ${selectedVehicle.vin}`);
          this.performActions();
        }
      });
  }

  // Method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
        if (!selectedVehicle) return;

        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return; // Avoid calling performActions again
          case 'Exit':
            this.exit = true;
            return; // Exit the CLI
          default:
            break;
        }

        // If the selected vehicle is a truck, ask to find a vehicle to tow
        if (selectedVehicle instanceof Truck) {
          this.findVehicleToTow(selectedVehicle);
          return; // Avoid calling performActions again
        }

        // If the selected vehicle is a motorbike, allow the user to perform a wheelie
        if (selectedVehicle instanceof Motorbike) {
          selectedVehicle.wheelie();
        }

        // Continue performing actions
        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// Export the Cli class
export default Cli;