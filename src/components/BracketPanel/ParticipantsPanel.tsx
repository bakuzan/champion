import * as React from 'react';
import { ReactSortable } from 'react-sortablejs';

import { BracketParticipant } from 'types/BracketParticipant';

import { AppContext } from 'context/index';

import generateUniqueId from 'utils/generateUniqueId';

import {
  isBracketParticipantList,
  isTournamentParticipant
} from 'utils/guards';

import { ParticipantItem } from './Participant';

export default function ParticipantsPanel() {
  const context = React.useContext(AppContext);
  const { participants, dispatch } = context;

  const firstParticipant = participants[0];
  const isBracketParticipant =
    !firstParticipant || !isTournamentParticipant(firstParticipant);

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
                  id: generateUniqueId(),
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

      {isBracketParticipantList(participants) ? (
        <ReactSortable
          tag="ul"
          className="ParticipantsList"
          handle=".Participant_Handle"
          list={participants}
          setList={(data) => dispatch({ type: 'UPDATE_PARTICIPANTS', data })}
        >
          {participants.map((p, i) => (
            <ParticipantItem
              key={p.id}
              data={p}
              index={i}
              onChange={(data: BracketParticipant) =>
                dispatch({ type: 'UPDATE_PARTICIPANT', data })
              }
              onRemove={(uid) => dispatch({ type: 'REMOVE_PARTICIPANT', uid })}
            />
          ))}
        </ReactSortable>
      ) : (
        <ul className="ParticipantsList">
          {participants.map((p, i) => (
            <ParticipantItem key={p.id} data={p} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
