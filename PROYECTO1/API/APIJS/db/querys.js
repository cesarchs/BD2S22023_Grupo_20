export const querys = {

    addCollection: "INSERT INTO collections (id, name, url) VALUES(@id, @name, @url);",
    addGenre: "INSERT INTO genre (id, name, url) VALUES(@id, @name, @url);",
    addGame_mode: "INSERT INTO game_mode (id, name, url) VALUES(@id, @name, @url);",
    addFranquicia: "INSERT INTO franchise (id, name, url) VALUES(@id, @name, @url);",
    addLanguageSupport: "INSERT INTO language_support (id, id_game, id_language, language_support_type) VALUES(@id, @id_game, @id_language, @language_support_type);",
};
