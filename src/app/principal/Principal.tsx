import { Outlet } from 'react-router-dom';

import Header from '@shared/components/Header';

const Principal = () => {
  return (
    <>
      <Header />
      <div className="principal-app">
        <Outlet />
      </div>
    </>
  );
};

export default Principal;
