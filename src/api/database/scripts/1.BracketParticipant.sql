CREATE TABLE IF NOT EXISTS BracketParticipant(
    "id"                INTEGER      NOT NULL UNIQUE, 
    "text"              VARCHAR      NOT NULL, 
    "image"             VARCHAR      NULL,
    "seedOrder"         INTEGER      NOT NULL,
    "bracketTemplateId" INTEGER      NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("bracketTemplateId") REFERENCES "BracketTemplate"("Id"));