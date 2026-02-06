import { useEffect, useState } from 'react';
import { fetchCourierProfile } from '../services/courier.service';

const  useCourierProfile = () => {
  //const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchPublicProfile = async (courierId) => {
    try {
      setLoading(true);
      const profile = await fetchCourierProfile(courierId);
      return profile;
    } catch (err) {
      console.error('Failed to fetch courier profile:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
   return { loading, error, fetchPublicProfile };
}
export default useCourierProfile;