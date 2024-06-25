import fs from 'node:fs/promises'

// GLOBAL VARIABLES -------------------------------------

let employees = [];

// Loading and writing data to the filesystem -------------------------------------
const loadData = async () => {
  console.log("Loading employees.....")
  try {
    const fileData = await fs.readFile('./data.json');
    employees = JSON.parse(fileData);
  } catch (err) {
    console.log("Cannot load in Employees");
    throw err;
  }
}

const writeData = async () => {
  console.log("Writing employees....");
    try {
      fs.writeFile('./data.json', JSON.stringify(employees, null, 2));
    } catch (err) {
      console.error("Cannot write employees data.");
      throw err;
    }
}


import createPrompt from 'prompt-sync';
let prompt = createPrompt();

// Get the command the user wants to exexcute
const command = process.argv[2].toLowerCase();

switch (command) {

  case 'list':
    console.log(`Employee List ----------------------------`);
    console.log('');

    for (let emp of employees) {
      for (let property in emp) {
        console.log(`${property}: ${emp[property]}`);
      }
      console.log('');
      prompt('Press enter to continue...');
    }
    console.log(`Employee list completed`);
    break;

  case 'add':
    console.log(`Add Employee -----------------------------`);
    console.log('');
    let employee = {};

    let firstName = prompt("First Name: ");
    if (!firstName) {
      console.error(`Invalid first name`);
      process.exit(1);
    }
    employee.firstName = firstName;

    let lastName = prompt("Last Name: ");
    if (!lastName) {
      console.error(`Invalid last name`);
      process.exit(1);
    }
    employee.lastName = lastName;

    let startDateYear = prompt("Employee Start Year (1990-2023): ");
    startDateYear = Number(startDateYear);
    // Check if it is a valid integer
    if (!Number.isInteger(startDateYear)) {
      console.error(`Enter a valid start date year`);
      process.exit(1);
    }
    // Check if the number is in the range
    if (startDateYear < 1990 || startDateYear > 2023) {
      console.error(`Enter a start date year within the correct range`);
      process.exit(1);
    }

    let startDateMonth = prompt("Employee Start Date Month (1-12): ");
    startDateMonth = Number(startDateMonth);
    // Check if it is a valid integer
    if (!Number.isInteger(startDateMonth)) {
      console.error(`Enter a valid start date month`);
      process.exit(1);
    }
    // Check if the number is in the range
    if (startDateMonth < 1 || startDateMonth > 12) {
      console.error(`Enter a start date month within the correct range`);
      process.exit(1);
    }

    let startDateDay = prompt("Employee Start Date Day (1-31): ");
    startDateDay = Number(startDateDay);
    // Check if it is a valid integer
    if (!Number.isInteger(startDateDay)) {
      console.error(`Enter a valid start date day`);
      process.exit(1);
    }
    // Check if the number is in the range
    if (startDateDay < 1 || startDateDay > 31) {
      console.error(`Enter a start date day within the correct range`);
      process.exit(1);
    }

    // Date elements are correct, let's create the date
    employee.startDate = new Date(startDateYear, startDateMonth - 1, startDateDay);

    let isActive = prompt("Is employee active (yes or no): ");
    // Check if incorrect value was entered
    if (isActive !== "yes" && isActive !== "no") {
      console.error(`Enter yes or no for employee active status`);
      process.exit(1);
    }
    employee.isActive = (isActive === "yes");

    // Output Employee JSON
    const json = JSON.stringify(employee, null, 2);
    console.log(`Employee: ${json}`);
    break;

  default:
    console.log('Unsupported command. Exiting...');
    process.exit(1);

}



