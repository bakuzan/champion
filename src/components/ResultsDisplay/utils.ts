import { TournamentRound, TournamentRoundMatchup } from 'types/Tournament';

function getMatchLoser(match: TournamentRoundMatchup) {
  return match.participantOneScore > match.participantTwoScore
    ? match.participantTwo
    : match.participantOne;
}

function getMatchWinner(match: TournamentRoundMatchup) {
  return match.participantOneScore > match.participantTwoScore
    ? match.participantOne
    : match.participantTwo;
}

export function getTournamentResults(rounds: TournamentRound[]) {
  const rankedParticipants = [];
  const reversedRounds = [...rounds].reverse();

  for (let i = 0; i < reversedRounds.length; i++) {
    const round = reversedRounds[i];
    const matches = round.matchups;
    const isFinal = i === 0;
    const isSemi = i === 1;

    if (isFinal) {
      const final = matches[0];
      const playoff = matches[1];

      rankedParticipants.push(getMatchWinner(final));
      rankedParticipants.push(getMatchLoser(final));

      if (playoff) {
        rankedParticipants.push(getMatchWinner(playoff));
        rankedParticipants.push(getMatchLoser(playoff));
      }
    } else {
      if (isSemi && rankedParticipants.length === 4) {
        /* Skip semi-finals processing if the final had a third place playoff. */
        continue;
      }

      const roundOrdered = matches
        .map((m) => getMatchLoser(m))
        .filter((p) => p.id > 0) // Placeholder participants
        .sort((a, b) => a.seedOrder - b.seedOrder);

      rankedParticipants.push(...roundOrdered);
    }
  }

  return rankedParticipants;
}
