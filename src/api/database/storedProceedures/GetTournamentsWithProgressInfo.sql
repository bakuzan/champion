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
	     , MAX(roundNumber) currentRoundNumber
	  FROM tourney_cte
	 WHERE participantOneId IS NOT NULL
	   AND participantTwoId IS NOT NULL
	   AND participantOneScore = 0
	   AND participantTwoScore = 0
	 GROUP BY tournamentId
),
complete_tourneys_cte AS
(
	SELECT tournamentId
	     , MAX(roundNumber) finalRoundNumber
		 , participantOneScore <> participantTwoScore isComplete
	  FROM tourney_cte
	 GROUP BY tournamentId
)
SELECT t.*
     , cu.currentRoundNumber
     , co.finalRoundNumber
	 , co.isComplete
  FROM Tournament t
  JOIN current_tourney_round_cte cu ON t.id = cu.tournamentId
  JOIN complete_tourneys_cte co		ON t.id = co.tournamentId
 ORDER BY createdAt DESC
 