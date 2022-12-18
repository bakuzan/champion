import * as React from 'react';

import { Information } from 'types/Information';

import { AppContext } from 'context/index';
import ErrorMessages from 'components/ErrorMessages';

export default function InformationPanel() {
  const context = React.useContext(AppContext);
  const { errorMessages, dirty, information, dispatch } = context;
  const isBracket = !!context.startTournament;
  const isSavedTemplate = !!information.id && isBracket;

  function updateInformation(values: Partial<Information>) {
    dispatch({
      type: 'UPDATE_INFORMATION',
      data: { ...information, ...values }
    });
  }

  return (
    <div className="InformationPanel">
      <h2>Information</h2>
      <div className="Control">
        <label htmlFor="bracketName">Bracket Name</label>
        <input
          id="bracketName"
          type="text"
          name="name"
          placeholder="Bracket Name"
          required
          value={information.name ?? ''}
          onChange={(event) =>
            updateInformation({ name: event.currentTarget.value })
          }
        />
      </div>
      <div className="Control">
        <label htmlFor="bracketType">Bracket Type</label>
        <select id="bracketType" name="bracketType" disabled>
          <option value="1">Single Elimination</option>
        </select>
      </div>
      <div className="Control">
        <label htmlFor="bracketDescription">Bracket Description</label>
        <textarea
          id="bracketDescription"
          className="BracketDescriptionControl"
          name="description"
          placeholder="Bracket Description"
          value={information.description ?? ''}
          onChange={(event) =>
            updateInformation({ description: event.currentTarget.value })
          }
        />
      </div>
      <div className="ButtonGroup">
        <button
          type="button"
          className="PrimaryButton"
          disabled={!dirty}
          onClick={() => context.save()}
        >
          Save {isBracket ? 'Bracket' : 'Tournament'}
        </button>
      </div>
      <ErrorMessages style={{ flex: 1 }} messages={errorMessages} />
      {isSavedTemplate && (
        <div className="ButtonGroup">
          <button
            type="button"
            className="PrimaryButton"
            disabled={dirty}
            onClick={() => context.startTournament()}
          >
            Start a Tournament
          </button>
        </div>
      )}
    </div>
  );
}
