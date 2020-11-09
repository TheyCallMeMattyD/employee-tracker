//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//Create the connection information for the sql database
const connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "",
    database: "employeesDB",
});

connection.connect(function(err) {
    if (err) throw err;
    promptUser();
});

//Questions
const questions = [{
    type: "list",
    name: "optionForStart",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "View Departments",
        "Add Employee",
        "Update Employee roles",
        "Exit",
    ],
}, ];

function promptUser() {
    inquirer.prompt(questions).then((res) => {
        switch (res.optionForStart) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee roles":
                updateEmployeeRole();
                break;
            case "Exit":
                connection.end();
                break;
            default:
                connection.end();
        }
    });

    function viewAllEmployees() {
        connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    }

    function addEmployee() {
        connection.query("SELECT * FROM role ORDER BY title", function(err, res) {
            if (err) throw err;
            const roleChoices = res.map(({ id, title }) => ({
                value: id,
                name: `${title}`,
            }));

            connection.query(
                "SELECT DISTINCT(concat(first_name,' ',last_name)) manager, id, first_name, last_name FROM employee",
                function(err, res1) {
                    if (err) throw err;
                    const managerChoices = res1.map(({ id, manager }) => ({
                        value: id,
                        name: `${manager}`,
                    }));
                    inquirer
                        .prompt([{
                                type: "input",
                                name: "firstName",
                                message: "What is the employee's first name?",
                                validate: function(value) {
                                    if (value === "") {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                },
                            },
                            {
                                type: "input",
                                name: "lastName",
                                message: "What is the employee's last name?",
                                validate: function(value) {
                                    if (value === "") {
                                        return false;
                                    } else {
                                        return true;
                                    }
                                },
                            },
                            {
                                type: "list",
                                name: "role",
                                message: "What is the role of the new employee?",
                                choices: roleChoices,
                            },
                            {
                                type: "list",
                                name: "manager",
                                message: "Who is the employeer's manager?",
                                choices: managerChoices,
                            },
                        ])
                        .then((answers) => {
                            connection.query(
                                "INSERT INTO employee SET ?", {
                                    first_name: answers.firstName,
                                    last_name: answers.lastName,
                                    role_id: answers.role,
                                    manager_id: answers.manager,
                                },
                                function(err) {
                                    if (err) throw new Error(err);

                                    console.log("Employee added succesfully.");

                                    promptUser();
                                }
                            );
                        });
                }
            );
        });
    }

    function viewDepartments() {
        connection.query("SELECT * FROM department first_name", function(
            err,
            res
        ) {
            if (err) throw err;
            console.table(res);
            promptUser();
        });
    }

    function updateEmployeeRole() {
        connection.query(
            "SELECT DISTINCT(concat(first_name,' ',last_name)) id, first_name, last_name FROM employee",
            function(err, res2) {
                if (err) throw err;
                const employeeChoices = res2.map(({ id, first_name, last_name }) => ({
                    value: id,
                    name: `${first_name} ${last_name}`,
                }));
                // console.log(employeeChoices);
                connection.query(
                    "SELECT DISTINCT(concat(first_name,' ',last_name)) manager, id, first_name, last_name FROM employee",
                    function(err, res1) {
                        if (err) throw err;
                        const managerChoices = res1.map(({ id, manager }) => ({
                            value: id,
                            name: `${manager}`,
                        }));

                        inquirer
                            .prompt([{
                                    type: "list",
                                    name: "role_update",
                                    message: "Which employee's manager do you want to update?",
                                    choices: employeeChoices,
                                },
                                {
                                    type: "list",
                                    name: "update_manager",
                                    message: "Which employee's do you want set as manager for the selected employee?",
                                    choices: managerChoices,
                                },
                            ])
                            .then((answers) => {
                                const [first_name, last_name] = answers.role_update.split(" ");

                                connection.query(
                                    "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?",

                                    [answers.update_manager, first_name, last_name],

                                    function(err) {
                                        if (err) throw new Error(err);

                                        console.log("Employee role updated succesfully.");
                                        promptUser();
                                    }
                                );
                            });
                    }
                );
            }
        );
    }
}