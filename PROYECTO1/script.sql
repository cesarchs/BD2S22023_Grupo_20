CREATE TABLE region (
    id INT PRIMARY KEY,
    identifier NVARCHAR(50),
    nombre NVARCHAR(50),
);

CREATE TABLE collections (
    id INT PRIMARY KEY,
    name NVARCHAR(100),
    url NVARCHAR(255)
);

CREATE TABLE game(
    id_game INT PRIMARY KEY,
    name NVARCHAR(MAX),
    first_release_date INT,
    summary NVARCHAR(MAX),
    rating DOUBLE,
    aggregated_rating DOUBLE,
    total_rating DOUBLE,
    storyline NVARCHAR(MAX),
    collections INT,
    FOREIGN KEY (collections) REFERENCES collections(id)
);

CREATE TABLE release_date (
    id INT PRIMARY KEY,
    date INT,
    human NVARCHAR(MAX),
    platform INT,
    region INT,
    status INT,
    m INT,
    y INT,
    id_game INT,
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_localization (
    id INT PRIMARY KEY,
    id_game INT,
    name NVARCHAR(50),
    id_region INT,
    FOREIGN KEY (game) REFERENCES game(id_game),
    FOREIGN KEY (region) REFERENCES region(id)
);

CREATE TABLE genre (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255)
);

CREATE TABLE genres_game(
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES genre(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_mode(
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255)
);

CREATE TABLE game_mode_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES game_mode(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE franchise(
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255)
);

CREATE TABLE franchise_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES franchise(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE alternative_name (
    id INT PRIMARY KEY,
    id_game INT,
    comment NVARCHAR(255),
    name NVARCHAR(50),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE platform_enum (
    id INT PRIMARY KEY,
    name NVARCHAR(50)
);

CREATE TABLE platform_family (
    id INT PRIMARY KEY,
    name NVARCHAR(50)
);

CREATE TABLE platform (
    id INT PRIMARY KEY,
    abbreviation NVARCHAR(50),
    alternative_name NVARCHAR(50),
    platform_enum INT,
    generation NVARCHAR(50),
    name NVARCHAR(50),
    platform_family INT,
    summary NVARCHAR(MAX),
    url NVARCHAR(255),
    FOREIGN KEY (platform_enum) REFERENCES platform_enum(id),
    FOREIGN KEY (platform_family) REFERENCES platform_family(id),     
);

CREATE TABLE platform_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id_game, id), 
    FOREIGN KEY (id) REFERENCES platform(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE theme (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255)
);

CREATE TABLE themes_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id_game, id),
    FOREIGN KEY (id) REFERENCES theme(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE player_perspective (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255)
);

CREATE TABLE player_perspective_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id_game, id),
    FOREIGN KEY (id) REFERENCES player_perspective(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_engine (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    url NVARCHAR(255),
    description NVARCHAR(MAX)
);

CREATE TABLE game_engine_platform (
    id_engine INT,
    id_platform INT,
    PRIMARY KEY (id_platform, id_engine),
    FOREIGN KEY (id_engine) REFERENCES game_engine(id),
    FOREIGN KEY (id_platform) REFERENCES platform(id)
);

CREATE TABLE game_engine_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES game_engine(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE company (
    id INT PRIMARY KEY,
    country NVARCHAR(50),
    description NVARCHAR(MAX),
    name NVARCHAR(MAX),
    start_date DATE
);

CREATE TABLE involved_company (
    id INT,
    company INT,
    game INT,
    developer VARCHAR(20),
    porting VARCHAR(20),
    publisher VARCHAR(20),
    supporting VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE game_engine_company (
    id_engine INT,
    id_company INT,
    PRIMARY KEY( id_company, id_engine),
    FOREIGN KEY (id_engine) REFERENCES game_engine(id),
    FOREIGN KEY (id_company) REFERENCES company(id)
);

CREATE TABLE language (
    id INT PRIMARY KEY,
    locale NVARCHAR(MAX),
    name NVARCHAR(MAX),
    native_name NVARCHAR()
);

CREATE TABLE language_support (
    id INT PRIMARY KEY,
    id_game INT,
    id_language INT,
    language_support_type INT    
);



----- D
CREATE PROCEDURE info_game
    @identificador NVARCHAR(MAX)
AS
BEGIN

    DECLARE @juego INT;
    IF ISNUMERIC(@identificador) = 1
        BEGIN
            SET @juego = CAST(@identificador AS INT);
        END
    ELSE
        BEGIN
            SELECT @juego = id_game
            FROM game
            WHERE name = @identificador;

            IF @juego IS NULL
                BEGIN
                    PRINT 'EL JUEGO ' + @identificador + ' NO EXISTE';
                    RETURN;
                END
        END
    SELECT
        ISNULL(g.name, 'Nombre no disponible') AS JUEGO,
        ISNULL(g.first_release_date, 0) AS Primera_Fecha_Lanzamiento,
        ISNULL(genre.name, 'Genero no disponible') AS Genero,
        ISNULL(p.name, 'Plataforma no disponible') AS Plataforma,
        ISNULL(g.summary, 'Resumen no disponible') AS Descripcion,
        ISNULL(g.rating, 0.0) AS Puntaje,
        ISNULL(g.aggregated_rating, 0.0) AS Puntaje_de_Critica,
        ISNULL(g.local_rating, 0.0) AS Puntaje_Total,
        ISNULL(g.storyline, 'Sin descripción') AS Sinopsis,
        ISNULL(g.id_game, 0) AS ID_Juego,
        ISNULL(p.name, 'Plataforma no disponible') AS Plataforma_Lista,
        ISNULL(rd.human, 'Fecha de lanzamiento no disponible') AS Fecha_de_lanzamiento,
        ISNULL(ic.developer, 'false') AS Developer,
        ISNULL(ic.publisher, 'false') AS Publisher,
        ISNULL(ic.porting, 'false') AS Porting,
        ISNULL(ic.supporting, 'false') AS Supporting,
        ISNULL(gm.name, 'Modo de Juego no disponible') AS Modo_de_Juego,
        ISNULL(genre.name, 'Genero no disponible') AS Genero_Lista,
        ISNULL(t.name, 'Tema no disponible') AS Theme,
        ISNULL(col.name, 'Serie no disponible') AS Series,
        ISNULL(pp.name, 'Perspectiva de jugador no disponible') AS Player_Perspective,
        ISNULL(f.name, 'Franquicia no disponible') AS Franquicia,
        ISNULL(r.nombre, 'Region no disponible') AS Region,
        ISNULL(gl.name, 'Franquiciano disponible') AS Localizacion_titulo,
        ISNULL(an.name, 'Nombre Alternativo no disponible') AS Nombre_Alternativo
        
    FROM game AS g
    LEFT JOIN genres_game AS gg ON gg.id_game = g.id_game
    LEFT JOIN genre ON gg.id = genre.id
    LEFT JOIN game_mode_game AS gmg ON gmg.id_game = g.id_game
    LEFT JOIN game_mode AS gm ON gmg.id = gm.id
    LEFT JOIN franchise_game AS fg ON fg.id_game = g.id_game
    LEFT JOIN franchise AS f ON fg.id = f.id
    LEFT JOIN player_perspective_game AS ppg ON ppg.id_game = g.id_game
    LEFT JOIN player_perspective AS pp ON ppg.id = pp.id
    LEFT JOIN themes_game AS tg ON tg.id_game = g.id_game
    LEFT JOIN theme AS t ON tg.id = t.id
    LEFT JOIN platform_game AS pg ON pg.id_game = g.id_game
    LEFT JOIN platform AS p ON pg.id = p.id
    LEFT JOIN involved_company AS ic ON ic.game = g.id_game
    LEFT JOIN company AS c ON ic.company = c.id
    LEFT JOIN collections AS col ON g.collections = c.id
    LEFT JOIN game_localization AS gl ON gl.id_game = g.id_game
    LEFT JOIN region AS r ON gl.id_region = r.id
    LEFT JOIN release_date AS rd ON rd.id_game = g.id_game
    LEFT JOIN alternative_name AS an ON an.id_game = g.id_game
    WHERE g.id_game = @juego;
END;


------2
--2
CREATE PROCEDURE BuscarJuegosPorNombre
    @nombreBuscado NVARCHAR(255)
AS
BEGIN
    IF LEN(@nombreBuscado) < 5
    BEGIN
        PRINT 'La cadena de búsqueda debe tener al menos 5 caracteres.'
    END
    ELSE
    BEGIN
        SELECT
            g.name AS nombre,
            p.name AS plataforma,
            g.rating AS rating,
            g.aggregated_rating AS valoracion,
            ge.name AS genero
        FROM
            game AS g
        INNER JOIN
            platform_game AS pg ON g.id_game = pg.id_game
        INNER JOIN
            platform AS p ON pg.id = p.id
        INNER JOIN
            genres_game AS gg ON g.id_game = gg.id_game
        INNER JOIN
            genre AS ge ON gg.id = ge.id
        WHERE
            g.name LIKE '%' + @nombreBuscado + '%'
            AND LEN(@nombreBuscado) > 4
        ORDER BY
            g.rating DESC, g.aggregated_rating DESC;
    END
END;



-------3

CREATE PROCEDURE VersionesPlataforma
    @nombreBuscado NVARCHAR(MAX)
AS
BEGIN
    IF LEN(@nombreBuscado) < 5
    BEGIN
        PRINT 'La cadena de búsqueda debe tener al menos 5 caracteres.'
    END
    ELSE
    BEGIN
        SELECT
        ISNULL(g.name, 'Nombre no disponible') AS JUEGO,
        ISNULL(g.first_release_date, 0) AS Primera_Fecha_Lanzamiento,
        ISNULL(genre.name, 'Genero no disponible') AS Genero,
        ISNULL(p.name, 'Plataforma no disponible') AS Plataforma,
        ISNULL(g.summary, 'Resumen no disponible') AS Descripcion,
        ISNULL(g.rating, 0.0) AS Puntaje,
        ISNULL(g.aggregated_rating, 0.0) AS Puntaje_de_Critica,
        ISNULL(g.local_rating, 0.0) AS Puntaje_Total,
        ISNULL(g.storyline, 'Sin descripción') AS Sinopsis,
        ISNULL(g.id_game, 0) AS ID_Juego,
        ISNULL(p.name, 'Plataforma no disponible') AS Plataforma_Lista,
        ISNULL(rd.human, 'Fecha de lanzamiento no disponible') AS Fecha_de_lanzamiento,
        ISNULL(ic.developer, 'false') AS Developer,
        ISNULL(ic.publisher, 'false') AS Publisher,
        ISNULL(ic.porting, 'false') AS Porting,
        ISNULL(ic.supporting, 'false') AS Supporting,
        ISNULL(gm.name, 'Modo de Juego no disponible') AS Modo_de_Juego,
        ISNULL(genre.name, 'Genero no disponible') AS Genero_Lista,
        ISNULL(t.name, 'Tema no disponible') AS Theme,
        ISNULL(col.name, 'Serie no disponible') AS Series,
        ISNULL(pp.name, 'Perspectiva de jugador no disponible') AS Player_Perspective,
        ISNULL(f.name, 'Franquicia no disponible') AS Franquicia,
        ISNULL(r.nombre, 'Region no disponible') AS Region,
        ISNULL(gl.name, 'Franquiciano disponible') AS Localizacion_titulo,
        ISNULL(an.name, 'Nombre Alternativo no disponible') AS Nombre_Alternativo
        
    FROM game AS g
    LEFT JOIN genres_game AS gg ON gg.id_game = g.id_game
    LEFT JOIN genre ON gg.id = genre.id
    LEFT JOIN game_mode_game AS gmg ON gmg.id_game = g.id_game
    LEFT JOIN game_mode AS gm ON gmg.id = gm.id
    LEFT JOIN franchise_game AS fg ON fg.id_game = g.id_game
    LEFT JOIN franchise AS f ON fg.id = f.id
    LEFT JOIN player_perspective_game AS ppg ON ppg.id_game = g.id_game
    LEFT JOIN player_perspective AS pp ON ppg.id = pp.id
    LEFT JOIN themes_game AS tg ON tg.id_game = g.id_game
    LEFT JOIN theme AS t ON tg.id = t.id
    LEFT JOIN platform_game AS pg ON pg.id_game = g.id_game
    LEFT JOIN platform AS p ON pg.id = p.id
    LEFT JOIN involved_company AS ic ON ic.game = g.id_game
    LEFT JOIN company AS c ON ic.company = c.id
    LEFT JOIN collections AS col ON g.collections = c.id
    LEFT JOIN game_localization AS gl ON gl.id_game = g.id_game
    LEFT JOIN region AS r ON gl.id_region = r.id
    LEFT JOIN release_date AS rd ON rd.id_game = g.id_game
    LEFT JOIN alternative_name AS an ON an.id_game = g.id_game
        WHERE
            g.name LIKE '%' + @nombreBuscado + '%'
            AND LEN(@nombreBuscado) > 4
        ORDER BY
            p.name DESC, g.name DESC;
    END
END;