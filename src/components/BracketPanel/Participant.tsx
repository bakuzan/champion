import * as React from 'react';

import { ParticipantPlus } from 'types/Participant';

import { TextInput } from 'components/Controls';

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
  const participantId = `participant_${index}`;
  const imageId = `image_${index}`;

  return (
    <li className="Participant">
      {!isReadOnly && <div className="Participant_Handle"></div>}
      <div className="Participant_Number">{num}</div>

      <div className="Participant_Controls">
        <TextInput
          id={participantId}
          className="Participant_Control"
          name="text"
          label="Participant"
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
        <TextInput
          id={imageId}
          className="Participant_Control"
          name="image"
          label="Image Url"
          placeholder="Image Url"
          value={data.image ?? ''}
          readOnly={isReadOnly}
          onChange={(event) => {
            const image = event.currentTarget.value;
            onChange({
              ...data,
              image: image && image.trim() ? image.trim() : null
            });
          }}
        />
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
