/**
 *
 * @param {{target: Date, initialDate: Date, finalDate: Date}}
 * @returns boolean
 */
export const verifyDateInInterval = ({ target, initialDate, finalDate }) => {
  const targetValue = Math.round(new Date(target).getTime() / 100);
  const initialdateValue = Math.round(new Date(initialDate).getTime() / 100);
  const finalDateValue = Math.round(new Date(finalDate).getTime() / 100);

  return targetValue >= initialdateValue && targetValue <= finalDateValue;
};

export const gerProximityDate = ({ target, dates = [] }) => {
  return dates.reduce((acc = 0, curr, index, arr) => {
    const currValue = Math.round(curr.getTime() / 100);
    const date = new Date(target);
    const currentDiff = Math.abs(currValue - Math.round(date.getTime() / 100));
    if (acc == 0 || acc.diff > currentDiff) {
      acc = {
        index,
        value: currValue,
        diff: currentDiff,
        date: curr,
      };
    }

    return acc;
  }, 0).index;
};
