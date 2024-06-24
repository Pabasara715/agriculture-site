insert into  agriculture.users values (1,"Admin","$2b$10$DW/G2aSF/y5mgOiqT2XwguvsXy9M1yU0vQ2DuEQBkcrFFJdEjSTg.","Admin",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

INSERT INTO agriculture.vegetabledata VALUES (2, 'tomato', 5, 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO agriculture.vegetabledata VALUES (3, 'carrot', 12, 300, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO agriculture.vegetabledata VALUES (4, 'onion', 10, 180, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO agriculture.vegetabledata VALUES (5, 'bell pepper', 7, 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO agriculture.vegetabledata VALUES (6, 'cucumber', 9, 250, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


// {
//   "development": {
//     "username": "root",
//     "password": "luzifer715",
//     "database": "agriculture",
//     "host": "db",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "db",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "db",
//     "dialect": "mysql"
//   }
// }

{
  "development": {
    "username": "root",
    "password": "luzifer715",
    "database": "agriculture",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
