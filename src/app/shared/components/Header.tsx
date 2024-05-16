import { useEffect } from 'react';

import ViteLogo from '@assets/icons/vite.svg?react';

import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getProfile } from 'app/principal/principalSlice';
import Dropdown from './Dropdown';

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
      <h1 className="page-logo"><ViteLogo /></h1>
      <ul className="header-menu">
        <li className="menu-item">Home</li>
        <li className="menu-item">Todo</li>
      </ul>
      <div className="header-actions">
        <Dropdown
          triggerElm={
            <button className="btn btn-profile">
              Welcome, { profile?.data?.firstName } { profile?.data?.lastName }
            </button>
          }
        />
      </div>
    </header>
  );
};

export default Header;
