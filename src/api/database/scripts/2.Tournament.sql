CREATE TABLE IF NOT EXISTS Tournament(
    "id"            INTEGER     NOT NULL UNIQUE, 
    "name"          VARCHAR     NOT NULL, 
    "description"   VARCHAR     NULL,
    "createdAt"     DATETIME    NOT NULL DEFAULT (DATETIME(current_timestamp)),
    PRIMARY KEY("id" AUTOINCREMENT));