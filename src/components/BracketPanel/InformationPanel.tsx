import React from 'react';

export default function InformationPanel() {
  return (
    <div className="InformationPanel">
      <h2>Information</h2>
      <div className="Control">
        <label htmlFor="bracketName">Bracket Name</label>
        <input
          id="bracketName"
          type="text"
          name="bracketName"
          placeholder="Bracket Name"
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
          name="bracketDescription"
          placeholder="Bracket Description"
        />
      </div>
      <div className="ButtonGroup">
        <button type="button">Save Bracket</button>
      </div>
    </div>
  );
}
