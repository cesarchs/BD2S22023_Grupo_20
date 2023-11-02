--1
CREATE VIEW Top100Games AS
SELECT TOP 100
    g.name AS nombre,
    (
        SELECT STRING_AGG(p.name, ', ') WITHIN GROUP (ORDER BY p.name)
        FROM platform_game AS pg
        INNER JOIN platform AS p ON pg.id = p.id
        WHERE pg.id_game = g.id_game
    ) AS plataformas,
    g.rating AS rating,
    g.aggregated_rating AS valoracion,
    (
        SELECT STRING_AGG(ge.name, ', ') WITHIN GROUP (ORDER BY ge.name)
        FROM genres_game AS gg
        INNER JOIN genre AS ge ON gg.id = ge.id
        WHERE gg.id_game = g.id_game
    ) AS generos
FROM game AS g
ORDER BY g.rating DESC, g.aggregated_rating DESC;

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

-- CONSULTA 3


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

-- CONSULTA 4


CREATE VIEW TOP100CONSULTA4 AS
WITH GameLanguageCount AS (
    SELECT
        ls.id_game,
        COUNT(DISTINCT ls.id_language) AS supportedLanguages
    FROM
        language_support ls
    WHERE
        ls.language_support_type IN (1, 2, 3)
    GROUP BY
        ls.id_game
),
RankedGames AS (
    SELECT
        g.id_game,
        g.name,
        g.rating,
        glc.supportedLanguages,
        RANK() OVER(ORDER BY g.rating DESC, g.name, glc.supportedLanguages DESC) AS rnk
    FROM
        GameLanguageCount glc
    JOIN game g ON glc.id_game = g.id_game
)
SELECT
    rg.id_game,
    rg.name,
    rg.rating,
    ls.id_language,
    l.name AS LanguageName,
    lst.name AS SupportType
FROM
    RankedGames rg
JOIN language_support ls ON rg.id_game = ls.id_game
JOIN language l ON ls.id_language = l.id
JOIN language_support_type lst ON ls.language_support_type = lst.id
WHERE
    rg.rnk <= 100;


-- CONSULTA 5



SELECT
    sub.game_name,
    sub.genre_name,
    sub.platform_name,
    sub.rating
FROM
    (
        SELECT
            g.name AS game_name,
            gen.name AS genre_name,
            p.name AS platform_name,
            g.rating,
            RANK() OVER(PARTITION BY gen.id ORDER BY g.rating DESC, p.name) AS rnk
        FROM
            game g
        JOIN
            genres_game gg ON g.id_game = gg.id_game
        JOIN
            genre gen ON gg.id = gen.id
        JOIN
            platform_game pg ON g.id_game = pg.id_game
        JOIN
            platform p ON pg.id = p.id
    ) AS sub
WHERE
    sub.rnk <= 100
ORDER BY
    sub.genre_name, sub.rating DESC, sub.platform_name;



----- ENUNCIADO 
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
