import * as React from 'react';

import { HomePageLink } from 'types/HomePageLink';

import classNames from 'utils/classNames';
import { formatDateTimeForDisplay } from 'utils/date';
import { getRoundNameFromRoundNumbers } from 'utils/getRoundName';
import { isTournamentHomePageLink } from 'utils/guards';

import './BracketListSection.css';

interface BracketListSectionProps<T extends HomePageLink> {
  title: string;
  list: T[];
  onClick: (itemId: number) => void;
}

export default function BracketListSection<T extends HomePageLink>(
  props: BracketListSectionProps<T>
) {
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
                className={classNames(
                  'BracketLink',
                  isTournamentHomePageLink(x) &&
                    x.isComplete &&
                    'BracketLink--Complete'
                )}
                onClick={() => props.onClick(x.id)}
              >
                <div className="BracketLink__Text">{x.name}</div>
                <div className="BracketDescription">{x.description}</div>
                {isTournamentHomePageLink(x) && (
                  <div className="TournamentData">
                    <div className="TournamentStatus">
                      {x.isComplete
                        ? 'Complete'
                        : getRoundNameFromRoundNumbers(
                            x.finalRoundNumber,
                            x.currentRoundNumber,
                            x.participantCount
                          )}
                    </div>
                    <div className="TournamentDate">
                      {formatDateTimeForDisplay(x.createdAt)}
                    </div>
                  </div>
                )}
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
