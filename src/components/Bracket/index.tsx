import * as React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { BracketParticipant } from 'types/BracketParticipant';
import { BracketRound } from 'types/BracketRound';

import { AppContext } from 'context/index';
import { buildRounds } from './Builder';
import ZoomTools from './ZoomTools';

import classNames from 'utils/classNames';
import getUID from 'utils/getBracketParticipantUID';

import './Bracket.css';

const isPlaceholder = (p: BracketParticipant) => p.text === 'TBC';
const isQualifierRound = (r: BracketRound) => r.name === 'Qualifiers';

// function generateBracket(participants: BracketParticipant[]) {
//   // only works for power of 2 number of players

//   const participantCount = participants.length;
//   const roundsNumber = Math.log2(participantCount);
//   const rounds:BracketRound[] = [];

//   for (let i = 0; i < roundsNumber; i++) {
//       const round:BracketRound = {name: '', matchups:[]};
//       const prevRound = i > 0 ? rounds[i - 1] : null;

//       if (prevRound == null) {
//           // if first round - result is known
//           round.matchups = [{ participantOne: participants[0], participantTwo: participants[1] }];
//       }
//       else {
//           round.matchups = Array(prevRound.matchups.length*2);
//           // find median. For round 2 there are 4 players and median is 2.5 (between 2 and 3)
//           // for round 3 there are 8 players and median is 4.5 (between 4 and 5)
//           const median = (round.matchups.length*2 + 1)/2f;
//           let next = 0;

//           for (let match of prevRound.matchups) {
//               // you can play here by switching PlayerA and PlayerB or reordering stuff
//               round.matchups[next] = {
//                   participantOne: match.participantOne,
//                   participantTwo: participants[(median + Math.abs(match.part - median))]
//               };

//               next++;

//               round.matchups[next] = new Match() {
//                   PlayerA = match.PlayerB,
//                   PlayerB = (median + Math.abs(match.PlayerB - median))
//               };

//               next++;
//           }
//       }

//       rounds[i] = round;
//   }

//   return rounds.reverse();
// }

function Bracket() {
  const context = React.useContext(AppContext);
  const { participants } = context;

  // TODO
  // Currently handles the theoretical case, during creating the bracket.
  // Need to add the part that handles a tournament in progress.

  const bracketRounds = buildRounds(participants);
  const bracketSize = Math.pow(2, bracketRounds.length);
  console.log('<Bracket> :: ', bracketRounds);

  return (
    <div className={classNames('Bracket', `Bracket--${bracketSize}`)}>
      <TransformWrapper
        minScale={0.1}
        maxScale={5}
        initialPositionX={75}
        initialPositionY={75}
        limitToBounds={false}
      >
        {(zoomPanPinchProps) => (
          <React.Fragment>
            <ZoomTools {...zoomPanPinchProps} />
            <TransformComponent>
              {bracketRounds.map((br) => {
                const isQualifiers = isQualifierRound(br);
                const roundParticipantCount = isQualifiers
                  ? bracketSize
                  : br.matchups.length * 2;

                return (
                  <div
                    key={br.name}
                    className={classNames(
                      'Round',
                      `Round--${roundParticipantCount}`
                    )}
                  >
                    <div className="Round_Name">{br.name}</div>
                    {br.matchups.map((mu) => {
                      const pOne = mu.participantOne;
                      const pTwo = mu.participantTwo;
                      const matchKey = `${getUID(pOne)}_${getUID(pTwo)}`;
                      const hasNoParticipants =
                        isPlaceholder(pOne) && isPlaceholder(pTwo);

                      return (
                        <div
                          key={matchKey}
                          className={classNames(
                            'Matchup',
                            isQualifiers &&
                              hasNoParticipants &&
                              'Matchup--Hidden'
                          )}
                        >
                          <div className="Matchup_Slot Matchup_Slot--Top">
                            {pOne.text}
                          </div>
                          <div className="Matchup_Slot Matchup_Slot--Bot">
                            {pTwo.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}

export default Bracket;
