CREATE TABLE IF NOT EXISTS TournamentParticipant(
    "id"                INTEGER      NOT NULL UNIQUE, 
    "text"              VARCHAR      NOT NULL, 
    "imageUrl"          VARCHAR      NULL,
    "seedOrder"         INTEGER      NOT NULL,
    "tournamentId"      INTEGER      NOT NULL,
    PRIMARY KEY("id" AUTOINCREMENT),
    FOREIGN KEY("tournamentId") REFERENCES "Tournament"("Id"));