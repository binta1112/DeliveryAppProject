import React, { memo } from 'react';
import SellerTabs from './sellerTabs';
import CourierTabs from './courierTabs';
import { useAppSelector } from '../hooks/useAppSelector';
import PushTokenRegistrar from '../components/PushTokenRegistrar';

const AppTabs = () => {
  const role = useAppSelector((s) => s.auth.role);

  return (
    <>
      <PushTokenRegistrar />
      {role === 'courier' ? <CourierTabs /> : <SellerTabs />}
    </>
  );
};

export default memo(AppTabs);