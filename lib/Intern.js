// In addition to Employee's properties and methods, Intern will also have:

// school

// getSchool()

// getRole() // Overridden to return 'Intern'

const Employee = require ('./Employee');

class Intern extends Employee {
    constructor (name, id, email, school){
        super (name, id, email);
        this.school = school;
    }

    getRole(){
        return 'Intern';
    }

    getSchool(){
        return this.school;
    }
}

module.exports = Intern