export const querys = {

    addCollection: "INSERT INTO collections (id, name, url) VALUES(@id, @name, @url);",
    addRegion: "INSERT INTO region (id, identifier, nombre) VALUES(@id, @identifier, @name);",
    addTheme: "INSERT INTO theme (id, name, url) VALUES(@id, @name, @url);",
    addPlayer_Perspective: "INSERT INTO player_perspective (id, name, url) VALUES(@id, @name, @url);",
    addGame: "INSERT INTO game (id_game, name, first_release_date, summary, rating, aggregated_rating, local_rating, storyline, collections) VALUES(@id, @name, @first_release_date, @summary, @rating, @aggregated_rating, @local_rating, @storyline, @collections);",
    addGenre_Game: "INSERT INTO genres_game (id, id_game) VALUES(@id, @id_game);",
    addGame_Mode_Game: "INSERT INTO game_mode_game (id, id_game) VALUES(@id, @id_game);",
    addFranchise_Game: "INSERT INTO franchise_game (id, id_game) VALUES(@id, @id_game);",
    addGame_Engine_Game: "INSERT INTO game_engine_game (id, id_game) VALUES(@id, @id_game);",
    addPlayer_Perspective_Game: "INSERT INTO player_perspective_game (id, id_game) VALUES(@id, @id_game);",
    addThemes_Game: "INSERT INTO themes_game (id, id_game) VALUES(@id, @id_game);",
    addPlatform_Game: "INSERT INTO platform_game (id, id_game) VALUES(@id, @id_game);",
    addCompany_Game: "INSERT INTO platform_game (id, id_game) VALUES(@id, @id_game);",


};
