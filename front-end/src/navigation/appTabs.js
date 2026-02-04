import React, { memo } from 'react';
import SellerTabs from './sellerTabs';
import CourierTabs from './courierTabs';
import { useAppSelector } from '../hooks/useAppSelector';

const AppTabs = () => {
  const role = useAppSelector((s) => s.auth.role);

  if (role === 'courier') {
    return <CourierTabs />;
  }
  return <SellerTabs />; // default seller
};

export default memo(AppTabs);