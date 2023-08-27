select * from [practica1].[Course]

-- TRANSACCIONES
GO
CREATE PROCEDURE TR1
@Firstname NVARCHAR(MAX), @Lastname NVARCHAR(MAX), @Email NVARCHAR(MAX), @DateOfBirth DATETIME2(7), @Password NVARCHAR(MAX), @Credits INT
AS
BEGIN
	--GENERAR ID
	DECLARE @ID UNIQUEIDENTIFIER
	SET @ID = NEWID()
 	--BUSCAR ID DEL ROL DE ESTUDIANTE
	DECLARE @Rol UNIQUEIDENTIFIER
	SET @Rol = (SELECT Id FROM practica1.Roles WHERE RoleName = 'Student')
	--FECHA DE CREACIÓN
	DECLARE @CurrDate DATETIME2(7)
	SET @CurrDate = GETDATE()

	--VER SI EXISTE EL CORREO
	IF (SELECT Email FROM practica1.Usuarios WHERE Email = @Email) IS NULL
		BEGIN
			--REGISTRAR DEL USUARIO
			INSERT INTO practica1.Usuarios(Id, Firstname, Lastname, Email, DateOfBirth, Password, LastChanges, EmailConfirmed)
			VALUES(@ID, @Firstname, @Lastname, @Email, @DateOfBirth, @Password, @CurrDate, 0);
			--ASIGNAR ROL DE ESTUDIANTE
			INSERT INTO practica1.UsuarioRole(RoleId, UserId, IsLatestVersion)
			VALUES(@Rol, @ID, 0);
			--CREAR PERFIL DE ESTUDIANTE
			INSERT INTO practica1.ProfileStudent(UserId, Credits)
			VALUES(@ID, @Credits)
			--CREARE TFA PARA USAURIO
			INSERT INTO practica1.TFA(UserId, Status, LastUpdate)
			VALUES(@ID, 0, @CurrDate);
			--NOTIFICION
			INSERT INTO practica1.Notification(UserId, Message, Date)
			VALUES(@ID, 'Usuario Creado', @CurrDate)

		END;
	ELSE
		RAISERROR ( 'Email ya está registrado.',1,1); --TIRAR EL ERROR XD
END;

-- PR4
GO
 CREATE PROCEDURE [practica1].[PR4]
    @RoleName NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Existencia del rol
    IF NOT EXISTS (SELECT 1 FROM [practica1].[Roles] WHERE [RoleName] = @RoleName)
    BEGIN

        INSERT INTO [practica1].[Roles] ([Id], [RoleName])
        VALUES (NEWID(), @RoleName);

        PRINT 'Rol creado exitosamente: ' + @RoleName;
    END
    ELSE
    BEGIN
        PRINT 'El rol ya existe: ' + @RoleName;
    END
END;

-- TRIGGERS

--------USUARIOS


 -- Insert
 GO
	create trigger Trigger1
	on practica1.Usuarios
	for insert
	as
	begin
	set nocount on;
	insert into practica1.HistoryLog (Date,Description) select getDate(), 'Se hizo un INSERT en la tabla Usuarios satisfactoriamente.'
	from inserted
	end



	-- Delete
GO
	create trigger Trigger2
	on practica1.Usuarios instead of delete
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se elimino con exito un Usuario de la tabla.'
	from deleted
	end

	-- Update
GO
	create trigger Trigger3
	on [practica1].[Usuarios]
	for update
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se actualizo con exito un Usuario.'
	end

 -- Insert
 GO
	create trigger Trigger1
	on practica1.Usuarios
	for insert
	as
	begin
	set nocount on;
	insert into practica1.HistoryLog (Date,Description) select getDate(), 'Se hizo un INSERT en la tabla Usuarios satisfactoriamente.'
	from inserted
	end



	-- Delete
GO
	create trigger Trigger2
	on practica1.Usuarios instead of delete
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se elimino con exito un Usuario de la tabla.'
	from deleted
	end

	-- Update
GO
	create trigger Trigger3
	on [practica1].[Usuarios]
	for update
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se actualizo con exito un Usuario.'
	end





	     -- Insert
 GO
	create trigger Trigger1
	on practica1.Usuarios
	for insert
	as
	begin
	set nocount on;
	insert into practica1.HistoryLog (Date,Description) select getDate(), 'Se hizo un INSERT en la tabla Usuarios satisfactoriamente.'
	from inserted
	end



	-- Delete
GO
	create trigger Trigger2
	on practica1.Usuarios instead of delete
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se elimino con exito un Usuario de la tabla.'
	from deleted
	end

	-- Update
GO
	create trigger Trigger3
	on [practica1].[Usuarios]
	for update
	as
	begin
	set nocount on;
	insert into [practica1].[HistoryLog] (Date,Description) select getDate(), 'Se actualizo con exito un Usuario.'
	end




-- FUNCIONES

	    /*
-- Func_course_usuarios
*/
GO
CREATE FUNCTION practica1.F1(@CodCourse INT)
	RETURNS TABLE
	AS
	RETURN
	SELECT US.FirstName, US.LastName, US.Email, US.DateOfBirth
	FROM practica1.Usuarios US, practica1.CourseAssignment CA, practica1.Course C
	WHERE US.Id = CA.StudentId
	AND CA.CourseCodCourse = C.CodCourse
	AND C.CodCourse = @CodCourse;

-- F2
GO
CREATE FUNCTION practica1.F1(@CodCourse INT)
	RETURNS TABLE
	AS
	RETURN
	SELECT US.FirstName, US.LastName, US.Email, US.DateOfBirth
	FROM practica1.Usuarios US, practica1.CourseAssignment CA, practica1.Course C
	WHERE US.Id = CA.StudentId
	AND CA.CourseCodCourse = C.CodCourse
	AND C.CodCourse = @CodCourse;


-- F3
GO
CREATE FUNCTION practica1.F1(@CodCourse INT)
	RETURNS TABLE
	AS
	RETURN
	SELECT US.FirstName, US.LastName, US.Email, US.DateOfBirth
	FROM practica1.Usuarios US, practica1.CourseAssignment CA, practica1.Course C
	WHERE US.Id = CA.StudentId
	AND CA.CourseCodCourse = C.CodCourse
	AND C.CodCourse = @CodCourse;

--F4
GO
CREATE FUNCTION practica1.F1(@CodCourse INT)
	RETURNS TABLE
	AS
	RETURN
	SELECT US.FirstName, US.LastName, US.Email, US.DateOfBirth
	FROM practica1.Usuarios US, practica1.CourseAssignment CA, practica1.Course C
	WHERE US.Id = CA.StudentId
	AND CA.CourseCodCourse = C.CodCourse
	AND C.CodCourse = @CodCourse;

-- F5
GO
CREATE FUNCTION practica1.F1(@CodCourse INT)
	RETURNS TABLE
	AS
	RETURN
	SELECT US.FirstName, US.LastName, US.Email, US.DateOfBirth
	FROM practica1.Usuarios US, practica1.CourseAssignment CA, practica1.Course C
	WHERE US.Id = CA.StudentId
	AND CA.CourseCodCourse = C.CodCourse
	AND C.CodCourse = @CodCourse;
