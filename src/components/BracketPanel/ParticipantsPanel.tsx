import React from 'react';

import { AppContext } from 'context/index';

import { BracketParticipant } from 'types/BracketParticipant';
import generateUniqueId from 'utils/generateUniqueId';

interface ParticipantProps {
  data: BracketParticipant;
  onChange: (data: BracketParticipant) => void;
  onRemove: (key: string) => void;
}

function Participant(props: ParticipantProps) {
  const num = props.data.order + 1;

  return (
    <div className="Participant">
      <div className="Participant_Handle">H</div>
      <div className="Participant_Number">{num}</div>
      <div className="Participant_Text Control">
        <label htmlFor="participant">Participant</label>
        <input
          id="participant"
          type="text"
          name="text"
          placeholder="Participant"
          value={props.data.text}
          onChange={(event) =>
            props.onChange({ ...props.data, text: event.currentTarget.value })
          }
        />
      </div>
      <div className="Participant_Remove">
        <button
          type="button"
          title="Remove participant"
          onClick={() => props.onRemove(props.data.key)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default function ParticipantsPanel() {
  const context = React.useContext(AppContext);
  const { participants, dispatch } = context;

  return (
    <div className="ParticipantsPanel">
      <h2>Participants</h2>

      <ul className="ParticipantsList">
        {participants.map((p) => (
          <Participant
            key={p.key}
            data={p}
            onChange={(data) => dispatch({ type: 'UPDATE_PARTICIPANT', data })}
            onRemove={(key) => dispatch({ type: 'REMOVE_PARTICIPANT', key })}
          />
        ))}
      </ul>

      <div className="ButtonGroup">
        <button
          type="button"
          className="AddParticipants"
          onClick={() =>
            dispatch({
              type: 'ADD_PARTICIPANT',
              data: {
                key: generateUniqueId(),
                text: '',
                order: participants.length
              }
            })
          }
        >
          Add Participant
        </button>
      </div>
    </div>
  );
}
