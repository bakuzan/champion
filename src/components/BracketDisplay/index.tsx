import * as React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import { BracketRound } from 'types/BracketRound';
import { BracketParticipant } from 'types/BracketParticipant';
import { TournamentRound, TournamentRoundMatchup } from 'types/Tournament';

import { AppContext } from 'context/index';

import ZoomTools from './ZoomTools';

import classNames from 'utils/classNames';
import { isPlaceholder, isQualifierRound } from 'utils/checks';
import { getTournamentWinner, getMatchProps, getSlotProps } from './utils';
import { getShowSeedOrder, getWinnerCrownColour } from 'utils/settings';
import getCrownImage from 'utils/getCrownImage';

import './Bracket.css';

interface BracketDisplayProps {
  rounds: BracketRound[] | TournamentRound[];
  onSlotClick?: (participant: BracketParticipant) => void;
  onMatchSelect?: (match: TournamentRoundMatchup) => void;
}

function BracketDisplay(props: BracketDisplayProps) {
  const { settings } = React.useContext(AppContext);
  const roundCount = props.rounds.length;

  if (!roundCount) {
    return null;
  }

  const bracketSize = Math.pow(2, roundCount);
  const winner = getTournamentWinner(props.rounds);
  const showSeedOrder = getShowSeedOrder(settings);
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

                      const pOneIsPlaceholder = isPlaceholder(pOne);
                      const pTwoIsPlaceholder = isPlaceholder(pTwo);

                      const pOneSeed = pOneIsPlaceholder
                        ? ''
                        : pOne.seedOrder + 1;
                      const pTwoSeed = pTwoIsPlaceholder
                        ? ''
                        : pTwo.seedOrder + 1;

                      const matchKey = `${pOne.id}_${pTwo.id}`;
                      const hasNoParticipants =
                        pOneIsPlaceholder && pTwoIsPlaceholder;

                      const matchProps = getMatchProps(mu, props.onMatchSelect);
                      const slotProps = getSlotProps(mu, props.onSlotClick);
                      const isClickableMatch = 'role' in matchProps;

                      return (
                        <div
                          key={matchKey}
                          {...matchProps}
                          className={classNames(
                            'Matchup',
                            isClickableMatch && 'Matchup--Tournament',
                            isQualifiers &&
                              hasNoParticipants &&
                              'Matchup--Hidden'
                          )}
                        >
                          <div
                            className="Matchup_Slot Matchup_Slot--Top"
                            {...slotProps.pOne}
                          >
                            {showSeedOrder && (
                              <div className="MatchupParticipantSeed">
                                {pOneSeed}
                              </div>
                            )}
                            <div
                              className="MatchupParticipantName"
                              title={pOne.text}
                            >
                              {pOne.text}
                            </div>
                          </div>
                          <div
                            className="Matchup_Slot Matchup_Slot--Bot"
                            {...slotProps.pTwo}
                          >
                            {showSeedOrder && (
                              <div className="MatchupParticipantSeed">
                                {pTwoSeed}
                              </div>
                            )}
                            <div
                              className="MatchupParticipantName"
                              title={pTwo.text}
                            >
                              {pTwo.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {winner && (
                <div className="TournamentWinner">
                  <img
                    className="TournamentCrownImage"
                    src={getCrownImage(getWinnerCrownColour(settings))}
                    alt="Crown"
                  />
                  <div className="TournamentWinner__Text">{winner.text}</div>
                </div>
              )}
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
}

export default BracketDisplay;
