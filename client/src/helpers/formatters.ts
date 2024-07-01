export function formatCurrency(value: number, currency = '$') {
  return (
    currency +
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function formatPercents(value: number) {
  return `${(100 * value).toFixed(2).toLocaleString()}%`;
}
