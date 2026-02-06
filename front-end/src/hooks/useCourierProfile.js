import { useEffect, useState } from 'react';
import { fetchCourierProfile } from '../services/courier.service';

export async function useCourierProfile(courierId) {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const data = await fetchCourierProfile(courierId);
   setDriver(data);
   setLoading(false);
   setError(null);
  

  return { driver, loading, error };
}
