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

    addAlternative_Name: "INSERT INTO alternative_name (id, id_game, comment, name) VALUES(@id, @id_game, @comment, @name);",

    addGame_Localization: "INSERT INTO game_localization (id, id_game, name, id_region) VALUES(@id, @id_game, @name, @id_region);",
    
    addInvolved_Company: "INSERT INTO involved_company (id, company, game, developer, porting, publisher, supporting) VALUES(@id, @company, @game, @developer, @porting, @publisher, @supporting);",

    addengine: "INSERT INTO game_engine (id, name, url, description) VALUES(@id, @name, @url, @description);",
    addengine_company: "INSERT INTO game_engine_company (id_engine, id_company) VALUES(@id_engine, @id_company);",
    addengine_platform: "INSERT INTO game_engine_platform (id_engine, id_platform) VALUES(@id_engine, @id_platform);",


};
