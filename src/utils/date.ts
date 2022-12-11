import { monthNames } from 'constants/index';
import padNumber from './padNumber';

export function formatTime(date: string | number | Date) {
  return date
    ? `${padNumber(new Date(date).getHours(), 2)}:${padNumber(
        new Date(date).getMinutes(),
        2
      )}`
    : '';
}

export function formatDateForDisplay(date: string | number | Date) {
  if (!date) {
    return '';
  }

  const d = new Date(date);
  return `${padNumber(d.getDate(), 2)} ${
    monthNames[d.getMonth()]
  } ${d.getFullYear()}`;
}

export function formatDateTimeForDisplay(date: string | number | Date) {
  return `${formatDateForDisplay(date)} @ ${formatTime(date)}`;
}
