export const querys = {

    addCollection: "INSERT INTO collections (id, name, url) VALUES(@id, @name, @url);",
    addGenre: "INSERT INTO genre (id, name, url) VALUES(@id, @name, @url);",
    addGame_mode: "INSERT INTO game_mode (id, name, url) VALUES(@id, @name, @url);",
    addFranquicia: "INSERT INTO franchise (id, name, url) VALUES(@id, @name, @url);",
};
