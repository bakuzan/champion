DELETE FROM BracketParticipant
 WHERE tournamentId IN (SELECT id FROM Tournament WHERE isDeleted = 1);
 
DELETE FROM BracketTemplate
 WHERE isDeleted = 1;