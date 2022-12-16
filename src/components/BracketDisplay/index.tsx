import * as React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { BracketRound } from 'types/BracketRound';
import { BracketMatchup } from 'types/BracketMatchup';
import { TournamentRound, TournamentRoundMatchup } from 'types/Tournament';

import ZoomTools from './ZoomTools';

import classNames from 'utils/classNames';
import getUID from 'utils/getBracketParticipantUID';
import { isPlaceholder, isQualifierRound } from 'utils/checks';
import { isBracketMatchup } from 'utils/guards';

import './Bracket.css';
import { createClickEquivalentHandler } from 'utils/accessibility';

interface BracketDisplayProps {
  rounds: BracketRound[] | TournamentRound[];
  onMatchSelect?: (match: TournamentRoundMatchup) => void;
}

function getMatchProps(
  match: TournamentRoundMatchup | BracketMatchup,
  onMatchSelect: (match: TournamentRoundMatchup) => void
) {
  if (isBracketMatchup(match)) {
    return {};
  }

  if (
    isPlaceholder(match.participantOne) ||
    isPlaceholder(match.participantTwo)
  ) {
    return {};
  }

  // We have to reassign because typescript isn't smart enough
  // to realise the type assertion inside the function!
  const tournamentMatchup = match;

  function onClick() {
    onMatchSelect(tournamentMatchup);
  }

  return {
    role: 'button',
    tabIndex: 0,
    onClick,
    onKeyDown: createClickEquivalentHandler(onClick)
  };
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

                      const matchProps = getMatchProps(mu, props.onMatchSelect);
                      const isClickable = 'role' in matchProps;

                      return (
                        <div
                          key={matchKey}
                          {...matchProps}
                          className={classNames(
                            'Matchup',
                            isClickable && 'Matchup--Tournament',
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
