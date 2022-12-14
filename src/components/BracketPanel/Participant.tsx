import * as React from 'react';

import { ParticipantPlus } from 'types/Participant';

import getUID from 'utils/getBracketParticipantUID';

interface ParticipantProps<T extends ParticipantPlus> {
  data: T;
  index: number;
  isReadOnly: boolean;
  onChange: (data: T) => void;
  onRemove: (uid: number | string) => void;
}

export function ParticipantItem<T extends ParticipantPlus>(
  props: ParticipantProps<T>
) {
  const num = props.index + 1;

  return (
    <li className="Participant">
      {!props.isReadOnly && <div className="Participant_Handle"></div>}
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
            readOnly={props.isReadOnly}
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
            readOnly={props.isReadOnly}
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
      {!props.isReadOnly && (
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
      )}
    </li>
  );
}
