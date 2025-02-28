import inquirer from 'inquirer';
import { pool, connectToDb } from './connection.js';

// Function to view all departments
const viewDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  console.table(result.rows); 
};

// Function to view all roles
const viewRoles = async () => {
  const result = await pool.query('SELECT role.id, role.title, role.salary, department.name as department FROM role JOIN department ON role.department_id = department.id');
  console.table(result.rows); 
};

// Function to view all employees
const viewEmployees = async () => {
  const result = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager.first_name as manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
  `);
  console.table(result.rows); // Format data as a table
};

// Function to add a department
const addDepartment = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
      validate: (input) => input ? true : 'Department name cannot be empty.',
    },
  ]);

  await pool.query('INSERT INTO department (name) VALUES ($1)', [answer.name]);
  console.log(`Department "${answer.name}" added successfully.`);
};

// Function to add a role
const addRole = async () => {
  const departmentsResult = await pool.query('SELECT * FROM department');
  const departments = departmentsResult.rows.map((dept: any) => ({
    name: dept.name,
    value: dept.id
  }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
      validate: (input) => input ? true : 'Role title cannot be empty.',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
      validate: (input) => !isNaN(parseFloat(input)) ? true : 'Salary must be a valid number.',
    },
    {
      type: 'list',
      name: 'department',
      message: 'Choose the department for the role:',
      choices: departments,
    },
  ]);

  await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [answer.title, parseFloat(answer.salary), answer.department]
  );
  console.log(`Role "${answer.title}" added successfully.`);
};

// Function to add an employee
const addEmployee = async () => {
  const rolesResult = await pool.query('SELECT * FROM role');
  const roles = rolesResult.rows.map((role: any) => ({
    name: role.title,
    value: role.id
  }));

  const employeesResult = await pool.query('SELECT * FROM employee');
  const employees = employeesResult.rows.map((emp: any) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
      validate: (input) => input ? true : 'First name cannot be empty.',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
      validate: (input) => input ? true : 'Last name cannot be empty.',
    },
    {
      type: 'list',
      name: 'role',
      message: 'Choose the role for the employee:',
      choices: roles,
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Choose the manager for the employee (or select "None" for no manager):',
      choices: [...employees, { name: 'None', value: null }],
    },
  ]);

  await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [answer.first_name, answer.last_name, answer.role, answer.manager]
  );
  console.log(`${answer.first_name} ${answer.last_name} added successfully.`);
};

// Function to update an employee role
const updateEmployeeRole = async () => {
  const employeesResult = await pool.query('SELECT * FROM employee');
  const employees = employeesResult.rows.map((emp: any) => ({
    name: `${emp.first_name} ${emp.last_name}`,
    value: emp.id
  }));

  const rolesResult = await pool.query('SELECT * FROM role');
  const roles = rolesResult.rows.map((role: any) => ({
    name: role.title,
    value: role.id
  }));

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select an employee to update:',
      choices: employees,
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the new role for the employee:',
      choices: roles,
    },
  ]);

  await pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [answer.role, answer.employee]
  );
  console.log('Employee role updated successfully.');
};

// Inquirer Menu Function
const showMainMenu = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ],
    },
  ]);

  switch (answer.action) {
    case 'View all departments':
      await viewDepartments();
      break;
    case 'View all roles':
      await viewRoles();
      break;
    case 'View all employees':
      await viewEmployees();
      break;
    case 'Add a department':
      await addDepartment();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'Update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Exiting the application.');
      process.exit();
      break;
  }

  showMainMenu(); // Re-run the menu
};

// Start the application
const startApp = async () => {
  await connectToDb();
  showMainMenu(); // Show the main menu after connecting
};

startApp();
