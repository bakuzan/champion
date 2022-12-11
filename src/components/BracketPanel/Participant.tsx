import * as React from 'react';

import { BracketParticipant } from 'types/BracketParticipant';

import getUID from 'utils/getBracketParticipantUID';

interface ParticipantProps {
  data: BracketParticipant;
  index: number;
  onChange: (data: BracketParticipant) => void;
  onRemove: (uid: number | string) => void;
}

export function Participant(props: ParticipantProps) {
  const num = props.index + 1;

  return (
    <li className="Participant">
      <div className="Participant_Handle"></div>
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
            value={props.data.text ?? ''}
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
          className="Participant_RemoveButton"
          onClick={() => props.onRemove(getUID(props.data))}
        >
          <span aria-hidden={true}>&#10060;&#xFE0E;</span>
        </button>
      </div>
    </li>
  );
}
