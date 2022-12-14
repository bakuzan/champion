import * as React from 'react';

import { AppContext } from 'context/index';

import generateUniqueId from 'utils/generateUniqueId';
import getUID from 'utils/getBracketParticipantUID';

import { ParticipantItem } from './Participant';
import { isTournamentParticipant } from 'utils/guards';

export default function ParticipantsPanel() {
  const context = React.useContext(AppContext);
  const { participants, dispatch } = context;
  const isBracketParticipant = !isTournamentParticipant(participants[0]);

  return (
    <div className="ParticipantsPanel">
      <h2>Participants</h2>

      {isBracketParticipant && (
        <div className="ButtonGroup">
          <button
            type="button"
            className="AddParticipants PrimaryButton"
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
      )}

      <ul className="ParticipantsList">
        {participants.map((p, i) => (
          <ParticipantItem
            key={getUID(p)}
            data={p}
            index={i}
            isReadOnly={!isBracketParticipant}
            onChange={(data) => dispatch({ type: 'UPDATE_PARTICIPANT', data })}
            onRemove={(uid) => dispatch({ type: 'REMOVE_PARTICIPANT', uid })}
          />
        ))}
      </ul>
    </div>
  );
}
