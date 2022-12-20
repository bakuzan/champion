import * as React from 'react';

import { TournamentParticipant } from 'types/Tournament';
import getOrdinalSuffix from 'utils/getOrdinalSuffix';

import './ParticipantCard.css';

interface ParticipantDisplayProps {
  participant: TournamentParticipant;
  readOnly: boolean;
  score: number;
  onScoreChange: (score: number) => void;
}

export default function ParticipantCard(props: ParticipantDisplayProps) {
  const { participant } = props;
  const uid = participant.id;
  const image = participant.image; // TODO make a fallback image!
  // TODO onError need for image...
  const controlName = `score_${uid}`;
  const seedOrder = participant.seedOrder + 1;
  const seedOrderWithOrd = getOrdinalSuffix(seedOrder);

  return (
    <div className="ParticipantCard">
      {image && (
        <div className="ParticipantCard__Image">
          <img
            className="ParticipantCardImage"
            src={image}
            alt={participant.text}
            onError={null}
          />
        </div>
      )}
      <div className="ParticipantCard__Info">
        <div className="ParticipantCard__Block">
          <div
            className="ParticipantCard__Seed"
            title={`${seedOrderWithOrd} Seed`}
          >
            <span aria-hidden={true}>{seedOrder}</span>
          </div>
          <div className="ParticipantCard__Name">{participant.text}</div>
        </div>
        <div className="Control">
          <label htmlFor={controlName}>Score</label>
          <input
            type="number"
            id={controlName}
            name={controlName}
            min={0}
            required
            placeholder="Enter participant score"
            readOnly={props.readOnly}
            value={props.score}
            onChange={(event) => {
              const v = event.currentTarget.value;
              if (v) {
                props.onScoreChange(Number(v));
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
