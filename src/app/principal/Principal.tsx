import { Outlet } from 'react-router-dom';

import Header from '@shared/components/layout/Header';

const Principal = () => {
  return (
    <>
      <Header />
      <div
        className="container p-4 flex flex-1"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Principal;
