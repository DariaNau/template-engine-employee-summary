const Employee = require("./lib");
const inquirer = require("inquirer");
const fs = require("fs");
let employeesHTML = "";

// create validation for numbers and email!
// const empID = [];

const empQ = [{
    name: "name",
    type: "input",
    message: "what is your name?"
  },
  {
    name: "id",
    type: "input",
    message: "Please enter id"
    // validate: val => {
    //   console.log("\t ID already taken! ");
    //   return !empID.includes(val);
    // }
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
  new: [{
    name: "confirm",
    message: "Would you like to add an employee to your team?",
    type: "list",
    choices: ["yes", "no"]
  }],
  another: [{
    name: "addNew",
    message: "Add another employee?",
    type: "list",
    choices: ["yes", "no"]
  }],
  employeeType: [{
    name: "add",
    message: "What type of employee would you like to add?",
    type: "list",
    choices: ["engineer", "intern", "none"]
  }],
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

function init() {
  inquirer
    .prompt(questions.manager)
    .then(manager => {
      // const managerData = new Manager (manager.name, manager.id, manager.email, manager.officeNumber);
      // console.log(manager);
      fs.readFile("./templates/manager.html", "utf8", (err, data) => {
        // console.log(data)
        if (err) throw err;
        const replaced = data
          .replace("{{name}}", manager.name)
          .replace("{{id}}", manager.id)
          .replace("{{email}}", manager.email)
          .replace("{{officeNumber}}", manager.officeNumber);
        employeesHTML += replaced;
        // console.log(replaced);
        inquirer.prompt(questions.new).then(newEmployee => {
          if (newEmployee.confirm == "yes") {
            addEmployee();
          } else {
            renderHtml(employeesHTML);
            console.log("Ok, bye!");
          }
        });
      });
    })
    .catch(error => console.log(error));
}

function addEmployee() {
  inquirer.prompt(questions.employeeType).then(employeeType => {
    if (employeeType.add === "engineer") {
      inquirer.prompt(questions.engineer).then(engineer => {
        fs.readFile("./templates/engineer.html", "utf8", (err, data) => {
          if (err) throw err;
          const replaced = data
            .replace("{{name}}", engineer.name)
            .replace("{{id}}", engineer.id)
            .replace("{{email}}", engineer.email)
            .replace("{{github}}", engineer.github);
          employeesHTML += replaced;
          addNew();
        });
      });
    } else if ((employeeType.add = "intern")) {
      inquirer.prompt(questions.intern).then(intern => {
        fs.readFile("./templates/intern.html", "utf8", (err, data) => {
          if (err) throw err;
          const replaced = data
            .replace("{{name}}", intern.name)
            .replace("{{id}}", intern.id)
            .replace("{{email}}", intern.email)
            .replace("{{school}}", intern.school);
          employeesHTML += replaced;
          addNew();
        });
      });
    } else if ((employeeType.add = "none")) {
      // renderHtml(employeesHTML);
      console.log("Ok, bye!");
    }
  });
}

function addNew() {
  inquirer.prompt(questions.another).then(runAgain => {
    if (runAgain.addNew == "yes") {
      addEmployee();
    } else {
      renderHtml(employeesHTML);
    }
  });
}

function renderHtml(replaced) {
  fs.readFile("./templates/main.html", "utf8", (err, data) => {
    if (err) throw err;
    let mainHtml = data.replace("{{main}}", replaced);
    fs.writeFile("./output/main.html", mainHtml, function (err) {
      if (err) throw err;
      console.log("Your team is ready to rock!");
    });
  });
}