import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SkeletonText } from 'skeleton-elements/react';

import ViteLogo from '@assets/icons/vite.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import ProfileIcon from '@assets/icons/profile.svg?react';

import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { getProfile } from 'app/principal/principalSlice';
import Dropdown from '../partials/Dropdown';
import AuthHelper from '@core/helpers/auth.helper';
import ACTION_TYPES from 'app/stores/action-types';

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

  const openProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="flex items-center px-4 py-2 bg-white shadow-md">
      <h1 className="mr-4 mb-0 text-5xl">
        <ViteLogo />
      </h1>
      <ul className="flex items-center gap-2">
        <li className="menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu-item">
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
      <div className="ml-auto">
        <Dropdown
          triggerElm={
            <button className="btn btn-profile">
              <span className="mr-1">Welcome,</span>
              {profile.isLoading &&
              profile.type === ACTION_TYPES.ACCOUNT.GET ? (
                <SkeletonText tag="span" effect="wave">
                  firstnamelastname
                </SkeletonText>
              ) : (
                <span>
                  {profile?.data?.firstName} {profile?.data?.lastName}
                </span>
              )}
            </button>
          }
          dropdownContent={
            <ul className="dropdown-list">
              <li
                className="px-5 py-2 flex items-center gap-2 bg-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-100"
                onClick={openProfile}
              >
                <div className="flex items-center">
                  <ProfileIcon />
                </div>
                <span className="dropdown-item-title">Profile</span>
              </li>
              <li
                className="px-5 py-2 flex items-center gap-2 bg-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-100"
                onClick={onLogout}
              >
                <div className="flex items-center">
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
