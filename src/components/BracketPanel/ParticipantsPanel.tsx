import React from 'react';
import generateUniqueId from 'utils/generateUniqueId';

interface ParticipantProps {
  index: number;
  key: string;
  onRemove: (key: string) => void;
}

function Participant(props: ParticipantProps) {
  const num = props.index + 1;

  return (
    <div className="Participant">
      <div className="Participant_Handle">H</div>
      <div className="Participant_Number">{num}</div>
      <div className="Participant_Text Control">
        <label htmlFor="participant">Participant</label>
        <input
          id="participant"
          type="text"
          name="participant"
          placeholder="Participant"
        />
      </div>
      <div className="Participant_Remove">
        <button
          type="button"
          title="Remove participant"
          onClick={() => props.onRemove(props.key)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default function ParticipantsPanel() {
  const [addedParticipants, setAddedParticipants] = React.useState([]);
  const participants = [...addedParticipants];

  return (
    <div className="ParticipantsPanel">
      <h2>Participants</h2>

      <ul className="ParticipantsList">
        {participants.map((p, i) => (
          <Participant
            index={i}
            {...p}
            onRemove={(key) =>
              setAddedParticipants((p) => p.filter((x) => x.key !== key))
            }
          />
        ))}
      </ul>

      <div className="ButtonGroup">
        <button
          type="button"
          className="AddParticipants"
          onClick={() =>
            setAddedParticipants((p) => [
              ...p,
              { key: generateUniqueId(), text: '' }
            ])
          }
        >
          Add Participant
        </button>
      </div>
    </div>
  );
}
