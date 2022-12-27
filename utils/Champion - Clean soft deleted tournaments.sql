DELETE FROM TournamentMatchup 
 WHERE tournamentId IN (SELECT id FROM Tournament WHERE isDeleted = 1);
 
DELETE FROM TournamentParticipant
 WHERE tournamentId IN (SELECT id FROM Tournament WHERE isDeleted = 1);
 
DELETE FROM Tournament
 WHERE isDeleted = 1;