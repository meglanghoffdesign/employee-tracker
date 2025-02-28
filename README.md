# Employee Tracker

## Lisence Badge
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description
The Employee Tracker application is a command-line interface (CLI) tool that helps manage a company's employee database. The app allows users to view departments, roles, and employees, and also add new departments, roles, and employees, as well as update employee roles. It uses PostgreSQL as the database and allows for easy manipulation and retrieval of employee data.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
1. To get started, clone the repository to your local machine using the following command: git clone https://github.com/your-username/employee-tracker.git
2. Next, navigate into the project directory: cd employee-tracker
3. Install the following: npm install
4. Then, navigate into the db folder: cd db/
5. Log into to SQL by running: psql -U postgres & 0204
6. Then, run the following commands: \i schema.sql; & \i seeds.sql;
7. Quit out of SQL: \q 
8. Navigate back to your main directory folder: cd ..
9. Run: npx tsc
10. After that, you can run the project with: node dist/server.js

## Usage
Once the application is running, you will be presented with an interactive menu that allows you to manage the employee database. The prompt will ask you what action you would like to take, with options like:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

You can select any option by typing the number corresponding to your choice. For example, if you select View all departments, the program will display a table of all departments in the database. If you choose Add an employee, you'll be prompted to enter the employee's details, such as first name, last name, role, and manager. After completing any action, you’ll be returned to the main menu to continue interacting with the application or to exit. If you select Exit, the program will close.

## License
[MIT License](https://opensource.org/licenses/MIT)

## Contributing
At this time, contributions to this project are not accepted. Please feel free to fork the repository for personal use or modifications. Any pull requests or issues will not be reviewed or merged.

## Tests
Currently, no automated tests are implemented. You can manually test the application by entering different city names and verifying the responses.

## Questions
If you have any questions, feel free to reach out to me at [meglanghoff@gmail.com](mailto:meglanghoff@gmail.com) or visit my GitHub profile at [https://github.com/meglanghoffdesign](https://github.com/meglanghoffdesign).
