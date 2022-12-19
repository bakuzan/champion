import * as React from 'react';

import { ParticipantPlus } from 'types/Participant';

export interface ParticipantProps<T extends ParticipantPlus> {
  data: T;
  index: number;
  onChange?: (data: T) => void;
  onRemove?: (uid: number | string) => void;
}

export function ParticipantItem<T extends ParticipantPlus>(
  props: ParticipantProps<T>
) {
  const { data, index, onChange, onRemove } = props;
  const isReadOnly = !onChange || !onRemove;
  const num = index + 1;
  console.log({ onChange, onRemove, isReadOnly, data });
  return (
    <li className="Participant">
      {!isReadOnly && <div className="Participant_Handle"></div>}
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
            value={data.text ?? ''}
            readOnly={isReadOnly}
            onChange={(event) =>
              onChange({
                ...data,
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
            value={data.imageUrl ?? ''}
            readOnly={isReadOnly}
            onChange={(event) => {
              const imageUrl = event.currentTarget.value;
              onChange({
                ...data,
                imageUrl: imageUrl && imageUrl.trim() ? imageUrl.trim() : null
              });
            }}
          />
        </div>
      </div>
      {!isReadOnly && (
        <div className="Participant_Remove">
          <button
            type="button"
            title="Remove participant"
            className="Participant_RemoveButton"
            onClick={() => onRemove(data.id)}
          >
            <span aria-hidden={true}>&#10060;&#xFE0E;</span>
          </button>
        </div>
      )}
    </li>
  );
}
