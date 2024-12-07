/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatDate(date: any, type: 'date'| 'dateTime' = 'dateTime') {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if(type == 'date') return `${year}/${month}/${day}`
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
