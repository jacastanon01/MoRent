'use server';
export const fetchGeoCodes = async (address: string | undefined) => {
  if (address) {
    const url = `https://geocode.maps.co/search?q=${encodeURIComponent(
      address,
    )}`;
    try {
      const response = await fetch(url, { mode: 'no-cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${JSON.stringify(response)}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
};
