import { useEffect } from 'react';

import ViteLogo from '@assets/icons/vite.svg?react';

import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getProfile } from 'app/principal/principalSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.account);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <header className="principal-header">
      <h1><ViteLogo /></h1>
      <div className="header-menu"></div>
      <div className="header-actions">
        <button className="btn">Welcome, { profile?.data?.firstName } { profile?.data?.lastName }</button>
      </div>
    </header>
  );
};

export default Header;
