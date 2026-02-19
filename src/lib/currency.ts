export type Currency = 'COP' | 'USD';

export interface CurrencySettings {
  currency: Currency;
  exchangeRate: number;
}

const CURRENCY_KEY = 'proposal_currency_settings';

export const getDefaultCurrencySettings = (): CurrencySettings => {
  return {
    currency: 'COP',
    exchangeRate: 4300
  };
};

export const getCurrencySettings = (): CurrencySettings => {
  const stored = localStorage.getItem(CURRENCY_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultCurrencySettings();
    }
  }
  return getDefaultCurrencySettings();
};

export const saveCurrencySettings = (settings: CurrencySettings): void => {
  localStorage.setItem(CURRENCY_KEY, JSON.stringify(settings));
};

export const formatPrice = (priceCOP: number, priceUSD: number, currency: Currency): string => {
  const price = currency === 'COP' ? priceCOP : priceUSD;
  const symbol = currency === 'COP' ? '$' : '$';
  const suffix = currency === 'COP' ? ' COP' : ' USD';

  return `${symbol}${price.toLocaleString('es-CO')}${suffix}`;
};

export const getPrice = (priceCOP: number, priceUSD: number, currency: Currency): number => {
  return currency === 'COP' ? priceCOP : priceUSD;
};
