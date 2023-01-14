WITH tourney_cte AS
(
	SELECT m.tournamentId
	     , m.roundNumber
		 , m.roundMatchNumber
	     , m.participantOneId
		 , m.participantOneScore
		 , ifnull(p1.text, '')
		 , m.participantTwoId
		 , m.participantTwoScore
		 , Ifnull(p2.text, '')
	  FROM TournamentMatchup m
	  LEFT JOIN TournamentParticipant p1 ON m.participantOneId = p1.id
	  LEFT JOIN TournamentParticipant p2 ON m.participantTwoId = p2.id
),
current_tourney_round_cte AS
(
	SELECT tournamentId
	     , MIN(roundNumber) currentRoundNumber
	  FROM tourney_cte
	 WHERE participantOneId IS NOT NULL
	   AND participantTwoId IS NOT NULL
	   AND participantOneScore = 0
	   AND participantTwoScore = 0
	 GROUP BY tournamentId
),
finalRound_tourneys_cte AS
(
	SELECT tournamentId
	     , MAX(roundNumber) finalRoundNumber
	  FROM tourney_cte
	 GROUP BY tournamentId
),
unfinished_matches_tourneys_cte AS
(
	SELECT DISTINCT tournamentId
	  FROM tourney_cte
	 WHERE participantOneId IS NOT NULL
	   AND participantOneScore = 0
	   AND participantTwoId IS NOT NULL
	   AND participantTwoScore = 0
),
tourney_participants_cte AS
(
	SELECT tournamentId, COUNT(*) participantCount
	  FROM TournamentParticipant
	 GROUP BY tournamentId
)
SELECT t.*
	 , p.participantCount
     , ifnull(cu.currentRoundNumber, f.finalRoundNumber) currentRoundNumber
     , f.finalRoundNumber
	 , CASE WHEN co.tournamentId IS NULL
		    THEN 1
			ELSE 0
			 END isComplete
  FROM Tournament t
  JOIN tourney_participants_cte p				ON t.id = p.tournamentId
  JOIN finalRound_tourneys_cte f				ON t.id = f.tournamentId
  LEFT JOIN current_tourney_round_cte cu		ON t.id = cu.tournamentId
  LEFT JOIN unfinished_matches_tourneys_cte co	ON t.id = co.tournamentId
 WHERE t.isDeleted = 0
 ORDER BY createdAt DESC
