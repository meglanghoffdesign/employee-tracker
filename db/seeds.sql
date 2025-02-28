-- Reset the sequences for department and role tables to avoid duplicate key issues
ALTER SEQUENCE department_id_seq RESTART WITH 1;
ALTER SEQUENCE role_id_seq RESTART WITH 1;

-- Optional: Clear existing data in the tables if necessary
DELETE FROM employee;
DELETE FROM role;
DELETE FROM department;

-- Department table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Marketing');

-- Role table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 75000, 1),
('Software Engineer', 100000, 2),
('Marketing Director', 95000, 3);

-- Modify employee table to allow manager_id to be NULL
ALTER TABLE employee
  ALTER COLUMN manager_id DROP NOT NULL;

-- Insert Alice first (no manager)
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Alice', 'Johnson', 1, NULL);  -- Alice has no manager

-- Insert other employees, referencing Alice as their manager
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ('Bob', 'Smith', 2, 1),       -- Bob reports to Alice
  ('Charlie', 'Brown', 2, 1),   -- Charlie reports to Alice
  ('David', 'Wilson', 3, 1);    -- David reports to Alice