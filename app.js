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

