import * as React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { BracketRound } from 'types/BracketRound';

import ZoomTools from './ZoomTools';

import classNames from 'utils/classNames';
import getUID from 'utils/getBracketParticipantUID';
import { isPlaceholder, isQualifierRound } from 'utils/checks';

import './Bracket.css';

interface BracketDisplayProps {
  rounds: BracketRound[];
}

function BracketDisplay(props: BracketDisplayProps) {
  const bracketSize = Math.pow(2, props.rounds.length);
  console.log('<Bracket> :: ', props.rounds);

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
              {props.rounds.map((br) => {
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

export default BracketDisplay;
