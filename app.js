const inquirer = require("inquirer")
const util = require("util")
const fs = require("fs")
const writeFileAsync = util.promisify(fs.writeFile)
const open = require("open")
const Employee = require("../TemplateGenerator/lib/Employee")
const Intern = require("../TemplateGenerator/lib/Intern")
const Manager = require("../TemplateGenerator/lib/Manager")
const Engineer = require("../TemplateGenerator/lib/Engineer")
const employeeList = []
const generateManagerHTML = require("../TemplateGenerator/templates/manager")
const generateInternHTML = require("../TemplateGenerator/templates/intern")
const generateEngineerHTML = require("../TemplateGenerator/templates/engineer")
const generateMainHTML = require("../TemplateGenerator/templates/main")

createEmployee()

function createEmployee() {
  promptUser().then(function (value) {
    let e = new Employee(value.name, value.id, value.email)
    if (value.role === "Manager") {
      promptManager().then(function (value) {
        let m = new Manager(e.name, e.id, e.email, value.officeNumber)
        employeeList.push(m)
        if (value.anotherEmployee === true) {
          createEmployee()
        }
        else {
          generateHTMLbyRole()
        }
      })
    }
    else if (value.role === "Intern") {
      promptIntern().then(function (value) {
        let i = new Intern(e.name, e.id, e.email, value.school)
        employeeList.push(i)
        if (value.anotherEmployee === true) {
          createEmployee()
        }
        else {
          generateHTMLbyRole()
        }
      })
    }
    else {
      promptEngineer().then(function (value) {
        let en = new Engineer(e.name, e.id, e.email, value.gihub)
        employeeList.push(en)
        if (value.anotherEmployee === true) {
          createEmployee()
        }
        else{
          generateHTMLbyRole()
        }
      })
    }
  })
}

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employee name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee email?",
        validate: value => value.includes("@") && value.includes(".com") ? true : 'email invalid'
      },
      {
        type: "list",
        name: "role",
        message: "What role are we adding?",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ])
  }
  
  function promptIntern() {
    return inquirer.prompt([
      {
        type: "input",
        name: "school",
        message: "what is their school?"
      },
      {
        type: "confirm",
        name: "anotherEmployee",
        message: "Would you like to add another employee?"
      }
    ])
  }
  
  function promptManager() {
    return inquirer.prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "what is your office?"
      },
      {
        type: "confirm",
        name: "anotherEmployee",
        message: "Would you like to add another employee?"
      }
    ])
  }
  
  function promptEngineer() {
    return inquirer.prompt([
      {
        type: "input",
        name: "gihub",
        message: "what is their github?"
      },
      {
        type: "confirm",
        name: "anotherEmployee",
        message: "Would you like to add another employee?"
      }
    ])
  }

  function generateHTMLbyRole() {
    let employees = ''
    employeeList.forEach(function (employee) {
      if (employee.officeNumber) {
        employees += generateManagerHTML(employee)
      }
      else if (employee.school) {
        employees += generateInternHTML(employee)
      }
      else {
        employees += generateEngineerHTML(employee)
      }
  
    })    
      let finalHTML = generateMainHTML(employees)
      return writeFileAsync("index.html", finalHTML)
      .then(function(){
        open('index.html')
    })
  }      
  