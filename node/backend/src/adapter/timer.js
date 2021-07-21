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
