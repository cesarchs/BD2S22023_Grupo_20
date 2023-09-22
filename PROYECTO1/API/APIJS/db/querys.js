export const querys = {

    addCollection: "INSERT INTO collections (id, name, url) VALUES(@id, @name, @url);",
    addCompany: "INSERT INTO company (id, country, description, name, start_date) VALUES(@id, @country, @description, @name, @start_date);",
    addplatform_family: "INSERT INTO platform_family (id, name) VALUES(@id, @name);",
    addplatoform: "INSERT INTO platform (id, abbreviation, alternative_name, platform_enum, generation, name, platform_family, summary, url) VALUES(@id, @abbreviation, @alternative_name, @platofrm_enum, @generation, @name, @platform_family, @summary, @url);",
    addengine: "INSERT INTO game_engine (id, name, url, description) VALUES(@id, @name, @url, @description);",
    addengine_company: "INSERT INTO game_engine_company (id_engine, id_company) VALUES(@id_engine, @id_company);",
    addengine_platform: "INSERT INTO game_engine_platform (id_engine, id_platform) VALUES(@id_engine, @id_platform);",
    addrelease_date: "INSERT INTO release_date (id, date, human, platform, region, status, m, y, id_game) VALUES(@id, @date, @human, @platform, @region, @status, @m, @y, @id_game);",
};
