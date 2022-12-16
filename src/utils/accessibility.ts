import React from 'react';

const SPACE = ' ';
const ENTER = 'Enter';
const accessibleKeyCodes = [SPACE, ENTER];

export function createClickEquivalentHandler<T extends HTMLElement>(
  func: (event: React.KeyboardEvent<T>) => void
): React.KeyboardEventHandler<T> {
  return function (event) {
    if (accessibleKeyCodes.includes(event.key)) {
      event.preventDefault();
      func(event);
    }
  };
}
