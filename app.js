const Employee = require('./lib');
const inquirer = require('inquirer');
const fs = require('fs');

const empID = ['1']

const empQ = [
    {
        name: 'name',
        type: 'input',
        message: 'what is your name?'
    },
    {
        name: 'id',
        type: 'input',
        message: 'Enter id',
        validate: val => {
            console.log("\t ID already taken! ")
            return !empID.includes(val)
        }
    },
    {
        name: 'email',
        type: 'input',
        message: 'Enter email?'
    }
]
const questions = {
    manager: [
        ...empQ,
        {
            name: 'officeNumber',
            type: 'input',
            message: 'Enter office number'
        }
    ],
    intern: [
        ...empQ,
        {
            name: 'school',
            type: 'input',
            message: 'Enter school'
        }
    ],
    enginner: [
        ...empQ,
        {
            name: 'github',
            type: 'input',
            message: 'Enter github'
        }
    ],
}


init()

async function init(){
    try {
        const manager = await inquirer.prompt(questions.manager)
        console.log(manager)
    } catch (error) {
        console.log(error)
    }
}