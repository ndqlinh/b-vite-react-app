import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ViteLogo from '@assets/icons/vite.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import ProfileIcon from '@assets/icons/profile.svg?react';

import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getProfile } from 'app/principal/principalSlice';
import Dropdown from '../partials/Dropdown';
import AuthHelper from '@core/helpers/auth.helper';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.account);
  const authHelper = new AuthHelper();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const onLogout = () => {
    authHelper.signOut();
    navigate('/auth/signin');
  };

  return (
    <header className="principal-header">
      <h1 className="page-logo"><ViteLogo /></h1>
      <ul className="header-menu">
        <li className="menu-item">
          <Link to='/'>Home</Link>
        </li>
        <li className="menu-item">
          <Link to='/todo'>Todo</Link>
        </li>
      </ul>
      <div className="header-actions">
        <Dropdown
          triggerElm={
            <button className="btn btn-profile">
              Welcome, { profile?.data?.firstName } { profile?.data?.lastName }
            </button>
          }
          dropdownContent={
            <ul className="dropdown-list">
              <li className="dropdown-item">
                <div className="pre-icon">
                  <ProfileIcon />
                </div>
                <span className="dropdown-item-title">Profile</span>
              </li>
              <li className="dropdown-item" onClick={ onLogout }>
                <div className="pre-icon">
                  <LogoutIcon />
                </div>
                <span className="dropdown-item-title">Logout</span>
              </li>
            </ul>
          }
        />
      </div>
    </header>
  );
};

export default Header;
