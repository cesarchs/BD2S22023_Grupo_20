CREATE TABLE region (
    id INT PRIMARY KEY,
    identifier VARCHAR(50),
    nombre VARCHAR(50),
);

CREATE TABLE collections (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    url VARCHAR(255)
);

CREATE TABLE game(
    id_game INT PRIMARY KEY,
    name VARCHAR(50),
    first_release_date VARCHAR(50),
    summary VARCHAR(255),
    rating VARCHAR(50),
    aggregated_rating VARCHAR(50),
    local_rating VARCHAR(50),
    storyline VARCHAR(255),
    collections INT,
    FOREIGN KEY (collections) REFERENCES collections(id)
);

CREATE TABLE release_date (
    id INT PRIMARY KEY,
    date DATE,
    game VARCHAR(50),
    human VARCHAR(50),
    platform VARCHAR(50),
    region VARCHAR(50),
    status VARCHAR(50),
    month VARCHAR(10),
    year VARCHAR(10),
    id_game INT,
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_localization (
    id INT PRIMARY KEY,
    game INT,
    name VARCHAR(50),
    region INT,
    FOREIGN KEY (game) REFERENCES game(id_game),
    FOREIGN KEY (region) REFERENCES region(id)
);

CREATE TABLE genre (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
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
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE game_mode_game (
    id INT,
    id_game INT,
    PRIMARY KEY (id, id_game),
    FOREIGN KEY (id) REFERENCES genre(id),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE franchise(
    id INT PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
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
    comment VARCHAR(255),
    name VARCHAR(50),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE platform_enum (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE platform_family (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE platform (
    id INT PRIMARY KEY,
    abbreviation VARCHAR(50),
    alternative_name VARCHAR(50),
    platform_enum INT,
    generation VARCHAR(50),
    name VARCHAR(50),
    platform_family INT,
    summary VARCHAR(255),
    url VARCHAR(255),
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
    name VARCHAR(50),
    url VARCHAR(255)
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
    name VARCHAR(50),
    url VARCHAR(255)
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
    name VARCHAR(50),
    url VARCHAR(255),
    description VARCHAR(255)
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
    country VARCHAR(50),
    description VARCHAR(255),
    name VARCHAR(50),
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