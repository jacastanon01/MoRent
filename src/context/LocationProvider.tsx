'use client';

import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

const LocationProvider = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCookie('latitude', latitude.toString());
          setCookie('longitude', longitude.toString());
        },
        (error) => {
          console.error('Error getting geolocation: ', error);
        },
        { timeout: 1000 },
      );
    }
  }, []);
  return null;
};

export default LocationProvider;
