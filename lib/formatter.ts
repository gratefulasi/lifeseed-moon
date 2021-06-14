const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
});

export default function formatPrice(cents: number): string {
  const euros = cents / 100;
  return formatter.format(euros);
}

export default function formatValue(cents: number): string {
  const leaves = cents / 100;
  return formatter.format(leaves);
}
