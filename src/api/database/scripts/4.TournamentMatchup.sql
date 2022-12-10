CREATE TABLE IF NOT EXISTS TournamentMatchup(
    "tournamentId"          INTEGER     NOT NULL,
    "roundNumber"           INTEGER     NOT NULL,
    "roundMatchNumber"      INTEGER     NOT NULL,
    "participantOneId"      INTEGER     NULL,
    "participantOneScore"   INTEGER     NOT NULL,
    "participantTwoId"      INTEGER     NULL,
    "participantTwoScore"   INTEGER     NOT NULL,
    FOREIGN KEY("tournamentId")     REFERENCES "Tournament"("Id"),
    FOREIGN KEY("participantOneId") REFERENCES "TournamentParticipant"("Id"),
    FOREIGN KEY("participantTwoId") REFERENCES "TournamentParticipant"("Id"));