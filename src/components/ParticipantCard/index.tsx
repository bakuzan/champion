import * as React from 'react';

import { TournamentParticipant } from 'types/Tournament';

import './ParticipantCard.css';

interface ParticipantDisplayProps {
  participant: TournamentParticipant;
  score: number;
  onScoreChange: (score: number) => void;
}

export default function ParticipantCard(props: ParticipantDisplayProps) {
  const uid = props.participant.id;
  const image = props.participant.imageUrl; // TODO make a fallback image!
  const controlName = `score_${uid}`;
  // TODO onError need for image...

  return (
    <div className="ParticipantCard">
      <img src={image} alt={props.participant.text} onError={null} />
      <div className="ParticipantCard__Info">
        <div className="ParticipantCard__Seed">
          {props.participant.seedOrder}
        </div>
        <div className="ParticipantCard__Name">{props.participant.text}</div>
        <div className="Control">
          <label htmlFor={controlName}>Score</label>
          <input
            type="number"
            id={controlName}
            name={controlName}
            min={0}
            required
            placeholder="Enter participant score"
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
