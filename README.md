# GREEN FOODS

A platform for direct vegetable sales, connecting vegetable owners with customers.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Introduction

This project facilitates the direct sale of vegetables, providing a platform for vegetable owners to manage orders through a dedicated dashboard. Users can register, log in, place orders, and view their order history while sellers can add, edit or delete vegetable details.(CRUD based application)

## Requirements

- Node.js
- MYSQL

## Installation

To install the project, run the following commands :

```bash
npm install
```

## Configuration

1. Open the config.js file.

2. Update the development section with your database connection details:

```bash
"development": {
    "username": "your_username",
    "password": "your_password",
    "database": "agriculture;",
    "host": "localhost",
    "dialect": "mysql"
},
```

Replace:

"your_username" with your MySQL username.
"your_password" with your MySQL password.
If you want to change the database schema name change it in the script 1 too.

3. Execute script 1 in your mysql server to create the schema.

4. Run both Frontend and Backend after navigating to them using two terminals. (make sure to enter the directory name correctly focusing the case sensitivity Eg: "Frontend"<--correct, "frontend<--wrong )

5. Execute script 2. This will add a Admin logins(only users can register through the site) to the database and some example data related vegetables.

6. By Entering username as "Admin" and password as "Admin" you can login to the admin account.

7. Normal buyers can register and login to the site.
