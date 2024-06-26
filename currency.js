import {myAPIkey} from './fetch.js'
// Currency Data --------------------------------

export const getCurrencyConversionData = async () => {
  const options = {
    method: "GET",
    redirect: 'follow',
  };

  const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${myAPIkey}`, options)
  if(!response.ok) {
    throw new Error("Cannot fetch currency data.");
  }

  return await response.json();
}

export const getSalary = (amountUSD, currency, currencyData) => {
  const amount = (currency === "USD" ? amountUSD : amountUSD * currencyData.rates[currency]);
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  });
  return formatter.format(amount);
}

