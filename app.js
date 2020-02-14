const Employee = require("./lib");
const inquirer = require("inquirer");
const fs = require("fs");

const empID = [];

const empQ = [
  {
    name: "name",
    type: "input",
    message: "what is your name?"
  },
  {
    name: "id",
    type: "input",
    message: "Please enter id",
    validate: val => {
      console.log("\t ID already taken! ");
      return !empID.includes(val);
    }
  },
  {
    name: "email",
    type: "input",
    message: "Please enter email"
  }
];
const questions = {
  manager: [
    ...empQ,
    {
      name: "officeNumber",
      type: "input",
      message: "Please enter office number"
    }
  ],
  new: [
    {
      name: "confirm",
      message: "Would you like to add an employee to your team?",
      type: "list",
      choices: ["yes", "no"]
    }
  ],
  another: [
    {
      name: "addNew",
      message: "Add another employee?",
      type: "list",
      choices: ["yes", "no"]
    }
  ],
  employeeType: [
    {
      name: "add",
      message: "What type of employee would you like to add?",
      type: "list",
      choices: ["engineer", "intern", "none"]
    }
  ],
  intern: [
    ...empQ,
    {
      name: "school",
      type: "input",
      message: "Please enter school"
    }
  ],
  engineer: [
    ...empQ,
    {
      name: "github",
      type: "input",
      message: "Please enter github username"
    }
  ]
};

init();

async function init() {
  try {
    const manager = await inquirer.prompt(questions.manager);
    //maybe we go ahead and construct that manager html here?
    console.log("Answer:", manager);
    const newEmployee = await inquirer.prompt(questions.new);
    if (newEmployee.confirm == "yes") {
      addEmployee();
    } else {
      console.log("Ok, bye!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function addEmployee() {
  const employeeType = await inquirer.prompt(questions.employeeType);
  if (employeeType.add === "engineer") {
    const engineer = await inquirer.prompt(questions.engineer);
    console.log("Answers:", engineer);
    const runAgain = await inquirer.prompt(questions.another);
    if (runAgain.addNew == "yes") {
      addEmployee();
    } else {
      console.log("Ok, bye!");
    }
  } else if ((employeeType.add = "intern")) {
    const intern = await inquirer.prompt(questions.intern);
    console.log("Answers:", intern);
    const runAgain = await inquirer.prompt(questions.another);
    if (runAgain.addNew == "yes") {
      addEmployee();
    } else {
      console.log("Ok, bye!");
    }
  } else if ((employeeType.add = "none")) {
    console.log("Ok, bye!");
  }
}