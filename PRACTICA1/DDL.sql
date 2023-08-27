select * from [practica1].[Course]

-- TRANSACCIONES

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

-- FUNCIONES