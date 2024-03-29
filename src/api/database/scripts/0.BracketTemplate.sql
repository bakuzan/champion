CREATE TABLE IF NOT EXISTS BracketTemplate(
    "id"                INTEGER      NOT NULL UNIQUE, 
    "name"              VARCHAR      NOT NULL, 
    "description"       VARCHAR      NULL,
    "createdAt"         DATETIME     NOT NULL DEFAULT (DATETIME(current_timestamp)),    
    "isDeleted"         BIT          NOT NULL DEFAULT (0),
    "deletedAt"         DATETIME     NULL,
    "includePlayoff"    BIT          NOT NULL DEFAULT (0),
    PRIMARY KEY("id" AUTOINCREMENT));