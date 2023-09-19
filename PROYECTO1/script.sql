CREATE TABLE region (
    checksum VARCHAR(50) PRIMARY KEY,
    identifier VARCHAR(50),
    nombre VARCHAR(50),
);

CREATE TABLE collections (
    checksum VARCHAR(50) PRIMARY KEY,
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
    collections VARCHAR(50),
    FOREIGN KEY (collections) REFERENCES collections(checksum)
);

CREATE TABLE release_date (
    checksum VARCHAR(50) PRIMARY KEY,
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
    checksum VARCHAR(50) PRIMARY KEY,
    game INT,
    name VARCHAR(50),
    region VARCHAR(50),
    FOREIGN KEY (game) REFERENCES game(id_game),
    FOREIGN KEY (region) REFERENCES region(checksum)
);

CREATE TABLE genre (
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE genres_game(
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (checksum, id_game),
    FOREIGN KEY (checksum) REFERENCES genre(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_mode(
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE game_mode_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (checksum, id_game),
    FOREIGN KEY (checksum) REFERENCES genre(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE franchise(
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE franchise_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (checksum, id_game),
    FOREIGN KEY (checksum) REFERENCES franchise(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE alternative_name (
    checksum VARCHAR(50) PRIMARY KEY,
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
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE platform (
    checksum VARCHAR(50) PRIMARY KEY,
    abbreviation VARCHAR(50),
    alternative_name VARCHAR(50),
    platform_enum INT,
    generation VARCHAR(50),
    name VARCHAR(50),
    platform_family VARCHAR(50),
    summary VARCHAR(255),
    url VARCHAR(255),
    FOREIGN KEY (platform_enum) REFERENCES platform_enum(id),
    FOREIGN KEY (platform_family) REFERENCES platform_family(checksum),     
);

CREATE TABLE platform_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (id_game, checksum), 
    FOREIGN KEY (checksum) REFERENCES platform(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE theme (
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE themes_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (id_game, checksum),
    FOREIGN KEY (checksum) REFERENCES theme(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE player_perspective (
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255)
);

CREATE TABLE player_perspective_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (id_game, checksum),
    FOREIGN KEY (checksum) REFERENCES player_perspective(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_engine (
    checksum VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    url VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE game_engine_platform (
    checksum_engine VARCHAR(50),
    checksum_platform VARCHAR(50),
    PRIMARY KEY (checksum_platform, checksum_engine),
    FOREIGN KEY (checksum_engine) REFERENCES game_engine(checksum),
    FOREIGN KEY (checksum_platform) REFERENCES platform(checksum)
);

CREATE TABLE game_engine_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (checksum, id_game),
    FOREIGN KEY (checksum) REFERENCES game_engine(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE company (
    checksum VARCHAR(50) PRIMARY KEY,
    country VARCHAR(50),
    description VARCHAR(255),
    name VARCHAR(50),
    start_date DATE
);

CREATE TABLE company_game (
    checksum VARCHAR(50),
    id_game INT,
    PRIMARY KEY (checksum, id_game),
    FOREIGN KEY (checksum) REFERENCES company(checksum),
    FOREIGN KEY (id_game) REFERENCES game(id_game)
);

CREATE TABLE game_engine_company (
    checksum_engine VARCHAR(50),
    checksum_company VARCHAR(50),
    PRIMARY KEY( checksum_company, checksum_engine),
    FOREIGN KEY (checksum_engine) REFERENCES game_engine(checksum),
    FOREIGN KEY (checksum_company) REFERENCES company(checksum)
);