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
    name NVARCHAR(50),
    first_release_date NVARCHAR(50),
    summary NVARCHAR(MAX),
    rating NVARCHAR(50),
    aggregated_rating NVARCHAR(50),
    local_rating NVARCHAR(50),
    storyline NVARCHAR(255),
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
    id_game INT
);

CREATE TABLE game_localization (
    id INT PRIMARY KEY,
    id_game INT,
    name NVARCHAR(MAX),
    id_region INT
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
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE alternative_name (
    id INT PRIMARY KEY,
    id_game INT,
    comment NVARCHAR(MAX),
    name NVARCHAR(MAX)
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
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE company (
    id INT PRIMARY KEY,
    country NVARCHAR(50),
    description NVARCHAR(MAX),
    name NVARCHAR(MAX),
    start_date DATE
);

CREATE TABLE company_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES company(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_engine_company (
    id_engine INT,
    id_company INT,
    PRIMARY KEY( id_company, id_engine),
    FOREIGN KEY (id_engine) REFERENCES game_engine(id),
    FOREIGN KEY (id_company) REFERENCES company(id)
);

CREATE TABLE language (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES company(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_engine_company (
    id_engine INT,
    id_company INT,
    PRIMARY KEY( id_company, id_engine),
    FOREIGN KEY (id_engine) REFERENCES game_engine(id),
    FOREIGN KEY (id_company) REFERENCES company(id)
);


DELETE FROM game WHERE id_game > 0;
DELETE FROM genres_game WHERE id > 0;
DELETE FROM game_mode_game  WHERE id > 0;
DELETE FROM franchise_game WHERE id > 0;
DELETE FROM game_engine_game WHERE id > 0;
DELETE FROM player_perspective_game WHERE id > 0;
DELETE FROM themes_game WHERE id > 0;
DELETE FROM platform_game WHERE id > 0;
DELETE FROM game WHERE id > 0;
DELETE FROM game WHERE id > 0;