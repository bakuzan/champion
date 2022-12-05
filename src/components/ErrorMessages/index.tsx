import * as React from 'react';

import './ErrorMessages.css';

interface ErrorMessagesProps {
  messages: Map<string, string>;
}

export default function ErrorMessages({ messages }: ErrorMessagesProps) {
  const errors = Array.from(messages.values());
  const hasErrors = errors.length > 0;

  return (
    <div className="ErrorMessages">
      {hasErrors && (
        <>
          <h3>Errors</h3>
          <ul className="Messages">
            {errors.map((text) => (
              <li key={text} className="Messages__Text">
                {text}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
