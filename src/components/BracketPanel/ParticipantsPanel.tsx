import * as React from 'react';

import { AppContext } from 'context/index';

import { BracketParticipant } from 'types/BracketParticipant';
import generateUniqueId from 'utils/generateUniqueId';
import getUID from 'utils/getBracketParticipantUID';

interface ParticipantProps {
  data: BracketParticipant;
  index: number;
  onChange: (data: BracketParticipant) => void;
  onRemove: (uid: number | string) => void;
}

function Participant(props: ParticipantProps) {
  const num = props.index + 1;

  return (
    <li className="Participant">
      <div className="Participant_Handle">H</div>
      <div className="Participant_Number">{num}</div>
      <div className="Participant_Controls">
        <div className="Participant_Control Control">
          <label htmlFor="participant">Participant</label>
          <input
            id="participant"
            type="text"
            name="text"
            placeholder="Participant"
            required
            value={props.data.text}
            onChange={(event) =>
              props.onChange({
                ...props.data,
                text: event.currentTarget.value
              })
            }
          />
        </div>
        <div className="Participant_Control Control">
          <label htmlFor="participant">Image Url</label>
          <input
            id="image"
            type="url"
            name="imageUrl"
            placeholder="Image Url"
            value={props.data.imageUrl ?? ''}
            onChange={(event) => {
              const imageUrl = event.currentTarget.value;
              props.onChange({
                ...props.data,
                imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : null
              });
            }}
          />
        </div>
      </div>
      <div className="Participant_Remove">
        <button
          type="button"
          title="Remove participant"
          onClick={() => props.onRemove(getUID(props.data))}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default function ParticipantsPanel() {
  const context = React.useContext(AppContext);
  const { participants, dispatch } = context;

  return (
    <div className="ParticipantsPanel">
      <h2>Participants</h2>

      <ul className="ParticipantsList">
        {participants.map((p, i) => (
          <Participant
            key={getUID(p)}
            data={p}
            index={i}
            onChange={(data) => dispatch({ type: 'UPDATE_PARTICIPANT', data })}
            onRemove={(uid) => dispatch({ type: 'REMOVE_PARTICIPANT', uid })}
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
                imageUrl: null
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
