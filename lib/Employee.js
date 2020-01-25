class Employee {
    constructor(name, id, email, role){
        // if (!email) {
        //     throw new Error("You are missing the email.");
        //   }
        //   if (!id) {
        //     throw new Error("You are missing the id.");
        //   }
        //   if (!role) {
        //     throw new Error("You are missing the role.");
        //   } 
        this.name = name     
        this.id = id
        this.email = email
        //this.role = role
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return "Employee"
    }
}

module.exports = Employee