export const querys = {

    addCollection: "INSERT INTO collections (id, name, url) VALUES(@id, @name, @url);",
    addGenre: "INSERT INTO genre (id, name, url) VALUES(@id, @name, @url);",
    addGame_mode: "INSERT INTO game_mode (id, name, url) VALUES(@id, @name, @url);",
    addFranquicia: "INSERT INTO franchise (id, name, url) VALUES(@id, @name, @url);",
    addLanguageSupport: "INSERT INTO language_support (id, id_game, id_language, language_support_type) VALUES(@id, @id_game, @id_language, @language_support_type);",
    addlanguagesupporttype: "INSERT INTO language_support_type (id, name) VALUES(@id, @name);",
    addLanguage: "INSERT INTO language (id, name, native_name, locale) VALUES(@id, @name, @native_name, @locale);",
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


    addrelease_date: "INSERT INTO release_date (id, date, human, platform, region, status, m, y, id_game) VALUES(@id, @date, @human, @platform, @region, @status, @m, @y, @id_game);",



    version: "INSERT INTO version (id_platform, id_platform_version) VALUES(@id_platform, @id_platform_version);",
    platform_version_releasedate: "INSERT INTO platform_version_releasedate (id, category, date, human, m, region, y) VALUES (@id, @category, @date, @human, @m, @region, @y);",
    platform_version: "INSERT INTO platform_version (id, name, connectivity, cpu, graphics, media, memory, online, os, platform_logo, resolutions, slug, sound, storage, summary, url) VALUES (@id, @name, @connectivity, @cpu, @graphics, @media, @memory, @online, @os, @platform_logo, @resolutions, @slug, @sound, @storage, @summary, @url);",
    Platform_version_company: "INSERT INTO Platform_version_company (id, comment, company, developer, manufacturer) VALUES (@id, @comment, @company, @developer, @manufacturer);",
    platform_releases: "INSERT INTO platform_releases (id_Platform_version_releasedate, id_Platform_version) VALUES (@id_Platform_version_releasedate, @id_Platform_version);",
    Platform_company: "INSERT INTO Platform_company (id_Platform_version_company, id_Platform_version) VALUES (@id_Platform_version_company, @id_Platform_version);"
};
