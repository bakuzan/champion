import React from 'react';

import { AppContext } from 'context/index';
import { BracketInformation } from 'types/BracketInformation';

export default function InformationPanel() {
  const context = React.useContext(AppContext);
  const { information, dispatch } = context;

  function updateInformation(values: Partial<BracketInformation>) {
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
          value={information.name}
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
          name="description"
          placeholder="Bracket Description"
          value={information.description}
          onChange={(event) =>
            updateInformation({ description: event.currentTarget.value })
          }
        />
      </div>
      <div className="ButtonGroup">
        <button type="button">Save Bracket</button>
      </div>
    </div>
  );
}
