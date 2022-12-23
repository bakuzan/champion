CREATE TABLE IF NOT EXISTS AppSetting(
    "id"            INTEGER      NOT NULL UNIQUE, 
    "key"           VARCHAR      NOT NULL UNIQUE, 
    "value"         VARCHAR      NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT));