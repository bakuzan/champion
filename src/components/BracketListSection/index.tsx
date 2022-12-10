import * as React from 'react';

import { BracketLink } from 'types/BracketInformation';

import './BracketListSection.css';

interface BracketListSectionProps {
  title: string;
  list: BracketLink[];
  onClick: (itemId: number) => void;
}

export default function BracketListSection(props: BracketListSectionProps) {
  const items = props.list;
  const hasItems = items.length > 0;

  return (
    <section className="BracketListSection">
      <header className="BracketListSection__Header">
        <h2 className="BracketListSection__Title">{props.title}</h2>
      </header>
      <ul className="BracketListSection__Items">
        {hasItems ? (
          items.map((x) => (
            <li key={x.id} className="BracketLinkItem">
              <button
                type="button"
                className="BracketLink"
                onClick={() => props.onClick(x.id)}
              >
                <div className="BracketLink__Text">{x.name}</div>
                <div className="BracketDescription">{x.description}</div>
              </button>
            </li>
          ))
        ) : (
          <li key="NO_ITEMS" className="BracketLinkItem">
            No items to display.
          </li>
        )}
      </ul>
    </section>
  );
}
