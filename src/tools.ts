export const canvasSettings = {
  heigth: 300,
  width: 500,
  k: 224,
  lineWidth: 10
};
export const compareArrays = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;
  return !a.some((item: any, i: number) => item !== b[i]);
};

export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

export default {
  compareArrays,
  canvasSettings,
  randomInteger,
  getRandomColor
};
