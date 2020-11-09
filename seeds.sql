USE employee_db;
-- Insert 4 rows of data into the department table
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Config Management");
INSERT INTO department (name) VALUES ("Quality Control");
INSERT INTO department (name) VALUES ("Production");
-- Insert 6 rows of data into the role table
INSERT INTO role (title, salary_hour, department_id) VALUES ("Mech Engineer", 50, 1);
INSERT INTO role (title, salary_hour, department_id) VALUES ("Elec Engineer", 50, 1);
INSERT INTO role (title, salary_hour, department_id) VALUES ("CM Analyst", 30, 2);
INSERT INTO role (title, salary_hour, department_id) VALUES ("Checker", 30, 3);
INSERT INTO role (title, salary_hour, department_id) VALUES ("Fabricator", 25, 4);
INSERT INTO role (title, salary_hour, department_id) VALUES ("Welder", 25, 4);
-- Insert 5 rows of data into the employee table
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Trea", "Turner", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Juan", "Soto", 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Victor", "Robles", 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Adam", "Eaton", 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Yan", "Gomes", 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Michael", "Taylor", 6);