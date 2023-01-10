ALTER TABLE Tournament 
    ADD COLUMN "ancestorTournamentId" INTEGER NULL DEFAULT(NULL)
    REFERENCES "Tournament"("Id");