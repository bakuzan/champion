export function getRoundNameFromMatchCount(matchCount: number) {
  switch (matchCount) {
    case 1:
      return 'Finals';
    case 2:
      return 'Semi-Finals';
    case 4:
      return 'Quarter-Finals';
    default:
      return `Round of ${matchCount * 2}`;
  }
}

function getRoundText(
  finalRound: number,
  currentRound: number,
  bracketSize: number
) {
  switch (currentRound) {
    case finalRound:
      return 'Finals';
    case finalRound - 1:
      return 'Semi-Finals';
    case finalRound - 2:
      return 'Quarter-Finals';
    default:
      return `Round of ${bracketSize}`;
  }
}

export function getRoundNameFromRoundNumbers(
  finalRound: number,
  currentRound: number,
  participantCount: number
) {
  const bracketSize = Math.pow(2, finalRound);
  const isQualifier = participantCount !== bracketSize;
  if (currentRound === 1 && isQualifier) {
    const nextText = getRoundText(finalRound, currentRound + 1, bracketSize);
    return `Qualifier for ${nextText}`;
  }

  return getRoundText(finalRound, currentRound, bracketSize);
}
