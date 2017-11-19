DROP TABLE IF EXISTS Employee CASCADE;
DROP TABLE IF EXISTS Department CASCADE;
DROP TABLE IF EXISTS Production CASCADE;
DROP TABLE IF EXISTS Works_on CASCADE;
DROP TABLE IF EXISTS Manager CASCADE;
DROP TABLE IF EXISTS Timetable CASCADE;
DROP TABLE IF EXISTS M_Signs_T CASCADE;
DROP TABLE IF EXISTS Call_sheet CASCADE;
DROP TABLE IF EXISTS Payment CASCADE;


CREATE TABLE Department (
    Dept_id integer PRIMARY KEY,
    Dept_name text NOT NULL
  );
CREATE TABLE Employee (
    Employee_id integer PRIMARY KEY,
    Union_id integer,
    Hourly_rate integer NOT NULL,
    Occupation text NOT NULL,
    SIN integer,
    Name text NOT NULL,
    Dept_id integer REFERENCES Department ON DELETE CASCADE
  );
CREATE TABLE Production (
  Prod_id integer PRIMARY KEY,
  Prod_title text,
  Prod_company text
  );
CREATE TABLE Works_on (
  Employee_id integer REFERENCES Employee ON DELETE CASCADE,
  Prod_id integer REFERENCES Production ON DELETE CASCADE,
  PRIMARY KEY (Employee_id, Prod_id)
  );
CREATE TABLE Manager (
  Manager_id integer PRIMARY KEY,
  Employee_id integer REFERENCES Employee ON DELETE CASCADE,
  Manager_type text NOT NULL
  );
CREATE TABLE Timetable (
  Employee_id integer REFERENCES Employee ON DELETE CASCADE,
  Timetable_id BIGSERIAL PRIMARY KEY,
  Travel_start TIMESTAMP,
  Meal_time TIMESTAMP,
  Wrap_time TIMESTAMP,
  Travel_end TIMESTAMP
  );
CREATE TABLE M_Signs_T (
  Manager_id integer REFERENCES Manager ON DELETE CASCADE,
  Timetable_id integer REFERENCES Timetable ON DELETE CASCADE
  );
CREATE TABLE Call_sheet (
  Sheet_id BIGSERIAL PRIMARY KEY,
  Manager_id integer REFERENCES Manager ON DELETE CASCADE,
  Employee_id integer REFERENCES Employee ON DELETE CASCADE,
  Time TIMESTAMP NOT NULL,
  Location text NOT NULL
  );
CREATE TABLE Payment (
  Payment_id integer PRIMARY KEY,
  Manager_id integer REFERENCES Manager ON DELETE CASCADE,
  Employee_id integer REFERENCES Employee ON DELETE CASCADE,
  Payment_date DATE
  );

CREATE VIEW Current_payments as (
  SELECT *
  FROM Payment
  WHERE date_part('year', Payment_date) = date_part('year', CURRENT_DATE)
);

CREATE VIEW Current_call_sheets as (
  SELECT *
  FROM Call_sheet
  WHERE date_part('year', Time) = date_part('year', CURRENT_DATE)
);
  

INSERT INTO Department (Dept_id, Dept_name) VALUES
  (1000, 'Camera_Lighting'),
  (1001, 'Sound'),
  (1002, 'Art'),
  (1003, 'Stunts'),
  (1004, 'Location'),
  (1005, 'VFX'),
  (1006, 'Post_Production');

INSERT INTO Employee (Employee_id, Union_id, Hourly_rate, Occupation, SIN, Name, Dept_id) VALUES
  (200, 30000, 25, 'Cameraman', 40000000, 'John', 1000),
  (201, 30001, 20, 'Lights_Guy', 40000001, 'Jimmy', 1000),
  (202, 30002, 15, 'Mic_Handler', 40000002, 'Jack', 1001),
  (203, 30003, 20, 'Makeup_Artist', 40000003, 'Jill', 1002),
  (204, 30004, 50, 'Stuntman', 40000004, 'Jasper', 1003),
  (205, 30005, 50, 'Stuntman', 40000005, 'Jasper', 1003),
  (206, 30006, 20, 'Scout', 40000006, 'Justin', 1004),
  (207, 30007, 25, 'VFX_Worker', 40000007, 'Jules', 1005),
  (208, 30008, 40, 'VFX_Manager', 40000008, 'Jules', 1005),
  (209, 30009, 40, 'Editor', 40000009, 'Jason', 1006),
  (210, 30010, 40, 'Post_Production_Manager', 40000010, 'James', 1006);

INSERT INTO Production (Prod_id, Prod_company, Prod_title) VALUES
  (0, 'Universal', 'Jurassic_Park' ),
  (1, 'Disney', 'Frozen'),
  (2, 'Fox', 'Avatar'),
  (3, 'Paramount', 'Titanic'),
  (4, 'LucasFilm', 'Star_Wars');

  INSERT INTO Works_on (Employee_id, Prod_id) VALUES
  (200, 0),
  (201, 0),
  (202, 0),
  (203, 0),
  (206, 1),
  (207, 1),
  (208, 1),
  (209, 1),
  (210, 1),
  (208, 0),
  (210, 0);

  INSERT INTO Manager (Manager_id, Employee_id, Manager_type) VALUES
  (500, 208, 'VFX'),
  (501, 210, 'Post_Production');

  INSERT INTO Timetable (Employee_id, Timetable_id, Travel_start, Meal_time, Wrap_time, Travel_end) VALUES
  (200, 600, '2017-08-09 00:00:00', '2017-08-10 00:00:00', '2017-08-11 00:00:00', '2017-08-12 00:00:00'),
  (200, 601, '2000-01-01 00:00:00', '2001-01-01 00:00:00', '2002-01-01 00:00:00', '2003-01-01 00:00:00'),
  (200, 602, '2049-01-01 00:00:00', '2049-10-02 00:00:00', '2049-12-30 00:00:00', '2049-12-31 00:00:00'),
  (200, 603, '2016-02-29 00:00:00', '2016-02-29 00:00:00', '2016-02-29 00:00:00', '2016-02-29 00:00:00'),
  (201, 604, '2001-09-11 00:00:00', '2001-09-11 00:00:00', '2001-09-11 00:00:00', '2001-09-11 08:47:00'),
  (202, 605, '2001-09-11 00:00:00', '2001-09-11 00:00:00', '2001-09-11 00:00:00', '2001-09-11 09:03:00');

  INSERT INTO M_Signs_T (Manager_id, Timetable_id) VALUES
  (500, 604),
  (500, 605);


  INSERT INTO Call_sheet (Sheet_id, Manager_id, Employee_id, Time, Location) VALUES
  (700, 500, 201, '2001-09-10 00:00:00', 'Classified'),
  (701, 500, 202, '2001-09-10 00:00:00', 'Classified');

  INSERT INTO Payment (Payment_id, Manager_id, Employee_id, Payment_date) VALUES
  (800, 500, 201, '2001-09-11 08:47:00'),
  (801, 500, 202, '2001-09-11 09:03:00'),
  (802, 500, 201, '2001-09-11 08:47:00'),
  (803, 500, 202, '2017-09-11 09:03:00'),
  (804, 500, 201, '2017-08-11 08:47:00'),
  (805, 500, 202, '2017-07-11 09:03:00');

commit;