export type UnitType = 'celsius' | 'fahrenheit';

export const toFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;

export const formatTemp = (tempCelsius: number, unit: UnitType): string => {
  const val = unit === 'fahrenheit' ? toFahrenheit(tempCelsius) : tempCelsius;
  return `${Math.round(val)}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
};
