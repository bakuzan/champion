import * as React from 'react';

import { Information } from 'types/Information';

import { AppContext } from 'context/index';

import ErrorMessages from 'components/ErrorMessages';
import LoadingDisplay from 'components/LoadingDisplay';
import { Checkbox, TextInput } from 'components/Controls';

import classNames from 'utils/classNames';

export default function InformationPanel() {
  const context = React.useContext(AppContext);
  const { errorMessages, dirty, saving, information, dispatch } = context;

  const isBracket = !!context.startTournament;
  const isSavedTemplate = !!information.id && isBracket;
  const canDelete = !!information.id;

  function updateInformation(values: Partial<Information>) {
    dispatch({
      type: 'UPDATE_INFORMATION',
      data: { ...information, ...values }
    });
  }

  return (
    <div className="InformationPanel">
      <h2>Information</h2>
      <TextInput
        id="bracketName"
        name="name"
        label="Bracket Name"
        placeholder="Bracket Name"
        required
        value={information.name ?? ''}
        onChange={(event) =>
          updateInformation({ name: event.currentTarget.value })
        }
      />
      {/* <div className="Control">
        <label htmlFor="bracketType">Bracket Type</label>
        <select id="bracketType" name="bracketType" disabled>
          <option value="1">Single Elimination</option>
        </select>
      </div> */}
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
      <Checkbox
        id="bracketIncludePlayoff"
        name="includePlayoff"
        label="Include Playoff"
        checked={information.includePlayoff ? true : false}
        disabled={!isBracket}
        onChange={(event) =>
          updateInformation({
            includePlayoff: event.currentTarget.checked ? 1 : 0
          })
        }
      />
      <LoadingDisplay isLoading={saving}>
        <div
          className="ButtonGroup ButtonGroup--Split"
          style={{ margin: `5px 0` }}
        >
          <button
            type="button"
            className="PrimaryButton"
            disabled={!dirty}
            onClick={() => context.save()}
          >
            Save {isBracket ? 'Bracket' : 'Tournament'}
          </button>
          {isSavedTemplate && isBracket && (
            <button
              type="button"
              className="PrimaryButton"
              disabled={dirty}
              onClick={() => context.save(true)}
            >
              Copy Bracket
            </button>
          )}
        </div>

        <ErrorMessages style={{ flex: 1 }} messages={errorMessages} />

        <div
          className={classNames(
            'ButtonGroup',
            isSavedTemplate ? 'ButtonGroup--Split' : 'ButtonGroup--Right'
          )}
        >
          {isSavedTemplate && (
            <button
              type="button"
              className="PrimaryButton"
              disabled={dirty}
              onClick={() => context.startTournament()}
            >
              Start a Tournament
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              className="DangerButton"
              onClick={() => context.delete()}
            >
              Delete {isBracket ? 'Bracket' : 'Tournament'}
            </button>
          )}
        </div>
      </LoadingDisplay>
    </div>
  );
}
