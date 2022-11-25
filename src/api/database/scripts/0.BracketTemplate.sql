CREATE TABLE IF NOT EXISTS BracketTemplate(
    "id"            INTEGER      NOT NULL UNIQUE, 
    "name"          VARCHAR      NOT NULL, 
    "description"   VARCHAR      NULL,
    PRIMARY KEY("id" AUTOINCREMENT));