import { Outlet } from 'react-router-dom';

import Header from '@shared/components/layout/Header';

const Principal = () => {
  return (
    <>
      <Header />
      <div className="container pd-4">
        <Outlet />
      </div>
    </>
  );
};

export default Principal;
