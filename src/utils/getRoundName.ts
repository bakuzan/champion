export default function getRoundName(matchCount: number) {
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
