// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    // Your port
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    // Employee database in schema
    database: "employee_db"
});

// Initiate MySQL Connection
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user    
    start();
});
// Start function to invoke prompts
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Scroll Up or Down to select a function.",
            choices: [
                "Add a department",
                "Add a role",
                "Add an employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee roles",
                "Exit"
            ]
        })
        // User's answer invokes the related functions
        .then(function(answer) {
            if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
            } else if (answer.action === 'View departments') {
                viewDepartments();
            } else if (answer.action === 'View roles') {
                viewRoles();
            } else if (answer.action === 'View employees') {
                viewEmployees();
            } else if (answer.action === 'Update employee roles') {
                updateRoles();
            } else if (answer.action === 'Exit') {
                connection.end();
            }
        })
}
// function to add a new department
function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What is the name for this new department?",
        })
        // Add department to table row
        .then(function(answer) {
            const query = "INSERT INTO department (name) VALUES ( ? )";
            connection.query(query, answer.department, function(err, res) {
                console.log(`You have added a new department: ${(answer.department).toUpperCase()}.`)
            })
            console.log("\n")
            viewDepartments();
        })
}
// function to add a new role
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
        inquirer
            .prompt([{
                    name: "title",
                    type: "input",
                    message: "What is the title for this new role?",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the hour salary for this new role?",
                },
                {
                    name: "departmentName",
                    type: "list",
                    message: "Which department does this new role belong?",
                    choices: function() {
                        const choicesArray = [];
                        res.forEach(res => {
                            choicesArray.push(
                                res.name
                            );
                        })
                        return choicesArray;
                    }
                }
            ])
            .then(function(answer) {
                const department = answer.departmentName;
                connection.query('SELECT * FROM DEPARTMENT', function(err, res) {

                    if (err) throw (err);
                    let filteredDept = res.filter(function(res) {
                            return res.name == department;
                        })
                        // Add role to table row
                    let id = filteredDept[0].id;
                    let query = "INSERT INTO role (title, hourly salary, department_id) VALUES (?, ?, ?)";
                    let values = [answer.title, parseInt(answer.salary_hour), id]
                    console.log(values);
                    connection.query(query, values,
                        function(err, res, fields) {
                            console.log(`You have added this new role: ${(values[0]).toUpperCase()}.`)
                        })
                    console.log("\n")
                    viewRoles()
                })
            })
    })
}
// function to add a new employee
async function addEmployee() {
    connection.query('SELECT * FROM role', function(err, result) {
        if (err) throw (err);
        inquirer
            .prompt([{
                    name: "firstName",
                    type: "input",
                    message: "What is the first name of the employee?",
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the last name of the employee?",
                },
                {
                    name: "roleName",
                    type: "list",
                    message: "What is the role for this employee?",
                    choices: function() {
                        rolesArray = [];
                        result.forEach(result => {
                            rolesArray.push(
                                result.title
                            );
                        })
                        return rolesArray;
                    }
                }
            ])

        .then(function(answer) {
            console.log(answer);
            const role = answer.roleName;
            connection.query('SELECT * FROM role', function(err, res) {
                if (err) throw (err);
                let filteredRole = res.filter(function(res) {
                    return res.title == role;
                })
                let roleId = filteredRole[0].id;
                connection.query("SELECT * FROM employee", function(err, res) {
                    inquirer
                        .prompt([{
                            name: "manager",
                            type: "list",
                            message: "Who is the manager?",
                            choices: function() {
                                managersArray = []
                                res.forEach(res => {
                                    managersArray.push(
                                        res.last_name)
                                })
                                return managersArray;
                            }
                        }]).then(function(managerAnswer) {
                            const manager = managerAnswer.manager;
                            connection.query('SELECT * FROM employee', function(err, res) {
                                if (err) throw (err);
                                let filteredManager = res.filter(function(res) {
                                    return res.last_name == manager;
                                })
                                let managerId = filteredManager[0].id;
                                console.log(managerAnswer);
                                // Add employee to table row
                                let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                                let values = [answer.firstName, answer.lastName, roleId, managerId]
                                console.log(values);
                                connection.query(query, values,
                                    function(err, res, fields) {
                                        console.log(`You have added a new employee: ${(values[0]).toUpperCase()}.`)
                                    })
                                console.log("\n")
                                viewEmployees();
                            })
                        })
                })
            })
        })
    })
}
// function to view departments
function viewDepartments() {
    const query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log("\n")
        console.log(`Departments:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        console.log("\n")
        start();
    });
};
// function to view roles
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
        console.log("\n")
        console.log(`Roles:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary_hour: ${role.salary_hour} | Department ID: ${role.department_id}`);
        })
        console.log("\n")
        start();
    });
};
// function to view employees
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
        console.log("\n")
        console.log(`Employees:`)
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        })
        console.log("\n")
        start();
    });
};
// function to update employee roles
function updateRoles() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
        inquirer
            .prompt([{
                name: "employeeName",
                type: "list",
                message: "Which employee's role is being updated?",
                choices: function() {
                    employeeArray = [];
                    result.forEach(result => {
                        employeeArray.push(
                            result.last_name
                        );
                    })
                    return employeeArray;
                }
            }])

        .then(function(answer) {
            console.log(answer);
            const name = answer.employeeName;

            connection.query("SELECT * FROM role", function(err, res) {
                inquirer
                    .prompt([{
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)

                            })
                            return rolesArray;
                        }
                    }]).then(function(rolesAnswer) {
                        const role = rolesAnswer.role;
                        console.log(rolesAnswer.role);
                        connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
                            if (err) throw (err);
                            let roleId = res[0].id;
                            let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                            let values = [roleId, name]
                            console.log(values);
                            connection.query(query, values,
                                function(err, res, fields) {
                                    console.log(`You have updated ${name}'s role to ${role}.`)
                                })
                            viewEmployees();
                        })
                    })
            })
        })
    })

}