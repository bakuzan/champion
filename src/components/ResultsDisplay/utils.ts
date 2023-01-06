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

  for (const round of [...rounds].reverse()) {
    const matches = round.matchups;

    if (matches.length === 1) {
      rankedParticipants.push(getMatchWinner(matches[0]));
      rankedParticipants.push(getMatchLoser(matches[0]));
    } else {
      const roundOrdered = matches
        .map((m) => getMatchLoser(m))
        .filter((p) => p.id > 0) // Placeholder participants
        .sort((a, b) => a.seedOrder - b.seedOrder);

      rankedParticipants.push(...roundOrdered);
    }
  }

  return rankedParticipants;
}
