-- Creacion de tablas
CREATE TABLE PACIENTE (
    idPaciente      INT PRIMARY KEY,
    edad   INT NOT NULL,
    genero VARCHAR(20) NOT NULL
);

CREATE TABLE HABITACION (
    idHabitacion     INT PRIMARY KEY,
    Habitacion VARCHAR(50) NOT NULL
);

CREATE TABLE LOG_HABITACION(
    timestamp     VARCHAR(100) ,
    idHabitacion  INT         NOT NULL,
    status         VARCHAR(45) NOT NULL,
    CONSTRAINT PK_LOG_HABITACION PRIMARY KEY (idHabitacion,timestamp),
    FOREIGN KEY (idHabitacion) REFERENCES HABITACION (idHabitacion)
);

CREATE TABLE LOG_ACTIVIDAD (
   id_log_actividad            INT AUTO_INCREMENT PRIMARY KEY,
   PACIENTE_idPaciente    INT          NOT NULL,
   HABITACION_idHabitacion  INT          NOT NULL,
   timestamp     VARCHAR(100) NOT NULL,
   actividad    VARCHAR(500) NOT NULL,
   FOREIGN KEY (PACIENTE_idPaciente) REFERENCES PACIENTE (idPaciente),
   FOREIGN KEY (HABITACION_idHabitacion ) REFERENCES HABITACION(idHabitacion)
);

-- Selects
SELECT * FROM HABITACION;
SELECT COUNT(*) FROM HABITACION;

SELECT * FROM LOG_ACTIVIDAD;
SELECT COUNT(*) FROM LOG_ACTIVIDAD;

SELECT * FROM PACIENTE;
SELECT COUNT(*) FROM PACIENTE;

SELECT * FROM LOG_HABITACION;
SELECT COUNT(*) FROM LOG_HABITACION;


-- Eliminar datos
DELETE FROM LOG_ACTIVIDAD where timestamp <> '';
DELETE FROM LOG_HABITACION where timestamp <> '';
DELETE FROM PACIENTE where idPaciente > 0;
DELETE FROM HABITACION where idHabitacion>0;


-- Dia 1
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Habitaciones.csv' INTO TABLE habitacion FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- mysqldump -u root -p basespractica2 > G:\Backups\full_backup_dia1.sql
-- mysqldump -u root -p basespractica2 habitacion > G:\Backups\incremental_backup_dia1.sql

-- Dia 2
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/Pacientes.csv' INTO TABLE paciente FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
-- mysqldump -u root -p basespractica2 > G:\Backups\full_backup_dia2.sql
-- mysqldump -u root -p basespractica2 paciente > G:\Backups\incremental_backup_dia2.sql

-- Dia 3
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades1.csv'
INTO TABLE log_actividad
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(timestamp, actividad, HABITACION_idHabitacion, PACIENTE_idPaciente);
-- mysqldump -u root -p basespractica2 > G:\Backups\full_backup_dia3.sql
-- mysqldump -u root -p basespractica2 log_actividad > G:\Backups\incremental_backup_dia3.sql

-- Dia 4
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogActividades2.csv' INTO TABLE log_actividad
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(timestamp, actividad, HABITACION_idHabitacion, PACIENTE_idPaciente);
-- mysqldump -u root -p basespractica2 > G:\Backups\full_backup_dia4.sql
-- mysqldump -u root -p basespractica2 log_actividad --where="id_log_actividad > 33841"  > G:\Backups\incremental_backup_dia4.sql

-- Dia 5
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/LogHabitacion.csv'
INTO TABLE log_habitacion FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS
(idHabitacion, timestamp, status);
-- mysqldump -u root -p basespractica2 > G:\Backups\full_backup_dia5.sql
-- mysqldump -u root -p basespractica2 log_habitacion > G:\Backups\incremental_backup_dia5.sql


-- Dia 6
-- Get-Content "G:\Backups\full_backup_dia1.sql" | mysql -u root -p basespractica2

-- Dia 7
-- Get-Content "G:\Backups\full_backup_dia2.sql" | mysql -u root -p basespractica2

-- Dia 8
-- Get-Content "G:\Backups\full_backup_dia3.sql" | mysql -u root -p basespractica2

-- Dia 9
-- Get-Content "G:\Backups\full_backup_dia4.sql" | mysql -u root -p basespractica2

-- Dia 10
-- Get-Content "G:\Backups\full_backup_dia5.sql" | mysql -u root -p basespractica2

-- Dia 11
-- Get-Content "G:\Backups\incremental_backup_dia1.sql" | mysql -u root -p basespractica2

-- Dia 12
-- Get-Content "G:\Backups\incremental_backup_dia2.sql" | mysql -u root -p basespractica2

-- Dia 13
-- Get-Content "G:\Backups\incremental_backup_dia3.sql" | mysql -u root -p basespractica2

-- Dia 14
-- Get-Content "G:\Backups\incremental_backup_dia4.sql" | mysql -u root -p basespractica2

-- Dia 15
-- Get-Content "G:\Backups\incremental_backup_dia5.sql" | mysql -u root -p basespractica2