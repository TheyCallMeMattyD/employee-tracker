USE employees_db;

----- Department Seeds -----

INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (id, name)
VALUES (2, "Service");

INSERT INTO department (id, name)
VALUES (3, "Human Resouces");

INSERT INTO department (id, name)
VALUES (4, "IT");

----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Salesman", 50000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Mechanic", 45000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Sales Manager", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Shop Manager", 75000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Owner", 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Personnel Mangager", 750000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Website Designer", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Database Manager", 75000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "IT Department Manager", 75000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Matthew", "Daniels", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Tom", "Minnuto", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "David", "Hammell", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "Robert", "Hornbaker", 9, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Steve", "Chostner", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Tim", "Kernan", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mike", "Babbit", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Wyatt", "Warnick", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Sean", "Hawkins", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Craig", "Herndon", 8, 10);